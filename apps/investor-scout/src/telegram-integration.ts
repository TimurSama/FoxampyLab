/**
 * Интеграция парсера инвесторов с Telegram ботом
 * Админ может:
 * - Запускать поиск
 * - Просматривать результаты
 * - Добавлять инвесторов вручную
 * - Экспортировать данные
 */

import TelegramBot from 'node-telegram-bot-api';
import { InvestorFinder } from './index';
import { InvestorProfile } from './types';

export function setupInvestorBot(
  bot: TelegramBot, 
  adminId: number,
  finder: InvestorFinder
) {
  
  // Команда /investors — меню управления
  bot.onText(/\/investors/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (chatId !== adminId) {
      await bot.sendMessage(chatId, '⛔ Только для администратора');
      return;
    }

    const keyboard = {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔍 Поиск блокчейн-разработчиков', callback_data: 'inv_search_blockchain' }],
          [{ text: '🚀 Поиск основателей', callback_data: 'inv_search_founders' }],
          [{ text: '🎯 Поиск на Product Hunt', callback_data: 'inv_search_ph' }],
          [{ text: '📊 Статистика', callback_data: 'inv_stats' }],
          [{ text: '🏆 Топ-10', callback_data: 'inv_top10' }],
          [{ text: '➕ Добавить вручную', callback_data: 'inv_add_manual' }],
          [{ text: '📥 Экспорт CSV', callback_data: 'inv_export_csv' }],
        ],
      },
    };

    await bot.sendMessage(chatId, '🤵 <b>Управление инвесторами</b>', {
      parse_mode: 'HTML',
      ...keyboard,
    });
  });

  // Обработка callback
  bot.on('callback_query', async (query) => {
    const chatId = query.message!.chat.id;
    const data = query.data;

    if (!data?.startsWith('inv_')) return;
    if (chatId !== adminId) return;

    await bot.answerCallbackQuery(query.id);

    switch (data) {
      case 'inv_search_blockchain':
        await bot.sendMessage(chatId, '⏳ Ищу блокчейн-разработчиков...');
        try {
          const results = await finder.findBlockchainDevelopers(20);
          await sendInvestorList(bot, chatId, results, 'Блокчейн-разработчики');
        } catch (e) {
          await bot.sendMessage(chatId, `❌ Ошибка: ${e}`);
        }
        break;

      case 'inv_search_founders':
        await bot.sendMessage(chatId, '⏳ Ищу основателей...');
        try {
          const results = await finder.findFounders();
          await sendInvestorList(bot, chatId, results, 'Основатели стартапов');
        } catch (e) {
          await bot.sendMessage(chatId, `❌ Ошибка: ${e}`);
        }
        break;

      case 'inv_search_ph':
        await bot.sendMessage(chatId, '⏳ Ищу на Product Hunt...');
        try {
          const results = await finder.searchProductHunt({ per_page: 20 });
          await sendInvestorList(bot, chatId, results, 'Product Hunt Makers');
        } catch (e) {
          await bot.sendMessage(chatId, `❌ Ошибка: ${e}`);
        }
        break;

      case 'inv_stats':
        const stats = finder.getStats();
        const message = `
📊 <b>Статистика инвесторов</b>

Всего: ${stats.total}
Средний скор: ${stats.averageScore}⭐
С email: ${stats.withEmail}
Связались: ${stats.contacted}

<b>По источникам:</b>
${Object.entries(stats.bySource).map(([k, v]) => `• ${k}: ${v}`).join('\n')}

<b>По ролям:</b>
${Object.entries(stats.byRole).map(([k, v]) => `• ${k}: ${v}`).join('\n')}
        `.trim();
        await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
        break;

      case 'inv_top10':
        const top = finder.getTop(10);
        await sendInvestorList(bot, chatId, top, 'Топ-10 инвесторов');
        break;

      case 'inv_export_csv':
        const csv = finder.exportToCSV();
        await bot.sendDocument(chatId, Buffer.from(csv), {}, {
          filename: `investors-${new Date().toISOString().split('T')[0]}.csv`,
          contentType: 'text/csv',
        });
        break;

      case 'inv_add_manual':
        // TODO: реализовать пошаговое добавление
        await bot.sendMessage(chatId, '📝 Отправьте данные инвестора в формате:\n\n<code>Имя | Компания | Роль | Email | LinkedIn | Фокус (через запятую)</code>', {
          parse_mode: 'HTML',
        });
        break;
    }
  });

  // Добавление вручную через сообщение
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (chatId !== adminId || !text) return;
    if (text.startsWith('/')) return;

    // Формат: Имя | Компания | Роль | Email | LinkedIn | Фокус
    if (text.includes('|')) {
      const parts = text.split('|').map(p => p.trim());
      
      if (parts.length >= 4) {
        const investor: Partial<InvestorProfile> = {
          id: `manual-${Date.now()}`,
          name: parts[0],
          company: parts[1] || undefined,
          role: parts[2] as any,
          email: parts[3] || undefined,
          linkedin: parts[4] || undefined,
          focus: parts[5]?.split(',').map(f => f.trim()) || [],
          source: 'manual',
          score: 50,
          tags: [],
          contacted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await bot.sendMessage(chatId, `✅ Добавлен инвестор:\n\n<code>${JSON.stringify(investor, null, 2)}</code>`, {
          parse_mode: 'HTML',
        });
      }
    }
  });
}

async function sendInvestorList(
  bot: TelegramBot, 
  chatId: number, 
  investors: Partial<InvestorProfile>[],
  title: string
) {
  if (investors.length === 0) {
    await bot.sendMessage(chatId, '📭 Ничего не найдено');
    return;
  }

  let message = `📋 <b>${title}</b> (${investors.length})\n\n`;

  investors.slice(0, 10).forEach((inv, i) => {
    message += `<b>${i + 1}. ${inv.name}</b> (${inv.score}⭐)\n`;
    if (inv.company) message += `🏢 ${inv.company}\n`;
    if (inv.email) message += `📧 ${inv.email}\n`;
    if (inv.linkedin) message += `🔗 <a href="${inv.linkedin}">LinkedIn</a>\n`;
    if (inv.github) message += `💻 <a href="${inv.github}">GitHub</a>\n`;
    message += '\n';
  });

  if (investors.length > 10) {
    message += `... и еще ${investors.length - 10}`;
  }

  await bot.sendMessage(chatId, message, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  });
}

// Telegram Bot для Foxampy Lab (Standalone режим с polling)
// Запуск: npm run bot
// Или через PM2: pm2 start bot/index.js --name foxampy-bot
// 
// Для production на Vercel используйте webhook режим через app/api/telegram/webhook/route.ts

import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { setupBotHandlers, BotConfig } from '../lib/bot/handler';

// Загружаем переменные окружения
dotenv.config({ path: '.env.local' });

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const ADMIN_ID = parseInt(
  process.env.TELEGRAM_ADMIN_ID || process.env.NEXT_PUBLIC_TELEGRAM_ADMIN_ID || '0'
);

if (!BOT_TOKEN || !ADMIN_ID) {
  console.error('❌ Ошибка: TELEGRAM_BOT_TOKEN и TELEGRAM_ADMIN_ID должны быть установлены');
  process.exit(1);
}

// Создаем бота с polling (для локальной разработки и standalone серверов)
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Настраиваем обработчики
const config: BotConfig = {
  token: BOT_TOKEN,
  adminId: ADMIN_ID,
};

setupBotHandlers(bot, config);

console.log('✅ Telegram бот запущен и готов к работе!');
console.log(`📱 Бот: @FoxampyLab_contact_bot`);
console.log(`👤 Администратор ID: ${ADMIN_ID}`);
console.log(`🔄 Режим: Polling (для webhook используйте Vercel)`);

/**
 * Telegram Job Hunter Bot
 * Автоматический поиск работы и проектов в Telegram-чатах
 * 
 * Запуск: npx ts-node telegram-job-hunter.ts
 */

import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// ===== КОНФИГУРАЦИЯ =====
const CONFIG = {
  // Telegram API credentials (получить на my.telegram.org)
  apiId: parseInt(process.env.TELEGRAM_API_ID || '0'),
  apiHash: process.env.TELEGRAM_API_HASH || '',
  stringSession: process.env.TELEGRAM_STRING_SESSION || '',
  
  // OpenAI для анализа
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  
  // Supabase для хранения
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_ANON_KEY || '',
  
  // Настройки поиска
  checkInterval: 30 * 60 * 1000, // 30 минут
  minScore: 70, // Минимальная релевантность
  
  // Чаты для мониторинга
  targetChats: [
    '@pm_jobs',
    '@product_jobs_ru', 
    '@dev_by',
    '@jobs_israel',
    '@dubai_ru_work',
    '@crypto_jobs',
    '@freelance',
    '@product_ru',
    '@design_tg',
    '@web3_jobs',
    '@blockchain_dev',
  ]
};

// ===== ИНИЦИАЛИЗАЦИЯ =====
const client = new TelegramClient(
  new StringSession(CONFIG.stringSession),
  CONFIG.apiId,
  CONFIG.apiHash,
  { connectionRetries: 5 }
);

const openai = new OpenAI({ apiKey: CONFIG.openaiApiKey });
const supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey);

// ===== CV ДЛЯ АНАЛИЗА =====
const CV_CONTEXT = `
Тимур Садыков - Digital Project Manager / Product Lead
Опыт: 7+ лет управления digital и IT продуктами
Ключевые навыки:
- Project & Product Management (полный цикл)
- Web3 / Blockchain (хакатон-победитель, токенизация)
- PropTech (Realting.uz - цифровой реестр недвижимости)
- LogTech (Done, Израиль - логистическое приложение)
- UX/UI Design & Supervision
- AI/LLM интеграции
- Междисциплинарный подход

География: Минск, удаленка, готов к релокации (Дубай, Израиль, Европа)
Формат: проектная работа, фриланс, part-time, full-time
Языки: русский (native), английский (письменный), иврит (базовый)
`;

// ===== ФУНКЦИИ =====

/**
 * AI-анализ релевантности вакансии
 */
async function analyzeJobRelevance(jobText: string): Promise<{
  score: number;
  reasoning: string;
  matchedSkills: string[];
  recommendation: 'apply' | 'ignore' | 'maybe';
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Ты - HR-аналитик. Оцени релевантность вакансии для кандидата.
          Верни JSON с полями:
          - score: число 0-100 (релевантность)
          - reasoning: краткое объяснение
          - matchedSkills: массив совпавших навыков
          - recommendation: "apply" (подходит), "ignore" (не подходит), "maybe" (возможно)`
        },
        {
          role: 'user',
          content: `Кандидат:\n${CV_CONTEXT}\n\nВакансия:\n${jobText}`
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      score: result.score || 0,
      reasoning: result.reasoning || '',
      matchedSkills: result.matchedSkills || [],
      recommendation: result.recommendation || 'ignore',
    };
  } catch (error) {
    console.error('AI analysis error:', error);
    return { score: 0, reasoning: '', matchedSkills: [], recommendation: 'ignore' };
  }
}

/**
 * Генерация персонализированного отклика
 */
async function generateReply(jobText: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Ты - кандидат на работу. Напиши краткий, дружелюбный отклик на вакансию в Telegram.
          - Максимум 3-4 предложения
          - Упомяни релевантный опыт
          - Предложи созвон/переписку
          - Без шаблонных фраз`
        },
        {
          role: 'user',
          content: `Мой опыт:\n${CV_CONTEXT}\n\nВакансия:\n${jobText}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0].message.content || 'Здравствуйте! Интересная вакансия, готов обсудить подробнее.';
  } catch (error) {
    console.error('Reply generation error:', error);
    return 'Здравствуйте! Интересная вакансия, готов обсудить подробнее.';
  }
}

/**
 * Сохранение лида в базу
 */
async function saveLead(data: {
  chat: string;
  messageId: number;
  text: string;
  score: number;
  reasoning: string;
  matchedSkills: string[];
  recommendation: string;
  generatedReply: string;
  status: 'new' | 'sent' | 'replied';
}) {
  try {
    const { error } = await supabase
      .from('telegram_leads')
      .insert([{
        ...data,
        created_at: new Date().toISOString(),
      }]);
    
    if (error) throw error;
    console.log('✅ Lead saved to database');
  } catch (error) {
    console.error('Database error:', error);
  }
}

/**
 * Отправка уведомления админу
 */
async function notifyAdmin(lead: any) {
  try {
    await client.sendMessage('me', {
      message: `
🎯 *Новый релевантный лид*

📊 Score: ${lead.score}/100
💬 Чат: ${lead.chat}

📝 Вакансия:
${lead.text.slice(0, 300)}...

✅ Совпавшие навыки:
${lead.matchedSkills.join(', ')}

💡 Рекомендация: ${lead.recommendation}

🤖 Сгенерированный отклик:
${lead.generatedReply}

[Открыть в Telegram](https://t.me/${lead.chat.replace('@', '')}/${lead.messageId})
      `,
      parseMode: 'markdown',
    });
  } catch (error) {
    console.error('Notification error:', error);
  }
}

/**
 * Мониторинг чатов
 */
async function monitorChats() {
  console.log('🔍 Starting chat monitoring...');
  
  for (const chatUsername of CONFIG.targetChats) {
    try {
      console.log(`Checking ${chatUsername}...`);
      
      const chat = await client.getEntity(chatUsername);
      const messages = await client.getMessages(chat, { limit: 20 });
      
      for (const message of messages) {
        if (!message.text) continue;
        
        // Проверяем ключевые слова
        const keywords = [
          'project manager', 'product manager', 'продакт', 'проджект',
          'web3', 'blockchain', 'bloc', 'product lead', 'head of product',
          'ищу pm', 'требуется pm', 'нужен product', 'ищу продакт',
          'удаленка', 'remote', 'фриланс', 'проект',
        ];
        
        const hasKeywords = keywords.some(kw => 
          message.text!.toLowerCase().includes(kw.toLowerCase())
        );
        
        if (!hasKeywords) continue;
        
        // AI-анализ
        const analysis = await analyzeJobRelevance(message.text!);
        
        // Пропускаем нерелевантные
        if (analysis.score < CONFIG.minScore) continue;
        
        // Генерируем отклик
        const reply = await generateReply(message.text!);
        
        // Сохраняем
        await saveLead({
          chat: chatUsername,
          messageId: message.id,
          text: message.text!,
          score: analysis.score,
          reasoning: analysis.reasoning,
          matchedSkills: analysis.matchedSkills,
          recommendation: analysis.recommendation,
          generatedReply: reply,
          status: 'new',
        });
        
        // Уведомляем
        await notifyAdmin({
          chat: chatUsername,
          messageId: message.id,
          text: message.text!,
          score: analysis.score,
          matchedSkills: analysis.matchedSkills,
          recommendation: analysis.recommendation,
          generatedReply: reply,
        });
        
        console.log(`✅ Found relevant job in ${chatUsername} (score: ${analysis.score})`);
      }
      
      // Задержка между чатами
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error) {
      console.error(`Error checking ${chatUsername}:`, error);
    }
  }
  
  console.log('✅ Monitoring cycle completed');
}

/**
 * Главный цикл
 */
async function main() {
  console.log('🚀 Telegram Job Hunter Bot starting...');
  
  // Подключаемся к Telegram
  await client.start({
    phoneNumber: async () => process.env.TELEGRAM_PHONE || '',
    password: async () => process.env.TELEGRAM_PASSWORD || '',
    phoneCode: async () => {
      console.log('Enter code from Telegram:');
      return await new Promise(resolve => {
        process.stdin.once('data', data => resolve(data.toString().trim()));
      });
    },
    onError: (err) => console.error('Connection error:', err),
  });
  
  console.log('✅ Connected to Telegram');
  console.log('Session string (save to .env):', client.session.save());
  
  // Первый запуск
  await monitorChats();
  
  // Периодический запуск
  setInterval(monitorChats, CONFIG.checkInterval);
  
  console.log(`⏰ Monitoring every ${CONFIG.checkInterval / 60000} minutes`);
}

// Запуск
main().catch(console.error);

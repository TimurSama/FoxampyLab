// API Route для обработки webhook от Telegram
// Используется в Vercel для serverless функций
// Этот файл выполняется только на сервере

import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';
import { setupBotHandlers, BotConfig } from '@/lib/bot/handler';

// Важно: отключаем кэширование для этой функции, чтобы она всегда выполнялась динамически
export const dynamic = 'force-dynamic';

// Инициализация бота (без polling)
let bot: TelegramBot | null = null;

function getBot(): TelegramBot {
  if (!bot) {
    const token = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN не установлен');
    }

    // Создаем бота без polling (для webhook режима)
    bot = new TelegramBot(token, { polling: false });
    
    const adminId = parseInt(
      process.env.TELEGRAM_ADMIN_ID || process.env.NEXT_PUBLIC_TELEGRAM_ADMIN_ID || '0'
    );

    if (!adminId) {
      throw new Error('TELEGRAM_ADMIN_ID не установлен');
    }

    // Настраиваем обработчики
    setupBotHandlers(bot, { token, adminId });
  }

  return bot;
}

// POST обработчик для webhook
export async function POST(request: NextRequest) {
  try {
    // Проверка secret token (опционально, для безопасности)
    const secretToken = process.env.TELEGRAM_WEBHOOK_SECRET;
    const providedToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    
    if (secretToken && providedToken !== secretToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Получаем обновление от Telegram
    const update = await request.json();

    // Обрабатываем обновление через бота
    const botInstance = getBot();
    await botInstance.processUpdate(update);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Ошибка обработки webhook:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET обработчик для проверки работоспособности
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Telegram webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}

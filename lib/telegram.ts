// Утилиты для работы с Telegram Bot API
export interface TelegramMessage {
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
  disable_web_page_preview?: boolean;
}

export interface TelegramResponse {
  ok: boolean;
  result?: any;
  error_code?: number;
  description?: string;
}

// Получаем конфигурацию из environment variables
const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

export class TelegramService {
  static async sendMessage(message: string): Promise<TelegramResponse> {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Telegram bot credentials not configured');
    }

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        }
      );

      const data: TelegramResponse = await response.json();
      
      if (!data.ok) {
        throw new Error(`Telegram API Error: ${data.description}`);
      }

      return data;
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      throw error;
    }
  }

  // Форматирование сообщения о консультации
  static formatConsultationMessage(data: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    message?: string;
  }): string {
    const { name, email, phone, date, time, message } = data;
    
    return `
<b>📅 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ</b>

<b>👤 Клиент:</b> ${name}
<b>📧 Email:</b> ${email}
<b>📱 Телефон:</b> ${phone}
<b>📅 Дата:</b> ${date}
<b>⏰ Время:</b> ${time}

${message ? `<b>📝 Сообщение:</b> ${message}` : ''}

<i>Заявка отправлена с сайта Foxampy Lab</i>
    `.trim();
  }

  // Форматирование контактного сообщения
  static formatContactMessage(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): string {
    const { name, email, subject, message } = data;
    
    return `
<b>✉️ НОВОЕ СООБЩЕНИЕ С КОНТАКТНОЙ ФОРМЫ</b>

<b>👤 Имя:</b> ${name}
<b>📧 Email:</b> ${email}
${subject ? `<b>📋 Тема:</b> ${subject}` : ''}

<b>📝 Сообщение:</b>
${message}

<i>Сообщение отправлено с сайта Foxampy Lab</i>
    `.trim();
  }

  // Проверка конфигурации
  static isConfigured(): boolean {
    return !!(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);
  }

  // Получение URL для прямого обращения к боту
  static getBotUrl(): string {
    if (!TELEGRAM_BOT_TOKEN) {
      return '#';
    }
    return `https://t.me/${TELEGRAM_BOT_TOKEN.split(':')[0]}`;
  }
}
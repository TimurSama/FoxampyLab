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

type ConsultationPayload = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
};

type ServicesPayload = {
  services: string[];
  email: string;
  phone: string;
  messenger?: string;
};

type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export type LeadPayload =
  | { type: 'consultation'; data: ConsultationPayload }
  | { type: 'services'; data: ServicesPayload }
  | { type: 'contact'; data: ContactPayload };

// Получаем конфигурацию из environment variables
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_ADMIN_ID =
  process.env.TELEGRAM_ADMIN_ID || process.env.NEXT_PUBLIC_TELEGRAM_ADMIN_ID;

export class TelegramService {
  static async sendMessage(message: string): Promise<TelegramResponse> {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_ID) {
      console.error('Telegram bot credentials not configured');
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
            chat_id: TELEGRAM_ADMIN_ID,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        }
      );

      const data: TelegramResponse = await response.json();

      if (!data.ok) {
        console.error('Telegram API Error:', data.description);
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

  // Отправка заявки на консультацию
  static async sendConsultationRequest(data: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    message?: string;
  }): Promise<TelegramResponse> {
    const formattedMessage = this.formatConsultationMessage({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: new Date(data.date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      time: data.time,
      message: data.message,
    });

    return this.sendMessage(formattedMessage);
  }

  // Форматирование сообщения о заявке на услуги
  static formatServiceRequestMessage(data: {
    services: string[];
    email: string;
    phone: string;
    messenger?: string;
  }): string {
    const { services, email, phone, messenger } = data;

    return `
<b>🎯 НОВАЯ ЗАЯВКА НА УСЛУГИ</b>

<b>📋 Выбранные услуги:</b>
${services.map((s, i) => `${i + 1}. ${s}`).join('\n')}

<b>📞 Контактная информация:</b>
<b>📧 Email:</b> ${email}
<b>📱 Телефон:</b> ${phone}
${messenger ? `<b>💬 Мессенджер:</b> ${messenger}` : ''}

<i>Заявка отправлена с сайта Foxampy Lab</i>
    `.trim();
  }

  // Отправка заявки на услуги
  static async sendServiceRequest(data: {
    services: string[];
    email: string;
    phone: string;
    messenger?: string;
  }): Promise<TelegramResponse> {
    const formattedMessage = this.formatServiceRequestMessage(data);
    return this.sendMessage(formattedMessage);
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

  // Отправка контактного сообщения
  static async sendContactMessage(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<TelegramResponse> {
    const formattedMessage = this.formatContactMessage(data);
    return this.sendMessage(formattedMessage);
  }

  // Унифицированная отправка заявки
  static async sendLead(payload: LeadPayload): Promise<{ ok: boolean; usedFallback: boolean }> {
    try {
      const response = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Telegram send failed');
      }

      return { ok: true, usedFallback: false };
    } catch (error) {
      // Fallback: открываем бота с префилом, если клиент
      let message = '';
      if (payload.type === 'consultation') {
        message = this.formatConsultationMessage(payload.data);
      } else if (payload.type === 'services') {
        message = this.formatServiceRequestMessage(payload.data);
      } else {
        message = this.formatContactMessage(payload.data);
      }

      const telegramUrl = this.getBotUrlWithMessage(message);
      if (typeof window !== 'undefined') {
        window.open(telegramUrl, '_blank');
      }

      return { ok: false, usedFallback: true };
    }
  }

  // Проверка конфигурации
  static isConfigured(): boolean {
    return !!(TELEGRAM_BOT_TOKEN && TELEGRAM_ADMIN_ID);
  }

  // Получение URL для прямого обращения к боту
  static getBotUrl(): string {
    if (!TELEGRAM_BOT_TOKEN) {
      return '#';
    }
    // Username бота
    return `https://t.me/FoxampyLab_contact_bot`;
  }

  // Получение fallback URL с сообщением
  static getBotUrlWithMessage(message: string): string {
    const botUrl = this.getBotUrl();
    return `${botUrl}?start=${encodeURIComponent(message)}`;
  }
}
// Обработчик логики Telegram бота
// Может использоваться как в webhook режиме, так и в standalone режиме

import TelegramBot from 'node-telegram-bot-api';

export interface BotConfig {
  token: string;
  adminId: number;
}

export interface UserData {
  lang: 'ru' | 'en';
  step: string | null;
  consultation?: any;
  contact?: any;
  services?: string[];
  servicesData?: any;
}

// Хранилище данных пользователей (в production используйте БД)
export const userData = new Map<number, UserData>();

// Переводы
export const translations = {
  ru: {
    welcome: `👋 Добро пожаловать в <b>Foxampy Lab</b>!

Мы — лаборатория междисциплинарных решений в области IT, дизайна, архитектуры и кинематографа.

Выберите язык для продолжения:`,
  },
  en: {
    welcome: `👋 Welcome to <b>Foxampy Lab</b>!

We are a laboratory of interdisciplinary solutions in IT, design, architecture and cinematography.

Choose language to continue:`,
  },
  menu: {
    ru: {
      consultation: '📅 Записаться на консультацию',
      services: '🎯 Заказать услуги',
      contact: '✉️ Связаться с нами',
      about: 'ℹ️ О нас',
      website: '🌐 Открыть сайт',
      back: '◀️ Назад',
    },
    en: {
      consultation: '📅 Book Consultation',
      services: '🎯 Order Services',
      contact: '✉️ Contact Us',
      about: 'ℹ️ About Us',
      website: '🌐 Open Website',
      back: '◀️ Back',
    },
  },
  consultation: {
    ru: {
      title: '📅 Запись на консультацию',
      name: 'Введите ваше имя:',
      email: 'Введите ваш email:',
      phone: 'Введите ваш телефон:',
      date: 'Выберите дату:',
      time: 'Выберите время:',
      message: 'Дополнительное сообщение (необязательно):',
      confirm: '✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
      cancel: '❌ Заявка отменена.',
    },
    en: {
      title: '📅 Book Consultation',
      name: 'Enter your name:',
      email: 'Enter your email:',
      phone: 'Enter your phone:',
      date: 'Select date:',
      time: 'Select time:',
      message: 'Additional message (optional):',
      confirm: '✅ Request sent! We will contact you soon.',
      cancel: '❌ Request cancelled.',
    },
  },
  services: {
    ru: {
      title: '🎯 Заказ услуг',
      select: 'Выберите услуги:',
      name: 'Введите ваше имя:',
      email: 'Введите ваш email:',
      phone: 'Введите ваш телефон:',
      confirm: '✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
    },
    en: {
      title: '🎯 Order Services',
      select: 'Select services:',
      name: 'Enter your name:',
      email: 'Enter your email:',
      phone: 'Enter your phone:',
      confirm: '✅ Request sent! We will contact you soon.',
    },
  },
  contact: {
    ru: {
      title: '✉️ Связаться с нами',
      name: 'Введите ваше имя:',
      email: 'Введите ваш email:',
      subject: 'Тема сообщения:',
      message: 'Ваше сообщение:',
      confirm: '✅ Сообщение отправлено! Мы ответим вам в ближайшее время.',
    },
    en: {
      title: '✉️ Contact Us',
      name: 'Enter your name:',
      email: 'Enter your email:',
      subject: 'Subject:',
      message: 'Your message:',
      confirm: '✅ Message sent! We will reply soon.',
    },
  },
};

// Клавиатуры
export const getLanguageKeyboard = () => ({
  reply_markup: {
    inline_keyboard: [
      [{ text: '🇷🇺 Русский', callback_data: 'lang_ru' }],
      [{ text: '🇬🇧 English', callback_data: 'lang_en' }],
    ],
  },
});

export const getMainMenuKeyboard = (lang: 'ru' | 'en' = 'ru') => {
  const t = translations.menu[lang];
  return {
    reply_markup: {
      keyboard: [
        [{ text: t.consultation }, { text: t.services }],
        [{ text: t.contact }, { text: t.about }],
        [{ text: t.website }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };
};

export const getBackKeyboard = (lang: 'ru' | 'en' = 'ru') => {
  const t = translations.menu[lang];
  return {
    reply_markup: {
      keyboard: [[{ text: t.back }]],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };
};

// Инициализация обработчиков бота
export function setupBotHandlers(bot: TelegramBot, config: BotConfig) {
  const { adminId } = config;

  // Отправка уведомления администратору
  const notifyAdmin = async (message: string) => {
    try {
      await bot.sendMessage(adminId, message, { parse_mode: 'HTML' });
    } catch (error) {
      console.error('Ошибка отправки уведомления администратору:', error);
    }
  };

  // Команда /start
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userLang = userData.get(chatId)?.lang || 'ru';
    
    await bot.sendMessage(chatId, translations[userLang].welcome, {
      parse_mode: 'HTML',
      ...getLanguageKeyboard(),
    });
  });

  // Выбор языка
  bot.on('callback_query', async (query) => {
    const chatId = query.message!.chat.id;
    const data = query.data;

    if (data?.startsWith('lang_')) {
      const lang = data.split('_')[1] as 'ru' | 'en';
      if (!userData.has(chatId)) {
        userData.set(chatId, { lang, step: null });
      } else {
        const user = userData.get(chatId)!;
        user.lang = lang;
      }

      await bot.answerCallbackQuery(query.id);
      await bot.editMessageText(
        `✅ Язык изменен на ${lang === 'ru' ? 'Русский' : 'English'}`,
        { chat_id: chatId, message_id: query.message!.message_id }
      );

      await bot.sendMessage(chatId, `🏠 <b>Главное меню</b>`, {
        parse_mode: 'HTML',
        ...getMainMenuKeyboard(lang),
      });
    }
  });

  // Обработка текстовых сообщений
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    if (!text) return;

    if (!userData.has(chatId)) {
      userData.set(chatId, { lang: 'ru', step: null });
    }

    const user = userData.get(chatId)!;
    const lang = user.lang || 'ru';
    const t = translations.menu[lang];

    // Главное меню
    if (text === t.consultation) {
      user.step = 'consultation_name';
      await bot.sendMessage(chatId, translations.consultation[lang].name, {
        ...getBackKeyboard(lang),
      });
    } else if (text === t.services) {
      user.step = 'services_select';
      const servicesKeyboard = {
        reply_markup: {
          inline_keyboard: [
            [{ text: '💼 Бизнес и стратегия', callback_data: 'service_business' }],
            [{ text: '💻 IT и разработка', callback_data: 'service_it' }],
            [{ text: '🎨 Дизайн и брендинг', callback_data: 'service_design' }],
            [{ text: '🏗️ Архитектура', callback_data: 'service_architecture' }],
            [{ text: '🎬 Видео и кино', callback_data: 'service_video' }],
            [{ text: '🔬 R&D', callback_data: 'service_rd' }],
          ],
        },
      };
      await bot.sendMessage(chatId, translations.services[lang].select, servicesKeyboard);
    } else if (text === t.contact) {
      user.step = 'contact_name';
      await bot.sendMessage(chatId, translations.contact[lang].name, {
        ...getBackKeyboard(lang),
      });
    } else if (text === t.about) {
      const aboutText = lang === 'ru' 
        ? `ℹ️ <b>О Foxampy Lab</b>\n\nМы создаем решения на стыке технологий, дизайна и науки.`
        : `ℹ️ <b>About Foxampy Lab</b>\n\nWe create solutions at the intersection of technology, design and science.`;
      await bot.sendMessage(chatId, aboutText, {
        parse_mode: 'HTML',
        ...getMainMenuKeyboard(lang),
      });
    } else if (text === t.website) {
      await bot.sendMessage(chatId, '🌐 https://timursama.github.io/FoxampyLab', {
        ...getMainMenuKeyboard(lang),
      });
    } else if (text === t.back) {
      user.step = null;
      await bot.sendMessage(chatId, `🏠 <b>Главное меню</b>`, {
        parse_mode: 'HTML',
        ...getMainMenuKeyboard(lang),
      });
    } else {
      // Обработка форм
      if (user.step === 'consultation_name') {
        user.consultation = { name: text };
        user.step = 'consultation_email';
        await bot.sendMessage(chatId, translations.consultation[lang].email);
      } else if (user.step === 'consultation_email') {
        user.consultation!.email = text;
        user.step = 'consultation_phone';
        await bot.sendMessage(chatId, translations.consultation[lang].phone);
      } else if (user.step === 'consultation_phone') {
        user.consultation!.phone = text;
        user.step = 'consultation_message';
        await bot.sendMessage(chatId, translations.consultation[lang].message);
      } else if (user.step === 'consultation_message') {
        user.consultation!.message = text;
        
        // Отправка администратору
        const adminMessage = `
<b>📅 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ</b>

<b>👤 Клиент:</b> ${user.consultation!.name}
<b>📧 Email:</b> ${user.consultation!.email}
<b>📱 Телефон:</b> ${user.consultation!.phone}
${user.consultation!.message ? `<b>📝 Сообщение:</b> ${user.consultation!.message}` : ''}

<i>Заявка отправлена через Telegram бота</i>
        `.trim();
        
        await notifyAdmin(adminMessage);
        
        user.step = null;
        delete user.consultation;
        await bot.sendMessage(chatId, translations.consultation[lang].confirm, {
          ...getMainMenuKeyboard(lang),
        });
      } else if (user.step === 'contact_name') {
        user.contact = { name: text };
        user.step = 'contact_email';
        await bot.sendMessage(chatId, translations.contact[lang].email);
      } else if (user.step === 'contact_email') {
        user.contact!.email = text;
        user.step = 'contact_subject';
        await bot.sendMessage(chatId, translations.contact[lang].subject);
      } else if (user.step === 'contact_subject') {
        user.contact!.subject = text;
        user.step = 'contact_message';
        await bot.sendMessage(chatId, translations.contact[lang].message);
      } else if (user.step === 'contact_message') {
        user.contact!.message = text;
        
        // Отправка администратору
        const adminMessage = `
<b>✉️ НОВОЕ СООБЩЕНИЕ</b>

<b>👤 Имя:</b> ${user.contact!.name}
<b>📧 Email:</b> ${user.contact!.email}
<b>📋 Тема:</b> ${user.contact!.subject}

<b>📝 Сообщение:</b>
${user.contact!.message}

<i>Сообщение отправлено через Telegram бота</i>
        `.trim();
        
        await notifyAdmin(adminMessage);
        
        user.step = null;
        delete user.contact;
        await bot.sendMessage(chatId, translations.contact[lang].confirm, {
          ...getMainMenuKeyboard(lang),
        });
      }
    }
  });

  // Обработка выбора услуг
  bot.on('callback_query', async (query) => {
    const chatId = query.message!.chat.id;
    const data = query.data;

    if (data?.startsWith('service_')) {
      const user = userData.get(chatId);
      if (!user) return;
      
      const lang = user.lang || 'ru';
      
      if (!user.services) {
        user.services = [];
      }
      
      const serviceMap: Record<string, string> = {
        service_business: lang === 'ru' ? 'Бизнес и стратегия' : 'Business & Strategy',
        service_it: lang === 'ru' ? 'IT и разработка' : 'IT & Development',
        service_design: lang === 'ru' ? 'Дизайн и брендинг' : 'Design & Branding',
        service_architecture: lang === 'ru' ? 'Архитектура' : 'Architecture',
        service_video: lang === 'ru' ? 'Видео и кино' : 'Video & Film',
        service_rd: lang === 'ru' ? 'R&D' : 'R&D',
      };
      
      const serviceName = serviceMap[data];
      
      if (!user.services.includes(serviceName)) {
        user.services.push(serviceName);
      }
      
      await bot.answerCallbackQuery(query.id, { text: `✅ ${serviceName} добавлена` });
      
      // Продолжаем сбор данных
      if (!user.servicesData) {
        user.servicesData = {};
        user.step = 'services_name';
        await bot.sendMessage(chatId, translations.services[lang].name, {
          ...getBackKeyboard(lang),
        });
      }
    }
  });

  // Обработка данных услуг
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const user = userData.get(chatId);
    
    if (!user || !user.services || !text) return;
    
    const lang = user.lang || 'ru';
    const t = translations.menu[lang];
    
    if (user.step === 'services_name') {
      user.servicesData = { name: text };
      user.step = 'services_email';
      await bot.sendMessage(chatId, translations.services[lang].email);
    } else if (user.step === 'services_email') {
      user.servicesData!.email = text;
      user.step = 'services_phone';
      await bot.sendMessage(chatId, translations.services[lang].phone);
    } else if (user.step === 'services_phone') {
      user.servicesData!.phone = text;
      
      // Отправка администратору
      const adminMessage = `
<b>🎯 НОВАЯ ЗАЯВКА НА УСЛУГИ</b>

<b>📋 Выбранные услуги:</b>
${user.services.map((s, i) => `${i + 1}. ${s}`).join('\n')}

<b>👤 Клиент:</b> ${user.servicesData!.name}
<b>📧 Email:</b> ${user.servicesData!.email}
<b>📱 Телефон:</b> ${user.servicesData!.phone}

<i>Заявка отправлена через Telegram бота</i>
      `.trim();
      
      await notifyAdmin(adminMessage);
      
      user.step = null;
      delete user.services;
      delete user.servicesData;
      await bot.sendMessage(chatId, translations.services[lang].confirm, {
        ...getMainMenuKeyboard(lang),
      });
    }
  });

  // Обработка ошибок
  bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
  });

  bot.on('webhook_error', (error) => {
    console.error('Webhook error:', error);
  });

  return bot;
}

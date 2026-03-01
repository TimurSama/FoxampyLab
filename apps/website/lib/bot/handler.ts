// Обработчик логики Telegram бота
// Может использоваться как в webhook режиме, так и в standalone режиме

import TelegramBot from 'node-telegram-bot-api';

export interface BotConfig {
  token: string;
  adminId: number;
  adminPassword?: string;
}

export interface UserData {
  lang: 'ru' | 'en';
  step: string | null;
  consultation?: any;
  contact?: any;
  services?: string[];
  servicesData?: any;
  partnership?: any;
  isAdmin?: boolean;
  adminAuth?: boolean;
}

// Хранилище данных пользователей (в production используйте БД)
export const userData = new Map<number, UserData>();

// Хранилище заявок для админа
export const requestsStorage: Array<{
  id: number;
  type: 'consultation' | 'services' | 'contact' | 'partnership';
  data: any;
  chatId: number;
  timestamp: Date;
  status: 'new' | 'in_progress' | 'completed';
}> = [];

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
      partnership: '🤝 Партнерство',
      about: 'ℹ️ О нас',
      website: '🌐 Открыть сайт',
      back: '◀️ Назад',
    },
    en: {
      consultation: '📅 Book Consultation',
      services: '🎯 Order Services',
      contact: '✉️ Contact Us',
      partnership: '🤝 Partnership',
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
      message: 'Дополнительное сообщение (необязательно, отправьте "-" чтобы пропустить):',
      confirm: '✅ Заявка на консультацию отправлена! Мы свяжемся с вами в ближайшее время.\n\n🎁 Первая консультация — бесплатно!',
      cancel: '❌ Заявка отменена.',
    },
    en: {
      title: '📅 Book Consultation',
      name: 'Enter your name:',
      email: 'Enter your email:',
      phone: 'Enter your phone:',
      date: 'Select date:',
      time: 'Select time:',
      message: 'Additional message (optional, send "-" to skip):',
      confirm: '✅ Consultation request sent! We will contact you soon.\n\n🎁 First consultation is free!',
      cancel: '❌ Request cancelled.',
    },
  },
  services: {
    ru: {
      title: '🎯 Заказ услуг',
      select: 'Выберите услуги (можно несколько):\n\n💡 При заказе 3+ услуг — скидка 15%!',
      name: 'Введите ваше имя:',
      email: 'Введите ваш email:',
      phone: 'Введите ваш телефон:',
      done: '✅ Готово, отправить заявку',
      confirm: '✅ Заявка на услуги отправлена!\n\n📞 Мы свяжемся с вами для обсуждения деталей и подготовки коммерческого предложения.',
    },
    en: {
      title: '🎯 Order Services',
      select: 'Select services (multiple allowed):\n\n💡 Order 3+ services and get 15% discount!',
      name: 'Enter your name:',
      email: 'Enter your email:',
      phone: 'Enter your phone:',
      done: '✅ Done, submit request',
      confirm: '✅ Service request sent!\n\n📞 We will contact you to discuss details and prepare a quote.',
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
  partnership: {
    ru: {
      title: '🤝 Партнерство',
      intro: 'Мы открыты для партнерства!\n\nВыберите тип сотрудничества:',
      types: [
        '💼 Стратегическое партнерство',
        '🔧 Техническое сотрудничество',
        '📈 Инвестиции',
        '🎨 Креативное партнерство',
      ],
      company: 'Название компании или проекта:',
      description: 'Опишите ваше предложение:',
      contact: 'Контактный email или телефон:',
      confirm: '✅ Заявка на партнерство отправлена! Мы рассмотрим ваше предложение и свяжемся с вами.',
    },
    en: {
      title: '🤝 Partnership',
      intro: 'We are open for partnerships!\n\nSelect collaboration type:',
      types: [
        '💼 Strategic Partnership',
        '🔧 Technical Collaboration',
        '📈 Investment',
        '🎨 Creative Partnership',
      ],
      company: 'Company or project name:',
      description: 'Describe your proposal:',
      contact: 'Contact email or phone:',
      confirm: '✅ Partnership request sent! We will review your proposal and contact you.',
    },
  },
  admin: {
    welcome: '🔐 Введите пароль администратора:',
    success: '✅ Доступ разрешен!\n\nВы вошли в админ-панель.',
    failed: '❌ Неверный пароль!',
    menu: `🛠️ <b>Админ-панель Foxampy Lab</b>

Выберите действие:`,
    noRequests: '📭 Новых заявок нет.',
    requests: '📋 Активные заявки:',
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
        [{ text: t.contact }, { text: t.partnership }],
        [{ text: t.about }, { text: t.website }],
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

export const getAdminMenuKeyboard = () => ({
  reply_markup: {
    keyboard: [
      [{ text: '📋 Просмотр заявок' }, { text: '📊 Статистика' }],
      [{ text: '📨 Ответить клиенту' }, { text: '🔄 Обновить статус' }],
      [{ text: '🚪 Выйти из админки' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
});

export const getServicesKeyboard = (lang: 'ru' | 'en', selectedServices: string[] = []) => {
  const services = lang === 'ru' ? [
    { text: '💼 Бизнес стратегирование', id: 'business' },
    { text: '💻 Разработка экосистем', id: 'it' },
    { text: '🔗 Блокчейн и Web3', id: 'blockchain' },
    { text: '🎨 Брендинг и айдентика', id: 'branding' },
    { text: '🏗️ Цифровой дизайн и фэшн', id: 'spatial' },
    { text: '🎬 Видеопродакшн и CGI', id: 'cinema' },
    { text: '🔬 Исследования и R&D', id: 'rd' },
    { text: '📈 Digital маркетинг', id: 'marketing' },
    { text: '🎮 Геймдев и геймификация', id: 'gamedev' },
  ] : [
    { text: '💼 Business Strategy', id: 'business' },
    { text: '💻 Ecosystem Development', id: 'it' },
    { text: '🔗 Blockchain & Web3', id: 'blockchain' },
    { text: '🎨 Branding & Identity', id: 'branding' },
    { text: '🏗️ Digital Design & Fashion', id: 'spatial' },
    { text: '🎬 Video Production & CGI', id: 'cinema' },
    { text: '🔬 Research & R&D', id: 'rd' },
    { text: '📈 Digital Marketing', id: 'marketing' },
    { text: '🎮 Gamedev & Gamification', id: 'gamedev' },
  ];

  return {
    reply_markup: {
      inline_keyboard: [
        ...services.map(s => [{
          text: selectedServices.includes(s.id) ? `✅ ${s.text}` : s.text,
          callback_data: `service_${s.id}`
        }]),
        [{ text: translations.services[lang].done, callback_data: 'services_done' }],
      ],
    },
  };
};

// Инициализация обработчиков бота
export function setupBotHandlers(bot: TelegramBot, config: BotConfig) {
  const { adminId, adminPassword = '6251' } = config;

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
    
    // Приветствие на английском, затем выбор языка
    await bot.sendMessage(chatId, translations.en.welcome, {
      parse_mode: 'HTML',
      ...getLanguageKeyboard(),
    });
  });

  // Команда /admin
  bot.onText(/\/admin/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (!userData.has(chatId)) {
      userData.set(chatId, { lang: 'ru', step: null });
    }
    const user = userData.get(chatId)!;
    
    user.step = 'admin_password';
    await bot.sendMessage(chatId, translations.admin.welcome);
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
        `✅ ${lang === 'ru' ? 'Язык изменен на Русский' : 'Language changed to English'}`,
        { chat_id: chatId, message_id: query.message!.message_id }
      );

      await bot.sendMessage(chatId, `🏠 <b>${lang === 'ru' ? 'Главное меню' : 'Main Menu'}</b>`, {
        parse_mode: 'HTML',
        ...getMainMenuKeyboard(lang),
      });
    }
  });

  // Обработка выбора услуг
  bot.on('callback_query', async (query) => {
    const chatId = query.message!.chat.id;
    const data = query.data;
    const user = userData.get(chatId);
    
    if (!user) return;
    
    const lang = user.lang || 'ru';

    if (data?.startsWith('service_') && data !== 'services_done') {
      const serviceId = data.replace('service_', '');
      
      if (!user.services) {
        user.services = [];
      }
      
      const idx = user.services.indexOf(serviceId);
      if (idx === -1) {
        user.services.push(serviceId);
      } else {
        user.services.splice(idx, 1);
      }
      
      await bot.answerCallbackQuery(query.id);
      
      // Обновляем клавиатуру
      await bot.editMessageReplyMarkup(
        getServicesKeyboard(lang, user.services).reply_markup,
        { chat_id: chatId, message_id: query.message!.message_id }
      );
    }
    
    if (data === 'services_done') {
      if (!user.services || user.services.length === 0) {
        await bot.answerCallbackQuery(query.id, { text: lang === 'ru' ? 'Выберите хотя бы одну услугу' : 'Select at least one service' });
        return;
      }
      
      await bot.answerCallbackQuery(query.id);
      user.step = 'services_name';
      await bot.sendMessage(chatId, translations.services[lang].name, {
        ...getBackKeyboard(lang),
      });
    }

    // Partnership type selection
    if (data?.startsWith('partnership_')) {
      const partnerType = data.replace('partnership_', '');
      user.partnership = { type: partnerType };
      user.step = 'partnership_company';
      
      await bot.answerCallbackQuery(query.id);
      await bot.sendMessage(chatId, translations.partnership[lang].company, {
        ...getBackKeyboard(lang),
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

    // Admin password check
    if (user.step === 'admin_password') {
      if (text === adminPassword) {
        user.adminAuth = true;
        user.step = 'admin_menu';
        await bot.sendMessage(chatId, translations.admin.success);
        await bot.sendMessage(chatId, translations.admin.menu, {
          parse_mode: 'HTML',
          ...getAdminMenuKeyboard(),
        });
      } else {
        user.step = null;
        await bot.sendMessage(chatId, translations.admin.failed, {
          ...getMainMenuKeyboard(lang),
        });
      }
      return;
    }

    // Admin menu actions
    if (user.adminAuth && user.step === 'admin_menu') {
      if (text === '📋 Просмотр заявок') {
        const newRequests = requestsStorage.filter(r => r.status === 'new');
        if (newRequests.length === 0) {
          await bot.sendMessage(chatId, translations.admin.noRequests);
        } else {
          let message = `${translations.admin.requests}\n\n`;
          newRequests.forEach((r, i) => {
            message += `<b>${i + 1}. ${r.type.toUpperCase()}</b>\n`;
            message += `📅 ${r.timestamp.toLocaleString()}\n`;
            message += `👤 ${JSON.stringify(r.data).substring(0, 100)}...\n\n`;
          });
          await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
        }
        return;
      }
      
      if (text === '📊 Статистика') {
        const stats = {
          total: requestsStorage.length,
          new: requestsStorage.filter(r => r.status === 'new').length,
          inProgress: requestsStorage.filter(r => r.status === 'in_progress').length,
          completed: requestsStorage.filter(r => r.status === 'completed').length,
        };
        await bot.sendMessage(chatId, `📊 <b>Статистика</b>\n\nВсего заявок: ${stats.total}\n🆕 Новые: ${stats.new}\n⏳ В работе: ${stats.inProgress}\n✅ Завершены: ${stats.completed}`, { parse_mode: 'HTML' });
        return;
      }
      
      if (text === '📨 Ответить клиенту') {
        user.step = 'admin_reply_select';
        await bot.sendMessage(chatId, 'Введите ID заявки для ответа (число):');
        return;
      }
      
      if (text === '🚪 Выйти из админки') {
        user.adminAuth = false;
        user.step = null;
        await bot.sendMessage(chatId, '👋 Вы вышли из админ-панели', {
          ...getMainMenuKeyboard(lang),
        });
        return;
      }
    }

    // Admin reply flow
    if (user.step === 'admin_reply_select') {
      const requestId = parseInt(text);
      const request = requestsStorage.find(r => r.id === requestId);
      if (request) {
        user.step = 'admin_reply_message';
        (user as any).replyToChatId = request.chatId;
        await bot.sendMessage(chatId, `Введите сообщение для клиента (заявка #${requestId}):`);
      } else {
        await bot.sendMessage(chatId, 'Заявка не найдена. Введите корректный ID.');
      }
      return;
    }
    
    if (user.step === 'admin_reply_message') {
      const targetChatId = (user as any).replyToChatId;
      if (targetChatId) {
        await bot.sendMessage(targetChatId, `💬 <b>Ответ от Foxampy Lab:</b>\n\n${text}`, { parse_mode: 'HTML' });
        await bot.sendMessage(chatId, '✅ Сообщение отправлено!');
      }
      user.step = 'admin_menu';
      delete (user as any).replyToChatId;
      return;
    }

    // Главное меню
    if (text === t.consultation) {
      user.step = 'consultation_name';
      user.consultation = {};
      await bot.sendMessage(chatId, translations.consultation[lang].name, {
        ...getBackKeyboard(lang),
      });
    } else if (text === t.services) {
      user.step = 'services_select';
      user.services = [];
      await bot.sendMessage(chatId, translations.services[lang].select, getServicesKeyboard(lang));
    } else if (text === t.contact) {
      user.step = 'contact_name';
      user.contact = {};
      await bot.sendMessage(chatId, translations.contact[lang].name, {
        ...getBackKeyboard(lang),
      });
    } else if (text === t.partnership) {
      user.step = 'partnership_type';
      const keyboard = {
        reply_markup: {
          inline_keyboard: translations.partnership[lang].types.map((type, i) => [
            { text: type, callback_data: `partnership_${i}` }
          ]),
        },
      };
      await bot.sendMessage(chatId, translations.partnership[lang].intro, keyboard);
    } else if (text === t.about) {
      const aboutText = lang === 'ru' 
        ? `ℹ️ <b>О Foxampy Lab</b>\n\n🔬 Мы — лаборатория междисциплинарных решений на стыке IT, дизайна, архитектуры и кинематографа.\n\n✨ <b>Почему выбирают нас:</b>\n• Мультидисциплинарный подход\n• Фиксированные сроки\n• Прозрачное ценообразование\n• Поддержка 24/7\n\n🎁 <b>Первая консультация — бесплатно!</b>\n💰 Скидка 15% при заказе 3+ услуг`
        : `ℹ️ <b>About Foxampy Lab</b>\n\nWe create solutions at the intersection of IT, design, architecture and cinematography.\n\n✨ <b>Why choose us:</b>\n• Multidisciplinary approach\n• Fixed deadlines\n• Transparent pricing\n• 24/7 support\n\n🎁 <b>First consultation is free!</b>\n💰 15% discount for 3+ services`;
      await bot.sendMessage(chatId, aboutText, {
        parse_mode: 'HTML',
        ...getMainMenuKeyboard(lang),
      });
    } else if (text === t.website) {
      await bot.sendMessage(chatId, '🌐 https://foxampylab.vercel.app', {
        ...getMainMenuKeyboard(lang),
      });
    } else if (text === t.back) {
      user.step = null;
      delete user.consultation;
      delete user.contact;
      delete user.services;
      delete user.servicesData;
      delete user.partnership;
      await bot.sendMessage(chatId, `🏠 <b>${lang === 'ru' ? 'Главное меню' : 'Main Menu'}</b>`, {
        parse_mode: 'HTML',
        ...getMainMenuKeyboard(lang),
      });
    } else {
      // Обработка форм
      // Consultation flow
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
        user.consultation!.message = text === '-' ? '' : text;
        
        // Save request
        const requestId = requestsStorage.length + 1;
        requestsStorage.push({
          id: requestId,
          type: 'consultation',
          data: user.consultation,
          chatId: chatId,
          timestamp: new Date(),
          status: 'new',
        });
        
        // Отправка администратору
        const adminMessage = `
<b>📅 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ #${requestId}</b>

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
      }
      
      // Contact flow
      else if (user.step === 'contact_name') {
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
        
        const requestId = requestsStorage.length + 1;
        requestsStorage.push({
          id: requestId,
          type: 'contact',
          data: user.contact,
          chatId: chatId,
          timestamp: new Date(),
          status: 'new',
        });
        
        // Отправка администратору
        const adminMessage = `
<b>✉️ НОВОЕ СООБЩЕНИЕ #${requestId}</b>

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
      
      // Services flow (name, email, phone after selection)
      else if (user.step === 'services_name') {
        user.servicesData = { name: text };
        user.step = 'services_email';
        await bot.sendMessage(chatId, translations.services[lang].email);
      } else if (user.step === 'services_email') {
        user.servicesData!.email = text;
        user.step = 'services_phone';
        await bot.sendMessage(chatId, translations.services[lang].phone);
      } else if (user.step === 'services_phone') {
        user.servicesData!.phone = text;
        
        const serviceNames = {
          ru: {
            business: 'Бизнес стратегирование',
            it: 'Разработка экосистем',
            blockchain: 'Блокчейн и Web3',
            branding: 'Брендинг и айдентика',
            spatial: 'Цифровой дизайн и фэшн',
            cinema: 'Видеопродакшн и CGI',
            rd: 'Исследования и R&D',
            marketing: 'Digital маркетинг',
            gamedev: 'Геймдев и геймификация',
          },
          en: {
            business: 'Business Strategy',
            it: 'Ecosystem Development',
            blockchain: 'Blockchain & Web3',
            branding: 'Branding & Identity',
            spatial: 'Digital Design & Fashion',
            cinema: 'Video Production & CGI',
            rd: 'Research & R&D',
            marketing: 'Digital Marketing',
            gamedev: 'Gamedev & Gamification',
          },
        };
        
        const selectedServiceNames = (user.services || []).map(id => serviceNames[lang][id as keyof typeof serviceNames.ru] || id);
        const discount = selectedServiceNames.length >= 3 ? ' (🎁 -15%)' : '';
        
        const requestId = requestsStorage.length + 1;
        requestsStorage.push({
          id: requestId,
          type: 'services',
          data: { ...user.servicesData, services: selectedServiceNames },
          chatId: chatId,
          timestamp: new Date(),
          status: 'new',
        });
        
        // Отправка администратору
        const adminMessage = `
<b>🎯 НОВАЯ ЗАЯВКА НА УСЛУГИ #${requestId}${discount}</b>

<b>📋 Выбранные услуги:</b>
${selectedServiceNames.map((s, i) => `${i + 1}. ${s}`).join('\n')}

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
      
      // Partnership flow
      else if (user.step === 'partnership_company') {
        user.partnership!.company = text;
        user.step = 'partnership_description';
        await bot.sendMessage(chatId, translations.partnership[lang].description);
      } else if (user.step === 'partnership_description') {
        user.partnership!.description = text;
        user.step = 'partnership_contact';
        await bot.sendMessage(chatId, translations.partnership[lang].contact);
      } else if (user.step === 'partnership_contact') {
        user.partnership!.contact = text;
        
        const partnerTypes = translations.partnership[lang].types;
        const typeIndex = parseInt(user.partnership!.type);
        const typeName = partnerTypes[typeIndex] || 'Партнерство';
        
        const requestId = requestsStorage.length + 1;
        requestsStorage.push({
          id: requestId,
          type: 'partnership',
          data: { ...user.partnership, typeName },
          chatId: chatId,
          timestamp: new Date(),
          status: 'new',
        });
        
        const adminMessage = `
<b>🤝 НОВАЯ ЗАЯВКА НА ПАРТНЕРСТВО #${requestId}</b>

<b>📋 Тип:</b> ${typeName}
<b>🏢 Компания:</b> ${user.partnership!.company}
<b>📝 Описание:</b> ${user.partnership!.description}
<b>📞 Контакт:</b> ${user.partnership!.contact}

<i>Заявка отправлена через Telegram бота</i>
        `.trim();
        
        await notifyAdmin(adminMessage);
        
        user.step = null;
        delete user.partnership;
        await bot.sendMessage(chatId, translations.partnership[lang].confirm, {
          ...getMainMenuKeyboard(lang),
        });
      }
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

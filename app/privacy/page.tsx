"use client";

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { useI18n } from '@/lib/i18n/context';

export default function PrivacyPage() {
  const { language } = useI18n();

  const content = {
    ru: {
      title: 'Политика конфиденциальности',
      lastUpdated: 'Последнее обновление:',
      sections: [
        {
          title: '1. Общие положения',
          text: 'Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта FoxampyLab. Мы обязуемся защищать вашу конфиденциальность и соблюдать требования законодательства о защите персональных данных.',
        },
        {
          title: '2. Сбор информации',
          text: 'Мы собираем следующие типы информации:\n- Имя и контактные данные (email, телефон) при заполнении форм\n- Технические данные (IP-адрес, тип браузера, устройство) для улучшения работы сайта\n- Данные аналитики (поведение на сайте, просмотренные страницы)',
        },
        {
          title: '3. Использование файлов cookie',
          text: 'Мы используем файлы cookie для:\n- Улучшения функциональности сайта\n- Анализа поведения пользователей\n- Персонализации контента\nВы можете управлять настройками cookie в вашем браузере.',
        },
        {
          title: '4. Защита данных',
          text: 'Мы применяем современные методы защиты данных, включая шифрование и безопасные протоколы передачи данных. Ваши персональные данные не передаются третьим лицам без вашего согласия.',
        },
        {
          title: '5. Ваши права',
          text: 'Вы имеете право:\n- Получить доступ к вашим персональным данным\n- Запросить исправление или удаление данных\n- Отозвать согласие на обработку данных\n- Подать жалобу в надзорный орган',
        },
        {
          title: '6. Контакты',
          text: 'По вопросам обработки персональных данных обращайтесь:\nEmail: contact@foxampylab.com\nTelegram: @FoxampyLab_contact_bot',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated:',
      sections: [
        {
          title: '1. General Provisions',
          text: 'This Privacy Policy defines the procedure for processing and protecting personal data of FoxampyLab website users. We are committed to protecting your privacy and complying with data protection legislation.',
        },
        {
          title: '2. Information Collection',
          text: 'We collect the following types of information:\n- Name and contact details (email, phone) when filling out forms\n- Technical data (IP address, browser type, device) to improve site functionality\n- Analytics data (site behavior, pages viewed)',
        },
        {
          title: '3. Cookie Usage',
          text: 'We use cookies to:\n- Improve site functionality\n- Analyze user behavior\n- Personalize content\nYou can manage cookie settings in your browser.',
        },
        {
          title: '4. Data Protection',
          text: 'We use modern data protection methods, including encryption and secure data transmission protocols. Your personal data is not shared with third parties without your consent.',
        },
        {
          title: '5. Your Rights',
          text: 'You have the right to:\n- Access your personal data\n- Request correction or deletion of data\n- Withdraw consent for data processing\n- File a complaint with a supervisory authority',
        },
        {
          title: '6. Contacts',
          text: 'For questions about personal data processing, contact:\nEmail: contact@foxampylab.com\nTelegram: @FoxampyLab_contact_bot',
        },
      ],
    },
  };

  const t = content[language];
  const currentDate = new Date().toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative min-h-screen bg-transparent">
      <Header />
      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="font-mono text-4xl md:text-5xl text-[#E0E0E0] mb-4 uppercase tracking-tight">
              {t.title}
            </h1>
            <p className="font-mono text-sm text-[#E0E0E0]/60">
              {t.lastUpdated} {currentDate}
            </p>
          </motion.div>

          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/40 border border-white/10 p-6 md:p-8 backdrop-blur-sm"
              >
                <h2 className="font-mono text-xl md:text-2xl text-[#E0E0E0] mb-4 uppercase tracking-tight">
                  {section.title}
                </h2>
                <div className="font-mono text-sm md:text-base text-[#E0E0E0]/80 leading-relaxed whitespace-pre-line">
                  {section.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

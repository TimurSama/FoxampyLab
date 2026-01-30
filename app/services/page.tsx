"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Code, 
  Palette, 
  TrendingUp, 
  FileText, 
  Film,
  Rocket,
  X,
  Star,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/layout/Header';

export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+');
  const [messenger, setMessenger] = useState('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const services = [
    {
      id: 'ecosystems',
      icon: <Layers size={32} />,
      title: 'Цифровые экосистемы',
      description: 'Разработка комплексных цифровых решений с интеграцией множества сервисов в единую архитектуру',
      features: [
        'Стратегия цифровой экосистемы',
        'Интеграция сервисов и платформ',
        'API и микросервисная архитектура',
        'Управление данными',
        'Масштабируемость и надежность',
        'Техническая документация'
      ],
    },
    {
      id: 'web-app',
      icon: <Code size={32} />,
      title: 'Веб и мобильная разработка',
      description: 'Создание современных веб-приложений и нативных мобильных решений с использованием передовых технологий',
      features: [
        'Разработка веб-приложений',
        'Мобильные приложения (iOS, Android)',
        'Progressive Web Apps (PWA)',
        'Backend разработка',
        'База данных и API',
        'Оптимизация производительности'
      ],
    },
    {
      id: 'blockchain',
      icon: <Rocket size={32} />,
      title: 'Блокчейн и Web3 решения',
      description: 'Разработка децентрализованных приложений и интеграция с блокчейн технологиями',
      features: [
        'Smart-контракты',
        'DeFi приложения',
        'NFT платформы',
        'DAO системы',
        'Токеномика',
        'Аудит безопасности'
      ],
    },
    {
      id: 'design',
      icon: <Palette size={32} />,
      title: 'UI/UX и 3D дизайн',
      description: 'Создание визуальных концепций от интерфейсов до 3D миров и брендинга',
      features: [
        'UI/UX дизайн',
        'Брендинг и айдентика',
        'Дизайн-система',
        'Прототипирование',
        'Адаптивный дизайн',
        '3D визуализация'
      ],
    },
    {
      id: 'marketing',
      icon: <TrendingUp size={32} />,
      title: 'Digital маркетинг',
      description: 'Комплексное продвижение цифровых продуктов и брендов в онлайн-пространстве',
      features: [
        'Маркетинговая стратегия',
        'SMM и контент-маркетинг',
        'SEO оптимизация',
        'Таргетированная реклама',
        'Email маркетинг',
        'Аналитика и отчетность'
      ],
    },
    {
      id: 'documents',
      icon: <FileText size={32} />,
      title: 'Техническая документация',
      description: 'Разработка профессиональной документации для проектов и инвестиций',
      features: [
        'Техническая документация',
        'Whitepaper',
        'Питч-деки',
        'Бизнес-планы',
        'Юридические документы',
        'API документация'
      ],
    },
    {
      id: 'video',
      icon: <Film size={32} />,
      title: 'Видео и анимация',
      description: 'Создание промо-контента, анимаций и визуальных материалов для брендов',
      features: [
        'Промо-видео',
        'Explainer видео',
        'Анимация и моушн-дизайн',
        'Видео для соцсетей',
        '3D анимация',
        'Монтаж и постпродакшн'
      ],
    },
  ];

  const toggleService = (id: string) => {
    if (expandedServiceId === id) {
      setExpandedServiceId(null);
    } else {
      setExpandedServiceId(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedServices.length === 0) {
      alert('Пожалуйста, выберите хотя бы одну услугу');
      return;
    }

    try {
      const selectedServicesList = selectedServices
        .map(id => services.find(s => s.id === id)?.title)
        .filter(Boolean)
        .join(', ');

      const message = `
🎯 Новая заявка на услуги

📋 Выбранные услуги:
${selectedServicesList}

📞 Контактная информация:
Email: ${email}
Телефон: ${phone}
Мессенджер: ${messenger || 'Не указан'}
      `.trim();

      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
          }),
        });

        if (response.ok) {
          alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
          setSelectedServices([]);
          setEmail('');
          setPhone('+');
          setMessenger('');
        } else {
          throw new Error('Failed to send message');
        }
      } else {
        const telegramUrl = `https://t.me/FoxampyLab_contact_bot?start=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
        alert('📱 Перенаправляем в Telegram для завершения заявки...');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('❌ Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую.');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith('+')) {
      setPhone('+' + value.replace(/\+/g, ''));
    } else {
      setPhone(value);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505]">
      <div className="fixed inset-0 wireframe-grid pointer-events-none" />
      
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="font-mono text-[10px] text-[#E0E0E0] tracking-[0.5em] mb-6">
                ─── УСЛУГИ ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-[#E0E0E0] tracking-tight mb-6">
                Комплексные решения для вашего бизнеса
              </h1>
              
              <p className="font-mono text-sm text-[#E0E0E0]/80 max-w-2xl mx-auto leading-relaxed">
                От стратегии до реализации — создаем цифровые продукты, которые работают и приносят результат
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const isSelected = selectedServices.includes(service.id);
                const isExpanded = expandedServiceId === service.id;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => toggleService(service.id)}
                    className={`relative border cursor-pointer p-6 transition-all duration-300 group ${
                      isSelected 
                          ? 'border-[#E0E0E0] bg-[#E0E0E0]/5' 
                          : 'border-[#E0E0E0]/20 bg-[#050505] hover:border-[#E0E0E0]/30'
                        }
                    `}
                  >
                    {/* Пиксельная звезда */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          className="absolute top-4 right-4"
                        >
                          <div className="relative">
                            {/* Центральная точка */}
                            <div className="w-2 h-2 bg-[#E0E0E0] rounded-full"></div>
                            {/* Лучи звезды */}
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-full w-0.5 h-4 bg-[#E0E0E0]"></div>
                            <div className="absolute top-1/2 left-1 -translate-x-full w-4 h-0.5 bg-[#E0E0E0]"></div>
                            <div className="absolute top-1/2 right-1 translate-x-0 w-4 h-0.5 bg-[#E0E0E0]"></div>
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-full w-0.5 h-4 bg-[#E0E0E0]"></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className={`mb-3 md:mb-4 transition-colors ${
                      isSelected ? 'text-[#E0E0E0]' : 'text-[#E0E0E0]/80 group-hover:text-[#E0E0E0]'
                    }`}>
                      {service.icon}
                    </div>
                    
                    <h3 className={`font-mono text-xs md:text-sm text-center transition-colors ${
                      isSelected ? 'text-[#E0E0E0]' : 'text-[#E0E0E0]/80'
                    }`}>
                      {service.title}
                    </h3>
                    
                    <p className={`font-mono text-[10px] text-center mt-2 leading-relaxed ${
                      isSelected ? 'text-[#E0E0E0]/90' : 'text-[#E0E0E0]/60'
                    }`}>
                      {service.description}
                    </p>

                    {/* Расширенная информация */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-[#E0E0E0]/20"
                        >
                          <ul className="space-y-1">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="font-mono text-[10px] text-[#E0E0E0]/70 flex items-center">
                                <span className="w-1 h-1 bg-[#E0E0E0]/50 rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border border-[#E0E0E0]/20 bg-[#050505]/50"
            >
              <h2 className="font-mono text-2xl text-[#E0E0E0] mb-6 text-center">
                Заказать консультацию
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] text-[#E0E0E0]/60 tracking-widest mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#050505] border border-[#E0E0E0]/20 text-[#E0E0E0] font-mono text-sm focus:border-[#E0E0E0]/50 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-mono text-[10px] text-[#E0E0E0]/60 tracking-widest mb-2">
                      ТЕЛЕФОН
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 bg-[#050505] border border-[#E0E0E0]/20 text-[#E0E0E0] font-mono text-sm focus:border-[#E0E0E0]/50 focus:outline-none transition-colors"
                      placeholder="+7 (999) 999-99-99"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-mono text-[10px] text-[#E0E0E0]/60 tracking-widest mb-2">
                    МЕССЕНДЖЕР (опционально)
                  </label>
                  <input
                    type="text"
                    value={messenger}
                    onChange={(e) => setMessenger(e.target.value)}
                    className="w-full px-4 py-3 bg-[#050505] border border-[#E0E0E0]/20 text-[#E0E0E0] font-mono text-sm focus:border-[#E0E0E0]/50 focus:outline-none transition-colors"
                    placeholder="@username"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-widest hover:bg-[#E0E0E0]/90 transition-colors"
                >
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
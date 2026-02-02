"use client";

import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { isMobile } from '@/lib/device';
import InteractiveSphere from '@/components/visuals/InteractiveSphere';
import TerrainGrid from '@/components/visuals/TerrainGrid';
import GalleryCarousel from '@/components/sections/GalleryCarousel';
import FAQSection from '@/components/sections/FAQSection';

import BootSequence from '@/components/boot/BootSequence';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowRight, Sparkle, PlayCircle, Calendar, Clock, User, Mail, Phone, MessageSquare, X } from 'lucide-react';
import CalendarPicker from '@/components/forms/CalendarPicker';
import ServicesDetailModal from '@/components/sections/ServicesDetailModal';
import FlippableServiceCard from '@/components/sections/FlippableServiceCard';
import { useI18n } from '@/lib/i18n/context';
import { TelegramService } from '@/lib/telegram';
import { homeFAQ } from '@/lib/seo/faq-data';
import { getFAQSchema } from '@/lib/seo/structured-data';

export default function Home() {
  const { t, language } = useI18n();
  const [isBooting, setIsBooting] = useState(true);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const servicesData = useMemo(() => {
    return t('home.solutions.services', { returnObjects: true }) as any[];
  }, [t, language]);

  const projectsData = useMemo(() => {
    return t('home.ventures.projects', { returnObjects: true }) as any[];
  }, [t, language]);

  const cases = useMemo(() => [
    {
      id: 'web3-bank',
      title: t('cases.web3Bank.title'),
      category: t('cases.web3Bank.category'),
      description: t('cases.web3Bank.description'),
      technologies: ['Solidity', 'Web3.js', 'Everscale', 'Ethereum', 'Smart Contracts', 'Bridge Technology'],
      solution: t('cases.web3Bank.solution'),
      visuals: t('cases.web3Bank.visuals')
    },
    {
      id: 'mail-services',
      title: t('cases.mailServices.title'),
      category: t('cases.mailServices.category'),
      description: t('cases.mailServices.description'),
      technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'REST API'],
      solution: t('cases.mailServices.solution'),
      visuals: t('cases.mailServices.visuals')
    }
  ], [t]);

  const sections = useMemo(() => [
    {
      id: 'solutions',
      title: t('home.solutions.title'),
      subtitle: t('home.solutions.subtitle'),
      description: t('home.solutions.description'),
      services: servicesData,
    },
    {
      id: 'cases',
      title: t('home.gallery.title'),
      subtitle: t('home.gallery.subtitle'),
      description: t('home.gallery.description'),
      cases: cases,
      cta: t('home.gallery.cta'),
      target: '/gallery'
    },
    {
      id: 'hub',
      title: t('home.nexus.title'),
      subtitle: t('home.nexus.subtitle'),
      description: t('home.nexus.description'),
      cta: t('home.nexus.cta'),
      target: '/hub',
    },
    {
      id: 'intelligence',
      title: t('home.intelligence.title'),
      subtitle: t('home.intelligence.subtitle'),
      description: t('home.intelligence.description'),
    },
  ], [t, language, servicesData, cases]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-transparent overflow-x-hidden"
    >
      <AnimatePresence>
        {isBooting && <BootSequence />}
      </AnimatePresence>

      <Header />

      {/* Hero */}
      <section
        className="relative z-10 min-h-screen grid md:grid-cols-2 items-center gap-8"
        style={{ opacity: isBooting ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-8 md:py-28 w-full md:col-span-1">
          <div className="flex flex-col gap-4 md:gap-5 p-4 md:p-6 bg-glass-matte rounded-sm">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-mono text-[#E0E0E0] leading-tight"
            >
              {t('home.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg lg:text-xl font-mono text-[#E0E0E0]/80 leading-relaxed max-w-3xl"
            >
              {t('home.subtitle')}
            </motion.p>

            <div className="flex flex-col gap-4">
              <div className="flex">
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-widest flex items-center gap-3 w-full md:w-auto"
                  >
                    {t('home.ctaButton1')}
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/gallery" className="flex-1 md:flex-initial">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 border border-[#E0E0E0]/20 text-[#E0E0E0]/90 font-mono text-sm tracking-widest flex items-center gap-3 w-full"
                  >
                    {t('home.ctaButton3')}
                    <PlayCircle size={16} />
                  </motion.button>
                </Link>
                <Link href="/hub" className="flex-1 md:flex-initial">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 border border-[#E0E0E0]/40 text-[#E0E0E0] font-mono text-sm tracking-widest flex items-center gap-3 w-full whitespace-nowrap"
                  >
                    {t('home.ctaButton2')}
                    <Sparkle size={16} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative h-[400px] md:h-[600px] pointer-events-auto cursor-pointer md:col-span-1"
        >
          <InteractiveSphere mousePos={mousePos} />
        </motion.div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`relative z-10 min-h-screen flex items-center justify-center ${section.id === 'cases' ? 'pt-32' : ''}`}
          style={{
            opacity: isBooting ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          {section.id === 'intelligence' && (
            <>
              <div className="absolute inset-0 z-0 opacity-40 overflow-hidden w-screen">
                <TerrainGrid
                  mousePos={mousePos}
                  className="w-full h-full scale-110 md:scale-125"
                />
              </div>
              
              {/* Мультидисциплинарный синтез - карточки услуг */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  {
                    id: 'ecosystems',
                    title: 'Создаем продукты и проекты',
                    description: 'Разработка комплексных продуктов и проектов с полной поддержкой от идеи до реализации',
                    features: ['Разработка продуктов под ключ', 'Интеграция сервисов', 'API архитектура', 'Управление данными', 'Масштабируемость']
                  },
                  {
                    id: 'web-mobile',
                    title: 'Веб и мобильная разработка',
                    description: 'Создание современных веб-приложений и нативных мобильных решений',
                    features: ['React/Next.js', 'iOS/Android', 'PWA', 'Backend', 'База данных', 'Оптимизация']
                  },
                  {
                    id: 'blockchain',
                    title: 'Блокчейн и Web3 решения',
                    description: 'Разработка децентрализованных приложений и интеграция с блокчейн технологиями',
                    features: ['Smart-контракты', 'DeFi приложения', 'NFT платформы', 'DAO системы', 'Токеномика']
                  },
                  {
                    id: 'design-branding',
                    title: 'Дизайн и брендинг',
                    description: 'Создание визуальных концепций и комплексных брендинговых стратегий',
                    features: ['UI/UX дизайн', 'Брендинг и айдентика', 'Дизайн-система', 'Прототипирование', '3D визуализация']
                  },
                  {
                    id: 'marketing',
                    title: 'Digital маркетинг',
                    description: 'Комплексное продвижение цифровых продуктов и брендов',
                    features: ['Маркетинговая стратегия', 'SMM и контент', 'SEO оптимизация', 'Таргетированная реклама', 'Привлечение трафика', 'Настройка воронок', 'Автоматизация', 'CRM системы']
                  },
                  {
                    id: 'fashion-architecture',
                    title: 'Фэшн и архитектура',
                    description: 'Создание цифровых моделей одежды и архитектурных визуализаций',
                    features: ['3D моделирование', 'Digital Fashion', 'Архитектурная визуализация', 'Виртуальные примерочные', 'Fashion Tech', 'AR/VR решения']
                  },
                  {
                    id: 'video-animation',
                    title: 'Видео и анимация',
                    description: 'Создание промо-контента, анимаций и визуальных материалов',
                    features: ['Промо-видео', 'Explainer видео', 'Моушн-дизайн', '3D анимация', 'Видео для соцсетей', 'Монтаж и постпродакшн']
                  },
                  {
                    id: 'gamedev-gamification',
                    title: 'Геймдев и геймификация',
                    description: 'Разработка игр и игровых механик для вовлечения пользователей',
                    features: ['Разработка игр', 'Геймификация процессов', 'Обучающие симуляторы', 'VR/AR игры', 'Игровые механики', 'Gamification стратегия']
                  }
                ].map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border border-[#E0E0E0]/20 bg-[#050505]/50 hover:border-[#E0E0E0]/50 
                             hover:bg-[#E0E0E0]/5 transition-all p-6 group backdrop-blur-sm"
                  >
                    <div className="mb-4">
                      <div className="w-10 h-10 border border-[#E0E0E0]/40 flex items-center justify-center mb-3">
                        <div className="font-mono text-xs text-[#E0E0E0]/80">◈</div>
                      </div>
                    </div>
                    
                    <h3 className="font-mono text-lg text-[#E0E0E0] group-hover:text-[#FFFFFF] transition-colors mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <div className="space-y-1">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="font-mono text-[10px] text-[#E0E0E0]/60 flex items-center">
                          <span className="w-1 h-1 bg-[#E0E0E0]/40 rounded-full mr-2 flex-shrink-0"></span>
                          {feature}
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <div className="font-mono text-[10px] text-[#E0E0E0]/50">
                          +{service.features.length - 3} еще
                        </div>
                      )}
                    </div>
                    
                    <Link href="/services">
                      <div className="font-mono text-[10px] text-[#E0E0E0] tracking-wider mt-4 hover:text-[#FFFFFF] transition-colors">
                        Подробнее в услугах →
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className={`inline-block p-4 md:p-6 bg-glass-matte border border-white/10 rounded-sm ${section.id === 'cases' ? 'mb-12' : ''}`}>
              <div className="font-mono text-[10px] text-[#E0E0E0] tracking-[0.5em] mb-6">
                ─── {section.title} ───
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-6xl font-mono font-light tracking-tight text-[#E0E0E0] mb-4 md:mb-6">
                {section.subtitle}
              </h1>

              {section.description && (
                <p className="font-mono text-sm md:text-base lg:text-lg text-[#E0E0E0]/80 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
                  {section.description}
                </p>
              )}

              {section.cta && section.id !== 'cases' && (
                <Link href={section.target ?? '/services'}>
                  <button className="px-8 py-4 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-widest
                                   flex items-center gap-3 mx-auto transition-all hover:bg-[#FFFFFF]">
                    {section.cta}
                    <ArrowRight size={16} />
                  </button>
                </Link>
              )}
            </div>

            {section.id === 'solutions' && section.services && (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                {section.services.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <FlippableServiceCard service={service} t={t} />
                  </motion.div>
                ))}
              </div>
            )}

            {section.id === 'cases' && (
              <div className="mt-16">
                <GalleryCarousel />
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-[#E0E0E0]/20 pointer-events-none z-20" />

      {/* FAQ Section for SEO and LLM */}
      <section className="relative z-10 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(homeFAQ)) }}
        />
        <FAQSection items={homeFAQ} />
      </section>

      <ConsultationForm />

      <ServicesDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

function ConsultationForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+');
  const [message, setMessage] = useState('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getAvailableWeekDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith('+')) {
      setPhone('+' + value.replace(/\+/g, ''));
    } else {
      setPhone(value);
    }
  };

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    try {
      const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
      }

      const consultationData = {
        name,
        email,
        phone,
        date: selectedDate.toLocaleDateString('ru-RU'),
        time: selectedTime,
        message: message || 'Не указано'
      };

      if (TelegramService.isConfigured()) {
        await TelegramService.sendMessage(
          TelegramService.formatConsultationMessage(consultationData)
        );
        alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      } else {
        const telegramMessage = TelegramService.formatConsultationMessage(consultationData);
        const telegramUrl = `${TelegramService.getBotUrl()}?start=${encodeURIComponent(telegramMessage)}`;
        window.open(telegramUrl, '_blank');
        alert('📱 Перенаправляем в Telegram для завершения заявки...');
      }

      setIsExpanded(false);
      setSelectedDate(null);
      setSelectedTime('');
      setName('');
      setEmail('');
      setPhone('+');
      setMessage('');
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('❌ Произошла ошибка при отправке.');
      const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Отправить заявку';
      }
    }
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  };

  const availableDates = getAvailableWeekDates();

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#E0E0E0] text-[#050505] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FFFFFF] transition-colors"
      >
        <Calendar size={24} />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 100, x: -100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, x: -100, scale: 0.8 }}
              className="absolute bottom-24 left-6 z-[60] w-[calc(100vw-3rem)] md:w-[450px] pointer-events-auto"
            >
              <div className="bg-glass-matte border border-white/10 overflow-hidden rounded-sm">
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                  <h2 className="font-mono text-sm uppercase tracking-widest text-[#E0E0E0]">Заявка на консультацию</h2>
                  <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-white/5 transition-colors rounded-full">
                    <X size={18} className="text-[#E0E0E0]/60" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/40 mb-2">
                        <User size={12} /> Имя
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Ваше имя"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-white/30 focus:outline-none transition-colors placeholder:text-white/10"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/40 mb-2">
                        <Mail size={12} /> Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="mail@example.com"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-white/30 focus:outline-none transition-colors placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/40 mb-2">
                      <Phone size={12} /> Телефон
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/40 mb-2">
                        <Calendar size={12} /> Дата
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowCalendar(true)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white font-mono text-xs text-left flex justify-between items-center hover:bg-white/10 transition-all"
                      >
                        {selectedDate ? formatDateForDisplay(selectedDate) : 'Выбрать...'}
                        <ArrowRight size={10} className="opacity-40" />
                      </button>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/40 mb-2">
                        <Clock size={12} /> Время
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-black">Выбрать...</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time} className="bg-black">{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!selectedDate || !selectedTime}
                      className="w-full py-3 bg-[#E0E0E0] text-[#050505] font-mono text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-[#FFFFFF] transition-colors disabled:opacity-30"
                    >
                      Отправить заявку
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCalendar(true)}
                      className="w-full mt-3 text-center font-mono text-[9px] uppercase tracking-wider text-[#E0E0E0]/30 hover:text-[#E0E0E0]/60 transition-colors"
                    >
                      ─── Открыть полный календарь ───
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showCalendar && (
        <CalendarPicker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          availableDates={availableDates}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </>
  );
}

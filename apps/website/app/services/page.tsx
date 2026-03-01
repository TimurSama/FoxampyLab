"use client";

import { useState, useEffect } from 'react';
import { TelegramService } from '@/lib/telegram';
import { submitLead } from '@/lib/forms/submitLead';
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
  ArrowRight,
  Zap,
  Gamepad2,
  Send
} from 'lucide-react';
import Header from '@/components/layout/Header';
import ServicesDetailModal from '@/components/sections/ServicesDetailModal';
import ErrorModal from '@/components/modals/ErrorModal';
import ServicePackages from '@/components/sections/ServicePackages';

export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+');
  const [messenger, setMessenger] = useState('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; error: string; telegramMessage?: string }>({
    isOpen: false,
    error: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      id: 'business',
      icon: <Layers size={32} />,
      title: 'Бизнес стратегирование',
      description: 'Проектирование фундаментов бизнеса от Vision & Mission до детальных White Papers и инвестиционных меморандумов',
      features: [
        'Vision & Mission разработка',
        'White Papers и Litepapers',
        'Инвестиционные меморандумы',
        'Токеномика и экономические модели',
        'Бизнес-планирование',
        'Стратегическое консультирование'
      ],
    },
    {
      id: 'it',
      icon: <Code size={32} />,
      title: 'Разработка экосистем',
      description: 'Создание технологического ДНК продукта: масштабируемые платформы, AI-интеграции и блокчейн-решения',
      features: [
        'Архитектура экосистем',
        'Блокчейн разработка',
        'AI/ML интеграции',
        'Масштабируемые платформы',
        'Микросервисная архитектура',
        'API и интеграции'
      ],
    },
    {
      id: 'blockchain',
      icon: <Rocket size={32} />,
      title: 'Блокчейн и Web3 решения',
      description: 'Разработка децентрализованных приложений с аудитом безопасности и токеномикой',
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
      id: 'branding',
      icon: <Palette size={32} />,
      title: 'Брендинг и айдентика',
      description: 'Создаем бренды как живые организмы с уникальным кодом айдентики и маркетинговых стратегий',
      features: [
        'Бренд-стратегия',
        'Визуальная идентичность',
        'Дизайн-системы',
        'Маркетинговые стратегии',
        'Контент-стратегия',
        'Digital маркетинг'
      ],
    },
    {
      id: 'spatial',
      icon: <Zap size={32} />,
      title: 'Цифровой дизайн и фэшн',
      description: 'Параметрический дизайн, архитектурные визуализации и Fashion Tech решения',
      features: [
        'Параметрический дизайн',
        'Архитектурное проектирование',
        'Fashion дизайн',
        '3D прототипирование',
        'Цифровые двойники',
        'Концептуальные решения'
      ],
    },
    {
      id: 'cinema',
      icon: <Film size={32} />,
      title: 'Видеопродакшн и CGI',
      description: 'Продакшн будущего: от концептуального сторителлинга до сложного CGI и видео-арта',
      features: [
        'Видео продакшн',
        'CGI и визуальные эффекты',
        'Motion design',
        'Концептуальный сторителлинг',
        '3D анимация',
        'Постпродакшн'
      ],
    },
    {
      id: 'rd',
      icon: <FileText size={32} />,
      title: 'Исследования и R&D',
      description: 'Лаборатория фундаментальных инноваций: патентоспособные технологии и инженерные решения',
      features: [
        'Научные исследования',
        'Инженерные разработки',
        'Прототипирование',
        'Патентование технологий',
        'Прикладная физика',
        'Материаловедение'
      ],
    },
    {
      id: 'marketing',
      icon: <TrendingUp size={32} />,
      title: 'Digital маркетинг и рост',
      description: 'Комплексное продвижение цифровых продуктов с настройкой воронок и автоматизацией',
      features: [
        'Маркетинговая стратегия',
        'SMM и контент-маркетинг',
        'SEO оптимизация',
        'Таргетированная реклама',
        'Воронки продаж',
        'CRM интеграция'
      ],
    },
    {
      id: 'gamedev',
      icon: <Gamepad2 size={32} />,
      title: 'Геймдев и геймификация',
      description: 'Разработка игр и игровых механик для вовлечения пользователей и обучения',
      features: [
        'Мобильные и веб игры',
        'Геймификация бизнес-процессов',
        'Обучающие симуляторы',
        'Игровые механики в приложениях',
        'VR/AR игры',
        'Gamification стратегия'
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

  // Блокируем скролл страницы когда карточка открыта и добавляем обработчик ESC
  useEffect(() => {
    if (expandedServiceId) {
      document.body.style.overflow = 'hidden';
      
      // Закрытие по ESC
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setExpandedServiceId(null);
        }
      };
      
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedServiceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      setErrorModal({
        isOpen: true,
        error: 'Пожалуйста, выберите хотя бы одну услугу',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedServicesList = selectedServices
        .map(id => services.find(s => s.id === id)?.title)
        .filter((title): title is string => Boolean(title));

      await submitLead({
        type: 'services',
        data: {
          services: selectedServicesList,
          email,
          phone,
          messenger: messenger || undefined,
        },
      });

      alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      setSelectedServices([]);
      setEmail('');
      setPhone('+');
      setMessenger('');
    } catch (error) {
      console.error('Failed to submit form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую.';
      const telegramMessage = TelegramService.formatServiceRequestMessage({
        services: selectedServices.map(id => services.find(s => s.id === id)?.title || '').filter(Boolean),
        email,
        phone,
        messenger: messenger || undefined,
      });
      setErrorModal({
        isOpen: true,
        error: errorMessage,
        telegramMessage,
      });
    } finally {
      setIsSubmitting(false);
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
    <div className="relative min-h-screen bg-transparent">
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

              <h1 className="text-4xl md:text-6xl font-mono text-[#E0E0E0] tracking-tight mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)' }}>
                Комплексные решения для вашего бизнеса
              </h1>

              <p className="font-mono text-sm text-[#E0E0E0]/80 max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>
                От стратегии до реализации — создаем цифровые продукты, которые работают и приносят результат
              </p>

              {/* Кнопка заказа */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://t.me/FoxampyLab_contact_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-black font-mono text-sm tracking-widest uppercase hover:bg-[#E0E0E0] transition-all flex items-center gap-3"
                >
                  <Send size={18} />
                  Заказать проект
                </a>
                <button
                  onClick={() => document.getElementById('services-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-white/30 text-white font-mono text-sm tracking-widest uppercase hover:bg-white/10 transition-all"
                >
                  Выбрать услуги
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="font-mono text-[10px] text-[#E0E0E0]/60 tracking-[0.5em] mb-4">
                ─── ПРЕИМУЩЕСТВА ───
              </div>
              <h2 className="text-2xl md:text-3xl font-mono text-[#E0E0E0] tracking-tight mb-4" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.7)' }}>
                Почему выбирают нас
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { title: 'Мультидисциплинарный подход', desc: 'Комплексные решения на стыке IT, дизайна, маркетинга и науки' },
                { title: 'Фиксированные сроки', desc: 'Четкие дедлайны с гарантией выполнения в срок' },
                { title: 'Прозрачное ценообразование', desc: 'Детальная смета без скрытых платежей' },
                { title: 'Поддержка 24/7', desc: 'Постоянная связь с командой на всех этапах проекта' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-glass-matte border border-white/10 hover:border-white/20 transition-all"
                >
                  <h3 className="font-mono text-sm text-[#E0E0E0] mb-2">{item.title}</h3>
                  <p className="font-mono text-[10px] text-[#E0E0E0]/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Special Offer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative p-8 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-sm mb-12"
            >
              <div className="absolute top-0 right-0 bg-white text-black font-mono text-[10px] px-3 py-1 tracking-widest">
                СПЕЦПРЕДЛОЖЕНИЕ
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-mono text-xl text-[#E0E0E0] mb-2 flex items-center gap-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
                    <span className="inline-flex items-center justify-center w-8 h-8 border border-white/30">
                      <Star size={18} className="text-white" />
                    </span>
                    Скидка 15% при комплексном заказе
                  </h3>
                  <p className="font-mono text-sm text-[#E0E0E0]/70">
                    Закажите 3+ услуги и получите скидку на весь проект + бесплатную консультацию
                  </p>
                </div>
                <div className="text-center">
                  <div className="font-mono text-[10px] text-[#E0E0E0]/50 mb-1">БЕСПЛАТНО</div>
                  <div className="font-mono text-lg text-[#E0E0E0]">Первичная консультация</div>
                  <div className="font-mono text-[10px] text-[#E0E0E0]/50">30-60 минут</div>
                </div>
              </div>
            </motion.div>

            {/* Funnel / Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <div className="font-mono text-[10px] text-[#E0E0E0]/60 tracking-[0.5em] mb-4">
                  ─── ПРОЦЕСС РАБОТЫ ───
                </div>
                <h2 className="text-xl md:text-2xl font-mono text-[#E0E0E0] tracking-tight" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.7)' }}>
                  От идеи до результата
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { step: '01', title: 'Консультация', desc: 'Бесплатная встреча, анализ задачи' },
                  { step: '02', title: 'Коммерческое предложение', desc: 'Детальная смета и сроки' },
                  { step: '03', title: 'Разработка', desc: 'Итеративная работа с обратной связью' },
                  { step: '04', title: 'Тестирование', desc: 'Проверка качества и доработки' },
                  { step: '05', title: 'Запуск и поддержка', desc: 'Сдача проекта и сопровождение' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative p-4 bg-glass-matte border border-white/10"
                  >
                    <div className="font-mono text-2xl text-[#E0E0E0]/20 mb-2">{item.step}</div>
                    <h4 className="font-mono text-xs text-[#E0E0E0] mb-1">{item.title}</h4>
                    <p className="font-mono text-[9px] text-[#E0E0E0]/50">{item.desc}</p>
                    {i < 4 && (
                      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                        <ArrowRight size={16} className="text-[#E0E0E0]/30" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="font-mono text-[10px] text-[#E0E0E0]/60 tracking-[0.5em] mb-4">
                ─── ВЫБЕРИТЕ УСЛУГИ ───
              </div>
              <h2 className="text-2xl md:text-3xl font-mono text-[#E0E0E0] tracking-tight mb-2" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.7)' }}>
                Наши направления
              </h2>
              <p className="font-mono text-sm text-[#E0E0E0]/60">
                Кликните для подробностей, выберите несколько для комплексного заказа
              </p>
            </motion.div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => {
                const isSelected = selectedServices.includes(service.id);
                const isExpanded = expandedServiceId === service.id;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      zIndex: isExpanded ? 50 : 1
                    }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => toggleService(service.id)}
                    className={`relative cursor-pointer p-6 transition-all duration-300 group rounded-sm ${isSelected
                      ? 'border-white/40 bg-black/40 backdrop-blur-2xl'
                      : 'bg-glass-matte hover:border-white/20'
                      }
                    `}
                    style={{
                      zIndex: isExpanded ? 50 : 1
                    }}
                  >
                    {/* Пиксельная звезда */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          className="absolute top-4 right-4 z-10"
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

                    <div className={`mb-3 md:mb-4 transition-colors ${isSelected ? 'text-[#E0E0E0]' : 'text-[#E0E0E0]/80 group-hover:text-[#E0E0E0]'
                      }`}>
                      {service.icon}
                    </div>

                    <h3 className={`font-mono text-xs md:text-sm text-center transition-colors ${isSelected ? 'text-[#E0E0E0]' : 'text-[#E0E0E0]/80'
                      }`}>
                      {service.title}
                    </h3>

                    <p className={`font-mono text-[10px] text-center mt-2 leading-relaxed ${isSelected ? 'text-[#E0E0E0]/90' : 'text-[#E0E0E0]/60'
                      }`}>
                      {service.description}
                    </p>

                    {/* Расширенная информация */}
                    <AnimatePresence>
                      {isExpanded && (
                        <>
                          {/* Mobile версия - внутри карточки */}
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pt-4 border-t border-[#E0E0E0]/20"
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

                          {/* Desktop версия - оверлей поверх всего контента */}
                          <>
                            {/* Overlay с затемнением - закрытие по клику в любое место */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                              className="hidden md:block fixed inset-0 bg-black/85 backdrop-blur-md"
                              onClick={() => toggleService(service.id)}
                              style={{ 
                                cursor: 'pointer',
                                zIndex: 9998
                              }}
                            />
                            
                            <motion.div
                              initial={{ 
                                opacity: 0, 
                                scale: 0.75, 
                                y: 40,
                                filter: 'blur(20px)'
                              }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                y: 0,
                                filter: 'blur(0px)'
                              }}
                              exit={{ 
                                opacity: 0, 
                                scale: 0.85, 
                                y: -20,
                                filter: 'blur(15px)'
                              }}
                              transition={{ 
                                duration: 0.5, 
                                ease: [0.16, 1, 0.3, 1],
                                filter: { duration: 0.4 }
                              }}
                              className="hidden md:flex fixed inset-0 items-center justify-center p-4 pointer-events-none"
                              onClick={() => toggleService(service.id)}
                              style={{ 
                                cursor: 'pointer',
                                zIndex: 9999
                              }}
                            >
                              <motion.div
                                className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-[#050505] border border-[#E0E0E0]/25 rounded-sm pointer-events-auto"
                                style={{
                                  background: 'rgba(5, 5, 5, 0.96)',
                                  backdropFilter: 'blur(24px)',
                                  WebkitBackdropFilter: 'blur(24px)',
                                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                                  cursor: 'default'
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Заголовок с кнопкой закрытия */}
                                <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-[#E0E0E0]/10 sticky top-0 bg-[#050505]/98 backdrop-blur-sm z-10">
                                  <div className="flex items-center gap-4 max-w-[85%] pr-2">
                                    <div className="text-[#E0E0E0] flex-shrink-0">
                                      {service.icon}
                                    </div>
                                    <h3 className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#FFFFFF] uppercase tracking-[0.12em] leading-tight" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                                      {service.title}
                                    </h3>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleService(service.id);
                                    }}
                                    className="text-[#E0E0E0]/40 hover:text-white transition-colors p-2 -mt-2 -mr-2 flex-shrink-0"
                                    aria-label="Close"
                                  >
                                    <X size={18} />
                                  </button>
                                </div>

                                {/* Контент с уменьшенными шрифтами */}
                                <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 md:space-y-5">
                                  {/* Описание */}
                                  <section>
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                      <div className="w-1 h-[8px] sm:h-[10px] bg-[#E0E0E0]"></div>
                                      <h4 className="font-mono text-[9px] sm:text-[10px] md:text-xs text-[#E0E0E0]/80 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                                        // Approach Analysis
                                      </h4>
                                    </div>
                                    <p className="font-mono text-[10px] sm:text-xs md:text-sm text-[#E0E0E0] leading-relaxed italic px-1" style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.7)' }}>
                                      "{service.description}"
                                    </p>
                                  </section>

                                  {/* Features */}
                                  <section>
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                      <div className="w-1 h-[8px] sm:h-[10px] bg-[#E0E0E0]/40"></div>
                                      <h4 className="font-mono text-[9px] sm:text-[10px] md:text-xs text-[#E0E0E0]/80 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                                        Capabilities Matrix
                                      </h4>
                                    </div>
                                    <div className="grid grid-cols-1 gap-px bg-[#E0E0E0]/10 border border-[#E0E0E0]/10">
                                      {service.features.map((feature, idx) => (
                                        <div key={idx} className="bg-[#050505]/30 p-2 sm:p-2.5 md:p-3 flex items-start gap-2 sm:gap-3 hover:bg-[#E0E0E0]/5 transition-colors">
                                          <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] text-[#E0E0E0]/20 mt-0.5 flex-shrink-0">
                                            {(idx + 1).toString().padStart(2, '0')}
                                          </span>
                                          <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-[#E0E0E0]/80 leading-snug uppercase tracking-wider">
                                            {feature}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </section>
                                </div>
                              </motion.div>
                            </motion.div>
                          </>
                        </>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Packages */}
        <section className="px-4 mb-16">
          <ServicePackages showComplex={true} />
        </section>

        {/* Contact Form */}
        <section className="px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-glass-matte"
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

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-widest hover:bg-[#E0E0E0]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                        ОТПРАВКА...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        ОТПРАВИТЬ ЗАЯВКУ
                      </>
                    )}
                  </button>
                  <a
                    href="https://t.me/FoxampyLab_contact_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-[#050505] hover:bg-[#0A0A0A] border border-white/20 transition-colors flex items-center justify-center gap-2"
                    title="Написать в Telegram"
                  >
                    <MessageSquare size={16} className="text-white" strokeWidth={1.5} />
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, error: '' })}
        error={errorModal.error}
        telegramMessage={errorModal.telegramMessage}
      />
    </div>
  );
}
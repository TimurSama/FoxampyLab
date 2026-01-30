"use client";

import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { isMobile } from '@/lib/device';
import InteractiveSphere from '@/components/visuals/InteractiveSphere';
import TerrainGrid from '@/components/visuals/TerrainGrid';

// Временно отключаем 3D фон до исправления ошибки
const InkFluidBackground = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#030303]">
    {/* Анимированный эффект как замена 3D */}
    <div className="absolute inset-0 opacity-20">
      <div className="w-full h-full" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 40%)`,
        animation: 'float 20s ease-in-out infinite'
      }} />
    </div>
  </div>
);
import BootSequence from '@/components/boot/BootSequence';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowRight, Sparkle, PlayCircle, Calendar, Clock, User, Mail, Phone, MessageSquare, X } from 'lucide-react';
import CalendarPicker from '@/components/forms/CalendarPicker';
import ServicesDetailModal from '@/components/sections/ServicesDetailModal';
import { useI18n } from '@/lib/i18n/context';
import { TelegramService } from '@/lib/telegram';

/**
 * Новая главная страница с 4D-навигацией
 * Z-axis камера управляется скроллом через GSAP ScrollTrigger
 */

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

  // Получаем данные services из переводов
  const servicesData = useMemo(() => {
    return t('home.solutions.services', { returnObjects: true }) as any[];
  }, [t, language]);

  // Получаем данные projects из переводов
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
      className="relative w-full bg-[#050505] overflow-x-hidden"
    >
      {/* Boot sequence overlay */}
      <AnimatePresence>
        {isBooting && <BootSequence />}
      </AnimatePresence>

      {/* Header */}
      <Header />

      {/* CSS Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <InkFluidBackground />
      </div>

      {/* Hero */}
      <section
        className="relative z-10 min-h-screen grid md:grid-cols-2 items-center gap-8"
        style={{ opacity: isBooting ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-8 md:py-28 w-full md:col-span-1">
          <div className="flex flex-col gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-mono text-[#E0E0E0] leading-tight"
            >
              {t('home.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl lg:text-2xl font-mono text-[#E0E0E0]/80 leading-relaxed max-w-3xl"
            >
              {t('home.subtitle')}
            </motion.p>

            <div className="flex flex-col gap-4">
              {/* Row 1: Order Project */}
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

              {/* Row 2: Gallery & Hub */}
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

        {/* Interactive Sphere */}
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
          className="relative z-10 min-h-screen flex items-center justify-center"
          style={{
            opacity: isBooting ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          {/* TerrainGrid background for intelligence section */}
          {section.id === 'intelligence' && (
            <div className="absolute inset-0 z-0 opacity-40 overflow-hidden w-screen">
              <TerrainGrid
                mousePos={mousePos}
                className="w-full h-full scale-110 md:scale-125"
              />
            </div>
          )}
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="font-mono text-[10px] text-[#E0E0E0] tracking-[0.5em] mb-6">
              ─── {section.title} ───
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-mono font-light tracking-tight text-[#E0E0E0] mb-4 md:mb-6">
              {section.subtitle}
            </h1>

            <p className="font-mono text-sm md:text-base lg:text-lg text-[#E0E0E0]/80 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
              {section.description}
            </p>

            {section.cta && (
              <Link href={section.target ?? '/services'}>
                <button className="px-8 py-4 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-widest
                                 flex items-center gap-3 mx-auto transition-all hover:bg-[#FFFFFF]">
                  {section.cta}
                  <ArrowRight size={16} />
                </button>
              </Link>
            )}

            {/* Services Grid для секции Solutions */}
            {section.id === 'solutions' && section.services && (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                {section.services.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      setSelectedService(service);
                      setIsModalOpen(true);
                    }}
                    className="border border-[#E0E0E0]/20 bg-[#050505]/50 hover:border-[#E0E0E0]/50 
                             hover:bg-[#E0E0E0]/5 transition-all cursor-pointer p-6 group"
                  >
                    <div className="mb-4 text-[#E0E0E0]">
                      <div className="w-10 h-10 border border-[#E0E0E0] flex items-center justify-center">
                        <span className="font-mono text-xs">◈</span>
                      </div>
                    </div>
                    <h3 className="font-mono text-lg text-[#E0E0E0] mb-2 group-hover:text-[#FFFFFF] transition-colors">
                      {service.subtitle}
                    </h3>
                    <p className="font-mono text-xs text-[#E0E0E0]/60 mb-4 leading-relaxed">
                      {service.description.substring(0, 120)}...
                    </p>
                    <div className="font-mono text-[10px] text-[#E0E0E0] tracking-wider">
                      {t('home.ventures.clickForDetails')}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Cases Grid для секции Cases */}
            {section.id === 'cases' && section.cases && (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {section.cases.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border border-[#E0E0E0]/20 bg-[#050505]/50 hover:border-[#E0E0E0]/50 
                             hover:bg-[#E0E0E0]/5 transition-all p-6 group backdrop-blur-sm"
                  >
                    <h3 className="font-mono text-xl text-[#E0E0E0] group-hover:text-[#FFFFFF] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-[#E0E0E0]/60 mb-4">
                      {item.category}
                    </p>
                    <p className="font-mono text-sm text-[#E0E0E0]/75 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="font-mono text-[10px] text-[#E0E0E0]/80 border border-[#E0E0E0]/30 px-2 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="font-mono text-[10px] text-[#E0E0E0]/50">
                          +{item.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-[#E0E0E0] tracking-wider mt-2">
                      Нажмите для деталей
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Projects Grid для секции Ventures */}
            {section.id === 'ventures' && (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {projectsData.map((project, idx) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border border-[#E0E0E0]/20 bg-[#050505]/50 hover:border-[#E0E0E0]/50 
                             hover:bg-[#E0E0E0]/5 transition-all p-6 group backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-mono text-xl text-[#E0E0E0] group-hover:text-[#FFFFFF] transition-colors">
                        {project.name}
                      </h3>
                      <span className="font-mono text-xs text-[#E0E0E0] border border-[#E0E0E0]/30 px-2 py-1">
                        {project.stage}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-[#E0E0E0]/75 leading-relaxed mb-4">
                      {project.status}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tag: string) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] text-[#E0E0E0]/80 border border-[#E0E0E0]/30 px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href="/hub">
                      <div className="font-mono text-[10px] text-[#E0E0E0] tracking-wider mt-4 hover:underline">
                        {t('home.ventures.viewInHub')}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Scroll indicator */}
      {/* (removed) Scroll indicator */}

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-[#E0E0E0]/20 pointer-events-none z-20" />

      {/* Consultation Booking Form */}
      <ConsultationForm />

      {/* Services Detail Modal */}
      <ServicesDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

// Consultation Booking Form Component
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

  // Получаем доступные даты для недельного календаря
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
    // Если пользователь удалил +, добавляем его обратно
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
      // Показываем loading состояние
      const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
      }

      // Формируем данные для отправки
      const consultationData = {
        name,
        email,
        phone,
        date: selectedDate.toLocaleDateString('ru-RU'),
        time: selectedTime,
        message: message || 'Не указано'
      };

      // Отправляем через Telegram API
      if (TelegramService.isConfigured()) {
        await TelegramService.sendMessage(
          TelegramService.formatConsultationMessage(consultationData)
        );

        // Показываем успешное сообщение
        alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      } else {
        // Fallback - открываем Telegram бота напрямую
        const telegramMessage = TelegramService.formatConsultationMessage(consultationData);
        const telegramUrl = `${TelegramService.getBotUrl()}?start=${encodeURIComponent(telegramMessage)}`;
        window.open(telegramUrl, '_blank');

        alert('📱 Перенаправляем в Telegram для завершения заявки...');
      }

      // Сброс формы
      setIsExpanded(false);
      setSelectedDate(null);
      setSelectedTime('');
      setName('');
      setEmail('');
      setPhone('+');
      setMessage('');

    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('❌ Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую.');

      // Восстанавливаем кнопку
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

  const getWeekDays = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekStart = new Date(today);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - (day === 0 ? 6 : day - 1);
    weekStart.setDate(diff);

    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(weekStart);
      weekDay.setDate(weekStart.getDate() + i);
      week.push(weekDay);
    }
    return week;
  };

  const weekDays = getWeekDays();
  const availableDates = getAvailableWeekDates();
  const isDateAvailable = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return availableDates.some(d => d.toISOString().split('T')[0] === dateStr);
  };

  return (
    <>
      {/* Floating Icon Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#E0E0E0] text-[#050505] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FFFFFF] transition-colors"
        aria-label="Записаться на консультацию"
      >
        <Calendar size={24} />
      </motion.button>

      {/* Expanded Form Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]/95 backdrop-blur-sm p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#050505] border border-[#E0E0E0]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]/10">
                <h2 className="font-mono text-lg text-[#E0E0E0]">Записаться на консультацию</h2>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-[#E0E0E0]/10 transition-colors"
                >
                  <X size={20} className="text-[#E0E0E0]" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Week Calendar Preview */}
                <div>
                  <label className="flex items-center gap-2 font-mono text-xs text-[#E0E0E0]/80 mb-3">
                    <Calendar size={14} />
                    Выберите дату
                  </label>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                      <div key={day} className="text-center font-mono text-[10px] text-[#E0E0E0]/60 py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-3">
                    {weekDays.map((date, idx) => {
                      const available = isDateAvailable(date);
                      const selected = selectedDate && date.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
                      const isToday = date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => available && setShowCalendar(true)}
                          disabled={!available}
                          className={`
                            aspect-square flex items-center justify-center font-mono text-xs transition-all
                            ${!available
                              ? 'text-[#E0E0E0]/20 cursor-not-allowed'
                              : selected
                                ? 'bg-[#E0E0E0] text-[#050505] border border-[#E0E0E0]'
                                : isToday
                                  ? 'border border-[#E0E0E0]/50 text-[#E0E0E0] hover:bg-[#E0E0E0]/10'
                                  : 'text-[#E0E0E0]/60 hover:bg-[#E0E0E0]/10 hover:text-[#E0E0E0] border border-transparent hover:border-[#E0E0E0]/20'
                            }
                          `}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                  {selectedDate && (
                    <div className="font-mono text-xs text-[#E0E0E0]/60 mb-2">
                      Выбрано: {selectedDate.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowCalendar(true)}
                    className="font-mono text-xs text-[#E0E0E0]/80 hover:text-[#E0E0E0] underline"
                  >
                    Открыть полный календарь →
                  </button>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <label className="flex items-center gap-2 font-mono text-xs text-[#E0E0E0]/80 mb-2">
                      <Clock size={14} />
                      Время
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-[#050505] border border-[#E0E0E0]/20 text-[#E0E0E0] font-mono text-sm focus:border-[#E0E0E0]/50 focus:outline-none transition-colors"
                    >
                      <option value="">Выберите время</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 font-mono text-xs text-[#E0E0E0]/80 mb-2">
                    <User size={14} />
                    Имя
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 bg-[#050505] border border-[#E0E0E0]/20 text-[#E0E0E0] font-mono text-sm placeholder:text-[#E0E0E0]/40 focus:border-[#E0E0E0]/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 font-mono text-xs text-[#E0E0E0]/80 mb-2">
                    <Mail size={14} />
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[#050505] border border-[#E0E0E0]/20 text-[#E0E0E0] font-mono text-sm placeholder:text-[#E0E0E0]/40 focus:border-[#E0E0E0]/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 font-mono text-xs text-[#E0E0E0]/80 mb-2">
                    <Phone size={14} />
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                    placeholder="+"
                    className="w-full px-4 py-3 bg-[#050505] border border-[#E0E0E0]/20 text-[#E0E0E0] font-mono text-sm placeholder:text-[#E0E0E0]/40 focus:border-[#E0E0E0]/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="flex items-center gap-2 font-mono text-xs text-[#E0E0E0]/80 mb-2">
                    <MessageSquare size={14} />
                    Сообщение (необязательно)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Расскажите о вашем проекте или вопросах..."
                    rows={4}
                    className="w-full px-4 py-3 bg-[#050505] border border-[#E0E0E0]/20 text-[#E0E0E0] font-mono text-sm placeholder:text-[#E0E0E0]/40 focus:border-[#E0E0E0]/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime}
                    className="px-8 py-4 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-widest flex items-center gap-3 hover:bg-[#FFFFFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Отправить заявку
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href="https://t.me/FoxampyLab_contact_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 border border-[#E0E0E0]/40 text-[#E0E0E0] font-mono text-sm tracking-widest flex items-center gap-3 hover:border-[#E0E0E0] hover:bg-[#E0E0E0]/10 transition-all"
                  >
                    <MessageSquare size={16} />
                    Telegram контакт
                  </a>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Picker Modal */}
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

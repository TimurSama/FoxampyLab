"use client";

import { Suspense, useRef, useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { isMobile } from '@/lib/device';
import InteractiveSphere from '@/components/visuals/InteractiveSphere';
import GalleryCarousel from '@/components/sections/GalleryCarousel';
import BootSequence from '@/components/boot/BootSequence';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowRight, Sparkle, PlayCircle, Calendar, Clock, User, Mail, Phone, MessageSquare, X, Send } from 'lucide-react';
import CalendarPicker from '@/components/forms/CalendarPicker';
import ServicesDetailModal from '@/components/sections/ServicesDetailModal';
import FlippableServiceCard from '@/components/sections/FlippableServiceCard';
import ErrorModal from '@/components/modals/ErrorModal';
import { useI18n } from '@/lib/i18n/context';
import { TelegramService } from '@/lib/telegram';
import SectionTransition from '@/components/transitions/SectionTransition';

export default function Home() {
  const { t, language } = useI18n();
  const [isBooting, setIsBooting] = useState(true);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Состояния для формы консультации
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; error: string; telegramMessage?: string }>({
    isOpen: false,
    error: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Screen-based navigation states
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('down');
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef<number>(0);
  const SCROLL_THROTTLE = 800; // Защита от быстрого пролистывания
  const edgeArmedRef = useRef<{ sectionIndex: number; direction: 'up' | 'down'; ts: number } | null>(null);
  const isScrollingInsideRef = useRef<boolean>(false);

  // Генерация доступных дат (следующие 30 дней)
  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Исключаем выходные для примера
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  }, []);

  // Временные слоты
  const timeSlots = useMemo(() => [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ], []);

  // Форматирование даты для отображения
  const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Обработка изменения телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setPhone(value);
    }
  };

  // Обработка выбора даты
  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      await TelegramService.sendConsultationRequest({
        name,
        email,
        phone,
        date: selectedDate.toISOString(),
        time: selectedTime,
      });
      
      // Сброс формы
      setName('');
      setEmail('');
      setPhone('');
      setSelectedDate(null);
      setSelectedTime('');
      setIsExpanded(false);
      
      // Показываем успешное сообщение
      alert(t('contact.consultation.confirm') || 'Заявка отправлена!');
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ошибка отправки заявки. Попробуйте позже.';
      const telegramMessage = TelegramService.formatConsultationMessage({
        name,
        email,
        phone,
        date: selectedDate.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        time: selectedTime,
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

  // Состояние для отслеживания видимых элементов
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  
  // Проверка prefers-reduced-motion для доступности
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Определение мобильного устройства
  const mobileDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return isMobile();
  }, []);

  // Упрощенные анимации для мобильных устройств (лучшая производительность)
  const animationConfig = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        duration: 0.3,
        blur: false,
        scale: false,
        rotate: false,
      };
    }
    if (mobileDevice) {
      return {
        duration: 0.5,
        blur: false, // Отключаем blur на мобильных для производительности
        scale: true,
        rotate: false, // Отключаем rotate на мобильных
      };
    }
    return {
      duration: 0.7,
      blur: true,
      scale: true,
      rotate: true,
    };
  }, [mobileDevice, prefersReducedMotion]);

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

  // IntersectionObserver для анимаций при скролле (оптимизировано для мобильных)
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    
    // Если пользователь предпочитает уменьшенную анимацию, сразу показываем все элементы
    if (prefersReducedMotion) {
      const elements = document.querySelectorAll('[data-scroll-id]');
      const allIds = Array.from(elements).map(el => el.getAttribute('data-scroll-id')).filter(Boolean) as string[];
      setVisibleElements(new Set(allIds));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: mobileDevice ? '-20% 0px -20% 0px' : '-30% 0px -30% 0px', // Элементы появляются только когда в центральной области экрана
      threshold: [0, 0.2, 0.3, 0.5, 0.7, 1], // Несколько порогов для плавного появления
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute('data-scroll-id');
        if (!elementId) return;
        
        // Элемент виден в центральной области экрана (intersectionRatio > 0.3)
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setVisibleElements((prev) => new Set(prev).add(elementId));
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          // Элемент вышел из видимости - скрываем его
          setVisibleElements((prev) => {
            const next = new Set(prev);
            next.delete(elementId);
            return next;
          });
        }
      });
    }, observerOptions);

    // Находим все элементы с data-scroll-id
    const elements = document.querySelectorAll('[data-scroll-id]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [mobileDevice, prefersReducedMotion]);

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
      id: 'about',
      title: t('about.tagline'),
      subtitle: t('about.title'),
      description: t('about.description'),
      mission: t('about.mission.description'),
      values: [
        {
          title: t('about.values.innovation.title'),
          description: t('about.values.innovation.description'),
        },
        {
          title: t('about.values.result.title'),
          description: t('about.values.result.description'),
        },
        {
          title: t('about.values.team.title'),
          description: t('about.values.team.description'),
        },
        {
          title: t('about.values.speed.title'),
          description: t('about.values.speed.description'),
        },
      ],
    },
    {
      id: 'services',
      title: t('home.solutions.title'),
      subtitle: t('home.solutions.subtitle'),
      description: t('home.solutions.description'),
    },
    {
      id: 'services-cards',
      // Cards-only экран: не дублируем текстовый блок
      title: '',
      subtitle: '',
      description: '',
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
  ], [t, language, servicesData, cases]);

  // Общее количество секций (hero + sections) - вычисляется после sections
  const totalSections = useMemo(() => 1 + sections.length, [sections]); // hero + solutions + about + cases + hub

  // Функция переключения секций
  const scrollToSection = useCallback((index: number, direction: 'up' | 'down' = 'down') => {
    // Проверяем границы
    if (index < 0 || index >= totalSections) {
      return;
    }
    
    // Если уже переключаемся, игнорируем новый запрос
    if (isTransitioning) {
      return;
    }
    
    // Если индекс не изменился, ничего не делаем
    if (index === currentSectionIndex) {
      return;
    }
    
    // Проверка внутреннего скролла контейнера секции
    const currentSection = sectionRefs.current[currentSectionIndex];
    if (currentSection) {
      // Ищем контейнер с overflow внутри секции - ищем по data-атрибуту или по классу
      let scrollableContainer = currentSection.querySelector('[data-scroll-container="true"]') as HTMLElement;
      if (!scrollableContainer) {
        // Ищем div с overflowY в стиле
        const allDivs = currentSection.querySelectorAll('div');
        for (const div of Array.from(allDivs)) {
          const style = window.getComputedStyle(div);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            scrollableContainer = div as HTMLElement;
            break;
          }
        }
      }
      const containerToCheck = scrollableContainer || currentSection;
      
      const { scrollTop, scrollHeight, clientHeight } = containerToCheck;
      // Проверяем, есть ли реальное переполнение (больше чем 50px)
      const hasRealScroll = scrollHeight > clientHeight + 50;
      
      if (hasRealScroll) {
        const isAtTop = scrollTop <= 10; // 10px tolerance
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px tolerance
        
        // Если скроллим вниз, но не достигли низа контейнера - скроллим внутри контейнера
        if (direction === 'down' && !isAtBottom) {
          // Нужна "свободная" прокрутка — не прыгаем на конец
          // (само переключение секций произойдет следующим скроллом у границы)
          return;
        }
        // Если скроллим вверх, но не достигли верха контейнера - скроллим внутри контейнера
        if (direction === 'up' && !isAtTop) {
          return;
        }
      }
    }

    setIsTransitioning(true);
    setTransitionDirection(direction);
    setCurrentSectionIndex(index);
    
    // Обновление URL hash
    if (index === 0) {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      const sectionId = sections[index - 1]?.id || '';
      window.history.replaceState(null, '', `#${sectionId}`);
    }

    // Сброс состояния перехода после анимации
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200); // Длительность анимации (чуть больше чем в SectionTransition)
  }, [isTransitioning, totalSections, currentSectionIndex, sections, sectionRefs]);

  // Обработчик touch для мобильных
  const touchStartYRef = useRef<number>(0);

  // Обработчик скролла колесом мыши
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const now = Date.now();
    const direction = e.deltaY > 0 ? 'down' : 'up';
    
    // Проверяем, есть ли внутренний скролл в текущей секции
    const currentSection = sectionRefs.current[currentSectionIndex];
    if (!currentSection) {
      // Если секция не найдена, просто переключаем
      if (now - lastScrollTime.current < SCROLL_THROTTLE) return;
      lastScrollTime.current = now;
      if (direction === 'down' && currentSectionIndex < totalSections - 1) {
        scrollToSection(currentSectionIndex + 1, 'down');
      } else if (direction === 'up' && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1, 'up');
      }
      return;
    }
    
    let scrollableContainer: HTMLElement | null = null;
    scrollableContainer = currentSection.querySelector('[data-scroll-container="true"]') as HTMLElement;
    if (!scrollableContainer) {
      const allDivs = currentSection.querySelectorAll('div');
      for (const div of Array.from(allDivs)) {
        const style = window.getComputedStyle(div);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          scrollableContainer = div as HTMLElement;
          break;
        }
      }
    }
    
    const containerToCheck = scrollableContainer || currentSection;
    
    // Проверяем, есть ли реальный внутренний скролл
    if (containerToCheck) {
      const { scrollTop, scrollHeight, clientHeight } = containerToCheck;
      const hasRealScroll = scrollHeight > clientHeight + 50;
      
      if (hasRealScroll) {
        const isAtTop = scrollTop <= 10;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
        
        // Если мы внутри секции (не на границе) - прокручиваем внутри
        if (!isAtTop && !isAtBottom) {
          isScrollingInsideRef.current = true;
          edgeArmedRef.current = null;
          containerToCheck.scrollTop += e.deltaY;
          return;
        }
        
        // Если мы на границе секции
        if ((direction === 'down' && isAtBottom) || (direction === 'up' && isAtTop)) {
          const armed = edgeArmedRef.current;
          const isArmed = armed &&
            armed.sectionIndex === currentSectionIndex &&
            armed.direction === direction &&
            now - armed.ts < 1200;
          
          // Первый скролл на границе - только "вооружаем", не переключаем
          if (!isArmed) {
            edgeArmedRef.current = { sectionIndex: currentSectionIndex, direction, ts: now };
            isScrollingInsideRef.current = false;
            return;
          }
          
          // Второй скролл на границе - переключаем секцию
          if (isArmed) {
            if (now - lastScrollTime.current < SCROLL_THROTTLE) return;
            lastScrollTime.current = now;
            edgeArmedRef.current = null;
            isScrollingInsideRef.current = false;
            
            if (direction === 'down' && currentSectionIndex < totalSections - 1) {
              scrollToSection(currentSectionIndex + 1, 'down');
            } else if (direction === 'up' && currentSectionIndex > 0) {
              scrollToSection(currentSectionIndex - 1, 'up');
            }
            return;
          }
        }
      }
    }
    
    // Если нет внутреннего скролла или мы не на границе - переключаем секцию
    // Сбрасываем armed состояние при смене направления или секции
    const armed = edgeArmedRef.current;
    if (armed && (armed.sectionIndex !== currentSectionIndex || armed.direction !== direction)) {
      edgeArmedRef.current = null;
    }
    
    if (now - lastScrollTime.current < SCROLL_THROTTLE) return;
    lastScrollTime.current = now;
    edgeArmedRef.current = null;
    isScrollingInsideRef.current = false;
    
    if (direction === 'down' && currentSectionIndex < totalSections - 1) {
      scrollToSection(currentSectionIndex + 1, 'down');
    } else if (direction === 'up' && currentSectionIndex > 0) {
      scrollToSection(currentSectionIndex - 1, 'up');
    }
  }, [currentSectionIndex, totalSections, scrollToSection, isTransitioning, sectionRefs]);

  // Обработчик клавиатуры
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isTransitioning) return;
    
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        if (currentSectionIndex < totalSections - 1) {
          scrollToSection(currentSectionIndex + 1, 'down');
        }
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        if (currentSectionIndex > 0) {
          scrollToSection(currentSectionIndex - 1, 'up');
        }
        break;
      case 'Home':
        e.preventDefault();
        scrollToSection(0, 'up');
        break;
      case 'End':
        e.preventDefault();
        scrollToSection(totalSections - 1, 'down');
        break;
    }
  }, [currentSectionIndex, isTransitioning, totalSections, scrollToSection]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  }, []);
  
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartYRef.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;
    const threshold = 50; // Минимальное расстояние для переключения
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSectionIndex < totalSections - 1) {
        scrollToSection(currentSectionIndex + 1, 'down');
      } else if (diff < 0 && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1, 'up');
      }
    }
    
    touchStartYRef.current = 0;
  }, [currentSectionIndex, totalSections, scrollToSection]);

  // Установка обработчиков для screen-based navigation (после определения всех функций)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Отключение стандартного скролла
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Обработчики событий
    const wheelHandler = (e: WheelEvent) => handleWheel(e);
    const keyHandler = (e: KeyboardEvent) => handleKeyDown(e);
    const touchStartHandler = (e: TouchEvent) => handleTouchStart(e);
    const touchEndHandler = (e: TouchEvent) => handleTouchEnd(e);
    
    window.addEventListener('wheel', wheelHandler, { passive: false });
    window.addEventListener('keydown', keyHandler);
    window.addEventListener('touchstart', touchStartHandler, { passive: true });
    window.addEventListener('touchend', touchEndHandler, { passive: true });
    
    // Инициализация по hash из URL
    const hash = window.location.hash.slice(1);
    if (hash) {
      const sectionIndex = hash === 'hero' ? 0 : sections.findIndex(s => s.id === hash) + 1;
      if (sectionIndex >= 0 && sectionIndex < totalSections) {
        setCurrentSectionIndex(sectionIndex);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('keydown', keyHandler);
      window.removeEventListener('touchstart', touchStartHandler);
      window.removeEventListener('touchend', touchEndHandler);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd, sections, totalSections]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-transparent overflow-hidden"
      style={{ height: '100vh' }}
    >
      <AnimatePresence>
        {isBooting && <BootSequence />}
      </AnimatePresence>

      <Header />

      {/* Hero */}
      <SectionTransition
        isActive={currentSectionIndex === 0}
        transitionType="auto"
        direction={transitionDirection}
      >
        <section
          ref={(el) => { sectionRefs.current[0] = el; }}
          className="w-full h-screen grid md:grid-cols-2 items-center gap-4 md:gap-8 overflow-y-auto"
          style={{ 
            minHeight: '100vh', 
            maxHeight: '100vh',
            paddingTop: '100px',
            paddingBottom: '40px',
            boxSizing: 'border-box'
          }}
        >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full md:col-span-1" style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto', boxSizing: 'border-box', width: '100%' }}>
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-5 p-2 md:p-4 lg:p-6">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-mono text-[#E0E0E0] leading-tight relative"
              style={{ 
                textShadow: '0 0 40px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.8)',
                filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.9))'
              }}
            >
              <span style={{ 
                position: 'relative',
                display: 'inline-block',
                padding: '0.1em 0.2em',
                margin: '-0.1em -0.2em',
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(20px)',
                borderRadius: '4px',
                boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
              }}>
                {t('home.title')}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, scale: 0.95, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-lg lg:text-xl font-mono text-[#E0E0E0]/80 leading-relaxed max-w-3xl relative"
              style={{ 
                textShadow: '0 0 30px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.85), 0 3px 10px rgba(0, 0, 0, 0.75)',
                filter: 'drop-shadow(0 0 25px rgba(0, 0, 0, 0.85))',
                willChange: 'opacity, transform'
              }}
            >
              <span style={{ 
                position: 'relative',
                display: 'inline-block',
                padding: '0.1em 0.2em',
                margin: '-0.1em -0.2em',
                background: 'rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(15px)',
                borderRadius: '4px',
                boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.4)'
              }}>
                {t('home.subtitle')}
              </span>
            </motion.p>

            <motion.div 
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'opacity' }}
            >
              <div className="flex">
                <Link href="/services">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-widest flex items-center gap-3 w-full md:w-auto"
                  >
                    {t('home.ctaButton1')}
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </div>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'opacity' }}
              >
                <Link href="/gallery" className="flex-1 md:flex-initial">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                    initial={{ opacity: 0, scale: 0.95, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 border border-[#E0E0E0]/40 text-[#E0E0E0] font-mono text-sm tracking-widest flex items-center gap-3 w-full whitespace-nowrap"
                  >
                    {t('home.ctaButton2')}
                    <Sparkle size={16} />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)', y: 0 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] pointer-events-auto cursor-pointer md:col-span-1"
          style={{ willChange: 'opacity, transform, filter' }}
        >
          <InteractiveSphere mousePos={mousePos} />
        </motion.div>
      </section>
      </SectionTransition>

      {/* Content Sections */}
      {sections.map((section, index) => {
        const sectionIndex = index + 1; // Hero = 0, solutions = 1, cases = 2, hub = 3
        const isVisible = currentSectionIndex === sectionIndex || visibleElements.has(`section-${section.id}`);
        return (
        <SectionTransition
          key={section.id}
          isActive={currentSectionIndex === sectionIndex}
          transitionType="auto"
          direction={transitionDirection}
        >
          <section
            ref={(el) => { sectionRefs.current[sectionIndex] = el; }}
            data-scroll-id={`section-${section.id}`}
            className="w-full h-screen flex items-center justify-center"
            style={{ 
              minHeight: '100vh', 
              maxHeight: '100vh',
              paddingTop: '100px',
              paddingBottom: '40px',
              boxSizing: 'border-box',
              overflow: section.id === 'about' ? 'hidden' : (section.id === 'services-cards' || section.id === 'cases' ? 'hidden' : 'auto')
            }}
          >
          <div 
            className={`mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center w-full ${
              section.id === 'cases' ? 'max-w-4xl' : section.id === 'about' ? 'max-w-5xl' : 'max-w-7xl'
            }`} 
            data-scroll-container={section.id === 'about' ? 'true' : undefined}
            style={{ 
              maxHeight: 'calc(100vh - 140px)', 
              overflowY: section.id === 'about' ? 'auto' : (section.id === 'services-cards' || section.id === 'cases' ? 'hidden' : 'auto'),
              boxSizing: 'border-box', 
              width: '100%' 
            }}
          >
            <motion.div 
                className={`inline-block p-2 sm:p-4 md:p-6 w-full ${section.id === 'cases' ? 'mb-4 sm:mb-6' : ''}`}
                data-scroll-id={`section-${section.id}-content`}
                initial={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  filter: 'blur(15px)',
                  y: 0
                }}
                animate={isVisible ? { 
                  opacity: 1, 
                  scale: 1, 
                  filter: 'blur(0px)',
                  y: 0
                } : { 
                  opacity: 0, 
                  scale: 0.95, 
                  filter: 'blur(15px)',
                  y: 0
                }}
                transition={{ 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1],
                  filter: { duration: 0.8 }
                }}
                style={{ willChange: 'opacity, transform, filter', maxWidth: '100%', boxSizing: 'border-box' }}
              >
              {/* Cards-only экран: убираем весь текстовый блок, оставляем только карточки ниже */}
              {section.id === 'services-cards' ? null : section.id === 'cases' ? (
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-mono font-light tracking-tight text-[#E0E0E0] mb-8 md:mb-12 relative"
                  initial={{ opacity: 0, scale: 0.95, y: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ 
                    textShadow: '0 0 40px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.9))',
                    willChange: 'opacity, transform'
                  }}
                >
                  <span style={{ 
                    position: 'relative',
                    display: 'inline-block',
                    padding: '0.1em 0.2em',
                    margin: '-0.1em -0.2em',
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '4px',
                    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
                  }}>
                    {section.subtitle}
                  </span>
                </motion.h1>
              ) : (
                <>
                  <motion.div 
                    className="font-mono text-[10px] text-[#E0E0E0] tracking-[0.5em] mb-6 relative"
                    initial={{ opacity: 0, scale: 0.95, y: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      textShadow: '0 0 25px rgba(0, 0, 0, 0.85), 0 0 12px rgba(0, 0, 0, 0.8)',
                      filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))',
                      willChange: 'opacity, transform'
                    }}
                  >
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.15em 0.3em',
                      margin: '-0.15em -0.3em',
                      background: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '3px',
                      boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.4)'
                    }}>
                      ─── {section.title} ───
                    </span>
                  </motion.div>

                  <motion.h1 
                    className="text-2xl md:text-4xl lg:text-6xl font-mono font-light tracking-tight text-[#E0E0E0] mb-4 md:mb-6 relative"
                    initial={{ opacity: 0, scale: 0.95, y: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      textShadow: '0 0 40px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.8)',
                      filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.9))',
                      willChange: 'opacity, transform'
                    }}
                  >
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.1em 0.2em',
                      margin: '-0.1em -0.2em',
                      background: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '4px',
                      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      {section.subtitle}
                    </span>
                  </motion.h1>
                </>
              )}

              {section.description && section.id !== 'cases' && section.id !== 'services-cards' && (
                <motion.p 
                  className="font-mono text-sm md:text-base lg:text-lg text-[#E0E0E0]/80 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4 relative"
                  initial={{ opacity: 0, scale: 0.95, y: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ 
                    textShadow: '0 0 30px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.85), 0 3px 10px rgba(0, 0, 0, 0.75)',
                    filter: 'drop-shadow(0 0 25px rgba(0, 0, 0, 0.85))',
                    willChange: 'opacity, transform'
                  }}
                >
                  <span style={{ 
                    position: 'relative',
                    display: 'inline-block',
                    padding: '0.15em 0.25em',
                    margin: '-0.15em -0.25em',
                    background: 'rgba(0, 0, 0, 0.35)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '4px',
                    boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.4)'
                  }}>
                    {section.description}
                  </span>
                </motion.p>
              )}

              {section.cta && section.id !== 'cases' && section.id !== 'services-cards' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <Link href={section.target ?? '/services'}>
                    <motion.button 
                      className="px-8 py-4 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-widest
                                   flex items-center gap-3 mx-auto transition-all hover:bg-[#FFFFFF]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {section.cta}
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {section.id === 'services-cards' && section.services && (
              <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto px-4 w-full" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
                {section.services.map((service, idx) => {
                  // IntersectionObserver на fixed/hidden секциях может не срабатывать — показываем карточки, когда секция активна
                  const cardVisible = currentSectionIndex === sectionIndex;
                  return (
                  <motion.div
                    key={service.id}
                    data-scroll-id={`solution-card-${service.id}`}
                    initial={prefersReducedMotion ? { opacity: 0, y: 0 } : { 
                      opacity: 0, 
                      scale: 0.9, 
                      filter: 'blur(12px)',
                      rotateY: -10,
                      y: 0
                    }}
                    animate={cardVisible || prefersReducedMotion ? (prefersReducedMotion ? { 
                      opacity: 1,
                      y: 0
                    } : { 
                      opacity: 1, 
                      scale: 1, 
                      filter: 'blur(0px)',
                      rotateY: 0,
                      y: 0
                    }) : { 
                      opacity: 0, 
                      scale: 0.9, 
                      filter: 'blur(12px)',
                      rotateY: -10,
                      y: 0
                    }}
                    transition={prefersReducedMotion ? { 
                      duration: 0.3
                    } : { 
                      duration: 0.8, 
                      delay: mobileDevice ? idx * 0.05 : idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                      filter: { duration: 0.6 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <FlippableServiceCard service={service} t={t} />
                  </motion.div>
                  );
                })}
              </div>
            )}

            {section.id === 'about' && (
              <motion.div 
                className="mt-12 max-w-4xl mx-auto space-y-8 px-4 w-full"
                data-scroll-id={`section-${section.id}-content`}
                initial={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  filter: 'blur(15px)',
                  y: 0
                }}
                animate={isVisible ? { 
                  opacity: 1, 
                  scale: 1, 
                  filter: 'blur(0px)',
                  y: 0
                } : { 
                  opacity: 0, 
                  scale: 0.95, 
                  filter: 'blur(15px)',
                  y: 0
                }}
                transition={{ 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1],
                  filter: { duration: 0.8 }
                }}
                style={{ willChange: 'opacity, transform, filter', maxWidth: '100%', boxSizing: 'border-box' }}
              >
                {/* Mission */}
                {section.mission && (
                  <motion.div
                    className="p-6 bg-glass-matte border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <h3 className="font-mono text-lg text-engrave-fresco mb-3">
                      {t('about.mission.title')}
                    </h3>
                    <p className="font-mono text-sm text-stone-slate leading-relaxed">
                      {section.mission}
                    </p>
                  </motion.div>
                )}

                {/* Values */}
                {section.values && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.values.map((value: any, idx: number) => (
                      <motion.div
                        key={idx}
                        className="p-6 bg-glass-matte border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                      >
                        <h4 className="font-mono text-base text-engrave-fresco mb-2">
                          {value.title}
                        </h4>
                        <p className="font-mono text-sm text-stone-slate leading-relaxed">
                          {value.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {section.id === 'cases' && (
              <motion.div 
                className="mt-2 w-full"
                data-scroll-id={`section-${section.id}-gallery`}
                initial={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  filter: 'blur(15px)',
                  y: 0
                }}
                animate={isVisible ? { 
                  opacity: 1, 
                  scale: 1, 
                  filter: 'blur(0px)',
                  y: 0
                } : { 
                  opacity: 0, 
                  scale: 0.95, 
                  filter: 'blur(15px)',
                  y: 0
                }}
                transition={{ 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1],
                  filter: { duration: 0.8 }
                }}
                style={{ willChange: 'opacity, transform, filter', maxWidth: '100%', boxSizing: 'border-box' }}
              >
                <GalleryCarousel />
              </motion.div>
            )}
          </div>
          </section>
        </SectionTransition>
        );
      })}

      {/* Decorations */}
      <motion.div 
        className="fixed top-4 left-4 w-8 h-8 border-t border-l border-[#E0E0E0]/20 pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div 
        className="fixed top-4 right-4 w-8 h-8 border-t border-r border-[#E0E0E0]/20 pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div 
        className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-[#E0E0E0]/20 pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div 
        className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-[#E0E0E0]/20 pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Consultation Form Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#E0E0E0] text-[#050505] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FFFFFF] transition-colors"
        aria-label={t('contact.consultation.title') || 'Contact us'}
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 z-[59] bg-black/80 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-24 left-6 z-[60] w-[calc(100vw-3rem)] md:w-[450px] pointer-events-auto"
              >
                <div className="bg-[#0A0A0A] border border-white/20 overflow-hidden rounded-sm shadow-2xl">
                  <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#050505]">
                    <h2 className="font-mono text-sm uppercase tracking-widest text-[#E0E0E0]">
                      {t('contact.consultation.title') || 'Связаться с нами'}
                    </h2>
                    <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-white/10 transition-colors rounded-full">
                      <X size={18} className="text-[#E0E0E0]/80" />
                    </button>
                  </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4 bg-[#0A0A0A]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                        <User size={12} /> {t('contact.consultation.nameLabel') || 'Name'}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder={t('contact.consultation.nameLabel') || 'Your name'}
                        className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs focus:border-white/40 focus:outline-none transition-colors placeholder:text-white/20"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                        <Mail size={12} /> {t('contact.consultation.emailLabel') || 'Email'}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="mail@example.com"
                        className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs focus:border-white/40 focus:outline-none transition-colors placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                      <Phone size={12} /> {t('contact.phoneLabel') || 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs focus:border-white/40 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                        <Calendar size={12} /> {t('contact.consultation.selectDate') || 'Date'}
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowCalendar(true)}
                        className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs text-left flex justify-between items-center hover:bg-white/10 transition-all"
                      >
                        {selectedDate ? formatDateForDisplay(selectedDate) : (t('contact.consultation.selectDate') || 'Select...')}
                        <ArrowRight size={10} className="opacity-40" />
                      </button>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                        <Clock size={12} /> {t('contact.consultation.selectTime') || 'Time'}
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs focus:border-white/40 focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#050505]">{t('contact.consultation.selectTime') || 'Select...'}</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time} className="bg-[#050505]">{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={!selectedDate || !selectedTime || isSubmitting}
                      className="flex-1 py-3 bg-[#E0E0E0] text-[#050505] font-mono text-xs tracking-[0.2em] uppercase flex items-center justify-center hover:bg-[#FFFFFF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                          {t('common.sending') || 'Отправка...'}
                        </>
                      ) : (
                        t('contact.consultation.confirm') || 'Отправить заявку'
                      )}
                    </button>
                    <a
                      href="https://t.me/FoxampyLab_contact_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-[#050505] hover:bg-[#0A0A0A] border border-white/20 transition-colors flex items-center justify-center"
                    >
                      <MessageSquare size={16} className="text-white" strokeWidth={1.5} />
                    </a>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
          </>
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

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, error: '' })}
        error={errorModal.error}
        telegramMessage={errorModal.telegramMessage}
      />
    </div>
  );
}

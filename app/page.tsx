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
import { ArrowRight, Sparkle, PlayCircle } from 'lucide-react';
import ServicesDetailModal from '@/components/sections/ServicesDetailModal';
import FlippableServiceCard from '@/components/sections/FlippableServiceCard';
import { useI18n } from '@/lib/i18n/context';
import SectionTransition from '@/components/transitions/SectionTransition';

export default function Home() {
  const { t, language } = useI18n();
  const [isBooting, setIsBooting] = useState(true);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Screen-based navigation states
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('down');
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef<number>(0);
  const SCROLL_THROTTLE = 1000; // Защита от быстрого пролистывания
  const edgeArmedRef = useRef<{ sectionIndex: number; direction: 'up' | 'down'; ts: number } | null>(null);
  const isScrollingInsideRef = useRef<boolean>(false);


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

    // Сбрасываем состояние внутреннего скролла и armed при переключении
    edgeArmedRef.current = null;
    isScrollingInsideRef.current = false;

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
  }, [isTransitioning, totalSections, currentSectionIndex, sections]);

  // Обработчик touch для мобильных
  const touchStartYRef = useRef<number>(0);
  const touchStartElementRef = useRef<HTMLElement | null>(null);
  const touchScrolledInsideRef = useRef<boolean>(false);
  const touchScrollContainerRef = useRef<HTMLElement | null>(null);
  const touchLastScrollTopRef = useRef<number>(0);
  const touchHasScrolledRef = useRef<boolean>(false);

  const findScrollableContainer = useCallback((section: HTMLElement | null) => {
    if (!section) return null;
    let scrollableContainer = section.querySelector('[data-scroll-container="true"]') as HTMLElement | null;
    if (!scrollableContainer) {
      const allDivs = section.querySelectorAll('div');
      for (const div of Array.from(allDivs)) {
        const style = window.getComputedStyle(div);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          scrollableContainer = div as HTMLElement;
          break;
        }
      }
    }
    return scrollableContainer;
  }, []);

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
    
    const scrollableContainer = findScrollableContainer(currentSection);
    
    const containerToCheck = scrollableContainer || currentSection;
    
    // Проверяем, есть ли реальный внутренний скролл
    if (containerToCheck) {
      const { scrollTop, scrollHeight, clientHeight } = containerToCheck;
      const hasRealScroll = scrollHeight > clientHeight + 50;
      
      if (hasRealScroll) {
        const maxScroll = scrollHeight - clientHeight;
        const canScrollDown = scrollTop < maxScroll - 1;
        const canScrollUp = scrollTop > 1;
        const isAtTop = scrollTop <= 1;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        // Если можем скроллить внутрь в нужном направлении — делаем это
        if ((direction === 'down' && canScrollDown) || (direction === 'up' && canScrollUp)) {
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

        return;
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
    touchScrolledInsideRef.current = false;
    touchHasScrolledRef.current = false;
    // Сохраняем элемент, на котором начался touch
    const target = e.target as HTMLElement;
    touchStartElementRef.current = target;

    const currentSection = sectionRefs.current[currentSectionIndex];
    const scrollableContainer = findScrollableContainer(currentSection);
    touchScrollContainerRef.current = scrollableContainer;
    if (scrollableContainer) {
      touchLastScrollTopRef.current = scrollableContainer.scrollTop;
    } else {
      touchLastScrollTopRef.current = 0;
    }
  }, [currentSectionIndex, findScrollableContainer, sectionRefs]);
  
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartYRef.current) return;
    
    const currentY = e.touches[0].clientY;
    const diff = touchStartYRef.current - currentY;
    
    // Проверяем, есть ли внутренний скролл в текущей секции
    const currentSection = sectionRefs.current[currentSectionIndex];
    if (!currentSection) return;
    
    // Ищем scrollable контейнер
    const scrollableContainer = touchScrollContainerRef.current || findScrollableContainer(currentSection);
    touchScrollContainerRef.current = scrollableContainer;
    
    const containerToCheck = scrollableContainer || currentSection;
    
    // Проверяем, есть ли реальный внутренний скролл
    if (containerToCheck) {
      const { scrollTop, scrollHeight, clientHeight } = containerToCheck;
      const hasRealScroll = scrollHeight > clientHeight + 50;
      
      if (hasRealScroll) {
        const maxScroll = scrollHeight - clientHeight;
        const canScrollDown = scrollTop < maxScroll - 1;
        const canScrollUp = scrollTop > 1;
        const isAtTop = scrollTop <= 1;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const direction = diff > 0 ? 'down' : 'up';

        // Если можем скроллить внутрь — разрешаем нативный скролл
        if ((direction === 'down' && canScrollDown) || (direction === 'up' && canScrollUp)) {
          if (scrollTop !== touchLastScrollTopRef.current) {
            touchHasScrolledRef.current = true;
            touchLastScrollTopRef.current = scrollTop;
          }
          touchScrolledInsideRef.current = true;
          return;
        }
        
        // Если на границе и пытаемся скроллить дальше - предотвращаем
        if ((direction === 'down' && isAtBottom) || (direction === 'up' && isAtTop)) {
          e.preventDefault();
        }
      }
    }
  }, [currentSectionIndex, findScrollableContainer, sectionRefs]);
  
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartYRef.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;
    const now = Date.now();
    const direction = diff > 0 ? 'down' : 'up';
    const currentSection = sectionRefs.current[currentSectionIndex];
    const scrollableContainer = touchScrollContainerRef.current || findScrollableContainer(currentSection);
    const containerToCheck = scrollableContainer || currentSection;
    const hasRealScroll = containerToCheck
      ? containerToCheck.scrollHeight > containerToCheck.clientHeight + 50
      : false;

    if (hasRealScroll && containerToCheck) {
      const { scrollTop, scrollHeight, clientHeight } = containerToCheck;
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const atEdge = (direction === 'down' && isAtBottom) || (direction === 'up' && isAtTop);

      // Если был скролл внутри — не переключаем, только вооружаем границу
      if (touchHasScrolledRef.current || touchScrolledInsideRef.current) {
        if (atEdge) {
          edgeArmedRef.current = { sectionIndex: currentSectionIndex, direction, ts: now };
        }
        touchStartYRef.current = 0;
        touchScrolledInsideRef.current = false;
        touchHasScrolledRef.current = false;
        touchStartElementRef.current = null;
        return;
      }

      if (atEdge) {
        const armed = edgeArmedRef.current;
        const isArmed = armed &&
          armed.sectionIndex === currentSectionIndex &&
          armed.direction === direction &&
          now - armed.ts < 1200;

        if (!isArmed) {
          edgeArmedRef.current = { sectionIndex: currentSectionIndex, direction, ts: now };
          touchStartYRef.current = 0;
          touchScrolledInsideRef.current = false;
          touchHasScrolledRef.current = false;
          touchStartElementRef.current = null;
          return;
        }

        if (now - lastScrollTime.current < SCROLL_THROTTLE) {
          touchStartYRef.current = 0;
          touchStartElementRef.current = null;
          touchScrolledInsideRef.current = false;
          touchHasScrolledRef.current = false;
          return;
        }

        lastScrollTime.current = now;
        edgeArmedRef.current = null;
        if (direction === 'down' && currentSectionIndex < totalSections - 1) {
          scrollToSection(currentSectionIndex + 1, 'down');
        } else if (direction === 'up' && currentSectionIndex > 0) {
          scrollToSection(currentSectionIndex - 1, 'up');
        }

        touchStartYRef.current = 0;
        touchStartElementRef.current = null;
        touchScrolledInsideRef.current = false;
        touchHasScrolledRef.current = false;
        return;
      }
    }
    
    const threshold = 50; // Минимальное расстояние для переключения
    
    if (Math.abs(diff) > threshold) {
      // Проверяем троттл для переключения секций
      if (now - lastScrollTime.current < SCROLL_THROTTLE) {
        touchStartYRef.current = 0;
        touchStartElementRef.current = null;
        return;
      }
      lastScrollTime.current = now;
      
      if (direction === 'down' && currentSectionIndex < totalSections - 1) {
        scrollToSection(currentSectionIndex + 1, 'down');
      } else if (direction === 'up' && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1, 'up');
      }
    }
    
    touchStartYRef.current = 0;
    touchStartElementRef.current = null;
    touchScrolledInsideRef.current = false;
    touchHasScrolledRef.current = false;
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
    const touchMoveHandler = (e: TouchEvent) => handleTouchMove(e);
    const touchEndHandler = (e: TouchEvent) => handleTouchEnd(e);
    
    window.addEventListener('wheel', wheelHandler, { passive: false });
    window.addEventListener('keydown', keyHandler);
    window.addEventListener('touchstart', touchStartHandler, { passive: true });
    window.addEventListener('touchmove', touchMoveHandler, { passive: false });
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
      window.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('touchend', touchEndHandler);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd, sections, totalSections]);

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full md:col-span-1" style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto', boxSizing: 'border-box', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
              paddingTop: section.id === 'cases' ? '80px' : '100px',
              paddingBottom: '30px',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}
          >
          <div 
            className={`mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center w-full ${
              section.id === 'cases' ? 'max-w-6xl' : section.id === 'about' ? 'max-w-5xl' : 'max-w-7xl'
            }`} 
            data-scroll-container={['about', 'services', 'hub'].includes(section.id) ? 'true' : undefined}
            style={{ 
              maxHeight: section.id === 'cases' ? 'calc(100vh - 90px)' : 'calc(100vh - 100px)', 
              overflowY: ['about', 'services', 'hub'].includes(section.id) ? 'auto' : 'hidden',
              boxSizing: 'border-box', 
              width: '100%',
              scrollBehavior: 'smooth'
            }}
          >
            <motion.div 
                className={`inline-block p-2 sm:p-3 md:p-4 w-full ${section.id === 'cases' ? 'mb-1 sm:mb-2' : ''}`}
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
                  className="text-3xl md:text-4xl lg:text-5xl font-mono font-light tracking-tight text-[#E0E0E0] mb-2 md:mb-4 relative"
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
              <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-5xl mx-auto px-2 sm:px-4 w-full" style={{ boxSizing: 'border-box' }}>
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
                className="mt-0 w-full"
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

    </div>
  );
}

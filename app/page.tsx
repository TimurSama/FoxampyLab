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
import ServicePackages from '@/components/sections/ServicePackages';
import ErrorModal from '@/components/modals/ErrorModal';
import { useI18n } from '@/lib/i18n/context';
import { usePerformance } from '@/lib/context/PerformanceContext';
import { TelegramService } from '@/lib/telegram';
import SectionTransition from '@/components/transitions/SectionTransition';

export default function Home() {
  const { t, language } = useI18n();
  const {
    shouldDisableAnimations,
    shouldReduceQuality,
    level,
    targetFPS,
  } = usePerformance();
  const [isBooting, setIsBooting] = useState(true);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // РЎРѕСЃС‚РѕСЏРЅРёСЏ РґР»СЏ С„РѕСЂРјС‹ РєРѕРЅСЃСѓР»СЊС‚Р°С†РёРё
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
  const isProcessingScrollRef = useRef<boolean>(false);
  const SCROLL_THROTTLE = 1200; // Р—Р°С‰РёС‚Р° РѕС‚ Р±С‹СЃС‚СЂРѕРіРѕ РїСЂРѕР»РёСЃС‚С‹РІР°РЅРёСЏ - СѓРІРµР»РёС‡РµРЅ РґР»СЏ РїСЂРµРґРѕС‚РІСЂР°С‰РµРЅРёСЏ РјРЅРѕР¶РµСЃС‚РІРµРЅРЅС‹С… РїРµСЂРµРєР»СЋС‡РµРЅРёР№

  // Р“РµРЅРµСЂР°С†РёСЏ РґРѕСЃС‚СѓРїРЅС‹С… РґР°С‚ (СЃР»РµРґСѓСЋС‰РёРµ 30 РґРЅРµР№)
  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // РСЃРєР»СЋС‡Р°РµРј РІС‹С…РѕРґРЅС‹Рµ РґР»СЏ РїСЂРёРјРµСЂР°
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  }, []);

  // Р’СЂРµРјРµРЅРЅС‹Рµ СЃР»РѕС‚С‹
  const timeSlots = useMemo(() => [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ], []);

  // Р¤РѕСЂРјР°С‚РёСЂРѕРІР°РЅРёРµ РґР°С‚С‹ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ
  const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // РћР±СЂР°Р±РѕС‚РєР° РёР·РјРµРЅРµРЅРёСЏ С‚РµР»РµС„РѕРЅР°
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setPhone(value);
    }
  };

  // РћР±СЂР°Р±РѕС‚РєР° РІС‹Р±РѕСЂР° РґР°С‚С‹
  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  // РћР±СЂР°Р±РѕС‚РєР° РѕС‚РїСЂР°РІРєРё С„РѕСЂРјС‹
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
      
      // РЎР±СЂРѕСЃ С„РѕСЂРјС‹
      setName('');
      setEmail('');
      setPhone('');
      setSelectedDate(null);
      setSelectedTime('');
      setIsExpanded(false);
      
      // РџРѕРєР°Р·С‹РІР°РµРј СѓСЃРїРµС€РЅРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ
      alert(t('contact.consultation.confirm') || 'Р—Р°СЏРІРєР° РѕС‚РїСЂР°РІР»РµРЅР°!');
    } catch (error) {
      console.error('РћС€РёР±РєР° РѕС‚РїСЂР°РІРєРё Р·Р°СЏРІРєРё:', error);
      const errorMessage = error instanceof Error ? error.message : 'РћС€РёР±РєР° РѕС‚РїСЂР°РІРєРё Р·Р°СЏРІРєРё. РџРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ.';
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

  // РЎРѕСЃС‚РѕСЏРЅРёРµ РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ РІРёРґРёРјС‹С… СЌР»РµРјРµРЅС‚РѕРІ
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  
  // РџСЂРѕРІРµСЂРєР° prefers-reduced-motion РґР»СЏ РґРѕСЃС‚СѓРїРЅРѕСЃС‚Рё
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // РћРїСЂРµРґРµР»РµРЅРёРµ РјРѕР±РёР»СЊРЅРѕРіРѕ СѓСЃС‚СЂРѕР№СЃС‚РІР°
  const mobileDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return isMobile();
  }, []);

  // РЈРїСЂРѕС‰РµРЅРЅС‹Рµ Р°РЅРёРјР°С†РёРё РЅР° РѕСЃРЅРѕРІРµ РїСЂРѕРёР·РІРѕРґРёС‚РµР»СЊРЅРѕСЃС‚Рё СѓСЃС‚СЂРѕР№СЃС‚РІР°
  const animationConfig = useMemo(() => {
    if (shouldDisableAnimations || prefersReducedMotion) {
      return {
        duration: 0.1,
        blur: false,
        scale: false,
        rotate: false,
      };
    }
    if (level === 'very-low' || level === 'low') {
      return {
        duration: 0.3,
        blur: false,
        scale: false,
        rotate: false,
      };
    }
    if (level === 'medium' || mobileDevice) {
      return {
        duration: 0.5,
        blur: false,
        scale: true,
        rotate: false,
      };
    }
    return {
      duration: 0.7,
      blur: true,
      scale: true,
      rotate: true,
    };
  }, [shouldDisableAnimations, prefersReducedMotion, level, mobileDevice]);

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

  // IntersectionObserver РґР»СЏ Р°РЅРёРјР°С†РёР№ РїСЂРё СЃРєСЂРѕР»Р»Рµ (РѕРїС‚РёРјРёР·РёСЂРѕРІР°РЅРѕ РґР»СЏ РјРѕР±РёР»СЊРЅС‹С…)
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    
    // Р•СЃР»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РїСЂРµРґРїРѕС‡РёС‚Р°РµС‚ СѓРјРµРЅСЊС€РµРЅРЅСѓСЋ Р°РЅРёРјР°С†РёСЋ, СЃСЂР°Р·Сѓ РїРѕРєР°Р·С‹РІР°РµРј РІСЃРµ СЌР»РµРјРµРЅС‚С‹
    if (prefersReducedMotion) {
      const elements = document.querySelectorAll('[data-scroll-id]');
      const allIds = Array.from(elements).map(el => el.getAttribute('data-scroll-id')).filter(Boolean) as string[];
      setVisibleElements(new Set(allIds));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: mobileDevice ? '-20% 0px -20% 0px' : '-30% 0px -30% 0px', // Р­Р»РµРјРµРЅС‚С‹ РїРѕСЏРІР»СЏСЋС‚СЃСЏ С‚РѕР»СЊРєРѕ РєРѕРіРґР° РІ С†РµРЅС‚СЂР°Р»СЊРЅРѕР№ РѕР±Р»Р°СЃС‚Рё СЌРєСЂР°РЅР°
      threshold: [0, 0.2, 0.3, 0.5, 0.7, 1], // РќРµСЃРєРѕР»СЊРєРѕ РїРѕСЂРѕРіРѕРІ РґР»СЏ РїР»Р°РІРЅРѕРіРѕ РїРѕСЏРІР»РµРЅРёСЏ
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementId = entry.target.getAttribute('data-scroll-id');
        if (!elementId) return;
        
        // Р­Р»РµРјРµРЅС‚ РІРёРґРµРЅ РІ С†РµРЅС‚СЂР°Р»СЊРЅРѕР№ РѕР±Р»Р°СЃС‚Рё СЌРєСЂР°РЅР° (intersectionRatio > 0.3)
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setVisibleElements((prev) => new Set(prev).add(elementId));
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          // Р­Р»РµРјРµРЅС‚ РІС‹С€РµР» РёР· РІРёРґРёРјРѕСЃС‚Рё - СЃРєСЂС‹РІР°РµРј РµРіРѕ
          setVisibleElements((prev) => {
            const next = new Set(prev);
            next.delete(elementId);
            return next;
          });
        }
      });
    }, observerOptions);

    // РќР°С…РѕРґРёРј РІСЃРµ СЌР»РµРјРµРЅС‚С‹ СЃ data-scroll-id
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
    },
    {
      id: 'about-values',
      title: '',
      subtitle: t('about.values.title') || 'Values',
      description: '',
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
      // Cards-only СЌРєСЂР°РЅ: РЅРµ РґСѓР±Р»РёСЂСѓРµРј С‚РµРєСЃС‚РѕРІС‹Р№ Р±Р»РѕРє
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

  // РћР±С‰РµРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СЃРµРєС†РёР№ (hero + sections) - РІС‹С‡РёСЃР»СЏРµС‚СЃСЏ РїРѕСЃР»Рµ sections
  const totalSections = useMemo(() => 1 + sections.length, [sections]); // hero + solutions + about + cases + hub

  // Р¤СѓРЅРєС†РёСЏ РїРµСЂРµРєР»СЋС‡РµРЅРёСЏ СЃРµРєС†РёР№
  const scrollToSection = useCallback((index: number, direction: 'up' | 'down' = 'down') => {
    // РџСЂРѕРІРµСЂСЏРµРј РіСЂР°РЅРёС†С‹
    if (index < 0 || index >= totalSections) {
      return;
    }
    
    // Р•СЃР»Рё СѓР¶Рµ РїРµСЂРµРєР»СЋС‡Р°РµРјСЃСЏ, РёРіРЅРѕСЂРёСЂСѓРµРј РЅРѕРІС‹Р№ Р·Р°РїСЂРѕСЃ
    if (isTransitioning) {
      return;
    }
    
    // Р•СЃР»Рё РёРЅРґРµРєСЃ РЅРµ РёР·РјРµРЅРёР»СЃСЏ, РЅРёС‡РµРіРѕ РЅРµ РґРµР»Р°РµРј
    if (index === currentSectionIndex) {
      return;
    }

    // РЎР±СЂР°СЃС‹РІР°РµРј СЃРѕСЃС‚РѕСЏРЅРёРµ РїСЂРё РїРµСЂРµРєР»СЋС‡РµРЅРёРё

    setIsTransitioning(true);
    setTransitionDirection(direction);
    setCurrentSectionIndex(index);
    
    // РћР±РЅРѕРІР»РµРЅРёРµ URL hash
    if (index === 0) {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      const sectionId = sections[index - 1]?.id || '';
      window.history.replaceState(null, '', `#${sectionId}`);
    }

    // РЎР±СЂРѕСЃ СЃРѕСЃС‚РѕСЏРЅРёСЏ РїРµСЂРµС…РѕРґР° РїРѕСЃР»Рµ Р°РЅРёРјР°С†РёРё
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200); // Р”Р»РёС‚РµР»СЊРЅРѕСЃС‚СЊ Р°РЅРёРјР°С†РёРё (С‡СѓС‚СЊ Р±РѕР»СЊС€Рµ С‡РµРј РІ SectionTransition)
  }, [isTransitioning, totalSections, currentSectionIndex, sections]);

  // РћР±СЂР°Р±РѕС‚С‡РёРєРё touch РґР»СЏ РјРѕР±РёР»СЊРЅС‹С…
  const touchStartYRef = useRef<number>(0);
  const touchStartElementRef = useRef<HTMLElement | null>(null);
  const touchScrolledInsideRef = useRef<boolean>(false);

  // Р¤Р»Р°Рі РґР»СЏ РїСЂРµРґРѕС‚РІСЂР°С‰РµРЅРёСЏ РјРЅРѕР¶РµСЃС‚РІРµРЅРЅС‹С… РїРµСЂРµРєР»СЋС‡РµРЅРёР№ Р·Р° РѕРґРёРЅ СЃРєСЂРѕР»Р»
  
  // РћР±СЂР°Р±РѕС‚С‡РёРє СЃРєСЂРѕР»Р»Р° РєРѕР»РµСЃРѕРј РјС‹С€Рё
  const handleWheel = useCallback((e: WheelEvent) => {
    // Р•СЃР»Рё СѓР¶Рµ РѕР±СЂР°Р±Р°С‚С‹РІР°РµРј СЃРєСЂРѕР»Р» РёР»Рё РїРµСЂРµС…РѕРґРёРј, РёРіРЅРѕСЂРёСЂСѓРµРј
    if (isProcessingScrollRef.current || isTransitioning) {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    const now = Date.now();
    const direction = e.deltaY > 0 ? 'down' : 'up';
    
    // РџСЂРѕРІРµСЂСЏРµРј, РµСЃС‚СЊ Р»Рё РІРЅСѓС‚СЂРµРЅРЅРёР№ СЃРєСЂРѕР»Р» РІ С‚РµРєСѓС‰РµР№ СЃРµРєС†РёРё
    const currentSection = sectionRefs.current[currentSectionIndex];
    if (!currentSection) {
      // Р•СЃР»Рё СЃРµРєС†РёСЏ РЅРµ РЅР°Р№РґРµРЅР°, РїСЂРѕСЃС‚Рѕ РїРµСЂРµРєР»СЋС‡Р°РµРј СЃ С‚СЂРѕС‚С‚Р»РѕРј
      if (now - lastScrollTime.current < SCROLL_THROTTLE) return;
      isProcessingScrollRef.current = true;
      lastScrollTime.current = now;
      if (direction === 'down' && currentSectionIndex < totalSections - 1) {
        scrollToSection(currentSectionIndex + 1, 'down');
      } else if (direction === 'up' && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1, 'up');
      }
      setTimeout(() => { isProcessingScrollRef.current = false; }, SCROLL_THROTTLE);
      return;
    }
    
    // РС‰РµРј scrollable РєРѕРЅС‚РµР№РЅРµСЂ
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
    
    // РџСЂРѕРІРµСЂСЏРµРј, РµСЃС‚СЊ Р»Рё СЂРµР°Р»СЊРЅС‹Р№ РІРЅСѓС‚СЂРµРЅРЅРёР№ СЃРєСЂРѕР»Р»
    if (containerToCheck) {
      const { scrollTop, scrollHeight, clientHeight } = containerToCheck;
      const hasRealScroll = scrollHeight > clientHeight + 50;
      
      if (hasRealScroll) {
        const isAtTop = scrollTop <= 10;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
        
        // Р•СЃР»Рё РјС‹ РќР• РЅР° РіСЂР°РЅРёС†Рµ - СЃРєСЂРѕР»Р»РёРј РІРЅСѓС‚СЂРё Р‘Р•Р— С‚СЂРѕС‚С‚Р»Р°
        if (!isAtTop && !isAtBottom) {
          containerToCheck.scrollTop += e.deltaY;
          return; // РћРґРЅРѕ РґРµР№СЃС‚РІРёРµ РІС‹РїРѕР»РЅРµРЅРѕ - РІС‹С…РѕРґРёРј
        }
        
        // Р•СЃР»Рё РјС‹ РЅР° РіСЂР°РЅРёС†Рµ - РїСЂРѕРІРµСЂСЏРµРј С‚СЂРѕС‚С‚Р» Рё РїРµСЂРµРєР»СЋС‡Р°РµРј СЃРµРєС†РёСЋ
        if ((direction === 'down' && isAtBottom) || (direction === 'up' && isAtTop)) {
          if (now - lastScrollTime.current < SCROLL_THROTTLE) return;
          isProcessingScrollRef.current = true;
          lastScrollTime.current = now;
          
          if (direction === 'down' && currentSectionIndex < totalSections - 1) {
            scrollToSection(currentSectionIndex + 1, 'down');
          } else if (direction === 'up' && currentSectionIndex > 0) {
            scrollToSection(currentSectionIndex - 1, 'up');
          }
          setTimeout(() => { isProcessingScrollRef.current = false; }, SCROLL_THROTTLE);
          return; // РћРґРЅРѕ РґРµР№СЃС‚РІРёРµ РІС‹РїРѕР»РЅРµРЅРѕ - РІС‹С…РѕРґРёРј
        }
      }
    }
    
    // Р•СЃР»Рё РЅРµС‚ РІРЅСѓС‚СЂРµРЅРЅРµРіРѕ СЃРєСЂРѕР»Р»Р° - РїРµСЂРµРєР»СЋС‡Р°РµРј СЃРµРєС†РёСЋ СЃ С‚СЂРѕС‚С‚Р»РѕРј
    if (now - lastScrollTime.current < SCROLL_THROTTLE) return;
    isProcessingScrollRef.current = true;
    lastScrollTime.current = now;
    
    if (direction === 'down' && currentSectionIndex < totalSections - 1) {
      scrollToSection(currentSectionIndex + 1, 'down');
    } else if (direction === 'up' && currentSectionIndex > 0) {
      scrollToSection(currentSectionIndex - 1, 'up');
    }
    setTimeout(() => { isProcessingScrollRef.current = false; }, SCROLL_THROTTLE);
  }, [currentSectionIndex, totalSections, scrollToSection, isTransitioning, sectionRefs]);

  // РћР±СЂР°Р±РѕС‚С‡РёРє РєР»Р°РІРёР°С‚СѓСЂС‹
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
    // РЎРѕС…СЂР°РЅСЏРµРј СЌР»РµРјРµРЅС‚, РЅР° РєРѕС‚РѕСЂРѕРј РЅР°С‡Р°Р»СЃСЏ touch
    const target = e.target as HTMLElement;
    touchStartElementRef.current = target;
  }, []);
  
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartYRef.current) return;
    
    const currentY = e.touches[0].clientY;
    const diff = touchStartYRef.current - currentY;
    
    // РџСЂРѕРІРµСЂСЏРµРј, РµСЃС‚СЊ Р»Рё РІРЅСѓС‚СЂРµРЅРЅРёР№ СЃРєСЂРѕР»Р» РІ С‚РµРєСѓС‰РµР№ СЃРµРєС†РёРё
    const currentSection = sectionRefs.current[currentSectionIndex];
    if (!currentSection) return;
    
    // РС‰РµРј scrollable РєРѕРЅС‚РµР№РЅРµСЂ
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
    
    // РџСЂРѕРІРµСЂСЏРµРј, РµСЃС‚СЊ Р»Рё СЂРµР°Р»СЊРЅС‹Р№ РІРЅСѓС‚СЂРµРЅРЅРёР№ СЃРєСЂРѕР»Р»
    if (containerToCheck) {
      const { scrollTop, scrollHeight, clientHeight } = containerToCheck;
      const hasRealScroll = scrollHeight > clientHeight + 50;
      
      if (hasRealScroll) {
        const isAtTop = scrollTop <= 10;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
        
        // Р•СЃР»Рё РјС‹ РќР• РЅР° РіСЂР°РЅРёС†Рµ - РїРѕР·РІРѕР»СЏРµРј РЅР°С‚РёРІРЅРѕРјСѓ СЃРєСЂРѕР»Р»Сѓ СЂР°Р±РѕС‚Р°С‚СЊ
        if (!isAtTop && !isAtBottom) {
          touchScrolledInsideRef.current = true;
          return; // РќРµ РїСЂРµРґРѕС‚РІСЂР°С‰Р°РµРј СЃС‚Р°РЅРґР°СЂС‚РЅРѕРµ РїРѕРІРµРґРµРЅРёРµ
        }
        
        // Р•СЃР»Рё РЅР° РіСЂР°РЅРёС†Рµ Рё РїС‹С‚Р°РµРјСЃСЏ СЃРєСЂРѕР»Р»РёС‚СЊ РґР°Р»СЊС€Рµ - РїСЂРµРґРѕС‚РІСЂР°С‰Р°РµРј
        if ((diff > 0 && isAtBottom) || (diff < 0 && isAtTop)) {
          e.preventDefault();
        }
      }
    }
  }, [currentSectionIndex, sectionRefs]);
  
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartYRef.current) return;
    
    // Р•СЃР»Рё Р±С‹Р» СЃРєСЂРѕР»Р» РІРЅСѓС‚СЂРё - РЅРµ РїРµСЂРµРєР»СЋС‡Р°РµРј СЃРµРєС†РёСЋ
    if (touchScrolledInsideRef.current) {
      touchStartYRef.current = 0;
      touchScrolledInsideRef.current = false;
      touchStartElementRef.current = null;
      return;
    }
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;
    const threshold = 50; // РњРёРЅРёРјР°Р»СЊРЅРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ РґР»СЏ РїРµСЂРµРєР»СЋС‡РµРЅРёСЏ
    
    if (Math.abs(diff) > threshold) {
      const now = Date.now();
      // РџСЂРѕРІРµСЂСЏРµРј С‚СЂРѕС‚С‚Р» РґР»СЏ РїРµСЂРµРєР»СЋС‡РµРЅРёСЏ СЃРµРєС†РёР№
      if (now - lastScrollTime.current < SCROLL_THROTTLE) {
        touchStartYRef.current = 0;
        touchStartElementRef.current = null;
        return;
      }
      lastScrollTime.current = now;
      
      if (diff > 0 && currentSectionIndex < totalSections - 1) {
        scrollToSection(currentSectionIndex + 1, 'down');
      } else if (diff < 0 && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1, 'up');
      }
    }
    
    touchStartYRef.current = 0;
    touchStartElementRef.current = null;
    touchScrolledInsideRef.current = false;
  }, [currentSectionIndex, totalSections, scrollToSection]);

  // РЈСЃС‚Р°РЅРѕРІРєР° РѕР±СЂР°Р±РѕС‚С‡РёРєРѕРІ РґР»СЏ screen-based navigation (РїРѕСЃР»Рµ РѕРїСЂРµРґРµР»РµРЅРёСЏ РІСЃРµС… С„СѓРЅРєС†РёР№)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // РћС‚РєР»СЋС‡РµРЅРёРµ СЃС‚Р°РЅРґР°СЂС‚РЅРѕРіРѕ СЃРєСЂРѕР»Р»Р°
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // РћР±СЂР°Р±РѕС‚С‡РёРєРё СЃРѕР±С‹С‚РёР№
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
    
    // РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ РїРѕ hash РёР· URL
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
              {/* Cards-only СЌРєСЂР°РЅ: СѓР±РёСЂР°РµРј РІРµСЃСЊ С‚РµРєСЃС‚РѕРІС‹Р№ Р±Р»РѕРє, РѕСЃС‚Р°РІР»СЏРµРј С‚РѕР»СЊРєРѕ РєР°СЂС‚РѕС‡РєРё РЅРёР¶Рµ */}
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
                      в”Ђв”Ђв”Ђ {section.title} в”Ђв”Ђв”Ђ
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
              <>
                <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto px-4 w-full" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
                  {section.services.map((service, idx) => {
                    // IntersectionObserver РЅР° fixed/hidden СЃРµРєС†РёСЏС… РјРѕР¶РµС‚ РЅРµ СЃСЂР°Р±Р°С‚С‹РІР°С‚СЊ вЂ” РїРѕРєР°Р·С‹РІР°РµРј РєР°СЂС‚РѕС‡РєРё, РєРѕРіРґР° СЃРµРєС†РёСЏ Р°РєС‚РёРІРЅР°
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
                {/* Service Packages */}
                {currentSectionIndex === sectionIndex && (
                  <div className="mt-8 md:mt-12 px-4">
                    <ServicePackages showComplex={true} />
                  </div>
                )}
              </>
            )}

            {section.id === 'services-cards' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 md:mt-12"
              >
                <ServicePackages showComplex={true} />
              </motion.div>
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
              </motion.div>
            )}

            {section.id === 'about-values' && (
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
                      {t('contact.consultation.title') || 'РЎРІСЏР·Р°С‚СЊСЃСЏ СЃ РЅР°РјРё'}
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
                          {t('common.sending') || 'РћС‚РїСЂР°РІРєР°...'}
                        </>
                      ) : (
                        t('contact.consultation.confirm') || 'РћС‚РїСЂР°РІРёС‚СЊ Р·Р°СЏРІРєСѓ'
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

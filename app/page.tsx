"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import FanMenu from '@/components/layout/FanMenu';
import InteractiveSphere from '@/components/visuals/InteractiveSphere';
import PointGlobe from '@/components/visuals/PointGlobe';
import TerrainGrid from '@/components/visuals/TerrainGrid';
import WireframeBubbles from '@/components/visuals/WireframeBubbles';
import MethodologyLayers from '@/components/visuals/MethodologyLayers';
import BootSequence from '@/components/boot/BootSequence';
import { RewardProvider, useRewards } from '@/components/interactive/HiddenRewards';
import UserCabinet from '@/components/interactive/UserCabinet';
import Link from 'next/link';
import { 
  ArrowRight, 
  Layers, 
  Rocket, 
  Code, 
  Palette, 
  TrendingUp, 
  FileText, 
  Film,
  Gift,
  Users,
  FlaskConical,
  Sparkles,
  Zap,
  Network,
  ChevronRight
} from 'lucide-react';

function MainContent() {
  const [isBooting, setIsBooting] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sphereClicked, setSphereClicked] = useState(false);
  const [globeRotated, setGlobeRotated] = useState(false);
  const [menuItemsVisited, setMenuItemsVisited] = useState<Set<string>>(new Set());
  const [ctaHovered, setCtaHovered] = useState<Set<string>>(new Set());
  const [terrainInteracted, setTerrainInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { discoverReward, setShowRewardsPanel, totalDiscovered, rewards } = useRewards();

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 2500);
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

  // Handle sphere click reward
  const handleSphereInteraction = useCallback(() => {
    if (!sphereClicked) {
      setSphereClicked(true);
      discoverReward('FIRST_CLICK');
    }
  }, [sphereClicked, discoverReward]);

  // Handle globe rotation reward
  const handleGlobeRotation = useCallback(() => {
    if (!globeRotated) {
      setGlobeRotated(true);
      discoverReward('GLOBE_EXPLORER');
    }
  }, [globeRotated, discoverReward]);

  // Handle terrain interaction reward  
  const handleTerrainInteraction = useCallback(() => {
    if (!terrainInteracted) {
      setTerrainInteracted(true);
      discoverReward('TERRAIN_ARTIST');
    }
  }, [terrainInteracted, discoverReward]);

  // Handle CTA hover reward
  const handleCtaHover = useCallback((ctaId: string) => {
    const newSet = new Set(ctaHovered);
    newSet.add(ctaId);
    setCtaHovered(newSet);
    
    // Check if all CTAs visited
    if (newSet.size >= 3) {
      discoverReward('CONTACT_READY');
    }
  }, [ctaHovered, discoverReward]);

  const services = [
    { icon: <Layers size={24} />, name: 'ECOSYSTEMS', desc: 'Комплексная разработка проектов', href: '/services' },
    { icon: <Code size={24} />, name: 'WEB/APP', desc: 'Сайты, SPA, мобильные приложения', href: '/services' },
    { icon: <Rocket size={24} />, name: 'BLOCKCHAIN', desc: 'Смарт-контракты, dApps, Web3', href: '/services' },
    { icon: <Palette size={24} />, name: 'DESIGN', desc: 'UI/UX, брендинг, айдентика', href: '/services' },
    { icon: <TrendingUp size={24} />, name: 'MARKETING', desc: 'Продвижение, SMM, контент', href: '/services' },
    { icon: <FileText size={24} />, name: 'DOCUMENTS', desc: 'Whitepaper, бизнес-план', href: '/services' },
    { icon: <Film size={24} />, name: 'VIDEO', desc: 'Продакшн, моушн-дизайн', href: '/services' },
  ];

  const metrics = [
    { value: '50+', label: 'ПРОЕКТОВ' },
    { value: '$2M+', label: 'ПРИВЛЕЧЕНО' },
    { value: '98%', label: 'УСПЕХ' },
    { value: '24/7', label: 'ПОДДЕРЖКА' },
  ];

  const whyMultidisciplinary = [
    {
      icon: <Network size={20} />,
      title: 'Кросс-опыление идей',
      desc: 'Дизайнеры вдохновляют разработчиков, маркетологи находят инсайты в данных R&D'
    },
    {
      icon: <Zap size={20} />,
      title: 'Быстрые итерации',
      desc: 'Все компетенции в одной команде — нет задержек на коммуникацию между агентствами'
    },
    {
      icon: <Sparkles size={20} />,
      title: 'Неожиданные решения',
      desc: 'Блокчейн + видео = NFT-контент. Дизайн + AI = генеративное искусство'
    },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-ink-deep overflow-x-hidden"
    >
      {/* Background effects */}
      <div className="fixed inset-0 oil-shimmer opacity-30 pointer-events-none" />
      <div className="fixed inset-0 wireframe-grid pointer-events-none" />
      
      {/* Boot sequence */}
      <AnimatePresence>
        {isBooting && <BootSequence />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!isBooting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Header */}
            <Header />

            {/* Hero Section - Split Layout */}
            <section className="relative min-h-screen grid md:grid-cols-2 items-center px-4 pt-32 pb-24">
              {/* Left side - Text content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-20 md:pl-8 lg:pl-16"
              >
                <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-6">
                  ─── DIGITAL LABORATORY ───
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-light tracking-tight text-engrave-fresco mb-6">
                  СОЗДАЁМ
                  <br />
                  <span className="text-chrome">ЦИФРОВЫЕ</span>
                  <br />
                  ВСЕЛЕННЫЕ
                </h1>
                
                <p className="font-mono text-sm md:text-base text-stone-slate max-w-md mb-8 leading-relaxed">
                  Междисциплинарная лаборатория, где сходятся технологии, 
                  дизайн и бизнес. Мы не просто разрабатываем — мы исследуем, 
                  экспериментируем и создаём решения, которых ещё не существует.
                </p>

                <div className="font-mono text-xs text-engrave-dim mb-10 border-l-2 border-stone-anthracite pl-4">
                  Экосистемы · Блокчейн · Дизайн · Маркетинг · AI · R&D
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link href="/services">
                    <motion.button
                      onMouseEnter={() => handleCtaHover('explore')}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                               flex items-center gap-3 transition-all"
                    >
                      УСЛУГИ
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                  
                  <Link href="/contact">
                    <motion.button
                      onMouseEnter={() => handleCtaHover('contact')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 border border-stone-anthracite text-engrave-line font-mono text-sm tracking-widest
                               hover:border-engrave-line/50 transition-all"
                    >
                      СВЯЗАТЬСЯ
                    </motion.button>
                  </Link>
                </div>

                {/* Metrics */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-12 flex flex-wrap items-center gap-8"
                >
                  {metrics.map((metric, i) => (
                    <div key={i} className="text-left">
                      <div className="font-mono text-2xl text-engrave-fresco">
                        {metric.value}
                      </div>
                      <div className="font-mono text-[9px] text-stone-slate tracking-widest mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right side - Interactive sphere */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="relative h-[300px] sm:h-[400px] md:h-[600px] pointer-events-auto cursor-pointer mt-8 md:mt-0"
                onClick={handleSphereInteraction}
              >
                <InteractiveSphere mousePos={mousePos} />
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-mono text-[9px] text-stone-slate tracking-widest"
                >
                  SCROLL TO EXPLORE
                </motion.div>
              </motion.div>
            </section>

            {/* Why Multidisciplinary Section with Bubbles */}
            <section className="relative py-24 px-4 border-y border-stone-anthracite/20">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Text content */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-4">
                      ─── ПОЧЕМУ МЫ ───
                    </div>
                    <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-6">
                      МЕЖДИСЦИПЛИНАРНЫЙ
                      <br />
                      <span className="text-chrome">ПОДХОД</span>
                    </h2>
                    <p className="font-mono text-sm text-stone-slate leading-relaxed mb-8">
                      Развиваясь во многих направлениях одновременно, мы находим решения там, 
                      где узкие специалисты видят только стены. Каждый проект обогащается 
                      знаниями из смежных областей.
                    </p>
                    
                    <div className="space-y-4">
                      {whyMultidisciplinary.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 p-4 border border-stone-anthracite/30 
                                   hover:border-engrave-line/20 transition-colors"
                        >
                          <div className="text-engrave-dim">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-mono text-sm text-engrave-fresco mb-1">
                              {item.title}
                            </h3>
                            <p className="font-mono text-[11px] text-stone-slate">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Wireframe bubbles visualization */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="h-[300px] sm:h-[400px] md:h-[500px]"
                  >
                    <WireframeBubbles />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section className="relative py-24 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-4">
                    ─── SERVICES ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight">
                    НАПРАВЛЕНИЯ РАБОТЫ
                  </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {services.map((service, i) => (
                    <Link key={service.name} href={service.href}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -8, borderColor: 'rgba(232, 232, 232, 0.3)' }}
                        className="group p-6 border border-stone-anthracite/30 bg-ink-chrome/30 backdrop-blur-sm
                                 hover:bg-ink-chrome/50 transition-all cursor-pointer"
                      >
                        <div className="text-stone-slate group-hover:text-engrave-line transition-colors mb-4">
                          {service.icon}
                        </div>
                        <h3 className="font-mono text-sm text-engrave-fresco tracking-wider mb-2">
                          {service.name}
                        </h3>
                        <p className="font-mono text-[10px] text-stone-slate">
                          {service.desc}
                        </p>
                        <div className="mt-4 font-mono text-[9px] text-engrave-dim flex items-center gap-1 
                                      group-hover:text-engrave-line transition-colors">
                          ПОДРОБНЕЕ <ChevronRight size={10} />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Methodology & Depth Section */}
            <section className="relative py-24 px-4 border-y border-stone-anthracite/20">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* 3D Visualization */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="h-[300px] sm:h-[400px] md:h-[500px] order-2 lg:order-1"
                  >
                    <MethodologyLayers />
                  </motion.div>

                  {/* Text content */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2"
                  >
                    <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-4">
                      ─── METHODOLOGY ───
                    </div>
                    <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-6">
                      ГЛУБИНА
                      <br />
                      <span className="text-chrome">ИССЛЕДОВАНИЙ</span>
                    </h2>
                    <p className="font-mono text-sm text-stone-slate leading-relaxed mb-6">
                      Каждый проект начинается с глубокого анализа. Мы изучаем рынок, 
                      конкурентов, пользователей и технические возможности прежде чем 
                      написать первую строчку кода.
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {[
                        { layer: 'LAYER 1', name: 'Исследование рынка', desc: 'Анализ конкурентов, трендов, возможностей' },
                        { layer: 'LAYER 2', name: 'Пользовательские исследования', desc: 'Jobs to be done, интервью, тестирование' },
                        { layer: 'LAYER 3', name: 'Техническое проектирование', desc: 'Архитектура, стек, интеграции' },
                        { layer: 'LAYER 4', name: 'Прототипирование', desc: 'MVP, итерации, валидация гипотез' },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 p-3 border border-stone-anthracite/20
                                   hover:border-engrave-line/20 transition-colors"
                        >
                          <span className="font-mono text-[8px] text-engrave-dim tracking-widest pt-1">
                            {item.layer}
                          </span>
                          <div>
                            <div className="font-mono text-xs text-engrave-fresco">
                              {item.name}
                            </div>
                            <div className="font-mono text-[10px] text-stone-slate">
                              {item.desc}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <Link href="/research">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="font-mono text-[10px] text-engrave-line flex items-center gap-2
                                 hover:text-engrave-fresco transition-colors"
                      >
                        УЗНАТЬ О МЕТОДОЛОГИИ <ArrowRight size={12} />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Globe Section with reward trigger */}
            <section className="relative py-24 px-4">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                <div 
                  className="h-[400px] md:h-[500px]"
                  onMouseUp={handleGlobeRotation}
                >
                  <PointGlobe className="w-full h-full" />
                </div>
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-4">
                      ─── GLOBAL ───
                    </div>
                    <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-6">
                      ГЛОБАЛЬНОЕ
                      <br />
                      ПРИСУТСТВИЕ
                    </h2>
                    <p className="font-mono text-sm text-stone-slate leading-relaxed mb-8">
                      Мы работаем с клиентами по всему миру. Наша команда распределена
                      в разных часовых поясах, что позволяет обеспечить поддержку 24/7.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-engrave-line animate-pulse" />
                      <span className="font-mono text-[10px] text-stone-slate tracking-widest">
                        AVAILABLE WORLDWIDE
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Terrain visualization section with reward trigger */}
            <section className="relative py-24 px-4 border-y border-stone-anthracite/20">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-4">
                    ─── VENTURES ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-4">
                    ИНВЕСТИЦИОННЫЕ ВОЗМОЖНОСТИ
                  </h2>
                  <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto">
                    Портфолио проектов и стартапов с высоким потенциалом роста
                  </p>
                </motion.div>

                <div 
                  className="h-[400px] relative"
                  onClick={handleTerrainInteraction}
                >
                  <TerrainGrid className="w-full h-full" mousePos={mousePos} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Link href="/ventures">
                      <motion.button
                        onMouseEnter={() => handleCtaHover('ventures')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-ink-chrome/80 border border-engrave-line/30 
                                 font-mono text-sm text-engrave-fresco tracking-widest
                                 backdrop-blur-sm pointer-events-auto"
                      >
                        СМОТРЕТЬ ПРОЕКТЫ
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* R&D and Join CTAs - MONOCHROME */}
            <section className="relative py-24 px-4">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
                {/* R&D CTA */}
                <Link href="/research">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, borderColor: 'rgba(232, 232, 232, 0.3)' }}
                    className="p-8 border border-stone-anthracite/30 bg-ink-chrome/20 cursor-pointer group transition-all"
                  >
                    <FlaskConical size={32} className="text-engrave-dim group-hover:text-engrave-line transition-colors mb-4" />
                    <h3 className="font-mono text-xl text-engrave-fresco mb-2 group-hover:text-white transition-colors">
                      R&D ЛАБОРАТОРИЯ
                    </h3>
                    <p className="font-mono text-sm text-stone-slate mb-4">
                      Научные исследования, эксперименты, публикации. 
                      AI, Blockchain, Spatial Computing.
                    </p>
                    <span className="font-mono text-[10px] text-engrave-dim group-hover:text-engrave-line flex items-center gap-2 transition-colors">
                      ИССЛЕДОВАТЬ <ArrowRight size={12} />
                    </span>
                  </motion.div>
                </Link>

                {/* Join CTA */}
                <Link href="/join">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, borderColor: 'rgba(232, 232, 232, 0.3)' }}
                    className="p-8 border border-stone-anthracite/30 bg-ink-chrome/20 cursor-pointer group transition-all"
                  >
                    <Users size={32} className="text-engrave-dim group-hover:text-engrave-line transition-colors mb-4" />
                    <h3 className="font-mono text-xl text-engrave-fresco mb-2 group-hover:text-white transition-colors">
                      ПРИСОЕДИНИТЬСЯ
                    </h3>
                    <p className="font-mono text-sm text-stone-slate mb-4">
                      Ищем разработчиков, дизайнеров, исследователей.
                      Remote-first, equity опции.
                    </p>
                    <span className="font-mono text-[10px] text-engrave-dim group-hover:text-engrave-line flex items-center gap-2 transition-colors">
                      СМОТРЕТЬ ВАКАНСИИ <ArrowRight size={12} />
                    </span>
                  </motion.div>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 px-4 border-t border-stone-anthracite/20">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-5xl font-mono text-engrave-fresco tracking-tight mb-6">
                    ГОТОВЫ СОЗДАТЬ
                    <br />
                    ЧТО-ТО ВЕЛИКОЕ?
                  </h2>
                  <p className="font-mono text-sm text-stone-slate max-w-xl mx-auto mb-10">
                    Свяжитесь с нами для обсуждения вашего проекта.
                    Первая консультация бесплатно.
                  </p>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-12 py-5 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                               flex items-center gap-3 mx-auto transition-all"
                    >
                      НАЧАТЬ ПРОЕКТ
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-stone-anthracite/20">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="font-mono text-[10px] text-stone-slate">
                  © 2024 FRACTALIX.LAB — DIGITAL LABORATORY
                </div>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setShowRewardsPanel(true)}
                    className="flex items-center gap-2 font-mono text-[10px] text-stone-slate 
                             hover:text-engrave-line transition-colors"
                  >
                    <Gift size={12} />
                    НАГРАДЫ ({totalDiscovered}/{rewards.length})
                  </button>
                  <Link href="/research" className="font-mono text-[10px] text-stone-slate hover:text-engrave-line transition-colors">
                    R&D
                  </Link>
                  <Link href="/join" className="font-mono text-[10px] text-stone-slate hover:text-engrave-line transition-colors">
                    ВАКАНСИИ
                  </Link>
                </div>
              </div>
            </footer>

            {/* Fan Menu */}
            <FanMenu />

            {/* User Cabinet */}
            <UserCabinet />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-stone-anthracite/20 pointer-events-none" />
    </div>
  );
}

export default function Home() {
  return (
    <RewardProvider>
      <MainContent />
    </RewardProvider>
  );
}

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

                {/* Metrics - Integrated in sphere area */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(232, 232, 232, 0.3)' }}
                      className="p-4 border border-stone-anthracite/30 bg-ink-chrome/30 backdrop-blur-sm text-left"
                    >
                      <div className="font-mono text-2xl md:text-3xl text-engrave-fresco mb-1">
                        {metric.value}
                      </div>
                      <div className="font-mono text-[9px] text-stone-slate tracking-widest">
                        {metric.label}
                      </div>
                    </motion.div>
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

            {/* Why Multidisciplinary Section with Bubbles - Integrated */}
            <section className="relative py-24 px-4 border-y border-stone-anthracite/20">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-4">
                    ─── ПОЧЕМУ МЫ ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-4">
                    МЕЖДИСЦИПЛИНАРНЫЙ ПОДХОД
                  </h2>
                  <p className="font-mono text-sm text-stone-slate leading-relaxed max-w-3xl mx-auto">
                    Развиваясь во многих направлениях одновременно, мы находим решения там, 
                    где узкие специалисты видят только стены.
                  </p>
                </motion.div>
                
                {/* Integrated visualization with overlays */}
                <div className="relative h-[500px] md:h-[600px] border border-stone-anthracite/20 bg-ink-chrome/10">
                  <WireframeBubbles />
                  
                  {/* Floating info cards */}
                  <div className="absolute inset-0 pointer-events-none">
                    {whyMultidisciplinary.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className={`absolute bg-ink-chrome/95 border border-stone-anthracite/50 p-4 backdrop-blur-xl pointer-events-auto
                          ${i === 0 ? 'top-4 left-4' : ''}
                          ${i === 1 ? 'top-4 right-4' : ''}
                          ${i === 2 ? 'bottom-4 left-1/2 -translate-x-1/2' : ''}
                        `}
                        style={{ maxWidth: '280px' }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-engrave-dim mt-1">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-mono text-sm text-engrave-fresco mb-1">
                              {item.title}
                            </h3>
                            <p className="font-mono text-[10px] text-stone-slate leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Center label */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                               bg-ink-chrome/95 border border-engrave-line/30 px-6 py-3 backdrop-blur-xl pointer-events-auto"
                    >
                      <div className="font-mono text-[10px] text-stone-slate tracking-widest mb-1">
                        СИНЕРГИЯ
                      </div>
                      <div className="font-mono text-lg text-engrave-fresco">
                        SYNERGY
                      </div>
                    </motion.div>
                  </div>
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

            {/* Methodology & Depth Section - Integrated */}
            <section className="relative py-24 px-4 border-y border-stone-anthracite/20">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-4">
                    ─── METHODOLOGY ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-4">
                    ГЛУБИНА ИССЛЕДОВАНИЙ
                  </h2>
                  <p className="font-mono text-sm text-stone-slate leading-relaxed max-w-3xl mx-auto">
                    Каждый проект начинается с глубокого анализа. Мы изучаем рынок, 
                    конкурентов, пользователей и технические возможности прежде чем 
                    написать первую строчку кода.
                  </p>
                </motion.div>
                
                {/* Integrated visualization */}
                <div className="relative h-[500px] md:h-[600px] border border-stone-anthracite/20 bg-ink-chrome/10">
                  <MethodologyLayers />
                  
                  {/* Right side info panel */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="absolute top-4 right-4 max-w-xs bg-ink-chrome/95 border border-stone-anthracite/50 p-4 backdrop-blur-xl pointer-events-auto"
                  >
                    <div className="font-mono text-[8px] text-stone-slate tracking-widest mb-3">
                      PROCESS
                    </div>
                    <div className="space-y-2">
                      {[
                        { layer: 'LAYER 1', name: 'Исследование рынка', desc: 'Анализ конкурентов, трендов' },
                        { layer: 'LAYER 2', name: 'Пользовательские исследования', desc: 'Jobs to be done, интервью' },
                        { layer: 'LAYER 3', name: 'Техническое проектирование', desc: 'Архитектура, стек' },
                        { layer: 'LAYER 4', name: 'Прототипирование', desc: 'MVP, итерации' },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="p-2 border border-stone-anthracite/20 hover:border-engrave-line/20 transition-colors"
                        >
                          <div className="flex items-start gap-2 mb-1">
                            <span className="font-mono text-[7px] text-engrave-dim tracking-widest">
                              {item.layer}
                            </span>
                            <div className="font-mono text-[9px] text-engrave-fresco">
                              {item.name}
                            </div>
                          </div>
                          <div className="font-mono text-[8px] text-stone-slate ml-8">
                            {item.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/research" className="block mt-4 pt-3 border-t border-stone-anthracite/30">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="font-mono text-[9px] text-engrave-line flex items-center gap-2
                                 hover:text-engrave-fresco transition-colors"
                      >
                        УЗНАТЬ БОЛЬШЕ <ArrowRight size={10} />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Globe Section with reward trigger - Integrated text */}
            <section className="relative py-24 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-4">
                    ─── GLOBAL ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-4">
                    ГЛОБАЛЬНОЕ ПРИСУТСТВИЕ
                  </h2>
                </motion.div>
                
                <div 
                  className="relative h-[500px] md:h-[600px] border border-stone-anthracite/20 bg-ink-chrome/10"
                  onMouseUp={handleGlobeRotation}
                >
                  <PointGlobe className="w-full h-full" />
                  
                  {/* Integrated info overlays */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Top left - Stats */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="absolute top-4 left-4 bg-ink-chrome/95 border border-stone-anthracite/50 p-4 backdrop-blur-xl pointer-events-auto"
                    >
                      <div className="font-mono text-[8px] text-stone-slate tracking-widest mb-2">
                        COVERAGE
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="font-mono text-xl text-engrave-fresco">50+</div>
                          <div className="font-mono text-[9px] text-stone-slate">СТРАН</div>
                        </div>
                        <div className="pt-2 border-t border-stone-anthracite/30">
                          <div className="font-mono text-sm text-engrave-line">24/7</div>
                          <div className="font-mono text-[9px] text-stone-slate">ПОДДЕРЖКА</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Top right - Description */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="absolute top-4 right-4 max-w-xs bg-ink-chrome/95 border border-stone-anthracite/50 p-4 backdrop-blur-xl pointer-events-auto"
                    >
                      <div className="font-mono text-[8px] text-stone-slate tracking-widest mb-2">
                        NETWORK
                      </div>
                      <p className="font-mono text-[10px] text-stone-slate leading-relaxed">
                        Команда распределена в разных часовых поясах. 
                        Работаем с клиентами по всему миру.
                      </p>
                    </motion.div>
                    
                    {/* Bottom center - Status */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-ink-chrome/95 border border-stone-anthracite/50 px-6 py-3 backdrop-blur-xl pointer-events-auto flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-engrave-line animate-pulse" />
                      <span className="font-mono text-[10px] text-stone-slate tracking-widest">
                        AVAILABLE WORLDWIDE
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Terrain visualization section with reward trigger - Integrated */}
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
                </motion.div>

                <div 
                  className="relative h-[500px] md:h-[600px] border border-stone-anthracite/20 bg-ink-chrome/10"
                  onClick={handleTerrainInteraction}
                >
                  <TerrainGrid className="w-full h-full" mousePos={mousePos} />
                  
                  {/* Integrated info overlays */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Top left - Portfolio stats */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="absolute top-4 left-4 bg-ink-chrome/95 border border-stone-anthracite/50 p-4 backdrop-blur-xl pointer-events-auto"
                    >
                      <div className="font-mono text-[8px] text-stone-slate tracking-widest mb-3">
                        PORTFOLIO
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="font-mono text-2xl text-engrave-fresco">$2M+</div>
                          <div className="font-mono text-[9px] text-stone-slate">ПРИВЛЕЧЕНО</div>
                        </div>
                        <div className="pt-2 border-t border-stone-anthracite/30">
                          <div className="font-mono text-lg text-engrave-line">15+</div>
                          <div className="font-mono text-[9px] text-stone-slate">ПРОЕКТОВ</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Top right - Description */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="absolute top-4 right-4 max-w-xs bg-ink-chrome/95 border border-stone-anthracite/50 p-4 backdrop-blur-xl pointer-events-auto"
                    >
                      <div className="font-mono text-[8px] text-stone-slate tracking-widest mb-2">
                        ОПИСАНИЕ
                      </div>
                      <p className="font-mono text-[10px] text-stone-slate leading-relaxed mb-3">
                        Портфолио проектов и стартапов с высоким потенциалом роста. 
                        От блокчейн-решений до AI-платформ.
                      </p>
                      <div className="flex items-center gap-2 pt-2 border-t border-stone-anthracite/30">
                        <div className="w-1.5 h-1.5 bg-engrave-line" />
                        <span className="font-mono text-[9px] text-stone-slate">HIGH GROWTH</span>
                      </div>
                    </motion.div>
                    
                    {/* Center - CTA Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Link href="/ventures">
                        <motion.button
                          onMouseEnter={() => handleCtaHover('ventures')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 bg-ink-chrome/95 border border-engrave-line/30 
                                   font-mono text-sm text-engrave-fresco tracking-widest
                                   backdrop-blur-xl pointer-events-auto shadow-lg"
                        >
                          СМОТРЕТЬ ПРОЕКТЫ
                        </motion.button>
                      </Link>
                    </div>
                    
                    {/* Bottom left - Metrics */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="absolute bottom-4 left-4 bg-ink-chrome/95 border border-stone-anthracite/50 p-3 backdrop-blur-xl pointer-events-auto"
                    >
                      <div className="font-mono text-[8px] text-stone-slate tracking-widest mb-2">
                        METRICS
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-mono text-lg text-engrave-fresco">98%</div>
                          <div className="font-mono text-[8px] text-stone-slate">УСПЕХ</div>
                        </div>
                        <div className="w-px h-8 bg-stone-anthracite/30" />
                        <div>
                          <div className="font-mono text-lg text-engrave-line">5+</div>
                          <div className="font-mono text-[8px] text-stone-slate">ЛЕТ</div>
                        </div>
                      </div>
                    </motion.div>
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

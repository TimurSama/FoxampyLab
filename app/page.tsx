"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import InteractiveSphere from '@/components/visuals/InteractiveSphere';
import PointGlobe from '@/components/visuals/PointGlobe';
import TerrainGrid from '@/components/visuals/TerrainGrid';
import WireframeBubbles from '@/components/visuals/WireframeBubbles';
import MethodologyLayers from '@/components/visuals/MethodologyLayers';
import BootSequence from '@/components/boot/BootSequence';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { 
  ArrowRight, 
  Layers, 
  Rocket, 
  Code, 
  Palette, 
  TrendingUp, 
  FileText, 
  Film,
  Users,
  FlaskConical,
  Sparkles,
  Zap,
  Network,
  ChevronRight
} from 'lucide-react';

function MainContent() {
  const { t } = useI18n();
  const [isBooting, setIsBooting] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sphereClicked, setSphereClicked] = useState(false);
  const [globeRotated, setGlobeRotated] = useState(false);
  const [menuItemsVisited, setMenuItemsVisited] = useState<Set<string>>(new Set());
  const [ctaHovered, setCtaHovered] = useState<Set<string>>(new Set());
  const [terrainInteracted, setTerrainInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Быстрая заставка - 0.8 секунды вместо 2.5
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

  // Handle sphere click
  const handleSphereInteraction = useCallback(() => {
    if (!sphereClicked) {
      setSphereClicked(true);
    }
  }, [sphereClicked]);

  // Handle globe rotation
  const handleGlobeRotation = useCallback(() => {
    if (!globeRotated) {
      setGlobeRotated(true);
    }
  }, [globeRotated]);

  // Handle terrain interaction
  const handleTerrainInteraction = useCallback(() => {
    if (!terrainInteracted) {
      setTerrainInteracted(true);
    }
  }, [terrainInteracted]);

  // Handle CTA hover
  const handleCtaHover = useCallback((ctaId: string) => {
    const newSet = new Set(ctaHovered);
    newSet.add(ctaId);
    setCtaHovered(newSet);
  }, [ctaHovered]);

  const services = [
    { icon: <Layers size={24} />, name: t('services.ecosystems'), desc: t('services.ecosystemsDesc'), href: '/services' },
    { icon: <Code size={24} />, name: t('services.webapp'), desc: t('services.webappDesc'), href: '/services' },
    { icon: <Rocket size={24} />, name: t('services.blockchain'), desc: t('services.blockchainDesc'), href: '/services' },
    { icon: <Palette size={24} />, name: t('services.design'), desc: t('services.designDesc'), href: '/services' },
    { icon: <TrendingUp size={24} />, name: t('services.marketing'), desc: t('services.marketingDesc'), href: '/services' },
    { icon: <FileText size={24} />, name: t('services.documents'), desc: t('services.documentsDesc'), href: '/services' },
    { icon: <Film size={24} />, name: t('services.video'), desc: t('services.videoDesc'), href: '/services' },
  ];


  const whyMultidisciplinary = [
    {
      icon: <Network size={20} />,
      title: t('home.whyItem1Title'),
      desc: t('home.whyItem1Desc')
    },
    {
      icon: <Zap size={20} />,
      title: t('home.whyItem2Title'),
      desc: t('home.whyItem2Desc')
    },
    {
      icon: <Sparkles size={20} />,
      title: t('home.whyItem3Title'),
      desc: t('home.whyItem3Desc')
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
      
      {/* Main content - всегда рендерится для SEO, видимый в HTML */}
      <div className={isBooting ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-300'}>
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
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
                  ─── {t('home.tagline')} ───
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-light tracking-tight text-engrave-fresco mb-6">
                  {t('home.title')}
                  <br />
                  <span className="text-chrome">{t('home.titleHighlight')}</span>
                  <br />
                  {t('home.titleEnd')}
                </h1>
                
                <p className="font-mono text-sm md:text-base text-stone-slate max-w-md mb-8 leading-relaxed">
                  {t('home.description')}
                </p>

                <div className="font-mono text-xs text-engrave-dim mb-10 border-l-2 border-stone-anthracite pl-4">
                  {t('home.tags')}
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
                      {t('common.services')}
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
                      {t('common.contact')}
                    </motion.button>
                  </Link>
                </div>

                {/* Metrics - Integrated in sphere area */}
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
                  {t('common.scrollToExplore')}
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
                    ─── {t('home.whyTitle')} ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-4">
                    {t('home.whySubtitle')}
                  </h2>
                  <p className="font-mono text-sm text-stone-slate leading-relaxed max-w-3xl mx-auto">
                    {t('home.whyDescription')}
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
                        {t('home.synergy')}
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
                    ─── {t('home.servicesTitle')} ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight">
                    {t('home.servicesSubtitle')}
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
                          {t('services.more')} <ChevronRight size={10} />
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
                    ─── {t('home.methodologyTitle')} ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-4">
                    {t('home.methodologySubtitle')}
                  </h2>
                  <p className="font-mono text-sm text-stone-slate leading-relaxed max-w-3xl mx-auto">
                    {t('home.methodologyDescription')}
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
                      {t('home.process')}
                    </div>
                    <div className="space-y-2">
                      {[
                        { layer: t('home.layer1'), name: t('home.layer1Name'), desc: t('home.layer1Desc') },
                        { layer: t('home.layer2'), name: t('home.layer2Name'), desc: t('home.layer2Desc') },
                        { layer: t('home.layer3'), name: t('home.layer3Name'), desc: t('home.layer3Desc') },
                        { layer: t('home.layer4'), name: t('home.layer4Name'), desc: t('home.layer4Desc') },
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
                        {t('home.learnMore')} <ArrowRight size={10} />
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
                    ─── {t('home.globalTitle')} ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-4">
                    {t('home.globalSubtitle')}
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
                        {t('home.coverage')}
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
                        {t('home.network')}
                      </div>
                      <p className="font-mono text-[10px] text-stone-slate leading-relaxed">
                        {t('home.networkDescription')}
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
                        {t('home.availableWorldwide')}
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
                    ─── {t('home.venturesTitle')} ───
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-engrave-fresco tracking-tight mb-4">
                    {t('home.venturesSubtitle')}
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
                        {t('home.portfolio')}
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
                        {t('home.description')}
                      </div>
                      <p className="font-mono text-[10px] text-stone-slate leading-relaxed mb-3">
                        {t('home.venturesDescription')}
                      </p>
                      <div className="flex items-center gap-2 pt-2 border-t border-stone-anthracite/30">
                        <div className="w-1.5 h-1.5 bg-engrave-line" />
                        <span className="font-mono text-[9px] text-stone-slate">{t('home.highGrowth')}</span>
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
                          {t('home.viewProjects')}
                        </motion.button>
                      </Link>
                    </div>
                    
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
                      {t('home.rdTitle')}
                    </h3>
                    <p className="font-mono text-sm text-stone-slate mb-4">
                      {t('home.rdDescription')}
                    </p>
                    <span className="font-mono text-[10px] text-engrave-dim group-hover:text-engrave-line flex items-center gap-2 transition-colors">
                      {t('home.explore')} <ArrowRight size={12} />
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
                      {t('home.joinTitle')}
                    </h3>
                    <p className="font-mono text-sm text-stone-slate mb-4">
                      {t('home.joinDescription')}
                    </p>
                    <span className="font-mono text-[10px] text-engrave-dim group-hover:text-engrave-line flex items-center gap-2 transition-colors">
                      {t('home.viewVacancies')} <ArrowRight size={12} />
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
                    {t('home.ctaTitle')}
                    <br />
                    {t('home.ctaTitleEnd')}
                  </h2>
                  <p className="font-mono text-sm text-stone-slate max-w-xl mx-auto mb-10">
                    {t('home.ctaDescription')}
                  </p>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-12 py-5 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                               flex items-center gap-3 mx-auto transition-all"
                    >
                      {t('home.startProject')}
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
                  {t('home.footer')}
                </div>
                <div className="flex items-center gap-6">
                  <Link href="/research" className="font-mono text-[10px] text-stone-slate hover:text-engrave-line transition-colors">
                    R&D
                  </Link>
                  <Link href="/join" className="font-mono text-[10px] text-stone-slate hover:text-engrave-line transition-colors">
                    {t('home.vacancies')}
                  </Link>
                </div>
              </div>
            </footer>

          </motion.div>
        </div>

      {/* Boot sequence overlay - поверх контента */}
      <AnimatePresence>
        {isBooting && <BootSequence />}
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
  return <MainContent />;
}

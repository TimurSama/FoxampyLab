"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Layers, Rocket, Code, Palette, TrendingUp, FileText, Film, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function VariantF() {
  const { t } = useI18n();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  const services = [
    { icon: <Layers size={24} />, name: t('services.ecosystems'), desc: t('services.ecosystemsDesc') },
    { icon: <Code size={24} />, name: t('services.webapp'), desc: t('services.webappDesc') },
    { icon: <Rocket size={24} />, name: t('services.blockchain'), desc: t('services.blockchainDesc') },
    { icon: <Palette size={24} />, name: t('services.design'), desc: t('services.designDesc') },
    { icon: <TrendingUp size={24} />, name: t('services.marketing'), desc: t('services.marketingDesc') },
    { icon: <FileText size={24} />, name: t('services.documents'), desc: t('services.documentsDesc') },
    { icon: <Film size={24} />, name: t('services.video'), desc: t('services.videoDesc') },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2a] to-[#0a0a1a] text-white overflow-hidden"
      style={{ fontFamily: 'serif' }}
    >
      {/* Liquid ink background */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(138,43,226,0.4) 0%, transparent 70%)',
            left: `${50 + mousePos.x * 20}%`,
            top: `${50 + mousePos.y * 20}%`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(75,0,130,0.4) 0%, transparent 70%)',
            right: `${20 + mousePos.x * 15}%`,
            bottom: `${20 + mousePos.y * 15}%`,
          }}
          animate={{
            x: [0, -80, 80, 0],
            y: [0, -40, 40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Flowing ink patterns */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a2be2" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#4b0082" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,200 Q200,100 400,200 T800,200 Q1000,100 1200,200"
          stroke="url(#inkGradient)"
          strokeWidth="2"
          fill="none"
          animate={{
            d: [
              "M0,200 Q200,100 400,200 T800,200 Q1000,100 1200,200",
              "M0,200 Q200,150 400,200 T800,200 Q1000,150 1200,200",
              "M0,200 Q200,100 400,200 T800,200 Q1000,100 1200,200",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#8a2be2]/30 bg-[#0a0a1a]/80 backdrop-blur-md"
      >
        <div className="px-4 md:px-8 py-6 flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="text-lg tracking-wider text-white cursor-pointer hover:text-[#8a2be2] transition-colors font-serif italic"
              style={{ 
                textShadow: '0 0 20px rgba(138,43,226,0.5)',
                letterSpacing: '0.1em'
              }}
            >
              ◈ FOXAMPY LAB
            </motion.div>
          </Link>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 border border-[#8a2be2]/50 text-[#8a2be2] text-xs tracking-wider hover:border-[#8a2be2] hover:bg-[#8a2be2]/10 transition-all font-serif"
              style={{ boxShadow: '0 0 15px rgba(138,43,226,0.3)' }}
            >
              ВСЕ ДИЗАЙНЫ
            </motion.button>
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-8"
          >
            <div className="text-xs text-[#8a2be2]/70 tracking-[0.5em] mb-6 font-serif italic">
              ─── {t('home.tagline')} ───
            </div>
            <motion.h1 
              className="text-6xl md:text-8xl font-light mb-8 text-white leading-tight font-serif"
              style={{ 
                textShadow: '0 0 40px rgba(138,43,226,0.6)',
                background: 'linear-gradient(135deg, #ffffff 0%, #8a2be2 50%, #4b0082 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {t('home.title')}
              <br />
              {t('home.titleHighlight')}
              <br />
              {t('home.titleEnd')}
            </motion.h1>
            <p className="text-base text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 font-serif">
              {t('home.description')}
            </p>
          </motion.div>

          {/* Liquid CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-gradient-to-r from-[#8a2be2] to-[#4b0082] text-white font-semibold text-sm tracking-wider border border-[#8a2be2] hover:shadow-lg hover:shadow-[#8a2be2]/50 transition-all font-serif relative overflow-hidden"
                style={{ boxShadow: '0 0 30px rgba(138,43,226,0.4)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
                <span className="relative">{t('common.services')}</span>
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 border-2 border-[#8a2be2]/50 text-[#8a2be2] font-semibold text-sm tracking-wider hover:border-[#8a2be2] hover:bg-[#8a2be2]/10 transition-all font-serif"
                style={{ boxShadow: '0 0 20px rgba(138,43,226,0.3)' }}
              >
                {t('common.contact')}
              </motion.button>
            </Link>
          </motion.div>

          {/* Flowing decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <motion.div 
              className="h-px w-32 bg-gradient-to-r from-transparent to-[#8a2be2]/50"
              animate={{ width: ['128px', '160px', '128px'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full border-2 border-[#8a2be2]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="h-px w-32 bg-gradient-to-l from-transparent to-[#8a2be2]/50"
              animate={{ width: ['128px', '160px', '128px'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 px-4 border-t border-[#8a2be2]/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs text-[#8a2be2]/70 tracking-[0.5em] mb-6 font-serif italic">
              ─── {t('services.title')} ───
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4 font-serif"
              style={{ textShadow: '0 0 30px rgba(138,43,226,0.5)' }}
            >
              {t('services.subtitle')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Link key={service.name} href="/services">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, borderColor: '#8a2be2' }}
                  className="group p-8 border border-[#8a2be2]/20 bg-gradient-to-br from-[#0a0a1a]/50 to-[#1a0a2a]/50 hover:from-[#1a0a2a]/70 hover:to-[#0a0a1a]/70 transition-all cursor-pointer backdrop-blur-sm"
                  style={{ boxShadow: '0 0 20px rgba(138,43,226,0.1)' }}
                >
                  <div className="text-[#8a2be2]/60 group-hover:text-[#8a2be2] transition-colors mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white tracking-wider mb-3 font-serif">
                    {service.name}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed font-serif">
                    {service.desc}
                  </p>
                  <div className="mt-6 text-xs text-[#8a2be2]/50 flex items-center gap-2 group-hover:text-[#8a2be2]/70 transition-colors font-serif">
                    {t('services.more')} <ChevronRight size={12} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#8a2be2]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/60 font-serif italic">
            {t('home.footer')}
          </div>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-sm text-[#8a2be2]/60 hover:text-[#8a2be2] transition-colors font-serif italic"
            >
              {t('variants.viewAllDesigns')}
            </motion.button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

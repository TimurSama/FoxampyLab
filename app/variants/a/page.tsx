"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Layers, Rocket, Code, Palette, TrendingUp, FileText, Film, ChevronRight } from 'lucide-react';
import MatrixRain from '@/components/variants/MatrixRain';
import { useI18n } from '@/lib/i18n/context';

export default function VariantA() {
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
      className="relative min-h-screen bg-black text-[#00ff41] font-mono overflow-hidden"
      style={{ fontFamily: 'monospace' }}
    >
      <MatrixRain />
      
      {/* Scanlines effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)'
      }} />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#00ff41]/20 bg-black/80 backdrop-blur-sm"
      >
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div className="text-sm tracking-widest text-[#00ff41] cursor-pointer hover:text-[#00ff88] transition-colors">
              ◈ FRACTALIX.LAB
            </motion.div>
          </Link>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 border border-[#00ff41]/30 text-[#00ff41] text-xs tracking-widest hover:border-[#00ff41] transition-colors"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="text-xs text-[#00ff41]/60 tracking-[0.5em] mb-4">
              ─── {t('home.tagline')} ───
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#00ff41] drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]">
              &gt; {t('home.title')}
              <br />
              <span className="text-[#00ff88]">&gt; {t('home.titleHighlight')}</span>
              <br />
              &gt; {t('home.titleEnd')}
            </h1>
            <p className="text-sm text-[#00ff41]/80 max-w-2xl mx-auto leading-relaxed mb-8">
              {t('home.description')}
            </p>
          </motion.div>

          {/* Terminal-style CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,255,65,0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[#00ff41] text-black font-bold text-sm tracking-widest border-2 border-[#00ff41] hover:bg-[#00ff88] transition-colors"
              >
                &gt; {t('common.services')}
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-[#00ff41]/50 text-[#00ff41] font-bold text-sm tracking-widest hover:border-[#00ff41] transition-colors"
              >
                &gt; {t('common.contact')}
              </motion.button>
            </Link>
          </motion.div>

          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-left max-w-2xl mx-auto border border-[#00ff41]/20 bg-black/50 p-4"
          >
            <div className="text-[#00ff41]/60 text-xs mb-2">user@fractalix:~$</div>
            <div className="text-[#00ff41] text-xs animate-pulse">█</div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 px-4 border-t border-[#00ff41]/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-xs text-[#00ff41]/60 tracking-[0.5em] mb-4">
              ─── {t('services.title')} ───
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00ff41] mb-4">
              &gt; {t('services.subtitle')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <Link key={service.name} href="/services">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ borderColor: '#00ff41', boxShadow: '0 0 20px rgba(0,255,65,0.2)' }}
                  className="group p-6 border border-[#00ff41]/20 bg-black/30 hover:bg-black/50 transition-all cursor-pointer"
                >
                  <div className="text-[#00ff41]/60 group-hover:text-[#00ff41] transition-colors mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-sm font-bold text-[#00ff41] tracking-wider mb-2">
                    &gt; {service.name}
                  </h3>
                  <p className="text-[10px] text-[#00ff41]/60">
                    {service.desc}
                  </p>
                  <div className="mt-4 text-[9px] text-[#00ff41]/40 flex items-center gap-1 group-hover:text-[#00ff41]/60 transition-colors">
                    {t('services.more')} <ChevronRight size={10} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#00ff41]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] text-[#00ff41]/60">
            {t('home.footer')}
          </div>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-[10px] text-[#00ff41]/60 hover:text-[#00ff41] transition-colors"
            >
              &gt; {t('variants.viewAllDesigns')}
            </motion.button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

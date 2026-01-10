"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Layers, Rocket, Code, Palette, TrendingUp, FileText, Film, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function VariantB() {
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
      className="relative min-h-screen bg-gradient-to-b from-[#2a1f0f] via-[#3d2815] to-[#1a1208] text-[#d4af37] overflow-hidden"
      style={{ fontFamily: 'serif' }}
    >
      {/* Sand texture overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }} />

      {/* Elegant geometric patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="sandPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#d4af37" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#sandPattern)" />
        </svg>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#d4af37]/20 bg-gradient-to-b from-[#2a1f0f]/95 to-transparent backdrop-blur-sm"
      >
        <div className="px-4 md:px-8 py-6 flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="text-lg tracking-widest text-[#d4af37] cursor-pointer hover:text-[#f4cf57] transition-colors font-serif"
              style={{ letterSpacing: '0.3em' }}
            >
              ◈ FRACTALIX.LAB
            </motion.div>
          </Link>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 border border-[#d4af37]/40 text-[#d4af37] text-xs tracking-widest hover:border-[#d4af37] transition-colors font-serif"
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
            <div className="text-xs text-[#d4af37]/70 tracking-[0.5em] mb-6 font-serif">
              ─── {t('home.tagline')} ───
            </div>
            <h1 className="text-6xl md:text-8xl font-light mb-8 text-[#d4af37] leading-tight font-serif">
              {t('home.title')}
              <br />
              <span className="text-[#f4cf57] font-normal">{t('home.titleHighlight')}</span>
              <br />
              {t('home.titleEnd')}
            </h1>
            <p className="text-base text-[#d4af37]/90 max-w-2xl mx-auto leading-relaxed mb-10 font-serif">
              {t('home.description')}
            </p>
          </motion.div>

          {/* Elegant CTA buttons */}
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
                  className="px-10 py-4 bg-gradient-to-r from-[#d4af37] to-[#f4cf57] text-[#1a1208] font-semibold text-sm tracking-widest border border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-serif"
              >
                {t('common.services')}
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 border-2 border-[#d4af37]/50 text-[#d4af37] font-semibold text-sm tracking-widest hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all font-serif"
              >
                {t('common.contact')}
              </motion.button>
            </Link>
          </motion.div>

          {/* Elegant decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
            <div className="w-2 h-2 border border-[#d4af37] rotate-45" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 px-4 border-t border-[#d4af37]/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs text-[#d4af37]/70 tracking-[0.5em] mb-6 font-serif">
              ─── SERVICES ───
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-[#d4af37] mb-4 font-serif">
              WORK DIRECTIONS
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
                  whileHover={{ y: -8, borderColor: '#d4af37' }}
                  className="group p-8 border border-[#d4af37]/20 bg-gradient-to-br from-[#2a1f0f]/50 to-[#1a1208]/50 hover:from-[#3d2815]/70 hover:to-[#2a1f0f]/70 transition-all cursor-pointer backdrop-blur-sm"
                >
                  <div className="text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-base font-semibold text-[#d4af37] tracking-wider mb-3 font-serif">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#d4af37]/70 leading-relaxed font-serif">
                    {service.desc}
                  </p>
                  <div className="mt-6 text-xs text-[#d4af37]/50 flex items-center gap-2 group-hover:text-[#d4af37]/70 transition-colors font-serif">
                    {t('services.more')} <ChevronRight size={12} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#d4af37]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#d4af37]/60 font-serif">
            © 2024 FRACTALIX.LAB — DIGITAL LABORATORY
          </div>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-sm text-[#d4af37]/60 hover:text-[#d4af37] transition-colors font-serif"
            >
              VIEW ALL DESIGNS
            </motion.button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

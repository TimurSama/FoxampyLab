"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Layers, Rocket, Code, Palette, TrendingUp, FileText, Film, ChevronRight } from 'lucide-react';
import NeonRain from '@/components/variants/NeonRain';

export default function VariantD() {
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
    { icon: <Layers size={24} />, name: 'ECOSYSTEMS', desc: 'Comprehensive project development' },
    { icon: <Code size={24} />, name: 'WEB/APP', desc: 'Websites, SPAs, mobile applications' },
    { icon: <Rocket size={24} />, name: 'BLOCKCHAIN', desc: 'Smart contracts, dApps, Web3' },
    { icon: <Palette size={24} />, name: 'DESIGN', desc: 'UI/UX, branding, identity' },
    { icon: <TrendingUp size={24} />, name: 'MARKETING', desc: 'Promotion, SMM, content' },
    { icon: <FileText size={24} />, name: 'DOCUMENTS', desc: 'Whitepaper, business plan' },
    { icon: <Film size={24} />, name: 'VIDEO', desc: 'Production, motion design' },
  ];

  const neonSigns = ['SERVICES', 'CONTACT', 'LAB', 'DIGITAL', 'FUTURE'];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#0a0a1a] text-white overflow-hidden"
      style={{ fontFamily: 'sans-serif' }}
    >
      <NeonRain />
      
      {/* Neon cityscape silhouette */}
      <div className="fixed bottom-0 left-0 right-0 h-64 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <polygon points="0,200 50,150 100,180 150,120 200,160 250,100 300,140 350,90 400,130 450,80 500,120 550,70 600,110 650,60 700,100 750,50 800,90 850,40 900,80 950,30 1000,70 1000,200" fill="#ff006e" opacity="0.3" />
        </svg>
      </div>

      {/* Glitch effect overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          background: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,110,0.1) 2px, rgba(255,0,110,0.1) 4px)
          `
        }} />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#ff006e]/30 bg-[#0a0a1a]/80 backdrop-blur-md"
      >
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="text-sm tracking-wider text-white cursor-pointer hover:text-[#ff006e] transition-colors font-bold"
              style={{ 
                textShadow: '0 0 10px rgba(255,0,110,0.5)',
                letterSpacing: '0.2em'
              }}
            >
              ◈ FRACTALIX.LAB
            </motion.div>
          </Link>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 border border-[#ff006e]/50 text-[#ff006e] text-xs tracking-wider hover:border-[#ff006e] hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] transition-all font-bold"
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
            className="mb-8"
          >
            <div className="text-xs text-[#ff006e]/70 tracking-[0.5em] mb-6 font-bold uppercase">
              ─── DIGITAL LABORATORY ───
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight uppercase tracking-tight"
              style={{ 
                textShadow: '0 0 30px rgba(255,0,110,0.8), 0 0 60px rgba(131,56,236,0.6)',
                background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              CREATING
              <br />
              DIGITAL
              <br />
              UNIVERSES
            </h1>
            <p className="text-base text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
              An interdisciplinary laboratory where technology, design, and business converge.
              <br />
              <span className="text-[#ff006e]/80">We don't just develop—we research, experiment, and create solutions.</span>
            </p>
          </motion.div>

          {/* Neon CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,0,110,0.6)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-[#ff006e] text-white font-bold text-sm tracking-wider border-2 border-[#ff006e] hover:bg-[#ff3385] transition-all uppercase"
                style={{ boxShadow: '0 0 20px rgba(255,0,110,0.4)' }}
              >
                SERVICES
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(131,56,236,0.6)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 border-2 border-[#8338ec] text-[#8338ec] font-bold text-sm tracking-wider hover:bg-[#8338ec]/20 transition-all uppercase"
                style={{ boxShadow: '0 0 20px rgba(131,56,236,0.3)' }}
              >
                CONTACT
              </motion.button>
            </Link>
          </motion.div>

          {/* Neon signs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6"
          >
            {neonSigns.map((sign, i) => (
              <motion.div
                key={sign}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="px-4 py-2 border border-[#ff006e]/30 text-[#ff006e] text-xs font-bold uppercase tracking-wider"
                style={{ 
                  boxShadow: '0 0 10px rgba(255,0,110,0.3)',
                  textShadow: '0 0 10px rgba(255,0,110,0.5)'
                }}
              >
                {sign}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 px-4 border-t border-[#ff006e]/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs text-[#ff006e]/70 tracking-[0.5em] mb-6 font-bold uppercase">
              ─── SERVICES ───
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight"
              style={{ textShadow: '0 0 20px rgba(255,0,110,0.5)' }}
            >
              WORK DIRECTIONS
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
                  whileHover={{ 
                    borderColor: '#ff006e', 
                    boxShadow: '0 0 30px rgba(255,0,110,0.3)',
                    y: -4
                  }}
                  className="group p-6 border border-[#ff006e]/20 bg-[#0a0a1a]/50 hover:bg-[#0a0a1a]/80 transition-all cursor-pointer backdrop-blur-sm"
                >
                  <div className="text-[#ff006e]/60 group-hover:text-[#ff006e] transition-colors mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wider mb-2 uppercase">
                    {service.name}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="mt-4 text-[10px] text-[#ff006e]/50 flex items-center gap-1 group-hover:text-[#ff006e] transition-colors font-bold uppercase">
                    MORE <ChevronRight size={10} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#ff006e]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/60 font-bold uppercase">
            © 2024 FRACTALIX.LAB — DIGITAL LABORATORY
          </div>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-xs text-[#ff006e]/60 hover:text-[#ff006e] transition-colors font-bold uppercase"
            >
              VIEW ALL DESIGNS
            </motion.button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

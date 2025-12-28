"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Layers, Rocket, Code, Palette, TrendingUp, FileText, Film, ChevronRight } from 'lucide-react';

export default function VariantC() {
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

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#0a0500] text-[#8b0000] overflow-hidden"
      style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}
    >
      {/* Dark aggressive patterns */}
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139,0,0,0.1) 2px, rgba(139,0,0,0.1) 4px),
          repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(139,0,0,0.1) 2px, rgba(139,0,0,0.1) 4px)
        `,
        backgroundSize: '40px 40px'
      }} />

      {/* Sharp geometric shapes */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 20,0 0,20" fill="#8b0000" opacity="0.2" />
          <polygon points="100,0 80,0 100,20" fill="#8b0000" opacity="0.2" />
          <polygon points="0,100 20,100 0,80" fill="#8b0000" opacity="0.2" />
          <polygon points="100,100 80,100 100,80" fill="#8b0000" opacity="0.2" />
        </svg>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b-2 border-[#8b0000]/40 bg-[#0a0500]/95 backdrop-blur-sm"
      >
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="text-base tracking-tight text-[#8b0000] cursor-pointer hover:text-[#cc0000] transition-colors font-bold"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              ◈ FRACTALIX.LAB
            </motion.div>
          </Link>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              className="px-4 py-2 border-2 border-[#8b0000]/60 text-[#8b0000] text-xs tracking-tight hover:border-[#cc0000] hover:text-[#cc0000] transition-all font-bold uppercase"
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
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-xs text-[#8b0000]/70 tracking-[0.3em] mb-6 font-bold uppercase">
              ─── DIGITAL LABORATORY ───
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-[#8b0000] leading-tight uppercase tracking-tight">
              CREATING
              <br />
              <span className="text-[#cc0000] drop-shadow-[0_0_20px_rgba(204,0,0,0.5)]">DIGITAL</span>
              <br />
              UNIVERSES
            </h1>
            <p className="text-base text-[#8b0000]/90 max-w-2xl mx-auto leading-tight mb-10 font-bold">
              An interdisciplinary laboratory where technology, design, and business converge.
              <br />
              <span className="text-[#8b0000]/70">We don't just develop—we research, experiment, and create solutions.</span>
            </p>
          </motion.div>

          {/* Aggressive CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05, x: 4, boxShadow: '0 0 30px rgba(139,0,0,0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-[#8b0000] text-white font-black text-sm tracking-tight border-2 border-[#cc0000] hover:bg-[#cc0000] transition-all uppercase"
              >
                SERVICES
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 border-2 border-[#8b0000] text-[#8b0000] font-black text-sm tracking-tight hover:border-[#cc0000] hover:text-[#cc0000] hover:bg-[#8b0000]/10 transition-all uppercase"
              >
                CONTACT
              </motion.button>
            </Link>
          </motion.div>

          {/* Sharp decorative element */}
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center justify-center gap-2"
          >
            <div className="w-16 h-1 bg-[#8b0000]" />
            <div className="w-4 h-4 border-2 border-[#8b0000] rotate-45" />
            <div className="w-16 h-1 bg-[#8b0000]" />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 px-4 border-t-2 border-[#8b0000]/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs text-[#8b0000]/70 tracking-[0.3em] mb-6 font-bold uppercase">
              ─── SERVICES ───
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#8b0000] mb-4 uppercase tracking-tight">
              WORK DIRECTIONS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <Link key={service.name} href="/services">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 4, borderColor: '#cc0000', boxShadow: '0 0 20px rgba(139,0,0,0.3)' }}
                  className="group p-6 border-2 border-[#8b0000]/30 bg-[#0a0500] hover:bg-[#1a0a00] transition-all cursor-pointer"
                >
                  <div className="text-[#8b0000]/60 group-hover:text-[#cc0000] transition-colors mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-sm font-black text-[#8b0000] tracking-tight mb-2 uppercase">
                    {service.name}
                  </h3>
                  <p className="text-xs text-[#8b0000]/70 leading-tight font-bold">
                    {service.desc}
                  </p>
                  <div className="mt-4 text-[10px] text-[#8b0000]/50 flex items-center gap-1 group-hover:text-[#cc0000] transition-colors font-bold uppercase">
                    MORE <ChevronRight size={10} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-2 border-[#8b0000]/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8b0000]/60 font-bold uppercase">
            © 2024 FRACTALIX.LAB — DIGITAL LABORATORY
          </div>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              className="text-xs text-[#8b0000]/60 hover:text-[#cc0000] transition-colors font-bold uppercase"
            >
              VIEW ALL DESIGNS
            </motion.button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

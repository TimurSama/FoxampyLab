"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Layers, Rocket, Code, Palette, TrendingUp, FileText, Film, ChevronRight } from 'lucide-react';

export default function VariantE() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState('CREATING');
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

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const original = 'CREATING';
        const glitched = original.split('').map((char, i) => {
          if (Math.random() > 0.8) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return char;
        }).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(original), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
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

  const colors = ['#00ff41', '#ff006e', '#00f5ff', '#ffbe0b', '#8338ec'];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
      style={{ fontFamily: 'monospace' }}
    >
      {/* Chaotic grid overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
        transform: `rotate(${mousePos.x * 2}deg)`
      }} />

      {/* Colorful glitch lines */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-1"
            style={{
              top: `${20 + i * 15}%`,
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              opacity: 0.3
            }}
            animate={{
              x: [0, 100, -100, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 border-b-2 border-[#00ff41]/30 bg-black/80 backdrop-blur-sm"
      >
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="text-sm tracking-wider text-[#00ff41] cursor-pointer hover:text-[#00f5ff] transition-colors font-bold"
              style={{ 
                textShadow: '0 0 10px rgba(0,255,65,0.5)',
                letterSpacing: '0.2em'
              }}
            >
              ◈ FRACTALIX.LAB
            </motion.div>
          </Link>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 border-2 border-[#00ff41]/50 text-[#00ff41] text-xs tracking-wider hover:border-[#00f5ff] hover:text-[#00f5ff] transition-all font-bold"
              style={{ boxShadow: '0 0 10px rgba(0,255,65,0.3)' }}
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
            <div className="text-xs text-[#00ff41]/70 tracking-[0.5em] mb-6 font-bold uppercase">
              ─── DIGITAL LABORATORY ───
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight uppercase tracking-tight relative">
              <motion.span
                className="block text-[#00ff41]"
                style={{ textShadow: '0 0 30px rgba(0,255,65,0.8)' }}
                animate={{
                  textShadow: [
                    '0 0 30px rgba(0,255,65,0.8)',
                    '0 0 40px rgba(0,245,255,0.8)',
                    '0 0 30px rgba(0,255,65,0.8)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {glitchText}
              </motion.span>
              <motion.span
                className="block text-[#00f5ff]"
                style={{ textShadow: '0 0 30px rgba(0,245,255,0.8)' }}
              >
                DIGITAL
              </motion.span>
              <motion.span
                className="block text-[#ff006e]"
                style={{ textShadow: '0 0 30px rgba(255,0,110,0.8)' }}
              >
                UNIVERSES
              </motion.span>
            </h1>
            <p className="text-base text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
              An interdisciplinary laboratory where technology, design, and business converge.
              <br />
              <span className="text-[#00ff41]/80">We don't just develop—we research, experiment, and create solutions.</span>
            </p>
          </motion.div>

          {/* Chaotic CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0], boxShadow: '0 0 30px rgba(0,255,65,0.6)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-[#00ff41] text-black font-black text-sm tracking-wider border-2 border-[#00ff41] hover:bg-[#00f5ff] hover:border-[#00f5ff] transition-all uppercase relative overflow-hidden"
                style={{ boxShadow: '0 0 20px rgba(0,255,65,0.4)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
                <span className="relative">SERVICES</span>
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0], boxShadow: '0 0 30px rgba(255,0,110,0.6)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 border-2 border-[#ff006e] text-[#ff006e] font-black text-sm tracking-wider hover:bg-[#ff006e]/20 transition-all uppercase"
                style={{ boxShadow: '0 0 20px rgba(255,0,110,0.3)' }}
              >
                CONTACT
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 px-4 border-t-2 border-[#00ff41]/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs text-[#00ff41]/70 tracking-[0.5em] mb-6 font-bold uppercase">
              ─── SERVICES ───
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight"
              style={{ textShadow: '0 0 20px rgba(0,255,65,0.5)' }}
            >
              WORK DIRECTIONS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((service, i) => {
              const color = colors[i % colors.length];
              return (
                <Link key={service.name} href="/services">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ 
                      borderColor: color, 
                      boxShadow: `0 0 30px ${color}40`,
                      y: -4,
                      rotate: [0, -1, 1, 0]
                    }}
                    className="group p-6 border-2 border-white/10 bg-black/50 hover:bg-black/80 transition-all cursor-pointer"
                    style={{ borderColor: `${color}30` }}
                  >
                    <div className={`text-${color}/60 group-hover:text-${color} transition-colors mb-4`} style={{ color: `${color}60` }}>
                      {service.icon}
                    </div>
                    <h3 className="text-sm font-black text-white tracking-wider mb-2 uppercase">
                      {service.name}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {service.desc}
                    </p>
                    <div className="mt-4 text-[10px] flex items-center gap-1 group-hover:opacity-100 transition-colors font-bold uppercase" style={{ color: `${color}50` }}>
                      MORE <ChevronRight size={10} />
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-2 border-[#00ff41]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/60 font-bold uppercase">
            © 2024 FRACTALIX.LAB — DIGITAL LABORATORY
          </div>
          <Link href="/vote">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-xs text-[#00ff41]/60 hover:text-[#00ff41] transition-colors font-bold uppercase"
            >
              VIEW ALL DESIGNS
            </motion.button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

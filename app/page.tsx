"use client";

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import ZAxisController from '@/components/navigation/ZAxisController';
import TheNexus from '@/components/scenes/TheNexus';
import SynergeticSolutions from '@/components/scenes/SynergeticSolutions';
import BootSequence from '@/components/boot/BootSequence';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Новая главная страница с 4D-навигацией
 * Z-axis камера управляется скроллом через GSAP ScrollTrigger
 */
export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Настройка ScrollTrigger для переключения секций
  useEffect(() => {
    if (!containerRef.current || isBooting) return;

    const sections = sectionsRef.current;
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCurrentSection(index),
        onEnterBack: () => setCurrentSection(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isBooting]);

  const sections = [
    {
      id: 'nexus',
      title: 'THE NEXUS',
      subtitle: 'FOXAMPY LAB: MULTIDISCIPLINARY SYNTHESIS',
      description: 'Проектируем будущее на стыке IT-архитектуры, физических пространств и цифровых активов.',
      cta: 'Enter the Layer_01',
      component: <TheNexus />,
    },
    {
      id: 'solutions',
      title: 'SYNERGETIC SOLUTIONS',
      subtitle: 'Мультидисциплинарный синтез',
      description: 'Сплетение 4D-потоков. Сферы (IT, Architecture, Fashion) представлены как пересекающиеся энергетические слои.',
      component: <SynergeticSolutions />,
    },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-x-hidden"
    >
      {/* Boot sequence overlay */}
      <AnimatePresence>
        {isBooting && <BootSequence />}
      </AnimatePresence>

      {/* Header */}
      <Header />

      {/* Main 3D Canvas - фиксированный фон */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000FF" />
          
          {/* Z-axis controller для глубины */}
          <ZAxisController sections={sections.length} depth={30} />
          
          {/* 3D Scenes - переключаются в зависимости от секции */}
          <Suspense fallback={null}>
            {currentSection === 0 && <TheNexus />}
            {currentSection === 1 && <SynergeticSolutions />}
          </Suspense>

          {/* Environment для отражений */}
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el;
          }}
          className="relative z-10 min-h-screen flex items-center justify-center"
          style={{ 
            opacity: isBooting ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="font-mono text-[10px] text-[#00F0FF] tracking-[0.5em] mb-6">
              ─── {section.title} ───
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-light tracking-tight text-[#E0E0E0] mb-6">
              {section.subtitle}
            </h1>
            
            <p className="font-mono text-base md:text-lg text-[#E0E0E0]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              {section.description}
            </p>

            {section.cta && (
              <Link href="/services">
                <button className="px-8 py-4 bg-[#00F0FF] text-[#050505] font-mono text-sm tracking-widest
                                 flex items-center gap-3 mx-auto transition-all hover:bg-[#00F0FF]/80">
                  {section.cta}
                  <ArrowRight size={16} />
                </button>
              </Link>
            )}
          </div>
        </section>
      ))}

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="font-mono text-[9px] text-[#00F0FF]/60 tracking-widest animate-pulse">
          SCROLL TO EXPLORE
        </div>
      </div>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-[#00F0FF]/20 pointer-events-none z-20" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-[#00F0FF]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-[#00F0FF]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-[#00F0FF]/20 pointer-events-none z-20" />
    </div>
  );
}

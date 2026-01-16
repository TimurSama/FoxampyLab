"use client";

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import ZAxisController from '@/components/navigation/ZAxisController';
import TheNexus from '@/components/scenes/TheNexus';
import SynergeticSolutions from '@/components/scenes/SynergeticSolutions';
import VentureTerminal from '@/components/scenes/VentureTerminal';
import BootSequence from '@/components/boot/BootSequence';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServicesDetailModal from '@/components/sections/ServicesDetailModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Новая главная страница с 4D-навигацией
 * Z-axis камера управляется скроллом через GSAP ScrollTrigger
 */
// Данные о 6 направлениях работы
const servicesData = [
  {
    id: 'business',
    title: 'STRATEGIC GENESIS & VENTURE LOGIC',
    subtitle: 'Business Strategic Architecture',
    description: 'Проектирование фундаментов бизнеса. Мы переводим хаос идей в строгую документарную форму: от создания Vision & Mission до детальных White Papers и инвестиционных меморандумов. Разработка токеномики и экономических моделей, устойчивых к рыночной энтропии.',
    features: [
      'Vision & Mission разработка',
      'White Papers и Litepapers',
      'Инвестиционные меморандумы',
      'Токеномика и экономические модели',
      'Бизнес-планирование',
      'Стратегическое консультирование',
    ],
    color: '#00F0FF',
  },
  {
    id: 'it',
    title: 'DIGITAL CORE & ECOSYSTEM DEVELOPMENT',
    subtitle: 'IT Ecosystem Engineering',
    description: 'Создание технологического ДНК продукта. Разработка концепций и реализация сложных IT-экосистем: масштабируемые платформы, AI-интеграции и блокчейн-решения. Мы строим не просто код, а архитектуру, готовую к бесконечной трансформации.',
    features: [
      'Архитектура экосистем',
      'Блокчейн разработка',
      'AI/ML интеграции',
      'Масштабируемые платформы',
      'Микросервисная архитектура',
      'API и интеграции',
    ],
    color: '#7000FF',
  },
  {
    id: 'branding',
    title: 'COGNITIVE BRANDING & VISUAL SYSTEMS',
    subtitle: 'Identity & Sensory Branding',
    description: 'Синтез восприятия и эстетики. Мы создаем бренды как живые организмы с уникальным кодом айдентики. Глубокий дизайн-анализ, разработка смысловых полей и маркетинговых стратегий, которые резонируют на уровне подсознания.',
    features: [
      'Бренд-стратегия',
      'Визуальная идентичность',
      'Дизайн-системы',
      'Маркетинговые стратегии',
      'Контент-стратегия',
      'Digital маркетинг',
    ],
    color: '#00F0FF',
  },
  {
    id: 'spatial',
    title: 'PARAMETRIC FASHION & ARCHITECTURE',
    subtitle: 'Spatial Form & Wearable Art',
    description: 'Стирание границ между телом и пространством. Мы объединяем методы параметрического проектирования зданий с авангардным дизайном одежды. Создание цифровых двойников, 3D-прототипирование и концептуальные решения для физических миров.',
    features: [
      'Параметрический дизайн',
      'Архитектурное проектирование',
      'Fashion дизайн',
      '3D прототипирование',
      'Цифровые двойники',
      'Концептуальные решения',
    ],
    color: '#7000FF',
  },
  {
    id: 'cinema',
    title: 'TEMPORAL NARRATIVE & VISUAL FX',
    subtitle: 'Cinematic Synthesis & Motion',
    description: 'Трансляция смыслов через визуальный опыт. Продакшн будущего: от концептуального сторителлинга до сложного CGI и видео-арта. Мы создаем визуальные миры, которые погружают зрителя в 4D-пространство и диктуют новые эстетические нормы.',
    features: [
      'Видео продакшн',
      'CGI и визуальные эффекты',
      'Motion design',
      'Концептуальный сторителлинг',
      '3D анимация',
      'Постпродакшн',
    ],
    color: '#00F0FF',
  },
  {
    id: 'rd',
    title: 'APPLIED PHYSICS & ENGINEERING RESEARCH',
    subtitle: 'Frontiers of R&D',
    description: 'Лаборатория фундаментальных инноваций. Глубокие исследования на стыке инженерии и прикладной науки. Разработка патентоспособных технологий, прототипирование новых материалов и поиск нестандартных инженерных решений для глобальных вызовов.',
    features: [
      'Научные исследования',
      'Инженерные разработки',
      'Прототипирование',
      'Патентование технологий',
      'Прикладная физика',
      'Материаловедение',
    ],
    color: '#7000FF',
  },
];

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      services: servicesData,
    },
    {
      id: 'ventures',
      title: 'VENTURE TERMINAL',
      subtitle: 'Инвестиционные возможности',
      description: 'Портфолио проектов и стартапов с высоким потенциалом роста. От блокчейн-решений до AI-платформ.',
      component: <VentureTerminal />,
      cta: 'View Projects',
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
            {currentSection === 2 && <VentureTerminal />}
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
              <Link href={section.cta === 'Enter the Layer_01' ? '/services' : '/ventures'}>
                <button className="px-8 py-4 bg-[#00F0FF] text-[#050505] font-mono text-sm tracking-widest
                                 flex items-center gap-3 mx-auto transition-all hover:bg-[#00F0FF]/80">
                  {section.cta}
                  <ArrowRight size={16} />
                </button>
              </Link>
            )}

            {/* Services Grid для секции Solutions */}
            {section.id === 'solutions' && section.services && (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                {section.services.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      setSelectedService(service);
                      setIsModalOpen(true);
                    }}
                    className="border border-[#00F0FF]/20 bg-[#050505]/50 hover:border-[#00F0FF]/50 
                             hover:bg-[#00F0FF]/5 transition-all cursor-pointer p-6 group"
                  >
                    <div style={{ color: service.color }} className="mb-4">
                      <div className="w-10 h-10 border border-current flex items-center justify-center">
                        <span className="font-mono text-xs">◈</span>
                      </div>
                    </div>
                    <h3 className="font-mono text-lg text-[#E0E0E0] mb-2 group-hover:text-[#00F0FF] transition-colors">
                      {service.subtitle}
                    </h3>
                    <p className="font-mono text-xs text-[#E0E0E0]/60 mb-4 leading-relaxed">
                      {service.description.substring(0, 120)}...
                    </p>
                    <div className="font-mono text-[10px] text-[#00F0FF] tracking-wider">
                      CLICK FOR DETAILS →
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Projects Grid для секции Ventures */}
            {section.id === 'ventures' && (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { name: 'Civilization Protocol', progress: 22, status: 'Active', color: '#00F0FF' },
                  { name: 'TradePlus', progress: 25, status: 'Active', color: '#7000FF' },
                  { name: 'Dogymorbios', progress: 13, status: 'Pilot', color: '#00F0FF' },
                  { name: 'NexusVita', progress: 19, status: 'Active', color: '#7000FF' },
                ].map((project, idx) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border border-[#00F0FF]/20 bg-[#050505]/50 hover:border-[#00F0FF]/50 
                             hover:bg-[#00F0FF]/5 transition-all p-6 group backdrop-blur-sm"
                    style={{ 
                      background: `linear-gradient(135deg, ${project.color}05 0%, transparent 100%)`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-mono text-xl text-[#E0E0E0] group-hover:text-[#00F0FF] transition-colors">
                        {project.name}
                      </h3>
                      <span className="font-mono text-xs text-[#00F0FF] border border-[#00F0FF]/30 px-2 py-1">
                        {project.status}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#E0E0E0]/60">Progress</span>
                        <span className="font-mono text-xs text-[#00F0FF]">{project.progress}%</span>
                      </div>
                      <div className="h-1 bg-[#00F0FF]/10 border border-[#00F0FF]/20 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                          className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF]"
                        />
                      </div>
                    </div>
                    <Link href="/hub">
                      <div className="font-mono text-[10px] text-[#00F0FF] tracking-wider mt-4 hover:underline">
                        VIEW PROJECT →
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
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

      {/* Services Detail Modal */}
      <ServicesDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

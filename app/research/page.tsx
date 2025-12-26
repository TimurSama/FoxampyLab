"use client";

import { motion } from 'framer-motion';
import { 
  Atom, 
  Brain, 
  Dna, 
  Cpu, 
  Microscope,
  Lightbulb,
  Rocket,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Network,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import FanMenu from '@/components/layout/FanMenu';
import TerrainGrid from '@/components/visuals/TerrainGrid';

const researchAreas = [
  {
    id: 'ai-ml',
    icon: <Brain size={32} />,
    title: 'AI & Machine Learning',
    subtitle: 'Искусственный интеллект',
    description: 'Разработка и интеграция AI-решений. Генеративные модели, компьютерное зрение, NLP.',
    projects: ['AI-ассистенты', 'Предиктивная аналитика', 'Автоматизация процессов'],
    status: 'ACTIVE',
    progress: 78
  },
  {
    id: 'blockchain-research',
    icon: <Network size={32} />,
    title: 'Blockchain & DLT',
    subtitle: 'Распределённые системы',
    description: 'Исследование новых консенсус-механизмов, Layer 2 решений, кроссчейн протоколов.',
    projects: ['Zero-knowledge proofs', 'DeFi протоколы', 'DAO governance'],
    status: 'ACTIVE',
    progress: 65
  },
  {
    id: 'spatial-computing',
    icon: <Atom size={32} />,
    title: 'Spatial Computing',
    subtitle: 'Пространственные вычисления',
    description: 'AR/VR/XR интерфейсы. Метавселенные. Цифровые двойники.',
    projects: ['VR интерфейсы', 'AR навигация', 'Digital twins'],
    status: 'RESEARCH',
    progress: 45
  },
  {
    id: 'generative',
    icon: <Sparkles size={32} />,
    title: 'Generative Systems',
    subtitle: 'Генеративные системы',
    description: 'Процедурная генерация контента. Эволюционные алгоритмы. Творческие AI.',
    projects: ['Генеративный арт', 'Процедурный дизайн', 'Музыкальный AI'],
    status: 'EXPERIMENTAL',
    progress: 35
  },
  {
    id: 'data-viz',
    icon: <Microscope size={32} />,
    title: 'Data Visualization',
    subtitle: 'Визуализация данных',
    description: 'Интерактивные дашборды. 3D визуализации. Realtime аналитика.',
    projects: ['Финансовые дашборды', 'Геоаналитика', 'Научная визуализация'],
    status: 'ACTIVE',
    progress: 85
  },
  {
    id: 'biotech',
    icon: <Dna size={32} />,
    title: 'BioTech Interface',
    subtitle: 'Биотех интерфейсы',
    description: 'Интерфейсы для биотех компаний. Визуализация научных данных.',
    projects: ['Lab информационные системы', 'Визуализация молекул', 'Health tech'],
    status: 'RESEARCH',
    progress: 25
  }
];

const publications = [
  {
    title: 'Фрактальные паттерны в UI дизайне',
    type: 'RESEARCH PAPER',
    date: '2024.12'
  },
  {
    title: 'Оптимизация UX в DeFi приложениях',
    type: 'CASE STUDY',
    date: '2024.11'
  },
  {
    title: 'Generative Art: от алгоритма к эстетике',
    type: 'ARTICLE',
    date: '2024.10'
  }
];

export default function ResearchPage() {
  return (
    <div className="relative min-h-screen bg-ink-deep">
      {/* Background */}
      <div className="fixed inset-0 oil-shimmer opacity-30 pointer-events-none" />
      <div className="fixed inset-0 wireframe-grid pointer-events-none" />
      
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-stone-anthracite/30 mb-6">
                <FlaskConical size={14} className="text-engrave-dim" />
                <span className="font-mono text-[10px] text-stone-slate tracking-widest">
                  RESEARCH & DEVELOPMENT
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                НАУЧНЫЕ ИССЛЕДОВАНИЯ
                <br />
                <span className="text-chrome">И РАЗРАБОТКИ</span>
              </h1>
              
              <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto leading-relaxed">
                Мы не просто выполняем проекты — мы исследуем новые технологии,
                разрабатываем инновационные методологии и делимся знаниями с сообществом.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { value: '6', label: 'Направлений R&D' },
                { value: '15+', label: 'Публикаций' },
                { value: '3', label: 'Патента' },
                { value: '12', label: 'Исследователей' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center p-4 border border-stone-anthracite/20"
                >
                  <div className="font-mono text-2xl text-engrave-fresco mb-1">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] text-stone-slate tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-8">
              ─── RESEARCH AREAS ───
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {researchAreas.map((area, i) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group p-6 border border-stone-anthracite/30 bg-ink-chrome/30 
                           hover:border-engrave-line/20 transition-all cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-stone-slate group-hover:text-engrave-line transition-colors">
                      {area.icon}
                    </div>
                    <span className={`font-mono text-[8px] px-2 py-1 border ${
                      area.status === 'ACTIVE' 
                        ? 'text-engrave-line border-engrave-line/30 bg-engrave-line/5'
                        : area.status === 'RESEARCH'
                        ? 'text-engrave-mid border-engrave-mid/30 bg-engrave-mid/5'
                        : 'text-stone-slate border-stone-anthracite/30'
                    }`}>
                      {area.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-base text-engrave-fresco mb-1">
                    {area.title}
                  </h3>
                  <div className="font-mono text-[10px] text-stone-slate tracking-wider mb-3">
                    {area.subtitle}
                  </div>

                  {/* Description */}
                  <p className="font-mono text-[11px] text-stone-slate leading-relaxed mb-4">
                    {area.description}
                  </p>

                  {/* Projects */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {area.projects.map((project, j) => (
                      <span 
                        key={j}
                        className="font-mono text-[9px] text-stone-slate px-2 py-1 
                                 bg-stone-anthracite/20 border border-stone-anthracite/30"
                      >
                        {project}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-stone-anthracite/30 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${area.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-engrave-line/50"
                      />
                    </div>
                    <span className="font-mono text-[9px] text-stone-slate">
                      {area.progress}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visualization */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="h-[300px] relative border border-stone-anthracite/20">
              <TerrainGrid className="w-full h-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-ink-deep/80 px-8 py-6 border border-stone-anthracite/30">
                  <div className="font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                    DATA LANDSCAPE
                  </div>
                  <div className="font-mono text-lg text-engrave-fresco">
                    Визуализация исследовательских данных
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em]">
                ─── PUBLICATIONS ───
              </div>
              <Link href="/research/publications" className="font-mono text-[10px] text-engrave-line 
                        hover:text-engrave-fresco transition-colors flex items-center gap-2">
                ВСЕ ПУБЛИКАЦИИ <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {publications.map((pub, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-center justify-between p-4 border border-stone-anthracite/30 
                           hover:border-engrave-line/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <BookOpen size={16} className="text-stone-slate group-hover:text-engrave-line transition-colors" />
                    <div>
                      <div className="font-mono text-sm text-engrave-fresco group-hover:text-white transition-colors">
                        {pub.title}
                      </div>
                      <div className="font-mono text-[9px] text-stone-slate">
                        {pub.type}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-stone-slate">
                    {pub.date}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 border border-stone-anthracite/30 bg-ink-chrome/20"
            >
              <Lightbulb size={32} className="text-engrave-line mx-auto mb-4" />
              <h2 className="font-mono text-2xl md:text-3xl text-engrave-fresco mb-4">
                ЕСТЬ ИССЛЕДОВАТЕЛЬСКАЯ ИДЕЯ?
              </h2>
              <p className="font-mono text-sm text-stone-slate max-w-xl mx-auto mb-8">
                Мы открыты для коллабораций с университетами, научными институтами
                и независимыми исследователями.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
                >
                  ПРЕДЛОЖИТЬ КОЛЛАБОРАЦИЮ
                </motion.button>
                <Link href="/join">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 border border-stone-anthracite text-engrave-line font-mono text-sm tracking-widest"
                  >
                    ПРИСОЕДИНИТЬСЯ К R&D
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <FanMenu />
      
      {/* Corner decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-stone-anthracite/20 pointer-events-none" />
    </div>
  );
}

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
import TerrainGrid from '@/components/visuals/TerrainGrid';
import { useI18n } from '@/lib/i18n/context';

export default function ResearchPage() {
  const { t } = useI18n();

  const researchAreas = [
    {
      id: 'ai-ml',
      icon: <Brain size={32} />,
      title: t('research.areas.ai.title'),
      subtitle: t('research.areas.ai.subtitle'),
      description: t('research.areas.ai.desc'),
      projects: String(t('research.areas.ai.projects')).split(','),
      status: 'ACTIVE',
      progress: 78
    },
    {
      id: 'blockchain-research',
      icon: <Network size={32} />,
      title: t('research.areas.blockchain.title'),
      subtitle: t('research.areas.blockchain.subtitle'),
      description: t('research.areas.blockchain.desc'),
      projects: String(t('research.areas.blockchain.projects')).split(','),
      status: 'ACTIVE',
      progress: 65
    },
    {
      id: 'spatial-computing',
      icon: <Atom size={32} />,
      title: t('research.areas.spatial.title'),
      subtitle: t('research.areas.spatial.subtitle'),
      description: t('research.areas.spatial.desc'),
      projects: String(t('research.areas.spatial.projects')).split(','),
      status: 'RESEARCH',
      progress: 45
    },
    {
      id: 'generative',
      icon: <Sparkles size={32} />,
      title: t('research.areas.generative.title'),
      subtitle: t('research.areas.generative.subtitle'),
      description: t('research.areas.generative.desc'),
      projects: String(t('research.areas.generative.projects')).split(','),
      status: 'EXPERIMENTAL',
      progress: 35
    },
    {
      id: 'data-viz',
      icon: <Microscope size={32} />,
      title: t('research.areas.viz.title'),
      subtitle: t('research.areas.viz.subtitle'),
      description: t('research.areas.viz.desc'),
      projects: String(t('research.areas.viz.projects')).split(','),
      status: 'ACTIVE',
      progress: 85
    },
    {
      id: 'biotech',
      icon: <Dna size={32} />,
      title: t('research.areas.biotech.title'),
      subtitle: t('research.areas.biotech.subtitle'),
      description: t('research.areas.biotech.desc'),
      projects: String(t('research.areas.biotech.projects')).split(','),
      status: 'RESEARCH',
      progress: 25
    }
  ];

  const publications = [
    {
      title: 'Fractal patterns in UI design',
      type: 'RESEARCH PAPER',
      date: '2024.12'
    },
    {
      title: 'UX optimization in DeFi applications',
      type: 'CASE STUDY',
      date: '2024.11'
    },
    {
      title: 'Generative Art: from algorithm to aesthetics',
      type: 'ARTICLE',
      date: '2024.10'
    }
  ];
  return (
    <div className="relative min-h-screen bg-transparent">
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
                  {t('research.badge')}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                {t('research.title')}
                <br />
                <span className="text-chrome">{t('research.subtitle')}</span>
              </h1>

              <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto leading-relaxed">
                {t('research.description')}
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { value: '6', label: t('research.stats.areas') },
                { value: '15+', label: t('research.stats.publications') },
                { value: '3', label: t('research.stats.patents') },
                { value: '12', label: t('research.stats.researchers') },
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
              ─── {t('research.areas.title')} ───
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
                  className="group p-6 bg-glass-matte hover:border-white/20 transition-all cursor-pointer rounded-sm"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-stone-slate group-hover:text-engrave-line transition-colors">
                      {area.icon}
                    </div>
                    <span className={`font-mono text-[8px] px-2 py-1 border ${area.status === 'ACTIVE'
                        ? 'text-engrave-line border-engrave-line/30 bg-engrave-line/5'
                        : area.status === 'RESEARCH'
                          ? 'text-engrave-mid border-engrave-mid/30 bg-engrave-mid/5'
                          : 'text-stone-slate border-stone-anthracite/30'
                      }`}>
                      {t(`research.status.${area.status.toLowerCase()}`)}
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
                        {project.trim()}
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
                    {t('research.visualization.title')}
                  </div>
                  <div className="font-mono text-lg text-engrave-fresco">
                    {t('research.visualization.subtitle')}
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
                ─── {t('research.publications.title')} ───
              </div>
              <Link href="/research/publications" className="font-mono text-[10px] text-engrave-line 
                        hover:text-engrave-fresco transition-colors flex items-center gap-2">
                {t('research.publications.all')} <ArrowRight size={12} />
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
              className="p-8 md:p-12 bg-glass-matte rounded-sm"
            >
              <Lightbulb size={32} className="text-engrave-line mx-auto mb-4" />
              <h2 className="font-mono text-2xl md:text-3xl text-engrave-fresco mb-4">
                {t('research.collaboration.title')}
              </h2>
              <p className="font-mono text-sm text-stone-slate max-w-xl mx-auto mb-8">
                {t('research.collaboration.description')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
                >
                  {t('research.collaboration.propose')}
                </motion.button>
                <Link href="/join">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 border border-stone-anthracite text-engrave-line font-mono text-sm tracking-widest"
                  >
                    {t('research.collaboration.join')}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-stone-anthracite/20 pointer-events-none" />
    </div>
  );
}

"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Code, Palette, TrendingUp, Layers, Network, Film, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { trackCTA } from '@/lib/analytics';
import { useI18n } from '@/lib/i18n/context';

interface Case {
  id: string;
  titleKey?: string;
  categoryKey?: string;
  descriptionKey?: string;
  title?: string;
  category?: string;
  description?: string;
  technologies: string[];
  icon: React.ReactNode;
  solution: string;
  visuals: string;
}

export default function CasesPage() {
  const { t } = useI18n();
  
  const cases: Case[] = [
    {
      id: 'web3-bank',
      titleKey: 'cases.web3Bank.title',
      categoryKey: 'cases.web3Bank.category',
      descriptionKey: 'cases.web3Bank.description',
      technologies: ['Solidity', 'Web3.js', 'Everscale', 'Ethereum', 'Smart Contracts', 'Bridge Technology'],
      icon: <Layers size={24} />,
      solution: 'Концепция Web3-банкинга без чисел: сценарии мультичейн-платежей, мосты и UX без перегрузки цифрами.',
      visuals: 'Сеточные 3D-дашборды, прозрачные карты потоков транзакций, кинетические акценты при смене сети.',
    },
    {
      id: 'dao-ecology',
      titleKey: 'cases.daoEcology.title',
      categoryKey: 'cases.daoEcology.category',
      descriptionKey: 'cases.daoEcology.description',
      technologies: ['Blockchain', 'DeFi', 'AI/ML', 'Big Data', 'DAO Governance'],
      icon: <Network size={24} />,
      solution: 'Экосистема для DAO-экологии: интерфейс управления потоками данных и решений без KPI-цифр.',
      visuals: 'Органические диаграммы, мягкие цветовые градиенты для состояний DAO, микровзаимодействия голосований.',
    },
    {
      id: 'mail-services',
      titleKey: 'cases.mailServices.title',
      categoryKey: 'cases.mailServices.category',
      descriptionKey: 'cases.mailServices.description',
      technologies: ['React', 'Node.js', 'Mobile Development', 'API Integration', 'Service Management'],
      icon: <Code size={24} />,
      solution: 'Сервисная шина почтовых сервисов: модульные интерфейсы, чистая интеграционная карта без метрик.',
      visuals: 'Тонкие контуры, анимации линий API, монохромные акценты и плавные переходы состояний.',
    },
    {
      id: 'parametric-fashion',
      title: 'Параметрическая мода',
      category: 'Fashion / Digital Textile',
      description: 'Коллекция цифровой одежды с интерактивной примеркой.',
      technologies: ['CLO3D', 'Houdini', 'Blender', 'Fabric Sim', 'Parametrics'],
      icon: <Palette size={24} />,
      solution: 'Линейка цифровой моды с параметрическими паттернами и интерактивной примеркой.',
      visuals: 'Слоистые ткани, светящиеся швы, плавные деформации, ритм тканевых волн вместо чисел.',
    },
    {
      id: 'parametric-architecture',
      title: 'Параметрическая архитектура',
      category: 'Architecture / Spatial Computing',
      description: 'Павильон с интерактивной навигацией по слоям конструкций и сценариям света.',
      technologies: ['Grasshopper', 'Rhino', 'Three.js', 'Unity', 'XR'],
      icon: <TrendingUp size={24} />,
      solution: 'Параметрический павильон с интерактивной навигацией по слоям конструкций.',
      visuals: 'Нервюрные сетки, световые каналы, плавная морфология форм через WebGL.',
    },
  ];
  return (
    <div className="relative min-h-screen bg-ink-deep">
      <div className="fixed inset-0 wireframe-grid pointer-events-none" aria-hidden="true" />
      
      <Header />
      
      <main id="main-content" className="relative z-10 pt-32 pb-24" role="main">
        {/* Hero */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-6">
                ─── {t('cases.tagline')} ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                {t('cases.title')}
              </h1>
              
              <p className="font-mono text-sm md:text-base text-stone-slate max-w-2xl mx-auto leading-relaxed">
                {t('cases.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cases Grid */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem, i) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group border border-stone-anthracite/30 bg-ink-chrome/20 
                           hover:border-engrave-line/20 transition-all flex flex-col"
                >
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Icon and Category */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-stone-slate group-hover:text-engrave-line transition-colors">
                        {caseItem.icon}
                      </div>
                      <span className="font-mono text-[9px] text-stone-slate tracking-widest">
                        {caseItem.categoryKey ? t(caseItem.categoryKey) : caseItem.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-mono text-lg text-engrave-fresco mb-3">
                      {caseItem.titleKey ? t(caseItem.titleKey) : caseItem.title}
                    </h3>

                    {/* Description */}
                    <p className="font-mono text-sm text-stone-slate leading-relaxed mb-4 flex-grow">
                      {caseItem.descriptionKey ? t(caseItem.descriptionKey) : caseItem.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <p className="font-mono text-[12px] text-engrave-fresco/90 leading-relaxed">
                        {caseItem.solution}
                      </p>
                      <p className="font-mono text-[12px] text-stone-slate leading-relaxed">
                        {caseItem.visuals}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {caseItem.technologies.slice(0, 3).map((tech, j) => (
                          <span
                            key={j}
                            className="font-mono text-[9px] text-engrave-dim px-2 py-1 
                                     border border-stone-anthracite/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {caseItem.technologies.length > 3 && (
                          <span className="font-mono text-[9px] text-engrave-dim px-2 py-1">
                            +{caseItem.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Link */}
                    <div className="flex items-center gap-2 font-mono text-[10px] text-engrave-dim group-hover:text-engrave-line transition-colors mt-auto">
                      {t('cases.learnMore')} <ArrowRight size={10} />
                    </div>
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
              className="p-8 border border-stone-anthracite/30"
            >
              <h2 className="font-mono text-2xl text-engrave-fresco mb-4">
                {t('cases.ctaTitle')}
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                {t('cases.ctaDescription')}
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => trackCTA(t('cases.ctaButton'), 'Cases Page')}
                  className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
                  aria-label={t('common.contact')}
                >
                  {t('cases.ctaButton')}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
}





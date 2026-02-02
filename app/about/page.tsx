"use client";

import { motion } from 'framer-motion';
import {
  FlaskConical,
  Rocket,
  Users,
  Target,
  Lightbulb,
  Code,
  Palette,
  TrendingUp,
  Network,
  Film,
  Layers,
  Zap
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { trackCTA } from '@/lib/analytics';
import { useI18n } from '@/lib/i18n/context';

export default function AboutPage() {
  const { t } = useI18n();

  const values = [
    {
      icon: <Lightbulb size={24} />,
      titleKey: 'about.values.innovation.title',
      descriptionKey: 'about.values.innovation.description',
    },
    {
      icon: <Target size={24} />,
      titleKey: 'about.values.result.title',
      descriptionKey: 'about.values.result.description',
    },
    {
      icon: <Users size={24} />,
      titleKey: 'about.values.team.title',
      descriptionKey: 'about.values.team.description',
    },
    {
      icon: <Zap size={24} />,
      titleKey: 'about.values.speed.title',
      descriptionKey: 'about.values.speed.description',
    },
  ];

  const expertise = [
    {
      categoryKey: 'about.expertise.business.category',
      icon: <TrendingUp size={20} />,
      items: [
        'about.expertise.business.item1',
        'about.expertise.business.item2',
        'about.expertise.business.item3',
        'about.expertise.business.item4',
        'about.expertise.business.item5',
      ],
    },
    {
      categoryKey: 'about.expertise.design.category',
      icon: <Palette size={20} />,
      items: [
        'about.expertise.design.item1',
        'about.expertise.design.item2',
        'about.expertise.design.item3',
        'about.expertise.design.item4',
        'about.expertise.design.item5',
      ],
    },
    {
      categoryKey: 'about.expertise.webapp.category',
      icon: <Code size={20} />,
      items: [
        'about.expertise.webapp.item1',
        'about.expertise.webapp.item2',
        'about.expertise.webapp.item3',
        'about.expertise.webapp.item4',
        'about.expertise.webapp.item5',
      ],
    },
    {
      categoryKey: 'about.expertise.ecosystems.category',
      icon: <Layers size={20} />,
      items: [
        'about.expertise.ecosystems.item1',
        'about.expertise.ecosystems.item2',
        'about.expertise.ecosystems.item3',
        'about.expertise.ecosystems.item4',
        'about.expertise.ecosystems.item5',
      ],
    },
    {
      categoryKey: 'about.expertise.marketing.category',
      icon: <Network size={20} />,
      items: [
        'about.expertise.marketing.item1',
        'about.expertise.marketing.item2',
        'about.expertise.marketing.item3',
        'about.expertise.marketing.item4',
        'about.expertise.marketing.item5',
      ],
    },
    {
      categoryKey: 'about.expertise.video.category',
      icon: <Film size={20} />,
      items: [
        'about.expertise.video.item1',
        'about.expertise.video.item2',
        'about.expertise.video.item3',
        'about.expertise.video.item4',
        'about.expertise.video.item5',
      ],
    },
  ];
  return (
    <div className="relative min-h-screen bg-transparent">
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
                ─── {t('about.tagline')} ───
              </div>

              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                {t('about.title')}
              </h1>

              <p className="font-mono text-sm md:text-base text-stone-slate max-w-3xl mx-auto leading-relaxed">
                {t('about.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 mb-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-glass-matte"
            >
              <div className="flex items-start gap-4 mb-6">
                <FlaskConical className="w-8 h-8 text-engrave-line flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-mono text-xl text-engrave-fresco mb-4">
                    {t('about.mission.title')}
                  </h2>
                  <p className="font-mono text-sm text-stone-slate leading-relaxed">
                    {t('about.mission.description')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="font-mono text-2xl text-engrave-fresco mb-4">
                {t('about.values.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-glass-matte hover:border-white/20 transition-all rounded-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-engrave-line flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-mono text-base text-engrave-fresco mb-2">
                        {t(value.titleKey)}
                      </h3>
                      <p className="font-mono text-sm text-stone-slate leading-relaxed">
                        {t(value.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="font-mono text-2xl text-engrave-fresco mb-4">
                {t('about.expertise.title')}
              </h2>
              <p className="font-mono text-sm text-stone-slate">
                {t('about.expertise.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertise.map((area, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-glass-matte rounded-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-engrave-line">
                      {area.icon}
                    </div>
                    <h3 className="font-mono text-sm text-engrave-fresco">
                      {t(area.categoryKey)}
                    </h3>
                  </div>

                  <ul className="space-y-2">
                    {area.items.map((itemKey, j) => (
                      <li
                        key={j}
                        className="font-mono text-[10px] text-stone-slate flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-engrave-dim" />
                        {t(itemKey)}
                      </li>
                    ))}
                  </ul>
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
                {t('about.cta.title')}
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                {t('about.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => trackCTA(t('about.cta.contactButton'), 'About Page')}
                    className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                             min-h-[44px] min-w-[120px]"
                    aria-label={t('common.contact')}
                  >
                    {t('about.cta.contactButton')}
                  </motion.button>
                </Link>
                <Link href="/cases">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => trackCTA(t('about.cta.casesButton'), 'About Page')}
                    className="px-8 py-4 border border-engrave-line text-engrave-fresco font-mono text-sm tracking-widest
                             min-h-[44px] min-w-[120px]"
                    aria-label={t('header.menu.cases')}
                  >
                    {t('about.cta.casesButton')}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
}




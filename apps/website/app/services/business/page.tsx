"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Target, BarChart3, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useI18n } from '@/lib/i18n/context';

export default function BusinessPage() {
  const { t } = useI18n();

  const services = [
    {
      title: t('businessPage.service1.title'),
      description: t('businessPage.service1.description'),
      features: t('businessPage.service1.features', { returnObjects: true }) as string[]
    },
    {
      title: t('businessPage.service2.title'),
      description: t('businessPage.service2.description'),
      features: (t('businessPage.service2.features', { returnObjects: true }) as unknown) as string[]
    },
    {
      title: t('businessPage.service3.title'),
      description: t('businessPage.service3.description'),
      features: (t('businessPage.service3.features', { returnObjects: true }) as unknown) as string[]
    },
    {
      title: t('businessPage.service4.title'),
      description: t('businessPage.service4.description'),
      features: (t('businessPage.service4.features', { returnObjects: true }) as unknown) as string[]
    }
  ];

  const process = [
    { step: t('businessPage.step1.step'), title: t('businessPage.step1.title'), desc: t('businessPage.step1.desc') },
    { step: t('businessPage.step2.step'), title: t('businessPage.step2.title'), desc: t('businessPage.step2.desc') },
    { step: t('businessPage.step3.step'), title: t('businessPage.step3.title'), desc: t('businessPage.step3.desc') },
    { step: t('businessPage.step4.step'), title: t('businessPage.step4.title'), desc: t('businessPage.step4.desc') }
  ];

  return (
    <div className="relative min-h-screen bg-transparent">


      <Header />

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-6">
                ─── {t('businessPage.tagline')} ───
              </div>

              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                {t('businessPage.title')}
                <br />
                <span className="text-chrome">{t('businessPage.titleHighlight')}</span>
              </h1>

              <p className="font-mono text-sm md:text-base text-stone-slate max-w-3xl leading-relaxed mb-8">
                {t('businessPage.description')}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                             flex items-center gap-3 transition-all"
                  >
                    {t('businessPage.ctaButton')}
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-8">
              ─── {t('businessPage.servicesTitle')} ───
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 border border-stone-anthracite/30 bg-ink-chrome/20 
                           hover:border-engrave-line/20 transition-all"
                >
                  <h3 className="font-mono text-lg text-engrave-fresco mb-3">
                    {service.title}
                  </h3>
                  <p className="font-mono text-sm text-stone-slate leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 font-mono text-[10px] text-engrave-dim">
                        <CheckCircle size={10} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-8">
              ─── {t('businessPage.processTitle')} ───
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {process.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 border border-stone-anthracite/30 bg-ink-chrome/20"
                >
                  <div className="font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                    {item.step}
                  </div>
                  <h4 className="font-mono text-base text-engrave-fresco mb-2">
                    {item.title}
                  </h4>
                  <p className="font-mono text-[10px] text-stone-slate leading-relaxed">
                    {item.desc}
                  </p>
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
                {t('businessPage.ctaTitle')}
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                {t('businessPage.ctaDescription')}
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
                >
                  {t('businessPage.ctaButton2')}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
}

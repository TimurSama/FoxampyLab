"use client";

import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useI18n } from '@/lib/i18n/context';

export default function WebAppPage() {
  const { t } = useI18n();

  const services = [
    {
      title: t('webAppPage.service1.title'),
      description: t('webAppPage.service1.description'),
      features: t('webAppPage.service1.features', { returnObjects: true }) as string[]
    },
    {
      title: t('webAppPage.service2.title'),
      description: t('webAppPage.service2.description'),
      features: t('webAppPage.service2.features', { returnObjects: true }) as string[]
    },
    {
      title: t('webAppPage.service3.title'),
      description: t('webAppPage.service3.description'),
      features: t('webAppPage.service3.features', { returnObjects: true }) as string[]
    },
    {
      title: t('webAppPage.service4.title'),
      description: t('webAppPage.service4.description'),
      features: t('webAppPage.service4.features', { returnObjects: true }) as string[]
    }
  ];

  const tech = [
    { name: t('webAppPage.tech1.name'), desc: t('webAppPage.tech1.desc') },
    { name: t('webAppPage.tech2.name'), desc: t('webAppPage.tech2.desc') },
    { name: t('webAppPage.tech3.name'), desc: t('webAppPage.tech3.desc') },
    { name: t('webAppPage.tech4.name'), desc: t('webAppPage.tech4.desc') }
  ];

  const process = [
    { step: t('webAppPage.step1.step'), title: t('webAppPage.step1.title'), desc: t('webAppPage.step1.desc') },
    { step: t('webAppPage.step2.step'), title: t('webAppPage.step2.title'), desc: t('webAppPage.step2.desc') },
    { step: t('webAppPage.step3.step'), title: t('webAppPage.step3.title'), desc: t('webAppPage.step3.desc') },
    { step: t('webAppPage.step4.step'), title: t('webAppPage.step4.title'), desc: t('webAppPage.step4.desc') }
  ];
  return (
    <div className="relative min-h-screen bg-ink-deep">
      <div className="fixed inset-0 wireframe-grid pointer-events-none" />
      
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
                ─── {t('webAppPage.tagline')} ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                {t('webAppPage.title')}
                <br />
                <span className="text-chrome">{t('webAppPage.titleHighlight')}</span>
              </h1>
              
              <p className="font-mono text-sm md:text-base text-stone-slate max-w-3xl leading-relaxed mb-8">
                {t('webAppPage.description')}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                             flex items-center gap-3 transition-all"
                  >
                    {t('webAppPage.ctaButton')}
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
              ─── {t('webAppPage.servicesTitle')} ───
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

        {/* Tech Stack */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-8">
              ─── {t('webAppPage.techTitle')} ───
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
              {tech.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 border border-stone-anthracite/30 bg-ink-chrome/20 text-center"
                >
                  <h4 className="font-mono text-base text-engrave-fresco mb-2">
                    {item.name}
                  </h4>
                  <p className="font-mono text-[10px] text-stone-slate">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-8">
              ─── {t('webAppPage.processTitle')} ───
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
                {t('webAppPage.ctaTitle')}
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                {t('webAppPage.ctaDescription')}
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
                >
                  {t('webAppPage.ctaButton2')}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
}







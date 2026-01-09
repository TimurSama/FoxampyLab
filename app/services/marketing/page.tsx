"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Users, BarChart3, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

const services = [
  {
    title: 'Контент-стратегия',
    description: 'Разработка комплексной контент-стратегии для привлечения и удержания целевой аудитории.',
    features: ['Стратегия контента', 'Контент-план', 'Копирайтинг', 'Редактура']
  },
  {
    title: 'SMM и социальные сети',
    description: 'Управление присутствием в социальных сетях, создание сообществ и взаимодействие с аудиторией.',
    features: ['SMM стратегия', 'Контент для соцсетей', 'Community management', 'Инфлюенс-маркетинг']
  },
  {
    title: 'Performance-маркетинг',
    description: 'Data-driven подход к маркетингу с фокусом на измеримые результаты и оптимизацию конверсий.',
    features: ['Реклама', 'Аналитика', 'A/B тестирование', 'Оптимизация конверсий']
  },
  {
    title: 'Криптомаркетинг и Web3 PR',
    description: 'Специализированный маркетинг для блокчейн-проектов, криптовалют и Web3 экосистем.',
    features: ['Web3 PR', 'Криптомаркетинг', 'Community building', 'Token marketing']
  }
];

const process = [
  { step: '01', title: 'Анализ', desc: 'Исследование аудитории и конкурентов' },
  { step: '02', title: 'Стратегия', desc: 'Разработка маркетинговой стратегии' },
  { step: '03', title: 'Реализация', desc: 'Запуск кампаний и создание контента' },
  { step: '04', title: 'Оптимизация', desc: 'Анализ результатов и улучшение' }
];

export default function MarketingPage() {
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
                ─── MARKETING & BRANDING ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                МАРКЕТИНГ И
                <br />
                <span className="text-chrome">БРЕНДИНГ</span>
              </h1>
              
              <p className="font-mono text-sm md:text-base text-stone-slate max-w-3xl leading-relaxed mb-8">
                Маркетинг, продвижение, брендинг, построение сообществ. Data-driven подход, контент-стратегия, 
                performance-маркетинг. Специализация в криптомаркетинге и Web3 PR.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                             flex items-center gap-3 transition-all"
                  >
                    ОБСУДИТЬ ПРОЕКТ
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
              ─── УСЛУГИ ───
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
              ─── ПРОЦЕСС РАБОТЫ ───
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
                ГОТОВЫ НАЧАТЬ?
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                Обсудим ваш проект и предложим оптимальное решение.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
                >
                  СВЯЗАТЬСЯ
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
}







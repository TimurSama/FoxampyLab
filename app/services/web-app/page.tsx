"use client";

import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

const services = [
  {
    title: 'Веб-сайты',
    description: 'Разработка современных веб-сайтов с фокусом на производительность, SEO и пользовательский опыт.',
    features: ['Корпоративные сайты', 'Лендинги', 'Портфолио', 'Блоги и CMS']
  },
  {
    title: 'Веб-приложения',
    description: 'Создание высоконагруженных веб-приложений с использованием современных технологий и лучших практик.',
    features: ['SPA / SSR / SSG', 'PWA приложения', 'Дашборды', 'Админ-панели']
  },
  {
    title: 'Мобильные приложения',
    description: 'Разработка нативных и кроссплатформенных мобильных приложений для iOS и Android.',
    features: ['iOS приложения', 'Android приложения', 'React Native', 'Flutter']
  },
  {
    title: 'API и интеграции',
    description: 'Разработка RESTful и GraphQL API, интеграция с внешними сервисами и системами.',
    features: ['REST API', 'GraphQL', 'Микросервисы', 'Интеграции']
  }
];

const tech = [
  { name: 'React / Next.js', desc: 'Современный фронтенд' },
  { name: 'Node.js', desc: 'Серверная разработка' },
  { name: 'TypeScript', desc: 'Типобезопасность' },
  { name: 'PostgreSQL / MongoDB', desc: 'Базы данных' }
];

const process = [
  { step: '01', title: 'Планирование', desc: 'Анализ требований и проектирование архитектуры' },
  { step: '02', title: 'Разработка', desc: 'Реализация функциональности и интерфейсов' },
  { step: '03', title: 'Тестирование', desc: 'QA, оптимизация производительности' },
  { step: '04', title: 'Запуск', desc: 'Деплой, мониторинг и поддержка' }
];

export default function WebAppPage() {
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
                ─── WEB & APP DEVELOPMENT ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                САЙТЫ И
                <br />
                <span className="text-chrome">ПРИЛОЖЕНИЯ</span>
              </h1>
              
              <p className="font-mono text-sm md:text-base text-stone-slate max-w-3xl leading-relaxed mb-8">
                Разработка веб-сайтов, веб-приложений, мобильных приложений. 
                Современный технологический стек: React, Next.js, React Native, Node.js.
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

        {/* Tech Stack */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-8">
              ─── ТЕХНОЛОГИИ ───
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







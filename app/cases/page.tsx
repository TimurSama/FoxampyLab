"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Code, Palette, TrendingUp, Layers, Network, Film, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { trackCTA } from '@/lib/analytics';

interface Case {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  results: string[];
  image?: string;
  link?: string;
  icon: React.ReactNode;
}

const cases: Case[] = [
  {
    id: 'ecosystem-1',
    title: 'WEB3 ЭКОСИСТЕМА',
    category: 'Экосистемы',
    description: 'Комплексная платформа для управления цифровыми активами и децентрализованными финансами.',
    longDescription: 'Разработана полная экосистема включающая веб-приложение, мобильное приложение, смарт-контракты и маркетплейс. Реализована интеграция с несколькими блокчейн-сетями, система стейкинга и yield farming.',
    technologies: ['React', 'Next.js', 'Solidity', 'Web3.js', 'Node.js', 'PostgreSQL'],
    results: [
      'Привлечено $950K инвестиций',
      '17K+ активных пользователей',
      'Транзакции на сумму $5M+',
      'Интеграция с 3 блокчейн-сетями'
    ],
    icon: <Layers size={24} />,
  },
  {
    id: 'branding-1',
    title: 'РЕБРЕНДИНГ СТАРТАПА',
    category: 'Брендинг',
    description: 'Полный ребрендинг технологического стартапа с разработкой визуальной идентичности и коммуникационной стратегии.',
    longDescription: 'Проведен глубокий анализ рынка и конкурентов, разработана новая визуальная идентичность, создан брендбук и гайдлайны. Реализована коммуникационная стратегия для запуска продукта.',
    technologies: ['Figma', 'Adobe Creative Suite', 'Brand Strategy'],
    results: [
      'Увеличение узнаваемости бренда на 300%',
      'Рост конверсий на 45%',
      'Запуск успешного продукта',
      'Положительные отзывы инвесторов'
    ],
    icon: <Palette size={24} />,
  },
  {
    id: 'web-app-1',
    title: 'КОРПОРАТИВНАЯ ПЛАТФОРМА',
    category: 'Веб-приложения',
    description: 'Высоконагруженная платформа для управления бизнес-процессами крупной компании.',
    longDescription: 'Разработана комплексная платформа с модулями управления проектами, аналитикой, интеграциями с внешними сервисами. Реализована система ролей и прав доступа, дашборды с реальным временем обновления данных.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    results: [
      'Сокращение времени на задачи на 40%',
      'Обработка 10K+ запросов в минуту',
      'Интеграция с 15+ внешними сервисами',
      '99.9% uptime'
    ],
    icon: <Code size={24} />,
  },
  {
    id: 'strategy-1',
    title: 'БИЗНЕС-СТРАТЕГИЯ ДЛЯ СТАРТАПА',
    category: 'Бизнес и стратегирование',
    description: 'Разработка бизнес-модели и стратегии выхода на рынок для технологического стартапа.',
    longDescription: 'Проведен анализ рынка, конкурентов и пользователей. Разработана бизнес-модель, unit-экономика, стратегия монетизации. Создан roadmap развития на 2 года с ключевыми метриками и точками принятия решений.',
    technologies: ['Market Research', 'Business Modeling', 'Financial Planning'],
    results: [
      'Привлечено $500K seed инвестиций',
      'Валидация бизнес-модели',
      'Запуск MVP за 3 месяца',
      'Первые 1000 пользователей'
    ],
    icon: <TrendingUp size={24} />,
  },
  {
    id: 'marketing-1',
    title: 'КРИПТОМАРКЕТИНГ КАМПАНИЯ',
    category: 'Маркетинг',
    description: 'Комплексная маркетинговая кампания для запуска блокчейн-проекта.',
    longDescription: 'Разработана стратегия запуска, контент-план, проведены PR-кампании, построено сообщество. Реализованы партнерства с инфлюенсерами и медиа. Организованы мероприятия и AMA сессии.',
    technologies: ['Content Strategy', 'Community Building', 'PR', 'Performance Marketing'],
    results: [
      'Рост сообщества до 50K+ участников',
      'Охват 2M+ пользователей',
      'Успешный запуск токена',
      'Партнерства с 20+ проектами'
    ],
    icon: <Network size={24} />,
  },
  {
    id: 'video-1',
    title: 'ВИДЕО ДЛЯ ЗАПУСКА ПРОДУКТА',
    category: 'Видео',
    description: 'Создание промо-ролика и эксплейнера для запуска нового продукта.',
    longDescription: 'Разработана концепция, написан сценарий, проведена съемка и постпродакшн. Созданы версии для разных платформ (YouTube, Instagram, сайт). Добавлена анимация и моушн-дизайн.',
    technologies: ['Video Production', 'Motion Design', 'Post-production', '3D Animation'],
    results: [
      '1M+ просмотров на YouTube',
      'Рост конверсий на 60%',
      'Вирусное распространение',
      'Положительные отзывы'
    ],
    icon: <Film size={24} />,
  },
];

export default function CasesPage() {
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
                ─── PORTFOLIO ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                КЕЙСЫ И
                <br />
                <span className="text-chrome">ПРОЕКТЫ</span>
              </h1>
              
              <p className="font-mono text-sm md:text-base text-stone-slate max-w-2xl mx-auto leading-relaxed">
                Примеры реализованных проектов, демонстрирующих наш подход к созданию инновационных решений.
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
                        {caseItem.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-mono text-lg text-engrave-fresco mb-3">
                      {caseItem.title}
                    </h3>

                    {/* Description */}
                    <p className="font-mono text-sm text-stone-slate leading-relaxed mb-4 flex-grow">
                      {caseItem.description}
                    </p>

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

                    {/* Key Result */}
                    {caseItem.results[0] && (
                      <div className="mb-4 p-3 bg-ink-deep border border-stone-anthracite/20">
                        <p className="font-mono text-[10px] text-engrave-dim mb-1">РЕЗУЛЬТАТ:</p>
                        <p className="font-mono text-xs text-engrave-fresco">
                          {caseItem.results[0]}
                        </p>
                      </div>
                    )}

                    {/* Link */}
                    <div className="flex items-center gap-2 font-mono text-[10px] text-engrave-dim group-hover:text-engrave-line transition-colors">
                      ПОДРОБНЕЕ <ArrowRight size={10} />
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
                ЗАИНТЕРЕСОВАНЫ В СОТРУДНИЧЕСТВЕ?
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                Обсудим ваш проект и возможности создания подобных решений.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => trackCTA('Обсудить проект', 'Cases Page')}
                  className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
                  aria-label="Связаться с нами"
                >
                  ОБСУДИТЬ ПРОЕКТ
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
}





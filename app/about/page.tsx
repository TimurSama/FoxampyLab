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

const values = [
  {
    icon: <Lightbulb size={24} />,
    title: 'ИННОВАЦИИ',
    description: 'Экспериментируем с передовыми технологиями и создаём решения, которых ещё не существует.',
  },
  {
    icon: <Target size={24} />,
    title: 'ФОКУС НА РЕЗУЛЬТАТ',
    description: 'Каждый проект нацелен на достижение конкретных бизнес-целей и измеримых результатов.',
  },
  {
    icon: <Users size={24} />,
    title: 'КОМАНДА ЭКСПЕРТОВ',
    description: 'Объединяем специалистов из разных областей: разработка, дизайн, бизнес, наука.',
  },
  {
    icon: <Zap size={24} />,
    title: 'СКОРОСТЬ И КАЧЕСТВО',
    description: 'Балансируем между быстрой реализацией и высоким качеством исполнения.',
  },
];

const expertise = [
  {
    category: 'БИЗНЕС И СТРАТЕГИРОВАНИЕ',
    icon: <TrendingUp size={20} />,
    items: [
      'Бизнес-моделирование',
      'Стратегическое планирование',
      'Unit-экономика',
      'Анализ рынка',
      'Инвестиционные стратегии',
    ],
  },
  {
    category: 'ДИЗАЙН И АРХИТЕКТУРА',
    icon: <Palette size={20} />,
    items: [
      'UI/UX дизайн',
      'Брендинг и идентичность',
      'Архитектура систем',
      '3D визуализация',
      'Моушн-дизайн',
    ],
  },
  {
    category: 'САЙТЫ И ПРИЛОЖЕНИЯ',
    icon: <Code size={20} />,
    items: [
      'Веб-разработка',
      'Мобильные приложения',
      'Full-stack решения',
      'API и интеграции',
      'DevOps и инфраструктура',
    ],
  },
  {
    category: 'ЭКОСИСТЕМЫ',
    icon: <Layers size={20} />,
    items: [
      'WEB3 платформы',
      'Блокчейн решения',
      'Децентрализованные системы',
      'Смарт-контракты',
      'NFT и токенизация',
    ],
  },
  {
    category: 'МАРКЕТИНГ И БРЕНДИНГ',
    icon: <Network size={20} />,
    items: [
      'Стратегия запуска',
      'Контент-маркетинг',
      'PR и коммуникации',
      'Сообщество и партнёрства',
      'Performance маркетинг',
    ],
  },
  {
    category: 'ВИДЕО И КИНО',
    icon: <Film size={20} />,
    items: [
      'Видеопродакшн',
      'Моушн-графика',
      '3D анимация',
      'Постпродакшн',
      'Креативное производство',
    ],
  },
];

export default function AboutPage() {
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
                ─── ABOUT ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                ЛАБОРАТОРИЯ
                <br />
                <span className="text-chrome">РАЗРАБОТОК ИННОВАЦИЙ</span>
              </h1>
              
              <p className="font-mono text-sm md:text-base text-stone-slate max-w-3xl mx-auto leading-relaxed">
                Создаём решения на стыке технологий, бизнеса и творчества. 
                От концепции до реализации — полный цикл разработки инновационных продуктов и экосистем.
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
              className="p-8 border border-stone-anthracite/30 bg-ink-chrome/10"
            >
              <div className="flex items-start gap-4 mb-6">
                <FlaskConical className="w-8 h-8 text-engrave-line flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-mono text-xl text-engrave-fresco mb-4">
                    МИССИЯ
                  </h2>
                  <p className="font-mono text-sm text-stone-slate leading-relaxed">
                    Разрабатывать инновационные решения, которые объединяют бизнес-стратегию, 
                    креативное искусство и передовые технологии. Создавать экосистемы и продукты, 
                    которые формируют будущее цифрового пространства и открывают новые возможности 
                    для бизнеса и творчества.
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
                ЦЕННОСТИ
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
                  className="p-6 border border-stone-anthracite/30 bg-ink-chrome/10 
                           hover:border-engrave-line/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-engrave-line flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-mono text-base text-engrave-fresco mb-2">
                        {value.title}
                      </h3>
                      <p className="font-mono text-sm text-stone-slate leading-relaxed">
                        {value.description}
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
                ЭКСПЕРТИЗА
              </h2>
              <p className="font-mono text-sm text-stone-slate">
                Направления работы и области компетенций
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
                  className="p-6 border border-stone-anthracite/30 bg-ink-chrome/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-engrave-line">
                      {area.icon}
                    </div>
                    <h3 className="font-mono text-sm text-engrave-fresco">
                      {area.category}
                    </h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {area.items.map((item, j) => (
                      <li
                        key={j}
                        className="font-mono text-[10px] text-stone-slate flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-engrave-dim" />
                        {item}
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
                ГОТОВЫ К СОТРУДНИЧЕСТВУ?
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                Обсудим ваш проект и возможности создания инновационных решений.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => trackCTA('Связаться', 'About Page')}
                    className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                             min-h-[44px] min-w-[120px]"
                    aria-label="Связаться с нами"
                  >
                    СВЯЗАТЬСЯ
                  </motion.button>
                </Link>
                <Link href="/cases">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => trackCTA('Кейсы', 'About Page')}
                    className="px-8 py-4 border border-engrave-line text-engrave-fresco font-mono text-sm tracking-widest
                             min-h-[44px] min-w-[120px]"
                    aria-label="Посмотреть кейсы"
                  >
                    КЕЙСЫ
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




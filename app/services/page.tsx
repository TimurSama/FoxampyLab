"use client";

import { motion } from 'framer-motion';
import { 
  Layers, 
  Code, 
  Palette, 
  TrendingUp, 
  FileText, 
  Film,
  Rocket,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import FanMenu from '@/components/layout/FanMenu';

const services = [
  {
    id: 'ecosystems',
    icon: <Layers size={40} />,
    title: 'ЭКОСИСТЕМЫ',
    subtitle: 'Комплексная разработка',
    description: 'Полный цикл создания цифровых продуктов. От исследования рынка и концепции до запуска и масштабирования. Архитектура, разработка, дизайн, маркетинг — всё в одной команде.',
    features: ['Исследование и стратегия', 'Архитектура решения', 'MVP за 8 недель', 'Масштабирование'],
    price: 'от $15,000'
  },
  {
    id: 'web-app',
    icon: <Code size={40} />,
    title: 'WEB & APP',
    subtitle: 'Сайты и приложения',
    description: 'Высоконагруженные веб-приложения, корпоративные сайты, мобильные приложения. React, Next.js, React Native, Node.js.',
    features: ['SPA / SSR / SSG', 'PWA приложения', 'Мобильные приложения', 'API интеграции'],
    price: 'от $5,000'
  },
  {
    id: 'blockchain',
    icon: <Rocket size={40} />,
    title: 'BLOCKCHAIN',
    subtitle: 'Web3 решения',
    description: 'Смарт-контракты, DeFi протоколы, NFT маркетплейсы, DAO, токеномика. Ethereum, Solana, Polygon, Arbitrum.',
    features: ['Смарт-контракты', 'dApps', 'Токеномика', 'Аудит безопасности'],
    price: 'от $10,000'
  },
  {
    id: 'design',
    icon: <Palette size={40} />,
    title: 'ДИЗАЙН',
    subtitle: 'UI/UX и брендинг',
    description: 'Интерфейсы, которые конвертируют. Бренды, которые запоминаются. Исследование пользователей, прототипирование, дизайн-системы.',
    features: ['UX исследования', 'UI дизайн', 'Брендинг', 'Дизайн-системы'],
    price: 'от $3,000'
  },
  {
    id: 'marketing',
    icon: <TrendingUp size={40} />,
    title: 'МАРКЕТИНГ',
    subtitle: 'Рост и продвижение',
    description: 'Data-driven маркетинг. SMM, контент-стратегия, performance, community building. Криптомаркетинг и Web3 PR.',
    features: ['Контент-стратегия', 'SMM', 'Performance', 'Community'],
    price: 'от $2,000/мес'
  },
  {
    id: 'documents',
    icon: <FileText size={40} />,
    title: 'ДОКУМЕНТЫ',
    subtitle: 'Whitepaper и питчи',
    description: 'Whitepaper, Litepaper, бизнес-планы, pitch deck, токеномика. Для привлечения инвестиций и выхода на рынок.',
    features: ['Whitepaper', 'Pitch Deck', 'Бизнес-план', 'Токеномика'],
    price: 'от $2,500'
  },
  {
    id: 'video',
    icon: <Film size={40} />,
    title: 'ВИДЕО',
    subtitle: 'Продакшн',
    description: 'Промо-ролики, эксплейнеры, моушн-дизайн, 3D визуализации. Для презентаций, лендингов и социальных сетей.',
    features: ['Промо-ролики', 'Эксплейнеры', 'Motion design', '3D визуализация'],
    price: 'от $1,500'
  }
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-ink-deep">
      <div className="fixed inset-0 wireframe-grid pointer-events-none" />
      
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-6">
                ─── SERVICES ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                НАПРАВЛЕНИЯ
                <br />
                РАБОТЫ
              </h1>
              
              <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto leading-relaxed">
                Полный спектр услуг для создания и развития цифровых продуктов.
                От идеи до масштабирования.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-stone-anthracite/30 bg-ink-chrome/20 
                         hover:border-engrave-line/20 transition-all"
              >
                <div className="p-6 md:p-8 grid md:grid-cols-[auto,1fr,auto] gap-6 items-start">
                  {/* Icon */}
                  <div className="text-stone-slate group-hover:text-engrave-line transition-colors">
                    {service.icon}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className="font-mono text-xl text-engrave-fresco">
                        {service.title}
                      </h2>
                      <span className="font-mono text-[9px] text-stone-slate tracking-widest">
                        {service.subtitle}
                      </span>
                    </div>
                    
                    <p className="font-mono text-sm text-stone-slate leading-relaxed mb-4 max-w-2xl">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {service.features.map((feature, j) => (
                        <span 
                          key={j}
                          className="flex items-center gap-1.5 font-mono text-[10px] text-engrave-dim"
                        >
                          <CheckCircle size={10} />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <div className="font-mono text-lg text-engrave-fresco mb-2">
                      {service.price}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="font-mono text-[10px] text-engrave-line flex items-center gap-1
                               hover:text-engrave-fresco transition-colors"
                    >
                      ПОДРОБНЕЕ <ArrowRight size={10} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 mt-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-stone-anthracite/30"
            >
              <h2 className="font-mono text-2xl text-engrave-fresco mb-4">
                НЕ НАШЛИ НУЖНУЮ УСЛУГУ?
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                Расскажите о вашем проекте — найдём решение.
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

      <FanMenu />
    </div>
  );
}


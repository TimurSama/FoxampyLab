"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MessageCircle,
  Sparkles,
  Zap,
  Shield,
  Clock,
  Users,
  Target,
  TrendingUp,
  Code,
  Palette,
  Megaphone,
  Box,
  ArrowUpRight,
} from "lucide-react";
import { ContactModal } from "@/components/modals/ContactModal";
import NoirPixelBackground from "@/components/backgrounds/NoirPixelBackground";

// ============================================
// КОНФИГУРАЦИЯ УСЛУГ
// ============================================
const SERVICE_CATEGORIES = [
  {
    id: "web3",
    icon: Box,
    title: "Web3 & Blockchain",
    shortTitle: "Web3",
    description: "Децентрализованные приложения, смарт-контракты, токеномика",
    color: "#6366f1",
    gradient: "from-indigo-500/20 to-purple-500/20",
    painPoints: [
      "Инвесторы требуют работающий MVP, а у вас только презентация",
      "Смарт-контракты прошли аудит, но пользователи не приходят",
      "Токеномика на бумаге красивая, но не работает в реальности",
      "Техническая команда говорит на разных языках",
      "Mainnet через 2 недели, а код не готов",
    ],
    solutions: [
      {
        icon: Zap,
        title: "Web3 MVP за 8 недель",
        description: "Работающий продукт с токеномикой и смарт-контрактами для привлечения инвестиций",
      },
      {
        icon: Shield,
        title: "Аудит + безопасность",
        description: "Проверка кода, исправление уязвимостей, подготовка к mainnet",
      },
      {
        icon: TrendingUp,
        title: "Go-to-Market стратегия",
        description: "Запуск с правильной экономикой и первыми пользователями",
      },
    ],
    packages: [
      {
        name: "MVP Quick",
        price: "$8,000",
        duration: "4-6 недель",
        description: "Быстрый запуск для pre-seed раунда",
        features: [
          "Core smart contracts",
          "Базовый dApp интерфейс",
          "Токеномика v1",
          "Pitch deck",
          "Поддержка 2 недели",
        ],
        popular: false,
      },
      {
        name: "Full Cycle Web3",
        price: "$25,000",
        duration: "10-14 недель",
        description: "Полный цикл от идеи до запуска",
        features: [
          "Полная токеномика с моделированием",
          "Production-ready смарт-контракты",
          "Полноценный dApp фронтенд",
          "Security audit",
          "Whitepaper",
          "Стратегия запуска",
          "Поддержка 1 месяц",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "$50,000+",
        duration: "3-4 месяца",
        description: "Комплексная экосистема для серьезных проектов",
        features: [
          "Всё из Full Cycle",
          "Кроссчейн интеграции",
          "L2 решения",
          "Кастомная токеномика",
          "Выделенная команда",
          "Приоритетная поддержка",
        ],
        popular: false,
      },
    ],
  },
  {
    id: "webdev",
    icon: Code,
    title: "Web Development",
    shortTitle: "Web & Apps",
    description: "Веб-приложения, мобильные приложения, цифровые экосистемы",
    color: "#10b981",
    gradient: "from-emerald-500/20 to-teal-500/20",
    painPoints: [
      "Аутсорс команда пропала на 3 неделю подряд",
      "MVP сделали за $5K, а доделать просят еще $20K",
      "Продукт готов, но он тормозит и падает",
      "Пользователи не понимают как пользоваться интерфейсом",
      "6 месяцев разработки, а продаж всё ещё нет",
    ],
    solutions: [
      {
        icon: Clock,
        title: "Фиксированные сроки",
        description: "Четкий таймлайн с промежуточными результатами каждые 2 недели",
      },
      {
        icon: Users,
        title: "Продуктовый подход",
        description: "Не просто пишем код, а создаем продукт который решает проблемы",
      },
      {
        icon: Target,
        title: "Масштабируемая архитектура",
        description: "Сразу закладываем рост до 100K+ пользователей",
      },
    ],
    packages: [
      {
        name: "MVP Sprint",
        price: "$8,000",
        duration: "6-8 недель",
        description: "Быстрый запуск для проверки гипотезы",
        features: [
          "Product Requirements",
          "UX/UI дизайн",
          "Frontend (React/Next.js)",
          "Backend API",
          "База данных",
          "Deployment",
        ],
        popular: false,
      },
      {
        name: "Ecosystem Launch",
        price: "$25,000",
        duration: "12-16 недель",
        description: "Полноценный продукт с мобильным приложением",
        features: [
          "Всё из MVP Sprint",
          "iOS + Android приложения",
          "Admin панель",
          "Интеграции с API",
          "Аналитика",
          "CI/CD pipeline",
          "3 месяца поддержки",
        ],
        popular: true,
      },
      {
        name: "Digital Platform",
        price: "$50,000+",
        duration: "4-6 месяцев",
        description: "Крупная платформа для enterprise",
        features: [
          "Всё из Ecosystem",
          "Микросервисная архитектура",
          "Масштабируемая инфраструктура",
          "Кастомные интеграции",
          "Выделенная команда",
          "SLA поддержка",
        ],
        popular: false,
      },
    ],
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing & Growth",
    shortTitle: "Marketing",
    description: "Performance marketing, стратегия роста, запуск продуктов",
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-orange-500/20",
    painPoints: [
      "Рекламный бюджет $10K/мес уходит в никуда",
      "CPA растет, а конверсии падают",
      "Конкуренты забирают весь рынок",
      "Органический трафик = 0",
      "Retention rate 5%, пользователи уходят после первой сессии",
    ],
    solutions: [
      {
        icon: Target,
        title: "Data-driven подход",
        description: "Каждое решение основано на данных, а не на догадках",
      },
      {
        icon: TrendingUp,
        title: "Масштабируемые каналы",
        description: "Находим работающие каналы и масштабируем до ROI 300%+",
      },
      {
        icon: Users,
        title: "Retention фокус",
        description: "Не просто приводим пользователей, а заставляем их оставаться",
      },
    ],
    packages: [
      {
        name: "Growth Audit",
        price: "$3,000",
        duration: "1-2 недели",
        description: "Аудит текущего маркетинга + roadmap",
        features: [
          "Анализ всех каналов",
          "Аудит воронки",
          "Конкурентный анализ",
          "Roadmap роста",
          "Quick wins",
        ],
        popular: false,
      },
      {
        name: "Growth Engine",
        price: "$8,000/мес",
        duration: "3+ месяца",
        description: "Полное управление ростом",
        features: [
          "Performance marketing",
          "3-5 рекламных каналов",
          "CRO оптимизация",
          "Аналитика & отчетность",
          "Weekly calls",
          "Creative production",
        ],
        popular: true,
      },
      {
        name: "Go-to-Market",
        price: "$15,000",
        duration: "6-8 недель",
        description: "Запуск нового продукта на рынок",
        features: [
          "GTM стратегия",
          "Positioning & messaging",
          "Channel strategy",
          "Launch campaign",
          "PR & Influencers",
          "Первые 1000 пользователей",
        ],
        popular: false,
      },
    ],
  },
  {
    id: "design",
    icon: Palette,
    title: "Design & Creative",
    shortTitle: "Design",
    description: "Product design, UI/UX, brand identity, motion design",
    color: "#ec4899",
    gradient: "from-pink-500/20 to-rose-500/20",
    painPoints: [
      "Дизайн 'красивый', но пользователи не понимают интерфейс",
      "Каждый новый экран выглядит по-разному",
      "Конверсия с лендинга 0.5%",
      "Дизайнеры делают 'как нарисовали', а не как работает",
      "Переделали 15 версий, а продукт всё ещё не продает",
    ],
    solutions: [
      {
        icon: Target,
        title: "Design that converts",
        description: "Дизайн основан на поведении пользователей, а не на модных трендах",
      },
      {
        icon: Shield,
        title: "Системный подход",
        description: "Design system который масштабируется с продуктом",
      },
      {
        icon: Zap,
        title: "Быстрые итерации",
        description: "Первые макеты через 3 дня, не через 3 недели",
      },
    ],
    packages: [
      {
        name: "UI Quick",
        price: "$4,000",
        duration: "2-3 недели",
        description: "Быстрый дизайн для MVP",
        features: [
          "UX исследование",
          "Wireframes",
          "UI дизайн (15-20 экранов)",
          "Прототип",
          "Handoff разработчикам",
        ],
        popular: false,
      },
      {
        name: "Product Design",
        price: "$12,000",
        duration: "6-8 недель",
        description: "Полноценный дизайн продукта",
        features: [
          "User research",
          "User flows & journey",
          "Wireframes",
          "UI Design (все экраны)",
          "Design system",
          "Interactive prototype",
          "Documentation",
        ],
        popular: true,
      },
      {
        name: "Brand + Product",
        price: "$20,000",
        duration: "10-12 недель",
        description: "Брендинг + дизайн продукта",
        features: [
          "Brand strategy",
          "Logo & identity",
          "Brand guidelines",
          "Всё из Product Design",
          "Marketing materials",
          "Motion design",
        ],
        popular: false,
      },
    ],
  },
];

// ============================================
// КОМПОНЕНТЫ СЕКЦИЙ
// ============================================

function HeroSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <NoirPixelBackground variant="film" intensity="low" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-8">
            <Sparkles className="w-4 h-4" />
            7+ лет опыта • 50+ проектов • $2M+ привлечено для клиентов
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">Превращаем идеи в</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            работающие продукты
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          Product Studio полного цикла: от стратегии и дизайна до разработки 
          и вывода на рынок. Специализация — Web3, сложные веб-приложения 
          и продуктовый маркетинг.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-xl overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10">Обсудить проект</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <a
            href="#calculator"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
          >
            Рассчитать стоимость
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-white/40 mb-6">Работали с</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            {["Realting.uz", "Done App", "VODeco DAO", "Everscale"].map((name) => (
              <span key={name} className="text-white/60 font-medium">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Знакомо?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Большинство проектов сталкиваются с одними и теми же проблемами. 
            Мы знаем как их решать.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Clock,
              title: "Срыв сроков",
              description: "Обещали за 2 месяца, прошло полгода — результатов нет",
            },
            {
              icon: Target,
              title: "Нет фокуса",
              description: "Делают всё подряд, а не то что реально нужно бизнесу",
            },
            {
              icon: Shield,
              title: "Технический долг",
              description: "Быстро наклепали, а переписывать придется с нуля",
            },
            {
              icon: Users,
              title: "Нет пользователей",
              description: "Продукт готов, но никто не приходит",
            },
            {
              icon: TrendingUp,
              title: "Не масштабируется",
              description: "На 100 пользователей работает, на 1000 падает",
            },
            {
              icon: MessageCircle,
              title: "Коммуникация",
              description: "2 недели ждете ответа на простой вопрос",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <item.icon className="w-8 h-8 text-white/40 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/50 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceSelector({ 
  selectedId, 
  onSelect 
}: { 
  selectedId: string; 
  onSelect: (id: string) => void;
}) {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Выберите направление
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Каждое направление — это глубокая экспертиза, а не просто "тоже делаем"
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_CATEGORIES.map((category, i) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(category.id)}
              className={`relative p-6 rounded-2xl text-left transition-all duration-300 ${
                selectedId === category.id
                  ? "bg-white/10 border-2 border-white/30"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <category.icon className="w-6 h-6" style={{ color: category.color }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{category.shortTitle}</h3>
              <p className="text-white/50 text-sm">{category.description}</p>
              
              {selectedId === category.id && (
                <motion.div
                  layoutId="selectedIndicator"
                  className="absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceDetail({ 
  category, 
  onOpenContact 
}: { 
  category: typeof SERVICE_CATEGORIES[0];
  onOpenContact: () => void;
}) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: `${category.color}20`, color: category.color }}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.title}</span>
              </div>
            </div>

            {/* Pain Points & Solutions */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {/* Pain Points */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="text-red-400">Боли</span> которые решаем
                </h3>
                <div className="space-y-4">
                  {category.painPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10"
                    >
                      <span className="text-red-400 mt-0.5">×</span>
                      <p className="text-white/70 text-sm">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="text-emerald-400">Как</span> решаем
                </h3>
                <div className="space-y-4">
                  {category.solutions.map((solution, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <solution.icon className="w-5 h-5 text-emerald-400" />
                        <h4 className="font-medium text-white">{solution.title}</h4>
                      </div>
                      <p className="text-white/60 text-sm">{solution.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Packages */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white text-center mb-12">
                Пакеты услуг
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {category.packages.map((pkg, i) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative p-6 rounded-2xl ${
                      pkg.popular
                        ? "bg-white/10 border-2 border-white/30"
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 bg-white text-black text-xs font-semibold rounded-full">
                          Популярное
                        </span>
                      </div>
                    )}
                    
                    <h4 className="text-lg font-semibold text-white mb-2">{pkg.name}</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-white">{pkg.price}</span>
                    </div>
                    <p className="text-white/50 text-sm mb-2">{pkg.duration}</p>
                    <p className="text-white/70 text-sm mb-6">{pkg.description}</p>
                    
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm text-white/60">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={onOpenContact}
                      className={`w-full py-3 rounded-xl font-medium transition-all ${
                        pkg.popular
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      Выбрать пакет
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "Углубляемся в проблему. Исследуем рынок, конкурентов, пользователей. Формируем гипотезы.",
      duration: "1-2 недели",
    },
    {
      number: "02",
      title: "Strategy & Design",
      description: "Проектируем архитектуру, создаем дизайн, планируем разработку. Вы знаете ЧТО будет до начала работ.",
      duration: "2-4 недели",
    },
    {
      number: "03",
      title: "Development",
      description: "Пишем код с двухнедельными спринтами. Регулярные демо, полная прозрачность процесса.",
      duration: "4-16 недель",
    },
    {
      number: "04",
      title: "Launch & Growth",
      description: "Запускаем, анализируем метрики, оптимизируем. Помогаем найти первых пользователей.",
      duration: "Постоянно",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Как мы работаем
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Не просто пишем код, а создаем продукт. Вместе с вами на каждом этапе.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full">
                <span className="text-5xl font-bold text-white/10">{step.number}</span>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm mb-4">{step.description}</p>
                <span className="text-xs text-white/30">{step.duration}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Почему цены начинаются от $8,000?",
      answer: "Мы делаем продукты, а не 'сайты за $500'. Каждый проект включает исследование, стратегию, дизайн, разработку и тестирование. Если бюджет меньше — скорее всего, вам нужен шаблонный решение, а не кастомная разработка.",
    },
    {
      question: "Какие гарантии на результат?",
      answer: "Мы работаем поэтапно с оплатой за результат. Если на каком-то этапе вы не удовлетворены — можете остановиться без обязательств за следующие этапы. Также даем гарантию на исправление багов в течение срока поддержки.",
    },
    {
      question: "Сколько времени занимает проект?",
      answer: "MVP — 6-10 недель. Полноценный продукт — 3-6 месяцев. Точные сроки зависят от сложности и всегда прописываются в контракте со штрафами за просрочку с нашей стороны.",
    },
    {
      question: "Как происходит коммуникация?",
      answer: "Еженедельные видеозвонки для синхронизации, ежедневные обновления в Telegram/Slack, доступ к трекеру задач. Вы всегда знаете на каком этапе проект.",
    },
    {
      question: "Что нужно от меня для старта?",
      answer: "На Discovery этапе нам нужно понимание проблемы которую вы решаете и целевую аудиторию. Если у вас есть ТЗ — отлично. Если нет — поможем сформулировать.",
    },
    {
      question: "Работаете ли со стартапами на pre-seed?",
      answer: "Да, но выборочно. Для стартапов на ранней стадии у нас специальные условия с отсрочкой части платежа или equity. Напишите о своем проекте — обсудим.",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Частые вопросы
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-white/60">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 overflow-hidden"
        >
          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Готовы обсудить ваш проект?
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
              Бесплатная 30-минутная консультация. Разберем вашу задачу, 
              предложим решение, оценим сроки и бюджет.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onOpenContact}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:scale-105 transition-transform"
              >
                Записаться на звонок
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="https://t.me/timur_sama"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Написать в Telegram
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm">
                Или напишите на почту: {" "}
                <a href="mailto:hello@foxampy.com" className="text-white/60 hover:text-white underline">
                  hello@foxampy.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ
// ============================================

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("web3");
  const [isContactOpen, setIsContactOpen] = useState(false);

  const currentCategory = SERVICE_CATEGORIES.find((c) => c.id === selectedCategory)!;

  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection onOpenContact={() => setIsContactOpen(true)} />
      <ProblemSection />
      <ServiceSelector selectedId={selectedCategory} onSelect={setSelectedCategory} />
      <ServiceDetail 
        category={currentCategory} 
        onOpenContact={() => setIsContactOpen(true)} 
      />
      <ProcessSection />
      <FAQSection />
      <FinalCTA onOpenContact={() => setIsContactOpen(true)} />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

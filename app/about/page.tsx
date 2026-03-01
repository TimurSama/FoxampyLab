"use client";

/**
 * ABOUT PAGE - ОСНОВАТЕЛЬ И ЛАБОРАТОРИЯ
 * Персональная история + профессиональный опыт
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './about.module.css';

// Данные об опыте
const EXPERIENCE = [
  {
    period: '2025 — наст. время',
    role: 'Founder & Lead Producer',
    company: 'Foxampy Lab',
    location: 'Remote / International',
    description: 'Создание лаборатории для комплексной разработки digital-продуктов. Услуги для стартапов и корпораций: от исследований до запуска.',
    achievements: [
      'Запущено 4 проекта для клиентов из 3 стран',
      'Разработана экосистема мониторинга IoT',
      'Создан бренд дизайнерской одежды с выходом в прибыль $1,500+/мес',
    ],
  },
  {
    period: '2023 — 2024',
    role: 'Product & Research Lead',
    company: 'Realting.uz',
    location: 'Узбекистан • PropTech',
    description: 'Разработка цифровой платформы для рынка недвижимости Узбекистана. Полный цикл: исследования, архитектура, команда, запуск.',
    achievements: [
      'Архитектура Digital Title Registry на блокчейне',
      'Chain of Title — система истории сделок',
      'Фреймворк аккредитации риелторов',
      'Smart contracts для токенизации недвижимости',
    ],
  },
  {
    period: '2021 — 2023',
    role: 'Brand & Creative Lead',
    company: 'Done',
    location: 'Израиль • LogTech',
    description: 'Логистический стартап, переосмысление last-mile delivery. Брендинг, UX/UI, продакшн рекламных кампаний.',
    achievements: [
      'Полный ребрендинг и брендбук',
      'Запуск приложения от концепции до релиза',
      'Продюсирование рекламных кампаний (9.2M просмотров)',
      'Полевые исследования по всей стране',
    ],
  },
  {
    period: '2019 — 2021',
    role: 'Creative Director',
    company: 'UNICAP Invest',
    location: 'People-first PPP Fund',
    description: 'Инвестиционный фонд, фокус на социально значимых проектах. Стратегия, документация, презентации инвесторам.',
    achievements: [
      'Разработка бизнес-планов и WhitePaper',
      'Формирование портфеля инвестпроектов',
      'Стратегия выхода на новые рынки',
      'Презентации институциональным инвесторам',
    ],
  },
  {
    period: '2018 — 2020',
    role: 'Assistant Marketing Director',
    company: 'Culligan Eurasia',
    location: 'CleanTech',
    description: 'Глобальный лидер в водоочистке. Муниципальные тендеры, B2B маркетинг, управление командами.',
    achievements: [
      'Подготовка тендеров на $50M+',
      'Участие в росте капитализации до $6B',
      'Управление маркетингом в 12 странах',
      'Выставочные стенды и B2B события',
    ],
  },
];

// Навыки и экспертиза
const EXPERTISE = [
  { category: 'Product', skills: ['Product Strategy', 'Product Architecture', 'Go-to-Market', 'Roadmapping', 'Analytics'] },
  { category: 'Web3', skills: ['Tokenomics', 'Smart Contracts', 'DeFi', 'DAO', 'Blockchain Integration'] },
  { category: 'Tech', skills: ['React/Next.js', 'Node.js', 'PostgreSQL', 'AI/LLM Integration', 'System Design'] },
  { category: 'Design', skills: ['UX Research', 'UI Design', 'Design Systems', 'Prototyping', 'Motion Design'] },
];

// Философия
const PHILOSOPHY = [
  {
    title: 'Междисциплинарность',
    icon: '◈',
    description: 'Самые интересные решения рождаются на стыке областей. Комбинирую бизнес, дизайн и технологии для создания уникальных продуктов.',
  },
  {
    title: 'Системный подход',
    icon: '◉',
    description: 'Не создаю изолированные фичи. Строю экосистемы, где каждый элемент усиливает другие. Долгосрочная устойчивость важнее быстрых побед.',
  },
  {
    title: 'Практическая креативность',
    icon: '◆',
    description: 'Креативность — не про красивые картинки, а про неочевидные решения сложных проблем. Каждый проект — исследование + реализация.',
  },
];

export default function AboutPage() {
  return (
    <main className={styles.container}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroText}
          >
            <h1>
              <span className={styles.greeting}>Привет,</span>
              <br />
              <span className={styles.name}>я Тимур Садыков</span>
            </h1>
            <p className={styles.tagline}>
              Product Manager, Creative Technologist, Founder
            </p>
            <p className={styles.description}>
              7+ лет создаю digital-продукты на пересечении бизнеса, 
              дизайна и технологий. Работал в Израиле, Узбекистане, 
              сейчас строю Foxampy Lab — лабораторию для сложных проектов.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="/contact" className={styles.ctaPrimary}>
                Обсудить проект →
              </Link>
              <Link href="/services" className={styles.ctaSecondary}>
                Услуги и цены
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.heroImage}
          >
            <div className={styles.imageFrame}>
              <Image
                src="/photo/слева.png"
                alt="Тимур Садыков"
                width={400}
                height={500}
                className={styles.photo}
                priority
              />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.imageDeco}>
              <span>◈</span>
              <span>7+ лет опыта</span>
              <span>12+ стран</span>
              <span>Web3 эксперт</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ФИЛОСОФИЯ */}
      <section className={styles.philosophy}>
        <h2 className={styles.sectionTitle}>ПРИНЦИПЫ РАБОТЫ</h2>
        <div className={styles.philosophyGrid}>
          {PHILOSOPHY.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={styles.philosophyCard}
            >
              <span className={styles.philosophyIcon}>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ЭКСПЕРТИЗА */}
      <section className={styles.expertise}>
        <h2 className={styles.sectionTitle}>ЭКСПЕРТИЗА</h2>
        <div className={styles.expertiseGrid}>
          {EXPERTISE.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={styles.expertiseCard}
            >
              <h3>{category.category}</h3>
              <ul>
                {category.skills.map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ОПЫТ */}
      <section className={styles.experience}>
        <h2 className={styles.sectionTitle}>КАРЬЕРНЫЙ ПУТЬ</h2>
        <div className={styles.timeline}>
          {EXPERIENCE.map((job, index) => (
            <motion.div
              key={job.period}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.timelineItem}
            >
              <div className={styles.timelinePeriod}>{job.period}</div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h3>{job.role}</h3>
                  <span className={styles.company}>{job.company}</span>
                  <span className={styles.location}>{job.location}</span>
                </div>
                <p className={styles.timelineDescription}>{job.description}</p>
                <ul className={styles.achievements}>
                  {job.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ДОСТИЖЕНИЯ */}
      <section className={styles.achievementsSection}>
        <h2 className={styles.sectionTitle}>КЛЮЧЕВЫЕ ДОСТИЖЕНИЯ</h2>
        <div className={styles.achievementsGrid}>
          <motion.div 
            className={styles.achievementCard}
            whileHover={{ scale: 1.02 }}
          >
            <span className={styles.achievementNumber}>1</span>
            <h3>Победитель хакатона</h3>
            <p>1-е место на Everscale Elysium Hackathon с собственной командой разработчиков</p>
          </motion.div>

          <motion.div 
            className={styles.achievementCard}
            whileHover={{ scale: 1.02 }}
          >
            <span className={styles.achievementNumber}>9.2M</span>
            <h3>Просмотров на YouTube</h3>
            <p>Режиссер и сценарист рекламной кампании для логистического стартапа</p>
          </motion.div>

          <motion.div 
            className={styles.achievementCard}
            whileHover={{ scale: 1.02 }}
          >
            <span className={styles.achievementNumber}>7+</span>
            <h3>Лет в продукте</h3>
            <p>От junior marketer до founder. Полный цикл управления продуктами.</p>
          </motion.div>

          <motion.div 
            className={styles.achievementCard}
            whileHover={{ scale: 1.02 }}
          >
            <span className={styles.achievementNumber}>4</span>
            <h3>Страны опыта</h3>
            <p>Беларусь, Израиль, Узбекистан, международные проекты</p>
          </motion.div>
        </div>
      </section>

      {/* КОНТАКТ CTA */}
      <section className={styles.contactCTA}>
        <h2>Давайте создадим что-то важное</h2>
        <p>
          Открыт к проектам в Web3, PropTech, AI. 
          Готов выйти на проект за 48 часов.
        </p>
        <div className={styles.contactOptions}>
          <a href="mailto:timursama96@gmail.com" className={styles.contactLink}>
            timursama96@gmail.com
          </a>
          <a href="https://t.me/foxampy" className={styles.contactLink}>
            @foxampy
          </a>
          <Link href="/contact" className={styles.ctaPrimary}>
            Форма обратной связи →
          </Link>
        </div>
      </section>
    </main>
  );
}

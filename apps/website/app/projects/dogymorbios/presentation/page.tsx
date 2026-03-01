"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Map, Users, ShoppingBag, Coins, Gamepad2, MessageSquare, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import Timeline from '@/components/presentation/Timeline';
import { getIntroductionSlides, getWhitepaperSections } from './slides';

const introductionSlides = [
  {
    id: 1,
    title: "Dogymorbios",
    subtitle: "Комплексная DAO-платформа для владельцев собак",
    content: "Dogymorbios — это уникальная экосистема, объединяющая социальную сеть, геймификацию, AI-помощника, DAO-управление и маркетплейс в единую платформу для владельцев собак. Мы создаем самую дружелюбную и инновационную среду, где собаки и их владельцы могут общаться, развиваться и зарабатывать.",
    visual: "platform"
  },
  {
    id: 2,
    title: "Проблемы владельцев собак",
    content: [
      "Сложно найти единомышленников для прогулок",
      "Нет единого места для отслеживания здоровья питомца",
      "Отсутствие мотивации для регулярных прогулок",
      "Фрагментация сервисов (ветеринар, груминг, магазины)",
      "Нет системы обучения и развития навыков собаки",
      "Отсутствие безопасных способов знакомства с другими собаками"
    ],
    visual: "problems"
  },
  {
    id: 3,
    title: "Наше решение",
    content: [
      "Интерактивная карта с GPS-трекингом прогулок",
      "Социальная сеть с лентой новостей и общением",
      "Умный дейтинг для собак с алгоритмом совместимости",
      "Журнал здоровья с AI-рекомендациями",
      "Система тренировок и обучения",
      "Маркетплейс товаров и услуг",
      "Геймификация с наградами BoneCoin",
      "DAO-управление платформой сообществом"
    ],
    visual: "solution"
  },
  {
    id: 4,
    title: "Основные модули",
    content: [
      "Карта прогулок — GPS-трекинг, сбор косточек (Pokemon Go стиль)",
      "Социальная лента — посты, лайки-лапы, комментарии-уши",
      "Умный дейтинг — свайп-интерфейс с Match Score",
      "Журнал здоровья — дневник прогулок, тренировок, здоровья",
      "Система тренировок — программы обучения и развития",
      "Маркетплейс — товары и услуги для собак",
      "Задания и геймификация — ежедневные и недельные челленджи",
      "DAO — управление платформой через голосование"
    ],
    visual: "modules"
  },
  {
    id: 5,
    title: "BoneCoin экономика",
    content: [
      "Внутренняя валюта платформы для поощрения активности",
      "Способы заработка:",
      "• Прогулки (1 BoneCoin за 100м)",
      "• Публикация постов (5-20 BoneCoin)",
      "• Лайки и комментарии (1-2 BoneCoin)",
      "• Сбор косточек на карте (10-100 BoneCoin)",
      "• Выполнение заданий (50-500 BoneCoin)",
      "• Приглашение друзей (100 BoneCoin)",
      "Способы траты: покупки в магазине, стейкинг для DAO, премиум подписка"
    ],
    visual: "tokenomics"
  },
  {
    id: 6,
    title: "Уникальные особенности",
    content: [
      "Combo-Match система — алгоритм подбора по психотипу владельца и характеристикам собаки",
      "Двойная экономика — BoneCoin (основная валюта) и Yarn (премиум валюта)",
      "Геймификация прогулок — сбор виртуальных предметов во время реальных прогулок",
      "AI-помощник — анализ данных здоровья и персональные рекомендации",
      "Система уровней — от новичка до Императора собак (10 уровней)",
      "Достижения и NFT — коллекция наград за активность"
    ],
    visual: "features"
  },
  {
    id: 7,
    title: "Рыночные возможности",
    content: [
      "Рынок товаров и услуг для домашних животных: $152 млрд (США, 2024)",
      "Прогноз роста: $157 млрд к 2025 году",
      "68+ млн домохозяйств с собаками только в США",
      "Растущий тренд на цифровизацию ухода за питомцами",
      "Потенциал глобального масштабирования",
      "Монетизация через маркетплейс, подписки, рекламу и партнерства"
    ],
    visual: "market"
  },
  {
    id: 8,
    title: "Дорожная карта",
    content: [
      "Q1 2025 — Завершение MVP: карта, лента, профили, базовый журнал",
      "Q2 2025 — Умный дейтинг, система тренировок, расширенная геймификация",
      "Q3 2025 — AI-анализ, маркетплейс, партнерская программа",
      "Q4 2025 — DAO запуск, мобильные приложения, международное расширение",
      "2026 — Глобальное масштабирование, интеграции с ветеринарными клиниками"
    ],
    visual: "roadmap"
  }
];

// Старый массив удален - теперь используется getWhitepaperSections из slides.ts
const _oldWhitepaperSections = [
  {
    id: "overview",
    title: "Обзор проекта Dogymorbios",
    content: `Dogymorbios — это комплексная DAO-платформа для владельцев собак, объединяющая социальные функции, геймификацию, AI-помощника, маркетплейс и децентрализованное управление в единую экосистему.

Миссия: Создать самую дружелюбную и инновационную платформу для владельцев собак, где они могут находить единомышленников, отслеживать здоровье питомцев, участвовать в сообществе и зарабатывать виртуальную валюту за активность.

Целевая аудитория:
• Владельцы собак всех возрастов (18-65+)
• Городские жители, активные собачники
• Семьи с детьми
• Люди, заинтересованные в технологиях и сообществе`
  },
  {
    id: "architecture",
    title: "Архитектура платформы",
    content: `Платформа построена на модульной архитектуре:

1. Карта прогулок (Map Module):
   • Интерактивная карта с геолокацией
   • GPS-трекинг прогулок в реальном времени
   • Система сбора косточек (Pokemon Go стиль)
   • Маркеры локаций, магазинов, событий
   • Статистика прогулок и награды

2. Социальная лента (Feed Module):
   • Публикация постов с фото и видео
   • Двойные аватары (человек + собака)
   • Фирменная система лайков (PawHeart)
   • Фирменная система комментариев (EarBubble)
   • Геометки и фильтры

3. Умный дейтинг (Dating Module):
   • Свайп-интерфейс (Tinder-style)
   • Combo-Match алгоритм совместимости
   • Фильтры по породе, характеру, расстоянию
   • Система совпадений и чатов

4. Журнал здоровья (Journal Module):
   • Календарь записей
   • Типы: прогулки, тренировки, питание, ветеринар, груминг, настроение
   • AI-анализ и рекомендации
   • Статистика активности

5. Система тренировок (Training Module):
   • База упражнений и программ
   • Персональные программы тренировок
   • Отслеживание прогресса
   • Видео-инструкции

6. Маркетплейс (Store Module):
   • Товары и услуги для собак
   • Категории: корм, игрушки, здоровье, услуги
   • Партнерская программа
   • Оплата BoneCoin и фиат

7. Геймификация (Gamification):
   • Система уровней (10 уровней)
   • Достижения (20+ в 6 категориях)
   • Задания (ежедневные, недельные, челленджи)
   • BoneCoin экономика
   • NFT коллекция достижений

8. DAO модуль (DAO Module):
   • Голосование по предложениям
   • Управление казной
   • Распределение средств
   • Стейкинг для права голоса`
  },
  {
    id: "tokenomics",
    title: "BoneCoin экономика",
    content: `BoneCoin — внутренняя валюта платформы для поощрения активности пользователей.

Способы заработка BoneCoin:
• Прогулки: 1 BoneCoin за каждые 100 метров
• Публикация постов: 5-20 BoneCoin в зависимости от популярности
• Лайки: 1 BoneCoin за каждый лайк
• Комментарии: 2 BoneCoin за каждый комментарий
• Сбор косточек на карте: 10-100 BoneCoin в зависимости от редкости
• Выполнение заданий: 50-500 BoneCoin
• Приглашение друзей: 100 BoneCoin за каждого реферала
• Участие в событиях: 25-200 BoneCoin
• Покупки в магазине: кэшбек 5-10%

Способы траты BoneCoin:
• Покупка товаров в магазине
• Оплата услуг партнёров
• Стейкинг для DAO голосования
• Премиум подписка
• Покупка эксклюзивных NFT

Система уровней:
• Бронза (1-3): Новичок → Любитель собак → Активный владелец
• Серебро (4-5): Опытный собачник → Эксперт по собакам
• Золото (6-7): Мастер собаководства → Легенда Dogymorbis
• Платина (8-9): Амбассадор → Гуру собаководства
• Алмаз (10): Император собак

Достижения:
20+ достижений в 6 категориях:
• Прогулки: Первая прогулка, Энтузиаст, Марафонец
• Тренировки: Первая тренировка, Мастер тренировок
• Социальная активность: Первый пост, Популярный автор
• Сбор косточек: Первая косточка, Коллекционер
• Уровни: Опытный собачник, Император собак
• Рефералы: Первый друг, Социальный сетевщик`
  },
  {
    id: "features",
    title: "Ключевые функции",
    content: `Карта прогулок:
• GPS-трекинг в реальном времени
• Старт/остановка записи прогулки
• Отображение пройденного расстояния и времени
• Маркеры парков, площадок, магазинов
• Маркеры других пользователей онлайн
• Система сбора косточек (5 типов: BONE, YARN_BALL, TREAT, TOY, GOLDEN_BONE)
• Автоматическая генерация каждые 15 минут
• 15+ локаций в каждом городе

Социальная лента:
• Публикация постов с текстом, фото и видео
• Двойные аватары (человек + собака)
• Фирменная система лайков PawHeart
• Фирменная система комментариев EarBubble
• Репосты и геометки
• Вкладки: Подписки, Топ, Группы, Рядом
• Начисление BoneCoin за активность

Умный дейтинг:
• Свайп-интерфейс для знакомств
• Combo-Match алгоритм:
  - Психотип владельца (EXTROVERT, INTROVERT, AMBIVERT)
  - Характеристики собаки (энергичность, социальность, обучаемость)
  - Match Score (0-100)
• Фильтры по расстоянию, породе, характеру
• Список совпадений и чаты

Журнал здоровья:
• Календарь записей
• Типы записей: прогулки, тренировки, питание, ветеринар, груминг, настроение
• Детальные записи с фото и геолокацией
• AI-рекомендации на основе данных
• Статистика активности
• Напоминания о прививках, визитах к ветеринару

Система тренировок:
• База упражнений (базовые команды, трюки, аджилити)
• Персональные программы тренировок
• Отслеживание прогресса
• Видео-инструкции
• Онлайн-тренировки с кинологами

Маркетплейс:
• Каталог товаров и услуг
• Категории: корм, игрушки, здоровье, услуги
• Фильтры и поиск
• Корзина и оплата (BoneCoin/фиат)
• Партнерская программа для бизнеса`
  },
  {
    id: "dao",
    title: "DAO Governance",
    content: `Децентрализованное автономное общество Dogymorbios обеспечивает:

Управление платформой:
• Голосование по новым функциям
• Изменение параметров платформы
• Распределение доходов
• Управление казной
• Выбор партнеров

Типы предложений:
• Новые функции
• Изменения в экономике (BoneCoin)
• Партнерства
• Сообщество и события
• Благотворительность

Процесс голосования:
1. Создание предложения (требуется стейкинг BoneCoin)
2. Обсуждение сообществом (7 дней)
3. Голосование (7-30 дней)
4. Кворум: минимум 5% от общего стейка
5. Реализация принятых предложений

Стейкинг:
• Вес голоса = количество застейканных BoneCoin
• Делегирование голосов
• История голосований
• Уведомления о новых предложениях

Бюджет и казна:
• Поступления: комиссии с продаж, подписки
• Расходы: события, разработка, маркетинг
• Прозрачные отчеты
• Аудит`
  },
  {
    id: "ai",
    title: "AI-помощник",
    content: `Персональный AI-ассистент для анализа данных о здоровье питомцев:

Функции:
• Анализ журнала прогулок и активности
• Выявление паттернов поведения
• Рекомендации по здоровью на основе данных
• Прогнозы рисков здоровья
• Персональные советы по уходу
• Рекомендации по питанию
• Рекомендации по тренировкам
• Предупреждения о рисках

Персональные планы:
• План тренировок (на основе породы, возраста, целей)
• План питания (рекомендации по корму и режиму)
• План прогулок (оптимальная частота и длительность)
• План здоровья (профилактика, прививки, визиты к ветеринару)

Интеграция:
• OpenAI API для обработки естественного языка
• Анализ данных журнала
• Машинное обучение для выявления паттернов
• Персонализация рекомендаций`
  },
  {
    id: "marketplace",
    title: "Маркетплейс и партнерская программа",
    content: `Маркетплейс товаров и услуг:

Категории товаров:
• Корм и лакомства
• Игрушки и аксессуары
• Здоровье (лекарства, витамины)
• Одежда и обувь
• Оборудование для тренировок

Категории услуг:
• Ветеринария
• Груминг
• Дрессировка
• Выгул собак
• Передержка
• Гостиницы для животных
• Страхование

Партнерская программа:
• Дашборд партнёра с аналитикой
• Статистика: доход, заказы, просмотры, конверсия
• Управление товарами/услугами
• Управление бронированиями
• Реферальная программа с кэшбеком
• Рейтинг и отзывы

Монетизация:
• Комиссия с продаж: 10-15%
• Премиум размещение: платная подписка
• Реклама в ленте: нативная реклама
• Спонсорские публикации`
  },
  {
    id: "technology",
    title: "Технологический стек",
    content: `Frontend:
• Next.js 14 с App Router
• TypeScript
• Tailwind CSS с дизайн-токенами
• Framer Motion для анимаций
• Zustand для state management
• Mapbox GL / Google Maps API для карт
• PWA с офлайн-режимом

Backend:
• Fastify (Node.js)
• TypeScript
• Prisma ORM
• PostgreSQL (продакшен) / SQLite (разработка)
• JWT аутентификация
• WebSocket (Socket.io) для real-time

Инфраструктура:
• Docker & Docker Compose
• Nginx
• CI/CD через GitHub Actions
• Мониторинг через Pino

Интеграции:
• Google Maps API / Mapbox GL
• Stripe для платежей
• OpenAI API для AI-помощника
• Firebase для push-уведомлений
• Web3 для блокчейн интеграции (будущее)`
  },
  {
    id: "business-model",
    title: "Бизнес-модель",
    content: `Источники дохода:

1. Комиссии с маркетплейса:
   • 10-15% с каждой продажи товаров
   • 15-20% с продажи услуг
   • Прогноз: $500K в год 1, $2M в год 3

2. Подписки:
   • Базовый план: бесплатно
   • Премиум: $9.99/месяц (расширенные функции, без рекламы)
   • Профессионал: $19.99/месяц (для партнеров)
   • Прогноз: $300K в год 1, $1.5M в год 3

3. Реклама:
   • Нативная реклама в ленте
   • Спонсорские публикации
   • Реклама партнеров на карте
   • Прогноз: $200K в год 1, $1M в год 3

4. Партнерская программа:
   • Комиссии с рефералов
   • Премиум размещение для партнеров
   • Прогноз: $100K в год 1, $500K в год 3

5. BoneCoin:
   • Продажа BoneCoin пользователям
   • Комиссии с транзакций
   • Прогноз: $150K в год 1, $800K в год 3

Общий прогноз доходов:
• Год 1: $1.25M
• Год 2: $3.5M
• Год 3: $5.8M`
  },
  {
    id: "roadmap",
    title: "Дорожная карта развития",
    content: `Q1 2025: MVP Completion
• Завершение карты с GPS-трекингом
• Социальная лента с медиа
• Умный дейтинг
• Базовый журнал здоровья
• Цель: 1,000 активных пользователей

Q2 2025: Расширенные функции
• AI-анализ журнала
• Система тренировок
• Расширенная геймификация
• Маркетплейс (бета)
• Цель: 5,000 пользователей

Q3 2025: Монетизация и партнеры
• Полноценный маркетплейс
• Партнерская программа
• Мобильные приложения (iOS/Android)
• DAO запуск
• Цель: 15,000 пользователей

Q4 2025: Масштабирование
• Интеграции с ветеринарными клиниками
• Расширение на новые города
• Международное расширение
• Блокчейн интеграция
• Цель: 50,000 пользователей

2026: Глобальное расширение
• Расширение на новые страны
• Партнерства с зоомагазинами
• Интеграции с фитнес-трекерами
• Расширенная AI функциональность
• Цель: 200,000+ пользователей`
  },
  {
    id: "team",
    title: "Команда и партнеры",
    content: `Команда разработки:
• Опытные разработчики full-stack решений
• Дизайнеры UX/UI с опытом в социальных сетях
• Специалисты по геймификации
• AI/ML инженеры

Консультанты:
• Ветеринары и кинологи
• Эксперты по поведению собак
• Специалисты по маркетплейсам
• Блокчейн консультанты

Партнерства:
• Зоомагазины и ветеринарные клиники
• Груминг-салоны и кинологические центры
• Производители товаров для собак
• Образовательные платформы

Инвесторы:
• Seed раунд: $42K (завершен)
• Целевой раунд: $315K
• Стратегические партнеры для роста`
  },
  {
    id: "financials",
    title: "Финансовая модель",
    content: `Текущий статус:
• Инвестиции: $42K из $315K (13% прогресс)
• Статус: Pilot (MVP в разработке)

Использование средств:
• 35% — Разработка платформы
• 25% — Команда и операционные расходы
• 20% — Маркетинг и привлечение пользователей
• 10% — Партнерства и интеграции
• 10% — Резерв и непредвиденные расходы

Прогноз роста пользователей:
• Месяц 1-3: 1,000 пользователей
• Месяц 4-6: 5,000 пользователей
• Месяц 7-9: 15,000 пользователей
• Месяц 10-12: 50,000 пользователей

Метрики успеха:
• Retention rate: >50% (месяц 1)
• Daily Active Users: >40% от MAU
• Средний доход на пользователя: $25/год
• Lifetime Value: $100+
• Customer Acquisition Cost: <$10

Ключевые показатели:
• Прогресс разработки: 13%
• Активных пользователей: цель 1,000 к Q1 2025
• Партнеров: цель 50 к Q3 2025
• Рейтинг: цель 4.5+ звезд`
  }
];

export default function DogymorbiosPresentation() {
  const { t, language } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showIntroduction, setShowIntroduction] = useState(true);

  // Финансовые данные проекта
  const totalBudget = 315000; // $315K
  const totalInvested = 42000; // $42K

  const introductionSlides = getIntroductionSlides(language);
  const whitepaperSections = getWhitepaperSections(language);

  const roadmapItems = [
    {
      period: 'Q1 2025',
      title: language === 'ru' ? 'MVP Completion' : 'MVP Completion',
      description: language === 'ru'
        ? 'Карта с GPS-трекингом, социальная лента, умный дейтинг, базовый журнал'
        : 'Map with GPS tracking, social feed, smart dating, basic journal',
      status: 'current' as const,
      budget: {
        allocated: 110000,
        spent: 42000,
        breakdown: [
          { category: language === 'ru' ? 'Разработка карты' : 'Map Development', amount: 40000, description: language === 'ru' ? 'GPS трекинг и косточки' : 'GPS tracking & bones' },
          { category: language === 'ru' ? 'Социальная лента' : 'Social Feed', amount: 35000, description: language === 'ru' ? 'Посты и взаимодействия' : 'Posts & interactions' },
          { category: language === 'ru' ? 'Умный дейтинг' : 'Smart Dating', amount: 20000, description: language === 'ru' ? 'Combo-Match алгоритм' : 'Combo-Match algorithm' },
          { category: language === 'ru' ? 'Журнал здоровья' : 'Health Journal', amount: 15000, description: language === 'ru' ? 'Базовый функционал' : 'Basic functionality' },
        ]
      }
    },
    {
      period: 'Q2 2025',
      title: language === 'ru' ? 'Расширенные функции' : 'Extended Features',
      description: language === 'ru'
        ? 'AI-анализ, система тренировок, расширенная геймификация, маркетплейс (бета)'
        : 'AI analysis, training system, extended gamification, marketplace (beta)',
      status: 'upcoming' as const,
      budget: {
        allocated: 80000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'AI-анализ' : 'AI Analysis', amount: 30000, description: language === 'ru' ? 'AI-помощник и рекомендации' : 'AI assistant & recommendations' },
          { category: language === 'ru' ? 'Система тренировок' : 'Training System', amount: 25000, description: language === 'ru' ? 'Программы и упражнения' : 'Programs & exercises' },
          { category: language === 'ru' ? 'Геймификация' : 'Gamification', amount: 15000, description: language === 'ru' ? 'Уровни и достижения' : 'Levels & achievements' },
          { category: language === 'ru' ? 'Маркетплейс (бета)' : 'Marketplace (Beta)', amount: 10000, description: language === 'ru' ? 'Базовый функционал' : 'Basic functionality' },
        ]
      }
    },
    {
      period: 'Q3 2025',
      title: language === 'ru' ? 'Монетизация и партнеры' : 'Monetization and Partners',
      description: language === 'ru'
        ? 'Полноценный маркетплейс, партнерская программа, мобильные приложения, DAO запуск'
        : 'Full marketplace, partner program, mobile apps, DAO launch',
      status: 'upcoming' as const,
      budget: {
        allocated: 70000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'Маркетплейс' : 'Marketplace', amount: 25000, description: language === 'ru' ? 'Полный функционал' : 'Full functionality' },
          { category: language === 'ru' ? 'Партнерская программа' : 'Partner Program', amount: 20000, description: language === 'ru' ? 'Дашборд и аналитика' : 'Dashboard & analytics' },
          { category: language === 'ru' ? 'Мобильные приложения' : 'Mobile Apps', amount: 15000, description: language === 'ru' ? 'iOS и Android' : 'iOS & Android' },
          { category: language === 'ru' ? 'DAO запуск' : 'DAO Launch', amount: 10000, description: language === 'ru' ? 'Голосование и управление' : 'Voting & governance' },
        ]
      }
    },
    {
      period: 'Q4 2025',
      title: language === 'ru' ? 'Масштабирование' : 'Scaling',
      description: language === 'ru'
        ? 'Интеграции с ветеринарными клиниками, расширение на новые города, международное расширение'
        : 'Veterinary clinic integrations, expansion to new cities, international expansion',
      status: 'upcoming' as const,
      budget: {
        allocated: 55000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'Интеграции' : 'Integrations', amount: 25000, description: language === 'ru' ? 'Ветеринарные клиники' : 'Veterinary clinics' },
          { category: language === 'ru' ? 'Расширение городов' : 'City Expansion', amount: 20000, description: language === 'ru' ? 'Новые локации' : 'New locations' },
          { category: language === 'ru' ? 'Международное расширение' : 'International Expansion', amount: 10000, description: language === 'ru' ? 'Новые страны' : 'New countries' },
        ]
      }
    },
  ];

  const nextSlide = () => {
    if (showIntroduction && currentSlide < introductionSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (showIntroduction && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToWhitepaper = () => {
    setShowIntroduction(false);
    setCurrentSlide(0);
  };

  const goToIntroduction = () => {
    setShowIntroduction(true);
    setCurrentSlide(0);
  };

  return (
    <div className="relative min-h-screen bg-transparent text-[#E0E0E0]">
      <Header />

      <main className="relative z-10 pt-20 md:pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/hub"
              className="font-mono text-sm text-[#E0E0E0]/60 hover:text-[#E0E0E0] transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('presentation.back')} {language === 'ru' ? 'к HUB' : 'to HUB'}
            </Link>

            <div className="flex gap-4">
              <button
                onClick={goToIntroduction}
                className={`font-mono text-sm px-4 py-2 border transition-all ${showIntroduction
                    ? 'border-[#E0E0E0] bg-[#E0E0E0]/10 text-[#E0E0E0]'
                    : 'border-[#E0E0E0]/20 text-[#E0E0E0]/60 hover:border-[#E0E0E0]/40'
                  }`}
              >
                {t('presentation.introduction')}
              </button>
              <button
                onClick={goToWhitepaper}
                className={`font-mono text-sm px-4 py-2 border transition-all ${!showIntroduction
                    ? 'border-[#E0E0E0] bg-[#E0E0E0]/10 text-[#E0E0E0]'
                    : 'border-[#E0E0E0]/20 text-[#E0E0E0]/60 hover:border-[#E0E0E0]/40'
                  }`}
              >
                {t('presentation.whitepaper')}
              </button>
            </div>
          </div>

          {showIntroduction && (
            <div className="relative">
              <div className="bg-glass-matte p-8 md:p-12 min-h-[600px] flex flex-col rounded-sm">
                <div className="flex-1">
                  <div className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-mono font-light tracking-tight text-[#E0E0E0] mb-4">
                      {introductionSlides[currentSlide].title}
                    </h1>
                    {introductionSlides[currentSlide].subtitle && (
                      <p className="font-mono text-lg text-[#E0E0E0]/80">
                        {introductionSlides[currentSlide].subtitle}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 text-[#E0E0E0]/90">
                    {Array.isArray(introductionSlides[currentSlide].content) ? (
                      <ul className="space-y-3">
                        {introductionSlides[currentSlide].content.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#E0E0E0]/40 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg leading-relaxed">{introductionSlides[currentSlide].content}</p>
                    )}

                    {/* Визуализация дорожной карты для слайда 8 */}
                    {currentSlide === 7 && (
                      <div className="mt-8">
                        <Timeline
                          items={roadmapItems}
                          totalBudget={totalBudget}
                          totalInvested={totalInvested}
                          showBudget={true}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-8 border-t border-[#E0E0E0]/10">
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="font-mono text-sm px-6 py-3 border border-[#E0E0E0]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#E0E0E0]/40 transition-all flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t('presentation.prev')}
                  </button>

                  <div className="flex gap-2">
                    {introductionSlides.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-[#E0E0E0]' : 'bg-[#E0E0E0]/20'
                          }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {currentSlide === introductionSlides.length - 1 ? (
                      <button
                        onClick={goToWhitepaper}
                        className="font-mono text-sm px-6 py-3 border border-[#E0E0E0] bg-[#E0E0E0]/10 hover:bg-[#E0E0E0]/20 transition-all flex items-center gap-2"
                      >
                        {t('presentation.whitepaper')}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={nextSlide}
                        className="font-mono text-sm px-6 py-3 border border-[#E0E0E0]/20 hover:border-[#E0E0E0]/40 transition-all flex items-center gap-2"
                      >
                        {t('presentation.next')}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showIntroduction && (
            <div className="space-y-6">
              {whitepaperSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-glass-matte p-8 md:p-12 rounded-sm"
                >
                  <h2 className="text-3xl md:text-4xl font-mono font-light tracking-tight text-[#E0E0E0] mb-6">
                    {section.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-[#E0E0E0]/90 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


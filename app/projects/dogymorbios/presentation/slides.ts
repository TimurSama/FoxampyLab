// Функция для получения слайдов с переводами
export const getIntroductionSlides = (language: string = 'ru') => {
  const isRu = language === 'ru';
  return [
  {
    id: 1,
    title: "Dogymorbios",
    subtitle: isRu ? "Комплексная DAO-платформа для владельцев собак" : "Comprehensive DAO platform for dog owners",
    content: isRu 
      ? "Dogymorbios — это уникальная экосистема, объединяющая социальную сеть, геймификацию, AI-помощника, DAO-управление и маркетплейс в единую платформу для владельцев собак. Мы создаем самую дружелюбную и инновационную среду, где собаки и их владельцы могут общаться, развиваться и зарабатывать."
      : "Dogymorbios is a unique ecosystem combining social network, gamification, AI assistant, DAO governance and marketplace into a single platform for dog owners. We create the most friendly and innovative environment where dogs and their owners can communicate, develop and earn.",
    visual: "platform"
  },
  {
    id: 2,
    title: isRu ? "Проблемы владельцев собак" : "Dog Owner Problems",
    content: isRu ? [
      "Сложно найти единомышленников для прогулок",
      "Нет единого места для отслеживания здоровья питомца",
      "Отсутствие мотивации для регулярных прогулок",
      "Фрагментация сервисов (ветеринар, груминг, магазины)",
      "Нет системы обучения и развития навыков собаки",
      "Отсутствие безопасных способов знакомства с другими собаками"
    ] : [
      "Hard to find like-minded people for walks",
      "No single place to track pet health",
      "Lack of motivation for regular walks",
      "Service fragmentation (veterinarian, grooming, stores)",
      "No system for training and developing dog skills",
      "No safe ways to meet other dogs"
    ],
    visual: "problems"
  },
  {
    id: 3,
    title: isRu ? "Наше решение" : "Our Solution",
    content: isRu ? [
      "Интерактивная карта с GPS-трекингом прогулок",
      "Социальная сеть с лентой новостей и общением",
      "Умный дейтинг для собак с алгоритмом совместимости",
      "Журнал здоровья с AI-рекомендациями",
      "Система тренировок и обучения",
      "Маркетплейс товаров и услуг",
      "Геймификация с наградами BoneCoin",
      "DAO-управление платформой сообществом"
    ] : [
      "Interactive map with GPS tracking for walks",
      "Social network with news feed and communication",
      "Smart dating for dogs with compatibility algorithm",
      "Health journal with AI recommendations",
      "Training and education system",
      "Marketplace for goods and services",
      "Gamification with BoneCoin rewards",
      "DAO governance of the platform by the community"
    ],
    visual: "solution"
  },
  {
    id: 4,
    title: isRu ? "Основные модули" : "Core Modules",
    content: isRu ? [
      "Карта прогулок — GPS-трекинг, сбор косточек (Pokemon Go стиль)",
      "Социальная лента — посты, лайки-лапы, комментарии-уши",
      "Умный дейтинг — свайп-интерфейс с Match Score",
      "Журнал здоровья — дневник прогулок, тренировок, здоровья",
      "Система тренировок — программы обучения и развития",
      "Маркетплейс — товары и услуги для собак",
      "Задания и геймификация — ежедневные и недельные челленджи",
      "DAO — управление платформой через голосование"
    ] : [
      "Walk Map — GPS tracking, bone collection (Pokemon Go style)",
      "Social Feed — posts, paw likes, ear comments",
      "Smart Dating — swipe interface with Match Score",
      "Health Journal — diary of walks, training, health",
      "Training System — learning and development programs",
      "Marketplace — goods and services for dogs",
      "Quests and Gamification — daily and weekly challenges",
      "DAO — platform governance through voting"
    ],
    visual: "modules"
  },
  {
    id: 5,
    title: isRu ? "BoneCoin экономика" : "BoneCoin Economy",
    content: isRu ? [
      "Внутренняя валюта платформы для поощрения активности",
      "Способы заработка:",
      "• Прогулки (1 BoneCoin за 100м)",
      "• Публикация постов (5-20 BoneCoin)",
      "• Лайки и комментарии (1-2 BoneCoin)",
      "• Сбор косточек на карте (10-100 BoneCoin)",
      "• Выполнение заданий (50-500 BoneCoin)",
      "• Приглашение друзей (100 BoneCoin)",
      "Способы траты: покупки в магазине, стейкинг для DAO, премиум подписка"
    ] : [
      "Internal platform currency to reward activity",
      "Ways to earn:",
      "• Walks (1 BoneCoin per 100m)",
      "• Posting (5-20 BoneCoin)",
      "• Likes and comments (1-2 BoneCoin)",
      "• Collecting bones on map (10-100 BoneCoin)",
      "• Completing quests (50-500 BoneCoin)",
      "• Inviting friends (100 BoneCoin)",
      "Ways to spend: store purchases, DAO staking, premium subscription"
    ],
    visual: "tokenomics"
  },
  {
    id: 6,
    title: isRu ? "Уникальные особенности" : "Unique Features",
    content: isRu ? [
      "Combo-Match система — алгоритм подбора по психотипу владельца и характеристикам собаки",
      "Двойная экономика — BoneCoin (основная валюта) и Yarn (премиум валюта)",
      "Геймификация прогулок — сбор виртуальных предметов во время реальных прогулок",
      "AI-помощник — анализ данных здоровья и персональные рекомендации",
      "Система уровней — от новичка до Императора собак (10 уровней)",
      "Достижения и NFT — коллекция наград за активность"
    ] : [
      "Combo-Match system — matching algorithm based on owner psychotype and dog characteristics",
      "Dual economy — BoneCoin (main currency) and Yarn (premium currency)",
      "Walk gamification — collecting virtual items during real walks",
      "AI assistant — health data analysis and personal recommendations",
      "Level system — from beginner to Dog Emperor (10 levels)",
      "Achievements and NFT — collection of rewards for activity"
    ],
    visual: "features"
  },
  {
    id: 7,
    title: isRu ? "Рыночные возможности" : "Market Opportunities",
    content: isRu ? [
      "Рынок товаров и услуг для домашних животных: $152 млрд (США, 2024)",
      "Прогноз роста: $157 млрд к 2025 году",
      "68+ млн домохозяйств с собаками только в США",
      "Растущий тренд на цифровизацию ухода за питомцами",
      "Потенциал глобального масштабирования",
      "Монетизация через маркетплейс, подписки, рекламу и партнерства"
    ] : [
      "Pet goods and services market: $152 billion (USA, 2024)",
      "Growth forecast: $157 billion by 2025",
      "68+ million households with dogs in USA alone",
      "Growing trend of pet care digitization",
      "Global scaling potential",
      "Monetization through marketplace, subscriptions, advertising and partnerships"
    ],
    visual: "market"
  },
  {
    id: 8,
    title: isRu ? "Дорожная карта" : "Roadmap",
    content: isRu ? [
      "Q1 2025 — Завершение MVP: карта, лента, профили, базовый журнал",
      "Q2 2025 — Умный дейтинг, система тренировок, расширенная геймификация",
      "Q3 2025 — AI-анализ, маркетплейс, партнерская программа",
      "Q4 2025 — DAO запуск, мобильные приложения, международное расширение",
      "2026 — Глобальное масштабирование, интеграции с ветеринарными клиниками"
    ] : [
      "Q1 2025 — MVP Completion: map, feed, profiles, basic journal",
      "Q2 2025 — Smart dating, training system, extended gamification",
      "Q3 2025 — AI analysis, marketplace, partner program",
      "Q4 2025 — DAO launch, mobile apps, international expansion",
      "2026 — Global scaling, integrations with veterinary clinics"
    ],
    visual: "roadmap"
  }
];
};

// Функция для получения whitepaper sections с переводами
export const getWhitepaperSections = (language: string = 'ru') => {
  const isRu = language === 'ru';
  return [
  {
    id: "overview",
    title: isRu ? "Обзор проекта Dogymorbios" : "Dogymorbios Project Overview",
    content: isRu 
      ? `Dogymorbios — это комплексная DAO-платформа для владельцев собак, объединяющая социальные функции, геймификацию, AI-помощника, маркетплейс и децентрализованное управление в единую экосистему.

Миссия: Создать самую дружелюбную и инновационную платформу для владельцев собак, где они могут находить единомышленников, отслеживать здоровье питомцев, участвовать в сообществе и зарабатывать виртуальную валюту за активность.

Целевая аудитория:
• Владельцы собак всех возрастов (18-65+)
• Городские жители, активные собачники
• Семьи с детьми
• Люди, заинтересованные в технологиях и сообществе`
      : `Dogymorbios is a comprehensive DAO platform for dog owners, combining social features, gamification, AI assistant, marketplace and decentralized governance into a single ecosystem.

Mission: Create the most friendly and innovative platform for dog owners where they can find like-minded people, track pet health, participate in the community and earn virtual currency for activity.

Target Audience:
• Dog owners of all ages (18-65+)
• Urban residents, active dog owners
• Families with children
• People interested in technology and community`
  },
  {
    id: "architecture",
    title: isRu ? "Архитектура платформы" : "Platform Architecture",
    content: isRu
      ? `Платформа построена на модульной архитектуре:

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
      : `Platform is built on modular architecture:

1. Walk Map (Map Module):
   • Interactive map with geolocation
   • Real-time GPS tracking of walks
   • Bone collection system (Pokemon Go style)
   • Location, store, event markers
   • Walk statistics and rewards

2. Social Feed (Feed Module):
   • Posting with photos and videos
   • Dual avatars (human + dog)
   • Branded like system (PawHeart)
   • Branded comment system (EarBubble)
   • Geotags and filters

3. Smart Dating (Dating Module):
   • Swipe interface (Tinder-style)
   • Combo-Match compatibility algorithm
   • Filters by breed, character, distance
   • Match and chat system

4. Health Journal (Journal Module):
   • Calendar entries
   • Types: walks, training, nutrition, veterinary, grooming, mood
   • AI analysis and recommendations
   • Activity statistics

5. Training System (Training Module):
   • Exercise and program database
   • Personal training programs
   • Progress tracking
   • Video instructions

6. Marketplace (Store Module):
   • Goods and services for dogs
   • Categories: food, toys, health, services
   • Partner program
   • Payment in BoneCoin and fiat

7. Gamification:
   • Level system (10 levels)
   • Achievements (20+ in 6 categories)
   • Quests (daily, weekly, challenges)
   • BoneCoin economy
   • NFT achievement collection

8. DAO Module:
   • Voting on proposals
   • Treasury management
   • Fund distribution
   • Staking for voting rights`
  },
  {
    id: "tokenomics",
    title: isRu ? "BoneCoin экономика" : "BoneCoin Economy",
    content: isRu
      ? `BoneCoin — внутренняя валюта платформы для поощрения активности пользователей.

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
      : `BoneCoin — internal platform currency to reward user activity.

Ways to earn BoneCoin:
• Walks: 1 BoneCoin per 100 meters
• Posting: 5-20 BoneCoin depending on popularity
• Likes: 1 BoneCoin per like
• Comments: 2 BoneCoin per comment
• Collecting bones on map: 10-100 BoneCoin depending on rarity
• Completing quests: 50-500 BoneCoin
• Inviting friends: 100 BoneCoin per referral
• Event participation: 25-200 BoneCoin
• Store purchases: 5-10% cashback

Ways to spend BoneCoin:
• Purchasing goods in store
• Paying for partner services
• Staking for DAO voting
• Premium subscription
• Purchasing exclusive NFTs

Level System:
• Bronze (1-3): Beginner → Dog Lover → Active Owner
• Silver (4-5): Experienced Dog Owner → Dog Expert
• Gold (6-7): Dog Breeding Master → Dogymorbis Legend
• Platinum (8-9): Ambassador → Dog Breeding Guru
• Diamond (10): Dog Emperor

Achievements:
20+ achievements in 6 categories:
• Walks: First Walk, Enthusiast, Marathoner
• Training: First Training, Training Master
• Social Activity: First Post, Popular Author
• Bone Collection: First Bone, Collector
• Levels: Experienced Dog Owner, Dog Emperor
• Referrals: First Friend, Social Networker`
  },
  {
    id: "features",
    title: isRu ? "Ключевые функции" : "Key Features",
    content: isRu
      ? `Карта прогулок:
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
      : `Walk Map:
• Real-time GPS tracking
• Start/stop walk recording
• Display distance and time traveled
• Park, playground, store markers
• Other online user markers
• Bone collection system (5 types: BONE, YARN_BALL, TREAT, TOY, GOLDEN_BONE)
• Automatic generation every 15 minutes
• 15+ locations in each city

Social Feed:
• Posting with text, photos and videos
• Dual avatars (human + dog)
• Branded PawHeart like system
• Branded EarBubble comment system
• Reposts and geotags
• Tabs: Subscriptions, Top, Groups, Nearby
• BoneCoin rewards for activity

Smart Dating:
• Swipe interface for dating
• Combo-Match algorithm:
  - Owner psychotype (EXTROVERT, INTROVERT, AMBIVERT)
  - Dog characteristics (energy, sociability, trainability)
  - Match Score (0-100)
• Filters by distance, breed, character
• Match list and chats

Health Journal:
• Calendar entries
• Entry types: walks, training, nutrition, veterinary, grooming, mood
• Detailed entries with photos and geolocation
• AI recommendations based on data
• Activity statistics
• Reminders for vaccinations, veterinary visits

Training System:
• Exercise database (basic commands, tricks, agility)
• Personal training programs
• Progress tracking
• Video instructions
• Online training with dog trainers

Marketplace:
• Goods and services catalog
• Categories: food, toys, health, services
• Filters and search
• Cart and payment (BoneCoin/fiat)
• Partner program for businesses`
  },
  {
    id: "dao",
    title: "DAO Governance",
    content: isRu
      ? `Децентрализованное автономное общество Dogymorbios обеспечивает:

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
      : `Dogymorbios Decentralized Autonomous Organization provides:

Platform Governance:
• Voting on new features
• Changing platform parameters
• Revenue distribution
• Treasury management
• Partner selection

Proposal Types:
• New features
• Economy changes (BoneCoin)
• Partnerships
• Community and events
• Charity

Voting Process:
1. Proposal creation (BoneCoin staking required)
2. Community discussion (7 days)
3. Voting (7-30 days)
4. Quorum: minimum 5% of total stake
5. Implementation of approved proposals

Staking:
• Vote weight = amount of staked BoneCoin
• Vote delegation
• Voting history
• Notifications about new proposals

Budget and Treasury:
• Income: sales commissions, subscriptions
• Expenses: events, development, marketing
• Transparent reports
• Audit`
  },
  {
    id: "ai",
    title: isRu ? "AI-помощник" : "AI Assistant",
    content: isRu
      ? `Персональный AI-ассистент для анализа данных о здоровье питомцев:

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
      : `Personal AI assistant for analyzing pet health data:

Functions:
• Analysis of walk journal and activity
• Behavior pattern detection
• Health recommendations based on data
• Health risk predictions
• Personal care advice
• Nutrition recommendations
• Training recommendations
• Risk warnings

Personal Plans:
• Training plan (based on breed, age, goals)
• Nutrition plan (food and schedule recommendations)
• Walk plan (optimal frequency and duration)
• Health plan (prevention, vaccinations, veterinary visits)

Integration:
• OpenAI API for natural language processing
• Journal data analysis
• Machine learning for pattern detection
• Recommendation personalization`
  },
  {
    id: "marketplace",
    title: isRu ? "Маркетплейс и партнерская программа" : "Marketplace and Partner Program",
    content: isRu
      ? `Маркетплейс товаров и услуг:

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
      : `Goods and Services Marketplace:

Product Categories:
• Food and treats
• Toys and accessories
• Health (medicines, vitamins)
• Clothing and footwear
• Training equipment

Service Categories:
• Veterinary
• Grooming
• Training
• Dog walking
• Pet sitting
• Pet hotels
• Insurance

Partner Program:
• Partner dashboard with analytics
• Statistics: revenue, orders, views, conversion
• Goods/services management
• Booking management
• Referral program with cashback
• Ratings and reviews

Monetization:
• Sales commission: 10-15%
• Premium placement: paid subscription
• Feed advertising: native ads
• Sponsored posts`
  },
  {
    id: "technology",
    title: isRu ? "Технологический стек" : "Technology Stack",
    content: isRu
      ? `Frontend:
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
      : `Frontend:
• Next.js 14 with App Router
• TypeScript
• Tailwind CSS with design tokens
• Framer Motion for animations
• Zustand for state management
• Mapbox GL / Google Maps API for maps
• PWA with offline mode

Backend:
• Fastify (Node.js)
• TypeScript
• Prisma ORM
• PostgreSQL (production) / SQLite (development)
• JWT authentication
• WebSocket (Socket.io) for real-time

Infrastructure:
• Docker & Docker Compose
• Nginx
• CI/CD via GitHub Actions
• Monitoring via Pino

Integrations:
• Google Maps API / Mapbox GL
• Stripe for payments
• OpenAI API for AI assistant
• Firebase for push notifications
• Web3 for blockchain integration (future)`
  },
  {
    id: "business-model",
    title: isRu ? "Бизнес-модель" : "Business Model",
    content: isRu
      ? `Источники дохода:

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
      : `Revenue Sources:

1. Marketplace Commissions:
   • 10-15% per product sale
   • 15-20% per service sale
   • Forecast: $500K year 1, $2M year 3

2. Subscriptions:
   • Basic plan: free
   • Premium: $9.99/month (extended features, ad-free)
   • Professional: $19.99/month (for partners)
   • Forecast: $300K year 1, $1.5M year 3

3. Advertising:
   • Native ads in feed
   • Sponsored posts
   • Partner ads on map
   • Forecast: $200K year 1, $1M year 3

4. Partner Program:
   • Referral commissions
   • Premium placement for partners
   • Forecast: $100K year 1, $500K year 3

5. BoneCoin:
   • BoneCoin sales to users
   • Transaction commissions
   • Forecast: $150K year 1, $800K year 3

Total Revenue Forecast:
• Year 1: $1.25M
• Year 2: $3.5M
• Year 3: $5.8M`
  },
  {
    id: "roadmap",
    title: isRu ? "Дорожная карта развития" : "Development Roadmap",
    content: isRu
      ? `Q1 2025: MVP Completion
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
      : `Q1 2025: MVP Completion
• Complete map with GPS tracking
• Social feed with media
• Smart dating
• Basic health journal
• Goal: 1,000 active users

Q2 2025: Extended Features
• AI journal analysis
• Training system
• Extended gamification
• Marketplace (beta)
• Goal: 5,000 users

Q3 2025: Monetization and Partners
• Full marketplace
• Partner program
• Mobile apps (iOS/Android)
• DAO launch
• Goal: 15,000 users

Q4 2025: Scaling
• Veterinary clinic integrations
• Expansion to new cities
• International expansion
• Blockchain integration
• Goal: 50,000 users

2026: Global Expansion
• Expansion to new countries
• Partnerships with pet stores
• Fitness tracker integrations
• Extended AI functionality
• Goal: 200,000+ users`
  },
  {
    id: "team",
    title: isRu ? "Команда и партнеры" : "Team and Partners",
    content: isRu
      ? `Команда разработки:
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
      : `Development Team:
• Experienced full-stack developers
• UX/UI designers with social media experience
• Gamification specialists
• AI/ML engineers

Consultants:
• Veterinarians and dog trainers
• Dog behavior experts
• Marketplace specialists
• Blockchain consultants

Partnerships:
• Pet stores and veterinary clinics
• Grooming salons and dog training centers
• Dog product manufacturers
• Educational platforms

Investors:
• Seed round: $42K (completed)
• Target round: $315K
• Strategic partners for growth`
  },
  {
    id: "financials",
    title: isRu ? "Финансовая модель" : "Financial Model",
    content: isRu
      ? `Текущий статус:
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
      : `Current Status:
• Investment: $42K of $315K (13% progress)
• Status: Pilot (MVP in development)

Use of Funds:
• 35% — Platform development
• 25% — Team and operational expenses
• 20% — Marketing and user acquisition
• 10% — Partnerships and integrations
• 10% — Reserve and unforeseen expenses

User Growth Forecast:
• Month 1-3: 1,000 users
• Month 4-6: 5,000 users
• Month 7-9: 15,000 users
• Month 10-12: 50,000 users

Success Metrics:
• Retention rate: >50% (month 1)
• Daily Active Users: >40% of MAU
• Average revenue per user: $25/year
• Lifetime Value: $100+
• Customer Acquisition Cost: <$10

Key Indicators:
• Development progress: 13%
• Active users: goal 1,000 by Q1 2025
• Partners: goal 50 by Q3 2025
• Rating: goal 4.5+ stars`
  }
];
};









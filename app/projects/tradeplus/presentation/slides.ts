// Функция для получения переводов слайдов
const getSlideTranslations = (language: string = 'ru') => {
  const translations: Record<string, any> = {
    ru: {
      slide1: {
        title: "TradePlus Institute",
        subtitle: "Полноценный институт инвестирования, брокерства и торговли",
        content: "TradePlus — это комплексная экосистема для профессиональной торговли, инвестирования и обучения. Платформа объединяет множественные криптовалютные биржи, инструменты анализа, автоматизацию стратегий, социальный трейдинг и DAO-управление в единую профессиональную среду."
      },
      slide2: {
        title: "Проблемы индустрии",
        content: [
          "Фрагментация инструментов — трейдеры используют множество платформ",
          "Отсутствие единой экосистемы для обучения и практики",
          "Сложность алгоритмической торговли для новичков",
          "Нет прозрачности в социальном трейдинге",
          "Отсутствие децентрализованного управления платформой",
          "Ограниченные возможности для институциональных инвесторов"
        ]
      },
      slide3: {
        title: "Наше решение",
        content: [
          "Единая платформа для всех аспектов торговли и инвестирования",
          "Интеграция множественных бирж в одном интерфейсе",
          "Профессиональные инструменты технического и фундаментального анализа",
          "Автоматизация торговых стратегий через алгоритмический трейдинг",
          "Социальный трейдинг с прозрачной репутацией",
          "DAO-управление для развития платформы",
          "Образовательная экосистема от новичка до профессионала"
        ]
      },
      slide4: {
        title: "Основные модули",
        content: [
          "Торговая платформа — мультибиржевой интерфейс",
          "Алгоритмический трейдинг — создание и запуск ботов",
          "Социальный трейдинг — копирование успешных трейдеров",
          "Портфельный менеджер — управление активами",
          "Аналитика — технический и фундаментальный анализ",
          "Образование — курсы, вебинары, сертификация",
          "DAO — управление платформой сообществом",
          "Маркетплейс стратегий и индикаторов"
        ]
      },
      slide5: {
        title: "Токеномика",
        content: [
          "Внутриигровой токен для начального этапа",
          "Функции токена:",
          "• Оплата комиссий со скидкой",
          "• Доступ к премиум функциям",
          "• Стейкинг для участия в DAO",
          "• Награды за активность и обучение",
          "• Реферальная программа",
          "• Доступ к эксклюзивным стратегиям",
          "Будущее: переход к полноценной токеномике после юридической подготовки"
        ]
      },
      slide6: {
        title: "Целевые аудитории",
        content: [
          "Новички — обучение и безопасная практика",
          "Опытные трейдеры — профессиональные инструменты",
          "Алгоритмические трейдеры — создание и продажа ботов",
          "Институциональные инвесторы — расширенные возможности",
          "Коучи и спикеры — монетизация знаний",
          "Разработчики стратегий — маркетплейс для продажи"
        ]
      },
      slide7: {
        title: "Конкурентные преимущества",
        content: [
          "Единственная платформа с полным циклом: обучение → практика → автоматизация",
          "Мультиблокчейн поддержка",
          "DAO-управление для прозрачности развития",
          "Социальный трейдинг с верифицированной репутацией",
          "Маркетплейс стратегий и индикаторов",
          "Интеграция с ведущими биржами мира"
        ]
      },
      slide8: {
        title: "Дорожная карта",
        content: [
          "Q1 2024 — MVP Development: базовая торговая платформа, интеграция бирж",
          "Q2-Q3 2024 — Beta Launch: алгоритмический трейдинг, социальный трейдинг",
          "Q4 2024 — Public Launch: маркетплейс, DAO запуск, мобильные приложения",
          "2025 — Expansion: институциональные функции, расширение на новые рынки"
        ]
      }
    },
    en: {
      slide1: {
        title: "TradePlus Institute",
        subtitle: "Full-fledged institute of investing, brokerage and trading",
        content: "TradePlus is a comprehensive ecosystem for professional trading, investing and education. The platform combines multiple cryptocurrency exchanges, analysis tools, strategy automation, social trading and DAO governance into a single professional environment."
      },
      slide2: {
        title: "Industry Problems",
        content: [
          "Tool fragmentation — traders use multiple platforms",
          "Lack of unified ecosystem for learning and practice",
          "Complexity of algorithmic trading for beginners",
          "No transparency in social trading",
          "Lack of decentralized platform governance",
          "Limited capabilities for institutional investors"
        ]
      },
      slide3: {
        title: "Our Solution",
        content: [
          "Unified platform for all aspects of trading and investing",
          "Integration of multiple exchanges in one interface",
          "Professional technical and fundamental analysis tools",
          "Trading strategy automation through algorithmic trading",
          "Social trading with transparent reputation",
          "DAO governance for platform development",
          "Educational ecosystem from beginner to professional"
        ]
      },
      slide4: {
        title: "Core Modules",
        content: [
          "Trading Platform — multi-exchange interface",
          "Algorithmic Trading — bot creation and launch",
          "Social Trading — copying successful traders",
          "Portfolio Manager — asset management",
          "Analytics — technical and fundamental analysis",
          "Education — courses, webinars, certification",
          "DAO — community platform governance",
          "Strategy and Indicator Marketplace"
        ]
      },
      slide5: {
        title: "Tokenomics",
        content: [
          "In-game token for initial stage",
          "Token functions:",
          "• Commission payment with discount",
          "• Access to premium features",
          "• Staking for DAO participation",
          "• Rewards for activity and learning",
          "• Referral program",
          "• Access to exclusive strategies",
          "Future: transition to full tokenomics after legal preparation"
        ]
      },
      slide6: {
        title: "Target Audiences",
        content: [
          "Beginners — learning and safe practice",
          "Experienced traders — professional tools",
          "Algorithmic traders — bot creation and sales",
          "Institutional investors — extended capabilities",
          "Coaches and speakers — knowledge monetization",
          "Strategy developers — marketplace for sales"
        ]
      },
      slide7: {
        title: "Competitive Advantages",
        content: [
          "Only platform with full cycle: learning → practice → automation",
          "Multi-blockchain support",
          "DAO governance for transparent development",
          "Social trading with verified reputation",
          "Strategy and indicator marketplace",
          "Integration with leading world exchanges"
        ]
      },
      slide8: {
        title: "Roadmap",
        content: [
          "Q1 2024 — MVP Development: basic trading platform, exchange integration",
          "Q2-Q3 2024 — Beta Launch: algorithmic trading, social trading",
          "Q4 2024 — Public Launch: marketplace, DAO launch, mobile apps",
          "2025 — Expansion: institutional features, expansion to new markets"
        ]
      }
    }
  };
  
  // Добавляем переводы для остальных языков (ar, es, pl, fr, de) используя английский как базовый
  const baseTranslations = translations['en'];
  const langMap: Record<string, string> = {
    ar: 'ar',
    es: 'es',
    pl: 'pl',
    fr: 'fr',
    de: 'de'
  };
  
  // Для остальных языков используем английский как fallback, но можно добавить полные переводы позже
  return translations[language] || translations['en'];
};

// Функция для получения слайдов с переводами
export const getIntroductionSlides = (language: string = 'ru') => {
  const t = getSlideTranslations(language);
  const isRu = language === 'ru';
  return [
  {
    id: 1,
    title: t.slide1.title,
    subtitle: t.slide1.subtitle,
    content: t.slide1.content,
    visual: "institute"
  },
  {
    id: 2,
    title: t.slide2.title,
    content: t.slide2.content,
    visual: "problems"
  },
  {
    id: 3,
    title: t.slide3.title,
    content: t.slide3.content,
    visual: "solution"
  },
  {
    id: 4,
    title: t.slide4.title,
    content: t.slide4.content,
    visual: "modules"
  },
  {
    id: 5,
    title: t.slide5.title,
    content: t.slide5.content,
    visual: "tokenomics"
  },
  {
    id: 6,
    title: t.slide6.title,
    content: t.slide6.content,
    visual: "audience"
  },
  {
    id: 7,
    title: t.slide7.title,
    content: t.slide7.content,
    visual: "advantages"
  },
  {
    id: 8,
    title: t.slide8.title,
    content: t.slide8.content,
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
    title: isRu ? "Обзор проекта TradePlus Institute" : "TradePlus Institute Project Overview",
    content: isRu 
      ? `TradePlus Institute — это комплексная децентрализованная экосистема для профессиональной торговли, инвестирования, обучения и развития финансовой грамотности. Платформа объединяет все аспекты торговой деятельности в единую профессиональную среду с поддержкой множественных криптовалютных бирж, алгоритмической торговли, социального трейдинга и DAO-управления.

Миссия: Создать наиболее полную и прозрачную платформу для торговли и инвестирования, где каждый участник может развиваться от новичка до профессионала, используя передовые технологии и коллективный интеллект сообщества.`
      : `TradePlus Institute is a comprehensive decentralized ecosystem for professional trading, investing, education and financial literacy development. The platform combines all aspects of trading activity into a single professional environment with support for multiple cryptocurrency exchanges, algorithmic trading, social trading and DAO governance.

Mission: Create the most complete and transparent platform for trading and investing, where every participant can grow from beginner to professional using advanced technologies and the collective intelligence of the community.`
  },
  {
    id: "architecture",
    title: isRu ? "Архитектура платформы" : "Platform Architecture",
    content: isRu
      ? `Платформа построена на модульной архитектуре:

1. Торговый модуль:
   • Мультибиржевая интеграция (Binance, Coinbase, Kraken, Bybit и др.)
   • Единый интерфейс для всех бирж
   • Управление ордерами и позициями
   • Real-time котировки и данные

2. Алгоритмический трейдинг:
   • Визуальный конструктор стратегий
   • Backtesting и оптимизация
   • Paper trading для тестирования
   • Marketplace для покупки/продажи ботов

3. Социальный трейдинг:
   • Копирование успешных трейдеров
   • Прозрачная статистика и репутация
   • Система рейтингов
   • Автоматическое копирование сделок

4. Аналитика:
   • Технический анализ (150+ индикаторов)
   • Фундаментальный анализ
   • On-chain аналитика
   • Sentiment анализ

5. Образование:
   • Курсы от новичка до профессионала
   • Интерактивные симуляторы
   • Сертификация трейдеров
   • Вебинары и мастер-классы

6. DAO модуль:
   • Голосование по развитию платформы
   • Управление казной
   • Распределение доходов
   • Принятие решений сообществом`
      : `Platform is built on modular architecture:

1. Trading Module:
   • Multi-exchange integration (Binance, Coinbase, Kraken, Bybit, etc.)
   • Unified interface for all exchanges
   • Order and position management
   • Real-time quotes and data

2. Algorithmic Trading:
   • Visual strategy builder
   • Backtesting and optimization
   • Paper trading for testing
   • Marketplace for buying/selling bots

3. Social Trading:
   • Copying successful traders
   • Transparent statistics and reputation
   • Rating system
   • Automatic trade copying

4. Analytics:
   • Technical analysis (150+ indicators)
   • Fundamental analysis
   • On-chain analytics
   • Sentiment analysis

5. Education:
   • Courses from beginner to professional
   • Interactive simulators
   • Trader certification
   • Webinars and masterclasses

6. DAO Module:
   • Voting on platform development
   • Treasury management
   • Revenue distribution
   • Community decision-making`
  },
  {
    id: "tokenomics",
    title: isRu ? "Токеномика и экономика" : "Tokenomics and Economics",
    content: isRu
      ? `Этап 1: Внутриигровой токен (текущий этап)
• Токен используется внутри платформы
• Оплата комиссий со скидкой (до 50%)
• Доступ к премиум функциям
• Стейкинг для участия в DAO
• Награды за активность и обучение
• Реферальная программа

Этап 2: Расширенная токеномика (после юридической подготовки)
• Полноценный utility токен
• Листинг на биржах
• Стейкинг с доходностью
• Governance токен для DAO
• Механизмы сжигания токенов
• Интеграция с DeFi протоколами

Распределение токенов:
• 40% — сообществу (награды, стейкинг)
• 25% — команде и партнерам (vesting 4 года)
• 20% — инвесторам (раунды финансирования)
• 10% — резерв и развитие
• 5% — ликвидность и маркетинг`
      : `Stage 1: In-game token (current stage)
• Token used within the platform
• Commission payment with discount (up to 50%)
• Access to premium features
• Staking for DAO participation
• Rewards for activity and learning
• Referral program

Stage 2: Extended tokenomics (after legal preparation)
• Full utility token
• Exchange listing
• Staking with yield
• Governance token for DAO
• Token burn mechanisms
• Integration with DeFi protocols

Token Distribution:
• 40% — community (rewards, staking)
• 25% — team and partners (4-year vesting)
• 20% — investors (funding rounds)
• 10% — reserve and development
• 5% — liquidity and marketing`
  },
  {
    id: "features",
    title: isRu ? "Ключевые функции" : "Key Features",
    content: isRu
      ? `Торговая платформа:
• Поддержка 20+ криптовалютных бирж
• Spot, Futures, Options торговля
• Маржинальная торговля
• Управление портфелем в реальном времени
• История сделок и аналитика

Алгоритмический трейдинг:
• Визуальный конструктор стратегий (no-code)
• Поддержка Python для продвинутых пользователей
• Backtesting на исторических данных
• Paper trading для безопасного тестирования
• Автоматическое исполнение стратегий
• Marketplace для покупки/продажи ботов

Социальный трейдинг:
• Копирование сделок успешных трейдеров
• Настройка параметров копирования (% капитала, фильтры)
• Прозрачная статистика трейдеров
• Система рейтингов и верификации
• Комиссии для успешных трейдеров

Образование:
• Базовые курсы по криптовалютам и трейдингу
• Продвинутые стратегии и техники
• Алгоритмический трейдинг от А до Я
• Управление рисками
• Психология трейдинга
• Сертификация по уровням

Аналитика:
• 150+ технических индикаторов
• Кастомные индикаторы и стратегии
• On-chain метрики (для криптовалют)
• Sentiment анализ социальных сетей
• Фундаментальный анализ активов
• Портфельная аналитика`
      : `Trading Platform:
• Support for 20+ cryptocurrency exchanges
• Spot, Futures, Options trading
• Margin trading
• Real-time portfolio management
• Trade history and analytics

Algorithmic Trading:
• Visual strategy builder (no-code)
• Python support for advanced users
• Backtesting on historical data
• Paper trading for safe testing
• Automatic strategy execution
• Marketplace for buying/selling bots

Social Trading:
• Copying trades from successful traders
• Copy parameter configuration (% capital, filters)
• Transparent trader statistics
• Rating and verification system
• Commissions for successful traders

Education:
• Basic courses on cryptocurrencies and trading
• Advanced strategies and techniques
• Algorithmic trading from A to Z
• Risk management
• Trading psychology
• Level-based certification

Analytics:
• 150+ technical indicators
• Custom indicators and strategies
• On-chain metrics (for cryptocurrencies)
• Social media sentiment analysis
• Fundamental asset analysis
• Portfolio analytics`
  },
  {
    id: "dao",
    title: "DAO Governance",
    content: isRu
      ? `Децентрализованное автономное общество TradePlus обеспечивает:

Управление платформой:
• Голосование по новым функциям
• Изменение параметров платформы
• Распределение доходов
• Управление казной
• Выбор партнеров и интеграций

Типы предложений:
• Технические улучшения
• Новые функции
• Изменения в экономике платформы
• Партнерства и интеграции
• Образовательные программы
• Сообщество и события

Процесс голосования:
1. Создание предложения (требуется стейкинг)
2. Обсуждение сообществом (7 дней)
3. Голосование (7-14 дней)
4. Кворум: минимум 5% от общего стейка
5. Реализация принятых предложений

Уровни участия:
• Базовый: просмотр предложений
• Стейкер: участие в голосовании
• Премиум: создание предложений
• VIP: приоритетное рассмотрение`
      : `TradePlus Decentralized Autonomous Organization provides:

Platform Governance:
• Voting on new features
• Changing platform parameters
• Revenue distribution
• Treasury management
• Partner and integration selection

Proposal Types:
• Technical improvements
• New features
• Platform economy changes
• Partnerships and integrations
• Educational programs
• Community and events

Voting Process:
1. Proposal creation (staking required)
2. Community discussion (7 days)
3. Voting (7-14 days)
4. Quorum: minimum 5% of total stake
5. Implementation of approved proposals

Participation Levels:
• Basic: view proposals
• Staker: participate in voting
• Premium: create proposals
• VIP: priority consideration`
  },
  {
    id: "marketplace",
    title: isRu ? "Маркетплейс стратегий и индикаторов" : "Strategy and Indicator Marketplace",
    content: isRu
      ? `Торговая площадка для обмена торговыми инструментами:

Что можно продавать:
• Готовые торговые боты
• Кастомные индикаторы
• Торговые стратегии
• Шаблоны аналитики
• Образовательные материалы

Модель монетизации:
• Разовые покупки
• Подписки на стратегии
• Комиссия платформы: 10-15%
• Роялти для создателей: 70-80%
• Остальное в казну DAO

Верификация:
• Все стратегии проходят тестирование
• Backtesting результаты публикуются
• Рейтинг и отзывы пользователей
• Система репутации создателей
• Возврат средств при несоответствии описанию`
      : `Trading platform for exchanging trading tools:

What can be sold:
• Ready-made trading bots
• Custom indicators
• Trading strategies
• Analytics templates
• Educational materials

Monetization Model:
• One-time purchases
• Strategy subscriptions
• Platform commission: 10-15%
• Creator royalties: 70-80%
• Rest goes to DAO treasury

Verification:
• All strategies undergo testing
• Backtesting results published
• User ratings and reviews
• Creator reputation system
• Refund if description doesn't match`
  },
  {
    id: "education",
    title: isRu ? "Образовательная экосистема" : "Educational Ecosystem",
    content: isRu
      ? `Многоуровневая система обучения:

Уровень 1: Новичок
• Основы криптовалют и блокчейна
• Как начать торговать
• Безопасность и управление рисками
• Основы технического анализа

Уровень 2: Средний
• Продвинутый технический анализ
• Фундаментальный анализ
• Управление портфелем
• Психология трейдинга

Уровень 3: Продвинутый
• Алгоритмический трейдинг
• Создание торговых ботов
• Оптимизация стратегий
• Институциональные техники

Уровень 4: Профессионал
• Продвинутые стратегии
• Управление капиталом
• Риск-менеджмент
• Коучинг и менторинг

Форматы обучения:
• Интерактивные курсы
• Видео-уроки
• Практические задания
• Симуляторы торговли
• Вебинары с экспертами
• Сертификация по уровням`
      : `Multi-level learning system:

Level 1: Beginner
• Cryptocurrency and blockchain basics
• How to start trading
• Security and risk management
• Technical analysis basics

Level 2: Intermediate
• Advanced technical analysis
• Fundamental analysis
• Portfolio management
• Trading psychology

Level 3: Advanced
• Algorithmic trading
• Creating trading bots
• Strategy optimization
• Institutional techniques

Level 4: Professional
• Advanced strategies
• Capital management
• Risk management
• Coaching and mentoring

Learning Formats:
• Interactive courses
• Video lessons
• Practical assignments
• Trading simulators
• Expert webinars
• Level-based certification`
  },
  {
    id: "target-audience",
    title: isRu ? "Целевые аудитории и их потребности" : "Target Audiences and Their Needs",
    content: isRu
      ? `Аудитория 1: Новички (60% рынка)
Боли:
• Не знают с чего начать
• Боятся потерять деньги
• Перегружены информацией
• Нет структурированного обучения

Решения:
• Пошаговые курсы от нуля
• Paper trading для практики
• Симуляторы без риска
• Социальный трейдинг для обучения
• Поддержка сообщества

Аудитория 2: Опытные трейдеры (30% рынка)
Боли:
• Используют множество платформ
• Нет единого места для всего
• Сложность алгоритмической торговли
• Ограниченные инструменты анализа

Решения:
• Единая платформа для всего
• Профессиональные инструменты
• Алгоритмический трейдинг
• Расширенная аналитика
• Монетизация знаний через маркетплейс

Аудитория 3: Коучи и спикеры (5% рынка)
Боли:
• Сложность монетизации знаний
• Нет платформы для продажи курсов
• Ограниченная аудитория
• Нет инструментов для ведения студентов

Решения:
• Платформа для продажи курсов
• Инструменты для коучинга
• Доступ к целевой аудитории
• Система рейтингов и репутации
• Комиссии от продаж

Аудитория 4: Институциональные инвесторы (5% рынка)
Боли:
• Нужны расширенные функции
• Требуется белый лейбл
• Интеграция с существующими системами
• Соответствие регуляциям

Решения:
• Институциональные аккаунты
• API для интеграций
• Кастомизация под клиента
• Соответствие стандартам
• Приоритетная поддержка`
      : `Audience 1: Beginners (60% of market)
Pain Points:
• Don't know where to start
• Afraid of losing money
• Overwhelmed with information
• No structured learning

Solutions:
• Step-by-step courses from scratch
• Paper trading for practice
• Risk-free simulators
• Social trading for learning
• Community support

Audience 2: Experienced Traders (30% of market)
Pain Points:
• Use multiple platforms
• No single place for everything
• Complexity of algorithmic trading
• Limited analysis tools

Solutions:
• Unified platform for everything
• Professional tools
• Algorithmic trading
• Extended analytics
• Knowledge monetization through marketplace

Audience 3: Coaches and Speakers (5% of market)
Pain Points:
• Difficulty monetizing knowledge
• No platform for selling courses
• Limited audience
• No tools for managing students

Solutions:
• Platform for selling courses
• Coaching tools
• Access to target audience
• Rating and reputation system
• Sales commissions

Audience 4: Institutional Investors (5% of market)
Pain Points:
• Need extended features
• White label required
• Integration with existing systems
• Regulatory compliance

Solutions:
• Institutional accounts
• API for integrations
• Client customization
• Standards compliance
• Priority support`
  },
  {
    id: "technology",
    title: isRu ? "Технологический стек" : "Technology Stack",
    content: isRu
      ? `Frontend:
• Next.js 14 с TypeScript
• React для UI компонентов
• WebSocket для real-time данных
• WebGL для графиков и визуализаций
• PWA для мобильного доступа

Backend:
• Node.js с TypeScript
• Microservices архитектура
• REST и GraphQL API
• WebSocket серверы
• Очереди задач (Bull/BullMQ)

Торговля:
• Интеграции с биржами через официальные API
• WebSocket подключения для real-time данных
• Система управления ордерами
• Risk management модуль
• Backtesting engine

Блокчейн:
• Мультиблокчейн поддержка (Ethereum, Polygon, BSC, Arbitrum)
• Web3 интеграция
• Смарт-контракты для DAO
• Кошельки и транзакции
• NFT для сертификатов и достижений

AI и ML:
• Анализ настроений
• Предсказательные модели
• Оптимизация стратегий
• Персонализация рекомендаций
• Обнаружение паттернов

Инфраструктура:
• Docker и Kubernetes
• Cloud hosting (AWS/GCP)
• Базы данных (PostgreSQL, Redis, TimescaleDB)
• Мониторинг и логирование
• CI/CD pipeline`
      : `Frontend:
• Next.js 14 with TypeScript
• React for UI components
• WebSocket for real-time data
• WebGL for charts and visualizations
• PWA for mobile access

Backend:
• Node.js with TypeScript
• Microservices architecture
• REST and GraphQL API
• WebSocket servers
• Task queues (Bull/BullMQ)

Trading:
• Exchange integrations via official APIs
• WebSocket connections for real-time data
• Order management system
• Risk management module
• Backtesting engine

Blockchain:
• Multi-blockchain support (Ethereum, Polygon, BSC, Arbitrum)
• Web3 integration
• Smart contracts for DAO
• Wallets and transactions
• NFT for certificates and achievements

AI and ML:
• Sentiment analysis
• Predictive models
• Strategy optimization
• Recommendation personalization
• Pattern detection

Infrastructure:
• Docker and Kubernetes
• Cloud hosting (AWS/GCP)
• Databases (PostgreSQL, Redis, TimescaleDB)
• Monitoring and logging
• CI/CD pipeline`
  },
  {
    id: "business-model",
    title: isRu ? "Бизнес-модель" : "Business Model",
    content: isRu
      ? `Источники дохода:

1. Комиссии с торговли:
   • Комиссия с каждой сделки: 0.1-0.2%
   • Скидки для держателей токенов
   • Институциональные тарифы

2. Подписки:
   • Базовый план: бесплатно
   • Премиум: $29/месяц
   • Профессионал: $99/месяц
   • Институциональный: индивидуально

3. Маркетплейс:
   • Комиссия с продаж стратегий: 10-15%
   • Подписки на стратегии: комиссия 20%

4. Образование:
   • Продажа курсов (комиссия 30%)
   • Сертификация: $50-200
   • Вебинары и мастер-классы

5. Реклама:
   • Нативная реклама в приложении
   • Спонсорство образовательных программ
   • Партнерские программы

6. API и белый лейбл:
   • API доступ для разработчиков
   • Белый лейбл для институциональных клиентов

Прогноз доходов (год 1):
• Комиссии: $500K
• Подписки: $300K
• Маркетплейс: $200K
• Образование: $150K
• Итого: $1.15M

Прогноз доходов (год 3):
• Комиссии: $5M
• Подписки: $2M
• Маркетплейс: $1.5M
• Образование: $1M
• Итого: $9.5M`
      : `Revenue Sources:

1. Trading Commissions:
   • Commission per trade: 0.1-0.2%
   • Discounts for token holders
   • Institutional rates

2. Subscriptions:
   • Basic plan: free
   • Premium: $29/month
   • Professional: $99/month
   • Institutional: custom

3. Marketplace:
   • Strategy sales commission: 10-15%
   • Strategy subscriptions: 20% commission

4. Education:
   • Course sales (30% commission)
   • Certification: $50-200
   • Webinars and masterclasses

5. Advertising:
   • Native advertising in app
   • Educational program sponsorship
   • Partnership programs

6. API and White Label:
   • API access for developers
   • White label for institutional clients

Revenue Forecast (Year 1):
• Commissions: $500K
• Subscriptions: $300K
• Marketplace: $200K
• Education: $150K
• Total: $1.15M

Revenue Forecast (Year 3):
• Commissions: $5M
• Subscriptions: $2M
• Marketplace: $1.5M
• Education: $1M
• Total: $9.5M`
  },
  {
    id: "roadmap",
    title: isRu ? "Дорожная карта развития" : "Development Roadmap",
    content: isRu
      ? `Q1 2025: MVP Launch
• Базовая торговая платформа
• Интеграция с 5 основными биржами
• Базовое обучение
• Профили пользователей
• Цель: 1,000 активных пользователей

Q2 2025: Алгоритмический трейдинг
• Визуальный конструктор стратегий
• Backtesting engine
• Paper trading
• Marketplace стратегий (бета)
• Цель: 5,000 пользователей, 100 активных ботов

Q3 2025: Социальный трейдинг и DAO
• Система копирования сделок
• Рейтинги и репутация
• DAO запуск
• Расширенное образование
• Цель: 15,000 пользователей, активное DAO

Q4 2025: Масштабирование
• Институциональные функции
• Расширенная аналитика
• Мобильные приложения
• Партнерства с биржами
• Цель: 50,000 пользователей

2026: Глобальное расширение
• Интеграция с традиционными рынками
• Расширение на новые регионы
• Партнерства с образовательными учреждениями
• Листинг токена
• Цель: 200,000+ пользователей`
      : `Q1 2025: MVP Launch
• Basic trading platform
• Integration with 5 major exchanges
• Basic education
• User profiles
• Goal: 1,000 active users

Q2 2025: Algorithmic Trading
• Visual strategy builder
• Backtesting engine
• Paper trading
• Strategy marketplace (beta)
• Goal: 5,000 users, 100 active bots

Q3 2025: Social Trading and DAO
• Trade copying system
• Ratings and reputation
• DAO launch
• Extended education
• Goal: 15,000 users, active DAO

Q4 2025: Scaling
• Institutional features
• Extended analytics
• Mobile applications
• Exchange partnerships
• Goal: 50,000 users

2026: Global Expansion
• Integration with traditional markets
• Expansion to new regions
• Partnerships with educational institutions
• Token listing
• Goal: 200,000+ users`
  },
  {
    id: "team",
    title: isRu ? "Команда и партнеры" : "Team and Partners",
    content: isRu
      ? `Команда разработки:
• Опытные разработчики блокчейн и fintech решений
• Трейдеры с многолетним опытом
• Специалисты по алгоритмической торговле
• Дизайнеры UX/UI для финансовых платформ

Консультанты:
• Эксперты по криптовалютным биржам
• Специалисты по регулированию
• Финансовые аналитики
• Образовательные эксперты

Партнерства:
• Интеграции с ведущими биржами
• Партнерства с образовательными платформами
• Сотрудничество с аналитическими сервисами
• Интеграции с кошельками и DeFi протоколами

Инвесторы:
• Seed раунд: $35K (завершен)
• Целевой раунд: $140K
• Стратегические партнеры для роста`
      : `Development Team:
• Experienced blockchain and fintech developers
• Traders with years of experience
• Algorithmic trading specialists
• UX/UI designers for financial platforms

Consultants:
• Cryptocurrency exchange experts
• Regulatory specialists
• Financial analysts
• Educational experts

Partnerships:
• Integrations with leading exchanges
• Partnerships with educational platforms
• Collaboration with analytics services
• Integrations with wallets and DeFi protocols

Investors:
• Seed round: $35K (completed)
• Target round: $140K
• Strategic partners for growth`
  },
  {
    id: "financials",
    title: isRu ? "Финансовая модель" : "Financial Model",
    content: isRu
      ? `Текущий статус:
• Инвестиции: $35K из $140K (25% прогресс)
• Статус: Активная разработка MVP

Использование средств:
• 40% — Разработка платформы
• 25% — Команда и операционные расходы
• 15% — Маркетинг и привлечение пользователей
• 10% — Юридические и регуляторные вопросы
• 10% — Резерв и непредвиденные расходы

Прогноз роста пользователей:
• Месяц 1-3: 1,000 пользователей
• Месяц 4-6: 5,000 пользователей
• Месяц 7-9: 15,000 пользователей
• Месяц 10-12: 50,000 пользователей

Метрики успеха:
• Retention rate: >40% (месяц 1)
• Daily Active Users: >30% от MAU
• Средний доход на пользователя: $50/год
• Lifetime Value: $200+
• Customer Acquisition Cost: <$20`
      : `Current Status:
• Investment: $35K of $140K (25% progress)
• Status: Active MVP development

Use of Funds:
• 40% — Platform development
• 25% — Team and operational expenses
• 15% — Marketing and user acquisition
• 10% — Legal and regulatory matters
• 10% — Reserve and unforeseen expenses

User Growth Forecast:
• Month 1-3: 1,000 users
• Month 4-6: 5,000 users
• Month 7-9: 15,000 users
• Month 10-12: 50,000 users

Success Metrics:
• Retention rate: >40% (month 1)
• Daily Active Users: >30% of MAU
• Average revenue per user: $50/year
• Lifetime Value: $200+
• Customer Acquisition Cost: <$20`
  }
];
};


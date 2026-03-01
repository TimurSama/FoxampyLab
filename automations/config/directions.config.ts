/**
 * DIRECTIONS CONFIGURATION
 * Конфигурация всех направлений деятельности
 * Каждое направление = отдельная воронка, БД, CTA
 */

export interface DirectionConfig {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  
  // Что ищу (варианты для поиска)
  searchQueries: {
    jobs: string[];        // Ключевые слова для поиска работы
    clients: string[];     // Ключевые слова для поиска клиентов
    freelancers: string[]; // Кого нанимаю/ищу для команды
  };
  
  // Целевая аудитория
  targetAudience: {
    companies: string[];   // Типы компаний
    positions: string[];   // Должности людей
    industries: string[];  // Индастри
    painPoints: string[];  // Боли которые решаю
  };
  
  // Услуги и цены
  services: {
    name: string;
    price: string;
    duration: string;
    description: string;
    deliverables: string[];
  }[];
  
  // Ключевые слова для AI-анализа
  keywords: string[];
  
  // Портфолио/кейсы
  portfolio: {
    title: string;
    result: string;
    link?: string;
  }[];
  
  // Каналы продвижения
  channels: {
    telegram: string[];
    linkedin: string[];
    websites: string[];
    communities: string[];
  };
}

export const DIRECTIONS: DirectionConfig[] = [
  // ==========================================
  // 1. WEB3 / BLOCKCHAIN
  // ==========================================
  {
    id: 'web3',
    name: 'Web3 & Blockchain',
    nameEn: 'Web3 Development',
    description: 'Разработка децентрализованных приложений, смарт-контрактов, токеномики',
    icon: '◈',
    color: '#6366f1',
    
    searchQueries: {
      jobs: [
        'Web3 Product Manager',
        'Blockchain Product Manager',
        'DeFi Product Manager',
        'Web3 Project Manager',
        'Tokenomics Consultant',
        'Blockchain Developer',
        'Smart Contract Developer',
        'dApp Developer',
        'Solidity Developer',
        'Rust Blockchain Developer',
        'Web3 UX Designer',
        'DAO Operations Manager',
        'NFT Project Manager',
        'Crypto Product Lead',
        'Blockchain Architect',
        'Protocol Engineer',
        'Cryptography Engineer',
        'Web3 Marketing Manager',
        'Crypto Analyst',
        'DeFi Strategist',
      ],
      clients: [
        'Web3 startup',
        'DeFi protocol',
        'NFT marketplace',
        'DAO',
        'Blockchain infrastructure',
        'Crypto exchange',
        'Wallet development',
        'GameFi project',
        'RWA tokenization',
        'Layer 2 solution',
        'Cross-chain bridge',
        'Crypto payment system',
        'Staking platform',
        'Launchpad',
        'Yield farming protocol',
      ],
      freelancers: [
        'Solidity developer',
        'Rust developer',
        'Web3 frontend developer',
        'Smart contract auditor',
        'Blockchain UX designer',
        'Tokenomics specialist',
        'Web3 marketer',
        'Community manager crypto',
      ],
    },
    
    targetAudience: {
      companies: [
        'Web3 startups (pre-seed to Series A)',
        'DeFi protocols',
        'NFT platforms',
        'DAO',
        'Crypto exchanges',
        'Blockchain infrastructure projects',
        'RWA tokenization platforms',
        'GameFi studios',
      ],
      positions: [
        'Founder / CEO',
        'CTO',
        'Head of Product',
        'Head of Growth',
        'Investment Director',
        'DeFi Lead',
        'Ecosystem Manager',
        'Tokenomics Lead',
      ],
      industries: [
        'DeFi',
        'NFT',
        'DAO',
        'GameFi',
        'RWA (Real World Assets)',
        'Infrastructure',
        'Privacy',
        'Identity',
      ],
      painPoints: [
        'Нужен MVP для привлечения инвестиций',
        'Сложно объяснить токеномику инвесторам',
        'Нет технической команды',
        'Проблемы с безопасностью смарт-контрактов',
        'Низкая вовлеченность пользователей',
        'Сложно масштабировать',
        'Нужен аудит перед mainnet',
        'Нет product-market fit',
      ],
    },
    
    services: [
      // Полный цикл
      {
        name: 'Web3 Full Cycle',
        price: '$25,000 - $50,000',
        duration: '12-16 недель',
        description: 'Полный цикл: исследование, токеномика, смарт-контракты, dApp, аудит, запуск',
        deliverables: [
          'Market & competitor research',
          'Tokenomics design & modeling',
          'Smart contracts (Solidity/Rust)',
          'dApp frontend + backend',
          'Security audit',
          'Whitepaper',
          'Go-to-market strategy',
          'Launch support (1 месяц)',
        ],
      },
      // Отдельные услуги
      {
        name: 'Web3 MVP',
        price: '$15,000 - $25,000',
        duration: '8-12 недель',
        description: 'Быстрый запуск для привлечения инвестиций',
        deliverables: [
          'Tokenomics paper',
          'Core smart contracts',
          'dApp frontend',
          'Basic audit',
          'Pitch deck',
        ],
      },
      {
        name: 'Smart Contracts Development',
        price: '$8,000 - $15,000',
        duration: '4-6 недель',
        description: 'Разработка и деплой смарт-контрактов любой сложности',
        deliverables: [
          'Smart contracts code',
          'Test coverage',
          'Deployment scripts',
          'Technical documentation',
          'Integration guide',
        ],
      },
      {
        name: 'Tokenomics Design',
        price: '$5,000 - $8,000',
        duration: '2-3 недели',
        description: 'Проектирование экономики токена: utility, distribution, vesting',
        deliverables: [
          'Tokenomics model',
          'Distribution strategy',
          'Vesting schedules',
          'Incentive mechanisms',
          'Financial projections',
        ],
      },
      {
        name: 'dApp Development',
        price: '$12,000 - $20,000',
        duration: '6-8 недель',
        description: 'Фронтенд и бэкенд для децентрализованного приложения',
        deliverables: [
          'Web3 frontend (React/Next.js)',
          'Wallet integration',
          'Backend API',
          'Smart contract integration',
          'Testing',
        ],
      },
      {
        name: 'Security Audit',
        price: '$5,000 - $10,000',
        duration: '1-2 недели',
        description: 'Аудит смарт-контрактов перед деплоем в mainnet',
        deliverables: [
          'Vulnerability report',
          'Risk assessment',
          'Fix recommendations',
          'Re-audit (after fixes)',
        ],
      },
      {
        name: 'Web3 Consulting',
        price: '$500/час',
        duration: 'Почасовая',
        description: 'Консультации по стратегии, технологии, юридическим аспектам',
        deliverables: [
          'Strategy roadmap',
          'Tech stack recommendations',
          'Risk assessment',
          'Go-to-market plan',
        ],
      },
    ],
    
    keywords: [
      'web3', 'blockchain', 'defi', 'nft', 'dao', 'tokenomics', 
      'solidity', 'rust', 'smart contracts', 'dapp', 'crypto',
      'layer2', 'ethereum', 'solana', 'polkadot', 'cosmos',
      'zero knowledge', 'rwa', 'gamefi', 'metaverse'
    ],
    
    portfolio: [
      {
        title: 'Realting.uz — токенизация недвижимости',
        result: 'Цифровой реестр на блокчейне, смарт-контракты для сделок',
      },
      {
        title: 'Everscale Hackathon Winner',
        result: '1-е место, кроссчейн репутационная система',
      },
      {
        title: 'VODeco DAO',
        result: 'DAO для экологического мониторинга водных ресурсов',
      },
    ],
    
    channels: {
      telegram: [
        '@crypto_jobs',
        '@web3_jobs',
        '@blockchain_dev',
        '@defi_ru',
        '@nft_ru',
        '@dao_ru',
        '@solana_ru',
        '@ton_dev',
        '@cryptovalley',
        '@blockchain_ru',
      ],
      linkedin: [
        'Web3 Professionals',
        'Blockchain Developers',
        'DeFi Enthusiasts',
        'NFT Community',
        'Crypto Startups',
      ],
      websites: [
        'cryptocurrencyjobs.co',
        'web3.career',
        'remote3.co',
        'blockchain.works-hub.com',
      ],
      communities: [
        'Discord: Developer DAO',
        'Discord: BuildSpace',
        'Forum: Ethereum Research',
        'Reddit: r/ethdev',
      ],
    },
  },
  
  // ==========================================
  // 2. WEB DEVELOPMENT / ECOSYSTEMS
  // ==========================================
  {
    id: 'webdev',
    name: 'Web Development',
    nameEn: 'Web & App Development',
    description: 'Разработка сайтов, веб-приложений, мобильных приложений, экосистем',
    icon: '◉',
    color: '#10b981',
    
    searchQueries: {
      jobs: [
        'Product Manager',
        'Project Manager',
        'Technical Product Manager',
        'Digital Product Manager',
        'E-commerce Product Manager',
        'SaaS Product Manager',
        'Platform Product Manager',
        'Full Stack Developer',
        'Frontend Developer',
        'Backend Developer',
        'React Developer',
        'Next.js Developer',
        'Node.js Developer',
        'Mobile App Developer',
        'React Native Developer',
        'Flutter Developer',
        'DevOps Engineer',
        'System Architect',
        'CTO',
        'Technical Lead',
      ],
      clients: [
        'E-commerce platform',
        'SaaS startup',
        'Marketplace',
        'Corporate website',
        'Mobile app',
        'Internal tool',
        'CRM system',
        'ERP development',
        'Educational platform',
        'Healthcare app',
        'Fintech app',
        'Real estate platform',
        'Booking system',
        'Logistics platform',
      ],
      freelancers: [
        'Frontend developer',
        'Backend developer',
        'Full stack developer',
        'Mobile developer',
        'UI/UX designer',
        'QA engineer',
        'DevOps engineer',
        'Product designer',
      ],
    },
    
    targetAudience: {
      companies: [
        'Startups (pre-seed to Series B)',
        'SaaS компании',
        'E-commerce бизнесы',
        'Digital агентства',
        'Корпорации (цифровая трансформация)',
        'Медиа компании',
        'EdTech платформы',
        'HealthTech стартапы',
        'PropTech компании',
        'LogTech решения',
      ],
      positions: [
        'Founder / CEO',
        'CTO',
        'Head of Product',
        'Head of Engineering',
        'Digital Director',
        'IT Director',
        'Product Owner',
        'Innovation Manager',
      ],
      industries: [
        'E-commerce',
        'SaaS',
        'Marketplace',
        'FinTech',
        'EdTech',
        'HealthTech',
        'PropTech',
        'LogTech',
        'Media',
        'Enterprise',
      ],
      painPoints: [
        'Нужен MVP для проверки гипотезы',
        'Сайт устарел и не конвертирует',
        'Нет мобильного приложения',
        'Сложная интеграция с системами',
        'Высокая стоимость разработки',
        'Долгий time-to-market',
        'Нет технической команды',
        'Проблемы с производительностью',
      ],
    },
    
    services: [
      // Полный цикл
      {
        name: 'Digital Ecosystem',
        price: '$35,000 - $80,000',
        duration: '4-6 месяцев',
        description: 'Комплексная экосистема: веб, мобильное приложение, админка, интеграции',
        deliverables: [
          'Product strategy & roadmap',
          'UX research & design system',
          'Web platform',
          'iOS + Android apps',
          'Admin dashboard',
          'API & integrations',
          'Analytics & monitoring',
          'DevOps & CI/CD',
          'Documentation & training',
        ],
      },
      // Отдельные услуги
      {
        name: 'MVP Development',
        price: '$8,000 - $15,000',
        duration: '6-10 недель',
        description: 'Быстрый запуск продукта с основным функционалом',
        deliverables: [
          'Product Requirements Document',
          'UX/UI Design',
          'Frontend (React/Next.js)',
          'Backend API (Node.js)',
          'Database design',
          'Deployment & CI/CD',
          'Analytics setup',
        ],
      },
      {
        name: 'Full-Cycle Development',
        price: '$20,000 - $50,000',
        duration: '3-6 месяцев',
        description: 'Комплексная разработка: от идеи до production',
        deliverables: [
          'Market research',
          'Product strategy',
          'Complete UX/UI',
          'Web + Mobile apps',
          'Admin panel',
          'Third-party integrations',
          'Testing & QA',
          'Launch support',
        ],
      },
      {
        name: 'E-commerce Platform',
        price: '$15,000 - $30,000',
        duration: '8-12 недель',
        description: 'Интернет-магазин или маркетплейс с оплатой и доставкой',
        deliverables: [
          'Product catalog',
          'Shopping cart & checkout',
          'Payment integration',
          'Order management',
          'User accounts',
          'Admin dashboard',
          'Analytics',
        ],
      },
      {
        name: 'Mobile App',
        price: '$12,000 - $25,000',
        duration: '8-12 недель',
        description: 'Нативное или кроссплатформенное приложение iOS/Android',
        deliverables: [
          'App design',
          'iOS app (Swift/React Native)',
          'Android app (Kotlin/React Native)',
          'Backend API',
          'Push notifications',
          'App Store / Play Store publishing',
        ],
      },
      {
        name: 'Website Development',
        price: '$5,000 - $15,000',
        duration: '3-6 недель',
        description: 'Корпоративный сайт, лендинг или маркетинговый сайт',
        deliverables: [
          'UX/UI Design',
          'Responsive frontend',
          'CMS integration',
          'SEO optimization',
          'Analytics setup',
          'Content management training',
        ],
      },
      {
        name: 'Team as a Service',
        price: '$6,000/месяц',
        duration: '3+ месяца',
        description: 'Выделенная команда для долгосрочного проекта',
        deliverables: [
          'Dedicated PM',
          '2-3 Developers',
          '1 Designer',
          'Weekly sprints',
          'Priority support',
          'Source code ownership',
        ],
      },
    ],
    
    keywords: [
      'web development', 'app development', 'mvp', 'saas', 'e-commerce',
      'react', 'next.js', 'node.js', 'typescript', 'javascript',
      'mobile app', 'react native', 'flutter', 'ios', 'android',
      'product management', 'agile', 'scrum', 'devops', 'cloud',
      'aws', 'vercel', 'supabase', 'postgresql', 'mongodb'
    ],
    
    portfolio: [
      {
        title: 'Done — логистическое приложение',
        result: 'Приложение для доставки и чистки одежды, 50K+ пользователей',
      },
      {
        title: 'Realting.uz',
        result: 'Платформа недвижимости с цифровым реестром',
      },
      {
        title: 'Mail & Cleaning Service',
        result: 'Единый сервис для почты и бытовых услуг',
      },
    ],
    
    channels: {
      telegram: [
        '@pm_jobs',
        '@product_jobs_ru',
        '@dev_by',
        '@frontend_ru',
        '@react_ru',
        '@nodejs_ru',
        '@freelance',
        '@product_ru',
      ],
      linkedin: [
        'Product Management',
        'Web Development',
        'Startup Jobs',
        'E-commerce Professionals',
        'SaaS Founders',
      ],
      websites: [
        'hh.ru',
        'linkedin.com/jobs',
        'angel.co',
        'wellfound.com',
        'remotive.com',
        'weworkremotely.com',
      ],
      communities: [
        'GitHub',
        'Stack Overflow',
        'Dev.to',
        'Product Hunt',
        'Indie Hackers',
      ],
    },
  },
  
  // ==========================================
  // 3. MARKETING / ADVERTISING / GROWTH
  // ==========================================
  {
    id: 'marketing',
    name: 'Marketing & Growth',
    nameEn: 'Marketing & Advertising',
    description: 'Performance marketing, growth hacking, стратегия, запуск продуктов',
    icon: '▲',
    color: '#f59e0b',
    
    searchQueries: {
      jobs: [
        'Head of Marketing',
        'Marketing Manager',
        'Chief Marketing Officer',
        'CMO',
        'Growth Manager',
        'Growth Lead',
        'Performance Marketing Manager',
        'Performance Marketing Lead',
        'Digital Marketing Manager',
        'Product Marketing Manager',
        'Brand Manager',
        'Marketing Director',
        'VP of Marketing',
        'Head of Growth',
        'Head of Performance',
        'Marketing Strategist',
        'Growth Hacker',
        'Acquisition Manager',
        'Retention Manager',
        'CRM Manager',
      ],
      clients: [
        'Performance marketing',
        'Brand strategy',
        'Product launch',
        'Growth strategy',
        'Digital marketing campaign',
        'Content strategy',
        'Social media marketing',
        'Influencer marketing',
        'App marketing',
        'User acquisition',
        'Retention optimization',
        'Marketing automation',
        'Analytics setup',
        'CRO optimization',
        'Go-to-market strategy',
      ],
      freelancers: [
        'Performance marketer',
        'Content marketer',
        'SEO specialist',
        'SMM manager',
        'Copywriter',
        'Graphic designer',
        'Video producer',
        'Marketing analyst',
      ],
    },
    
    targetAudience: {
      companies: [
        'Startups (pre-seed to Series C)',
        'E-commerce бизнесы',
        'SaaS компании',
        'Mobile apps',
        'Consumer brands',
        'B2B сервисы',
        'Marketplaces',
        'Fintech продукты',
      ],
      positions: [
        'Founder / CEO',
        'CMO',
        'Head of Marketing',
        'Head of Growth',
        'VP Marketing',
        'Marketing Director',
        'Product Lead',
        'Brand Director',
      ],
      industries: [
        'E-commerce',
        'SaaS',
        'Mobile Apps',
        'Fintech',
        'Consumer Goods',
        'B2B Services',
        'EdTech',
        'Health & Wellness',
      ],
      painPoints: [
        'Высокая стоимость привлечения клиентов (CAC)',
        'Низкий retention rate',
        'Неэффективная реклама (высокий CPC)',
        'Нет маркетинговой стратегии',
        'Сложно масштабировать кампании',
        'Нет системной аналитики',
        'Конкуренты забирают трафик',
        'Низкая конверсия в продажи',
      ],
    },
    
    services: [
      // Полный цикл
      {
        name: 'Growth Marketing Full Cycle',
        price: '$15,000 - $30,000',
        duration: '3-4 месяца',
        description: 'Полный цикл: аудит, стратегия, запуск каналов, оптимизация, масштабирование',
        deliverables: [
          'Marketing audit & competitor analysis',
          'Growth strategy & roadmap',
          'Channel mix & budget allocation',
          'Creative strategy & production',
          'Campaign setup & launch (3-5 каналов)',
          'Analytics & attribution setup',
          'CRO & landing page optimization',
          'Weekly optimization & reporting',
          'Knowledge transfer & playbooks',
        ],
      },
      // Отдельные услуги
      {
        name: 'Performance Marketing',
        price: '$5,000/мес + ad spend',
        duration: '3+ месяца',
        description: 'Управление рекламными кампаниями Meta, Google, TikTok, Twitter',
        deliverables: [
          'Campaign strategy',
          'Ad creative production (8-12 шт/мес)',
          'Campaign setup & management',
          'A/B testing',
          'Daily optimization',
          'Weekly reports',
          'Monthly strategy review',
        ],
      },
      {
        name: 'Go-to-Market Strategy',
        price: '$8,000 - $12,000',
        duration: '3-4 недели',
        description: 'Стратегия выхода на рынок для нового продукта',
        deliverables: [
          'Market research & sizing',
          'Competitor analysis',
          'Target audience definition',
          'Positioning & messaging',
          'Channel strategy',
          'Launch roadmap',
          'Budget & KPI framework',
          '90-day action plan',
        ],
      },
      {
        name: 'Product Launch',
        price: '$10,000 - $20,000',
        duration: '4-6 недель',
        description: 'Полный запуск продукта: от анонса до первых продаж',
        deliverables: [
          'Launch strategy',
          'Landing page + funnel',
          'Email sequences',
          'Social media campaign',
          'Influencer outreach',
          'PR & media kit',
          'Launch event (optional)',
          'Post-launch optimization',
        ],
      },
      {
        name: 'Marketing Audit',
        price: '$3,000 - $5,000',
        duration: '1-2 недели',
        description: 'Комprehensive аудит текущего маркетинга с рекомендациями',
        deliverables: [
          'Channel performance analysis',
          'Creative audit',
          'Funnel analysis',
          'Competitor benchmarking',
          'Growth opportunities map',
          'Prioritized action plan',
          'Quick wins identification',
        ],
      },
      {
        name: 'CRO & Analytics',
        price: '$4,000/мес',
        duration: '2+ месяца',
        description: 'Оптимизация конверсии и внедрение аналитики',
        deliverables: [
          'Analytics audit & setup',
          'Funnel optimization',
          'Landing page A/B tests',
          'User journey mapping',
          'Heatmap analysis',
          'Conversion rate improvements',
          'Monthly CRO report',
        ],
      },
      {
        name: 'Marketing Consulting',
        price: '$400/час',
        duration: 'Почасовая',
        description: 'Консультации по стратегии, каналам, метрикам',
        deliverables: [
          'Strategy recommendations',
          'Channel advice',
          'Budget optimization',
          'Troubleshooting',
        ],
      },
    ],
    
    keywords: [
      'marketing', 'growth', 'performance marketing', 'digital marketing',
      'facebook ads', 'google ads', 'tiktok ads', 'ppc', 'cpa',
      'growth hacking', 'user acquisition', 'retention', 'cro',
      'analytics', 'attribution', 'funnel optimization', 'branding',
      'product launch', 'go-to-market', 'content strategy'
    ],
    
    portfolio: [
      {
        title: 'Done App Launch',
        result: '50K+ installs в первый месяц, CAC $2.5',
      },
      {
        title: 'Realting.uz Growth',
        result: '300% рост organic traffic, 40% снижение CAC',
      },
      {
        title: 'E-commerce Scale',
        result: 'С $50K до $500K monthly revenue за 6 месяцев',
      },
    ],
    
    channels: {
      telegram: [
        '@marketing_smm',
        '@marketing_jobs',
        '@growth_hackers',
        '@performance_marketing',
        '@facebook_ads_ru',
        '@google_ads_ru',
        '@tiktok_ads_ru',
        '@marketing_ru',
      ],
      linkedin: [
        'Growth Marketing',
        'Performance Marketing',
        'Digital Marketing',
        'Marketing Strategy',
        'E-commerce Marketing',
      ],
      websites: [
        'growthhackers.com',
        'producthunt.com',
        'indiehackers.com',
        'marketingexamples.com',
      ],
      communities: [
        'Facebook: Ad Buyers',
        'Slack: GrowthHackers',
        'Discord: Marketing Empire',
      ],
    },
  },
  
  // ==========================================
  // 4. DESIGN / PRODUCT DESIGN / UI/UX
  // ==========================================
  {
    id: 'design',
    name: 'Design & Creative',
    nameEn: 'Product Design & Creative',
    description: 'Product design, UI/UX, brand identity, motion design, 3D',
    icon: '◆',
    color: '#ec4899',
    
    searchQueries: {
      jobs: [
        'Product Designer',
        'UX Designer',
        'UI Designer',
        'UX/UI Designer',
        'Senior Product Designer',
        'Lead Product Designer',
        'Head of Design',
        'Design Lead',
        'Design Director',
        'Creative Director',
        'Art Director',
        'Brand Designer',
        'Visual Designer',
        'Motion Designer',
        '3D Designer',
        'Graphic Designer',
        'Web Designer',
        'Interaction Designer',
        'Design System Designer',
        'User Researcher',
      ],
      clients: [
        'Product design',
        'UI/UX design',
        'Mobile app design',
        'Web design',
        'Brand identity',
        'Logo design',
        'Design system',
        'Motion design',
        '3D visualization',
        'Packaging design',
        'Marketing design',
        'Presentation design',
        'Illustration',
        'Icon design',
        'Design audit',
      ],
      freelancers: [
        'UI designer',
        'UX researcher',
        'Graphic designer',
        'Illustrator',
        'Motion designer',
        '3D artist',
        'Brand designer',
        'Web designer',
      ],
    },
    
    targetAudience: {
      companies: [
        'Tech startups',
        'Digital agencies',
        'E-commerce brands',
        'SaaS компании',
        'Consumer apps',
        'Fintech продукты',
        'Media компании',
        'Enterprise software',
      ],
      positions: [
        'Founder / CEO',
        'Head of Product',
        'Head of Design',
        'Product Manager',
        'Marketing Director',
        'Brand Manager',
        'CTO',
        'Creative Director',
      ],
      industries: [
        'Technology',
        'E-commerce',
        'SaaS',
        'Fintech',
        'Media',
        'Consumer Apps',
        'Healthcare',
        'Education',
      ],
      painPoints: [
        'Продукт сложен в использовании',
        'Высокий bounce rate',
        'Нет единого стиля (design consistency)',
        'Дизайн устарел',
        'Низкая конверсия',
        'Пользователи не понимают интерфейс',
        'Нет дизайн-системы',
        'Сложно масштабировать дизайн',
      ],
    },
    
    services: [
      // Полный цикл
      {
        name: 'Product Design Full Cycle',
        price: '$20,000 - $40,000',
        duration: '8-12 недель',
        description: 'Полный цикл: исследование, UX, UI, дизайн-система, прототипы, handoff',
        deliverables: [
          'User research & interviews',
          'Competitor analysis',
          'Information architecture',
          'User flows & journey maps',
          'Wireframes (low & high fidelity)',
          'UI Design (all screens)',
          'Design system & components',
          'Interactive prototypes',
          'Developer handoff (Figma)',
          'Design documentation',
        ],
      },
      // Отдельные услуги
      {
        name: 'UX/UI Design',
        price: '$8,000 - $15,000',
        duration: '4-6 недель',
        description: 'Дизайн интерфейса для веб или мобильного приложения',
        deliverables: [
          'User research',
          'Wireframes',
          'UI Design (20-40 экранов)',
          'Interactive prototype',
          'Design specifications',
          'Developer handoff',
        ],
      },
      {
        name: 'Mobile App Design',
        price: '$10,000 - $20,000',
        duration: '6-8 недель',
        description: 'Полный дизайн iOS/Android приложения',
        deliverables: [
          'UX Research',
          'User flows',
          'Wireframes',
          'UI Design (iOS + Android)',
          'App Store screenshots',
          'Design system',
          'Prototype',
        ],
      },
      {
        name: 'Brand Identity',
        price: '$5,000 - $12,000',
        duration: '3-4 недели',
        description: 'Разработка фирменного стиля: логотип, цвета, типографика, гайдлайны',
        deliverables: [
          'Brand strategy',
          'Logo design (3 concepts)',
          'Color palette',
          'Typography system',
          'Brand guidelines',
          'Business card design',
          'Social media templates',
          'Brand assets pack',
        ],
      },
      {
        name: 'Design System',
        price: '$8,000 - $15,000',
        duration: '4-6 недель',
        description: 'Создание масштабируемой дизайн-системы для продукта',
        deliverables: [
          'Component library',
          'Style guide',
          'Pattern library',
          'Design tokens',
          'Documentation',
          'Figma organization',
          'Team training',
        ],
      },
      {
        name: 'Motion Design',
        price: '$3,000 - $8,000',
        duration: '2-3 недели',
        description: 'Анимации для интерфейса, explainer videos, микро-взаимодействия',
        deliverables: [
          'Motion concepts',
          'UI animations (Lottie)',
          'Explainer video (30-60s)',
          'Micro-interactions',
          'Loading animations',
          'Onboarding animations',
        ],
      },
      {
        name: 'Design Audit',
        price: '$2,500 - $4,000',
        duration: '1 неделя',
        description: 'Аудит текущего дизайна с рекомендациями по улучшению',
        deliverables: [
          'Heuristic evaluation',
          'Usability analysis',
          'Competitor comparison',
          'Priority issues list',
          'Redesign recommendations',
          'Quick wins',
        ],
      },
      {
        name: 'Web Design',
        price: '$4,000 - $10,000',
        duration: '3-5 недель',
        description: 'Дизайн корпоративного сайта, лендинга или маркетингового сайта',
        deliverables: [
          'UX strategy',
          'Wireframes',
          'UI Design (all pages)',
          'Responsive versions',
          'Animations spec',
          'Developer handoff',
        ],
      },
    ],
    
    keywords: [
      'ux design', 'ui design', 'product design', 'user experience',
      'user interface', 'design system', 'figma', 'prototyping',
      'brand identity', 'logo design', 'visual design', 'motion design',
      '3d design', 'graphic design', 'web design', 'mobile design',
      'interaction design', 'user research', 'usability', 'accessibility'
    ],
    
    portfolio: [
      {
        title: 'Done App Design',
        result: 'Полный редизайн: +40% retention, App Store Featured',
      },
      {
        title: 'Realting.uz Brand',
        result: 'Фирменный стиль + дизайн-система для PropTech платформы',
      },
      {
        title: 'Fintech Dashboard',
        result: 'UX/UI для crypto trading platform, 50+ экранов',
      },
    ],
    
    channels: {
      telegram: [
        '@design_tg',
        '@design_jobs',
        '@uiux_jobs',
        '@figma_ru',
        '@designers_channel',
        '@ux_ui_design',
        '@product_design_ru',
        '@design_hiring',
      ],
      linkedin: [
        'Product Design',
        'UX/UI Design',
        'Graphic Design',
        'Creative Design',
        'Design Leadership',
      ],
      websites: [
        'dribbble.com',
        'behance.net',
        'awwwards.com',
        'mobbin.com',
        'land-book.com',
      ],
      communities: [
        'Figma Community',
        'Designer Hangout (Slack)',
        'Design Twitter',
        'Reddit: r/userexperience',
      ],
    },
  },
];

// Вспомогательные функции
export function getDirectionById(id: string): DirectionConfig | undefined {
  return DIRECTIONS.find(d => d.id === id);
}

export function getAllSearchQueries(): Record<string, string[]> {
  const queries: Record<string, string[]> = {};
  
  DIRECTIONS.forEach(dir => {
    queries[dir.id] = [
      ...dir.searchQueries.jobs,
      ...dir.searchQueries.clients,
    ];
  });
  
  return queries;
}

export function getAllKeywords(): string[] {
  return DIRECTIONS.flatMap(d => d.keywords);
}

export type Language = 'en' | 'ru' | 'ar' | 'es' | 'pl' | 'fr' | 'de';

export interface Translations {
  header: {
    search: string;
    searchPlaceholder: string;
    menu: {
      hub: string;
      about: string;
      services: string;
      cases: string;
      research: string;
      ventures: string;
      join: string;
      contact: string;
    };
  };
  hub: {
    title: string;
    subtitle: string;
    projectsInDevelopment: string;
    openForInvestment: string;
    viewProject: string;
    progress: string;
    status: string;
    investment: string;
    invested: string;
    statusActive: string;
    statusPilot: string;
    statusBeta: string;
    statusPlanning: string;
  };
  home: {
    tagline: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    tags: string;
    whyTitle: string;
    whySubtitle: string;
    whyDescription: string;
    whyItem1Title: string;
    whyItem1Desc: string;
    whyItem2Title: string;
    whyItem2Desc: string;
    whyItem3Title: string;
    whyItem3Desc: string;
    servicesTitle: string;
    servicesSubtitle: string;
    methodologyTitle: string;
    methodologySubtitle: string;
    methodologyDescription: string;
    process: string;
    layer1: string;
    layer1Name: string;
    layer1Desc: string;
    layer2: string;
    layer2Name: string;
    layer2Desc: string;
    layer3: string;
    layer3Name: string;
    layer3Desc: string;
    layer4: string;
    layer4Name: string;
    layer4Desc: string;
    globalTitle: string;
    globalSubtitle: string;
    coverage: string;
    countries: string;
    network: string;
    networkDescription: string;
    availableWorldwide: string;
    venturesTitle: string;
    venturesSubtitle: string;
    portfolio: string;
    venturesDescription: string;
    highGrowth: string;
    viewProjects: string;
    metrics: string;
    years: string;
    rdTitle: string;
    rdDescription: string;
    explore: string;
    joinTitle: string;
    joinDescription: string;
    viewVacancies: string;
    ctaTitle: string;
    ctaTitleEnd: string;
    ctaDescription: string;
    startProject: string;
    footer: string;
    vacancies: string;
    learnMore: string;
    scrollToExplore: string;
    synergy: string;
  };
  services: {
    ecosystems: string;
    ecosystemsDesc: string;
    webapp: string;
    webappDesc: string;
    blockchain: string;
    blockchainDesc: string;
    design: string;
    designDesc: string;
    marketing: string;
    marketingDesc: string;
    documents: string;
    documentsDesc: string;
    video: string;
    videoDesc: string;
    more: string;
    title?: string;
    subtitle?: string;
    description?: string;
    notFound?: string;
    notFoundDesc?: string;
    packages: {
      investment: string;
      timeline: string;
      sendResearch: string;
      scheduleConsultation: string;
      starter: string;
      professional: string;
      enterprise: string;
      ecosystems?: any;
      webapp?: any;
      blockchain?: any;
      design?: any;
      marketing?: any;
      documents?: any;
      video?: any;
    };
  };
  common: {
    loading: string;
    error: string;
    readMore: string;
    contactUs: string;
    services: string;
    contact: string;
    cancel: string;
  };
  modals: {
    sendResearch: {
      title: string;
      service: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      filesLabel: string;
      dropFiles: string;
      orClick: string;
      nameLabel: string;
      emailLabel: string;
      phoneLabel: string;
      optional: string;
      send: string;
    };
    consultation: {
      title: string;
      service: string;
      selectDate: string;
      selectTime: string;
      nameLabel: string;
      emailLabel: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      optional: string;
      confirm: string;
    };
  };
  about: {
    tagline: string;
    title: string;
    description: string;
    mission: {
      title: string;
      description: string;
    };
    values: {
      title: string;
      innovation: {
        title: string;
        description: string;
      };
      result: {
        title: string;
        description: string;
      };
      team: {
        title: string;
        description: string;
      };
      speed: {
        title: string;
        description: string;
      };
    };
    expertise: {
      title: string;
      subtitle: string;
      business: {
        category: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
        item5: string;
      };
      design: {
        category: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
        item5: string;
      };
      webapp: {
        category: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
        item5: string;
      };
      ecosystems: {
        category: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
        item5: string;
      };
      marketing: {
        category: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
        item5: string;
      };
      video: {
        category: string;
        item1: string;
        item2: string;
        item3: string;
        item4: string;
        item5: string;
      };
    };
    cta: {
      title: string;
      description: string;
      contactButton: string;
      casesButton: string;
    };
  };
  cases: {
    tagline: string;
    title: string;
    description: string;
    learnMore: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    web3Bank: {
      title: string;
      category: string;
      description: string;
    };
    daoEcology: {
      title: string;
      category: string;
      description: string;
    };
    mailServices: {
      title: string;
      category: string;
      description: string;
    };
  };
}

// English home translations (used as fallback for other languages)
const enHomeTranslations = {
  tagline: 'INNOVATION LABORATORY',
  title: 'LABORATORY',
  titleHighlight: 'DEVELOPMENTS',
  titleEnd: 'INNOVATIONS',
  description: 'We transform ambitious ideas into market-leading products. Our multidisciplinary approach combines cutting-edge technology, strategic business thinking, and scientific research to deliver solutions that drive measurable results.',
  tags: 'Ecosystems · Blockchain · Design · Marketing · AI · R&D',
  whyTitle: 'DIVERSITY OF EXPERTISE',
  whySubtitle: 'Why Multidisciplinary',
  whyDescription: 'Combining expertise in technology, design, business and science allows us to create comprehensive solutions unavailable to narrow-specialized teams.',
  whyItem1Title: 'SYNTHESIS OF KNOWLEDGE',
  whyItem1Desc: 'Integration of methodologies from different disciplines creates unique approaches to solving complex problems',
  whyItem2Title: 'TEAM EFFICIENCY',
  whyItem2Desc: 'A single team of experts ensures rapid project implementation without quality loss at handover stages between contractors',
  whyItem3Title: 'INNOVATIVE APPROACHES',
  whyItem3Desc: 'Combining technologies from different fields opens new opportunities for business and creativity',
  servicesTitle: 'OUR SOLUTIONS',
  servicesSubtitle: 'Areas of Work',
  methodologyTitle: 'METHODOLOGY',
  methodologySubtitle: 'Depth of Research',
  methodologyDescription: 'Each project starts with comprehensive research: market analysis, competitive environment, user needs and technical constraints. Only after deep understanding of context do we proceed to development.',
  process: 'Process',
  layer1: 'Research',
  layer1Name: 'Market Analysis',
  layer1Desc: 'Market research, competitive analysis, user needs',
  layer2: 'Strategy',
  layer2Name: 'Strategic Planning',
  layer2Desc: 'Business model, architecture, technology stack',
  layer3: 'Development',
  layer3Name: 'Implementation',
  layer3Desc: 'Design, development, testing, optimization',
  layer4: 'Growth',
  layer4Name: 'Scaling',
  layer4Desc: 'Launch, marketing, support, development',
  globalTitle: 'INTERNATIONAL EXPERTISE',
  globalSubtitle: 'Global Presence',
  coverage: 'Coverage',
  countries: 'Countries',
  network: 'Global Network',
  networkDescription: 'Distributed team of experts in different time zones ensures continuous work on projects and support for clients worldwide.',
  availableWorldwide: 'Available Worldwide',
  venturesTitle: 'PORTFOLIO',
  venturesSubtitle: 'Investment Opportunities',
  portfolio: 'Portfolio',
  venturesDescription: 'Projects of the laboratory demonstrating our approach to creating innovative solutions in blockchain, artificial intelligence and digital platforms.',
  highGrowth: 'High Growth Potential',
  viewProjects: 'VIEW PROJECTS',
  metrics: 'Metrics',
  years: 'Years',
  rdTitle: 'SCIENTIFIC RESEARCH',
  rdDescription: 'Research activities in advanced technologies: artificial intelligence, blockchain, spatial computing. Publications and open research.',
  explore: 'Explore',
  joinTitle: 'CAREER AT THE LABORATORY',
  joinDescription: 'Join a team of experts. We are looking for talented developers, designers and researchers. Remote work, equity participation in projects.',
  viewVacancies: 'VIEW VACANCIES',
  ctaTitle: 'READY TO REALIZE',
  ctaTitleEnd: 'YOUR PROJECT?',
  ctaDescription: "Let's discuss your project and collaboration opportunities. Initial consultation is free.",
  startProject: 'DISCUSS PROJECT',
  footer: '© 2025 FRACTALIX.LAB. All rights reserved.',
  vacancies: 'VACANCIES',
  learnMore: 'Learn More',
  scrollToExplore: 'Scroll to Explore',
  synergy: 'SYNERGY',
} as const;

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      search: 'Search',
      searchPlaceholder: 'search...',
      menu: {
        hub: 'HUB',
        about: 'ABOUT',
        services: 'SERVICES',
        cases: 'CASES',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'CONTACT',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Our Projects in Development',
      projectsInDevelopment: 'Projects in Development',
      openForInvestment: 'Open for Investment',
      viewProject: 'View Project',
      progress: 'Progress',
      status: 'Status',
      investment: 'Investment Target',
      invested: 'Invested',
      statusActive: 'Active',
      statusPilot: 'Pilot Project',
      statusBeta: 'Beta',
      statusPlanning: 'Planning',
    },
    home: enHomeTranslations,
    services: {
      ecosystems: 'ECOSYSTEMS',
      ecosystemsDesc: 'Comprehensive project development',
      webapp: 'WEB/APP',
      webappDesc: 'Websites, SPA, mobile applications',
      blockchain: 'BLOCKCHAIN',
      blockchainDesc: 'Smart contracts, DeFi, NFT',
      design: 'DESIGN',
      designDesc: 'UI/UX, branding, identity',
      marketing: 'MARKETING',
      marketingDesc: 'Promotion, SMM, content',
      documents: 'DOCUMENTS',
      documentsDesc: 'Documents, contracts, reports',
      video: 'VIDEO',
      videoDesc: 'Production, motion design',
      more: 'More',
      title: 'SERVICES',
      subtitle: 'Our Solutions',
      description: 'We offer comprehensive development services across multiple disciplines.',
      notFound: 'Need a Custom Solution?',
      notFoundDesc: "Can't find what you're looking for? Let's discuss your unique requirements.",
      packages: {
        investment: 'Investment',
        timeline: 'Timeline',
        sendResearch: 'Send for Research',
        scheduleConsultation: 'Schedule Consultation',
        starter: 'STARTER',
        professional: 'PROFESSIONAL',
        enterprise: 'ENTERPRISE',
        // Ecosystems packages
        ecosystems: {
          starter: {
            feature1: 'Basic ecosystem architecture',
            feature2: 'Single platform integration',
            feature3: 'Core features development',
            feature4: 'Basic admin panel',
            price: '$15K - $30K',
            timeline: '2-3 months',
          },
          professional: {
            feature1: 'Comprehensive ecosystem architecture',
            feature2: 'Multi-platform integration (web + mobile)',
            feature3: 'Advanced features development',
            feature4: 'Full admin panel + analytics',
            feature5: 'API development',
            price: '$40K - $80K',
            timeline: '4-6 months',
          },
          enterprise: {
            feature1: 'Complete ecosystem architecture',
            feature2: 'Full platform integration (web + mobile + blockchain)',
            feature3: 'Custom features development',
            feature4: 'Advanced admin panel + analytics',
            feature5: 'Complete API ecosystem',
            feature6: 'Ongoing support & maintenance',
            price: '$100K+',
            timeline: '6-12 months',
          },
        },
        // Web/App packages
        webapp: {
          starter: {
            feature1: 'Responsive website design',
            feature2: 'Basic functionality',
            feature3: 'Content management system',
            price: '$5K - $15K',
            timeline: '1-2 months',
          },
          professional: {
            feature1: 'Full-stack web application',
            feature2: 'Advanced functionality',
            feature3: 'Mobile app (iOS/Android)',
            feature4: 'Admin dashboard',
            price: '$20K - $50K',
            timeline: '3-5 months',
          },
          enterprise: {
            feature1: 'Enterprise web application',
            feature2: 'Custom functionality',
            feature3: 'Native mobile apps',
            feature4: 'Advanced admin system',
            feature5: 'API integrations',
            price: '$60K+',
            timeline: '5-10 months',
          },
        },
        // Blockchain packages
        blockchain: {
          starter: {
            feature1: 'Smart contract development',
            feature2: 'Basic DApp interface',
            feature3: 'Token creation',
            price: '$10K - $25K',
            timeline: '2-3 months',
          },
          professional: {
            feature1: 'Advanced smart contracts',
            feature2: 'Complete DApp development',
            feature3: 'Tokenomics & DeFi features',
            feature4: 'Blockchain integration',
            price: '$35K - $70K',
            timeline: '4-6 months',
          },
          enterprise: {
            feature1: 'Complex smart contract system',
            feature2: 'Full blockchain ecosystem',
            feature3: 'Advanced DeFi features',
            feature4: 'Multi-chain integration',
            feature5: 'Security auditing',
            price: '$80K+',
            timeline: '6-12 months',
          },
        },
        // Design packages
        design: {
          starter: {
            feature1: 'UI/UX design',
            feature2: 'Brand identity',
            feature3: 'Design system',
            price: '$3K - $8K',
            timeline: '1-2 months',
          },
          professional: {
            feature1: 'Complete UI/UX design',
            feature2: 'Full brand identity',
            feature3: 'Design system + guidelines',
            feature4: 'Marketing materials',
            price: '$12K - $30K',
            timeline: '2-4 months',
          },
          enterprise: {
            feature1: 'Enterprise design system',
            feature2: 'Complete brand identity',
            feature3: 'All marketing materials',
            feature4: '3D visualization',
            feature5: 'Motion design',
            price: '$40K+',
            timeline: '4-8 months',
          },
        },
        // Marketing packages
        marketing: {
          starter: {
            feature1: 'Marketing strategy',
            feature2: 'Content plan',
            feature3: 'Social media setup',
            price: '$2K - $6K',
            timeline: '1 month',
          },
          professional: {
            feature1: 'Comprehensive marketing strategy',
            feature2: 'Content production',
            feature3: 'Social media management',
            feature4: 'PR campaigns',
            price: '$8K - $20K',
            timeline: '2-3 months',
          },
          enterprise: {
            feature1: 'Full marketing strategy',
            feature2: 'Content production + video',
            feature3: 'Community building',
            feature4: 'PR & partnerships',
            feature5: 'Performance marketing',
            price: '$25K+',
            timeline: '3-6 months',
          },
        },
        // Documents packages
        documents: {
          starter: {
            feature1: 'Business plan',
            feature2: 'Market analysis',
            feature3: 'Financial model',
            price: '$1.5K - $4K',
            timeline: '2-3 weeks',
          },
          professional: {
            feature1: 'Complete business documentation',
            feature2: 'Market research',
            feature3: 'Financial planning',
            feature4: 'Legal documents',
            price: '$5K - $12K',
            timeline: '1-2 months',
          },
          enterprise: {
            feature1: 'Full documentation package',
            feature2: 'Comprehensive market research',
            feature3: 'Advanced financial modeling',
            feature4: 'All legal documents',
            feature5: 'Investment deck',
            price: '$15K+',
            timeline: '2-3 months',
          },
        },
        // Video packages
        video: {
          starter: {
            feature1: 'Video production',
            feature2: 'Basic editing',
            feature3: 'Motion graphics',
            price: '$3K - $8K',
            timeline: '2-4 weeks',
          },
          professional: {
            feature1: 'Professional video production',
            feature2: 'Advanced editing',
            feature3: 'Motion graphics + animation',
            feature4: 'Sound design',
            price: '$10K - $25K',
            timeline: '1-2 months',
          },
          enterprise: {
            feature1: 'Full video production',
            feature2: 'Professional editing',
            feature3: '3D animation',
            feature4: 'Complete sound design',
            feature5: 'Multi-language versions',
            price: '$30K+',
            timeline: '2-4 months',
          },
        },
      },
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      readMore: 'Read More',
      contactUs: 'Contact Us',
      services: 'OUR SOLUTIONS',
      contact: 'CONTACT',
      cancel: 'Cancel',
    },
    modals: {
      sendResearch: {
        title: 'Send Project for Research',
        service: 'Service',
        descriptionLabel: 'Project Description',
        descriptionPlaceholder: 'Describe your project, requirements, goals...',
        filesLabel: 'Attach Files',
        dropFiles: 'Drag & drop files here',
        orClick: 'or click to select',
        nameLabel: 'Name',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        optional: 'Optional',
        send: 'Send',
      },
      consultation: {
        title: 'Schedule a Consultation',
        service: 'Service',
        selectDate: 'Select Date',
        selectTime: 'Select Time',
        nameLabel: 'Your Name',
        emailLabel: 'Your Email',
        descriptionLabel: 'Project Description',
        descriptionPlaceholder: 'Brief description of your project...',
        optional: 'Optional',
        confirm: 'Confirm Booking',
      },
    },
    about: {
      tagline: 'ABOUT',
      title: 'INNOVATION DEVELOPMENT LABORATORY',
      description: 'We create solutions at the intersection of technology, business, and creativity. From concept to implementation — full cycle development of innovative products and ecosystems.',
      mission: {
        title: 'MISSION',
        description: 'Develop innovative solutions that combine business strategy, creative art, and cutting-edge technologies. Create ecosystems and products that shape the future of digital space and open new opportunities for business and creativity.',
      },
      values: {
        title: 'VALUES',
        innovation: {
          title: 'INNOVATION',
          description: 'We experiment with cutting-edge technologies and create solutions that don\'t exist yet.',
        },
        result: {
          title: 'FOCUS ON RESULTS',
          description: 'Every project is aimed at achieving specific business goals and measurable results.',
        },
        team: {
          title: 'EXPERT TEAM',
          description: 'We unite specialists from different fields: development, design, business, science.',
        },
        speed: {
          title: 'SPEED AND QUALITY',
          description: 'We balance between fast implementation and high quality execution.',
        },
      },
      expertise: {
        title: 'EXPERTISE',
        subtitle: 'Areas of work and competencies',
        business: {
          category: 'BUSINESS & STRATEGY',
          item1: 'Business modeling',
          item2: 'Strategic planning',
          item3: 'Unit economics',
          item4: 'Market analysis',
          item5: 'Investment strategies',
        },
        design: {
          category: 'DESIGN & ARCHITECTURE',
          item1: 'UI/UX design',
          item2: 'Branding and identity',
          item3: 'System architecture',
          item4: '3D visualization',
          item5: 'Motion design',
        },
        webapp: {
          category: 'WEBSITES & APPLICATIONS',
          item1: 'Web development',
          item2: 'Mobile applications',
          item3: 'Full-stack solutions',
          item4: 'API and integrations',
          item5: 'DevOps and infrastructure',
        },
        ecosystems: {
          category: 'ECOSYSTEMS',
          item1: 'WEB3 platforms',
          item2: 'Blockchain solutions',
          item3: 'Decentralized systems',
          item4: 'Smart contracts',
          item5: 'NFT and tokenization',
        },
        marketing: {
          category: 'MARKETING & BRANDING',
          item1: 'Launch strategy',
          item2: 'Content marketing',
          item3: 'PR and communications',
          item4: 'Community and partnerships',
          item5: 'Performance marketing',
        },
        video: {
          category: 'VIDEO & FILM',
          item1: 'Video production',
          item2: 'Motion graphics',
          item3: '3D animation',
          item4: 'Post-production',
          item5: 'Creative production',
        },
      },
      cta: {
        title: 'READY TO COLLABORATE?',
        description: 'Let\'s discuss your project and opportunities to create innovative solutions.',
        contactButton: 'CONTACT',
        casesButton: 'CASES',
      },
    },
    cases: {
      tagline: 'PORTFOLIO',
      title: 'CASES & PROJECTS',
      description: 'Examples of implemented projects demonstrating our approach to creating innovative solutions.',
      learnMore: 'LEARN MORE',
      ctaTitle: 'INTERESTED IN COLLABORATION?',
      ctaDescription: 'Let\'s discuss your project and opportunities to create similar solutions.',
      ctaButton: 'DISCUSS PROJECT',
      web3Bank: {
        title: 'WEB3 BLOCKCHAIN BANK SYSTEM',
        category: 'Blockchain',
        description: 'Automated cross-chain system for estimating user reputation on the blockchain. The system analyzes user transactions to assign a credibility score. Technical solution: creation of fungible tokens on Everscale and their bridging to Ethereum where they transform into Non-Fungible Tokens (SBTs).',
      },
      daoEcology: {
        title: 'DAO ECOLOGY PLATFORM (VODeco)',
        category: 'Blockchain Ecosystem',
        description: 'Special DAO system for collecting, analyzing, and providing universal access to environmental information, starting with water resources. Integrates AI for learning and finding solutions to save the environment. Blockchain and DeFi provide the DAO structure for selection, decision-making, and campaign management.',
      },
      mailServices: {
        title: 'MAIL AND CLEANING SERVICES SYSTEM',
        category: 'Service Platform',
        description: 'Unified service platform for sending and delivering mail and parcels, cleaning clothes, renting lockers, and handling deliveries, all within a convenient user interface application.',
      },
    },
  },
  ru: {
    header: {
      search: 'Поиск',
      searchPlaceholder: 'поиск...',
      menu: {
        hub: 'HUB',
        about: 'О НАС',
        services: 'УСЛУГИ',
        cases: 'КЕЙСЫ',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'КОНТАКТЫ',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Наши проекты в разработке',
      projectsInDevelopment: 'Проекты в разработке',
      openForInvestment: 'Открыты для инвестиций',
      viewProject: 'Подробнее',
      progress: 'Прогресс',
      status: 'Статус',
      investment: 'Цель инвестиций',
      invested: 'Инвестировано',
      statusActive: 'Активен',
      statusPilot: 'Пилотный проект',
      statusBeta: 'Бета',
      statusPlanning: 'Планирование',
    },
    home: {
      tagline: 'ЛАБОРАТОРИЯ ИННОВАЦИЙ',
      title: 'ЛАБОРАТОРИЯ',
      titleHighlight: 'РАЗРАБОТОК',
      titleEnd: 'ИННОВАЦИЙ',
      description: 'Мы превращаем амбициозные идеи в продукты, лидирующие на рынке. Наш междисциплинарный подход объединяет передовые технологии, стратегическое бизнес-мышление и научные исследования для создания решений, которые обеспечивают измеримые результаты.',
      tags: 'Экосистемы · Блокчейн · Дизайн · Маркетинг · AI · R&D',
      whyTitle: 'МНОГООБРАЗИЕ ЭКСПЕРТИЗЫ',
      whySubtitle: 'Почему междисциплинарный подход',
      whyDescription: 'Объединение экспертизы в технологиях, дизайне, бизнесе и науке позволяет создавать комплексные решения, недоступные узкоспециализированным командам.',
      whyItem1Title: 'СИНТЕЗ ЗНАНИЙ',
      whyItem1Desc: 'Интеграция методологий из разных дисциплин создает уникальные подходы к решению сложных задач',
      whyItem2Title: 'ЭФФЕКТИВНОСТЬ КОМАНДЫ',
      whyItem2Desc: 'Единая команда экспертов обеспечивает быструю реализацию проектов без потери качества на этапах передачи между подрядчиками',
      whyItem3Title: 'ИННОВАЦИОННЫЕ ПОДХОДЫ',
      whyItem3Desc: 'Комбинация технологий из разных областей открывает новые возможности для бизнеса и творчества',
      servicesTitle: 'НАШИ РЕШЕНИЯ',
      servicesSubtitle: 'Направления работы',
      methodologyTitle: 'МЕТОДОЛОГИЯ РАБОТЫ',
      methodologySubtitle: 'Глубина исследований',
      methodologyDescription: 'Каждый проект начинается с комплексного исследования: анализ рынка, конкурентной среды, пользовательских потребностей и технических ограничений. Только после глубокого понимания контекста мы приступаем к разработке.',
      process: 'Процесс',
      layer1: 'Исследование',
      layer1Name: 'Анализ рынка',
      layer1Desc: 'Исследование рынка, анализ конкурентов, потребности пользователей',
      layer2: 'Стратегия',
      layer2Name: 'Стратегическое планирование',
      layer2Desc: 'Бизнес-модель, архитектура, технологический стек',
      layer3: 'Разработка',
      layer3Name: 'Реализация',
      layer3Desc: 'Дизайн, разработка, тестирование, оптимизация',
      layer4: 'Рост',
      layer4Name: 'Масштабирование',
      layer4Desc: 'Запуск, маркетинг, поддержка, развитие',
      globalTitle: 'МЕЖДУНАРОДНАЯ ЭКСПЕРТИЗА',
      globalSubtitle: 'Глобальное присутствие',
      coverage: 'Охват',
      countries: 'Стран',
      network: 'Глобальная сеть',
      networkDescription: 'Распределенная команда экспертов в разных часовых поясах обеспечивает непрерывную работу над проектами и поддержку клиентов по всему миру.',
      availableWorldwide: 'Доступно по всему миру',
      venturesTitle: 'ПОРТФОЛИО ПРОЕКТОВ',
      venturesSubtitle: 'Инвестиционные возможности',
      portfolio: 'Портфолио',
      venturesDescription: 'Проекты лаборатории, демонстрирующие наш подход к созданию инновационных решений в области блокчейна, искусственного интеллекта и цифровых платформ.',
      highGrowth: 'Высокий потенциал роста',
      viewProjects: 'СМОТРЕТЬ ПРОЕКТЫ',
      metrics: 'Метрики',
      years: 'Лет',
      rdTitle: 'НАУЧНЫЕ ИССЛЕДОВАНИЯ',
      rdDescription: 'Исследовательская деятельность в области передовых технологий: искусственный интеллект, блокчейн, пространственные вычисления. Публикации и открытые исследования.',
      explore: 'Изучить',
      joinTitle: 'КАРЬЕРА В ЛАБОРАТОРИИ',
      joinDescription: 'Присоединяйтесь к команде экспертов. Мы ищем талантливых разработчиков, дизайнеров и исследователей. Удаленная работа, участие в капитале проектов.',
      viewVacancies: 'СМОТРЕТЬ ВАКАНСИИ',
      ctaTitle: 'ГОТОВЫ РЕАЛИЗОВАТЬ',
      ctaTitleEnd: 'ВАШ ПРОЕКТ?',
      ctaDescription: 'Обсудим ваш проект и возможности сотрудничества. Первичная консультация — бесплатно.',
      startProject: 'ОБСУДИТЬ ПРОЕКТ',
      footer: '© 2025 FRACTALIX.LAB. Все права защищены.',
      vacancies: 'ВАКАНСИИ',
      learnMore: 'Узнать больше',
      scrollToExplore: 'Прокрутите для изучения',
      synergy: 'СИНЕРГИЯ',
    },
    services: {
      ecosystems: 'ЭКОСИСТЕМЫ',
      ecosystemsDesc: 'Комплексная разработка проектов',
      webapp: 'WEB/APP',
      webappDesc: 'Сайты, SPA, мобильные приложения',
      blockchain: 'БЛОКЧЕЙН',
      blockchainDesc: 'Смарт-контракты, DeFi, NFT',
      design: 'ДИЗАЙН',
      designDesc: 'UI/UX, брендинг, айдентика',
      marketing: 'МАРКЕТИНГ',
      marketingDesc: 'Продвижение, SMM, контент',
      documents: 'ДОКУМЕНТЫ',
      documentsDesc: 'Документы, контракты, отчеты',
      video: 'ВИДЕО',
      videoDesc: 'Продакшн, моушн-дизайн',
      more: 'Больше',
      title: 'УСЛУГИ',
      subtitle: 'Наши решения',
      description: 'Мы предлагаем комплексные услуги разработки в различных областях.',
      notFound: 'Нужно индивидуальное решение?',
      notFoundDesc: 'Не нашли то, что искали? Обсудим ваши уникальные требования.',
      packages: {
        investment: 'Инвестиции',
        timeline: 'Сроки',
        sendResearch: 'Отправить на исследование',
        scheduleConsultation: 'Записаться на консультацию',
        starter: 'СТАРТЕР',
        professional: 'ПРОФЕССИОНАЛЬНЫЙ',
        enterprise: 'КОРПОРАТИВНЫЙ',
        ecosystems: {
          starter: {
            feature1: 'Базовая архитектура экосистемы',
            feature2: 'Интеграция одной платформы',
            feature3: 'Разработка основных функций',
            feature4: 'Базовая админ-панель',
            price: '$15K - $30K',
            timeline: '2-3 месяца',
          },
          professional: {
            feature1: 'Комплексная архитектура экосистемы',
            feature2: 'Мультиплатформенная интеграция (веб + мобильная)',
            feature3: 'Разработка расширенных функций',
            feature4: 'Полная админ-панель + аналитика',
            feature5: 'Разработка API',
            price: '$40K - $80K',
            timeline: '4-6 месяцев',
          },
          enterprise: {
            feature1: 'Полная архитектура экосистемы',
            feature2: 'Полная интеграция платформ (веб + мобильная + блокчейн)',
            feature3: 'Разработка кастомных функций',
            feature4: 'Расширенная админ-панель + аналитика',
            feature5: 'Полная экосистема API',
            feature6: 'Поддержка и обслуживание',
            price: '$100K+',
            timeline: '6-12 месяцев',
          },
        },
        webapp: {
          starter: {
            feature1: 'Адаптивный дизайн сайта',
            feature2: 'Базовая функциональность',
            feature3: 'Система управления контентом',
            price: '$5K - $15K',
            timeline: '1-2 месяца',
          },
          professional: {
            feature1: 'Full-stack веб-приложение',
            feature2: 'Расширенная функциональность',
            feature3: 'Мобильное приложение (iOS/Android)',
            feature4: 'Админ-панель',
            price: '$20K - $50K',
            timeline: '3-5 месяцев',
          },
          enterprise: {
            feature1: 'Корпоративное веб-приложение',
            feature2: 'Кастомная функциональность',
            feature3: 'Нативные мобильные приложения',
            feature4: 'Расширенная админ-система',
            feature5: 'API интеграции',
            price: '$60K+',
            timeline: '5-10 месяцев',
          },
        },
        blockchain: {
          starter: {
            feature1: 'Разработка смарт-контрактов',
            feature2: 'Базовый интерфейс DApp',
            feature3: 'Создание токена',
            price: '$10K - $25K',
            timeline: '2-3 месяца',
          },
          professional: {
            feature1: 'Расширенные смарт-контракты',
            feature2: 'Полная разработка DApp',
            feature3: 'Токеномика и функции DeFi',
            feature4: 'Интеграция блокчейна',
            price: '$35K - $70K',
            timeline: '4-6 месяцев',
          },
          enterprise: {
            feature1: 'Сложная система смарт-контрактов',
            feature2: 'Полная блокчейн-экосистема',
            feature3: 'Расширенные функции DeFi',
            feature4: 'Мультичейн интеграция',
            feature5: 'Аудит безопасности',
            price: '$80K+',
            timeline: '6-12 месяцев',
          },
        },
        design: {
          starter: {
            feature1: 'UI/UX дизайн',
            feature2: 'Бренд-идентичность',
            feature3: 'Дизайн-система',
            price: '$3K - $8K',
            timeline: '1-2 месяца',
          },
          professional: {
            feature1: 'Полный UI/UX дизайн',
            feature2: 'Полная бренд-идентичность',
            feature3: 'Дизайн-система + гайдлайны',
            feature4: 'Маркетинговые материалы',
            price: '$12K - $30K',
            timeline: '2-4 месяца',
          },
          enterprise: {
            feature1: 'Корпоративная дизайн-система',
            feature2: 'Полная бренд-идентичность',
            feature3: 'Все маркетинговые материалы',
            feature4: '3D визуализация',
            feature5: 'Моушн-дизайн',
            price: '$40K+',
            timeline: '4-8 месяцев',
          },
        },
        marketing: {
          starter: {
            feature1: 'Маркетинговая стратегия',
            feature2: 'Контент-план',
            feature3: 'Настройка социальных сетей',
            price: '$2K - $6K',
            timeline: '1 месяц',
          },
          professional: {
            feature1: 'Комплексная маркетинговая стратегия',
            feature2: 'Производство контента',
            feature3: 'Управление социальными сетями',
            feature4: 'PR-кампании',
            price: '$8K - $20K',
            timeline: '2-3 месяца',
          },
          enterprise: {
            feature1: 'Полная маркетинговая стратегия',
            feature2: 'Производство контента + видео',
            feature3: 'Построение сообщества',
            feature4: 'PR и партнерства',
            feature5: 'Performance маркетинг',
            price: '$25K+',
            timeline: '3-6 месяцев',
          },
        },
        documents: {
          starter: {
            feature1: 'Бизнес-план',
            feature2: 'Анализ рынка',
            feature3: 'Финансовая модель',
            price: '$1.5K - $4K',
            timeline: '2-3 недели',
          },
          professional: {
            feature1: 'Полная бизнес-документация',
            feature2: 'Исследование рынка',
            feature3: 'Финансовое планирование',
            feature4: 'Юридические документы',
            price: '$5K - $12K',
            timeline: '1-2 месяца',
          },
          enterprise: {
            feature1: 'Полный пакет документации',
            feature2: 'Комплексное исследование рынка',
            feature3: 'Расширенное финансовое моделирование',
            feature4: 'Все юридические документы',
            feature5: 'Инвестиционная презентация',
            price: '$15K+',
            timeline: '2-3 месяца',
          },
        },
        video: {
          starter: {
            feature1: 'Видеопродакшн',
            feature2: 'Базовая обработка',
            feature3: 'Моушн-графика',
            price: '$3K - $8K',
            timeline: '2-4 недели',
          },
          professional: {
            feature1: 'Профессиональный видеопродакшн',
            feature2: 'Расширенная обработка',
            feature3: 'Моушн-графика + анимация',
            feature4: 'Звуковой дизайн',
            price: '$10K - $25K',
            timeline: '1-2 месяца',
          },
          enterprise: {
            feature1: 'Полный видеопродакшн',
            feature2: 'Профессиональная обработка',
            feature3: '3D анимация',
            feature4: 'Полный звуковой дизайн',
            feature5: 'Версии на нескольких языках',
            price: '$30K+',
            timeline: '2-4 месяца',
          },
        },
      },
    },
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      readMore: 'Читать далее',
      contactUs: 'Связаться с нами',
      services: 'НАШИ РЕШЕНИЯ',
      contact: 'КОНТАКТЫ',
      cancel: 'Отмена',
    },
    modals: {
      sendResearch: {
        title: 'Отправить проект на исследование',
        service: 'Услуга',
        descriptionLabel: 'Описание проекта',
        descriptionPlaceholder: 'Опишите ваш проект, требования, цели...',
        filesLabel: 'Прикрепить файлы',
        dropFiles: 'Перетащите файлы сюда',
        orClick: 'или нажмите для выбора',
        nameLabel: 'Имя',
        emailLabel: 'Email',
        phoneLabel: 'Телефон',
        optional: 'Необязательно',
        send: 'Отправить',
      },
      consultation: {
        title: 'Записаться на консультацию',
        service: 'Услуга',
        selectDate: 'Выберите дату',
        selectTime: 'Выберите время',
        nameLabel: 'Ваше имя',
        emailLabel: 'Ваш email',
        descriptionLabel: 'Описание проекта',
        descriptionPlaceholder: 'Краткое описание вашего проекта...',
        optional: 'Необязательно',
        confirm: 'Подтвердить запись',
      },
    },
    about: {
      tagline: 'О НАС',
      title: 'ЛАБОРАТОРИЯ РАЗРАБОТОК ИННОВАЦИЙ',
      description: 'Создаём решения на стыке технологий, бизнеса и творчества. От концепции до реализации — полный цикл разработки инновационных продуктов и экосистем.',
      mission: {
        title: 'МИССИЯ',
        description: 'Разрабатывать инновационные решения, которые объединяют бизнес-стратегию, креативное искусство и передовые технологии. Создавать экосистемы и продукты, которые формируют будущее цифрового пространства и открывают новые возможности для бизнеса и творчества.',
      },
      values: {
        title: 'ЦЕННОСТИ',
        innovation: {
          title: 'ИННОВАЦИИ',
          description: 'Экспериментируем с передовыми технологиями и создаём решения, которых ещё не существует.',
        },
        result: {
          title: 'ФОКУС НА РЕЗУЛЬТАТ',
          description: 'Каждый проект нацелен на достижение конкретных бизнес-целей и измеримых результатов.',
        },
        team: {
          title: 'КОМАНДА ЭКСПЕРТОВ',
          description: 'Объединяем специалистов из разных областей: разработка, дизайн, бизнес, наука.',
        },
        speed: {
          title: 'СКОРОСТЬ И КАЧЕСТВО',
          description: 'Балансируем между быстрой реализацией и высоким качеством исполнения.',
        },
      },
      expertise: {
        title: 'ЭКСПЕРТИЗА',
        subtitle: 'Направления работы и области компетенций',
        business: {
          category: 'БИЗНЕС И СТРАТЕГИРОВАНИЕ',
          item1: 'Бизнес-моделирование',
          item2: 'Стратегическое планирование',
          item3: 'Unit-экономика',
          item4: 'Анализ рынка',
          item5: 'Инвестиционные стратегии',
        },
        design: {
          category: 'ДИЗАЙН И АРХИТЕКТУРА',
          item1: 'UI/UX дизайн',
          item2: 'Брендинг и идентичность',
          item3: 'Архитектура систем',
          item4: '3D визуализация',
          item5: 'Моушн-дизайн',
        },
        webapp: {
          category: 'САЙТЫ И ПРИЛОЖЕНИЯ',
          item1: 'Веб-разработка',
          item2: 'Мобильные приложения',
          item3: 'Full-stack решения',
          item4: 'API и интеграции',
          item5: 'DevOps и инфраструктура',
        },
        ecosystems: {
          category: 'ЭКОСИСТЕМЫ',
          item1: 'WEB3 платформы',
          item2: 'Блокчейн решения',
          item3: 'Децентрализованные системы',
          item4: 'Смарт-контракты',
          item5: 'NFT и токенизация',
        },
        marketing: {
          category: 'МАРКЕТИНГ И БРЕНДИНГ',
          item1: 'Стратегия запуска',
          item2: 'Контент-маркетинг',
          item3: 'PR и коммуникации',
          item4: 'Сообщество и партнёрства',
          item5: 'Performance маркетинг',
        },
        video: {
          category: 'ВИДЕО И КИНО',
          item1: 'Видеопродакшн',
          item2: 'Моушн-графика',
          item3: '3D анимация',
          item4: 'Постпродакшн',
          item5: 'Креативное производство',
        },
      },
      cta: {
        title: 'ГОТОВЫ К СОТРУДНИЧЕСТВУ?',
        description: 'Обсудим ваш проект и возможности создания инновационных решений.',
        contactButton: 'СВЯЗАТЬСЯ',
        casesButton: 'КЕЙСЫ',
      },
    },
    cases: {
      tagline: 'ПОРТФОЛИО',
      title: 'КЕЙСЫ И ПРОЕКТЫ',
      description: 'Примеры реализованных проектов, демонстрирующих наш подход к созданию инновационных решений.',
      learnMore: 'ПОДРОБНЕЕ',
      ctaTitle: 'ЗАИНТЕРЕСОВАНЫ В СОТРУДНИЧЕСТВЕ?',
      ctaDescription: 'Обсудим ваш проект и возможности создания подобных решений.',
      ctaButton: 'ОБСУДИТЬ ПРОЕКТ',
      web3Bank: {
        title: 'WEB3 БЛОКЧЕЙН БАНКОВСКАЯ СИСТЕМА',
        category: 'Блокчейн',
        description: 'Автоматизированная кроссчейн система для оценки репутации пользователей в блокчейне. Система анализирует транзакции пользователей для присвоения оценки доверия. Техническое решение: создание фангибл токенов на Everscale и их бриджинг в Ethereum, где они трансформируются в Non-Fungible Tokens (SBTs).',
      },
      daoEcology: {
        title: 'DAO ЭКОЛОГИЧЕСКАЯ ПЛАТФОРМА (VODeco)',
        category: 'Блокчейн Экосистема',
        description: 'Специальная DAO система для сбора, анализа и открытия универсального доступа к экологической информации, начиная с водных ресурсов. Интеграция AI для обучения и поиска решений для сохранения окружающей среды. Blockchain и DeFi обеспечивают структуру DAO для выбора, принятия решений и управления кампаниями.',
      },
      mailServices: {
        title: 'СИСТЕМА ПОЧТЫ И ХИМЧИСТКИ',
        category: 'Сервисная Платформа',
        description: 'Единая сервисная платформа для отправки и доставки почты и посылок, чистки одежды, аренды ячеек и обработки доставок, все в удобном пользовательском интерфейсе приложения.',
      },
    },
  },
  ar: {
    header: {
      search: 'بحث',
      searchPlaceholder: 'بحث...',
      menu: {
        hub: 'HUB',
        about: 'من نحن',
        services: 'الخدمات',
        cases: 'الحالات',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'اتصل بنا',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'مشاريعنا قيد التطوير',
      projectsInDevelopment: 'مشاريع قيد التطوير',
      openForInvestment: 'مفتوحة للاستثمار',
      viewProject: 'عرض المشروع',
      progress: 'التقدم',
      status: 'الحالة',
      investment: 'هدف الاستثمار',
      invested: 'المستثمر',
      statusActive: 'نشط',
      statusPilot: 'مشروع تجريبي',
      statusBeta: 'بيتا',
      statusPlanning: 'التخطيط',
    },
    home: enHomeTranslations,
    services: {
      ecosystems: 'النظم البيئية',
      ecosystemsDesc: 'تطوير المشاريع الشاملة',
      webapp: 'WEB/APP',
      webappDesc: 'مواقع الويب، تطبيقات SPA، تطبيقات الهاتف المحمول',
      blockchain: 'BLOCKCHAIN',
      blockchainDesc: 'العقود الذكية، DeFi، NFT',
      design: 'التصميم',
      designDesc: 'UI/UX، الهوية التجارية، الهوية',
      marketing: 'التسويق',
      marketingDesc: 'الترويج، SMM، المحتوى',
      documents: 'الوثائق',
      documentsDesc: 'الوثائق، العقود، التقارير',
      video: 'فيديو',
      videoDesc: 'الإنتاج، تصميم الحركة',
      more: 'المزيد',
      title: 'الخدمات',
      subtitle: 'حلولنا',
      description: 'نقدم خدمات تطوير شاملة عبر مختلف التخصصات.',
      notFound: 'تحتاج حل مخصص؟',
      notFoundDesc: 'لم تجد ما تبحث عنه؟ دعنا نناقش متطلباتك الفريدة.',
      packages: {
        investment: 'الاستثمار',
        timeline: 'الجدول الزمني',
        sendResearch: 'إرسال للبحث',
        scheduleConsultation: 'حجز استشارة',
        starter: 'البداية',
        professional: 'المحترف',
        enterprise: 'المؤسسة',
      },
    },
    common: {
      loading: 'جارٍ التحميل...',
      error: 'خطأ',
      readMore: 'اقرأ المزيد',
      contactUs: 'اتصل بنا',
      services: 'حلولنا',
      contact: 'اتصل',
      cancel: 'إلغاء',
    },
    modals: {
      sendResearch: {
        title: 'إرسال المشروع للبحث',
        service: 'الخدمة',
        descriptionLabel: 'وصف المشروع',
        descriptionPlaceholder: 'اوصف مشروعك، المتطلبات، الأهداف...',
        filesLabel: 'إرفاق الملفات',
        dropFiles: 'اسحب وأفلت الملفات هنا',
        orClick: 'أو انقر للاختيار',
        nameLabel: 'الاسم',
        emailLabel: 'البريد الإلكتروني',
        phoneLabel: 'الهاتف',
        optional: 'اختياري',
        send: 'إرسال',
      },
      consultation: {
        title: 'حجز استشارة',
        service: 'الخدمة',
        selectDate: 'اختر التاريخ',
        selectTime: 'اختر الوقت',
        nameLabel: 'اسمك',
        emailLabel: 'بريدك الإلكتروني',
        descriptionLabel: 'وصف المشروع',
        descriptionPlaceholder: 'وصف مختصر لمشروعك...',
        optional: 'اختياري',
        confirm: 'تأكيد الحجز',
      },
    },
    about: {
      tagline: 'ABOUT',
      title: 'INNOVATION DEVELOPMENT LABORATORY',
      description: 'We create solutions at the intersection of technology, business, and creativity. From concept to implementation — full cycle development of innovative products and ecosystems.',
      mission: {
        title: 'MISSION',
        description: 'Develop innovative solutions that combine business strategy, creative art, and cutting-edge technologies. Create ecosystems and products that shape the future of digital space and open new opportunities for business and creativity.',
      },
      values: {
        title: 'VALUES',
        innovation: {
          title: 'INNOVATION',
          description: 'We experiment with cutting-edge technologies and create solutions that don\'t exist yet.',
        },
        result: {
          title: 'FOCUS ON RESULTS',
          description: 'Every project is aimed at achieving specific business goals and measurable results.',
        },
        team: {
          title: 'EXPERT TEAM',
          description: 'We unite specialists from different fields: development, design, business, science.',
        },
        speed: {
          title: 'SPEED AND QUALITY',
          description: 'We balance between fast implementation and high quality execution.',
        },
      },
      expertise: {
        title: 'EXPERTISE',
        subtitle: 'Areas of work and competencies',
        business: {
          category: 'BUSINESS & STRATEGY',
          item1: 'Business modeling',
          item2: 'Strategic planning',
          item3: 'Unit economics',
          item4: 'Market analysis',
          item5: 'Investment strategies',
        },
        design: {
          category: 'DESIGN & ARCHITECTURE',
          item1: 'UI/UX design',
          item2: 'Branding and identity',
          item3: 'System architecture',
          item4: '3D visualization',
          item5: 'Motion design',
        },
        webapp: {
          category: 'WEBSITES & APPLICATIONS',
          item1: 'Web development',
          item2: 'Mobile applications',
          item3: 'Full-stack solutions',
          item4: 'API and integrations',
          item5: 'DevOps and infrastructure',
        },
        ecosystems: {
          category: 'ECOSYSTEMS',
          item1: 'WEB3 platforms',
          item2: 'Blockchain solutions',
          item3: 'Decentralized systems',
          item4: 'Smart contracts',
          item5: 'NFT and tokenization',
        },
        marketing: {
          category: 'MARKETING & BRANDING',
          item1: 'Launch strategy',
          item2: 'Content marketing',
          item3: 'PR and communications',
          item4: 'Community and partnerships',
          item5: 'Performance marketing',
        },
        video: {
          category: 'VIDEO & FILM',
          item1: 'Video production',
          item2: 'Motion graphics',
          item3: '3D animation',
          item4: 'Post-production',
          item5: 'Creative production',
        },
      },
      cta: {
        title: 'READY TO COLLABORATE?',
        description: 'Let\'s discuss your project and opportunities to create innovative solutions.',
        contactButton: 'CONTACT',
        casesButton: 'CASES',
      },
    },
    cases: {
      tagline: 'PORTFOLIO',
      title: 'CASES & PROJECTS',
      description: 'Examples of implemented projects demonstrating our approach to creating innovative solutions.',
      learnMore: 'LEARN MORE',
      ctaTitle: 'INTERESTED IN COLLABORATION?',
      ctaDescription: 'Let\'s discuss your project and opportunities to create similar solutions.',
      ctaButton: 'DISCUSS PROJECT',
      web3Bank: {
        title: 'WEB3 BLOCKCHAIN BANK SYSTEM',
        category: 'Blockchain',
        description: 'Automated cross-chain system for estimating user reputation on the blockchain. The system analyzes user transactions to assign a credibility score. Technical solution: creation of fungible tokens on Everscale and their bridging to Ethereum where they transform into Non-Fungible Tokens (SBTs).',
      },
      daoEcology: {
        title: 'DAO ECOLOGY PLATFORM (VODeco)',
        category: 'Blockchain Ecosystem',
        description: 'Special DAO system for collecting, analyzing, and providing universal access to environmental information, starting with water resources. Integrates AI for learning and finding solutions to save the environment. Blockchain and DeFi provide the DAO structure for selection, decision-making, and campaign management.',
      },
      mailServices: {
        title: 'MAIL AND CLEANING SERVICES SYSTEM',
        category: 'Service Platform',
        description: 'Unified service platform for sending and delivering mail and parcels, cleaning clothes, renting lockers, and handling deliveries, all within a convenient user interface application.',
      },
    },
  },
  es: {
    header: {
      search: 'Buscar',
      searchPlaceholder: 'buscar...',
      menu: {
        hub: 'HUB',
        about: 'ACERCA DE',
        services: 'SERVICIOS',
        cases: 'CASOS',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'CONTACTO',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Nuestros Proyectos en Desarrollo',
      projectsInDevelopment: 'Proyectos en Desarrollo',
      openForInvestment: 'Abiertos para Inversión',
      viewProject: 'Ver Proyecto',
      progress: 'Progreso',
      status: 'Estado',
      investment: 'Meta de Inversión',
      invested: 'Invertido',
      statusActive: 'Activo',
      statusPilot: 'Proyecto Piloto',
      statusBeta: 'Beta',
      statusPlanning: 'Planificación',
    },
    home: enHomeTranslations,
    services: {
      ecosystems: 'ECOSISTEMAS',
      ecosystemsDesc: 'Desarrollo integral de proyectos',
      webapp: 'WEB/APP',
      webappDesc: 'Sitios web, SPA, aplicaciones móviles',
      blockchain: 'BLOCKCHAIN',
      blockchainDesc: 'Contratos inteligentes, DeFi, NFT',
      design: 'DISEÑO',
      designDesc: 'UI/UX, branding, identidad',
      marketing: 'MARKETING',
      marketingDesc: 'Promoción, SMM, contenido',
      documents: 'DOCUMENTOS',
      documentsDesc: 'Documentos, contratos, informes',
      video: 'VIDEO',
      videoDesc: 'Producción, diseño de movimiento',
      more: 'Más',
      title: 'SERVICIOS',
      subtitle: 'Nuestras Soluciones',
      description: 'Ofrecemos servicios de desarrollo integrales en múltiples disciplinas.',
      notFound: '¿Necesitas una Solución Personalizada?',
      notFoundDesc: '¿No encuentras lo que buscas? Hablemos de tus requisitos únicos.',
      packages: {
        investment: 'Inversión',
        timeline: 'Cronograma',
        sendResearch: 'Enviar para Investigación',
        scheduleConsultation: 'Programar Consulta',
        starter: 'STARTER',
        professional: 'PROFESIONAL',
        enterprise: 'EMPRESARIAL',
      },
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      readMore: 'Leer Más',
      contactUs: 'Contáctenos',
      services: 'NUESTRAS SOLUCIONES',
      contact: 'CONTACTO',
      cancel: 'Cancelar',
    },
    modals: {
      sendResearch: {
        title: 'Enviar Proyecto para Investigación',
        service: 'Servicio',
        descriptionLabel: 'Descripción del Proyecto',
        descriptionPlaceholder: 'Describe tu proyecto, requisitos, objetivos...',
        filesLabel: 'Adjuntar Archivos',
        dropFiles: 'Arrastra y suelta archivos aquí',
        orClick: 'o haz clic para seleccionar',
        nameLabel: 'Nombre',
        emailLabel: 'Email',
        phoneLabel: 'Teléfono',
        optional: 'Opcional',
        send: 'Enviar',
      },
      consultation: {
        title: 'Programar una Consulta',
        service: 'Servicio',
        selectDate: 'Seleccionar Fecha',
        selectTime: 'Seleccionar Hora',
        nameLabel: 'Tu Nombre',
        emailLabel: 'Tu Email',
        descriptionLabel: 'Descripción del Proyecto',
        descriptionPlaceholder: 'Breve descripción de tu proyecto...',
        optional: 'Opcional',
        confirm: 'Confirmar Reserva',
      },
    },
    about: {
      tagline: 'ABOUT',
      title: 'INNOVATION DEVELOPMENT LABORATORY',
      description: 'We create solutions at the intersection of technology, business, and creativity. From concept to implementation — full cycle development of innovative products and ecosystems.',
      mission: {
        title: 'MISSION',
        description: 'Develop innovative solutions that combine business strategy, creative art, and cutting-edge technologies. Create ecosystems and products that shape the future of digital space and open new opportunities for business and creativity.',
      },
      values: {
        title: 'VALUES',
        innovation: {
          title: 'INNOVATION',
          description: 'We experiment with cutting-edge technologies and create solutions that don\'t exist yet.',
        },
        result: {
          title: 'FOCUS ON RESULTS',
          description: 'Every project is aimed at achieving specific business goals and measurable results.',
        },
        team: {
          title: 'EXPERT TEAM',
          description: 'We unite specialists from different fields: development, design, business, science.',
        },
        speed: {
          title: 'SPEED AND QUALITY',
          description: 'We balance between fast implementation and high quality execution.',
        },
      },
      expertise: {
        title: 'EXPERTISE',
        subtitle: 'Areas of work and competencies',
        business: {
          category: 'BUSINESS & STRATEGY',
          item1: 'Business modeling',
          item2: 'Strategic planning',
          item3: 'Unit economics',
          item4: 'Market analysis',
          item5: 'Investment strategies',
        },
        design: {
          category: 'DESIGN & ARCHITECTURE',
          item1: 'UI/UX design',
          item2: 'Branding and identity',
          item3: 'System architecture',
          item4: '3D visualization',
          item5: 'Motion design',
        },
        webapp: {
          category: 'WEBSITES & APPLICATIONS',
          item1: 'Web development',
          item2: 'Mobile applications',
          item3: 'Full-stack solutions',
          item4: 'API and integrations',
          item5: 'DevOps and infrastructure',
        },
        ecosystems: {
          category: 'ECOSYSTEMS',
          item1: 'WEB3 platforms',
          item2: 'Blockchain solutions',
          item3: 'Decentralized systems',
          item4: 'Smart contracts',
          item5: 'NFT and tokenization',
        },
        marketing: {
          category: 'MARKETING & BRANDING',
          item1: 'Launch strategy',
          item2: 'Content marketing',
          item3: 'PR and communications',
          item4: 'Community and partnerships',
          item5: 'Performance marketing',
        },
        video: {
          category: 'VIDEO & FILM',
          item1: 'Video production',
          item2: 'Motion graphics',
          item3: '3D animation',
          item4: 'Post-production',
          item5: 'Creative production',
        },
      },
      cta: {
        title: 'READY TO COLLABORATE?',
        description: 'Let\'s discuss your project and opportunities to create innovative solutions.',
        contactButton: 'CONTACT',
        casesButton: 'CASES',
      },
    },
    cases: {
      tagline: 'PORTFOLIO',
      title: 'CASES & PROJECTS',
      description: 'Examples of implemented projects demonstrating our approach to creating innovative solutions.',
      learnMore: 'LEARN MORE',
      ctaTitle: 'INTERESTED IN COLLABORATION?',
      ctaDescription: 'Let\'s discuss your project and opportunities to create similar solutions.',
      ctaButton: 'DISCUSS PROJECT',
      web3Bank: {
        title: 'WEB3 BLOCKCHAIN BANK SYSTEM',
        category: 'Blockchain',
        description: 'Automated cross-chain system for estimating user reputation on the blockchain. The system analyzes user transactions to assign a credibility score. Technical solution: creation of fungible tokens on Everscale and their bridging to Ethereum where they transform into Non-Fungible Tokens (SBTs).',
      },
      daoEcology: {
        title: 'DAO ECOLOGY PLATFORM (VODeco)',
        category: 'Blockchain Ecosystem',
        description: 'Special DAO system for collecting, analyzing, and providing universal access to environmental information, starting with water resources. Integrates AI for learning and finding solutions to save the environment. Blockchain and DeFi provide the DAO structure for selection, decision-making, and campaign management.',
      },
      mailServices: {
        title: 'MAIL AND CLEANING SERVICES SYSTEM',
        category: 'Service Platform',
        description: 'Unified service platform for sending and delivering mail and parcels, cleaning clothes, renting lockers, and handling deliveries, all within a convenient user interface application.',
      },
    },
  },
  pl: {
    header: {
      search: 'Szukaj',
      searchPlaceholder: 'szukaj...',
      menu: {
        hub: 'HUB',
        about: 'O NAS',
        services: 'USŁUGI',
        cases: 'PRZYPADKI',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'KONTAKT',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Nasze Projekty w Rozwoju',
      projectsInDevelopment: 'Projekty w Rozwoju',
      openForInvestment: 'Otwarte na Inwestycje',
      viewProject: 'Zobacz Projekt',
      progress: 'Postęp',
      status: 'Status',
      investment: 'Cel Inwestycji',
      invested: 'Zainwestowano',
      statusActive: 'Aktywny',
      statusPilot: 'Projekt Pilotażowy',
      statusBeta: 'Beta',
      statusPlanning: 'Planowanie',
    },
    home: enHomeTranslations,
    services: {
      ecosystems: 'EKOSYSTEMY',
      ecosystemsDesc: 'Kompleksowy rozwój projektów',
      webapp: 'WEB/APP',
      webappDesc: 'Strony internetowe, SPA, aplikacje mobilne',
      blockchain: 'BLOCKCHAIN',
      blockchainDesc: 'Inteligentne kontrakty, DeFi, NFT',
      design: 'DESIGN',
      designDesc: 'UI/UX, branding, tożsamość',
      marketing: 'MARKETING',
      marketingDesc: 'Promocja, SMM, treść',
      documents: 'DOKUMENTY',
      documentsDesc: 'Dokumenty, umowy, raporty',
      video: 'VIDEO',
      videoDesc: 'Produkcja, projektowanie ruchu',
      more: 'Więcej',
      title: 'USŁUGI',
      subtitle: 'Nasze Rozwiązania',
      description: 'Oferujemy kompleksowe usługi rozwojowe w wielu dziedzinach.',
      notFound: 'Potrzebujesz Indywidualnego Rozwiązania?',
      notFoundDesc: 'Nie znalazłeś tego, czego szukasz? Omówmy Twoje unikalne wymagania.',
      packages: {
        investment: 'Inwestycja',
        timeline: 'Harmonogram',
        sendResearch: 'Wyślij do Badań',
        scheduleConsultation: 'Umów Konsultację',
        starter: 'STARTER',
        professional: 'PROFESJONALNY',
        enterprise: 'ENTERPRISE',
      },
    },
    common: {
      loading: 'Ładowanie...',
      error: 'Błąd',
      readMore: 'Czytaj Więcej',
      contactUs: 'Skontaktuj się',
      services: 'NASZE ROZWIĄZANIA',
      contact: 'KONTAKT',
      cancel: 'Anuluj',
    },
    modals: {
      sendResearch: {
        title: 'Wyślij Projekt do Badań',
        service: 'Usługa',
        descriptionLabel: 'Opis Projektu',
        descriptionPlaceholder: 'Opisz swój projekt, wymagania, cele...',
        filesLabel: 'Dołącz Pliki',
        dropFiles: 'Przeciągnij i upuść pliki tutaj',
        orClick: 'lub kliknij, aby wybrać',
        nameLabel: 'Imię',
        emailLabel: 'Email',
        phoneLabel: 'Telefon',
        optional: 'Opcjonalnie',
        send: 'Wyślij',
      },
      consultation: {
        title: 'Umów Konsultację',
        service: 'Usługa',
        selectDate: 'Wybierz Datę',
        selectTime: 'Wybierz Czas',
        nameLabel: 'Twoje Imię',
        emailLabel: 'Twój Email',
        descriptionLabel: 'Opis Projektu',
        descriptionPlaceholder: 'Krótki opis Twojego projektu...',
        optional: 'Opcjonalnie',
        confirm: 'Potwierdź Rezerwację',
      },
    },
    about: {
      tagline: 'ABOUT',
      title: 'INNOVATION DEVELOPMENT LABORATORY',
      description: 'We create solutions at the intersection of technology, business, and creativity. From concept to implementation — full cycle development of innovative products and ecosystems.',
      mission: {
        title: 'MISSION',
        description: 'Develop innovative solutions that combine business strategy, creative art, and cutting-edge technologies. Create ecosystems and products that shape the future of digital space and open new opportunities for business and creativity.',
      },
      values: {
        title: 'VALUES',
        innovation: {
          title: 'INNOVATION',
          description: 'We experiment with cutting-edge technologies and create solutions that don\'t exist yet.',
        },
        result: {
          title: 'FOCUS ON RESULTS',
          description: 'Every project is aimed at achieving specific business goals and measurable results.',
        },
        team: {
          title: 'EXPERT TEAM',
          description: 'We unite specialists from different fields: development, design, business, science.',
        },
        speed: {
          title: 'SPEED AND QUALITY',
          description: 'We balance between fast implementation and high quality execution.',
        },
      },
      expertise: {
        title: 'EXPERTISE',
        subtitle: 'Areas of work and competencies',
        business: {
          category: 'BUSINESS & STRATEGY',
          item1: 'Business modeling',
          item2: 'Strategic planning',
          item3: 'Unit economics',
          item4: 'Market analysis',
          item5: 'Investment strategies',
        },
        design: {
          category: 'DESIGN & ARCHITECTURE',
          item1: 'UI/UX design',
          item2: 'Branding and identity',
          item3: 'System architecture',
          item4: '3D visualization',
          item5: 'Motion design',
        },
        webapp: {
          category: 'WEBSITES & APPLICATIONS',
          item1: 'Web development',
          item2: 'Mobile applications',
          item3: 'Full-stack solutions',
          item4: 'API and integrations',
          item5: 'DevOps and infrastructure',
        },
        ecosystems: {
          category: 'ECOSYSTEMS',
          item1: 'WEB3 platforms',
          item2: 'Blockchain solutions',
          item3: 'Decentralized systems',
          item4: 'Smart contracts',
          item5: 'NFT and tokenization',
        },
        marketing: {
          category: 'MARKETING & BRANDING',
          item1: 'Launch strategy',
          item2: 'Content marketing',
          item3: 'PR and communications',
          item4: 'Community and partnerships',
          item5: 'Performance marketing',
        },
        video: {
          category: 'VIDEO & FILM',
          item1: 'Video production',
          item2: 'Motion graphics',
          item3: '3D animation',
          item4: 'Post-production',
          item5: 'Creative production',
        },
      },
      cta: {
        title: 'READY TO COLLABORATE?',
        description: 'Let\'s discuss your project and opportunities to create innovative solutions.',
        contactButton: 'CONTACT',
        casesButton: 'CASES',
      },
    },
    cases: {
      tagline: 'PORTFOLIO',
      title: 'CASES & PROJECTS',
      description: 'Examples of implemented projects demonstrating our approach to creating innovative solutions.',
      learnMore: 'LEARN MORE',
      ctaTitle: 'INTERESTED IN COLLABORATION?',
      ctaDescription: 'Let\'s discuss your project and opportunities to create similar solutions.',
      ctaButton: 'DISCUSS PROJECT',
      web3Bank: {
        title: 'WEB3 BLOCKCHAIN BANK SYSTEM',
        category: 'Blockchain',
        description: 'Automated cross-chain system for estimating user reputation on the blockchain. The system analyzes user transactions to assign a credibility score. Technical solution: creation of fungible tokens on Everscale and their bridging to Ethereum where they transform into Non-Fungible Tokens (SBTs).',
      },
      daoEcology: {
        title: 'DAO ECOLOGY PLATFORM (VODeco)',
        category: 'Blockchain Ecosystem',
        description: 'Special DAO system for collecting, analyzing, and providing universal access to environmental information, starting with water resources. Integrates AI for learning and finding solutions to save the environment. Blockchain and DeFi provide the DAO structure for selection, decision-making, and campaign management.',
      },
      mailServices: {
        title: 'MAIL AND CLEANING SERVICES SYSTEM',
        category: 'Service Platform',
        description: 'Unified service platform for sending and delivering mail and parcels, cleaning clothes, renting lockers, and handling deliveries, all within a convenient user interface application.',
      },
    },
  },
  fr: {
    header: {
      search: 'Rechercher',
      searchPlaceholder: 'rechercher...',
      menu: {
        hub: 'HUB',
        about: 'À PROPOS',
        services: 'SERVICES',
        cases: 'CAS',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'CONTACT',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Nos Projets en Développement',
      projectsInDevelopment: 'Projets en Développement',
      openForInvestment: 'Ouverts aux Investissements',
      viewProject: 'Voir le Projet',
      progress: 'Progression',
      status: 'Statut',
      investment: 'Objectif d\'Investissement',
      invested: 'Investi',
      statusActive: 'Actif',
      statusPilot: 'Projet Pilote',
      statusBeta: 'Bêta',
      statusPlanning: 'Planification',
    },
    home: enHomeTranslations,
    services: {
      ecosystems: 'ÉCOSYSTÈMES',
      ecosystemsDesc: 'Développement complet de projets',
      webapp: 'WEB/APP',
      webappDesc: 'Sites web, SPA, applications mobiles',
      blockchain: 'BLOCKCHAIN',
      blockchainDesc: 'Contrats intelligents, DeFi, NFT',
      design: 'DESIGN',
      designDesc: 'UI/UX, branding, identité',
      marketing: 'MARKETING',
      marketingDesc: 'Promotion, SMM, contenu',
      documents: 'DOCUMENTS',
      documentsDesc: 'Documents, contrats, rapports',
      video: 'VIDÉO',
      videoDesc: 'Production, design de mouvement',
      more: 'Plus',
      title: 'SERVICES',
      subtitle: 'Nos Solutions',
      description: 'Nous offrons des services de développement complets dans plusieurs disciplines.',
      notFound: 'Besoin d\'une Solution Personnalisée?',
      notFoundDesc: 'Vous ne trouvez pas ce que vous cherchez? Discutons de vos besoins uniques.',
      packages: {
        investment: 'Investissement',
        timeline: 'Calendrier',
        sendResearch: 'Envoyer pour Recherche',
        scheduleConsultation: 'Programmer une Consultation',
        starter: 'STARTER',
        professional: 'PROFESSIONNEL',
        enterprise: 'ENTREPRISE',
      },
    },
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      readMore: 'Lire la Suite',
      contactUs: 'Contactez-nous',
      services: 'NOS SOLUTIONS',
      contact: 'CONTACT',
      cancel: 'Annuler',
    },
    modals: {
      sendResearch: {
        title: 'Envoyer Projet pour Recherche',
        service: 'Service',
        descriptionLabel: 'Description du Projet',
        descriptionPlaceholder: 'Décrivez votre projet, exigences, objectifs...',
        filesLabel: 'Joindre des Fichiers',
        dropFiles: 'Glissez-déposez les fichiers ici',
        orClick: 'ou cliquez pour sélectionner',
        nameLabel: 'Nom',
        emailLabel: 'Email',
        phoneLabel: 'Téléphone',
        optional: 'Optionnel',
        send: 'Envoyer',
      },
      consultation: {
        title: 'Programmer une Consultation',
        service: 'Service',
        selectDate: 'Sélectionner la Date',
        selectTime: 'Sélectionner l\'Heure',
        nameLabel: 'Votre Nom',
        emailLabel: 'Votre Email',
        descriptionLabel: 'Description du Projet',
        descriptionPlaceholder: 'Brève description de votre projet...',
        optional: 'Optionnel',
        confirm: 'Confirmer la Réservation',
      },
    },
    about: {
      tagline: 'ABOUT',
      title: 'INNOVATION DEVELOPMENT LABORATORY',
      description: 'We create solutions at the intersection of technology, business, and creativity. From concept to implementation — full cycle development of innovative products and ecosystems.',
      mission: {
        title: 'MISSION',
        description: 'Develop innovative solutions that combine business strategy, creative art, and cutting-edge technologies. Create ecosystems and products that shape the future of digital space and open new opportunities for business and creativity.',
      },
      values: {
        title: 'VALUES',
        innovation: {
          title: 'INNOVATION',
          description: 'We experiment with cutting-edge technologies and create solutions that don\'t exist yet.',
        },
        result: {
          title: 'FOCUS ON RESULTS',
          description: 'Every project is aimed at achieving specific business goals and measurable results.',
        },
        team: {
          title: 'EXPERT TEAM',
          description: 'We unite specialists from different fields: development, design, business, science.',
        },
        speed: {
          title: 'SPEED AND QUALITY',
          description: 'We balance between fast implementation and high quality execution.',
        },
      },
      expertise: {
        title: 'EXPERTISE',
        subtitle: 'Areas of work and competencies',
        business: {
          category: 'BUSINESS & STRATEGY',
          item1: 'Business modeling',
          item2: 'Strategic planning',
          item3: 'Unit economics',
          item4: 'Market analysis',
          item5: 'Investment strategies',
        },
        design: {
          category: 'DESIGN & ARCHITECTURE',
          item1: 'UI/UX design',
          item2: 'Branding and identity',
          item3: 'System architecture',
          item4: '3D visualization',
          item5: 'Motion design',
        },
        webapp: {
          category: 'WEBSITES & APPLICATIONS',
          item1: 'Web development',
          item2: 'Mobile applications',
          item3: 'Full-stack solutions',
          item4: 'API and integrations',
          item5: 'DevOps and infrastructure',
        },
        ecosystems: {
          category: 'ECOSYSTEMS',
          item1: 'WEB3 platforms',
          item2: 'Blockchain solutions',
          item3: 'Decentralized systems',
          item4: 'Smart contracts',
          item5: 'NFT and tokenization',
        },
        marketing: {
          category: 'MARKETING & BRANDING',
          item1: 'Launch strategy',
          item2: 'Content marketing',
          item3: 'PR and communications',
          item4: 'Community and partnerships',
          item5: 'Performance marketing',
        },
        video: {
          category: 'VIDEO & FILM',
          item1: 'Video production',
          item2: 'Motion graphics',
          item3: '3D animation',
          item4: 'Post-production',
          item5: 'Creative production',
        },
      },
      cta: {
        title: 'READY TO COLLABORATE?',
        description: 'Let\'s discuss your project and opportunities to create innovative solutions.',
        contactButton: 'CONTACT',
        casesButton: 'CASES',
      },
    },
    cases: {
      tagline: 'PORTFOLIO',
      title: 'CASES & PROJECTS',
      description: 'Examples of implemented projects demonstrating our approach to creating innovative solutions.',
      learnMore: 'LEARN MORE',
      ctaTitle: 'INTERESTED IN COLLABORATION?',
      ctaDescription: 'Let\'s discuss your project and opportunities to create similar solutions.',
      ctaButton: 'DISCUSS PROJECT',
      web3Bank: {
        title: 'WEB3 BLOCKCHAIN BANK SYSTEM',
        category: 'Blockchain',
        description: 'Automated cross-chain system for estimating user reputation on the blockchain. The system analyzes user transactions to assign a credibility score. Technical solution: creation of fungible tokens on Everscale and their bridging to Ethereum where they transform into Non-Fungible Tokens (SBTs).',
      },
      daoEcology: {
        title: 'DAO ECOLOGY PLATFORM (VODeco)',
        category: 'Blockchain Ecosystem',
        description: 'Special DAO system for collecting, analyzing, and providing universal access to environmental information, starting with water resources. Integrates AI for learning and finding solutions to save the environment. Blockchain and DeFi provide the DAO structure for selection, decision-making, and campaign management.',
      },
      mailServices: {
        title: 'MAIL AND CLEANING SERVICES SYSTEM',
        category: 'Service Platform',
        description: 'Unified service platform for sending and delivering mail and parcels, cleaning clothes, renting lockers, and handling deliveries, all within a convenient user interface application.',
      },
    },
  },
  de: {
    header: {
      search: 'Suchen',
      searchPlaceholder: 'suchen...',
      menu: {
        hub: 'HUB',
        about: 'ÜBER UNS',
        services: 'DIENSTLEISTUNGEN',
        cases: 'FÄLLE',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'KONTAKT',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Unsere Projekte in Entwicklung',
      projectsInDevelopment: 'Projekte in Entwicklung',
      openForInvestment: 'Offen für Investitionen',
      viewProject: 'Projekt Ansehen',
      progress: 'Fortschritt',
      status: 'Status',
      investment: 'Investitionsziel',
      invested: 'Investiert',
      statusActive: 'Aktiv',
      statusPilot: 'Pilotprojekt',
      statusBeta: 'Beta',
      statusPlanning: 'Planung',
    },
    home: enHomeTranslations,
    services: {
      ecosystems: 'ÖKOSYSTEME',
      ecosystemsDesc: 'Umfassende Projektentwicklung',
      webapp: 'WEB/APP',
      webappDesc: 'Websites, SPA, mobile Anwendungen',
      blockchain: 'BLOCKCHAIN',
      blockchainDesc: 'Smart Contracts, DeFi, NFT',
      design: 'DESIGN',
      designDesc: 'UI/UX, Branding, Identität',
      marketing: 'MARKETING',
      marketingDesc: 'Werbekampagnen, SMM, Content',
      documents: 'DOKUMENTE',
      documentsDesc: 'Dokumente, Verträge, Berichte',
      video: 'VIDEO',
      videoDesc: 'Produktion, Motion Design',
      more: 'Mehr',
      title: 'DIENSTLEISTUNGEN',
      subtitle: 'Unsere Lösungen',
      description: 'Wir bieten umfassende Entwicklungsdienstleistungen in mehreren Disziplinen an.',
      notFound: 'Benötigen Sie eine Individuelle Lösung?',
      notFoundDesc: 'Können Sie nicht finden, wonach Sie suchen? Lassen Sie uns Ihre einzigartigen Anforderungen besprechen.',
      packages: {
        investment: 'Investition',
        timeline: 'Zeitplan',
        sendResearch: 'Zur Forschung Senden',
        scheduleConsultation: 'Beratung Terminieren',
        starter: 'STARTER',
        professional: 'PROFESSIONELL',
        enterprise: 'ENTERPRISE',
      },
    },
    common: {
      loading: 'Wird geladen...',
      error: 'Fehler',
      readMore: 'Weiterlesen',
      contactUs: 'Kontaktieren Sie uns',
      services: 'UNSERE LÖSUNGEN',
      contact: 'KONTAKT',
      cancel: 'Abbrechen',
    },
    modals: {
      sendResearch: {
        title: 'Projekt zur Forschung Senden',
        service: 'Service',
        descriptionLabel: 'Projektbeschreibung',
        descriptionPlaceholder: 'Beschreiben Sie Ihr Projekt, Anforderungen, Ziele...',
        filesLabel: 'Dateien Anhängen',
        dropFiles: 'Dateien hier hineinziehen',
        orClick: 'oder klicken, um auszuwählen',
        nameLabel: 'Name',
        emailLabel: 'Email',
        phoneLabel: 'Telefon',
        optional: 'Optional',
        send: 'Senden',
      },
      consultation: {
        title: 'Beratung Terminieren',
        service: 'Service',
        selectDate: 'Datum Auswählen',
        selectTime: 'Zeit Auswählen',
        nameLabel: 'Ihr Name',
        emailLabel: 'Ihre Email',
        descriptionLabel: 'Projektbeschreibung',
        descriptionPlaceholder: 'Kurze Beschreibung Ihres Projekts...',
        optional: 'Optional',
        confirm: 'Buchung Bestätigen',
      },
    },
    about: {
      tagline: 'ABOUT',
      title: 'INNOVATION DEVELOPMENT LABORATORY',
      description: 'We create solutions at the intersection of technology, business, and creativity. From concept to implementation — full cycle development of innovative products and ecosystems.',
      mission: {
        title: 'MISSION',
        description: 'Develop innovative solutions that combine business strategy, creative art, and cutting-edge technologies. Create ecosystems and products that shape the future of digital space and open new opportunities for business and creativity.',
      },
      values: {
        title: 'VALUES',
        innovation: {
          title: 'INNOVATION',
          description: 'We experiment with cutting-edge technologies and create solutions that don\'t exist yet.',
        },
        result: {
          title: 'FOCUS ON RESULTS',
          description: 'Every project is aimed at achieving specific business goals and measurable results.',
        },
        team: {
          title: 'EXPERT TEAM',
          description: 'We unite specialists from different fields: development, design, business, science.',
        },
        speed: {
          title: 'SPEED AND QUALITY',
          description: 'We balance between fast implementation and high quality execution.',
        },
      },
      expertise: {
        title: 'EXPERTISE',
        subtitle: 'Areas of work and competencies',
        business: {
          category: 'BUSINESS & STRATEGY',
          item1: 'Business modeling',
          item2: 'Strategic planning',
          item3: 'Unit economics',
          item4: 'Market analysis',
          item5: 'Investment strategies',
        },
        design: {
          category: 'DESIGN & ARCHITECTURE',
          item1: 'UI/UX design',
          item2: 'Branding and identity',
          item3: 'System architecture',
          item4: '3D visualization',
          item5: 'Motion design',
        },
        webapp: {
          category: 'WEBSITES & APPLICATIONS',
          item1: 'Web development',
          item2: 'Mobile applications',
          item3: 'Full-stack solutions',
          item4: 'API and integrations',
          item5: 'DevOps and infrastructure',
        },
        ecosystems: {
          category: 'ECOSYSTEMS',
          item1: 'WEB3 platforms',
          item2: 'Blockchain solutions',
          item3: 'Decentralized systems',
          item4: 'Smart contracts',
          item5: 'NFT and tokenization',
        },
        marketing: {
          category: 'MARKETING & BRANDING',
          item1: 'Launch strategy',
          item2: 'Content marketing',
          item3: 'PR and communications',
          item4: 'Community and partnerships',
          item5: 'Performance marketing',
        },
        video: {
          category: 'VIDEO & FILM',
          item1: 'Video production',
          item2: 'Motion graphics',
          item3: '3D animation',
          item4: 'Post-production',
          item5: 'Creative production',
        },
      },
      cta: {
        title: 'READY TO COLLABORATE?',
        description: 'Let\'s discuss your project and opportunities to create innovative solutions.',
        contactButton: 'CONTACT',
        casesButton: 'CASES',
      },
    },
    cases: {
      tagline: 'PORTFOLIO',
      title: 'CASES & PROJECTS',
      description: 'Examples of implemented projects demonstrating our approach to creating innovative solutions.',
      learnMore: 'LEARN MORE',
      ctaTitle: 'INTERESTED IN COLLABORATION?',
      ctaDescription: 'Let\'s discuss your project and opportunities to create similar solutions.',
      ctaButton: 'DISCUSS PROJECT',
      web3Bank: {
        title: 'WEB3 BLOCKCHAIN BANK SYSTEM',
        category: 'Blockchain',
        description: 'Automated cross-chain system for estimating user reputation on the blockchain. The system analyzes user transactions to assign a credibility score. Technical solution: creation of fungible tokens on Everscale and their bridging to Ethereum where they transform into Non-Fungible Tokens (SBTs).',
      },
      daoEcology: {
        title: 'DAO ECOLOGY PLATFORM (VODeco)',
        category: 'Blockchain Ecosystem',
        description: 'Special DAO system for collecting, analyzing, and providing universal access to environmental information, starting with water resources. Integrates AI for learning and finding solutions to save the environment. Blockchain and DeFi provide the DAO structure for selection, decision-making, and campaign management.',
      },
      mailServices: {
        title: 'MAIL AND CLEANING SERVICES SYSTEM',
        category: 'Service Platform',
        description: 'Unified service platform for sending and delivering mail and parcels, cleaning clothes, renting lockers, and handling deliveries, all within a convenient user interface application.',
      },
    },
  },
};



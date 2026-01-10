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
  };
  common: {
    loading: string;
    error: string;
    readMore: string;
    contactUs: string;
    services: string;
    contact: string;
  };
}

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
    home: {
      tagline: 'INNOVATION LABORATORY',
      title: 'LABORATORY',
      titleHighlight: 'DEVELOPMENTS',
      titleEnd: 'INNOVATIONS',
      description: 'From business concepts and creative art to scientific research of WEB3 ecosystems. We combine deep expertise in technology, design and business to create solutions that define the future.',
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
    },
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
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      readMore: 'Read More',
      contactUs: 'Contact Us',
      services: 'OUR SOLUTIONS',
      contact: 'CONTACT',
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
      description: 'От бизнес-концепций и креативного искусства до научных исследований WEB3 экосистем. Мы объединяем глубокую экспертизу в технологиях, дизайне и бизнесе для создания решений, которые определяют будущее.',
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
    },
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      readMore: 'Читать далее',
      contactUs: 'Связаться с нами',
      services: 'НАШИ РЕШЕНИЯ',
      contact: 'КОНТАКТЫ',
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
    common: {
      loading: 'جارٍ التحميل...',
      error: 'خطأ',
      readMore: 'اقرأ المزيد',
      contactUs: 'اتصل بنا',
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
    common: {
      loading: 'Cargando...',
      error: 'Error',
      readMore: 'Leer Más',
      contactUs: 'Contáctenos',
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
    common: {
      loading: 'Ładowanie...',
      error: 'Błąd',
      readMore: 'Czytaj Więcej',
      contactUs: 'Skontaktuj się',
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
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      readMore: 'Lire la Suite',
      contactUs: 'Contactez-nous',
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
    common: {
      loading: 'Wird geladen...',
      error: 'Fehler',
      readMore: 'Weiterlesen',
      contactUs: 'Kontaktieren Sie uns',
    },
  },
};



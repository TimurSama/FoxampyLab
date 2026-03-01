// Функция для получения переводов слайдов
const getSlideTranslations = (language: string = 'ru') => {
  const translations: Record<string, any> = {
    ru: {
      slide1: {
        title: "Civilization Protocol",
        subtitle: "Децентрализованная кибер-физическая платформа управления водными ресурсами",
        content: "VODeco (Value of Data – Water Ecosystem) — революционная экосистема, объединяющая блокчейн, IoT, AI и DAO для прозрачного и эффективного управления водными ресурсами планеты."
      },
      slide2: {
        title: "Глобальная проблема",
        content: [
          "Ежегодные экономические потери от неэффективного управления: $500 млрд (1% мирового ВВП)",
          "К 2030 году спрос на воду превысит запасы на 40%",
          "Более 60% водных систем управляются без должного мониторинга",
          "Отсутствие прозрачности приводит к коррупции и неэффективности"
        ]
      },
      slide3: {
        title: "Наше решение",
        content: [
          "Мониторинг через IoT-датчики в реальном времени",
          "DAO-управление с участием всех заинтересованных сторон",
          "Токеномика VOD для стимулирования участия и инвестиций",
          "Интеграция государственных, корпоративных, научных и общественных интересов"
        ]
      },
      slide4: {
        title: "Архитектура платформы",
        content: [
          "Globo — интерактивная карта водных объектов",
          "DAO — система голосований и принятия решений",
          "Водный банк — учет и мониторинг ресурсов",
          "Биржа — платформа для инвестиций в водные проекты",
          "Специализированные кабинеты для разных типов пользователей",
          "AI-ассистент для навигации и анализа"
        ]
      },
      slide5: {
        title: "Токеномика VOD",
        content: [
          "Общее предложение: 1,000,000,000 VOD",
          "Тип: Utility + Governance токен",
          "Функции:",
          "• Управление через голосование в DAO",
          "• Стейкинг для пассивного дохода",
          "• Инвестиции в водные проекты",
          "• Привязка к реальным водным ресурсам"
        ]
      },
      slide6: {
        title: "Экосистема заинтересованных сторон",
        content: [
          "Государственные партнеры — регуляторные органы, муниципалитеты",
          "Корпоративные партнеры — компании по управлению водными ресурсами",
          "Научное сообщество — исследовательские институты и эксперты",
          "Граждане и сообщества — местные активисты и потребители",
          "Международные организации — ООН, UN-Water, экологические НПО",
          "Инвесторы — институциональные и стратегические партнеры"
        ]
      },
      slide7: {
        title: "Инвестиционные возможности",
        content: [
          "Общий бюджет проекта: $1,150,000",
          "Уже инвестировано: $250,000 (22%)",
          "Необходимо для завершения: $900,000",
          "",
          "Уровни инвестиций:",
          "• Seed ($10K-$50K) — ранний доступ, базовые права голосования, ROI 15-20%",
          "• Strategic ($50K-$200K) — расширенные права, аналитика, ROI 18-25%",
          "• Infrastructure ($200K-$500K) — участие в инфраструктурных проектах, ROI 20-30%",
          "• Institutional ($500K+) — место в совете DAO, эксклюзивные права, ROI 25-35%",
          "",
          "Использование средств:",
          "• Разработка платформы: 40% ($460K)",
          "• Блокчейн интеграция: 25% ($287K)",
          "• Маркетинг и SMM: 15% ($172K)",
          "• Работа с инвесторами: 10% ($115K)",
          "• Операционные расходы: 10% ($115K)"
        ]
      },
      slide8: {
        title: "Дорожная карта",
        content: [
          "Этап 1 (Завершен): Концепция и исследования",
          "• Разработка концепции платформы",
          "• Исследование рынков и анализ конкурентов",
          "• Проработка WhitePaper",
          "• Заключение партнерств с международными корпорациями, фондами, банками",
          "• Партнерства с гос. департаментами Узбекистана",
          "",
          "Этап 2 (Текущий): Разработка альфа-версии",
          "• Разработка альфа-версии приложения экосистемы",
          "• Разработка блокчейн-инфраструктуры (смарт-контракты, токеномика)",
          "• Подготовка к маркетингу и продвижению",
          "• Работа с инвесторами и фондами",
          "• Начало SMM и построение сообщества",
          "",
          "Этап 3 (Планируется): Интеграция и запуск",
          "• Интеграция блокчейна в платформу",
          "• Запуск токена VOD",
          "• Интеграция IoT-датчиков",
          "• Запуск DAO",
          "",
          "Этап 4 (Будущее): Масштабирование",
          "• Расширение сети датчиков",
          "• Глобальное масштабирование",
          "• Интеграция с международными организациями"
        ]
      }
    },
    en: {
      slide1: {
        title: "Civilization Protocol",
        subtitle: "Decentralized cyber-physical platform for water resource management",
        content: "VODeco (Value of Data – Water Ecosystem) — revolutionary ecosystem combining blockchain, IoT, AI and DAO for transparent and efficient management of the planet's water resources."
      },
      slide2: {
        title: "Global Problem",
        content: [
          "Annual economic losses from inefficient management: $500 billion (1% of global GDP)",
          "By 2030, water demand will exceed supply by 40%",
          "More than 60% of water systems are managed without proper monitoring",
          "Lack of transparency leads to corruption and inefficiency"
        ]
      },
      slide3: {
        title: "Our Solution",
        content: [
          "Real-time monitoring through IoT sensors",
          "DAO governance with participation of all stakeholders",
          "VOD tokenomics to incentivize participation and investment",
          "Integration of government, corporate, scientific and public interests"
        ]
      },
      slide4: {
        title: "Platform Architecture",
        content: [
          "Globo — interactive map of water objects",
          "DAO — voting and decision-making system",
          "Water Bank — resource accounting and monitoring",
          "Exchange — platform for investment in water projects",
          "Specialized offices for different user types",
          "AI assistant for navigation and analysis"
        ]
      },
      slide5: {
        title: "VOD Tokenomics",
        content: [
          "Total supply: 1,000,000,000 VOD",
          "Type: Utility + Governance token",
          "Functions:",
          "• Governance through DAO voting",
          "• Staking for passive income",
          "• Investment in water projects",
          "• Tied to real water resources"
        ]
      },
      slide6: {
        title: "Stakeholder Ecosystem",
        content: [
          "Government partners — regulatory bodies, municipalities",
          "Corporate partners — water resource management companies",
          "Scientific community — research institutes and experts",
          "Citizens and communities — local activists and consumers",
          "International organizations — UN, UN-Water, environmental NGOs",
          "Investors — institutional and strategic partners"
        ]
      },
      slide7: {
        title: "Investment Opportunities",
        content: [
          "Total project budget: $1,150,000",
          "Already invested: $250,000 (22%)",
          "Required to complete: $900,000",
          "",
          "Investment tiers:",
          "• Seed ($10K-$50K) — early access, basic voting rights, ROI 15-20%",
          "• Strategic ($50K-$200K) — extended rights, analytics, ROI 18-25%",
          "• Infrastructure ($200K-$500K) — participation in infrastructure projects, ROI 20-30%",
          "• Institutional ($500K+) — DAO council seat, exclusive rights, ROI 25-35%",
          "",
          "Fund allocation:",
          "• Platform development: 40% ($460K)",
          "• Blockchain integration: 25% ($287K)",
          "• Marketing & SMM: 15% ($172K)",
          "• Investor relations: 10% ($115K)",
          "• Operating expenses: 10% ($115K)"
        ]
      },
      slide8: {
        title: "Roadmap",
        content: [
          "Phase 1 (Completed): Concept & Research",
          "• Platform concept development",
          "• Market research and competitor analysis",
          "• WhitePaper development",
          "• Partnerships with international corporations, funds, banks",
          "• Partnerships with Uzbekistan government departments",
          "",
          "Phase 2 (Current): Alpha Development",
          "• Alpha version of ecosystem application development",
          "• Blockchain infrastructure development (smart contracts, tokenomics)",
          "• Marketing and promotion preparation",
          "• Work with investors and funds",
          "• SMM start and community building",
          "",
          "Phase 3 (Planned): Integration & Launch",
          "• Blockchain integration into platform",
          "• VOD token launch",
          "• IoT sensor integration",
          "• DAO launch",
          "",
          "Phase 4 (Future): Scaling",
          "• Sensor network expansion",
          "• Global scaling",
          "• Integration with international organizations"
        ]
      }
    },
    ar: {
      slide1: {
        title: "Civilization Protocol",
        subtitle: "منصة سايبر-فيزيائية لامركزية لإدارة الموارد المائية",
        content: "VODeco (Value of Data – Water Ecosystem) — نظام بيئي ثوري يجمع بين البلوك تشين وإنترنت الأشياء والذكاء الاصطناعي و DAO لإدارة شفافة وفعالة لموارد المياه في الكوكب."
      },
      slide2: {
        title: "المشكلة العالمية",
        content: [
          "الخسائر الاقتصادية السنوية من الإدارة غير الفعالة: 500 مليار دولار (1% من الناتج المحلي الإجمالي العالمي)",
          "بحلول عام 2030، سيتجاوز الطلب على المياه العرض بنسبة 40%",
          "أكثر من 60% من أنظمة المياه تُدار بدون مراقبة مناسبة",
          "عدم الشفافية يؤدي إلى الفساد وعدم الكفاءة"
        ]
      },
      slide3: {
        title: "حلنا",
        content: [
          "المراقبة في الوقت الفعلي من خلال أجهزة استشعار إنترنت الأشياء",
          "إدارة DAO مع مشاركة جميع أصحاب المصلحة",
          "اقتصاديات رمز VOD لتحفيز المشاركة والاستثمار",
          "دمج المصالح الحكومية والشركات والعلمية والعامة"
        ]
      },
      slide4: {
        title: "هندسة المنصة",
        content: [
          "Globo — خريطة تفاعلية للكائنات المائية",
          "DAO — نظام التصويت واتخاذ القرارات",
          "البنك المائي — محاسبة ومراقبة الموارد",
          "البورصة — منصة للاستثمار في المشاريع المائية",
          "مكاتب متخصصة لأنواع مختلفة من المستخدمين",
          "مساعد ذكي للتنقل والتحليل"
        ]
      },
      slide5: {
        title: "اقتصاديات رمز VOD",
        content: [
          "إجمالي العرض: 1,000,000,000 VOD",
          "النوع: رمز Utility + Governance",
          "الوظائف:",
          "• الإدارة من خلال التصويت في DAO",
          "• التخزين للدخل السلبي",
          "• الاستثمار في المشاريع المائية",
          "• مرتبط بالموارد المائية الحقيقية"
        ]
      },
      slide6: {
        title: "نظام أصحاب المصلحة",
        content: [
          "الشركاء الحكوميون — الهيئات التنظيمية، البلديات",
          "الشركاء المؤسسيون — شركات إدارة الموارد المائية",
          "المجتمع العلمي — معاهد البحوث والخبراء",
          "المواطنون والمجتمعات — النشطاء المحليون والمستهلكون",
          "المنظمات الدولية — الأمم المتحدة، UN-Water، المنظمات غير الحكومية البيئية",
          "المستثمرون — الشركاء المؤسسيون والاستراتيجيون"
        ]
      },
      slide7: {
        title: "فرص الاستثمار",
        content: [
          "إجمالي ميزانية المشروع: 1,150,000 دولار",
          "تم الاستثمار بالفعل: 250,000 دولار (22%)",
          "المطلوب للإكمال: 900,000 دولار",
          "",
          "مستويات الاستثمار:",
          "• Seed (10K-50K دولار) — الوصول المبكر، حقوق التصويت الأساسية، عائد الاستثمار 15-20%",
          "• Strategic (50K-200K دولار) — حقوق موسعة، تحليلات، عائد الاستثمار 18-25%",
          "• Infrastructure (200K-500K دولار) — المشاركة في مشاريع البنية التحتية، عائد الاستثمار 20-30%",
          "• Institutional (500K+ دولار) — مقعد في مجلس DAO، حقوق حصرية، عائد الاستثمار 25-35%",
          "",
          "تخصيص الأموال:",
          "• تطوير المنصة: 40% (460K دولار)",
          "• تكامل البلوك تشين: 25% (287K دولار)",
          "• التسويق و SMM: 15% (172K دولار)",
          "• علاقات المستثمرين: 10% (115K دولار)",
          "• النفقات التشغيلية: 10% (115K دولار)"
        ]
      },
      slide8: {
        title: "خارطة الطريق",
        content: [
          "المرحلة 1 (مكتملة): المفهوم والبحث",
          "• تطوير مفهوم المنصة",
          "• بحث السوق وتحليل المنافسين",
          "• تطوير WhitePaper",
          "• شراكات مع الشركات الدولية والصناديق والبنوك",
          "• شراكات مع الدوائر الحكومية في أوزبكستان",
          "",
          "المرحلة 2 (الحالية): تطوير النسخة التجريبية",
          "• تطوير نسخة تجريبية من تطبيق النظام البيئي",
          "• تطوير بنية البلوك تشين التحتية (العقود الذكية، اقتصاديات الرمز)",
          "• التحضير للتسويق والترويج",
          "• العمل مع المستثمرين والصناديق",
          "• بدء SMM وبناء المجتمع",
          "",
          "المرحلة 3 (مخطط لها): التكامل والإطلاق",
          "• تكامل البلوك تشين في المنصة",
          "• إطلاق رمز VOD",
          "• تكامل أجهزة استشعار إنترنت الأشياء",
          "• إطلاق DAO",
          "",
          "المرحلة 4 (المستقبل): التوسع",
          "• توسيع شبكة أجهزة الاستشعار",
          "• التوسع العالمي",
          "• التكامل مع المنظمات الدولية"
        ]
      }
    },
    es: {
      slide1: {
        title: "Civilization Protocol",
        subtitle: "Plataforma ciberfísica descentralizada para la gestión de recursos hídricos",
        content: "VODeco (Value of Data – Water Ecosystem) — ecosistema revolucionario que combina blockchain, IoT, AI y DAO para una gestión transparente y eficiente de los recursos hídricos del planeta."
      },
      slide2: {
        title: "Problema Global",
        content: [
          "Pérdidas económicas anuales por gestión ineficiente: $500 mil millones (1% del PIB mundial)",
          "Para 2030, la demanda de agua superará la oferta en un 40%",
          "Más del 60% de los sistemas de agua se gestionan sin monitoreo adecuado",
          "La falta de transparencia conduce a corrupción e ineficiencia"
        ]
      },
      slide3: {
        title: "Nuestra Solución",
        content: [
          "Monitoreo en tiempo real a través de sensores IoT",
          "Gobernanza DAO con participación de todas las partes interesadas",
          "Tokenómica VOD para incentivar participación e inversión",
          "Integración de intereses gubernamentales, corporativos, científicos y públicos"
        ]
      },
      slide4: {
        title: "Arquitectura de Plataforma",
        content: [
          "Globo — mapa interactivo de objetos hídricos",
          "DAO — sistema de votación y toma de decisiones",
          "Banco del Agua — contabilidad y monitoreo de recursos",
          "Exchange — plataforma para inversión en proyectos hídricos",
          "Oficinas especializadas para diferentes tipos de usuarios",
          "Asistente AI para navegación y análisis"
        ]
      },
      slide5: {
        title: "Tokenómica VOD",
        content: [
          "Oferta total: 1,000,000,000 VOD",
          "Tipo: Token Utility + Governance",
          "Funciones:",
          "• Gobernanza a través de votación DAO",
          "• Staking para ingresos pasivos",
          "• Inversión en proyectos hídricos",
          "• Vinculado a recursos hídricos reales"
        ]
      },
      slide6: {
        title: "Ecosistema de Partes Interesadas",
        content: [
          "Socios gubernamentales — organismos reguladores, municipios",
          "Socios corporativos — empresas de gestión de recursos hídricos",
          "Comunidad científica — institutos de investigación y expertos",
          "Ciudadanos y comunidades — activistas locales y consumidores",
          "Organizaciones internacionales — ONU, UN-Water, ONG ambientales",
          "Inversores — socios institucionales y estratégicos"
        ]
      },
      slide7: {
        title: "Oportunidades de Inversión",
        content: [
          "Presupuesto total del proyecto: $1,150,000",
          "Ya invertido: $250,000 (22%)",
          "Requerido para completar: $900,000",
          "",
          "Niveles de inversión:",
          "• Seed ($10K-$50K) — acceso temprano, derechos de voto básicos, ROI 15-20%",
          "• Strategic ($50K-$200K) — derechos extendidos, análisis, ROI 18-25%",
          "• Infrastructure ($200K-$500K) — participación en proyectos de infraestructura, ROI 20-30%",
          "• Institutional ($500K+) — asiento en consejo DAO, derechos exclusivos, ROI 25-35%",
          "",
          "Asignación de fondos:",
          "• Desarrollo de plataforma: 40% ($460K)",
          "• Integración blockchain: 25% ($287K)",
          "• Marketing & SMM: 15% ($172K)",
          "• Relaciones con inversores: 10% ($115K)",
          "• Gastos operativos: 10% ($115K)"
        ]
      },
      slide8: {
        title: "Hoja de Ruta",
        content: [
          "Fase 1 (Completada): Concepto e Investigación",
          "• Desarrollo del concepto de plataforma",
          "• Investigación de mercado y análisis de competidores",
          "• Desarrollo de WhitePaper",
          "• Asociaciones con corporaciones internacionales, fondos, bancos",
          "• Asociaciones con departamentos gubernamentales de Uzbekistán",
          "",
          "Fase 2 (Actual): Desarrollo Alpha",
          "• Desarrollo de versión alpha de aplicación del ecosistema",
          "• Desarrollo de infraestructura blockchain (contratos inteligentes, tokenómica)",
          "• Preparación de marketing y promoción",
          "• Trabajo con inversores y fondos",
          "• Inicio de SMM y construcción de comunidad",
          "",
          "Fase 3 (Planificada): Integración y Lanzamiento",
          "• Integración blockchain en plataforma",
          "• Lanzamiento de token VOD",
          "• Integración de sensores IoT",
          "• Lanzamiento de DAO",
          "",
          "Fase 4 (Futuro): Escalado",
          "• Expansión de red de sensores",
          "• Escalado global",
          "• Integración con organizaciones internacionales"
        ]
      }
    },
    pl: {
      slide1: {
        title: "Civilization Protocol",
        subtitle: "Zdecentralizowana platforma cyber-fizyczna do zarządzania zasobami wodnymi",
        content: "VODeco (Value of Data – Water Ecosystem) — rewolucyjny ekosystem łączący blockchain, IoT, AI i DAO dla przejrzystego i efektywnego zarządzania zasobami wodnymi planety."
      },
      slide2: {
        title: "Globalny Problem",
        content: [
          "Roczne straty ekonomiczne z nieefektywnego zarządzania: 500 miliardów dolarów (1% światowego PKB)",
          "Do 2030 roku zapotrzebowanie na wodę przekroczy podaż o 40%",
          "Ponad 60% systemów wodnych jest zarządzanych bez odpowiedniego monitoringu",
          "Brak przejrzystości prowadzi do korupcji i nieefektywności"
        ]
      },
      slide3: {
        title: "Nasze Rozwiązanie",
        content: [
          "Monitorowanie w czasie rzeczywistym przez czujniki IoT",
          "Zarządzanie DAO z udziałem wszystkich zainteresowanych stron",
          "Tokenomika VOD do zachęcania do uczestnictwa i inwestycji",
          "Integracja interesów rządowych, korporacyjnych, naukowych i publicznych"
        ]
      },
      slide4: {
        title: "Architektura Platformy",
        content: [
          "Globo — interaktywna mapa obiektów wodnych",
          "DAO — system głosowania i podejmowania decyzji",
          "Bank Wodny — księgowość i monitoring zasobów",
          "Giełda — platforma do inwestycji w projekty wodne",
          "Wyspecjalizowane biura dla różnych typów użytkowników",
          "Asystent AI do nawigacji i analizy"
        ]
      },
      slide5: {
        title: "Tokenomika VOD",
        content: [
          "Całkowita podaż: 1,000,000,000 VOD",
          "Typ: Token Utility + Governance",
          "Funkcje:",
          "• Zarządzanie przez głosowanie DAO",
          "• Staking dla pasywnego dochodu",
          "• Inwestycje w projekty wodne",
          "• Powiązane z rzeczywistymi zasobami wodnymi"
        ]
      },
      slide6: {
        title: "Ekosystem Interesariuszy",
        content: [
          "Partnerzy rządowi — organy regulacyjne, gminy",
          "Partnerzy korporacyjni — firmy zarządzające zasobami wodnymi",
          "Społeczność naukowa — instytuty badawcze i eksperci",
          "Obywatele i społeczności — lokalni aktywiści i konsumenci",
          "Organizacje międzynarodowe — ONZ, UN-Water, organizacje pozarządowe zajmujące się środowiskiem",
          "Inwestorzy — partnerzy instytucjonalni i strategiczni"
        ]
      },
      slide7: {
        title: "Możliwości Inwestycyjne",
        content: [
          "Całkowity budżet projektu: 1,150,000 dolarów",
          "Już zainwestowano: 250,000 dolarów (22%)",
          "Wymagane do ukończenia: 900,000 dolarów",
          "",
          "Poziomy inwestycji:",
          "• Seed (10K-50K dolarów) — wczesny dostęp, podstawowe prawa głosowania, ROI 15-20%",
          "• Strategic (50K-200K dolarów) — rozszerzone prawa, analityka, ROI 18-25%",
          "• Infrastructure (200K-500K dolarów) — udział w projektach infrastrukturalnych, ROI 20-30%",
          "• Institutional (500K+ dolarów) — miejsce w radzie DAO, wyłączne prawa, ROI 25-35%",
          "",
          "Alokacja funduszy:",
          "• Rozwój platformy: 40% (460K dolarów)",
          "• Integracja blockchain: 25% (287K dolarów)",
          "• Marketing i SMM: 15% (172K dolarów)",
          "• Relacje z inwestorami: 10% (115K dolarów)",
          "• Wydatki operacyjne: 10% (115K dolarów)"
        ]
      },
      slide8: {
        title: "Mapa Drogowa",
        content: [
          "Faza 1 (Zakończona): Koncepcja i Badania",
          "• Rozwój koncepcji platformy",
          "• Badania rynku i analiza konkurentów",
          "• Rozwój WhitePaper",
          "• Partnerstwa z międzynarodowymi korporacjami, funduszami, bankami",
          "• Partnerstwa z departamentami rządowymi Uzbekistanu",
          "",
          "Faza 2 (Bieżąca): Rozwój Alpha",
          "• Rozwój wersji alpha aplikacji ekosystemu",
          "• Rozwój infrastruktury blockchain (inteligentne kontrakty, tokenomika)",
          "• Przygotowanie do marketingu i promocji",
          "• Praca z inwestorami i funduszami",
          "• Rozpoczęcie SMM i budowanie społeczności",
          "",
          "Faza 3 (Planowana): Integracja i Uruchomienie",
          "• Integracja blockchain w platformę",
          "• Uruchomienie tokena VOD",
          "• Integracja czujników IoT",
          "• Uruchomienie DAO",
          "",
          "Faza 4 (Przyszłość): Skalowanie",
          "• Rozszerzenie sieci czujników",
          "• Skalowanie globalne",
          "• Integracja z organizacjami międzynarodowymi"
        ]
      }
    },
    fr: {
      slide1: {
        title: "Civilization Protocol",
        subtitle: "Plateforme cyber-physique décentralisée pour la gestion des ressources en eau",
        content: "VODeco (Value of Data – Water Ecosystem) — écosystème révolutionnaire combinant blockchain, IoT, AI et DAO pour une gestion transparente et efficace des ressources en eau de la planète."
      },
      slide2: {
        title: "Problème Mondial",
        content: [
          "Pertes économiques annuelles dues à une gestion inefficace: 500 milliards de dollars (1% du PIB mondial)",
          "D'ici 2030, la demande en eau dépassera l'offre de 40%",
          "Plus de 60% des systèmes d'eau sont gérés sans surveillance adéquate",
          "Le manque de transparence mène à la corruption et à l'inefficacité"
        ]
      },
      slide3: {
        title: "Notre Solution",
        content: [
          "Surveillance en temps réel via des capteurs IoT",
          "Gouvernance DAO avec participation de toutes les parties prenantes",
          "Tokenomique VOD pour inciter à la participation et à l'investissement",
          "Intégration des intérêts gouvernementaux, corporatifs, scientifiques et publics"
        ]
      },
      slide4: {
        title: "Architecture de la Plateforme",
        content: [
          "Globo — carte interactive des objets aquatiques",
          "DAO — système de vote et de prise de décision",
          "Banque de l'Eau — comptabilité et surveillance des ressources",
          "Exchange — plateforme d'investissement dans les projets aquatiques",
          "Bureaux spécialisés pour différents types d'utilisateurs",
          "Assistant IA pour navigation et analyse"
        ]
      },
      slide5: {
        title: "Tokenomique VOD",
        content: [
          "Offre totale: 1,000,000,000 VOD",
          "Type: Token Utility + Governance",
          "Fonctions:",
          "• Gouvernance via vote DAO",
          "• Staking pour revenus passifs",
          "• Investissement dans projets aquatiques",
          "• Lié aux ressources en eau réelles"
        ]
      },
      slide6: {
        title: "Écosystème des Parties Prenantes",
        content: [
          "Partenaires gouvernementaux — organismes de régulation, municipalités",
          "Partenaires corporatifs — entreprises de gestion des ressources en eau",
          "Communauté scientifique — instituts de recherche et experts",
          "Citoyens et communautés — activistes locaux et consommateurs",
          "Organisations internationales — ONU, UN-Water, ONG environnementales",
          "Investisseurs — partenaires institutionnels et stratégiques"
        ]
      },
      slide7: {
        title: "Opportunités d'Investissement",
        content: [
          "Budget total du projet: 1,150,000 $",
          "Déjà investi: 250,000 $ (22%)",
          "Requis pour compléter: 900,000 $",
          "",
          "Niveaux d'investissement:",
          "• Seed (10K-50K $) — accès précoce, droits de vote de base, ROI 15-20%",
          "• Strategic (50K-200K $) — droits étendus, analytique, ROI 18-25%",
          "• Infrastructure (200K-500K $) — participation aux projets d'infrastructure, ROI 20-30%",
          "• Institutional (500K+ $) — siège au conseil DAO, droits exclusifs, ROI 25-35%",
          "",
          "Allocation des fonds:",
          "• Développement de plateforme: 40% (460K $)",
          "• Intégration blockchain: 25% (287K $)",
          "• Marketing & SMM: 15% (172K $)",
          "• Relations investisseurs: 10% (115K $)",
          "• Dépenses opérationnelles: 10% (115K $)"
        ]
      },
      slide8: {
        title: "Feuille de Route",
        content: [
          "Phase 1 (Terminée): Concept et Recherche",
          "• Développement du concept de plateforme",
          "• Recherche de marché et analyse des concurrents",
          "• Développement du WhitePaper",
          "• Partenariats avec corporations internationales, fonds, banques",
          "• Partenariats avec départements gouvernementaux d'Ouzbékistan",
          "",
          "Phase 2 (Actuelle): Développement Alpha",
          "• Développement de version alpha de l'application écosystème",
          "• Développement d'infrastructure blockchain (contrats intelligents, tokenomique)",
          "• Préparation au marketing et promotion",
          "• Travail avec investisseurs et fonds",
          "• Démarrage SMM et construction de communauté",
          "",
          "Phase 3 (Planifiée): Intégration et Lancement",
          "• Intégration blockchain dans plateforme",
          "• Lancement du token VOD",
          "• Intégration de capteurs IoT",
          "• Lancement du DAO",
          "",
          "Phase 4 (Futur): Mise à l'Échelle",
          "• Expansion du réseau de capteurs",
          "• Mise à l'échelle globale",
          "• Intégration avec organisations internationales"
        ]
      }
    },
    de: {
      slide1: {
        title: "Civilization Protocol",
        subtitle: "Dezentrale cyber-physikalische Plattform für Wasserressourcenmanagement",
        content: "VODeco (Value of Data – Water Ecosystem) — revolutionäres Ökosystem, das Blockchain, IoT, AI und DAO für transparentes und effizientes Management der Wasserressourcen des Planeten kombiniert."
      },
      slide2: {
        title: "Globales Problem",
        content: [
          "Jährliche wirtschaftliche Verluste durch ineffizientes Management: 500 Milliarden Dollar (1% des globalen BIP)",
          "Bis 2030 wird die Wassernachfrage das Angebot um 40% übersteigen",
          "Mehr als 60% der Wassersysteme werden ohne angemessene Überwachung verwaltet",
          "Mangelnde Transparenz führt zu Korruption und Ineffizienz"
        ]
      },
      slide3: {
        title: "Unsere Lösung",
        content: [
          "Echtzeitüberwachung durch IoT-Sensoren",
          "DAO-Governance mit Beteiligung aller Stakeholder",
          "VOD-Tokenomik zur Anreizung von Teilnahme und Investition",
          "Integration von Regierungs-, Unternehmens-, Wissenschafts- und öffentlichen Interessen"
        ]
      },
      slide4: {
        title: "Plattformarchitektur",
        content: [
          "Globo — interaktive Karte von Wasserobjekten",
          "DAO — Abstimmungs- und Entscheidungssystem",
          "Wasserbank — Ressourcenbuchhaltung und -überwachung",
          "Börse — Plattform für Investitionen in Wasserprojekte",
          "Spezialisierte Büros für verschiedene Benutzertypen",
          "KI-Assistent für Navigation und Analyse"
        ]
      },
      slide5: {
        title: "VOD-Tokenomik",
        content: [
          "Gesamtangebot: 1,000,000,000 VOD",
          "Typ: Utility + Governance Token",
          "Funktionen:",
          "• Governance durch DAO-Abstimmung",
          "• Staking für passives Einkommen",
          "• Investition in Wasserprojekte",
          "• An echte Wasserressourcen gebunden"
        ]
      },
      slide6: {
        title: "Stakeholder-Ökosystem",
        content: [
          "Regierungspartner — Regulierungsbehörden, Gemeinden",
          "Unternehmenspartner — Wasserressourcenmanagement-Unternehmen",
          "Wissenschaftsgemeinschaft — Forschungsinstitute und Experten",
          "Bürger und Gemeinden — lokale Aktivisten und Verbraucher",
          "Internationale Organisationen — UN, UN-Water, Umwelt-NGOs",
          "Investoren — institutionelle und strategische Partner"
        ]
      },
      slide7: {
        title: "Investitionsmöglichkeiten",
        content: [
          "Gesamtprojektbudget: 1.150.000 $",
          "Bereits investiert: 250.000 $ (22%)",
          "Erforderlich zur Fertigstellung: 900.000 $",
          "",
          "Investitionsstufen:",
          "• Seed (10K-50K $) — früher Zugang, grundlegende Stimmrechte, ROI 15-20%",
          "• Strategic (50K-200K $) — erweiterte Rechte, Analytik, ROI 18-25%",
          "• Infrastructure (200K-500K $) — Teilnahme an Infrastrukturprojekten, ROI 20-30%",
          "• Institutional (500K+ $) — Sitz im DAO-Rat, exklusive Rechte, ROI 25-35%",
          "",
          "Mittelzuweisung:",
          "• Plattformentwicklung: 40% (460K $)",
          "• Blockchain-Integration: 25% (287K $)",
          "• Marketing & SMM: 15% (172K $)",
          "• Investor Relations: 10% (115K $)",
          "• Betriebsausgaben: 10% (115K $)"
        ]
      },
      slide8: {
        title: "Roadmap",
        content: [
          "Phase 1 (Abgeschlossen): Konzept & Forschung",
          "• Plattformkonzeptentwicklung",
          "• Marktforschung und Wettbewerbsanalyse",
          "• WhitePaper-Entwicklung",
          "• Partnerschaften mit internationalen Unternehmen, Fonds, Banken",
          "• Partnerschaften mit Regierungsabteilungen Usbekistans",
          "",
          "Phase 2 (Aktuell): Alpha-Entwicklung",
          "• Entwicklung der Alpha-Version der Ökosystemanwendung",
          "• Blockchain-Infrastrukturentwicklung (Smart Contracts, Tokenomik)",
          "• Marketing- und Promotionsvorbereitung",
          "• Arbeit mit Investoren und Fonds",
          "• SMM-Start und Community-Aufbau",
          "",
          "Phase 3 (Geplant): Integration & Start",
          "• Blockchain-Integration in Plattform",
          "• VOD-Token-Start",
          "• IoT-Sensor-Integration",
          "• DAO-Start",
          "",
          "Phase 4 (Zukunft): Skalierung",
          "• Sensornetzwerk-Expansion",
          "• Globale Skalierung",
          "• Integration mit internationalen Organisationen"
        ]
      }
    }
  };
  
  return translations[language] || translations['en'];
};

// Функция для получения слайдов с переводами
export const getIntroductionSlides = (language: string = 'ru') => {
  const t = getSlideTranslations(language);
  
  return [
    {
      id: 1,
      title: t.slide1.title,
      subtitle: t.slide1.subtitle,
      content: t.slide1.content,
      visual: "globe"
    },
    {
      id: 2,
      title: t.slide2.title,
      content: t.slide2.content,
      visual: "problem"
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
      visual: "architecture"
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
      visual: "ecosystem"
    },
    {
      id: 7,
      title: t.slide7.title,
      content: t.slide7.content,
      visual: "investment"
    },
    {
      id: 8,
      title: t.slide8.title,
      content: t.slide8.content,
      visual: "roadmap"
    }
  ];
};

// Функция для получения переводов вайтпейпера
const getWhitepaperTranslations = (language: string = 'ru') => {
  const translations: Record<string, any> = {
    ru: {
      overview: {
        title: "Обзор проекта",
        content: `VODeco — это децентрализованная кибер-физическая платформа, соединяющая реальные водные объекты, цифровые двойники, экономику (токены, инвестиции), управление (DAO) и контроль (IoT + AI + общество) в единую экосистему управления ценностью воды.

Платформа функционирует как водный домен глобальной экологической архитектуры, где данные, решения и экономические стимулы соединены в единую систему.`
      },
      architecture: {
        title: "Архитектура платформы",
        content: `Платформа построена на 6 уровнях:

1. Физическая реальность — водные ресурсы, инфраструктура, IoT-датчики
2. Цифровизация — сбор телеметрии, стандартизация, валидация данных
3. Blockchain & Data Trust — неизменяемое хранение, токенизация, прозрачный аудит
4. Экономика — токен VOD, инвестиционные пулы, стейкинг, доходность
5. Управление — DAO VOD, голосования, прозрачные бюджеты
6. Пользовательский слой — Web/Mobile App, кабинеты, дашборды, игровые механики`
      },
      tokenomics: {
        title: "Токеномика VOD",
        content: `Многоэтапная архитектура токена:

Phase I — Participation & Access Token
• Доступ к платформе и модулям
• Участие в развитии экосистемы
• Право голоса в ранних механизмах управления

Phase II — Staking & Governance Layer
• Стейкинг для доступа к расширенным данным
• Участие в DAO
• Фильтрация решений

Phase III — Data Anchoring & Smart Contracts
• Верификация экологических данных
• Хэширование и фиксация ончейн
• Связь с цифровыми двойниками водных объектов

Phase IV — Resource-Linked Logic
• Участие в смарт-контрактах объектов
• Управление доступом к данным
• Экономические и управленческие механизмы`
      },
      governance: {
        title: "DAO Governance",
        content: `Децентрализованное автономное общество VOD обеспечивает:

• Прозрачное принятие решений через голосование
• Равные права всех участников
• Коллективное управление водными ресурсами
• Прозрачные бюджеты и распределение средств
• Контроль исполнения решений
• Аудит и отчетность

Процесс принятия решений:
1. Создание предложения
2. Обсуждение (комментарии)
3. Голосование (7-30 дней)
4. Кворум (минимум голосов)
5. Реализация принятых предложений`
      },
      technology: {
        title: "Технологический стек",
        content: `Frontend:
• React/TypeScript для веб-приложения
• Мобильное приложение (iOS/Android)
• Интерактивные карты и визуализации
• Многоязычный интерфейс (i18n)

Backend:
• Node.js/TypeScript серверная часть
• Смарт-контракты для управления токенами
• DAO механизмы голосования
• Безопасная аутентификация и авторизация

IoT и данные:
• Сеть датчиков качества воды
• Расходомеры и датчики давления
• Аналитика данных в реальном времени
• Прогнозные модели на основе ИИ`
      },
      investment: {
        title: "Инвестиционные проекты",
        content: `Платформа предоставляет доступ к реальным инфраструктурным проектам:

Примеры активных проектов:
• Pumping Station No. 2 (Узбекистан) — $7.76M, IRR 17%
• Korovulbozor Pumping Station — $6.19M, IRR 15%
• Kuyumazar Auxiliary Station — $11.97M, IRR 22%

Модель реализации:
• Финансирование → Дизайн → Реконструкция → Операция → Передача
• 10 лет эксплуатации частным партнером
• Участие международных финансовых институтов (IFC, AIIB, ADB)
• Гарантии правительства Узбекистана

Награды участников:
• VOD токены пропорционально доле
• Ежегодные выплаты в USDT на основе прогнозируемой доходности`
      },
      market: {
        title: "Рыночные возможности",
        content: `Глобальный рынок управления водными ресурсами:

• Объем рынка: $500+ млрд ежегодных потерь от неэффективности
• Рост спроса: +40% к 2030 году
• Критическая ситуация для 2/3 населения планеты
• Необходимость цифровизации водного сектора

Целевые рынки:
• Государственные водные агентства
• Муниципальные системы водоснабжения
• Корпоративные водопользователи
• Международные организации развития
• Частные инвесторы в инфраструктуру

Конкурентные преимущества:
• Единственная платформа с полным циклом: мониторинг → управление → инвестиции
• Блокчейн для прозрачности и доверия
• DAO для децентрализованного управления
• Интеграция с реальными проектами`
      },
      roadmap: {
        title: "Дорожная карта развития",
        content: `Этап 1 (0-6 месяцев):
• UI/UX обновление + международная локализация
• API и OpenData модуль
• ESG-метрики, KPIs и отчетность
• Документация Docs-as-Code

Этап 2 (6-18 месяцев):
• Мобильные приложения (iOS/Android)
• Пилоты с правительствами
• Интеграции SDG/UNEP
• Модуль научного API

Этап 3 (18-36 месяцев):
• Институциональные интеграции (EBRD/WB/IFC)
• Масштаб на регионы (CA/EU/MEA)
• Партнерства с Water NGOs
• Консорциумы с университетами`
      },
      team: {
        title: "Команда и партнеры",
        content: `Ключевые участники:

Правительство Республики Узбекистан:
• Гарантии производительности и правовая поддержка
• Интеграция с национальной системой управления водными ресурсами

UNICAP Public-Private Partnership Investment Fund:
• Инициатор и менеджер проектов
• Координация международных финансовых институтов

VODPROM Corporation:
• Ведущая компания по модернизации и цифровизации водных ресурсов
• Специальная проектная компания UNICAP

Международные финансовые институты:
• International Finance Corporation (IFC)
• Asian Infrastructure Investment Bank (AIIB)
• Asian Development Bank (ADB)
• Islamic Development Bank (IsDB)
• Eurasian Development Bank (EDB)

Глобальные технические партнеры:
• Culligan International (USA)
• Aqseptence Group (Germany)
• Wuhuan Engineering Co., Ltd. (China)`
      },
      financials: {
        title: "Финансовая модель",
        content: `Текущий статус:
• Инвестиции: $250K из $1.15M (22% прогресс)
• Статус: Phase 2 (в разработке)

Источники дохода:
• Комиссии с инвестиционных проектов
• Стейкинг и токеномика
• Подписки на премиум функции
• Лицензирование платформы государствам
• Консалтинг и интеграционные услуги

Прогноз роста:
• Q1 2025: Завершение Phase 2, запуск DAO
• Q2 2025: Интеграция 100+ водных объектов
• Q3-Q4 2025: Расширение на 5+ стран
• 2026: Глобальное масштабирование

Ожидаемая доходность:
• Инвестиционные проекты: 15-22% IRR
• Стейкинг: до 17% годовых
• Рост стоимости токена: привязан к росту экосистемы`
      }
    },
    en: {
      overview: {
        title: "Project Overview",
        content: `VODeco is a decentralized cyber-physical platform connecting real water objects, digital twins, economy (tokens, investments), governance (DAO) and control (IoT + AI + society) into a unified water value management ecosystem.

The platform functions as a water domain of global environmental architecture, where data, decisions and economic incentives are connected into a unified system.`
      },
      architecture: {
        title: "Platform Architecture",
        content: `The platform is built on 6 levels:

1. Physical Reality — water resources, infrastructure, IoT sensors
2. Digitalization — telemetry collection, standardization, data validation
3. Blockchain & Data Trust — immutable storage, tokenization, transparent audit
4. Economy — VOD token, investment pools, staking, returns
5. Governance — DAO VOD, voting, transparent budgets
6. User Layer — Web/Mobile App, offices, dashboards, game mechanics`
      },
      tokenomics: {
        title: "VOD Tokenomics",
        content: `Multi-phase token architecture:

Phase I — Participation & Access Token
• Access to platform and modules
• Participation in ecosystem development
• Voting rights in early governance mechanisms

Phase II — Staking & Governance Layer
• Staking for access to extended data
• Participation in DAO
• Solution filtering

Phase III — Data Anchoring & Smart Contracts
• Environmental data verification
• On-chain hashing and anchoring
• Connection with digital twins of water objects

Phase IV — Resource-Linked Logic
• Participation in object smart contracts
• Data access management
• Economic and governance mechanisms`
      },
      governance: {
        title: "DAO Governance",
        content: `VOD Decentralized Autonomous Society provides:

• Transparent decision-making through voting
• Equal rights for all participants
• Collective water resource management
• Transparent budgets and fund distribution
• Decision execution control
• Audit and reporting

Decision-making process:
1. Proposal creation
2. Discussion (comments)
3. Voting (7-30 days)
4. Quorum (minimum votes)
5. Implementation of accepted proposals`
      },
      technology: {
        title: "Technology Stack",
        content: `Frontend:
• React/TypeScript for web application
• Mobile application (iOS/Android)
• Interactive maps and visualizations
• Multilingual interface (i18n)

Backend:
• Node.js/TypeScript server-side
• Smart contracts for token management
• DAO voting mechanisms
• Secure authentication and authorization

IoT and Data:
• Water quality sensor network
• Flow meters and pressure sensors
• Real-time data analytics
• AI-based predictive models`
      },
      investment: {
        title: "Investment Projects",
        content: `The platform provides access to real infrastructure projects:

Examples of active projects:
• Pumping Station No. 2 (Uzbekistan) — $7.76M, IRR 17%
• Korovulbozor Pumping Station — $6.19M, IRR 15%
• Kuyumazar Auxiliary Station — $11.97M, IRR 22%

Implementation model:
• Financing → Design → Reconstruction → Operation → Transfer
• 10 years of operation by private partner
• Participation of international financial institutions (IFC, AIIB, ADB)
• Guarantees from Uzbekistan government

Participant rewards:
• VOD tokens proportional to share
• Annual USDT payments based on projected returns`
      },
      market: {
        title: "Market Opportunities",
        content: `Global water resource management market:

• Market size: $500+ billion in annual losses from inefficiency
• Demand growth: +40% by 2030
• Critical situation for 2/3 of planet's population
• Need for digitalization of water sector

Target markets:
• Government water agencies
• Municipal water supply systems
• Corporate water users
• International development organizations
• Private infrastructure investors

Competitive advantages:
• Only platform with full cycle: monitoring → management → investment
• Blockchain for transparency and trust
• DAO for decentralized governance
• Integration with real projects`
      },
      roadmap: {
        title: "Development Roadmap",
        content: `Phase 1 (0-6 months):
• UI/UX update + international localization
• API and OpenData module
• ESG metrics, KPIs and reporting
• Docs-as-Code documentation

Phase 2 (6-18 months):
• Mobile applications (iOS/Android)
• Pilots with governments
• SDG/UNEP integrations
• Scientific API module

Phase 3 (18-36 months):
• Institutional integrations (EBRD/WB/IFC)
• Scale to regions (CA/EU/MEA)
• Partnerships with Water NGOs
• University consortia`
      },
      team: {
        title: "Team and Partners",
        content: `Key participants:

Government of the Republic of Uzbekistan:
• Performance guarantees and legal support
• Integration with national water resource management system

UNICAP Public-Private Partnership Investment Fund:
• Project initiator and manager
• Coordination of international financial institutions

VODPROM Corporation:
• Leading company for water resource modernization and digitalization
• Special project company of UNICAP

International Financial Institutions:
• International Finance Corporation (IFC)
• Asian Infrastructure Investment Bank (AIIB)
• Asian Development Bank (ADB)
• Islamic Development Bank (IsDB)
• Eurasian Development Bank (EDB)

Global Technical Partners:
• Culligan International (USA)
• Aqseptence Group (Germany)
• Wuhuan Engineering Co., Ltd. (China)`
      },
      financials: {
        title: "Financial Model",
        content: `Current status:
• Investment: $250K out of $1.15M (22% progress)
• Status: Phase 2 (in development)

Revenue sources:
• Commissions from investment projects
• Staking and tokenomics
• Premium feature subscriptions
• Platform licensing to governments
• Consulting and integration services

Growth forecast:
• Q1 2025: Phase 2 completion, DAO launch
• Q2 2025: Integration of 100+ water objects
• Q3-Q4 2025: Expansion to 5+ countries
• 2026: Global scaling

Expected returns:
• Investment projects: 15-22% IRR
• Staking: up to 17% annually
• Token value growth: tied to ecosystem growth`
      }
    },
    ar: {
      overview: {
        title: "نظرة عامة على المشروع",
        content: `VODeco هي منصة سايبر-فيزيائية لامركزية تربط بين الكائنات المائية الحقيقية والتوائم الرقمية والاقتصاد (الرموز، الاستثمارات) والحوكمة (DAO) والتحكم (إنترنت الأشياء + الذكاء الاصطناعي + المجتمع) في نظام بيئي موحد لإدارة قيمة المياه.

تعمل المنصة كمجال مائي للهندسة المعمارية البيئية العالمية، حيث يتم ربط البيانات والقرارات والحوافز الاقتصادية في نظام موحد.`
      },
      architecture: {
        title: "هندسة المنصة",
        content: `تم بناء المنصة على 6 مستويات:

1. الواقع المادي — الموارد المائية، البنية التحتية، أجهزة استشعار إنترنت الأشياء
2. الرقمنة — جمع البيانات عن بُعد، التوحيد القياسي، التحقق من البيانات
3. البلوك تشين وثقة البيانات — التخزين الثابت، الرمزية، التدقيق الشفاف
4. الاقتصاد — رمز VOD، مجموعات الاستثمار، التخزين، العوائد
5. الحوكمة — DAO VOD، التصويت، الميزانيات الشفافة
6. طبقة المستخدم — تطبيق الويب/الموبايل، المكاتب، لوحات المعلومات، آليات اللعبة`
      },
      tokenomics: {
        title: "اقتصاديات رمز VOD",
        content: `هندسة رمز متعددة المراحل:

المرحلة الأولى — رمز المشاركة والوصول
• الوصول إلى المنصة والوحدات
• المشاركة في تطوير النظام البيئي
• حق التصويت في آليات الحوكمة المبكرة

المرحلة الثانية — طبقة التخزين والحوكمة
• التخزين للوصول إلى البيانات الموسعة
• المشاركة في DAO
• تصفية الحلول

المرحلة الثالثة — ربط البيانات والعقود الذكية
• التحقق من البيانات البيئية
• التجزئة والتثبيت على السلسلة
• الاتصال بالتوائم الرقمية للكائنات المائية

المرحلة الرابعة — منطق مرتبط بالموارد
• المشاركة في العقود الذكية للكائنات
• إدارة الوصول إلى البيانات
• الآليات الاقتصادية والحوكمة`
      },
      governance: {
        title: "حوكمة DAO",
        content: `يوفر المجتمع المستقل اللامركزي VOD:

• اتخاذ القرارات الشفاف من خلال التصويت
• حقوق متساوية لجميع المشاركين
• الإدارة الجماعية للموارد المائية
• الميزانيات الشفافة وتوزيع الأموال
• التحكم في تنفيذ القرارات
• التدقيق وإعداد التقارير

عملية اتخاذ القرارات:
1. إنشاء الاقتراح
2. المناقشة (التعليقات)
3. التصويت (7-30 يومًا)
4. النصاب القانوني (الحد الأدنى من الأصوات)
5. تنفيذ الاقتراحات المقبولة`
      },
      technology: {
        title: "مجموعة التقنيات",
        content: `واجهة أمامية:
• React/TypeScript لتطبيق الويب
• تطبيق الهاتف المحمول (iOS/Android)
• الخرائط التفاعلية والتصورات
• واجهة متعددة اللغات (i18n)

الخلفية:
• Node.js/TypeScript من جانب الخادم
• العقود الذكية لإدارة الرموز
• آليات التصويت DAO
• المصادقة والتفويض الآمن

إنترنت الأشياء والبيانات:
• شبكة أجهزة استشعار جودة المياه
• عدادات التدفق وأجهزة استشعار الضغط
• تحليلات البيانات في الوقت الفعلي
• النماذج التنبؤية القائمة على الذكاء الاصطناعي`
      },
      investment: {
        title: "مشاريع الاستثمار",
        content: `توفر المنصة الوصول إلى مشاريع البنية التحتية الحقيقية:

أمثلة على المشاريع النشطة:
• محطة الضخ رقم 2 (أوزبكستان) — 7.76 مليون دولار، عائد الاستثمار 17%
• محطة ضخ Korovulbozor — 6.19 مليون دولار، عائد الاستثمار 15%
• محطة Kuyumazar المساعدة — 11.97 مليون دولار، عائد الاستثمار 22%

نموذج التنفيذ:
• التمويل → التصميم → إعادة البناء → التشغيل → النقل
• 10 سنوات من التشغيل من قبل الشريك الخاص
• مشاركة المؤسسات المالية الدولية (IFC، AIIB، ADB)
• ضمانات من حكومة أوزبكستان

مكافآت المشاركين:
• رموز VOD متناسبة مع الحصة
• مدفوعات USDT السنوية بناءً على العوائد المتوقعة`
      },
      market: {
        title: "فرص السوق",
        content: `سوق إدارة الموارد المائية العالمي:

• حجم السوق: 500+ مليار دولار من الخسائر السنوية من عدم الكفاءة
• نمو الطلب: +40% بحلول عام 2030
• الوضع الحرج لـ 2/3 من سكان الكوكب
• الحاجة إلى رقمنة قطاع المياه

الأسواق المستهدفة:
• وكالات المياه الحكومية
• أنظمة إمدادات المياه البلدية
• مستخدمو المياه المؤسسيون
• منظمات التنمية الدولية
• المستثمرون الخاصون في البنية التحتية

المزايا التنافسية:
• المنصة الوحيدة مع دورة كاملة: المراقبة → الإدارة → الاستثمار
• البلوك تشين للشفافية والثقة
• DAO للحوكمة اللامركزية
• التكامل مع المشاريع الحقيقية`
      },
      roadmap: {
        title: "خارطة طريق التطوير",
        content: `المرحلة 1 (0-6 أشهر):
• تحديث UI/UX + الترجمة الدولية
• واجهة برمجة التطبيقات ووحدة البيانات المفتوحة
• مقاييس ESG و KPIs وإعداد التقارير
• توثيق Docs-as-Code

المرحلة 2 (6-18 شهرًا):
• تطبيقات الهاتف المحمول (iOS/Android)
• تجارب مع الحكومات
• تكاملات SDG/UNEP
• وحدة واجهة برمجة التطبيقات العلمية

المرحلة 3 (18-36 شهرًا):
• التكاملات المؤسسية (EBRD/WB/IFC)
• النطاق إلى المناطق (CA/EU/MEA)
• شراكات مع منظمات المياه غير الحكومية
• اتحادات الجامعات`
      },
      team: {
        title: "الفريق والشركاء",
        content: `المشاركون الرئيسيون:

حكومة جمهورية أوزبكستان:
• ضمانات الأداء والدعم القانوني
• التكامل مع نظام إدارة الموارد المائية الوطني

صندوق الاستثمار UNICAP للشراكة بين القطاعين العام والخاص:
• مبادئ ومدراء المشاريع
• تنسيق المؤسسات المالية الدولية

شركة VODPROM:
• الشركة الرائدة في تحديث ورقمنة الموارد المائية
• شركة المشروع الخاصة لـ UNICAP

المؤسسات المالية الدولية:
• مؤسسة التمويل الدولية (IFC)
• بنك الاستثمار الآسيوي في البنية التحتية (AIIB)
• بنك التنمية الآسيوي (ADB)
• البنك الإسلامي للتنمية (IsDB)
• بنك التنمية الأوراسي (EDB)

الشركاء التقنيون العالميون:
• Culligan International (الولايات المتحدة)
• مجموعة Aqseptence (ألمانيا)
• شركة Wuhuan Engineering المحدودة (الصين)`
      },
      financials: {
        title: "النموذج المالي",
        content: `الحالة الحالية:
• الاستثمار: 250K دولار من أصل 1.15 مليون دولار (22% تقدم)
• الحالة: المرحلة 2 (قيد التطوير)

مصادر الإيرادات:
• العمولات من مشاريع الاستثمار
• التخزين واقتصاديات الرمز
• الاشتراكات في الميزات المميزة
• ترخيص المنصة للحكومات
• خدمات الاستشارات والتكامل

توقعات النمو:
• الربع الأول 2025: اكتمال المرحلة 2، إطلاق DAO
• الربع الثاني 2025: تكامل 100+ كائن مائي
• الربع الثالث والرابع 2025: التوسع إلى 5+ دول
• 2026: التوسع العالمي

العوائد المتوقعة:
• مشاريع الاستثمار: 15-22% عائد الاستثمار
• التخزين: حتى 17% سنويًا
• نمو قيمة الرمز: مرتبط بنمو النظام البيئي`
      }
    },
    es: {
      overview: {
        title: "Resumen del Proyecto",
        content: `VODeco es una plataforma ciberfísica descentralizada que conecta objetos acuáticos reales, gemelos digitales, economía (tokens, inversiones), gobernanza (DAO) y control (IoT + AI + sociedad) en un ecosistema unificado de gestión del valor del agua.

La plataforma funciona como un dominio acuático de la arquitectura ambiental global, donde datos, decisiones e incentivos económicos están conectados en un sistema unificado.`
      },
      architecture: {
        title: "Arquitectura de la Plataforma",
        content: `La plataforma está construida en 6 niveles:

1. Realidad Física — recursos hídricos, infraestructura, sensores IoT
2. Digitalización — recopilación de telemetría, estandarización, validación de datos
3. Blockchain & Data Trust — almacenamiento inmutable, tokenización, auditoría transparente
4. Economía — token VOD, fondos de inversión, staking, retornos
5. Gobernanza — DAO VOD, votación, presupuestos transparentes
6. Capa de Usuario — Web/Mobile App, oficinas, dashboards, mecánicas de juego`
      },
      tokenomics: {
        title: "Tokenómica VOD",
        content: `Arquitectura de token multifase:

Fase I — Token de Participación y Acceso
• Acceso a plataforma y módulos
• Participación en desarrollo del ecosistema
• Derechos de voto en mecanismos de gobernanza tempranos

Fase II — Capa de Staking y Gobernanza
• Staking para acceso a datos extendidos
• Participación en DAO
• Filtrado de soluciones

Fase III — Anclaje de Datos y Contratos Inteligentes
• Verificación de datos ambientales
• Hash y anclaje on-chain
• Conexión con gemelos digitales de objetos acuáticos

Fase IV — Lógica Vinculada a Recursos
• Participación en contratos inteligentes de objetos
• Gestión de acceso a datos
• Mecanismos económicos y de gobernanza`
      },
      governance: {
        title: "Gobernanza DAO",
        content: `La Sociedad Autónoma Descentralizada VOD proporciona:

• Toma de decisiones transparente a través de votación
• Derechos iguales para todos los participantes
• Gestión colectiva de recursos hídricos
• Presupuestos transparentes y distribución de fondos
• Control de ejecución de decisiones
• Auditoría e informes

Proceso de toma de decisiones:
1. Creación de propuesta
2. Discusión (comentarios)
3. Votación (7-30 días)
4. Quórum (votos mínimos)
5. Implementación de propuestas aceptadas`
      },
      technology: {
        title: "Stack Tecnológico",
        content: `Frontend:
• React/TypeScript para aplicación web
• Aplicación móvil (iOS/Android)
• Mapas interactivos y visualizaciones
• Interfaz multilingüe (i18n)

Backend:
• Node.js/TypeScript del lado del servidor
• Contratos inteligentes para gestión de tokens
• Mecanismos de votación DAO
• Autenticación y autorización seguras

IoT y Datos:
• Red de sensores de calidad del agua
• Medidores de flujo y sensores de presión
• Análisis de datos en tiempo real
• Modelos predictivos basados en IA`
      },
      investment: {
        title: "Proyectos de Inversión",
        content: `La plataforma proporciona acceso a proyectos de infraestructura reales:

Ejemplos de proyectos activos:
• Estación de Bombeo No. 2 (Uzbekistán) — $7.76M, IRR 17%
• Estación de Bombeo Korovulbozor — $6.19M, IRR 15%
• Estación Auxiliar Kuyumazar — $11.97M, IRR 22%

Modelo de implementación:
• Financiamiento → Diseño → Reconstrucción → Operación → Transferencia
• 10 años de operación por socio privado
• Participación de instituciones financieras internacionales (IFC, AIIB, ADB)
• Garantías del gobierno de Uzbekistán

Recompensas de participantes:
• Tokens VOD proporcionales a la participación
• Pagos anuales en USDT basados en retornos proyectados`
      },
      market: {
        title: "Oportunidades de Mercado",
        content: `Mercado global de gestión de recursos hídricos:

• Tamaño del mercado: $500+ mil millones en pérdidas anuales por ineficiencia
• Crecimiento de la demanda: +40% para 2030
• Situación crítica para 2/3 de la población del planeta
• Necesidad de digitalización del sector hídrico

Mercados objetivo:
• Agencias gubernamentales de agua
• Sistemas municipales de suministro de agua
• Usuarios corporativos de agua
• Organizaciones internacionales de desarrollo
• Inversores privados en infraestructura

Ventajas competitivas:
• Única plataforma con ciclo completo: monitoreo → gestión → inversión
• Blockchain para transparencia y confianza
• DAO para gobernanza descentralizada
• Integración con proyectos reales`
      },
      roadmap: {
        title: "Hoja de Ruta de Desarrollo",
        content: `Fase 1 (0-6 meses):
• Actualización UI/UX + localización internacional
• Módulo API y OpenData
• Métricas ESG, KPIs e informes
• Documentación Docs-as-Code

Fase 2 (6-18 meses):
• Aplicaciones móviles (iOS/Android)
• Pilotos con gobiernos
• Integraciones SDG/UNEP
• Módulo API científico

Fase 3 (18-36 meses):
• Integraciones institucionales (EBRD/WB/IFC)
• Escala a regiones (CA/EU/MEA)
• Asociaciones con ONG de Agua
• Consorcios universitarios`
      },
      team: {
        title: "Equipo y Socios",
        content: `Participantes clave:

Gobierno de la República de Uzbekistán:
• Garantías de rendimiento y apoyo legal
• Integración con sistema nacional de gestión de recursos hídricos

Fondo de Inversión de Asociación Público-Privada UNICAP:
• Iniciador y gestor de proyectos
• Coordinación de instituciones financieras internacionales

Corporación VODPROM:
• Empresa líder en modernización y digitalización de recursos hídricos
• Empresa de proyecto especial de UNICAP

Instituciones Financieras Internacionales:
• Corporación Financiera Internacional (IFC)
• Banco Asiático de Inversión en Infraestructura (AIIB)
• Banco Asiático de Desarrollo (ADB)
• Banco Islámico de Desarrollo (IsDB)
• Banco Euroasiático de Desarrollo (EDB)

Socios Técnicos Globales:
• Culligan International (USA)
• Grupo Aqseptence (Alemania)
• Wuhuan Engineering Co., Ltd. (China)`
      },
      financials: {
        title: "Modelo Financiero",
        content: `Estado actual:
• Inversión: $250K de $1.15M (22% progreso)
• Estado: Fase 2 (en desarrollo)

Fuentes de ingresos:
• Comisiones de proyectos de inversión
• Staking y tokenómica
• Suscripciones a funciones premium
• Licenciamiento de plataforma a gobiernos
• Servicios de consultoría e integración

Pronóstico de crecimiento:
• Q1 2025: Finalización Fase 2, lanzamiento DAO
• Q2 2025: Integración de 100+ objetos acuáticos
• Q3-Q4 2025: Expansión a 5+ países
• 2026: Escalado global

Retornos esperados:
• Proyectos de inversión: 15-22% IRR
• Staking: hasta 17% anual
• Crecimiento del valor del token: vinculado al crecimiento del ecosistema`
      }
    },
    pl: {
      overview: {
        title: "Przegląd Projektu",
        content: `VODeco to zdecentralizowana platforma cyber-fizyczna łącząca rzeczywiste obiekty wodne, cyfrowe bliźniaki, ekonomię (tokeny, inwestycje), zarządzanie (DAO) i kontrolę (IoT + AI + społeczeństwo) w ujednolicony ekosystem zarządzania wartością wody.

Platforma funkcjonuje jako domena wodna globalnej architektury środowiskowej, gdzie dane, decyzje i bodźce ekonomiczne są połączone w ujednolicony system.`
      },
      architecture: {
        title: "Architektura Platformy",
        content: `Platforma jest zbudowana na 6 poziomach:

1. Rzeczywistość Fizyczna — zasoby wodne, infrastruktura, czujniki IoT
2. Cyfryzacja — zbieranie telemetrii, standaryzacja, walidacja danych
3. Blockchain & Data Trust — niezmienne przechowywanie, tokenizacja, przejrzysty audyt
4. Ekonomia — token VOD, pule inwestycyjne, staking, zwroty
5. Zarządzanie — DAO VOD, głosowanie, przejrzyste budżety
6. Warstwa Użytkownika — Web/Mobile App, biura, pulpity nawigacyjne, mechaniki gier`
      },
      tokenomics: {
        title: "Tokenomika VOD",
        content: `Wielofazowa architektura tokena:

Faza I — Token Uczestnictwa i Dostępu
• Dostęp do platformy i modułów
• Uczestnictwo w rozwoju ekosystemu
• Prawo głosu w wczesnych mechanizmach zarządzania

Faza II — Warstwa Staking i Zarządzania
• Staking dla dostępu do rozszerzonych danych
• Uczestnictwo w DAO
• Filtrowanie rozwiązań

Faza III — Kotwiczenie Danych i Inteligentne Kontrakty
• Weryfikacja danych środowiskowych
• Hashowanie i kotwiczenie on-chain
• Połączenie z cyfrowymi bliźniakami obiektów wodnych

Faza IV — Logika Powiązana z Zasobami
• Uczestnictwo w inteligentnych kontraktach obiektów
• Zarządzanie dostępem do danych
• Mechanizmy ekonomiczne i zarządzania`
      },
      governance: {
        title: "Zarządzanie DAO",
        content: `Zdecentralizowane Społeczeństwo Autonomiczne VOD zapewnia:

• Przejrzyste podejmowanie decyzji poprzez głosowanie
• Równe prawa dla wszystkich uczestników
• Zbiorowe zarządzanie zasobami wodnymi
• Przejrzyste budżety i dystrybucja funduszy
• Kontrola wykonania decyzji
• Audyt i raportowanie

Proces podejmowania decyzji:
1. Tworzenie propozycji
2. Dyskusja (komentarze)
3. Głosowanie (7-30 dni)
4. Kworum (minimum głosów)
5. Realizacja przyjętych propozycji`
      },
      technology: {
        title: "Stack Technologiczny",
        content: `Frontend:
• React/TypeScript dla aplikacji webowej
• Aplikacja mobilna (iOS/Android)
• Interaktywne mapy i wizualizacje
• Wielojęzyczny interfejs (i18n)

Backend:
• Node.js/TypeScript po stronie serwera
• Inteligentne kontrakty do zarządzania tokenami
• Mechanizmy głosowania DAO
• Bezpieczna autentykacja i autoryzacja

IoT i Dane:
• Sieć czujników jakości wody
• Przepływomierze i czujniki ciśnienia
• Analityka danych w czasie rzeczywistym
• Modele predykcyjne oparte na AI`
      },
      investment: {
        title: "Projekty Inwestycyjne",
        content: `Platforma zapewnia dostęp do rzeczywistych projektów infrastrukturalnych:

Przykłady aktywnych projektów:
• Stacja Pompowa Nr 2 (Uzbekistan) — 7.76M $, IRR 17%
• Stacja Pompowa Korovulbozor — 6.19M $, IRR 15%
• Stacja Pomocnicza Kuyumazar — 11.97M $, IRR 22%

Model realizacji:
• Finansowanie → Projekt → Rekonstrukcja → Eksploatacja → Przekazanie
• 10 lat eksploatacji przez partnera prywatnego
• Uczestnictwo międzynarodowych instytucji finansowych (IFC, AIIB, ADB)
• Gwarancje rządu Uzbekistanu

Nagrody uczestników:
• Tokeny VOD proporcjonalnie do udziału
• Rocznie wypłaty w USDT na podstawie prognozowanych zwrotów`
      },
      market: {
        title: "Możliwości Rynkowe",
        content: `Globalny rynek zarządzania zasobami wodnymi:

• Rozmiar rynku: 500+ miliardów dolarów rocznych strat z nieefektywności
• Wzrost popytu: +40% do 2030 roku
• Krytyczna sytuacja dla 2/3 populacji planety
• Konieczność cyfryzacji sektora wodnego

Rynki docelowe:
• Rządowe agencje wodne
• Miejskie systemy zaopatrzenia w wodę
• Korporacyjni użytkownicy wody
• Międzynarodowe organizacje rozwoju
• Prywatni inwestorzy w infrastrukturę

Zalety konkurencyjne:
• Jedyna platforma z pełnym cyklem: monitoring → zarządzanie → inwestycja
• Blockchain dla przejrzystości i zaufania
• DAO dla zdecentralizowanego zarządzania
• Integracja z rzeczywistymi projektami`
      },
      roadmap: {
        title: "Mapa Drogowa Rozwoju",
        content: `Faza 1 (0-6 miesięcy):
• Aktualizacja UI/UX + internacjonalizacja
• Moduł API i OpenData
• Metryki ESG, KPIs i raportowanie
• Dokumentacja Docs-as-Code

Faza 2 (6-18 miesięcy):
• Aplikacje mobilne (iOS/Android)
• Pilotaże z rządami
• Integracje SDG/UNEP
• Moduł API naukowego

Faza 3 (18-36 miesięcy):
• Integracje instytucjonalne (EBRD/WB/IFC)
• Skala do regionów (CA/EU/MEA)
• Partnerstwa z Water NGOs
• Konsorcja uniwersyteckie`
      },
      team: {
        title: "Zespół i Partnerzy",
        content: `Kluczowi uczestnicy:

Rząd Republiki Uzbekistanu:
• Gwarancje wydajności i wsparcie prawne
• Integracja z krajowym systemem zarządzania zasobami wodnymi

Fundusz Inwestycyjny Partnerstwa Publiczno-Prywatnego UNICAP:
• Inicjator i menedżer projektów
• Koordynacja międzynarodowych instytucji finansowych

Korporacja VODPROM:
• Wiodąca firma w modernizacji i cyfryzacji zasobów wodnych
• Specjalna firma projektowa UNICAP

Międzynarodowe Instytucje Finansowe:
• Międzynarodowa Korporacja Finansowa (IFC)
• Azjatycki Bank Inwestycji w Infrastrukturę (AIIB)
• Azjatycki Bank Rozwoju (ADB)
• Islamski Bank Rozwoju (IsDB)
• Euroazjatycki Bank Rozwoju (EDB)

Globalni Partnerzy Techniczni:
• Culligan International (USA)
• Grupa Aqseptence (Niemcy)
• Wuhuan Engineering Co., Ltd. (Chiny)`
      },
      financials: {
        title: "Model Finansowy",
        content: `Status bieżący:
• Inwestycja: 250K $ z 1.15M $ (22% postęp)
• Status: Faza 2 (w rozwoju)

Źródła przychodów:
• Prowizje z projektów inwestycyjnych
• Staking i tokenomika
• Subskrypcje funkcji premium
• Licencjonowanie platformy rządom
• Usługi konsultingowe i integracyjne

Prognoza wzrostu:
• Q1 2025: Zakończenie Faz 2, uruchomienie DAO
• Q2 2025: Integracja 100+ obiektów wodnych
• Q3-Q4 2025: Rozszerzenie na 5+ krajów
• 2026: Skalowanie globalne

Oczekiwane zwroty:
• Projekty inwestycyjne: 15-22% IRR
• Staking: do 17% rocznie
• Wzrost wartości tokena: powiązany ze wzrostem ekosystemu`
      }
    },
    fr: {
      overview: {
        title: "Aperçu du Projet",
        content: `VODeco est une plateforme cyber-physique décentralisée connectant des objets aquatiques réels, des jumeaux numériques, l'économie (tokens, investissements), la gouvernance (DAO) et le contrôle (IoT + AI + société) dans un écosystème unifié de gestion de la valeur de l'eau.

La plateforme fonctionne comme un domaine aquatique de l'architecture environnementale mondiale, où données, décisions et incitations économiques sont connectées dans un système unifié.`
      },
      architecture: {
        title: "Architecture de la Plateforme",
        content: `La plateforme est construite sur 6 niveaux:

1. Réalité Physique — ressources en eau, infrastructure, capteurs IoT
2. Numérisation — collecte de télémétrie, standardisation, validation des données
3. Blockchain & Data Trust — stockage immuable, tokenisation, audit transparent
4. Économie — token VOD, pools d'investissement, staking, retours
5. Gouvernance — DAO VOD, vote, budgets transparents
6. Couche Utilisateur — Web/Mobile App, bureaux, tableaux de bord, mécaniques de jeu`
      },
      tokenomics: {
        title: "Tokenomique VOD",
        content: `Architecture de token multi-phase:

Phase I — Token de Participation et Accès
• Accès à la plateforme et aux modules
• Participation au développement de l'écosystème
• Droits de vote dans mécanismes de gouvernance précoces

Phase II — Couche Staking et Gouvernance
• Staking pour accès aux données étendues
• Participation au DAO
• Filtrage des solutions

Phase III — Ancrage de Données et Contrats Intelligents
• Vérification des données environnementales
• Hachage et ancrage on-chain
• Connexion avec jumeaux numériques d'objets aquatiques

Phase IV — Logique Liée aux Ressources
• Participation aux contrats intelligents d'objets
• Gestion de l'accès aux données
• Mécanismes économiques et de gouvernance`
      },
      governance: {
        title: "Gouvernance DAO",
        content: `La Société Autonome Décentralisée VOD fournit:

• Prise de décision transparente via vote
• Droits égaux pour tous les participants
• Gestion collective des ressources en eau
• Budgets transparents et distribution des fonds
• Contrôle d'exécution des décisions
• Audit et reporting

Processus de prise de décision:
1. Création de proposition
2. Discussion (commentaires)
3. Vote (7-30 jours)
4. Quorum (votes minimum)
5. Implémentation des propositions acceptées`
      },
      technology: {
        title: "Stack Technologique",
        content: `Frontend:
• React/TypeScript pour application web
• Application mobile (iOS/Android)
• Cartes interactives et visualisations
• Interface multilingue (i18n)

Backend:
• Node.js/TypeScript côté serveur
• Contrats intelligents pour gestion des tokens
• Mécanismes de vote DAO
• Authentification et autorisation sécurisées

IoT et Données:
• Réseau de capteurs de qualité de l'eau
• Débitmètres et capteurs de pression
• Analytique de données en temps réel
• Modèles prédictifs basés sur IA`
      },
      investment: {
        title: "Projets d'Investissement",
        content: `La plateforme fournit l'accès aux projets d'infrastructure réels:

Exemples de projets actifs:
• Station de Pompage No. 2 (Ouzbékistan) — 7.76M $, IRR 17%
• Station de Pompage Korovulbozor — 6.19M $, IRR 15%
• Station Auxiliaire Kuyumazar — 11.97M $, IRR 22%

Modèle d'implémentation:
• Financement → Conception → Reconstruction → Opération → Transfert
• 10 ans d'exploitation par partenaire privé
• Participation d'institutions financières internationales (IFC, AIIB, ADB)
• Garanties du gouvernement ouzbek

Récompenses des participants:
• Tokens VOD proportionnels à la part
• Paiements annuels en USDT basés sur retours projetés`
      },
      market: {
        title: "Opportunités de Marché",
        content: `Marché global de gestion des ressources en eau:

• Taille du marché: 500+ milliards $ de pertes annuelles d'inefficacité
• Croissance de la demande: +40% d'ici 2030
• Situation critique pour 2/3 de la population de la planète
• Nécessité de numérisation du secteur aquatique

Marchés cibles:
• Agences gouvernementales de l'eau
• Systèmes municipaux d'approvisionnement en eau
• Utilisateurs corporatifs de l'eau
• Organisations internationales de développement
• Investisseurs privés en infrastructure

Avantages concurrentiels:
• Seule plateforme avec cycle complet: monitoring → gestion → investissement
• Blockchain pour transparence et confiance
• DAO pour gouvernance décentralisée
• Intégration avec projets réels`
      },
      roadmap: {
        title: "Feuille de Route de Développement",
        content: `Phase 1 (0-6 mois):
• Mise à jour UI/UX + localisation internationale
• Module API et OpenData
• Métriques ESG, KPIs et reporting
• Documentation Docs-as-Code

Phase 2 (6-18 mois):
• Applications mobiles (iOS/Android)
• Pilotes avec gouvernements
• Intégrations SDG/UNEP
• Module API scientifique

Phase 3 (18-36 mois):
• Intégrations institutionnelles (EBRD/WB/IFC)
• Échelle aux régions (CA/EU/MEA)
• Partenariats avec ONG de l'Eau
• Consortiums universitaires`
      },
      team: {
        title: "Équipe et Partenaires",
        content: `Participants clés:

Gouvernement de la République d'Ouzbékistan:
• Garanties de performance et soutien juridique
• Intégration avec système national de gestion des ressources en eau

Fonds d'Investissement de Partenariat Public-Privé UNICAP:
• Initiateur et gestionnaire de projets
• Coordination d'institutions financières internationales

Corporation VODPROM:
• Entreprise leader en modernisation et numérisation des ressources en eau
• Entreprise de projet spéciale d'UNICAP

Institutions Financières Internationales:
• Corporation Financière Internationale (IFC)
• Banque Asiatique d'Investissement en Infrastructure (AIIB)
• Banque Asiatique de Développement (ADB)
• Banque Islamique de Développement (IsDB)
• Banque Eurasienne de Développement (EDB)

Partenaires Techniques Globaux:
• Culligan International (USA)
• Groupe Aqseptence (Allemagne)
• Wuhuan Engineering Co., Ltd. (Chine)`
      },
      financials: {
        title: "Modèle Financier",
        content: `Statut actuel:
• Investissement: 250K $ sur 1.15M $ (22% progrès)
• Statut: Phase 2 (en développement)

Sources de revenus:
• Commissions de projets d'investissement
• Staking et tokenomique
• Abonnements aux fonctions premium
• Licence de plateforme aux gouvernements
• Services de conseil et d'intégration

Prévision de croissance:
• Q1 2025: Achèvement Phase 2, lancement DAO
• Q2 2025: Intégration de 100+ objets aquatiques
• Q3-Q4 2025: Expansion à 5+ pays
• 2026: Mise à l'échelle globale

Retours attendus:
• Projets d'investissement: 15-22% IRR
• Staking: jusqu'à 17% annuellement
• Croissance de la valeur du token: liée à la croissance de l'écosystème`
      }
    },
    de: {
      overview: {
        title: "Projektübersicht",
        content: `VODeco ist eine dezentrale cyber-physikalische Plattform, die echte Wasserobjekte, digitale Zwillinge, Wirtschaft (Tokens, Investitionen), Governance (DAO) und Kontrolle (IoT + AI + Gesellschaft) in ein einheitliches Ökosystem zur Verwaltung des Wasserwerts verbindet.

Die Plattform fungiert als Wasserdomäne der globalen Umweltarchitektur, wo Daten, Entscheidungen und wirtschaftliche Anreize in ein einheitliches System verbunden sind.`
      },
      architecture: {
        title: "Plattformarchitektur",
        content: `Die Plattform ist auf 6 Ebenen aufgebaut:

1. Physische Realität — Wasserressourcen, Infrastruktur, IoT-Sensoren
2. Digitalisierung — Telemetrie-Sammlung, Standardisierung, Datenvalidierung
3. Blockchain & Data Trust — unveränderliche Speicherung, Tokenisierung, transparenter Audit
4. Wirtschaft — VOD-Token, Investitionspools, Staking, Renditen
5. Governance — DAO VOD, Abstimmung, transparente Budgets
6. Benutzerschicht — Web/Mobile App, Büros, Dashboards, Spielmechaniken`
      },
      tokenomics: {
        title: "VOD-Tokenomik",
        content: `Mehrphasige Token-Architektur:

Phase I — Teilnahme- und Zugangs-Token
• Zugang zu Plattform und Modulen
• Teilnahme an Ökosystementwicklung
• Stimmrechte in frühen Governance-Mechanismen

Phase II — Staking- und Governance-Schicht
• Staking für Zugang zu erweiterten Daten
• Teilnahme am DAO
• Lösungsfilterung

Phase III — Datenverankerung und Smart Contracts
• Umweltdatenverifizierung
• On-Chain-Hashing und -Verankerung
• Verbindung mit digitalen Zwillingen von Wasserobjekten

Phase IV — Ressourcen-verknüpfte Logik
• Teilnahme an Objekt-Smart-Contracts
• Datenzugriffsverwaltung
• Wirtschaftliche und Governance-Mechanismen`
      },
      governance: {
        title: "DAO-Governance",
        content: `Die Dezentrale Autonome Gesellschaft VOD bietet:

• Transparente Entscheidungsfindung durch Abstimmung
• Gleiche Rechte für alle Teilnehmer
• Kollektive Wasserressourcenverwaltung
• Transparente Budgets und Mittelverteilung
• Kontrolle der Entscheidungsausführung
• Audit und Berichterstattung

Entscheidungsprozess:
1. Vorschlagserstellung
2. Diskussion (Kommentare)
3. Abstimmung (7-30 Tage)
4. Quorum (Mindeststimmen)
5. Umsetzung akzeptierter Vorschläge`
      },
      technology: {
        title: "Technologie-Stack",
        content: `Frontend:
• React/TypeScript für Webanwendung
• Mobile Anwendung (iOS/Android)
• Interaktive Karten und Visualisierungen
• Mehrsprachige Benutzeroberfläche (i18n)

Backend:
• Node.js/TypeScript serverseitig
• Smart Contracts für Token-Verwaltung
• DAO-Abstimmungsmechanismen
• Sichere Authentifizierung und Autorisierung

IoT und Daten:
• Wasserqualitätssensornetzwerk
• Durchflussmesser und Drucksensoren
• Echtzeit-Datenanalyse
• KI-basierte Vorhersagemodelle`
      },
      investment: {
        title: "Investitionsprojekte",
        content: `Die Plattform bietet Zugang zu echten Infrastrukturprojekten:

Beispiele aktiver Projekte:
• Pumpstation Nr. 2 (Usbekistan) — 7.76M $, IRR 17%
• Pumpstation Korovulbozor — 6.19M $, IRR 15%
• Hilfsstation Kuyumazar — 11.97M $, IRR 22%

Umsetzungsmodell:
• Finanzierung → Design → Rekonstruktion → Betrieb → Übertragung
• 10 Jahre Betrieb durch privaten Partner
• Teilnahme internationaler Finanzinstitutionen (IFC, AIIB, ADB)
• Garantien der usbekischen Regierung

Teilnehmerbelohnungen:
• VOD-Tokens proportional zum Anteil
• Jährliche USDT-Zahlungen basierend auf prognostizierten Renditen`
      },
      market: {
        title: "Marktchancen",
        content: `Globaler Markt für Wasserressourcenmanagement:

• Marktgröße: 500+ Milliarden $ jährliche Verluste durch Ineffizienz
• Nachfragewachstum: +40% bis 2030
• Kritische Situation für 2/3 der Planetenbevölkerung
• Notwendigkeit der Digitalisierung des Wassersektors

Zielmärkte:
• Staatliche Wasserbehörden
• Kommunale Wasserversorgungssysteme
• Unternehmenswassernutzer
• Internationale Entwicklungsorganisationen
• Private Infrastrukturinvestoren

Wettbewerbsvorteile:
• Einzige Plattform mit vollem Zyklus: Monitoring → Management → Investition
• Blockchain für Transparenz und Vertrauen
• DAO für dezentrale Governance
• Integration mit echten Projekten`
      },
      roadmap: {
        title: "Entwicklungs-Roadmap",
        content: `Phase 1 (0-6 Monate):
• UI/UX-Update + internationale Lokalisierung
• API- und OpenData-Modul
• ESG-Metriken, KPIs und Berichterstattung
• Docs-as-Code-Dokumentation

Phase 2 (6-18 Monate):
• Mobile Anwendungen (iOS/Android)
• Piloten mit Regierungen
• SDG/UNEP-Integrationen
• Wissenschaftliches API-Modul

Phase 3 (18-36 Monate):
• Institutionelle Integrationen (EBRD/WB/IFC)
• Skalierung auf Regionen (CA/EU/MEA)
• Partnerschaften mit Water NGOs
• Universitätskonsortien`
      },
      team: {
        title: "Team und Partner",
        content: `Schlüsselteilnehmer:

Regierung der Republik Usbekistan:
• Leistungsgarantien und rechtliche Unterstützung
• Integration mit nationalem Wasserressourcenverwaltungssystem

UNICAP Public-Private Partnership Investment Fund:
• Projektinitiator und -manager
• Koordination internationaler Finanzinstitutionen

VODPROM Corporation:
• Führendes Unternehmen für Modernisierung und Digitalisierung von Wasserressourcen
• Spezielle Projektgesellschaft von UNICAP

Internationale Finanzinstitutionen:
• International Finance Corporation (IFC)
• Asian Infrastructure Investment Bank (AIIB)
• Asian Development Bank (ADB)
• Islamic Development Bank (IsDB)
• Eurasian Development Bank (EDB)

Globale Technische Partner:
• Culligan International (USA)
• Aqseptence Group (Deutschland)
• Wuhuan Engineering Co., Ltd. (China)`
      },
      financials: {
        title: "Finanzmodell",
        content: `Aktueller Status:
• Investition: 250K $ von 1.15M $ (22% Fortschritt)
• Status: Phase 2 (in Entwicklung)

Einnahmequellen:
• Provisionen von Investitionsprojekten
• Staking und Tokenomik
• Premium-Funktionsabonnements
• Plattformlizenzierung an Regierungen
• Beratungs- und Integrationsdienste

Wachstumsprognose:
• Q1 2025: Phase-2-Abschluss, DAO-Start
• Q2 2025: Integration von 100+ Wasserobjekten
• Q3-Q4 2025: Expansion auf 5+ Länder
• 2026: Globale Skalierung

Erwartete Renditen:
• Investitionsprojekte: 15-22% IRR
• Staking: bis zu 17% jährlich
• Tokenwertwachstum: an Ökosystemwachstum gebunden`
      }
    }
  };
  
  return translations[language] || translations['en'];
};

// Функция для получения секций вайтпейпера с переводами
export const getWhitepaperSections = (language: string = 'ru') => {
  const t = getWhitepaperTranslations(language);
  
  return [
    {
      id: "overview",
      title: t.overview.title,
      content: t.overview.content
    },
    {
      id: "architecture",
      title: t.architecture.title,
      content: t.architecture.content
    },
    {
      id: "tokenomics",
      title: t.tokenomics.title,
      content: t.tokenomics.content
    },
    {
      id: "governance",
      title: t.governance.title,
      content: t.governance.content
    },
    {
      id: "technology",
      title: t.technology.title,
      content: t.technology.content
    },
    {
      id: "investment",
      title: t.investment.title,
      content: t.investment.content
    },
    {
      id: "market",
      title: t.market.title,
      content: t.market.content
    },
    {
      id: "roadmap",
      title: t.roadmap.title,
      content: t.roadmap.content
    },
    {
      id: "team",
      title: t.team.title,
      content: t.team.content
    },
    {
      id: "financials",
      title: t.financials.title,
      content: t.financials.content
    }
  ];
};

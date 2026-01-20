// Функция для получения переводов слайдов
const getSlideTranslations = (language: string = 'ru') => {
  const translations: Record<string, any> = {
    ru: {
      slide1: {
        title: "NexusVita",
        subtitle: "Человекоцентричная экосистема здоровья нового поколения",
        content: "NexusVita — это глобальная цифровая экосистема, объединяющая физическое, психоэмоциональное, социальное и бытовое здоровье в единую систему. Платформа соединяет человека, специалистов, клиники, фитнес-локации, компании и города в единую человекоцентричную экосистему здоровья."
      },
      slide2: {
        title: "Проблемы современного здравоохранения",
        content: [
          "Фрагментация — разные специалисты дают противоречивые рекомендации",
          "Нет единой картины здоровья человека",
          "Реактивный подход вместо профилактики",
          "Отсутствие связи между фитнесом, медициной и психоэмоциями",
          "Нет прозрачности квалификации специалистов",
          "Сложность внедрения здоровых привычек в жизнь",
          "Отсутствие долгосрочной поддержки и мотивации"
        ]
      },
      slide3: {
        title: "Наше решение",
        content: [
          "Единая экосистема здоровья — все аспекты в одном месте",
          "Человекоцентричный подход — учет всего жизненного контекста",
          "Персональная карта здоровья с AI-анализом",
          "Объединение специалистов в команды для комплексного подхода",
          "Социальная поддержка и сообщество",
          "Токенизированная экономика для мотивации",
          "DAO-управление для прозрачности развития"
        ]
      },
      slide4: {
        title: "Архитектура экосистемы",
        content: [
          "Человек — личностный профиль здоровья с учетом всех аспектов жизни",
          "Специалисты — 30+ профессий (врачи, тренеры, психологи, нутрициологи)",
          "Локации — фитнес-клубы, клиники, студии, центры здоровья",
          "Компании — корпоративные программы wellbeing",
          "Города — муниципальные программы здоровья",
          "AI-ассистент — персональные рекомендации и анализ",
          "Web3 — токены, NFT, DAO для прозрачности и мотивации"
        ]
      },
      slide5: {
        title: "Ключевые модули",
        content: [
          "Личностный профиль здоровья — единая карта всех аспектов",
          "Персональная карта здоровья — динамический анализ и рекомендации",
          "Жизненные ритмы — анализ сна, питания, активности, стресса",
          "Социальная сеть здоровья — поддержка и мотивация",
          "Маркетплейс услуг — доступ к специалистам и программам",
          "Челленджи — городские, корпоративные, тематические",
          "Образование — курсы, вебинары, база знаний"
        ]
      },
      slide6: {
        title: "Токеномика",
        content: [
          "Токен NexusVita для участия в экосистеме",
          "Earn модели:",
          "• Move-to-earn — награды за активность",
          "• Engage-to-earn — участие в сообществе",
          "• Challenge-to-earn — выполнение челленджей",
          "• Help-to-earn — помощь другим",
          "• Learn-to-earn — обучение и развитие",
          "Стейкинг — участие в DAO и доступ к премиум функциям",
          "Использование: оплата услуг, подписки, скидки, награды"
        ]
      },
      slide7: {
        title: "Уникальность подхода",
        content: [
          "Человекоцентричность — учет всего жизненного контекста",
          "Целостность — здоровье как система, а не набор симптомов",
          "Проактивность — профилактика вместо лечения",
          "Экосистемность — объединение всех участников",
          "Прозрачность — Web3 для доверия и верификации",
          "Социальность — сообщество как ключ к здоровью",
          "Персонализация — AI для индивидуальных рекомендаций"
        ]
      },
      slide8: {
        title: "Дорожная карта",
        content: [
          "Q1 2025 — MVP: профили, базовая карта здоровья, маркетплейс",
          "Q2 2025 — AI-анализ, социальная сеть, челленджи",
          "Q3 2025 — DAO запуск, токеномика, расширенные программы",
          "Q4 2025 — Корпоративные и городские программы, мобильные приложения",
          "2026 — Глобальное масштабирование, международные партнерства"
        ]
      }
    },
    en: {
      slide1: {
        title: "NexusVita",
        subtitle: "Next-generation human-centric health ecosystem",
        content: "NexusVita is a global digital ecosystem combining physical, psycho-emotional, social and lifestyle health into a single system. The platform connects people, specialists, clinics, fitness locations, companies and cities into a unified human-centric health ecosystem."
      },
      slide2: {
        title: "Modern Healthcare Problems",
        content: [
          "Fragmentation — different specialists give contradictory recommendations",
          "No unified picture of human health",
          "Reactive approach instead of prevention",
          "Lack of connection between fitness, medicine and psycho-emotions",
          "No transparency in specialist qualifications",
          "Difficulty implementing healthy habits into life",
          "Lack of long-term support and motivation"
        ]
      },
      slide3: {
        title: "Our Solution",
        content: [
          "Unified health ecosystem — all aspects in one place",
          "Human-centric approach — accounting for all life context",
          "Personal health map with AI analysis",
          "Uniting specialists into teams for comprehensive approach",
          "Social support and community",
          "Tokenized economy for motivation",
          "DAO governance for transparent development"
        ]
      },
      slide4: {
        title: "Ecosystem Architecture",
        content: [
          "Person — personal health profile considering all life aspects",
          "Specialists — 30+ professions (doctors, trainers, psychologists, nutritionists)",
          "Locations — fitness clubs, clinics, studios, health centers",
          "Companies — corporate wellbeing programs",
          "Cities — municipal health programs",
          "AI Assistant — personal recommendations and analysis",
          "Web3 — tokens, NFT, DAO for transparency and motivation"
        ]
      },
      slide5: {
        title: "Key Modules",
        content: [
          "Personal Health Profile — unified map of all aspects",
          "Personal Health Map — dynamic analysis and recommendations",
          "Life Rhythms — analysis of sleep, nutrition, activity, stress",
          "Health Social Network — support and motivation",
          "Service Marketplace — access to specialists and programs",
          "Challenges — city, corporate, thematic",
          "Education — courses, webinars, knowledge base"
        ]
      },
      slide6: {
        title: "Tokenomics",
        content: [
          "NexusVita token for ecosystem participation",
          "Earn models:",
          "• Move-to-earn — rewards for activity",
          "• Engage-to-earn — community participation",
          "• Challenge-to-earn — completing challenges",
          "• Help-to-earn — helping others",
          "• Learn-to-earn — learning and development",
          "Staking — DAO participation and premium feature access",
          "Usage: service payment, subscriptions, discounts, rewards"
        ]
      },
      slide7: {
        title: "Uniqueness of Approach",
        content: [
          "Human-centricity — accounting for all life context",
          "Holism — health as a system, not a set of symptoms",
          "Proactivity — prevention instead of treatment",
          "Ecosystem approach — uniting all participants",
          "Transparency — Web3 for trust and verification",
          "Sociality — community as key to health",
          "Personalization — AI for individual recommendations"
        ]
      },
      slide8: {
        title: "Roadmap",
        content: [
          "Q1 2025 — MVP: profiles, basic health map, marketplace",
          "Q2 2025 — AI analysis, social network, challenges",
          "Q3 2025 — DAO launch, tokenomics, extended programs",
          "Q4 2025 — Corporate and city programs, mobile apps",
          "2026 — Global scaling, international partnerships"
        ]
      }
    },
    ar: {
      slide1: {
        title: "NexusVita",
        subtitle: "نظام بيئي صحي يركز على الإنسان من الجيل القادم",
        content: "NexusVita هو نظام بيئي رقمي عالمي يجمع بين الصحة الجسدية والنفسية والعاطفية والاجتماعية ونمط الحياة في نظام واحد. تربط المنصة الأشخاص والمتخصصين والعيادات ومواقع اللياقة البدنية والشركات والمدن في نظام بيئي صحي موحد يركز على الإنسان."
      },
      slide2: {
        title: "مشاكل الرعاية الصحية الحديثة",
        content: [
          "التجزئة — المتخصصون المختلفون يعطون توصيات متناقضة",
          "لا توجد صورة موحدة لصحة الإنسان",
          "نهج تفاعلي بدلاً من الوقاية",
          "عدم وجود اتصال بين اللياقة البدنية والطب والعواطف النفسية",
          "لا يوجد شفافية في مؤهلات المتخصصين",
          "صعوبة تنفيذ العادات الصحية في الحياة",
          "عدم وجود دعم وتحفيز طويل الأمد"
        ]
      },
      slide3: {
        title: "حلنا",
        content: [
          "نظام بيئي صحي موحد — جميع الجوانب في مكان واحد",
          "نهج يركز على الإنسان — مراعاة جميع سياقات الحياة",
          "خريطة صحية شخصية مع تحليل الذكاء الاصطناعي",
          "توحيد المتخصصين في فرق لنهج شامل",
          "الدعم الاجتماعي والمجتمع",
          "اقتصاد معرّف بالرموز للتحفيز",
          "حوكمة DAO للتطوير الشفاف"
        ]
      },
      slide4: {
        title: "هندسة النظام البيئي",
        content: [
          "الشخص — ملف صحي شخصي يأخذ في الاعتبار جميع جوانب الحياة",
          "المتخصصون — 30+ مهنة (أطباء، مدربون، أطباء نفسيون، أخصائيو تغذية)",
          "المواقع — نوادي اللياقة البدنية، العيادات، الاستوديوهات، مراكز الصحة",
          "الشركات — برامج الرفاهية المؤسسية",
          "المدن — برامج الصحة البلدية",
          "مساعد الذكاء الاصطناعي — توصيات وتحليلات شخصية",
          "Web3 — الرموز، NFT، DAO للشفافية والتحفيز"
        ]
      },
      slide5: {
        title: "الوحدات الرئيسية",
        content: [
          "الملف الصحي الشخصي — خريطة موحدة لجميع الجوانب",
          "الخريطة الصحية الشخصية — تحليل وتوصيات ديناميكية",
          "إيقاعات الحياة — تحليل النوم والتغذية والنشاط والإجهاد",
          "الشبكة الاجتماعية الصحية — الدعم والتحفيز",
          "سوق الخدمات — الوصول إلى المتخصصين والبرامج",
          "التحديات — المدينة، المؤسسية، المواضيعية",
          "التعليم — الدورات والندوات عبر الإنترنت، قاعدة المعرفة"
        ]
      },
      slide6: {
        title: "اقتصاديات الرمز",
        content: [
          "رمز NexusVita للمشاركة في النظام البيئي",
          "نماذج الكسب:",
          "• Move-to-earn — مكافآت للنشاط",
          "• Engage-to-earn — المشاركة في المجتمع",
          "• Challenge-to-earn — إكمال التحديات",
          "• Help-to-earn — مساعدة الآخرين",
          "• Learn-to-earn — التعلم والتطوير",
          "التخزين — المشاركة في DAO والوصول إلى الميزات المميزة",
          "الاستخدام: دفع الخدمات، الاشتراكات، الخصومات، المكافآت"
        ]
      },
      slide7: {
        title: "تفرد النهج",
        content: [
          "التركيز على الإنسان — مراعاة جميع سياقات الحياة",
          "الشمولية — الصحة كنظام وليس مجموعة من الأعراض",
          "الاستباقية — الوقاية بدلاً من العلاج",
          "نهج النظام البيئي — توحيد جميع المشاركين",
          "الشفافية — Web3 للثقة والتحقق",
          "الاجتماعية — المجتمع كمفتاح للصحة",
          "التخصيص — الذكاء الاصطناعي للتوصيات الفردية"
        ]
      },
      slide8: {
        title: "خارطة الطريق",
        content: [
          "الربع الأول 2025 — MVP: الملفات الشخصية، خريطة الصحة الأساسية، السوق",
          "الربع الثاني 2025 — تحليل الذكاء الاصطناعي، الشبكة الاجتماعية، التحديات",
          "الربع الثالث 2025 — إطلاق DAO، اقتصاديات الرمز، البرامج الموسعة",
          "الربع الرابع 2025 — البرامج المؤسسية والمدنية، التطبيقات المحمولة",
          "2026 — التوسع العالمي، الشراكات الدولية"
        ]
      }
    },
    es: {
      slide1: {
        title: "NexusVita",
        subtitle: "Ecosistema de salud centrado en el ser humano de próxima generación",
        content: "NexusVita es un ecosistema digital global que combina la salud física, psicoemocional, social y de estilo de vida en un sistema único. La plataforma conecta personas, especialistas, clínicas, ubicaciones de fitness, empresas y ciudades en un ecosistema de salud unificado centrado en el ser humano."
      },
      slide2: {
        title: "Problemas de la Atención Sanitaria Moderna",
        content: [
          "Fragmentación — diferentes especialistas dan recomendaciones contradictorias",
          "No hay una imagen unificada de la salud humana",
          "Enfoque reactivo en lugar de prevención",
          "Falta de conexión entre fitness, medicina y psicoemociones",
          "No hay transparencia en las calificaciones de especialistas",
          "Dificultad para implementar hábitos saludables en la vida",
          "Falta de apoyo y motivación a largo plazo"
        ]
      },
      slide3: {
        title: "Nuestra Solución",
        content: [
          "Ecosistema de salud unificado — todos los aspectos en un lugar",
          "Enfoque centrado en el ser humano — considerando todo el contexto de vida",
          "Mapa de salud personal con análisis de IA",
          "Unir especialistas en equipos para un enfoque integral",
          "Apoyo social y comunidad",
          "Economía tokenizada para motivación",
          "Gobernanza DAO para desarrollo transparente"
        ]
      },
      slide4: {
        title: "Arquitectura del Ecosistema",
        content: [
          "Persona — perfil de salud personal considerando todos los aspectos de la vida",
          "Especialistas — 30+ profesiones (médicos, entrenadores, psicólogos, nutricionistas)",
          "Ubicaciones — clubes de fitness, clínicas, estudios, centros de salud",
          "Empresas — programas corporativos de bienestar",
          "Ciudades — programas municipales de salud",
          "Asistente IA — recomendaciones y análisis personalizados",
          "Web3 — tokens, NFT, DAO para transparencia y motivación"
        ]
      },
      slide5: {
        title: "Módulos Clave",
        content: [
          "Perfil de Salud Personal — mapa unificado de todos los aspectos",
          "Mapa de Salud Personal — análisis dinámico y recomendaciones",
          "Ritmos de Vida — análisis de sueño, nutrición, actividad, estrés",
          "Red Social de Salud — apoyo y motivación",
          "Marketplace de Servicios — acceso a especialistas y programas",
          "Desafíos — ciudad, corporativos, temáticos",
          "Educación — cursos, webinars, base de conocimientos"
        ]
      },
      slide6: {
        title: "Tokenómica",
        content: [
          "Token NexusVita para participación en el ecosistema",
          "Modelos de ganancia:",
          "• Move-to-earn — recompensas por actividad",
          "• Engage-to-earn — participación en la comunidad",
          "• Challenge-to-earn — completar desafíos",
          "• Help-to-earn — ayudar a otros",
          "• Learn-to-earn — aprendizaje y desarrollo",
          "Staking — participación en DAO y acceso a funciones premium",
          "Uso: pago de servicios, suscripciones, descuentos, recompensas"
        ]
      },
      slide7: {
        title: "Unicidad del Enfoque",
        content: [
          "Centrado en el ser humano — considerando todo el contexto de vida",
          "Holismo — salud como sistema, no un conjunto de síntomas",
          "Proactividad — prevención en lugar de tratamiento",
          "Enfoque de ecosistema — uniendo a todos los participantes",
          "Transparencia — Web3 para confianza y verificación",
          "Sociabilidad — comunidad como clave para la salud",
          "Personalización — IA para recomendaciones individuales"
        ]
      },
      slide8: {
        title: "Hoja de Ruta",
        content: [
          "Q1 2025 — MVP: perfiles, mapa básico de salud, marketplace",
          "Q2 2025 — Análisis de IA, red social, desafíos",
          "Q3 2025 — Lanzamiento de DAO, tokenómica, programas extendidos",
          "Q4 2025 — Programas corporativos y de ciudad, aplicaciones móviles",
          "2026 — Escalado global, asociaciones internacionales"
        ]
      }
    },
    pl: {
      slide1: {
        title: "NexusVita",
        subtitle: "Ekosystem zdrowia skoncentrowany na człowieku nowej generacji",
        content: "NexusVita to globalny ekosystem cyfrowy łączący zdrowie fizyczne, psychoemocjonalne, społeczne i stylu życia w jeden system. Platforma łączy ludzi, specjalistów, kliniki, lokalizacje fitness, firmy i miasta w ujednolicony ekosystem zdrowia skoncentrowany na człowieku."
      },
      slide2: {
        title: "Problemy Współczesnej Opieki Zdrowotnej",
        content: [
          "Fragmentacja — różni specjaliści dają sprzeczne zalecenia",
          "Brak ujednoliconego obrazu zdrowia człowieka",
          "Podejście reaktywne zamiast profilaktyki",
          "Brak połączenia między fitnessem, medycyną i psychoemocjami",
          "Brak przejrzystości w kwalifikacjach specjalistów",
          "Trudność w wprowadzaniu zdrowych nawyków do życia",
          "Brak długoterminowego wsparcia i motywacji"
        ]
      },
      slide3: {
        title: "Nasze Rozwiązanie",
        content: [
          "Ujednolicony ekosystem zdrowia — wszystkie aspekty w jednym miejscu",
          "Podejście skoncentrowane na człowieku — uwzględnianie całego kontekstu życia",
          "Osobista mapa zdrowia z analizą AI",
          "Łączenie specjalistów w zespoły dla kompleksowego podejścia",
          "Wsparcie społeczne i społeczność",
          "Tokenizowana ekonomia dla motywacji",
          "Zarządzanie DAO dla przejrzystego rozwoju"
        ]
      },
      slide4: {
        title: "Architektura Ekosystemu",
        content: [
          "Osoba — osobisty profil zdrowia uwzględniający wszystkie aspekty życia",
          "Specjaliści — 30+ zawodów (lekarze, trenerzy, psycholodzy, dietetycy)",
          "Lokalizacje — kluby fitness, kliniki, studia, centra zdrowia",
          "Firmy — korporacyjne programy wellbeing",
          "Miasta — miejskie programy zdrowia",
          "Asystent AI — osobiste rekomendacje i analiza",
          "Web3 — tokeny, NFT, DAO dla przejrzystości i motywacji"
        ]
      },
      slide5: {
        title: "Kluczowe Moduły",
        content: [
          "Osobisty Profil Zdrowia — ujednolicona mapa wszystkich aspektów",
          "Osobista Mapa Zdrowia — dynamiczna analiza i rekomendacje",
          "Rytmy Życia — analiza snu, odżywiania, aktywności, stresu",
          "Społeczna Sieć Zdrowia — wsparcie i motywacja",
          "Marketplace Usług — dostęp do specjalistów i programów",
          "Wyzwania — miejskie, korporacyjne, tematyczne",
          "Edukacja — kursy, webinary, baza wiedzy"
        ]
      },
      slide6: {
        title: "Tokenomika",
        content: [
          "Token NexusVita do uczestnictwa w ekosystemie",
          "Modele zarabiania:",
          "• Move-to-earn — nagrody za aktywność",
          "• Engage-to-earn — uczestnictwo w społeczności",
          "• Challenge-to-earn — ukończenie wyzwań",
          "• Help-to-earn — pomoc innym",
          "• Learn-to-earn — uczenie się i rozwój",
          "Staking — uczestnictwo w DAO i dostęp do funkcji premium",
          "Użycie: płatność za usługi, subskrypcje, zniżki, nagrody"
        ]
      },
      slide7: {
        title: "Unikalność Podejścia",
        content: [
          "Skoncentrowanie na człowieku — uwzględnianie całego kontekstu życia",
          "Holizm — zdrowie jako system, nie zestaw objawów",
          "Proaktywność — profilaktyka zamiast leczenia",
          "Podejście ekosystemowe — łączenie wszystkich uczestników",
          "Przejrzystość — Web3 dla zaufania i weryfikacji",
          "Społeczność — społeczność jako klucz do zdrowia",
          "Personalizacja — AI dla indywidualnych rekomendacji"
        ]
      },
      slide8: {
        title: "Mapa Drogowa",
        content: [
          "Q1 2025 — MVP: profile, podstawowa mapa zdrowia, marketplace",
          "Q2 2025 — Analiza AI, sieć społeczna, wyzwania",
          "Q3 2025 — Uruchomienie DAO, tokenomika, rozszerzone programy",
          "Q4 2025 — Programy korporacyjne i miejskie, aplikacje mobilne",
          "2026 — Skalowanie globalne, partnerstwa międzynarodowe"
        ]
      }
    },
    fr: {
      slide1: {
        title: "NexusVita",
        subtitle: "Écosystème de santé centré sur l'humain de nouvelle génération",
        content: "NexusVita est un écosystème numérique mondial combinant la santé physique, psychoémotionnelle, sociale et de style de vie en un système unique. La plateforme connecte les personnes, spécialistes, cliniques, lieux de fitness, entreprises et villes dans un écosystème de santé unifié centré sur l'humain."
      },
      slide2: {
        title: "Problèmes des Soins de Santé Modernes",
        content: [
          "Fragmentation — différents spécialistes donnent des recommandations contradictoires",
          "Pas d'image unifiée de la santé humaine",
          "Approche réactive au lieu de prévention",
          "Manque de connexion entre fitness, médecine et psychoémotions",
          "Pas de transparence dans les qualifications des spécialistes",
          "Difficulté à mettre en œuvre des habitudes saines dans la vie",
          "Manque de soutien et motivation à long terme"
        ]
      },
      slide3: {
        title: "Notre Solution",
        content: [
          "Écosystème de santé unifié — tous les aspects en un seul endroit",
          "Approche centrée sur l'humain — prise en compte de tout le contexte de vie",
          "Carte de santé personnelle avec analyse IA",
          "Unir les spécialistes en équipes pour une approche complète",
          "Soutien social et communauté",
          "Économie tokenisée pour motivation",
          "Gouvernance DAO pour développement transparent"
        ]
      },
      slide4: {
        title: "Architecture de l'Écosystème",
        content: [
          "Personne — profil de santé personnel considérant tous les aspects de la vie",
          "Spécialistes — 30+ professions (médecins, entraîneurs, psychologues, nutritionnistes)",
          "Lieux — clubs de fitness, cliniques, studios, centres de santé",
          "Entreprises — programmes corporatifs de bien-être",
          "Villes — programmes municipaux de santé",
          "Assistant IA — recommandations et analyses personnalisées",
          "Web3 — tokens, NFT, DAO pour transparence et motivation"
        ]
      },
      slide5: {
        title: "Modules Clés",
        content: [
          "Profil de Santé Personnel — carte unifiée de tous les aspects",
          "Carte de Santé Personnelle — analyse dynamique et recommandations",
          "Rythmes de Vie — analyse du sommeil, nutrition, activité, stress",
          "Réseau Social de Santé — soutien et motivation",
          "Marketplace de Services — accès aux spécialistes et programmes",
          "Défis — ville, corporatifs, thématiques",
          "Éducation — cours, webinaires, base de connaissances"
        ]
      },
      slide6: {
        title: "Tokenomique",
        content: [
          "Token NexusVita pour participation à l'écosystème",
          "Modèles de gain:",
          "• Move-to-earn — récompenses pour activité",
          "• Engage-to-earn — participation communautaire",
          "• Challenge-to-earn — compléter défis",
          "• Help-to-earn — aider les autres",
          "• Learn-to-earn — apprentissage et développement",
          "Staking — participation DAO et accès aux fonctions premium",
          "Usage: paiement de services, abonnements, réductions, récompenses"
        ]
      },
      slide7: {
        title: "Unicité de l'Approche",
        content: [
          "Centré sur l'humain — prise en compte de tout le contexte de vie",
          "Holisme — santé comme système, pas un ensemble de symptômes",
          "Proactivité — prévention au lieu de traitement",
          "Approche écosystème — unir tous les participants",
          "Transparence — Web3 pour confiance et vérification",
          "Socialité — communauté comme clé de la santé",
          "Personnalisation — IA pour recommandations individuelles"
        ]
      },
      slide8: {
        title: "Feuille de Route",
        content: [
          "Q1 2025 — MVP: profils, carte de santé de base, marketplace",
          "Q2 2025 — Analyse IA, réseau social, défis",
          "Q3 2025 — Lancement DAO, tokenomique, programmes étendus",
          "Q4 2025 — Programmes corporatifs et de ville, applications mobiles",
          "2026 — Mise à l'échelle globale, partenariats internationaux"
        ]
      }
    },
    de: {
      slide1: {
        title: "NexusVita",
        subtitle: "Gesundheitsökosystem der nächsten Generation mit Fokus auf den Menschen",
        content: "NexusVita ist ein globales digitales Ökosystem, das physische, psychoemotionale, soziale und Lebensstil-Gesundheit in ein einheitliches System kombiniert. Die Plattform verbindet Menschen, Spezialisten, Kliniken, Fitness-Standorte, Unternehmen und Städte in ein einheitliches menschenzentriertes Gesundheitsökosystem."
      },
      slide2: {
        title: "Probleme der Modernen Gesundheitsversorgung",
        content: [
          "Fragmentierung — verschiedene Spezialisten geben widersprüchliche Empfehlungen",
          "Kein einheitliches Bild der menschlichen Gesundheit",
          "Reaktiver Ansatz statt Prävention",
          "Fehlende Verbindung zwischen Fitness, Medizin und Psychoemotionen",
          "Keine Transparenz bei Spezialistenqualifikationen",
          "Schwierigkeit, gesunde Gewohnheiten im Leben umzusetzen",
          "Fehlende langfristige Unterstützung und Motivation"
        ]
      },
      slide3: {
        title: "Unsere Lösung",
        content: [
          "Einheitliches Gesundheitsökosystem — alle Aspekte an einem Ort",
          "Menschenzentrierter Ansatz — Berücksichtigung des gesamten Lebenskontexts",
          "Persönliche Gesundheitskarte mit KI-Analyse",
          "Vereinigung von Spezialisten in Teams für umfassenden Ansatz",
          "Soziale Unterstützung und Gemeinschaft",
          "Tokenisierte Wirtschaft für Motivation",
          "DAO-Governance für transparente Entwicklung"
        ]
      },
      slide4: {
        title: "Ökosystemarchitektur",
        content: [
          "Person — persönliches Gesundheitsprofil unter Berücksichtigung aller Lebensaspekte",
          "Spezialisten — 30+ Berufe (Ärzte, Trainer, Psychologen, Ernährungswissenschaftler)",
          "Standorte — Fitness-Clubs, Kliniken, Studios, Gesundheitszentren",
          "Unternehmen — Corporate Wellbeing-Programme",
          "Städte — kommunale Gesundheitsprogramme",
          "KI-Assistent — persönliche Empfehlungen und Analyse",
          "Web3 — Tokens, NFT, DAO für Transparenz und Motivation"
        ]
      },
      slide5: {
        title: "Schlüsselmodule",
        content: [
          "Persönliches Gesundheitsprofil — einheitliche Karte aller Aspekte",
          "Persönliche Gesundheitskarte — dynamische Analyse und Empfehlungen",
          "Lebensrhythmen — Analyse von Schlaf, Ernährung, Aktivität, Stress",
          "Gesundheitssoziales Netzwerk — Unterstützung und Motivation",
          "Service-Marktplatz — Zugang zu Spezialisten und Programmen",
          "Herausforderungen — Stadt, Corporate, Thematisch",
          "Bildung — Kurse, Webinare, Wissensdatenbank"
        ]
      },
      slide6: {
        title: "Tokenomik",
        content: [
          "NexusVita-Token für Ökosystemteilnahme",
          "Verdienstmodelle:",
          "• Move-to-earn — Belohnungen für Aktivität",
          "• Engage-to-earn — Gemeinschaftsteilnahme",
          "• Challenge-to-earn — Herausforderungen abschließen",
          "• Help-to-earn — anderen helfen",
          "• Learn-to-earn — Lernen und Entwicklung",
          "Staking — DAO-Teilnahme und Premium-Funktionszugang",
          "Verwendung: Servicezahlung, Abonnements, Rabatte, Belohnungen"
        ]
      },
      slide7: {
        title: "Einzigartigkeit des Ansatzes",
        content: [
          "Menschenzentriertheit — Berücksichtigung des gesamten Lebenskontexts",
          "Holismus — Gesundheit als System, nicht als Symptomgruppe",
          "Proaktivität — Prävention statt Behandlung",
          "Ökosystemansatz — Vereinigung aller Teilnehmer",
          "Transparenz — Web3 für Vertrauen und Verifizierung",
          "Sozialität — Gemeinschaft als Schlüssel zur Gesundheit",
          "Personalisierung — KI für individuelle Empfehlungen"
        ]
      },
      slide8: {
        title: "Roadmap",
        content: [
          "Q1 2025 — MVP: Profile, grundlegende Gesundheitskarte, Marktplatz",
          "Q2 2025 — KI-Analyse, soziales Netzwerk, Herausforderungen",
          "Q3 2025 — DAO-Start, Tokenomik, erweiterte Programme",
          "Q4 2025 — Corporate- und Stadtprogramme, mobile Apps",
          "2026 — Globale Skalierung, internationale Partnerschaften"
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
    visual: "ecosystem"
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
    visual: "architecture"
  },
  {
    id: 5,
    title: t.slide5.title,
    content: t.slide5.content,
    visual: "modules"
  },
  {
    id: 6,
    title: t.slide6.title,
    content: t.slide6.content,
    visual: "tokenomics"
  },
  {
    id: 7,
    title: t.slide7.title,
    content: t.slide7.content,
    visual: "uniqueness"
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
        title: "Обзор проекта NexusVita",
        content: `NexusVita — это глобальная человекоцентричная экосистема здоровья, объединяющая физическое, психоэмоциональное, социальное и бытовое здоровье в единую систему.

Миссия: Создать безопасное, научно-обоснованное и этичное пространство, где человек понимает и развивает своё здоровье, учится строить зрелые отношения с собой и другими, получает доступ к знаниям, практикам, экспертам и сообществу, превращает заботу о себе в долгосрочную ценность и стиль жизни.

Философия: Здоровье — это взаимосвязанная система, включающая тело, эмоции, социальную среду, быт, окружение, ритмы жизни, поведение и смыслообразование. NexusVita не лечит симптомы — она выстраивает систему жизни.`
      },
      'human-centricity': {
        title: "Человекоцентричный подход",
        content: `Здоровье человека определяется не только тренером, врачом или анализом, а всем жизненным контекстом:

Физические факторы:
• Тело и его состояние
• Физическая активность
• Питание
• Сон
• Медицинские показатели

Психоэмоциональные факторы:
• Эмоциональное состояние
• Стресс и его источники
• Психическое здоровье
• Мотивация и цели
• Смыслообразование

Социальные факторы:
• Отношения с людьми
• Социальная поддержка
• Сообщество и принадлежность
• Коммуникация
• Любовь и близость

Бытовые факторы:
• Дом и окружение
• Работа и ритмы жизни
• Организация быта
• Доступность ресурсов
• Поведенческие паттерны

NexusVita учитывает все эти факторы в единой системе, создавая целостную картину здоровья человека.`
      },
      architecture: {
        title: "Архитектура экосистемы",
        content: `Платформа объединяет всех участников здоровья:

1. Человек (Пользователь):
   • Личностный профиль здоровья
   • Персональная карта здоровья
   • Жизненные ритмы и паттерны
   • Цели и мотивация
   • Социальные связи

2. Специалисты (30+ профессий):
   • Врачи различных специальностей
   • Тренеры и фитнес-инструкторы
   • Психологи и психотерапевты
   • Нутрициологи
   • Реабилитологи
   • Массажисты
   • Коучи здоровья
   • Эксперты по дыханию
   • И многие другие

3. Локации:
   • Фитнес-клубы и студии
   • Клиники и медицинские центры
   • Йога-студии
   • Массажные центры
   • Центры здоровья
   • Реабилитационные центры

4. Компании:
   • Корпоративные программы wellbeing
   • Стимулирование здоровья сотрудников
   • Экономия на страховках
   • Токены для сотрудников

5. Города и муниципалитеты:
   • Городские программы здоровья
   • Оценка здоровья районов
   • Стимулирование активности
   • Подключение кружков и секций

6. AI-ассистент:
   • Анализ данных здоровья
   • Персональные рекомендации
   • Выявление паттернов
   • Прогнозы рисков
   • Поддержка принятия решений

7. Web3 инфраструктура:
   • Токены для участия
   • NFT для доступа и достижений
   • SBT для репутации
   • DAO для управления
   • Смарт-контракты для прозрачности`
      },
      'health-profile': {
        title: "Личностный профиль здоровья",
        content: `Единая система учета всех аспектов здоровья:

Физическое здоровье:
• Показатели тела (вес, рост, ИМТ, состав тела)
• Физическая активность
• Питание и диета
• Сон и восстановление
• Медицинские показатели (анализы, обследования)
• Хронические состояния
• Лекарства и добавки

Психоэмоциональное здоровье:
• Эмоциональное состояние (настроение, стресс)
• Психическое здоровье
• Энергия и мотивация
• Цели и смыслы
• Удовлетворенность жизнью
• Тревога и депрессия

Социальное здоровье:
• Отношения с близкими
• Социальная поддержка
• Участие в сообществе
• Коммуникация
• Любовь и близость
• Социальные связи

Бытовое здоровье:
• Организация жизни
• Работа и баланс
• Дом и окружение
• Доступность ресурсов
• Поведенческие паттерны
• Ритмы жизни

AI-анализ:
• Выявление паттернов и корреляций
• Прогнозы рисков
• Персональные рекомендации
• Динамика изменений
• Предупреждения о проблемах`
      },
      specialists: {
        title: "Система специалистов",
        content: `Многоуровневая система специалистов:

Верификация:
• Документы и сертификаты
• Отзывы и рейтинги
• Статистика результатов
• Web3-SBT репутация
• Прозрачная история практики

Командная работа:
Специалисты объединяются в команды для комплексного подхода:
• Здоровье сердца (кардиолог + тренер + нутрициолог)
• Ментальное здоровье (психолог + психотерапевт + коуч)
• Снижение веса (диетолог + тренер + психолог)
• Сон (сомнолог + психолог + коуч)
• Спортивная подготовка (тренер + врач + реабилитолог)
• Реабилитация (врач + реабилитолог + массажист)

Мини-сайт специалиста:
• Расписание и доступность
• Услуги и программы
• Цены и пакеты
• Контент и достижения
• Рейтинги и отзывы
• AI-помощник ведения практики

Marketplace услуг:
• Консультации (онлайн и офлайн)
• Программы (30-90 дней)
• Курсы и обучение
• Пакеты услуг
• NFT-доступы к эксклюзивному контенту`
      },
      locations: {
        title: "Локации и организации",
        content: `Физические локации в экосистеме:

Типы локаций:
• Фитнес-клубы и студии
• Клиники и медицинские центры
• Йога-студии
• Массажные центры
• Центры здоровья
• Реабилитационные центры
• Спа и wellness центры

Возможности локаций:
• Профиль локации с информацией
• Расписание занятий и услуг
• Запись на услуги
• Групповые занятия
• Учет посещений
• Акции и абонементы
• NFT-доступы
• Статистика и аналитика
• Аудит специалистов

Корпоративные клиенты:
Компании могут:
• Покупать токены для сотрудников
• Выдавать токены за активность
• Стимулировать wellbeing
• Экономить на страховках
• Создавать программы здоровья
• Отслеживать метрики здоровья сотрудников

Государственные программы:
Города могут:
• Проводить челленджи здоровья
• Оценивать здоровье районов
• Стимулировать активности
• Подключать кружки и секции
• Работать с подростками и пенсионерами
• Создавать программы профилактики`
      },
      social: {
        title: "Социальная сеть здоровья",
        content: `Сообщество как ключ к здоровью:

Социальная лента:
• Публикация прогресса и достижений
• Вопросы и ответы
• Советы и опыт
• Маршруты тренировок
• Рецепты и питание
• Мотивационные истории

Поддержка и наставничество:
• Опытные помогают новичкам
• Формируются пары и мини-группы
• Группы по целям:
  - Похудение
  - Стресс-менеджмент
  - Марафонская подготовка
  - Здоровье сердца
  - Ментальное здоровье

Комьюнити как ресурс:
Исследования показывают, что социальная поддержка повышает приверженность здоровому образу жизни на 40-60%.

Функции сообщества:
• Группы по интересам
• Челленджи и соревнования
• Встречи и события
• Обмен опытом
• Мотивация и поддержка
• Совместные цели`
      },
      tokenomics: {
        title: "Токеномика NexusVita",
        content: `Токен NexusVita для участия в экосистеме:

Функции токена:
• Оплата услуг специалистов
• Подписки на премиум функции
• Кэшбек за активность
• Скидки у партнеров
• Участие в челленджах
• Реферальная программа
• Награды за достижения
• DAO-голосования

Earn модели (заработок токенов):
• Move-to-earn: награды за физическую активность
• Engage-to-earn: участие в сообществе и помощь другим
• Challenge-to-earn: выполнение челленджей
• Help-to-earn: помощь другим участникам
• Learn-to-earn: обучение и развитие
• Complete-to-earn: завершение программ

Стейкинг:
• Участие в DAO голосовании
• Доступ к премиум функциям
• Повышенные награды
• Участие в исследованиях
• Приоритетная поддержка

Распределение токенов:
• 40% — сообществу (награды, стейкинг)
• 25% — команде и партнерам (vesting 4 года)
• 20% — инвесторам (раунды финансирования)
• 10% — резерв и развитие
• 5% — ликвидность и маркетинг`
      },
      ai: {
        title: "AI-ассистент здоровья",
        content: `Персональный AI-ассистент для анализа и рекомендаций:

Анализ данных:
• Динамика здоровья по всем аспектам
• Выявление паттернов поведения
• Корреляции между факторами
• Прогнозы рисков здоровья
• Рекомендации специалистов

Персональные рекомендации:
• На основе данных пользователя
• Учет жизненного контекста
• Адаптация к ритмам жизни
• Учет целей и мотивации
• Научно-обоснованные советы

Функции AI:
• Анализ причин, а не симптомов
• Выявление взаимосвязей
• Предупреждения о рисках
• Рекомендации по действиям
• Поддержка принятия решений
• Персонализация контента

Человекоцентричный AI:
• Обучен на данных здравоохранения
• Учет бытового контекста
• Этичный и безопасный
• Прозрачный в рекомендациях
• Поддерживающий, а не давящий`
      },
      challenges: {
        title: "Челленджи и программы",
        content: `Мотивация через челленджи и программы:

Типы челленджей:
• Городские — участие всего города
• Корпоративные — для сотрудников компаний
• Тематические — по конкретным темам (сон, питание, стресс)
• Семейные — для семей
• Профессиональные — для специалистов

Программы 30-90 дней:
Комплексные программы от специалистов:
• Программа сна (30 дней)
• Программа питания (60 дней)
• Программа тренировок (90 дней)
• Программа снижения стресса (30 дней)
• Программа реабилитации (60-90 дней)
• Программа выносливости (90 дней)

Структура программ:
• Пошаговый план действий
• Ежедневные задания
• Отслеживание прогресса
• Поддержка специалистов
• Сообщество участников
• Награды за выполнение

Видео-вызовы и онлайн занятия:
• Видео-консультации со специалистами
• Онлайн групповые занятия
• Видео-тренировки
• Вебинары и мастер-классы
• Цифровая клиника и фитнес`
      },
      technology: {
        title: "Технологический стек",
        content: `Frontend:
• Next.js 14 с TypeScript
• React для UI компонентов
• Tailwind CSS для стилизации
• Framer Motion для анимаций
• PWA для мобильного доступа

Backend:
• Node.js с TypeScript
• Microservices архитектура
• REST и GraphQL API
• WebSocket для real-time
• Интеграции с медицинскими системами

Блокчейн:
• Мультиблокчейн поддержка (Ethereum, Polygon, BSC)
• Web3 интеграция
• Смарт-контракты для DAO
• NFT для доступа и достижений
• SBT для репутации

AI и ML:
• OpenAI API для обработки естественного языка
• Машинное обучение для анализа данных
• Предсказательные модели
• Персонализация рекомендаций
• Обнаружение паттернов

Интеграции:
• Носимые устройства (фитнес-трекеры)
• Медицинские устройства
• Приложения здоровья
• Календари и планировщики
• Социальные сети

Инфраструктура:
• Docker и Kubernetes
• Cloud hosting (AWS/GCP)
• Базы данных (PostgreSQL, Redis)
• Мониторинг и логирование
• CI/CD pipeline`
      },
      'business-model': {
        title: "Бизнес-модель",
        content: `Источники дохода:

1. Комиссии с маркетплейса:
   • 15-20% с продажи услуг специалистов
   • 10-15% с продажи программ
   • Прогноз: $600K в год 1, $3M в год 3

2. Подписки:
   • Базовый план: бесплатно
   • Премиум: $19.99/месяц (расширенные функции, AI-анализ)
   • Профессионал: $49.99/месяц (для специалистов)
   • Корпоративный: индивидуально
   • Прогноз: $400K в год 1, $2M в год 3

3. Корпоративные программы:
   • Подписки для компаний
   • Кастомизация программ
   • Аналитика для HR
   • Прогноз: $300K в год 1, $1.5M в год 3

4. Городские программы:
   • Лицензирование платформы городам
   • Кастомизация под регион
   • Прогноз: $200K в год 1, $1M в год 3

5. Реклама и партнерства:
   • Нативная реклама
   • Спонсорство челленджей
   • Партнерства с брендами здоровья
   • Прогноз: $150K в год 1, $800K в год 3

6. Токеномика:
   • Продажа токенов пользователям
   • Комиссии с транзакций
   • Прогноз: $200K в год 1, $1.2M в год 3

Общий прогноз доходов:
• Год 1: $1.85M
• Год 2: $5M
• Год 3: $9.5M`
      },
      roadmap: {
        title: "Дорожная карта развития",
        content: `Q1 2025: MVP Launch
• Базовые профили пользователей
• Персональная карта здоровья
• Маркетплейс специалистов (бета)
• Базовое образование
• Цель: 1,000 активных пользователей

Q2 2025: AI и социальная сеть
• AI-анализ данных здоровья
• Социальная сеть здоровья
• Челленджи (бета)
• Расширенное образование
• Цель: 5,000 пользователей

Q3 2025: DAO и токеномика
• DAO запуск
• Токеномика и стейкинг
• Расширенные программы
• Корпоративные функции (бета)
• Цель: 15,000 пользователей

Q4 2025: Масштабирование
• Корпоративные программы
• Городские программы (пилоты)
• Мобильные приложения
• Международное расширение
• Цель: 50,000 пользователей

2026: Глобальное расширение
• Расширение на новые страны
• Партнерства с клиниками
• Интеграции с медицинскими системами
• Расширенная AI функциональность
• Цель: 200,000+ пользователей`
      },
      team: {
        title: "Команда и партнеры",
        content: `Команда разработки:
• Опытные разработчики healthtech решений
• Специалисты по AI и машинному обучению
• Дизайнеры UX/UI для медицинских приложений
• Эксперты по блокчейн и Web3

Консультанты:
• Врачи различных специальностей
• Психологи и психотерапевты
• Тренеры и фитнес-эксперты
• Нутрициологи
• Специалисты по регулированию здравоохранения

Партнерства:
• Фитнес-клубы и студии
• Клиники и медицинские центры
• Корпорации для wellbeing программ
• Города и муниципалитеты
• Образовательные платформы
• Производители носимых устройств

Инвесторы:
• Seed раунд: $55K (завершен)
• Целевой раунд: $287K
• Стратегические партнеры для роста`
      },
      financials: {
        title: "Финансовая модель",
        content: `Текущий статус:
• Инвестиции: $55K из $287K (19% прогресс)
• Статус: Активная разработка MVP

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
• Retention rate: >45% (месяц 1)
• Daily Active Users: >35% от MAU
• Средний доход на пользователя: $37/год
• Lifetime Value: $150+
• Customer Acquisition Cost: <$15

Ключевые показатели:
• Прогресс разработки: 19%
• Активных пользователей: цель 1,000 к Q1 2025
• Специалистов: цель 100 к Q2 2025
• Локаций: цель 50 к Q3 2025
• Корпоративных клиентов: цель 10 к Q4 2025`
      }
    },
    en: {
      overview: {
        title: "NexusVita Project Overview",
        content: `NexusVita is a global human-centric health ecosystem combining physical, psycho-emotional, social and lifestyle health into a single system.

Mission: Create a safe, scientifically-based and ethical space where a person understands and develops their health, learns to build mature relationships with themselves and others, gains access to knowledge, practices, experts and community, turns self-care into long-term value and lifestyle.

Philosophy: Health is an interconnected system including body, emotions, social environment, lifestyle, surroundings, life rhythms, behavior and meaning-making. NexusVita doesn't treat symptoms — it builds a life system.`
      },
      'human-centricity': {
        title: "Human-Centric Approach",
        content: `Human health is determined not only by a trainer, doctor or analysis, but by the entire life context:

Physical Factors:
• Body and its condition
• Physical activity
• Nutrition
• Sleep
• Medical indicators

Psycho-Emotional Factors:
• Emotional state
• Stress and its sources
• Mental health
• Motivation and goals
• Meaning-making

Social Factors:
• Relationships with people
• Social support
• Community and belonging
• Communication
• Love and intimacy

Lifestyle Factors:
• Home and environment
• Work and life rhythms
• Lifestyle organization
• Resource availability
• Behavioral patterns

NexusVita accounts for all these factors in a unified system, creating a holistic picture of human health.`
      },
      architecture: {
        title: "Ecosystem Architecture",
        content: `Platform unites all health participants:

1. Person (User):
   • Personal health profile
   • Personal health map
   • Life rhythms and patterns
   • Goals and motivation
   • Social connections

2. Specialists (30+ professions):
   • Doctors of various specialties
   • Trainers and fitness instructors
   • Psychologists and psychotherapists
   • Nutritionists
   • Rehabilitation specialists
   • Massage therapists
   • Health coaches
   • Breathing experts
   • And many others

3. Locations:
   • Fitness clubs and studios
   • Clinics and medical centers
   • Yoga studios
   • Massage centers
   • Health centers
   • Rehabilitation centers

4. Companies:
   • Corporate wellbeing programs
   • Employee health stimulation
   • Insurance savings
   • Tokens for employees

5. Cities and Municipalities:
   • City health programs
   • District health assessment
   • Activity stimulation
   • Connecting clubs and sections

6. AI Assistant:
   • Health data analysis
   • Personal recommendations
   • Pattern detection
   • Risk predictions
   • Decision support

7. Web3 Infrastructure:
   • Tokens for participation
   • NFT for access and achievements
   • SBT for reputation
   • DAO for governance
   • Smart contracts for transparency`
      },
      'health-profile': {
        title: "Personal Health Profile",
        content: `Unified system for accounting all health aspects:

Physical Health:
• Body indicators (weight, height, BMI, body composition)
• Physical activity
• Nutrition and diet
• Sleep and recovery
• Medical indicators (tests, examinations)
• Chronic conditions
• Medications and supplements

Psycho-Emotional Health:
• Emotional state (mood, stress)
• Mental health
• Energy and motivation
• Goals and meanings
• Life satisfaction
• Anxiety and depression

Social Health:
• Relationships with loved ones
• Social support
• Community participation
• Communication
• Love and intimacy
• Social connections

Lifestyle Health:
• Life organization
• Work and balance
• Home and environment
• Resource availability
• Behavioral patterns
• Life rhythms

AI Analysis:
• Pattern and correlation detection
• Risk predictions
• Personal recommendations
• Change dynamics
• Problem warnings`
      },
      specialists: {
        title: "Specialist System",
        content: `Multi-level specialist system:

Verification:
• Documents and certificates
• Reviews and ratings
• Results statistics
• Web3-SBT reputation
• Transparent practice history

Teamwork:
Specialists unite in teams for comprehensive approach:
• Heart health (cardiologist + trainer + nutritionist)
• Mental health (psychologist + psychotherapist + coach)
• Weight loss (dietitian + trainer + psychologist)
• Sleep (sleep specialist + psychologist + coach)
• Sports training (trainer + doctor + rehabilitation specialist)
• Rehabilitation (doctor + rehabilitation specialist + massage therapist)

Specialist Mini-Site:
• Schedule and availability
• Services and programs
• Prices and packages
• Content and achievements
• Ratings and reviews
• AI assistant for practice management

Service Marketplace:
• Consultations (online and offline)
• Programs (30-90 days)
• Courses and training
• Service packages
• NFT access to exclusive content`
      },
      locations: {
        title: "Locations and Organizations",
        content: `Physical locations in ecosystem:

Location Types:
• Fitness clubs and studios
• Clinics and medical centers
• Yoga studios
• Massage centers
• Health centers
• Rehabilitation centers
• Spa and wellness centers

Location Capabilities:
• Location profile with information
• Class and service schedules
• Service booking
• Group classes
• Visit tracking
• Promotions and subscriptions
• NFT access
• Statistics and analytics
• Specialist audit

Corporate Clients:
Companies can:
• Buy tokens for employees
• Issue tokens for activity
• Stimulate wellbeing
• Save on insurance
• Create health programs
• Track employee health metrics

Government Programs:
Cities can:
• Conduct health challenges
• Assess district health
• Stimulate activities
• Connect clubs and sections
• Work with teenagers and retirees
• Create prevention programs`
      },
      social: {
        title: "Health Social Network",
        content: `Community as key to health:

Social Feed:
• Progress and achievement posts
• Questions and answers
• Tips and experience
• Training routes
• Recipes and nutrition
• Motivational stories

Support and Mentoring:
• Experienced help beginners
• Pairs and mini-groups form
• Goal groups:
  - Weight loss
  - Stress management
  - Marathon preparation
  - Heart health
  - Mental health

Community as Resource:
Research shows social support increases adherence to healthy lifestyle by 40-60%.

Community Functions:
• Interest groups
• Challenges and competitions
• Meetings and events
• Experience sharing
• Motivation and support
• Shared goals`
      },
      tokenomics: {
        title: "NexusVita Tokenomics",
        content: `NexusVita token for ecosystem participation:

Token Functions:
• Payment for specialist services
• Premium feature subscriptions
• Activity cashback
• Partner discounts
• Challenge participation
• Referral program
• Achievement rewards
• DAO voting

Earn Models (token earning):
• Move-to-earn: rewards for physical activity
• Engage-to-earn: community participation and helping others
• Challenge-to-earn: completing challenges
• Help-to-earn: helping other participants
• Learn-to-earn: learning and development
• Complete-to-earn: program completion

Staking:
• DAO voting participation
• Premium feature access
• Increased rewards
• Research participation
• Priority support

Token Distribution:
• 40% — to community (rewards, staking)
• 25% — to team and partners (4-year vesting)
• 20% — to investors (funding rounds)
• 10% — reserve and development
• 5% — liquidity and marketing`
      },
      ai: {
        title: "Health AI Assistant",
        content: `Personal AI assistant for analysis and recommendations:

Data Analysis:
• Health dynamics across all aspects
• Behavior pattern detection
• Factor correlations
• Health risk predictions
• Specialist recommendations

Personal Recommendations:
• Based on user data
• Life context consideration
• Adaptation to life rhythms
• Goal and motivation consideration
• Scientifically-based advice

AI Functions:
• Cause analysis, not symptoms
• Interconnection detection
• Risk warnings
• Action recommendations
• Decision support
• Content personalization

Human-Centric AI:
• Trained on healthcare data
• Lifestyle context consideration
• Ethical and safe
• Transparent in recommendations
• Supportive, not pressuring`
      },
      challenges: {
        title: "Challenges and Programs",
        content: `Motivation through challenges and programs:

Challenge Types:
• City — entire city participation
• Corporate — for company employees
• Thematic — on specific topics (sleep, nutrition, stress)
• Family — for families
• Professional — for specialists

30-90 Day Programs:
Comprehensive programs from specialists:
• Sleep Program (30 days)
• Nutrition Program (60 days)
• Training Program (90 days)
• Stress Reduction Program (30 days)
• Rehabilitation Program (60-90 days)
• Endurance Program (90 days)

Program Structure:
• Step-by-step action plan
• Daily tasks
• Progress tracking
• Specialist support
• Participant community
• Completion rewards

Video Calls and Online Classes:
• Video consultations with specialists
• Online group classes
• Video workouts
• Webinars and masterclasses
• Digital clinic and fitness`
      },
      technology: {
        title: "Technology Stack",
        content: `Frontend:
• Next.js 14 with TypeScript
• React for UI components
• Tailwind CSS for styling
• Framer Motion for animations
• PWA for mobile access

Backend:
• Node.js with TypeScript
• Microservices architecture
• REST and GraphQL API
• WebSocket for real-time
• Medical system integrations

Blockchain:
• Multi-blockchain support (Ethereum, Polygon, BSC)
• Web3 integration
• Smart contracts for DAO
• NFT for access and achievements
• SBT for reputation

AI and ML:
• OpenAI API for natural language processing
• Machine learning for data analysis
• Predictive models
• Recommendation personalization
• Pattern detection

Integrations:
• Wearable devices (fitness trackers)
• Medical devices
• Health applications
• Calendars and planners
• Social networks

Infrastructure:
• Docker and Kubernetes
• Cloud hosting (AWS/GCP)
• Databases (PostgreSQL, Redis)
• Monitoring and logging
• CI/CD pipeline`
      },
      'business-model': {
        title: "Business Model",
        content: `Revenue Sources:

1. Marketplace Commissions:
   • 15-20% from specialist service sales
   • 10-15% from program sales
   • Forecast: $600K year 1, $3M year 3

2. Subscriptions:
   • Basic plan: free
   • Premium: $19.99/month (extended features, AI analysis)
   • Professional: $49.99/month (for specialists)
   • Corporate: custom
   • Forecast: $400K year 1, $2M year 3

3. Corporate Programs:
   • Company subscriptions
   • Program customization
   • HR analytics
   • Forecast: $300K year 1, $1.5M year 3

4. City Programs:
   • Platform licensing to cities
   • Regional customization
   • Forecast: $200K year 1, $1M year 3

5. Advertising and Partnerships:
   • Native advertising
   • Challenge sponsorship
   • Health brand partnerships
   • Forecast: $150K year 1, $800K year 3

6. Tokenomics:
   • Token sales to users
   • Transaction fees
   • Forecast: $200K year 1, $1.2M year 3

Total Revenue Forecast:
• Year 1: $1.85M
• Year 2: $5M
• Year 3: $9.5M`
      },
      roadmap: {
        title: "Development Roadmap",
        content: `Q1 2025: MVP Launch
• Basic user profiles
• Personal health map
• Specialist marketplace (beta)
• Basic education
• Goal: 1,000 active users

Q2 2025: AI and Social Network
• AI health data analysis
• Health social network
• Challenges (beta)
• Extended education
• Goal: 5,000 users

Q3 2025: DAO and Tokenomics
• DAO launch
• Tokenomics and staking
• Extended programs
• Corporate features (beta)
• Goal: 15,000 users

Q4 2025: Scaling
• Corporate programs
• City programs (pilots)
• Mobile applications
• International expansion
• Goal: 50,000 users

2026: Global Expansion
• Expansion to new countries
• Clinic partnerships
• Medical system integrations
• Extended AI functionality
• Goal: 200,000+ users`
      },
      team: {
        title: "Team and Partners",
        content: `Development Team:
• Experienced healthtech solution developers
• AI and machine learning specialists
• UX/UI designers for medical applications
• Blockchain and Web3 experts

Consultants:
• Doctors of various specialties
• Psychologists and psychotherapists
• Trainers and fitness experts
• Nutritionists
• Healthcare regulation specialists

Partnerships:
• Fitness clubs and studios
• Clinics and medical centers
• Corporations for wellbeing programs
• Cities and municipalities
• Educational platforms
• Wearable device manufacturers

Investors:
• Seed round: $55K (completed)
• Target round: $287K
• Strategic partners for growth`
      },
      financials: {
        title: "Financial Model",
        content: `Current Status:
• Investment: $55K out of $287K (19% progress)
• Status: Active MVP development

Fund Usage:
• 35% — Platform development
• 25% — Team and operating expenses
• 20% — Marketing and user acquisition
• 10% — Partnerships and integrations
• 10% — Reserve and unforeseen expenses

User Growth Forecast:
• Month 1-3: 1,000 users
• Month 4-6: 5,000 users
• Month 7-9: 15,000 users
• Month 10-12: 50,000 users

Success Metrics:
• Retention rate: >45% (month 1)
• Daily Active Users: >35% of MAU
• Average revenue per user: $37/year
• Lifetime Value: $150+
• Customer Acquisition Cost: <$15

Key Indicators:
• Development progress: 19%
• Active users: goal 1,000 by Q1 2025
• Specialists: goal 100 by Q2 2025
• Locations: goal 50 by Q3 2025
• Corporate clients: goal 10 by Q4 2025`
      }
    }
  };
  
  // Для остальных языков используем английский как fallback, но можно добавить полные переводы позже
  // Для компактности, я добавлю базовые переводы для основных языков
  const langMap: Record<string, any> = {
    ar: translations.en, // Временно используем английский, можно добавить полные переводы позже
    es: translations.en,
    pl: translations.en,
    fr: translations.en,
    de: translations.en
  };
  
  return translations[language] || langMap[language] || translations['en'];
};

// Функция для получения whitepaper sections с переводами
export const getWhitepaperSections = (language: string = 'ru') => {
  const t = getWhitepaperTranslations(language);
  return [
  {
    id: "overview",
    title: t.overview.title,
    content: t.overview.content
  },
  {
    id: "human-centricity",
    title: t['human-centricity'].title,
    content: t['human-centricity'].content
  },
  {
    id: "architecture",
    title: t.architecture.title,
    content: t.architecture.content
  },
  {
    id: "health-profile",
    title: t['health-profile'].title,
    content: t['health-profile'].content
  },
  {
    id: "specialists",
    title: t.specialists.title,
    content: t.specialists.content
  },
  {
    id: "locations",
    title: t.locations.title,
    content: t.locations.content
  },
  {
    id: "social",
    title: t.social.title,
    content: t.social.content
  },
  {
    id: "tokenomics",
    title: t.tokenomics.title,
    content: t.tokenomics.content
  },
  {
    id: "ai",
    title: t.ai.title,
    content: t.ai.content
  },
  {
    id: "challenges",
    title: t.challenges.title,
    content: t.challenges.content
  },
  {
    id: "technology",
    title: t.technology.title,
    content: t.technology.content
  },
  {
    id: "business-model",
    title: t['business-model'].title,
    content: t['business-model'].content
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

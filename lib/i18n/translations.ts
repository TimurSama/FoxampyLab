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
    subtitle: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    tags: string;
    ctaButton1: string;
    ctaButton2: string;
    ctaButton3: string;
    nexus: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    solutions: {
      title: string;
      subtitle: string;
      description: string;
      services: Array<{
        id: string;
        title: string;
        subtitle: string;
        description: string;
        features: string[];
      }>;
    };
    gallery: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
    };
    ventures: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
      clickForDetails: string;
      viewInHub: string;
      projects: Array<{
        name: string;
        status: string;
        stack: string[];
        stage: string;
      }>;
    };
    intelligence: {
      title: string;
      subtitle: string;
      description: string;
    };
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
  presentation: {
    back: string;
    introduction: string;
    whitepaper: string;
    next: string;
    prev: string;
    investmentPresentation: string;
    architecture: string;
    totalBudget: string;
    invested: string;
    remaining: string;
    budgetAllocation: string;
    allocated: string;
    spent: string;
    breakdown: string;
    ofTotal: string;
    civilizationProtocol: {
      slides: {
        slide1: { title: string; subtitle: string; content: string };
        slide2: { title: string; content: string[] };
        slide3: { title: string; content: string[] };
        slide4: { title: string; content: string[] };
        slide5: { title: string; content: string[] };
        slide6: { title: string; content: string[] };
        slide7: { title: string; content: string[] };
        slide8: { title: string; content: string[] };
      };
      roadmap: {
        item1: { period: string; title: string; description: string };
        item2: { period: string; title: string; description: string };
        item3: { period: string; title: string; description: string };
        item4: { period: string; title: string; description: string };
      };
    };
  };
  ecosystemsPage: {
    tagline: string;
    title: string;
    description: string;
    ctaButton: string;
    servicesTitle: string;
    service1: { title: string; description: string; features: string[] };
    service2: { title: string; description: string; features: string[] };
    service3: { title: string; description: string; features: string[] };
    service4: { title: string; description: string; features: string[] };
    processTitle: string;
    step1: { step: string; title: string; desc: string };
    step2: { step: string; title: string; desc: string };
    step3: { step: string; title: string; desc: string };
    step4: { step: string; title: string; desc: string };
    ctaTitle: string;
    ctaDescription: string;
    ctaButton2: string;
  };
  webAppPage: {
    tagline: string;
    title: string;
    titleHighlight: string;
    description: string;
    ctaButton: string;
    servicesTitle: string;
    service1: { title: string; description: string; features: string[] };
    service2: { title: string; description: string; features: string[] };
    service3: { title: string; description: string; features: string[] };
    service4: { title: string; description: string; features: string[] };
    techTitle: string;
    tech1: { name: string; desc: string };
    tech2: { name: string; desc: string };
    tech3: { name: string; desc: string };
    tech4: { name: string; desc: string };
    processTitle: string;
    step1: { step: string; title: string; desc: string };
    step2: { step: string; title: string; desc: string };
    step3: { step: string; title: string; desc: string };
    step4: { step: string; title: string; desc: string };
    ctaTitle: string;
    ctaDescription: string;
    ctaButton2: string;
  };
  videoPage: {
    tagline: string;
    title: string;
    titleHighlight: string;
    description: string;
    ctaButton: string;
    servicesTitle: string;
    service1: { title: string; description: string; features: string[] };
    service2: { title: string; description: string; features: string[] };
    service3: { title: string; description: string; features: string[] };
    service4: { title: string; description: string; features: string[] };
    processTitle: string;
    step1: { step: string; title: string; desc: string };
    step2: { step: string; title: string; desc: string };
    step3: { step: string; title: string; desc: string };
    step4: { step: string; title: string; desc: string };
    ctaTitle: string;
    ctaDescription: string;
    ctaButton2: string;
  };
  marketingPage: {
    tagline: string;
    title: string;
    titleHighlight: string;
    description: string;
    ctaButton: string;
    servicesTitle: string;
    service1: { title: string; description: string; features: string[] };
    service2: { title: string; description: string; features: string[] };
    service3: { title: string; description: string; features: string[] };
    service4: { title: string; description: string; features: string[] };
    processTitle: string;
    step1: { step: string; title: string; desc: string };
    step2: { step: string; title: string; desc: string };
    step3: { step: string; title: string; desc: string };
    step4: { step: string; title: string; desc: string };
    ctaTitle: string;
    ctaDescription: string;
    ctaButton2: string;
  };
  designPage: {
    tagline: string;
    title: string;
    titleHighlight: string;
    description: string;
    ctaButton: string;
    servicesTitle: string;
    service1: { title: string; description: string; features: string[] };
    service2: { title: string; description: string; features: string[] };
    service3: { title: string; description: string; features: string[] };
    service4: { title: string; description: string; features: string[] };
    processTitle: string;
    step1: { step: string; title: string; desc: string };
    step2: { step: string; title: string; desc: string };
    step3: { step: string; title: string; desc: string };
    step4: { step: string; title: string; desc: string };
    ctaTitle: string;
    ctaDescription: string;
    ctaButton2: string;
  };
  businessPage: {
    tagline: string;
    title: string;
    titleHighlight: string;
    description: string;
    ctaButton: string;
    servicesTitle: string;
    service1: { title: string; description: string; features: string[] };
    service2: { title: string; description: string; features: string[] };
    service3: { title: string; description: string; features: string[] };
    service4: { title: string; description: string; features: string[] };
    processTitle: string;
    step1: { step: string; title: string; desc: string };
    step2: { step: string; title: string; desc: string };
    step3: { step: string; title: string; desc: string };
    step4: { step: string; title: string; desc: string };
    ctaTitle: string;
    ctaDescription: string;
    ctaButton2: string;
  };
  background: {
    title: string;
    description: string;
    variant1: { name: string; description: string };
    variant2: { name: string; description: string };
    variant3: { name: string; description: string };
    variant4: { name: string; description: string };
    variant5: { name: string; description: string };
    variant6: { name: string; description: string };
    variant7: { name: string; description: string };
    variant8: { name: string; description: string };
  };
  gallery: {
    tagline: string;
    title: string;
    description: string;
    ctaButton: string;
    apps: {
      accent: string;
      title: string;
      description: string;
    };
    fashion: {
      accent: string;
      title: string;
      description: string;
    };
    architecture: {
      accent: string;
      title: string;
      description: string;
    };
    video: {
      accent: string;
      title: string;
      description: string;
    };
    research: {
      accent: string;
      title: string;
      description: string;
    };
  };
  visual: {
    title: string;
    description: string;
    filterAll: string;
    filterJpg: string;
    filterPng: string;
    download: string;
    close: string;
    next: string;
    prev: string;
    zoomIn: string;
    zoomOut: string;
  };
  projects: {
    civilizationProtocol: {
      heroTitle: string;
      heroDescription: string;
      presentationLink: string;
      blockTitle: string;
      clickForDetails: string;
      platformArchitecture: { title: string; description: string };
      tokenomics: { title: string; description: string };
      daoGovernance: { title: string; description: string };
      iotAiMonitoring: { title: string; description: string };
      waterTokenization: { title: string; description: string };
      globalMarketplace: { title: string; description: string };
    };
  };
}

// English home translations (used as fallback for other languages)
const enHomeTranslations = {
  tagline: 'MULTIDISCIPLINARY LAB // IT × DESIGN × ARCHITECTURE × CINEMA × R&D',
  title: 'Interdisciplinary Solutions Laboratory',
  subtitle: 'Synthesis of technology, design and science for creating unique products',
  titleHighlight: 'DEVELOPMENTS',
  titleEnd: 'INNOVATIONS',
  description: 'We combine expertise in IT, architecture, design, cinematography and scientific research to solve complex challenges. Each project is a multi-layered approach where technologies intertwine with creativity, and engineering solutions are complemented by artistic vision.',
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
  footer: '© 2025 Foxampy LAB. All rights reserved.',
  vacancies: 'VACANCIES',
  learnMore: 'Learn More',
  scrollToExplore: 'Scroll to Explore',
  synergy: 'SYNERGY',
  ctaButton1: 'Order Project',
  ctaButton2: 'Invest in HUB',
  ctaButton3: 'Gallery of Artifacts',
  nexus: {
    title: 'THE NEXUS',
    subtitle: 'FOXAMPY LAB: MULTIDISCIPLINARY SYNTHESIS',
    description: 'Designing the future at the intersection of IT architecture, parametric spaces, fashion and cinematography. Creating products that feel like a single organism.',
    cta: 'Enter the Core',
  },
  solutions: {
    title: 'SYNERGETIC SOLUTIONS',
    subtitle: 'Multidisciplinary Synthesis',
    description: 'We don\'t just combine different fields of knowledge — we create unique solutions through deep integration of IT, architecture, design, cinematography and scientific research. Each task is considered from multiple perspectives, allowing us to find unconventional approaches and create products that cannot be developed within a single discipline. Our multidisciplinary multi-layered approach is a tool for finding unique and best solutions for each specific task.',
    services: [
      {
        id: 'business',
        title: 'STRATEGIC GENESIS & VENTURE LOGIC',
        subtitle: 'Business Strategic Architecture',
        description: 'Designing business foundations. We translate the chaos of ideas into strict documentary form: from creating Vision & Mission to detailed White Papers and investment memorandums. Development of tokenomics and economic models resistant to market entropy.',
        features: [
          'Vision & Mission development',
          'White Papers and Litepapers',
          'Investment memorandums',
          'Tokenomics and economic models',
          'Business planning',
          'Strategic consulting',
        ],
      },
      {
        id: 'it',
        title: 'DIGITAL CORE & ECOSYSTEM DEVELOPMENT',
        subtitle: 'IT Ecosystem Engineering',
        description: 'Creating the technological DNA of a product. Development of concepts and implementation of complex IT ecosystems: scalable platforms, AI integrations and blockchain solutions. We build not just code, but architecture ready for infinite transformation.',
        features: [
          'Ecosystem architecture',
          'Blockchain development',
          'AI/ML integrations',
          'Scalable platforms',
          'Microservice architecture',
          'API and integrations',
        ],
      },
      {
        id: 'branding',
        title: 'COGNITIVE BRANDING & VISUAL SYSTEMS',
        subtitle: 'Identity & Sensory Branding',
        description: 'Synthesis of perception and aesthetics. We create brands as living organisms with a unique identity code. Deep design analysis, development of semantic fields and marketing strategies that resonate at the subconscious level.',
        features: [
          'Brand strategy',
          'Visual identity',
          'Design systems',
          'Marketing strategies',
          'Content strategy',
          'Digital marketing',
        ],
      },
      {
        id: 'spatial',
        title: 'PARAMETRIC FASHION & ARCHITECTURE',
        subtitle: 'Spatial Form & Wearable Art',
        description: 'Erasing boundaries between body and space. We combine methods of parametric building design with avant-garde fashion design. Creating digital twins, 3D prototyping and conceptual solutions for physical worlds.',
        features: [
          'Parametric design',
          'Architectural design',
          'Fashion design',
          '3D prototyping',
          'Digital twins',
          'Conceptual solutions',
        ],
      },
      {
        id: 'cinema',
        title: 'TEMPORAL NARRATIVE & VISUAL FX',
        subtitle: 'Cinematic Synthesis & Motion',
        description: 'Transmitting meanings through visual experience. Production of the future: from conceptual storytelling to complex CGI and video art. We create visual worlds that immerse the viewer in 4D space and dictate new aesthetic norms.',
        features: [
          'Video production',
          'CGI and visual effects',
          'Motion design',
          'Conceptual storytelling',
          '3D animation',
          'Post-production',
        ],
      },
      {
        id: 'rd',
        title: 'APPLIED PHYSICS & ENGINEERING RESEARCH',
        subtitle: 'Frontiers of R&D',
        description: 'Laboratory of fundamental innovations. Deep research at the intersection of engineering and applied science. Development of patentable technologies, prototyping of new materials and search for non-standard engineering solutions for global challenges.',
        features: [
          'Scientific research',
          'Engineering development',
          'Prototyping',
          'Technology patenting',
          'Applied physics',
          'Materials science',
        ],
      },
    ],
  },
  gallery: {
    title: 'LIVING GALLERY',
    subtitle: 'Artifacts and Prototypes',
    description: 'Gallery of visual solutions: applications, digital fashion, architectural forms, video art, R&D prototypes. Each work is a portal to a future environment.',
    cta: 'View Gallery',
  },
  ventures: {
    title: 'VENTURE TERMINAL',
    subtitle: 'Investment Opportunities',
    description: 'Architectural prototypes of the future: decentralized ecosystems on blockchain infrastructure, artificial intelligence platforms with neural network cores, social graphs and fintech layers as kinetic sculptures. Each project is a morphogenesis of form and idea, a vector of evolution of the technological landscape.',
    cta: 'Open HUB',
    clickForDetails: 'CLICK FOR DETAILS →',
    viewInHub: 'View in HUB →',
    projects: [
      { name: 'Civilization Protocol', status: 'Cyber-physical water ecosystem', stack: ['Blockchain', 'IoT', 'AI'], stage: 'Active vector' },
      { name: 'TradePlus', status: 'Smart trading platform', stack: ['Fintech', 'Quant', 'UX'], stage: 'Market movement' },
      { name: 'Dogymorbios', status: 'Social network for dogs', stack: ['Geo', 'Community', 'Mobile'], stage: 'Pilot walks' },
      { name: 'NexusVita', status: 'Unified health map', stack: ['API', 'HL7/FHIR', 'AI'], stage: 'Data collection' },
    ],
  },
  intelligence: {
    title: 'DISTRIBUTED INTELLIGENCE',
    subtitle: 'Distributed Intelligence',
    description: 'We don\'t show faces — we broadcast competencies. Architects of world bureaus, blockchain engineers and creative directors in a decentralized execution network. Specialists and teams from around the world are ready to take on the implementation of your ideas and orders, and continue to dream and create their own concepts, projects, products and solutions. Each network participant is a node in a distributed intelligence system where competencies intertwine and reinforce each other.',
  },
};

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
    presentation: {
      back: 'Back',
      introduction: 'Introduction',
      whitepaper: 'Whitepaper',
      next: 'Next',
      prev: 'Previous',
      investmentPresentation: 'Investment Presentation',
      architecture: 'Architecture',
      totalBudget: 'Total Budget',
      invested: 'Invested',
      remaining: 'Remaining',
      budgetAllocation: 'Budget Allocation',
      allocated: 'Allocated',
      spent: 'Spent',
      breakdown: 'Breakdown',
      ofTotal: 'of total',
      civilizationProtocol: {
        slides: {
          slide1: { title: 'Civilization Protocol', subtitle: 'Decentralized Water Management', content: 'Introduction to the platform' },
          slide2: { title: 'Platform Architecture', content: ['12-level system', 'IoT to blockchain', 'Scalable infrastructure'] },
          slide3: { title: 'Platform Objects', content: ['Water resources', 'Infrastructure', 'IoT devices'] },
          slide4: { title: 'Platform Subjects', content: ['Resource owners', 'Investors', 'Developers', 'Validators'] },
          slide5: { title: 'Ecosystem Products', content: ['VODeco Platform', 'VOD tokens', 'Data marketplace'] },
          slide6: { title: 'Ecosystem Projects', content: ['Water Management', 'Global Network', 'DAO Governance'] },
          slide7: { title: 'Infrastructure', content: ['Multi-chain blockchain', 'Cloud services', 'Microservices'] },
          slide8: { title: 'Roadmap', content: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'] },
        },
        roadmap: {
          item1: { period: 'Q1 2025', title: 'MVP Launch', description: 'Core platform features' },
          item2: { period: 'Q2 2025', title: 'Expansion', description: 'Additional features and scaling' },
          item3: { period: 'Q3 2025', title: 'Global Network', description: 'International expansion' },
          item4: { period: 'Q4 2025', title: 'DAO Launch', description: 'Decentralized governance' },
        },
      },
    },
    ecosystemsPage: {
      tagline: 'ECOSYSTEMS',
      title: 'ECOSYSTEMS',
      description: 'Creating comprehensive ecosystems and platforms: from strategic planning and market research to architecture development, implementation and scaling.',
      ctaButton: 'DISCUSS PROJECT',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Research and Strategy',
        description: 'Comprehensive research of market, users and technological capabilities for building ecosystem development strategy.',
        features: ['Market research', 'User analysis', 'Technology audit', 'Strategic planning'],
      },
      service2: {
        title: 'Solution Architecture',
        description: 'Designing scalable ecosystem architecture considering integrations, security and performance.',
        features: ['System architecture', 'Microservices', 'API design', 'Integrations'],
      },
      service3: {
        title: 'Platform Development',
        description: 'Implementation of comprehensive platform with multiple services, modules and integrations.',
        features: ['Service development', 'Integrations', 'Admin panels', 'Analytics'],
      },
      service4: {
        title: 'Scaling',
        description: 'Supporting ecosystem growth: performance optimization, adding new features and services.',
        features: ['Optimization', 'Scaling', 'New features', 'Support'],
      },
      processTitle: 'WORK PROCESS',
      step1: { step: '01', title: 'Research', desc: 'Deep market and user analysis' },
      step2: { step: '02', title: 'Architecture', desc: 'System and integration design' },
      step3: { step: '03', title: 'Development', desc: 'Platform and services implementation' },
      step4: { step: '04', title: 'Launch', desc: 'Deployment, scaling and support' },
      ctaTitle: 'READY TO START?',
      ctaDescription: 'Let\'s discuss your project and propose an optimal solution.',
      ctaButton2: 'CONTACT',
    },
    webAppPage: {
      tagline: 'WEB & APP DEVELOPMENT',
      title: 'WEBSITES AND',
      titleHighlight: 'APPLICATIONS',
      description: 'Development of websites, web applications, mobile applications. Modern technology stack: React, Next.js, React Native, Node.js.',
      ctaButton: 'DISCUSS PROJECT',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Websites',
        description: 'Development of modern websites with focus on performance, SEO and user experience.',
        features: ['Corporate websites', 'Landing pages', 'Portfolios', 'Blogs and CMS'],
      },
      service2: {
        title: 'Web Applications',
        description: 'Creating high-load web applications using modern technologies and best practices.',
        features: ['SPA / SSR / SSG', 'PWA applications', 'Dashboards', 'Admin panels'],
      },
      service3: {
        title: 'Mobile Applications',
        description: 'Development of native and cross-platform mobile applications for iOS and Android.',
        features: ['iOS applications', 'Android applications', 'React Native', 'Flutter'],
      },
      service4: {
        title: 'API and Integrations',
        description: 'Development of RESTful and GraphQL API, integration with external services and systems.',
        features: ['REST API', 'GraphQL', 'Microservices', 'Integrations'],
      },
      techTitle: 'TECHNOLOGIES',
      tech1: { name: 'React / Next.js', desc: 'Modern frontend' },
      tech2: { name: 'Node.js', desc: 'Server-side development' },
      tech3: { name: 'TypeScript', desc: 'Type safety' },
      tech4: { name: 'PostgreSQL / MongoDB', desc: 'Databases' },
      processTitle: 'WORK PROCESS',
      step1: { step: '01', title: 'Planning', desc: 'Requirements analysis and architecture design' },
      step2: { step: '02', title: 'Development', desc: 'Implementation of functionality and interfaces' },
      step3: { step: '03', title: 'Testing', desc: 'QA, performance optimization' },
      step4: { step: '04', title: 'Launch', desc: 'Deployment, monitoring and support' },
      ctaTitle: 'READY TO START?',
      ctaDescription: 'Let\'s discuss your project and propose an optimal solution.',
      ctaButton2: 'CONTACT',
    },
    videoPage: {
      tagline: 'VIDEO & FILM',
      title: 'VIDEO AND',
      titleHighlight: 'FILM',
      description: 'Video production, film, motion design, visual communications. Promo videos, explainers, 3D visualizations. For presentations, landing pages and social media.',
      ctaButton: 'DISCUSS PROJECT',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Video Production',
        description: 'Full cycle of video creation: from concept and script to shooting, editing and post-production.',
        features: ['Script and concept', 'Shooting', 'Editing', 'Color grading'],
      },
      service2: {
        title: 'Film',
        description: 'Creating short and feature films, documentary projects and video content.',
        features: ['Short films', 'Documentary', 'Video art', 'Experimental film'],
      },
      service3: {
        title: 'Motion Design',
        description: 'Creating animated graphics, titles, infographics and visual effects for video.',
        features: ['Animation', 'Titles and graphics', 'Infographics', 'Visual effects'],
      },
      service4: {
        title: 'Visual Communications',
        description: 'Development of visual solutions for presentations, landing pages, social media and advertising.',
        features: ['Presentations', 'Commercial videos', 'Explainer videos', 'Social media'],
      },
      processTitle: 'WORK PROCESS',
      step1: { step: '01', title: 'Concept', desc: 'Idea and script development' },
      step2: { step: '02', title: 'Production', desc: 'Shooting and production' },
      step3: { step: '03', title: 'Post-Production', desc: 'Editing, color grading, sound' },
      step4: { step: '04', title: 'Delivery', desc: 'Final version and adaptation' },
      ctaTitle: 'READY TO START?',
      ctaDescription: 'Let\'s discuss your project and propose an optimal solution.',
      ctaButton2: 'CONTACT',
    },
    marketingPage: {
      tagline: 'MARKETING & BRANDING',
      title: 'MARKETING AND',
      titleHighlight: 'BRANDING',
      description: 'Marketing, promotion, branding, community building. Data-driven approach, content strategy, performance marketing. Specialization in crypto marketing and Web3 PR.',
      ctaButton: 'DISCUSS PROJECT',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Content Strategy',
        description: 'Development of comprehensive content strategy for attracting and retaining target audience.',
        features: ['Content strategy', 'Content plan', 'Copywriting', 'Editing'],
      },
      service2: {
        title: 'SMM and Social Media',
        description: 'Managing social media presence, creating communities and engaging with audience.',
        features: ['SMM strategy', 'Social media content', 'Community management', 'Influencer marketing'],
      },
      service3: {
        title: 'Performance Marketing',
        description: 'Data-driven approach to marketing with focus on measurable results and conversion optimization.',
        features: ['Advertising', 'Analytics', 'A/B testing', 'Conversion optimization'],
      },
      service4: {
        title: 'Crypto Marketing and Web3 PR',
        description: 'Specialized marketing for blockchain projects, cryptocurrencies and Web3 ecosystems.',
        features: ['Web3 PR', 'Crypto marketing', 'Community building', 'Token marketing'],
      },
      processTitle: 'WORK PROCESS',
      step1: { step: '01', title: 'Analysis', desc: 'Audience and competitor research' },
      step2: { step: '02', title: 'Strategy', desc: 'Marketing strategy development' },
      step3: { step: '03', title: 'Implementation', desc: 'Campaign launch and content creation' },
      step4: { step: '04', title: 'Optimization', desc: 'Results analysis and improvement' },
      ctaTitle: 'READY TO START?',
      ctaDescription: 'Let\'s discuss your project and propose an optimal solution.',
      ctaButton2: 'CONTACT',
    },
    designPage: {
      tagline: 'DESIGN & ARCHITECTURE',
      title: 'DESIGN AND',
      titleHighlight: 'ARCHITECTURE',
      description: 'Solution architecture, interface design, visual identity, branding. From concept to implementation of visual language and design systems.',
      ctaButton: 'DISCUSS PROJECT',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Solution Architecture',
        description: 'Designing digital solution architecture considering scalability, performance and user experience.',
        features: ['System architecture', 'UX architecture', 'Information architecture', 'Technical design'],
      },
      service2: {
        title: 'Interface Design',
        description: 'Creating interfaces that convert and provide excellent user experience across all devices.',
        features: ['UX research', 'UI design', 'Prototyping', 'Design systems'],
      },
      service3: {
        title: 'Visual Identity',
        description: 'Development of visual identity and branding that reflects company values and is memorable to audience.',
        features: ['Branding', 'Identity', 'Guidelines', 'Media adaptation'],
      },
      service4: {
        title: 'Branding',
        description: 'Creating comprehensive brand system from strategy to visual embodiment and communications.',
        features: ['Brand strategy', 'Positioning', 'Visual language', 'Brandbook'],
      },
      processTitle: 'WORK PROCESS',
      step1: { step: '01', title: 'Research', desc: 'Audience, competitor and context analysis' },
      step2: { step: '02', title: 'Concept', desc: 'Concept and visual direction development' },
      step3: { step: '03', title: 'Design', desc: 'Design system and interface creation' },
      step4: { step: '04', title: 'Implementation', desc: 'Support during development and testing' },
      ctaTitle: 'READY TO START?',
      ctaDescription: 'Let\'s discuss your project and propose an optimal solution.',
      ctaButton2: 'CONTACT',
    },
    businessPage: {
      tagline: 'BUSINESS & STRATEGY',
      title: 'BUSINESS AND',
      titleHighlight: 'STRATEGY',
      description: 'Business concept development, strategic planning, business modeling. From market research and competitor analysis to building development strategy and scaling.',
      ctaButton: 'DISCUSS PROJECT',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Business Concept Development',
        description: 'Creating comprehensive business concepts based on deep analysis of market, competitive environment and user needs.',
        features: ['Market and competitor analysis', 'User research', 'Concept development', 'Idea validation'],
      },
      service2: {
        title: 'Strategic Planning',
        description: 'Building long-term business development strategy considering market trends, technological capabilities and business goals.',
        features: ['Strategic analysis', 'Goal definition', 'Stage planning', 'Development roadmap'],
      },
      service3: {
        title: 'Business Modeling',
        description: 'Designing sustainable business models with focus on scalability, monetization and value creation.',
        features: ['Monetization model', 'Unit economics', 'Growth scenarios', 'Financial planning'],
      },
      service4: {
        title: 'Analysis and Research',
        description: 'Comprehensive analysis of market, competitors, users and technological capabilities for informed decision-making.',
        features: ['Market analysis', 'Competitive analysis', 'User research', 'Technology audit'],
      },
      processTitle: 'WORK PROCESS',
      step1: { step: '01', title: 'Research', desc: 'Deep market, competitor and user analysis' },
      step2: { step: '02', title: 'Concept', desc: 'Business concept and model development' },
      step3: { step: '03', title: 'Strategy', desc: 'Building development strategy and action plan' },
      step4: { step: '04', title: 'Implementation', desc: 'Support during implementation and scaling' },
      ctaTitle: 'READY TO START?',
      ctaDescription: 'Let\'s discuss your project and propose an optimal solution.',
      ctaButton2: 'CONTACT',
    },
    background: {
      title: 'BACKGROUND SELECTION',
      description: 'Select an animated ink fluid background variant',
      variant1: { name: 'Variant 1', description: 'Slow smooth waves' },
      variant2: { name: 'Variant 2', description: 'Medium speed, pronounced waves' },
      variant3: { name: 'Variant 3', description: 'Thick heavy waves' },
      variant4: { name: 'Variant 4', description: 'Small frequent waves' },
      variant5: { name: 'Variant 5', description: 'Large slow waves' },
      variant6: { name: 'Variant 6', description: 'Fast flows' },
      variant7: { name: 'Variant 7', description: 'Waves with strong highlights' },
      variant8: { name: 'Variant 8', description: 'Complex multi-layer waves' },
    },
    gallery: {
      tagline: 'LIVING GALLERY',
      title: 'Showcase of Visual and Technical Solutions',
      description: 'Artifacts will be here: interfaces, textures, forms, videos and prototypes. While materials are being prepared — we leave the page architecture and slots for each discipline.',
      ctaButton: 'Request Case Showcase',
      apps: {
        accent: 'Interactive Prototypes',
        title: 'Applications and Ecosystems',
        description: 'UI/UX cinematography: live prototypes, complex dashboards, 3D interactions. Show the depth of product logic and engineering architecture without numbers — through interface language.',
      },
      fashion: {
        accent: 'Parametric Forms',
        title: 'Digital Fashion',
        description: 'Collections as code: 3D fabric sculptures, avatar wardrobes, textures, movement simulations. Transition from concept to production pattern.',
      },
      architecture: {
        accent: 'Parametric Spaces',
        title: 'Architecture and Environments',
        description: 'Facade morphology, algorithm-interiors, light scenarios. Virtual twins and physical installations with code rules of form.',
      },
      video: {
        accent: 'Future Cinematography',
        title: 'Video / CGI / Motion',
        description: 'CGI, motion graphics, product films, cinemagraphs. Narratives that assemble the product into a tangible story.',
      },
      research: {
        accent: 'Scientific Prototypes',
        title: 'R&D / Laboratory',
        description: 'New materials, interactive sensors, blockchain or AI probes. Pure experiment: diagrams, 3D, short demos.',
      },
    },
    visual: {
      title: 'Visual References',
      description: 'Interactive animated visuals for viewing and selecting references',
      filterAll: 'All',
      filterJpg: 'JPG',
      filterPng: 'PNG',
      download: 'Download',
      close: 'Close',
      next: 'Next',
      prev: 'Previous',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
    },
    projects: {
      civilizationProtocol: {
        heroTitle: 'CIVILIZATION PROTOCOL',
        heroDescription: 'Decentralized cyber-physical platform for water resource management through blockchain',
        presentationLink: 'Investment Presentation',
        blockTitle: 'CLICK FOR DETAILS →',
        clickForDetails: 'CLICK FOR DETAILS →',
        platformArchitecture: {
          title: 'Platform Architecture',
          description: '12-level cyber-physical system from IoT sensors to global network. Scalable, secure, decentralized.',
        },
        tokenomics: {
          title: 'Tokenomics',
          description: 'VOD tokens, staking, rewards and governance mechanisms.',
        },
        daoGovernance: {
          title: 'DAO Governance',
          description: 'Decentralized autonomous organization for platform management.',
        },
        iotAiMonitoring: {
          title: 'IoT & AI Monitoring',
          description: 'Smart sensors and AI-powered analytics for water resources.',
        },
        waterTokenization: {
          title: 'Water Tokenization',
          description: 'Digital assets representing water resources and infrastructure.',
        },
        globalMarketplace: {
          title: 'Global Marketplace',
          description: 'Trading platform for water-related assets and data.',
        },
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
      tagline: 'MULTIDISCIPLINARY LAB // IT × DESIGN × ARCHITECTURE × CINEMA × R&D',
      title: 'Лаборатория междисциплинарных решений',
      titleHighlight: 'РАЗРАБОТОК',
      titleEnd: 'ИННОВАЦИЙ',
      subtitle: 'Синтез технологий, дизайна и науки для создания уникальных продуктов',
      description: 'Мы объединяем экспертизу в IT, архитектуре, дизайне, кинематографе и научных исследованиях для решения сложных задач. Каждый проект — это многоуровневый подход, где технологии переплетаются с творчеством, а инженерные решения дополняются художественным видением.',
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
      footer: '© 2025 Foxampy LAB. Все права защищены.',
      vacancies: 'ВАКАНСИИ',
      learnMore: 'Узнать больше',
      scrollToExplore: 'Прокрутите для изучения',
      synergy: 'СИНЕРГИЯ',
      ctaButton1: 'Заказать проект',
      ctaButton2: 'Инвестировать в HUB',
      ctaButton3: 'Галерея артефактов',
      nexus: {
        title: 'THE NEXUS',
        subtitle: 'FOXAMPY LAB: MULTIDISCIPLINARY SYNTHESIS',
        description: 'Проектируем будущее на стыке IT-архитектуры, параметрических пространств, моды и кинематографа. Создаем продукты, которые ощущаются как единый организм.',
        cta: 'Войти в ядро',
      },
      solutions: {
        title: 'SYNERGETIC SOLUTIONS',
        subtitle: 'Мультидисциплинарный синтез',
        description: 'Мы не просто комбинируем разные области знаний — мы создаем уникальные решения через глубокую интеграцию IT, архитектуры, дизайна, кинематографа и научных исследований. Каждая задача рассматривается с множества углов зрения, что позволяет находить нестандартные подходы и создавать продукты, которые невозможно разработать в рамках одной дисциплины. Наш мультидисциплинарный многоуровневый подход — это инструмент поиска уникальных и лучших решений для каждой конкретной задачи.',
        services: [
          {
            id: 'business',
            title: 'STRATEGIC GENESIS & VENTURE LOGIC',
            subtitle: 'Business Strategic Architecture',
            description: 'Проектирование фундаментов бизнеса. Мы переводим хаос идей в строгую документарную форму: от создания Vision & Mission до детальных White Papers и инвестиционных меморандумов. Разработка токеномики и экономических моделей, устойчивых к рыночной энтропии.',
            features: [
              'Vision & Mission разработка',
              'White Papers и Litepapers',
              'Инвестиционные меморандумы',
              'Токеномика и экономические модели',
              'Бизнес-планирование',
              'Стратегическое консультирование',
            ],
          },
          {
            id: 'it',
            title: 'DIGITAL CORE & ECOSYSTEM DEVELOPMENT',
            subtitle: 'IT Ecosystem Engineering',
            description: 'Создание технологического ДНК продукта. Разработка концепций и реализация сложных IT-экосистем: масштабируемые платформы, AI-интеграции и блокчейн-решения. Мы строим не просто код, а архитектуру, готовую к бесконечной трансформации.',
            features: [
              'Архитектура экосистем',
              'Блокчейн разработка',
              'AI/ML интеграции',
              'Масштабируемые платформы',
              'Микросервисная архитектура',
              'API и интеграции',
            ],
          },
          {
            id: 'branding',
            title: 'COGNITIVE BRANDING & VISUAL SYSTEMS',
            subtitle: 'Identity & Sensory Branding',
            description: 'Синтез восприятия и эстетики. Мы создаем бренды как живые организмы с уникальным кодом айдентики. Глубокий дизайн-анализ, разработка смысловых полей и маркетинговых стратегий, которые резонируют на уровне подсознания.',
            features: [
              'Бренд-стратегия',
              'Визуальная идентичность',
              'Дизайн-системы',
              'Маркетинговые стратегии',
              'Контент-стратегия',
              'Digital маркетинг',
            ],
          },
          {
            id: 'spatial',
            title: 'PARAMETRIC FASHION & ARCHITECTURE',
            subtitle: 'Spatial Form & Wearable Art',
            description: 'Стирание границ между телом и пространством. Мы объединяем методы параметрического проектирования зданий с авангардным дизайном одежды. Создание цифровых двойников, 3D-прототипирование и концептуальные решения для физических миров.',
            features: [
              'Параметрический дизайн',
              'Архитектурное проектирование',
              'Fashion дизайн',
              '3D прототипирование',
              'Цифровые двойники',
              'Концептуальные решения',
            ],
          },
          {
            id: 'cinema',
            title: 'TEMPORAL NARRATIVE & VISUAL FX',
            subtitle: 'Cinematic Synthesis & Motion',
            description: 'Трансляция смыслов через визуальный опыт. Продакшн будущего: от концептуального сторителлинга до сложного CGI и видео-арта. Мы создаем визуальные миры, которые погружают зрителя в 4D-пространство и диктуют новые эстетические нормы.',
            features: [
              'Видео продакшн',
              'CGI и визуальные эффекты',
              'Motion design',
              'Концептуальный сторителлинг',
              '3D анимация',
              'Постпродакшн',
            ],
          },
          {
            id: 'rd',
            title: 'APPLIED PHYSICS & ENGINEERING RESEARCH',
            subtitle: 'Frontiers of R&D',
            description: 'Лаборатория фундаментальных инноваций. Глубокие исследования на стыке инженерии и прикладной науки. Разработка патентоспособных технологий, прототипирование новых материалов и поиск нестандартных инженерных решений для глобальных вызовов.',
            features: [
              'Научные исследования',
              'Инженерные разработки',
              'Прототипирование',
              'Патентование технологий',
              'Прикладная физика',
              'Материаловедение',
            ],
          },
        ],
      },
      gallery: {
        title: 'LIVING GALLERY',
        subtitle: 'Артефакты и прототипы',
        description: 'Галерея визуальных решений: приложения, цифровая мода, архитектурные формы, видео-арт, R&D прототипы. Каждая работа — портал в будущую среду.',
        cta: 'Смотреть галерею',
      },
      ventures: {
        title: 'VENTURE TERMINAL',
        subtitle: 'Инвестиционные возможности',
        description: 'Архитектурные прототипы будущего: децентрализованные экосистемы на блокчейн-инфраструктуре, платформы искусственного интеллекта с нейросетевыми ядрами, социальные графы и финтех-слои как кинетические скульптуры. Каждый проект — это морфогенез формы и идеи, вектор эволюции технологического ландшафта.',
        cta: 'Открыть HUB',
        clickForDetails: 'CLICK FOR DETAILS →',
        viewInHub: 'Смотреть в HUB →',
        projects: [
          { name: 'Civilization Protocol', status: 'Кибер-физическая экосистема воды', stack: ['Blockchain', 'IoT', 'AI'], stage: 'Активный вектор' },
          { name: 'TradePlus', status: 'Платформа умной торговли', stack: ['Fintech', 'Quant', 'UX'], stage: 'Движение рынка' },
          { name: 'Dogymorbios', status: 'Социальная сеть для собак', stack: ['Geo', 'Community', 'Mobile'], stage: 'Пилотные прогулки' },
          { name: 'NexusVita', status: 'Единая карта здоровья', stack: ['API', 'HL7/FHIR', 'AI'], stage: 'Сбор данных' },
        ],
      },
      intelligence: {
        title: 'DISTRIBUTED INTELLIGENCE',
        subtitle: 'Распределенный интеллект',
        description: 'Мы не показываем лица — мы транслируем компетенции. Архитекторы мировых бюро, блокчейн-инженеры и креативные директоры в децентрализованной сети исполнения. Специалисты и команды со всего мира готовы взяться за реализацию ваших идей и заказов, а также продолжают мечтать и создавать собственные концепции, проекты, продукты и решения. Каждый участник сети — это узел в распределенной системе интеллекта, где компетенции переплетаются и усиливают друг друга.',
      },
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
    presentation: {
      back: 'Назад',
      introduction: 'Введение',
      whitepaper: 'Вайтпейпер',
      next: 'Далее',
      prev: 'Назад',
      investmentPresentation: 'Инвестиционная презентация',
      architecture: 'Архитектура',
      totalBudget: 'Общий бюджет',
      invested: 'Инвестировано',
      remaining: 'Осталось',
      budgetAllocation: 'Распределение бюджета',
      allocated: 'Выделено',
      spent: 'Потрачено',
      breakdown: 'Разбивка',
      ofTotal: 'от общего',
      civilizationProtocol: {
        slides: {
          slide1: { title: 'Протокол Цивилизации', subtitle: 'Децентрализованное управление водными ресурсами', content: 'Введение в платформу' },
          slide2: { title: 'Архитектура платформы', content: ['12-уровневая система', 'От IoT до блокчейна', 'Масштабируемая инфраструктура'] },
          slide3: { title: 'Объекты платформы', content: ['Водные ресурсы', 'Инфраструктура', 'IoT-устройства'] },
          slide4: { title: 'Субъекты платформы', content: ['Владельцы ресурсов', 'Инвесторы', 'Разработчики', 'Валидаторы'] },
          slide5: { title: 'Продукты экосистемы', content: ['Платформа VODeco', 'Токены VOD', 'Маркетплейс данных'] },
          slide6: { title: 'Проекты экосистемы', content: ['Управление водными ресурсами', 'Глобальная сеть', 'DAO управление'] },
          slide7: { title: 'Инфраструктура', content: ['Мультиблокчейн', 'Облачные сервисы', 'Микросервисы'] },
          slide8: { title: 'Дорожная карта', content: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'] },
        },
        roadmap: {
          item1: { period: 'Q1 2025', title: 'Запуск MVP', description: 'Основные функции платформы' },
          item2: { period: 'Q2 2025', title: 'Расширение', description: 'Дополнительные функции и масштабирование' },
          item3: { period: 'Q3 2025', title: 'Глобальная сеть', description: 'Международное расширение' },
          item4: { period: 'Q4 2025', title: 'Запуск DAO', description: 'Децентрализованное управление' },
        },
      },
    },
    ecosystemsPage: {
      tagline: 'ECOSYSTEMS',
      title: 'ЭКОСИСТЕМЫ',
      description: 'Создание комплексных экосистем и платформ: от стратегического планирования и исследования рынка до разработки архитектуры, реализации и масштабирования.',
      ctaButton: 'ОБСУДИТЬ ПРОЕКТ',
      servicesTitle: 'УСЛУГИ',
      service1: {
        title: 'Исследование и стратегия',
        description: 'Комплексное исследование рынка, пользователей и технологических возможностей для построения стратегии развития экосистемы.',
        features: ['Рыночное исследование', 'Анализ пользователей', 'Технологический аудит', 'Стратегическое планирование'],
      },
      service2: {
        title: 'Архитектура решения',
        description: 'Проектирование масштабируемой архитектуры экосистемы с учетом интеграций, безопасности и производительности.',
        features: ['Системная архитектура', 'Микросервисы', 'API дизайн', 'Интеграции'],
      },
      service3: {
        title: 'Разработка платформы',
        description: 'Реализация комплексной платформы с множеством сервисов, модулей и интеграций.',
        features: ['Разработка сервисов', 'Интеграции', 'Админ-панели', 'Аналитика'],
      },
      service4: {
        title: 'Масштабирование',
        description: 'Поддержка роста экосистемы: оптимизация производительности, добавление новых функций и сервисов.',
        features: ['Оптимизация', 'Масштабирование', 'Новые функции', 'Поддержка'],
      },
      processTitle: 'ПРОЦЕСС РАБОТЫ',
      step1: { step: '01', title: 'Исследование', desc: 'Глубокий анализ рынка и пользователей' },
      step2: { step: '02', title: 'Архитектура', desc: 'Проектирование системы и интеграций' },
      step3: { step: '03', title: 'Разработка', desc: 'Реализация платформы и сервисов' },
      step4: { step: '04', title: 'Запуск', desc: 'Деплой, масштабирование и поддержка' },
      ctaTitle: 'ГОТОВЫ НАЧАТЬ?',
      ctaDescription: 'Обсудим ваш проект и предложим оптимальное решение.',
      ctaButton2: 'СВЯЗАТЬСЯ',
    },
    webAppPage: {
      tagline: 'WEB & APP DEVELOPMENT',
      title: 'САЙТЫ И',
      titleHighlight: 'ПРИЛОЖЕНИЯ',
      description: 'Разработка веб-сайтов, веб-приложений, мобильных приложений. Современный технологический стек: React, Next.js, React Native, Node.js.',
      ctaButton: 'ОБСУДИТЬ ПРОЕКТ',
      servicesTitle: 'УСЛУГИ',
      service1: {
        title: 'Веб-сайты',
        description: 'Разработка современных веб-сайтов с фокусом на производительность, SEO и пользовательский опыт.',
        features: ['Корпоративные сайты', 'Лендинги', 'Портфолио', 'Блоги и CMS'],
      },
      service2: {
        title: 'Веб-приложения',
        description: 'Создание высоконагруженных веб-приложений с использованием современных технологий и лучших практик.',
        features: ['SPA / SSR / SSG', 'PWA приложения', 'Дашборды', 'Админ-панели'],
      },
      service3: {
        title: 'Мобильные приложения',
        description: 'Разработка нативных и кроссплатформенных мобильных приложений для iOS и Android.',
        features: ['iOS приложения', 'Android приложения', 'React Native', 'Flutter'],
      },
      service4: {
        title: 'API и интеграции',
        description: 'Разработка RESTful и GraphQL API, интеграция с внешними сервисами и системами.',
        features: ['REST API', 'GraphQL', 'Микросервисы', 'Интеграции'],
      },
      techTitle: 'ТЕХНОЛОГИИ',
      tech1: { name: 'React / Next.js', desc: 'Современный фронтенд' },
      tech2: { name: 'Node.js', desc: 'Серверная разработка' },
      tech3: { name: 'TypeScript', desc: 'Типобезопасность' },
      tech4: { name: 'PostgreSQL / MongoDB', desc: 'Базы данных' },
      processTitle: 'ПРОЦЕСС РАБОТЫ',
      step1: { step: '01', title: 'Планирование', desc: 'Анализ требований и проектирование архитектуры' },
      step2: { step: '02', title: 'Разработка', desc: 'Реализация функциональности и интерфейсов' },
      step3: { step: '03', title: 'Тестирование', desc: 'QA, оптимизация производительности' },
      step4: { step: '04', title: 'Запуск', desc: 'Деплой, мониторинг и поддержка' },
      ctaTitle: 'ГОТОВЫ НАЧАТЬ?',
      ctaDescription: 'Обсудим ваш проект и предложим оптимальное решение.',
      ctaButton2: 'СВЯЗАТЬСЯ',
    },
    videoPage: {
      tagline: 'VIDEO & FILM',
      title: 'ВИДЕО И',
      titleHighlight: 'КИНО',
      description: 'Видеопродакшн, кино, моушн-дизайн, визуальные коммуникации. Промо-ролики, эксплейнеры, 3D визуализации. Для презентаций, лендингов и социальных сетей.',
      ctaButton: 'ОБСУДИТЬ ПРОЕКТ',
      servicesTitle: 'УСЛУГИ',
      service1: {
        title: 'Видеопродакшн',
        description: 'Полный цикл создания видео: от концепции и сценария до съемки, монтажа и постпродакшна.',
        features: ['Сценарий и концепция', 'Съемка', 'Монтаж', 'Цветокоррекция'],
      },
      service2: {
        title: 'Кино',
        description: 'Создание короткометражных и полнометражных фильмов, документальных проектов и видеоконтента.',
        features: ['Короткометражные фильмы', 'Документалистика', 'Видеоарт', 'Экспериментальное кино'],
      },
      service3: {
        title: 'Моушн-дизайн',
        description: 'Создание анимированной графики, титров, инфографики и визуальных эффектов для видео.',
        features: ['Анимация', 'Титры и графика', 'Инфографика', 'Визуальные эффекты'],
      },
      service4: {
        title: 'Визуальные коммуникации',
        description: 'Разработка визуальных решений для презентаций, лендингов, социальных сетей и рекламы.',
        features: ['Презентации', 'Рекламные ролики', 'Эксплейнеры', 'Социальные сети'],
      },
      processTitle: 'ПРОЦЕСС РАБОТЫ',
      step1: { step: '01', title: 'Концепция', desc: 'Разработка идеи и сценария' },
      step2: { step: '02', title: 'Продакшн', desc: 'Съемка и производство' },
      step3: { step: '03', title: 'Постпродакшн', desc: 'Монтаж, цветокоррекция, звук' },
      step4: { step: '04', title: 'Доставка', desc: 'Финальная версия и адаптация' },
      ctaTitle: 'ГОТОВЫ НАЧАТЬ?',
      ctaDescription: 'Обсудим ваш проект и предложим оптимальное решение.',
      ctaButton2: 'СВЯЗАТЬСЯ',
    },
    marketingPage: {
      tagline: 'MARKETING & BRANDING',
      title: 'МАРКЕТИНГ И',
      titleHighlight: 'БРЕНДИНГ',
      description: 'Маркетинг, продвижение, брендинг, построение сообществ. Data-driven подход, контент-стратегия, performance-маркетинг. Специализация в криптомаркетинге и Web3 PR.',
      ctaButton: 'ОБСУДИТЬ ПРОЕКТ',
      servicesTitle: 'УСЛУГИ',
      service1: {
        title: 'Контент-стратегия',
        description: 'Разработка комплексной контент-стратегии для привлечения и удержания целевой аудитории.',
        features: ['Стратегия контента', 'Контент-план', 'Копирайтинг', 'Редактура'],
      },
      service2: {
        title: 'SMM и социальные сети',
        description: 'Управление присутствием в социальных сетях, создание сообществ и взаимодействие с аудиторией.',
        features: ['SMM стратегия', 'Контент для соцсетей', 'Community management', 'Инфлюенс-маркетинг'],
      },
      service3: {
        title: 'Performance-маркетинг',
        description: 'Data-driven подход к маркетингу с фокусом на измеримые результаты и оптимизацию конверсий.',
        features: ['Реклама', 'Аналитика', 'A/B тестирование', 'Оптимизация конверсий'],
      },
      service4: {
        title: 'Криптомаркетинг и Web3 PR',
        description: 'Специализированный маркетинг для блокчейн-проектов, криптовалют и Web3 экосистем.',
        features: ['Web3 PR', 'Криптомаркетинг', 'Community building', 'Token marketing'],
      },
      processTitle: 'ПРОЦЕСС РАБОТЫ',
      step1: { step: '01', title: 'Анализ', desc: 'Исследование аудитории и конкурентов' },
      step2: { step: '02', title: 'Стратегия', desc: 'Разработка маркетинговой стратегии' },
      step3: { step: '03', title: 'Реализация', desc: 'Запуск кампаний и создание контента' },
      step4: { step: '04', title: 'Оптимизация', desc: 'Анализ результатов и улучшение' },
      ctaTitle: 'ГОТОВЫ НАЧАТЬ?',
      ctaDescription: 'Обсудим ваш проект и предложим оптимальное решение.',
      ctaButton2: 'СВЯЗАТЬСЯ',
    },
    designPage: {
      tagline: 'DESIGN & ARCHITECTURE',
      title: 'ДИЗАЙН И',
      titleHighlight: 'АРХИТЕКТУРА',
      description: 'Архитектура решений, дизайн интерфейсов, визуальная идентичность, брендинг. От концепции до реализации визуального языка и дизайн-систем.',
      ctaButton: 'ОБСУДИТЬ ПРОЕКТ',
      servicesTitle: 'УСЛУГИ',
      service1: {
        title: 'Архитектура решений',
        description: 'Проектирование архитектуры цифровых решений с учетом масштабируемости, производительности и пользовательского опыта.',
        features: ['Системная архитектура', 'UX архитектура', 'Информационная архитектура', 'Техническое проектирование'],
      },
      service2: {
        title: 'Дизайн интерфейсов',
        description: 'Создание интерфейсов, которые конвертируют и обеспечивают превосходный пользовательский опыт на всех устройствах.',
        features: ['UX исследования', 'UI дизайн', 'Прототипирование', 'Дизайн-системы'],
      },
      service3: {
        title: 'Визуальная идентичность',
        description: 'Разработка визуальной идентичности и брендинга, которые отражают ценности компании и запоминаются аудиторией.',
        features: ['Брендинг', 'Айдентика', 'Гайдлайны', 'Адаптация под носители'],
      },
      service4: {
        title: 'Брендинг',
        description: 'Создание комплексной системы бренда от стратегии до визуального воплощения и коммуникаций.',
        features: ['Стратегия бренда', 'Позиционирование', 'Визуальный язык', 'Брендбук'],
      },
      processTitle: 'ПРОЦЕСС РАБОТЫ',
      step1: { step: '01', title: 'Исследование', desc: 'Анализ аудитории, конкурентов и контекста' },
      step2: { step: '02', title: 'Концепция', desc: 'Разработка концепции и визуального направления' },
      step3: { step: '03', title: 'Дизайн', desc: 'Создание дизайн-системы и интерфейсов' },
      step4: { step: '04', title: 'Реализация', desc: 'Поддержка на этапе разработки и тестирования' },
      ctaTitle: 'ГОТОВЫ НАЧАТЬ?',
      ctaDescription: 'Обсудим ваш проект и предложим оптимальное решение.',
      ctaButton2: 'СВЯЗАТЬСЯ',
    },
    businessPage: {
      tagline: 'BUSINESS & STRATEGY',
      title: 'БИЗНЕС И',
      titleHighlight: 'СТРАТЕГИРОВАНИЕ',
      description: 'Разработка бизнес-концепций, стратегическое планирование, бизнес-моделирование. От исследования рынка и анализа конкурентов до построения стратегии развития и масштабирования.',
      ctaButton: 'ОБСУДИТЬ ПРОЕКТ',
      servicesTitle: 'УСЛУГИ',
      service1: {
        title: 'Разработка бизнес-концепций',
        description: 'Создание комплексных бизнес-концепций на основе глубокого анализа рынка, конкурентной среды и пользовательских потребностей.',
        features: ['Анализ рынка и конкурентов', 'Исследование пользователей', 'Разработка концепции', 'Валидация идеи'],
      },
      service2: {
        title: 'Стратегическое планирование',
        description: 'Построение долгосрочной стратегии развития бизнеса с учетом рыночных трендов, технологических возможностей и бизнес-целей.',
        features: ['Стратегический анализ', 'Определение целей', 'Планирование этапов', 'Roadmap разработки'],
      },
      service3: {
        title: 'Бизнес-моделирование',
        description: 'Проектирование устойчивых бизнес-моделей с фокусом на масштабируемость, монетизацию и создание ценности.',
        features: ['Модель монетизации', 'Unit-экономика', 'Сценарии роста', 'Финансовое планирование'],
      },
      service4: {
        title: 'Анализ и исследования',
        description: 'Комплексный анализ рынка, конкурентов, пользователей и технологических возможностей для принятия обоснованных решений.',
        features: ['Рыночный анализ', 'Конкурентный анализ', 'Пользовательские исследования', 'Технологический аудит'],
      },
      processTitle: 'ПРОЦЕСС РАБОТЫ',
      step1: { step: '01', title: 'Исследование', desc: 'Глубокий анализ рынка, конкурентов и пользователей' },
      step2: { step: '02', title: 'Концепция', desc: 'Разработка бизнес-концепции и модели' },
      step3: { step: '03', title: 'Стратегия', desc: 'Построение стратегии развития и плана действий' },
      step4: { step: '04', title: 'Реализация', desc: 'Поддержка на этапе реализации и масштабирования' },
      ctaTitle: 'ГОТОВЫ НАЧАТЬ?',
      ctaDescription: 'Обсудим ваш проект и предложим оптимальное решение.',
      ctaButton2: 'СВЯЗАТЬСЯ',
    },
    background: {
      title: 'ВЫБОР ФОНА',
      description: 'Выберите вариант анимированного чернильного фона',
      variant1: { name: 'Вариант 1', description: 'Медленные плавные волны' },
      variant2: { name: 'Вариант 2', description: 'Средняя скорость, выраженные волны' },
      variant3: { name: 'Вариант 3', description: 'Густые жирные волны' },
      variant4: { name: 'Вариант 4', description: 'Мелкие частые волны' },
      variant5: { name: 'Вариант 5', description: 'Крупные медленные волны' },
      variant6: { name: 'Вариант 6', description: 'Быстрые перетекания' },
      variant7: { name: 'Вариант 7', description: 'Волны с сильными бликами' },
      variant8: { name: 'Вариант 8', description: 'Сложные многослойные волны' },
    },
    gallery: {
      tagline: 'LIVING GALLERY',
      title: 'Витрина визуальных и технических решений',
      description: 'Здесь будут артефакты: интерфейсы, текстуры, формы, видео и прототипы. Пока материалы готовятся — мы оставляем архитектуру страницы и слоты под каждую дисциплину.',
      ctaButton: 'Запросить показ кейсов',
      apps: {
        accent: 'Интерактивные прототипы',
        title: 'Приложения и экосистемы',
        description: 'UI/UX-кинематография: живые прототипы, сложные дашборды, 3D-интеракции. Показать глубину продуктовой логики и инженерной архитектуры без цифр — через интерфейсный язык.',
      },
      fashion: {
        accent: 'Параметрические формы',
        title: 'Цифровая мода',
        description: 'Коллекции как код: 3D-скульптуры ткани, аватарные гардеробы, текстуры, симуляции движений. Переход из концепта в производственный паттерн.',
      },
      architecture: {
        accent: 'Параметрические пространства',
        title: 'Архитектура и среды',
        description: 'Морфология фасадов, интерьеры-алгоритмы, световые сценарии. Виртуальные двойники и физические инсталляции с кодовыми правилами формы.',
      },
      video: {
        accent: 'Кинематограф будущего',
        title: 'Видео / CGI / Motion',
        description: 'CGI, моушн-графика, product-фильмы, синемаграфы. Нарративы, собирающие продукт в осязаемую историю.',
      },
      research: {
        accent: 'Научные прототипы',
        title: 'R&D / Лаборатория',
        description: 'Новые материалы, интерактивные сенсоры, блокчейн- или AI-пробы. Чистый эксперимент: схемы, 3D, короткие демо.',
      },
    },
    visual: {
      title: 'Визуальные референсы',
      description: 'Анимационные интерактивные визуалы для просмотра и отбора референсов',
      filterAll: 'Все',
      filterJpg: 'JPG',
      filterPng: 'PNG',
      download: 'Скачать',
      close: 'Закрыть',
      next: 'Следующее',
      prev: 'Предыдущее',
      zoomIn: 'Увеличить',
      zoomOut: 'Уменьшить',
    },
    projects: {
      civilizationProtocol: {
        heroTitle: 'CIVILIZATION PROTOCOL',
        heroDescription: 'Децентрализованная кибер-физическая платформа для управления водными ресурсами через блокчейн',
        presentationLink: 'Инвестиционная Презентация',
        blockTitle: 'CLICK FOR DETAILS →',
        clickForDetails: 'CLICK FOR DETAILS →',
        platformArchitecture: {
          title: 'Архитектура платформы',
          description: '12-уровневая кибер-физическая система от IoT-датчиков до глобальной сети. Масштабируемая, безопасная, децентрализованная.',
        },
        tokenomics: {
          title: 'Токеномика',
          description: 'Токены VOD, стейкинг, награды и механизмы управления.',
        },
        daoGovernance: {
          title: 'DAO управление',
          description: 'Децентрализованная автономная организация для управления платформой.',
        },
        iotAiMonitoring: {
          title: 'IoT и AI мониторинг',
          description: 'Умные датчики и аналитика на основе ИИ для водных ресурсов.',
        },
        waterTokenization: {
          title: 'Токенизация воды',
          description: 'Цифровые активы, представляющие водные ресурсы и инфраструктуру.',
        },
        globalMarketplace: {
          title: 'Глобальный маркетплейс',
          description: 'Торговая платформа для активов и данных, связанных с водой.',
        },
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
    presentation: {
      back: 'العودة',
      introduction: 'مقدمة',
      whitepaper: 'الورقة البيضاء',
      next: 'التالي',
      prev: 'السابق',
      investmentPresentation: 'عرض استثماري',
      architecture: 'الهندسة المعمارية',
      totalBudget: 'الميزانية الإجمالية',
      invested: 'المستثمر',
      remaining: 'المتبقي',
      budgetAllocation: 'تخصيص الميزانية',
      allocated: 'مخصص',
      spent: 'منفق',
      breakdown: 'التفصيل',
      ofTotal: 'من الإجمالي',
      civilizationProtocol: {
        slides: {
          slide1: { title: 'بروتوكول الحضارة', subtitle: 'إدارة المياه اللامركزية', content: 'مقدمة إلى المنصة' },
          slide2: { title: 'هندسة المنصة', content: ['نظام من 12 مستوى', 'من IoT إلى البلوك تشين', 'بنية تحتية قابلة للتوسع'] },
          slide3: { title: 'كائنات المنصة', content: ['الموارد المائية', 'البنية التحتية', 'أجهزة IoT'] },
          slide4: { title: 'مواضيع المنصة', content: ['أصحاب الموارد', 'المستثمرون', 'المطورون', 'المتحققون'] },
          slide5: { title: 'منتجات النظام البيئي', content: ['منصة VODeco', 'رموز VOD', 'سوق البيانات'] },
          slide6: { title: 'مشاريع النظام البيئي', content: ['إدارة المياه', 'الشبكة العالمية', 'حوكمة DAO'] },
          slide7: { title: 'البنية التحتية', content: ['بلوك تشين متعدد', 'الخدمات السحابية', 'الخدمات الصغيرة'] },
          slide8: { title: 'خارطة الطريق', content: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'] },
        },
        roadmap: {
          item1: { period: 'Q1 2025', title: 'إطلاق MVP', description: 'ميزات المنصة الأساسية' },
          item2: { period: 'Q2 2025', title: 'التوسع', description: 'ميزات إضافية والتوسع' },
          item3: { period: 'Q3 2025', title: 'الشبكة العالمية', description: 'التوسع الدولي' },
          item4: { period: 'Q4 2025', title: 'إطلاق DAO', description: 'الحوكمة اللامركزية' },
        },
      },
    },
    ecosystemsPage: {
      tagline: 'ECOSYSTEMS',
      title: 'النظم البيئية',
      description: 'إنشاء النظم البيئية والمنصات الشاملة: من التخطيط الاستراتيجي وبحوث السوق إلى تطوير الهندسة المعمارية والتنفيذ والتوسع.',
      ctaButton: 'مناقشة المشروع',
      servicesTitle: 'الخدمات',
      service1: {
        title: 'البحث والاستراتيجية',
        description: 'بحث شامل للسوق والمستخدمين والإمكانيات التكنولوجية لبناء استراتيجية تطوير النظام البيئي.',
        features: ['بحث السوق', 'تحليل المستخدمين', 'التدقيق التكنولوجي', 'التخطيط الاستراتيجي'],
      },
      service2: {
        title: 'هندسة الحل',
        description: 'تصميم هندسة نظام بيئي قابلة للتوسع مع مراعاة التكاملات والأمان والأداء.',
        features: ['هندسة النظام', 'الخدمات الصغيرة', 'تصميم API', 'التكاملات'],
      },
      service3: {
        title: 'تطوير المنصة',
        description: 'تنفيذ منصة شاملة مع خدمات ووحدات وتكاملات متعددة.',
        features: ['تطوير الخدمات', 'التكاملات', 'لوحات الإدارة', 'التحليلات'],
      },
      service4: {
        title: 'التوسع',
        description: 'دعم نمو النظام البيئي: تحسين الأداء وإضافة ميزات وخدمات جديدة.',
        features: ['التحسين', 'التوسع', 'ميزات جديدة', 'الدعم'],
      },
      processTitle: 'عملية العمل',
      step1: { step: '01', title: 'البحث', desc: 'تحليل عميق للسوق والمستخدمين' },
      step2: { step: '02', title: 'الهندسة المعمارية', desc: 'تصميم النظام والتكاملات' },
      step3: { step: '03', title: 'التطوير', desc: 'تنفيذ المنصة والخدمات' },
      step4: { step: '04', title: 'الإطلاق', desc: 'النشر والتوسع والدعم' },
      ctaTitle: 'جاهز للبدء؟',
      ctaDescription: 'دعنا نناقش مشروعك ونقترح الحل الأمثل.',
      ctaButton2: 'اتصل',
    },
    webAppPage: {
      tagline: 'WEB & APP DEVELOPMENT',
      title: 'المواقع والتطبيقات',
      titleHighlight: '',
      description: 'تطوير المواقع الإلكترونية وتطبيقات الويب والتطبيقات المحمولة. مجموعة تقنيات حديثة: React، Next.js، React Native، Node.js.',
      ctaButton: 'مناقشة المشروع',
      servicesTitle: 'الخدمات',
      service1: {
        title: 'المواقع الإلكترونية',
        description: 'تطوير المواقع الإلكترونية الحديثة مع التركيز على الأداء وتحسين محركات البحث وتجربة المستخدم.',
        features: ['المواقع المؤسسية', 'صفحات الهبوط', 'المحافظ', 'المدونات وأنظمة إدارة المحتوى'],
      },
      service2: {
        title: 'تطبيقات الويب',
        description: 'إنشاء تطبيقات ويب عالية التحميل باستخدام التقنيات الحديثة وأفضل الممارسات.',
        features: ['SPA / SSR / SSG', 'تطبيقات PWA', 'لوحات المعلومات', 'لوحات الإدارة'],
      },
      service3: {
        title: 'التطبيقات المحمولة',
        description: 'تطوير التطبيقات المحمولة الأصلية ومتعددة المنصات لنظامي iOS و Android.',
        features: ['تطبيقات iOS', 'تطبيقات Android', 'React Native', 'Flutter'],
      },
      service4: {
        title: 'API والتكاملات',
        description: 'تطوير RESTful و GraphQL API والتكامل مع الخدمات والأنظمة الخارجية.',
        features: ['REST API', 'GraphQL', 'الخدمات الصغيرة', 'التكاملات'],
      },
      techTitle: 'التقنيات',
      tech1: { name: 'React / Next.js', desc: 'واجهة أمامية حديثة' },
      tech2: { name: 'Node.js', desc: 'التطوير من جانب الخادم' },
      tech3: { name: 'TypeScript', desc: 'سلامة الأنواع' },
      tech4: { name: 'PostgreSQL / MongoDB', desc: 'قواعد البيانات' },
      processTitle: 'عملية العمل',
      step1: { step: '01', title: 'التخطيط', desc: 'تحليل المتطلبات وتصميم الهندسة المعمارية' },
      step2: { step: '02', title: 'التطوير', desc: 'تنفيذ الوظائف والواجهات' },
      step3: { step: '03', title: 'الاختبار', desc: 'ضمان الجودة وتحسين الأداء' },
      step4: { step: '04', title: 'الإطلاق', desc: 'النشر والمراقبة والدعم' },
      ctaTitle: 'هل أنت مستعد للبدء؟',
      ctaDescription: 'دعنا نناقش مشروعك ونقترح حلًا أمثل.',
      ctaButton2: 'اتصل',
    },
    videoPage: {
      tagline: 'VIDEO & FILM',
      title: 'الفيديو والسينما',
      titleHighlight: '',
      description: 'إنتاج الفيديو والسينما وتصميم الحركة والتواصل البصري. مقاطع الفيديو الترويجية والشرح والتصورات ثلاثية الأبعاد. للعروض التقديمية وصفحات الهبوط ووسائل التواصل الاجتماعي.',
      ctaButton: 'مناقشة المشروع',
      servicesTitle: 'الخدمات',
      service1: {
        title: 'إنتاج الفيديو',
        description: 'دورة كاملة لإنشاء الفيديو: من المفهوم والسيناريو إلى التصوير والتحرير وما بعد الإنتاج.',
        features: ['السيناريو والمفهوم', 'التصوير', 'التحرير', 'تصحيح الألوان'],
      },
      service2: {
        title: 'السينما',
        description: 'إنشاء الأفلام القصيرة والطويلة والمشاريع الوثائقية ومحتوى الفيديو.',
        features: ['الأفلام القصيرة', 'الوثائقية', 'فن الفيديو', 'السينما التجريبية'],
      },
      service3: {
        title: 'تصميم الحركة',
        description: 'إنشاء الرسوم المتحركة والعناوين والرسوم البيانية والتأثيرات البصرية للفيديو.',
        features: ['الرسوم المتحركة', 'العناوين والرسوم', 'الرسوم البيانية', 'التأثيرات البصرية'],
      },
      service4: {
        title: 'التواصل البصري',
        description: 'تطوير الحلول البصرية للعروض التقديمية وصفحات الهبوط ووسائل التواصل الاجتماعي والإعلانات.',
        features: ['العروض التقديمية', 'الإعلانات التجارية', 'مقاطع الشرح', 'وسائل التواصل الاجتماعي'],
      },
      processTitle: 'عملية العمل',
      step1: { step: '01', title: 'المفهوم', desc: 'تطوير الفكرة والسيناريو' },
      step2: { step: '02', title: 'الإنتاج', desc: 'التصوير والإنتاج' },
      step3: { step: '03', title: 'ما بعد الإنتاج', desc: 'التحرير وتصحيح الألوان والصوت' },
      step4: { step: '04', title: 'التسليم', desc: 'النسخة النهائية والتكيف' },
      ctaTitle: 'هل أنت مستعد للبدء؟',
      ctaDescription: 'دعنا نناقش مشروعك ونقترح حلًا أمثل.',
      ctaButton2: 'اتصل',
    },
    marketingPage: {
      tagline: 'MARKETING & BRANDING',
      title: 'التسويق والعلامة التجارية',
      titleHighlight: '',
      description: 'التسويق والترويج والعلامة التجارية وبناء المجتمع. نهج قائم على البيانات واستراتيجية المحتوى والتسويق بالأداء. التخصص في التسويق المشفر و Web3 PR.',
      ctaButton: 'مناقشة المشروع',
      servicesTitle: 'الخدمات',
      service1: {
        title: 'استراتيجية المحتوى',
        description: 'تطوير استراتيجية محتوى شاملة لجذب والاحتفاظ بالجمهور المستهدف.',
        features: ['استراتيجية المحتوى', 'خطة المحتوى', 'كتابة المحتوى', 'التحرير'],
      },
      service2: {
        title: 'SMM ووسائل التواصل الاجتماعي',
        description: 'إدارة الحضور في وسائل التواصل الاجتماعي وإنشاء المجتمعات والتفاعل مع الجمهور.',
        features: ['استراتيجية SMM', 'محتوى وسائل التواصل الاجتماعي', 'إدارة المجتمع', 'تسويق المؤثرين'],
      },
      service3: {
        title: 'التسويق بالأداء',
        description: 'نهج قائم على البيانات للتسويق مع التركيز على النتائج القابلة للقياس وتحسين التحويل.',
        features: ['الإعلان', 'التحليلات', 'اختبار A/B', 'تحسين التحويل'],
      },
      service4: {
        title: 'التسويق المشفر و Web3 PR',
        description: 'التسويق المتخصص لمشاريع البلوك تشين والعملات المشفرة وبيئات Web3.',
        features: ['Web3 PR', 'التسويق المشفر', 'بناء المجتمع', 'تسويق الرموز'],
      },
      processTitle: 'عملية العمل',
      step1: { step: '01', title: 'التحليل', desc: 'بحث الجمهور والمنافسين' },
      step2: { step: '02', title: 'الاستراتيجية', desc: 'تطوير استراتيجية التسويق' },
      step3: { step: '03', title: 'التنفيذ', desc: 'إطلاق الحملات وإنشاء المحتوى' },
      step4: { step: '04', title: 'التحسين', desc: 'تحليل النتائج والتحسين' },
      ctaTitle: 'هل أنت مستعد للبدء؟',
      ctaDescription: 'دعنا نناقش مشروعك ونقترح حلًا أمثل.',
      ctaButton2: 'اتصل',
    },
    designPage: {
      tagline: 'DESIGN & ARCHITECTURE',
      title: 'التصميم والهندسة المعمارية',
      titleHighlight: '',
      description: 'هندسة الحلول وتصميم الواجهات والهوية البصرية والعلامة التجارية. من المفهوم إلى تنفيذ اللغة البصرية وأنظمة التصميم.',
      ctaButton: 'مناقشة المشروع',
      servicesTitle: 'الخدمات',
      service1: {
        title: 'هندسة الحلول',
        description: 'تصميم هندسة الحلول الرقمية مع مراعاة القابلية للتوسع والأداء وتجربة المستخدم.',
        features: ['هندسة النظام', 'هندسة UX', 'الهندسة المعلوماتية', 'التصميم التقني'],
      },
      service2: {
        title: 'تصميم الواجهات',
        description: 'إنشاء واجهات تحول وتوفر تجربة مستخدم ممتازة عبر جميع الأجهزة.',
        features: ['أبحاث UX', 'تصميم UI', 'النماذج الأولية', 'أنظمة التصميم'],
      },
      service3: {
        title: 'الهوية البصرية',
        description: 'تطوير الهوية البصرية والعلامة التجارية التي تعكس قيم الشركة وتُذكر للجمهور.',
        features: ['العلامة التجارية', 'الهوية', 'الإرشادات', 'التكيف مع الوسائط'],
      },
      service4: {
        title: 'العلامة التجارية',
        description: 'إنشاء نظام علامة تجارية شامل من الاستراتيجية إلى التجسيد البصري والاتصالات.',
        features: ['استراتيجية العلامة التجارية', 'الموضع', 'اللغة البصرية', 'دليل العلامة التجارية'],
      },
      processTitle: 'عملية العمل',
      step1: { step: '01', title: 'البحث', desc: 'تحليل الجمهور والمنافسين والسياق' },
      step2: { step: '02', title: 'المفهوم', desc: 'تطوير المفهوم والاتجاه البصري' },
      step3: { step: '03', title: 'التصميم', desc: 'إنشاء نظام التصميم والواجهات' },
      step4: { step: '04', title: 'التنفيذ', desc: 'الدعم أثناء التطوير والاختبار' },
      ctaTitle: 'هل أنت مستعد للبدء؟',
      ctaDescription: 'دعنا نناقش مشروعك ونقترح حلًا أمثل.',
      ctaButton2: 'اتصل',
    },
    businessPage: {
      tagline: 'BUSINESS & STRATEGY',
      title: 'الأعمال والاستراتيجية',
      titleHighlight: '',
      description: 'تطوير مفاهيم الأعمال والتخطيط الاستراتيجي ونمذجة الأعمال. من بحث السوق وتحليل المنافسين إلى بناء استراتيجية التطوير والتوسع.',
      ctaButton: 'مناقشة المشروع',
      servicesTitle: 'الخدمات',
      service1: {
        title: 'تطوير مفاهيم الأعمال',
        description: 'إنشاء مفاهيم أعمال شاملة بناءً على تحليل عميق للسوق والبيئة التنافسية واحتياجات المستخدمين.',
        features: ['تحليل السوق والمنافسين', 'بحث المستخدمين', 'تطوير المفهوم', 'التحقق من الفكرة'],
      },
      service2: {
        title: 'التخطيط الاستراتيجي',
        description: 'بناء استراتيجية تطوير أعمال طويلة الأجل مع مراعاة اتجاهات السوق والإمكانيات التكنولوجية وأهداف الأعمال.',
        features: ['التحليل الاستراتيجي', 'تحديد الأهداف', 'تخطيط المراحل', 'خارطة طريق التطوير'],
      },
      service3: {
        title: 'نمذجة الأعمال',
        description: 'تصميم نماذج أعمال مستدامة مع التركيز على القابلية للتوسع والاستثمار وإنشاء القيمة.',
        features: ['نموذج الاستثمار', 'اقتصاد الوحدة', 'سيناريوهات النمو', 'التخطيط المالي'],
      },
      service4: {
        title: 'التحليل والبحث',
        description: 'تحليل شامل للسوق والمنافسين والمستخدمين والإمكانيات التكنولوجية لاتخاذ قرارات مستنيرة.',
        features: ['تحليل السوق', 'التحليل التنافسي', 'أبحاث المستخدمين', 'التدقيق التكنولوجي'],
      },
      processTitle: 'عملية العمل',
      step1: { step: '01', title: 'البحث', desc: 'تحليل عميق للسوق والمنافسين والمستخدمين' },
      step2: { step: '02', title: 'المفهوم', desc: 'تطوير مفهوم الأعمال والنموذج' },
      step3: { step: '03', title: 'الاستراتيجية', desc: 'بناء استراتيجية التطوير وخطة العمل' },
      step4: { step: '04', title: 'التنفيذ', desc: 'الدعم أثناء التنفيذ والتوسع' },
      ctaTitle: 'هل أنت مستعد للبدء؟',
      ctaDescription: 'دعنا نناقش مشروعك ونقترح حلًا أمثل.',
      ctaButton2: 'اتصل',
    },
    background: {
      title: 'اختيار الخلفية',
      description: 'اختر نوع خلفية الحبر المتحركة',
      variant1: { name: 'النوع 1', description: 'موجات بطيئة ناعمة' },
      variant2: { name: 'النوع 2', description: 'سرعة متوسطة، موجات واضحة' },
      variant3: { name: 'النوع 3', description: 'موجات سميكة ثقيلة' },
      variant4: { name: 'النوع 4', description: 'موجات صغيرة متكررة' },
      variant5: { name: 'النوع 5', description: 'موجات كبيرة بطيئة' },
      variant6: { name: 'النوع 6', description: 'تدفقات سريعة' },
      variant7: { name: 'النوع 7', description: 'موجات مع إبرازات قوية' },
      variant8: { name: 'النوع 8', description: 'موجات متعددة الطبقات معقدة' },
    },
    gallery: {
      tagline: 'LIVING GALLERY',
      title: 'عرض الحلول البصرية والتقنية',
      description: 'ستكون القطع الأثرية هنا: الواجهات، والقوام، والأشكال، ومقاطع الفيديو والنماذج الأولية. بينما يتم إعداد المواد - نترك بنية الصفحة والفتحات لكل تخصص.',
      ctaButton: 'طلب عرض الحالات',
      apps: {
        accent: 'نماذج تفاعلية',
        title: 'التطبيقات والنظم البيئية',
        description: 'سينماتوغرافيا UI/UX: نماذج حية، لوحات معلومات معقدة، تفاعلات ثلاثية الأبعاد. إظهار عمق منطق المنتج والهندسة المعمارية بدون أرقام - من خلال لغة الواجهة.',
      },
      fashion: {
        accent: 'أشكال بارامترية',
        title: 'الموضة الرقمية',
        description: 'المجموعات كرمز: منحوتات نسيج ثلاثية الأبعاد، خزائن أفاتار، قوام، محاكاة الحركة. الانتقال من المفهوم إلى النمط الإنتاجي.',
      },
      architecture: {
        accent: 'مساحات بارامترية',
        title: 'العمارة والبيئات',
        description: 'مورفولوجيا الواجهات، الديكورات الداخلية-الخوارزميات، سيناريوهات الإضاءة. التوائم الافتراضية والتركيبات المادية مع قواعد الكود للشكل.',
      },
      video: {
        accent: 'سينماتوغرافيا المستقبل',
        title: 'فيديو / CGI / Motion',
        description: 'CGI، رسوم متحركة، أفلام المنتج، cinemagraphs. السرد الذي يجمع المنتج في قصة ملموسة.',
      },
      research: {
        accent: 'نماذج علمية',
        title: 'R&D / المختبر',
        description: 'مواد جديدة، أجهزة استشعار تفاعلية، مجسات blockchain أو AI. تجربة نقية: مخططات، ثلاثية الأبعاد، عروض توضيحية قصيرة.',
      },
    },
    visual: {
      title: 'مراجع بصرية',
      description: 'مرئيات تفاعلية متحركة لعرض واختيار المراجع',
      filterAll: 'الكل',
      filterJpg: 'JPG',
      filterPng: 'PNG',
      download: 'تحميل',
      close: 'إغلاق',
      next: 'التالي',
      prev: 'السابق',
      zoomIn: 'تكبير',
      zoomOut: 'تصغير',
    },
    projects: {
      civilizationProtocol: {
        heroTitle: 'CIVILIZATION PROTOCOL',
        heroDescription: 'منصة إلكترونية فيزيائية لامركزية لإدارة موارد المياه من خلال blockchain',
        presentationLink: 'عرض استثماري',
        blockTitle: 'CLICK FOR DETAILS →',
        clickForDetails: 'انقر للتفاصيل →',
        platformArchitecture: {
          title: 'هندسة المنصة',
          description: 'نظام إلكتروني فيزيائي من 12 مستوى من مستشعرات IoT إلى الشبكة العالمية. قابل للتوسع وآمن ولامركزي.',
        },
        tokenomics: {
          title: 'الاقتصاد الرمزي',
          description: 'رموز VOD، الرهان، المكافآت وآليات الحوكمة.',
        },
        daoGovernance: {
          title: 'حوكمة DAO',
          description: 'منظمة مستقلة لامركزية لإدارة المنصة.',
        },
        iotAiMonitoring: {
          title: 'مراقبة IoT و AI',
          description: 'أجهزة استشعار ذكية وتحليلات مدعومة بالذكاء الاصطناعي للموارد المائية.',
        },
        waterTokenization: {
          title: 'تحويل المياه إلى رموز',
          description: 'أصول رقمية تمثل الموارد المائية والبنية التحتية.',
        },
        globalMarketplace: {
          title: 'السوق العالمية',
          description: 'منصة تداول للأصول والبيانات المتعلقة بالمياه.',
        },
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
    presentation: {
      back: 'Volver',
      introduction: 'Introducción',
      whitepaper: 'Documento técnico',
      next: 'Siguiente',
      prev: 'Anterior',
      investmentPresentation: 'Presentación de inversión',
      architecture: 'Arquitectura',
      totalBudget: 'Presupuesto Total',
      invested: 'Invertido',
      remaining: 'Restante',
      budgetAllocation: 'Asignación de Presupuesto',
      allocated: 'Asignado',
      spent: 'Gastado',
      breakdown: 'Desglose',
      ofTotal: 'del total',
      civilizationProtocol: {
        slides: {
          slide1: { title: 'Protocolo de Civilización', subtitle: 'Gestión descentralizada del agua', content: 'Introducción a la plataforma' },
          slide2: { title: 'Arquitectura de la plataforma', content: ['Sistema de 12 niveles', 'De IoT a blockchain', 'Infraestructura escalable'] },
          slide3: { title: 'Objetos de la plataforma', content: ['Recursos hídricos', 'Infraestructura', 'Dispositivos IoT'] },
          slide4: { title: 'Sujetos de la plataforma', content: ['Propietarios de recursos', 'Inversores', 'Desarrolladores', 'Validadores'] },
          slide5: { title: 'Productos del ecosistema', content: ['Plataforma VODeco', 'Tokens VOD', 'Mercado de datos'] },
          slide6: { title: 'Proyectos del ecosistema', content: ['Gestión del agua', 'Red global', 'Gobernanza DAO'] },
          slide7: { title: 'Infraestructura', content: ['Blockchain multi-cadena', 'Servicios en la nube', 'Microservicios'] },
          slide8: { title: 'Hoja de ruta', content: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'] },
        },
        roadmap: {
          item1: { period: 'Q1 2025', title: 'Lanzamiento MVP', description: 'Características principales de la plataforma' },
          item2: { period: 'Q2 2025', title: 'Expansión', description: 'Características adicionales y escalado' },
          item3: { period: 'Q3 2025', title: 'Red global', description: 'Expansión internacional' },
          item4: { period: 'Q4 2025', title: 'Lanzamiento DAO', description: 'Gobernanza descentralizada' },
        },
      },
    },
    ecosystemsPage: {
      tagline: 'ECOSYSTEMS',
      title: 'ECOSISTEMAS',
      description: 'Creación de ecosistemas y plataformas integrales: desde la planificación estratégica y la investigación de mercado hasta el desarrollo de arquitectura, implementación y escalado.',
      ctaButton: 'DISCUTIR PROYECTO',
      servicesTitle: 'SERVICIOS',
      service1: {
        title: 'Investigación y Estrategia',
        description: 'Investigación integral del mercado, usuarios y capacidades tecnológicas para construir la estrategia de desarrollo del ecosistema.',
        features: ['Investigación de mercado', 'Análisis de usuarios', 'Auditoría tecnológica', 'Planificación estratégica'],
      },
      service2: {
        title: 'Arquitectura de Solución',
        description: 'Diseño de arquitectura de ecosistema escalable considerando integraciones, seguridad y rendimiento.',
        features: ['Arquitectura del sistema', 'Microservicios', 'Diseño API', 'Integraciones'],
      },
      service3: {
        title: 'Desarrollo de Plataforma',
        description: 'Implementación de plataforma integral con múltiples servicios, módulos e integraciones.',
        features: ['Desarrollo de servicios', 'Integraciones', 'Paneles de administración', 'Analíticas'],
      },
      service4: {
        title: 'Escalado',
        description: 'Apoyo al crecimiento del ecosistema: optimización del rendimiento, adición de nuevas funciones y servicios.',
        features: ['Optimización', 'Escalado', 'Nuevas funciones', 'Soporte'],
      },
      processTitle: 'PROCESO DE TRABAJO',
      step1: { step: '01', title: 'Investigación', desc: 'Análisis profundo del mercado y usuarios' },
      step2: { step: '02', title: 'Arquitectura', desc: 'Diseño del sistema e integraciones' },
      step3: { step: '03', title: 'Desarrollo', desc: 'Implementación de plataforma y servicios' },
      step4: { step: '04', title: 'Lanzamiento', desc: 'Despliegue, escalado y soporte' },
      ctaTitle: '¿LISTO PARA COMENZAR?',
      ctaDescription: 'Discutamos su proyecto y propongamos una solución óptima.',
      ctaButton2: 'CONTACTAR',
    },
    webAppPage: {
      tagline: 'WEB & APP DEVELOPMENT',
      title: 'SITIOS WEB Y',
      titleHighlight: 'APLICACIONES',
      description: 'Desarrollo de sitios web, aplicaciones web, aplicaciones móviles. Stack tecnológico moderno: React, Next.js, React Native, Node.js.',
      ctaButton: 'DISCUTIR PROYECTO',
      servicesTitle: 'SERVICIOS',
      service1: {
        title: 'Sitios Web',
        description: 'Desarrollo de sitios web modernos con enfoque en rendimiento, SEO y experiencia de usuario.',
        features: ['Sitios corporativos', 'Landing pages', 'Portafolios', 'Blogs y CMS'],
      },
      service2: {
        title: 'Aplicaciones Web',
        description: 'Creación de aplicaciones web de alto rendimiento utilizando tecnologías modernas y mejores prácticas.',
        features: ['SPA / SSR / SSG', 'Aplicaciones PWA', 'Dashboards', 'Paneles de administración'],
      },
      service3: {
        title: 'Aplicaciones Móviles',
        description: 'Desarrollo de aplicaciones móviles nativas y multiplataforma para iOS y Android.',
        features: ['Aplicaciones iOS', 'Aplicaciones Android', 'React Native', 'Flutter'],
      },
      service4: {
        title: 'API e Integraciones',
        description: 'Desarrollo de API RESTful y GraphQL, integración con servicios y sistemas externos.',
        features: ['REST API', 'GraphQL', 'Microservicios', 'Integraciones'],
      },
      techTitle: 'TECNOLOGÍAS',
      tech1: { name: 'React / Next.js', desc: 'Frontend moderno' },
      tech2: { name: 'Node.js', desc: 'Desarrollo del lado del servidor' },
      tech3: { name: 'TypeScript', desc: 'Seguridad de tipos' },
      tech4: { name: 'PostgreSQL / MongoDB', desc: 'Bases de datos' },
      processTitle: 'PROCESO DE TRABAJO',
      step1: { step: '01', title: 'Planificación', desc: 'Análisis de requisitos y diseño de arquitectura' },
      step2: { step: '02', title: 'Desarrollo', desc: 'Implementación de funcionalidad e interfaces' },
      step3: { step: '03', title: 'Pruebas', desc: 'QA, optimización de rendimiento' },
      step4: { step: '04', title: 'Lanzamiento', desc: 'Despliegue, monitoreo y soporte' },
      ctaTitle: '¿LISTO PARA COMENZAR?',
      ctaDescription: 'Discutamos su proyecto y propongamos una solución óptima.',
      ctaButton2: 'CONTACTAR',
    },
    videoPage: {
      tagline: 'VIDEO & FILM',
      title: 'VIDEO Y',
      titleHighlight: 'CINE',
      description: 'Producción de video, cine, diseño de movimiento, comunicaciones visuales. Videos promocionales, explicativos, visualizaciones 3D. Para presentaciones, landing pages y redes sociales.',
      ctaButton: 'DISCUTIR PROYECTO',
      servicesTitle: 'SERVICIOS',
      service1: {
        title: 'Producción de Video',
        description: 'Ciclo completo de creación de video: desde concepto y guión hasta rodaje, edición y postproducción.',
        features: ['Guión y concepto', 'Rodaje', 'Edición', 'Corrección de color'],
      },
      service2: {
        title: 'Cine',
        description: 'Creación de cortometrajes y largometrajes, proyectos documentales y contenido de video.',
        features: ['Cortometrajes', 'Documentales', 'Videoarte', 'Cine experimental'],
      },
      service3: {
        title: 'Diseño de Movimiento',
        description: 'Creación de gráficos animados, títulos, infografías y efectos visuales para video.',
        features: ['Animación', 'Títulos y gráficos', 'Infografías', 'Efectos visuales'],
      },
      service4: {
        title: 'Comunicaciones Visuales',
        description: 'Desarrollo de soluciones visuales para presentaciones, landing pages, redes sociales y publicidad.',
        features: ['Presentaciones', 'Videos comerciales', 'Videos explicativos', 'Redes sociales'],
      },
      processTitle: 'PROCESO DE TRABAJO',
      step1: { step: '01', title: 'Concepto', desc: 'Desarrollo de idea y guión' },
      step2: { step: '02', title: 'Producción', desc: 'Rodaje y producción' },
      step3: { step: '03', title: 'Postproducción', desc: 'Edición, corrección de color, sonido' },
      step4: { step: '04', title: 'Entrega', desc: 'Versión final y adaptación' },
      ctaTitle: '¿LISTO PARA COMENZAR?',
      ctaDescription: 'Discutamos su proyecto y propongamos una solución óptima.',
      ctaButton2: 'CONTACTAR',
    },
    marketingPage: {
      tagline: 'MARKETING & BRANDING',
      title: 'MARKETING Y',
      titleHighlight: 'BRANDING',
      description: 'Marketing, promoción, branding, construcción de comunidades. Enfoque basado en datos, estrategia de contenido, marketing de rendimiento. Especialización en marketing cripto y Web3 PR.',
      ctaButton: 'DISCUTIR PROYECTO',
      servicesTitle: 'SERVICIOS',
      service1: {
        title: 'Estrategia de Contenido',
        description: 'Desarrollo de estrategia de contenido integral para atraer y retener audiencia objetivo.',
        features: ['Estrategia de contenido', 'Plan de contenido', 'Copywriting', 'Edición'],
      },
      service2: {
        title: 'SMM y Redes Sociales',
        description: 'Gestión de presencia en redes sociales, creación de comunidades e interacción con audiencia.',
        features: ['Estrategia SMM', 'Contenido para redes sociales', 'Gestión de comunidad', 'Marketing de influencers'],
      },
      service3: {
        title: 'Marketing de Rendimiento',
        description: 'Enfoque basado en datos para marketing con enfoque en resultados medibles y optimización de conversiones.',
        features: ['Publicidad', 'Analíticas', 'Pruebas A/B', 'Optimización de conversiones'],
      },
      service4: {
        title: 'Marketing Cripto y Web3 PR',
        description: 'Marketing especializado para proyectos blockchain, criptomonedas y ecosistemas Web3.',
        features: ['Web3 PR', 'Marketing cripto', 'Construcción de comunidad', 'Marketing de tokens'],
      },
      processTitle: 'PROCESO DE TRABAJO',
      step1: { step: '01', title: 'Análisis', desc: 'Investigación de audiencia y competidores' },
      step2: { step: '02', title: 'Estrategia', desc: 'Desarrollo de estrategia de marketing' },
      step3: { step: '03', title: 'Implementación', desc: 'Lanzamiento de campañas y creación de contenido' },
      step4: { step: '04', title: 'Optimización', desc: 'Análisis de resultados y mejora' },
      ctaTitle: '¿LISTO PARA COMENZAR?',
      ctaDescription: 'Discutamos su proyecto y propongamos una solución óptima.',
      ctaButton2: 'CONTACTAR',
    },
    designPage: {
      tagline: 'DESIGN & ARCHITECTURE',
      title: 'DISEÑO Y',
      titleHighlight: 'ARQUITECTURA',
      description: 'Arquitectura de soluciones, diseño de interfaces, identidad visual, branding. Desde concepto hasta implementación de lenguaje visual y sistemas de diseño.',
      ctaButton: 'DISCUTIR PROYECTO',
      servicesTitle: 'SERVICIOS',
      service1: {
        title: 'Arquitectura de Soluciones',
        description: 'Diseño de arquitectura de soluciones digitales considerando escalabilidad, rendimiento y experiencia de usuario.',
        features: ['Arquitectura del sistema', 'Arquitectura UX', 'Arquitectura de información', 'Diseño técnico'],
      },
      service2: {
        title: 'Diseño de Interfaces',
        description: 'Creación de interfaces que convierten y proporcionan excelente experiencia de usuario en todos los dispositivos.',
        features: ['Investigación UX', 'Diseño UI', 'Prototipado', 'Sistemas de diseño'],
      },
      service3: {
        title: 'Identidad Visual',
        description: 'Desarrollo de identidad visual y branding que reflejan los valores de la empresa y son memorables para la audiencia.',
        features: ['Branding', 'Identidad', 'Guías', 'Adaptación a medios'],
      },
      service4: {
        title: 'Branding',
        description: 'Creación de sistema de marca integral desde estrategia hasta encarnación visual y comunicaciones.',
        features: ['Estrategia de marca', 'Posicionamiento', 'Lenguaje visual', 'Manual de marca'],
      },
      processTitle: 'PROCESO DE TRABAJO',
      step1: { step: '01', title: 'Investigación', desc: 'Análisis de audiencia, competidores y contexto' },
      step2: { step: '02', title: 'Concepto', desc: 'Desarrollo de concepto y dirección visual' },
      step3: { step: '03', title: 'Diseño', desc: 'Creación de sistema de diseño e interfaces' },
      step4: { step: '04', title: 'Implementación', desc: 'Soporte durante desarrollo y pruebas' },
      ctaTitle: '¿LISTO PARA COMENZAR?',
      ctaDescription: 'Discutamos su proyecto y propongamos una solución óptima.',
      ctaButton2: 'CONTACTAR',
    },
    businessPage: {
      tagline: 'BUSINESS & STRATEGY',
      title: 'NEGOCIO Y',
      titleHighlight: 'ESTRATEGIA',
      description: 'Desarrollo de conceptos de negocio, planificación estratégica, modelado de negocio. Desde investigación de mercado y análisis de competidores hasta construcción de estrategia de desarrollo y escalado.',
      ctaButton: 'DISCUTIR PROYECTO',
      servicesTitle: 'SERVICIOS',
      service1: {
        title: 'Desarrollo de Conceptos de Negocio',
        description: 'Creación de conceptos de negocio integrales basados en análisis profundo de mercado, entorno competitivo y necesidades del usuario.',
        features: ['Análisis de mercado y competidores', 'Investigación de usuarios', 'Desarrollo de concepto', 'Validación de idea'],
      },
      service2: {
        title: 'Planificación Estratégica',
        description: 'Construcción de estrategia de desarrollo de negocio a largo plazo considerando tendencias de mercado, capacidades tecnológicas y objetivos de negocio.',
        features: ['Análisis estratégico', 'Definición de objetivos', 'Planificación de etapas', 'Roadmap de desarrollo'],
      },
      service3: {
        title: 'Modelado de Negocio',
        description: 'Diseño de modelos de negocio sostenibles con enfoque en escalabilidad, monetización y creación de valor.',
        features: ['Modelo de monetización', 'Economía unitaria', 'Escenarios de crecimiento', 'Planificación financiera'],
      },
      service4: {
        title: 'Análisis e Investigación',
        description: 'Análisis integral de mercado, competidores, usuarios y capacidades tecnológicas para toma de decisiones informadas.',
        features: ['Análisis de mercado', 'Análisis competitivo', 'Investigación de usuarios', 'Auditoría tecnológica'],
      },
      processTitle: 'PROCESO DE TRABAJO',
      step1: { step: '01', title: 'Investigación', desc: 'Análisis profundo de mercado, competidores y usuarios' },
      step2: { step: '02', title: 'Concepto', desc: 'Desarrollo de concepto y modelo de negocio' },
      step3: { step: '03', title: 'Estrategia', desc: 'Construcción de estrategia de desarrollo y plan de acción' },
      step4: { step: '04', title: 'Implementación', desc: 'Soporte durante implementación y escalado' },
      ctaTitle: '¿LISTO PARA COMENZAR?',
      ctaDescription: 'Discutamos su proyecto y propongamos una solución óptima.',
      ctaButton2: 'CONTACTAR',
    },
    background: {
      title: 'SELECCIÓN DE FONDO',
      description: 'Seleccione una variante de fondo de tinta animado',
      variant1: { name: 'Variante 1', description: 'Ondas lentas suaves' },
      variant2: { name: 'Variante 2', description: 'Velocidad media, ondas pronunciadas' },
      variant3: { name: 'Variante 3', description: 'Ondas gruesas pesadas' },
      variant4: { name: 'Variante 4', description: 'Ondas pequeñas frecuentes' },
      variant5: { name: 'Variante 5', description: 'Ondas grandes lentas' },
      variant6: { name: 'Variante 6', description: 'Flujos rápidos' },
      variant7: { name: 'Variante 7', description: 'Ondas con reflejos fuertes' },
      variant8: { name: 'Variante 8', description: 'Ondas multicapa complejas' },
    },
    gallery: {
      tagline: 'LIVING GALLERY',
      title: 'Vitrina de Soluciones Visuales y Técnicas',
      description: 'Aquí estarán los artefactos: interfaces, texturas, formas, videos y prototipos. Mientras se preparan los materiales, dejamos la arquitectura de la página y espacios para cada disciplina.',
      ctaButton: 'Solicitar Muestra de Casos',
      apps: {
        accent: 'Prototipos Interactivos',
        title: 'Aplicaciones y Ecosistemas',
        description: 'Cinematografía UI/UX: prototipos en vivo, dashboards complejos, interacciones 3D. Mostrar la profundidad de la lógica del producto y la arquitectura de ingeniería sin números, a través del lenguaje de interfaz.',
      },
      fashion: {
        accent: 'Formas Paramétricas',
        title: 'Moda Digital',
        description: 'Colecciones como código: esculturas de tela 3D, guardarropas de avatar, texturas, simulaciones de movimiento. Transición del concepto al patrón de producción.',
      },
      architecture: {
        accent: 'Espacios Paramétricos',
        title: 'Arquitectura y Entornos',
        description: 'Morfología de fachadas, interiores-algoritmos, escenarios de luz. Gemelos virtuales e instalaciones físicas con reglas de código de forma.',
      },
      video: {
        accent: 'Cinematografía del Futuro',
        title: 'Video / CGI / Motion',
        description: 'CGI, gráficos en movimiento, películas de producto, cinemagraphs. Narrativas que ensamblan el producto en una historia tangible.',
      },
      research: {
        accent: 'Prototipos Científicos',
        title: 'R&D / Laboratorio',
        description: 'Nuevos materiales, sensores interactivos, pruebas blockchain o AI. Experimento puro: diagramas, 3D, demos cortos.',
      },
    },
    visual: {
      title: 'Referencias Visuales',
      description: 'Visuales animados interactivos para ver y seleccionar referencias',
      filterAll: 'Todo',
      filterJpg: 'JPG',
      filterPng: 'PNG',
      download: 'Descargar',
      close: 'Cerrar',
      next: 'Siguiente',
      prev: 'Anterior',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
    },
    projects: {
      civilizationProtocol: {
        heroTitle: 'CIVILIZATION PROTOCOL',
        heroDescription: 'Plataforma ciberfísica descentralizada para la gestión de recursos hídricos a través de blockchain',
        presentationLink: 'Presentación de Inversión',
        blockTitle: 'CLICK FOR DETAILS →',
        clickForDetails: 'CLIC PARA DETALLES →',
        platformArchitecture: {
          title: 'Arquitectura de Plataforma',
          description: 'Sistema ciberfísico de 12 niveles desde sensores IoT hasta la red global. Escalable, seguro, descentralizado.',
        },
        tokenomics: {
          title: 'Tokenomics',
          description: 'Tokens VOD, staking, recompensas y mecanismos de gobernanza.',
        },
        daoGovernance: {
          title: 'Gobernanza DAO',
          description: 'Organización autónoma descentralizada para la gestión de la plataforma.',
        },
        iotAiMonitoring: {
          title: 'Monitoreo IoT y AI',
          description: 'Sensores inteligentes y análisis impulsados por IA para recursos hídricos.',
        },
        waterTokenization: {
          title: 'Tokenización del Agua',
          description: 'Activos digitales que representan recursos hídricos e infraestructura.',
        },
        globalMarketplace: {
          title: 'Mercado Global',
          description: 'Plataforma de comercio para activos y datos relacionados con el agua.',
        },
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
    presentation: {
      back: 'Wstecz',
      introduction: 'Wprowadzenie',
      whitepaper: 'Dokumentacja techniczna',
      next: 'Dalej',
      prev: 'Wstecz',
      investmentPresentation: 'Prezentacja inwestycyjna',
      architecture: 'Architektura',
      totalBudget: 'Całkowity Budżet',
      invested: 'Zainwestowano',
      remaining: 'Pozostało',
      budgetAllocation: 'Alokacja Budżetu',
      allocated: 'Przydzielono',
      spent: 'Wydano',
      breakdown: 'Szczegóły',
      ofTotal: 'z całkowitej',
      civilizationProtocol: {
        slides: {
          slide1: { title: 'Protokół Cywilizacji', subtitle: 'Zdecentralizowane zarządzanie wodą', content: 'Wprowadzenie do platformy' },
          slide2: { title: 'Architektura platformy', content: ['System 12-poziomowy', 'Od IoT do blockchain', 'Skalowalna infrastruktura'] },
          slide3: { title: 'Obiekty platformy', content: ['Zasoby wodne', 'Infrastruktura', 'Urządzenia IoT'] },
          slide4: { title: 'Podmioty platformy', content: ['Właściciele zasobów', 'Inwestorzy', 'Deweloperzy', 'Walidatorzy'] },
          slide5: { title: 'Produkty ekosystemu', content: ['Platforma VODeco', 'Tokeny VOD', 'Rynek danych'] },
          slide6: { title: 'Projekty ekosystemu', content: ['Zarządzanie wodą', 'Sieć globalna', 'Zarządzanie DAO'] },
          slide7: { title: 'Infrastruktura', content: ['Blockchain multi-chain', 'Usługi w chmurze', 'Mikrousługi'] },
          slide8: { title: 'Mapa drogowa', content: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'] },
        },
        roadmap: {
          item1: { period: 'Q1 2025', title: 'Uruchomienie MVP', description: 'Główne funkcje platformy' },
          item2: { period: 'Q2 2025', title: 'Ekspansja', description: 'Dodatkowe funkcje i skalowanie' },
          item3: { period: 'Q3 2025', title: 'Sieć globalna', description: 'Ekspansja międzynarodowa' },
          item4: { period: 'Q4 2025', title: 'Uruchomienie DAO', description: 'Zdecentralizowane zarządzanie' },
        },
      },
    },
    ecosystemsPage: {
      tagline: 'ECOSYSTEMS',
      title: 'EKOSYSTEMY',
      description: 'Tworzenie kompleksowych ekosystemów i platform: od planowania strategicznego i badań rynku do rozwoju architektury, wdrożenia i skalowania.',
      ctaButton: 'OMÓWIĆ PROJEKT',
      servicesTitle: 'USŁUGI',
      service1: {
        title: 'Badania i Strategia',
        description: 'Kompleksowe badanie rynku, użytkowników i możliwości technologicznych w celu budowy strategii rozwoju ekosystemu.',
        features: ['Badanie rynku', 'Analiza użytkowników', 'Audyt technologiczny', 'Planowanie strategiczne'],
      },
      service2: {
        title: 'Architektura Rozwiązania',
        description: 'Projektowanie skalowalnej architektury ekosystemu z uwzględnieniem integracji, bezpieczeństwa i wydajności.',
        features: ['Architektura systemu', 'Mikrousługi', 'Projektowanie API', 'Integracje'],
      },
      service3: {
        title: 'Rozwój Platformy',
        description: 'Realizacja kompleksowej platformy z wieloma serwisami, modułami i integracjami.',
        features: ['Rozwój serwisów', 'Integracje', 'Panele administracyjne', 'Analityka'],
      },
      service4: {
        title: 'Skalowanie',
        description: 'Wsparcie wzrostu ekosystemu: optymalizacja wydajności, dodawanie nowych funkcji i serwisów.',
        features: ['Optymalizacja', 'Skalowanie', 'Nowe funkcje', 'Wsparcie'],
      },
      processTitle: 'PROCES PRACY',
      step1: { step: '01', title: 'Badania', desc: 'Głęboka analiza rynku i użytkowników' },
      step2: { step: '02', title: 'Architektura', desc: 'Projektowanie systemu i integracji' },
      step3: { step: '03', title: 'Rozwój', desc: 'Realizacja platformy i serwisów' },
      step4: { step: '04', title: 'Uruchomienie', desc: 'Wdrożenie, skalowanie i wsparcie' },
      ctaTitle: 'GOTOWI DO STARTU?',
      ctaDescription: 'Omówmy Twój projekt i zaproponujmy optymalne rozwiązanie.',
      ctaButton2: 'SKONTAKTUJ SIĘ',
    },
    webAppPage: {
      tagline: 'WEB & APP DEVELOPMENT',
      title: 'STRONY I',
      titleHighlight: 'APLIKACJE',
      description: 'Tworzenie stron internetowych, aplikacji webowych, aplikacji mobilnych. Nowoczesny stos technologiczny: React, Next.js, React Native, Node.js.',
      ctaButton: 'OMÓWIĆ PROJEKT',
      servicesTitle: 'USŁUGI',
      service1: {
        title: 'Strony Internetowe',
        description: 'Tworzenie nowoczesnych stron internetowych z naciskiem na wydajność, SEO i doświadczenie użytkownika.',
        features: ['Strony korporacyjne', 'Strony docelowe', 'Portfolio', 'Blogi i CMS'],
      },
      service2: {
        title: 'Aplikacje Webowe',
        description: 'Tworzenie aplikacji webowych o wysokim obciążeniu przy użyciu nowoczesnych technologii i najlepszych praktyk.',
        features: ['SPA / SSR / SSG', 'Aplikacje PWA', 'Pulpity nawigacyjne', 'Panele administracyjne'],
      },
      service3: {
        title: 'Aplikacje Mobilne',
        description: 'Tworzenie natywnych i wieloplatformowych aplikacji mobilnych dla iOS i Android.',
        features: ['Aplikacje iOS', 'Aplikacje Android', 'React Native', 'Flutter'],
      },
      service4: {
        title: 'API i Integracje',
        description: 'Tworzenie RESTful i GraphQL API, integracja z zewnętrznymi serwisami i systemami.',
        features: ['REST API', 'GraphQL', 'Mikrousługi', 'Integracje'],
      },
      techTitle: 'TECHNOLOGIE',
      tech1: { name: 'React / Next.js', desc: 'Nowoczesny frontend' },
      tech2: { name: 'Node.js', desc: 'Programowanie po stronie serwera' },
      tech3: { name: 'TypeScript', desc: 'Bezpieczeństwo typów' },
      tech4: { name: 'PostgreSQL / MongoDB', desc: 'Bazy danych' },
      processTitle: 'PROCES PRACY',
      step1: { step: '01', title: 'Planowanie', desc: 'Analiza wymagań i projektowanie architektury' },
      step2: { step: '02', title: 'Rozwój', desc: 'Realizacja funkcjonalności i interfejsów' },
      step3: { step: '03', title: 'Testowanie', desc: 'QA, optymalizacja wydajności' },
      step4: { step: '04', title: 'Uruchomienie', desc: 'Wdrożenie, monitorowanie i wsparcie' },
      ctaTitle: 'GOTOWI DO STARTU?',
      ctaDescription: 'Omówmy Twój projekt i zaproponujmy optymalne rozwiązanie.',
      ctaButton2: 'SKONTAKTUJ SIĘ',
    },
    videoPage: {
      tagline: 'VIDEO & FILM',
      title: 'VIDEO I',
      titleHighlight: 'FILM',
      description: 'Produkcja wideo, film, motion design, komunikacja wizualna. Filmy promocyjne, wyjaśniające, wizualizacje 3D. Dla prezentacji, stron docelowych i mediów społecznościowych.',
      ctaButton: 'OMÓWIĆ PROJEKT',
      servicesTitle: 'USŁUGI',
      service1: {
        title: 'Produkcja Wideo',
        description: 'Pełny cykl tworzenia wideo: od koncepcji i scenariusza do nagrywania, montażu i postprodukcji.',
        features: ['Scenariusz i koncepcja', 'Nagrywanie', 'Montaż', 'Korekta kolorów'],
      },
      service2: {
        title: 'Film',
        description: 'Tworzenie krótkich i pełnometrażowych filmów, projektów dokumentalnych i treści wideo.',
        features: ['Krótkometrażowe filmy', 'Dokumentalne', 'Sztuka wideo', 'Film eksperymentalny'],
      },
      service3: {
        title: 'Motion Design',
        description: 'Tworzenie animowanej grafiki, tytułów, infografik i efektów wizualnych dla wideo.',
        features: ['Animacja', 'Tytuły i grafika', 'Infografiki', 'Efekty wizualne'],
      },
      service4: {
        title: 'Komunikacja Wizualna',
        description: 'Tworzenie rozwiązań wizualnych dla prezentacji, stron docelowych, mediów społecznościowych i reklamy.',
        features: ['Prezentacje', 'Filmy reklamowe', 'Filmy wyjaśniające', 'Media społecznościowe'],
      },
      processTitle: 'PROCES PRACY',
      step1: { step: '01', title: 'Koncepcja', desc: 'Rozwój pomysłu i scenariusza' },
      step2: { step: '02', title: 'Produkcja', desc: 'Nagrywanie i produkcja' },
      step3: { step: '03', title: 'Postprodukcja', desc: 'Montaż, korekta kolorów, dźwięk' },
      step4: { step: '04', title: 'Dostawa', desc: 'Wersja finalna i adaptacja' },
      ctaTitle: 'GOTOWI DO STARTU?',
      ctaDescription: 'Omówmy Twój projekt i zaproponujmy optymalne rozwiązanie.',
      ctaButton2: 'SKONTAKTUJ SIĘ',
    },
    marketingPage: {
      tagline: 'MARKETING & BRANDING',
      title: 'MARKETING I',
      titleHighlight: 'BRANDING',
      description: 'Marketing, promocja, branding, budowanie społeczności. Podejście oparte na danych, strategia treści, marketing wydajnościowy. Specjalizacja w marketingu krypto i Web3 PR.',
      ctaButton: 'OMÓWIĆ PROJEKT',
      servicesTitle: 'USŁUGI',
      service1: {
        title: 'Strategia Treści',
        description: 'Tworzenie kompleksowej strategii treści w celu przyciągnięcia i utrzymania docelowej publiczności.',
        features: ['Strategia treści', 'Plan treści', 'Copywriting', 'Redakcja'],
      },
      service2: {
        title: 'SMM i Media Społecznościowe',
        description: 'Zarządzanie obecnością w mediach społecznościowych, tworzenie społeczności i interakcja z publicznością.',
        features: ['Strategia SMM', 'Treści dla mediów społecznościowych', 'Zarządzanie społecznością', 'Marketing influencerów'],
      },
      service3: {
        title: 'Marketing Wydajnościowy',
        description: 'Podejście oparte na danych do marketingu z naciskiem na mierzalne wyniki i optymalizację konwersji.',
        features: ['Reklama', 'Analityka', 'Testy A/B', 'Optymalizacja konwersji'],
      },
      service4: {
        title: 'Marketing Krypto i Web3 PR',
        description: 'Specjalistyczny marketing dla projektów blockchain, kryptowalut i ekosystemów Web3.',
        features: ['Web3 PR', 'Marketing krypto', 'Budowanie społeczności', 'Marketing tokenów'],
      },
      processTitle: 'PROCES PRACY',
      step1: { step: '01', title: 'Analiza', desc: 'Badanie publiczności i konkurentów' },
      step2: { step: '02', title: 'Strategia', desc: 'Rozwój strategii marketingowej' },
      step3: { step: '03', title: 'Realizacja', desc: 'Uruchomienie kampanii i tworzenie treści' },
      step4: { step: '04', title: 'Optymalizacja', desc: 'Analiza wyników i poprawa' },
      ctaTitle: 'GOTOWI DO STARTU?',
      ctaDescription: 'Omówmy Twój projekt i zaproponujmy optymalne rozwiązanie.',
      ctaButton2: 'SKONTAKTUJ SIĘ',
    },
    designPage: {
      tagline: 'DESIGN & ARCHITECTURE',
      title: 'DESIGN I',
      titleHighlight: 'ARCHITEKTURA',
      description: 'Architektura rozwiązań, projektowanie interfejsów, tożsamość wizualna, branding. Od koncepcji do realizacji języka wizualnego i systemów projektowych.',
      ctaButton: 'OMÓWIĆ PROJEKT',
      servicesTitle: 'USŁUGI',
      service1: {
        title: 'Architektura Rozwiązań',
        description: 'Projektowanie architektury rozwiązań cyfrowych z uwzględnieniem skalowalności, wydajności i doświadczenia użytkownika.',
        features: ['Architektura systemu', 'Architektura UX', 'Architektura informacji', 'Projektowanie techniczne'],
      },
      service2: {
        title: 'Projektowanie Interfejsów',
        description: 'Tworzenie interfejsów, które konwertują i zapewniają doskonałe doświadczenie użytkownika na wszystkich urządzeniach.',
        features: ['Badania UX', 'Projektowanie UI', 'Prototypowanie', 'Systemy projektowe'],
      },
      service3: {
        title: 'Tożsamość Wizualna',
        description: 'Tworzenie tożsamości wizualnej i brandingu, które odzwierciedlają wartości firmy i są zapamiętywane przez publiczność.',
        features: ['Branding', 'Tożsamość', 'Wytyczne', 'Adaptacja do nośników'],
      },
      service4: {
        title: 'Branding',
        description: 'Tworzenie kompleksowego systemu marki od strategii do wizualnego wcielenia i komunikacji.',
        features: ['Strategia marki', 'Pozycjonowanie', 'Język wizualny', 'Księga marki'],
      },
      processTitle: 'PROCES PRACY',
      step1: { step: '01', title: 'Badania', desc: 'Analiza publiczności, konkurentów i kontekstu' },
      step2: { step: '02', title: 'Koncepcja', desc: 'Rozwój koncepcji i kierunku wizualnego' },
      step3: { step: '03', title: 'Design', desc: 'Tworzenie systemu projektowego i interfejsów' },
      step4: { step: '04', title: 'Realizacja', desc: 'Wsparcie podczas rozwoju i testowania' },
      ctaTitle: 'GOTOWI DO STARTU?',
      ctaDescription: 'Omówmy Twój projekt i zaproponujmy optymalne rozwiązanie.',
      ctaButton2: 'SKONTAKTUJ SIĘ',
    },
    businessPage: {
      tagline: 'BUSINESS & STRATEGY',
      title: 'BIZNES I',
      titleHighlight: 'STRATEGIA',
      description: 'Rozwój koncepcji biznesowych, planowanie strategiczne, modelowanie biznesowe. Od badań rynku i analizy konkurentów do budowania strategii rozwoju i skalowania.',
      ctaButton: 'OMÓWIĆ PROJEKT',
      servicesTitle: 'USŁUGI',
      service1: {
        title: 'Rozwój Koncepcji Biznesowych',
        description: 'Tworzenie kompleksowych koncepcji biznesowych w oparciu o głęboką analizę rynku, środowiska konkurencyjnego i potrzeb użytkowników.',
        features: ['Analiza rynku i konkurentów', 'Badania użytkowników', 'Rozwój koncepcji', 'Walidacja pomysłu'],
      },
      service2: {
        title: 'Planowanie Strategiczne',
        description: 'Budowanie długoterminowej strategii rozwoju biznesu z uwzględnieniem trendów rynkowych, możliwości technologicznych i celów biznesowych.',
        features: ['Analiza strategiczna', 'Definicja celów', 'Planowanie etapów', 'Roadmap rozwoju'],
      },
      service3: {
        title: 'Modelowanie Biznesowe',
        description: 'Projektowanie zrównoważonych modeli biznesowych z naciskiem na skalowalność, monetyzację i tworzenie wartości.',
        features: ['Model monetyzacji', 'Ekonomia jednostkowa', 'Scenariusze wzrostu', 'Planowanie finansowe'],
      },
      service4: {
        title: 'Analiza i Badania',
        description: 'Kompleksowa analiza rynku, konkurentów, użytkowników i możliwości technologicznych dla podejmowania świadomych decyzji.',
        features: ['Analiza rynku', 'Analiza konkurencyjna', 'Badania użytkowników', 'Audyt technologiczny'],
      },
      processTitle: 'PROCES PRACY',
      step1: { step: '01', title: 'Badania', desc: 'Głęboka analiza rynku, konkurentów i użytkowników' },
      step2: { step: '02', title: 'Koncepcja', desc: 'Rozwój koncepcji biznesowej i modelu' },
      step3: { step: '03', title: 'Strategia', desc: 'Budowanie strategii rozwoju i planu działania' },
      step4: { step: '04', title: 'Realizacja', desc: 'Wsparcie podczas realizacji i skalowania' },
      ctaTitle: 'GOTOWI DO STARTU?',
      ctaDescription: 'Omówmy Twój projekt i zaproponujmy optymalne rozwiązanie.',
      ctaButton2: 'SKONTAKTUJ SIĘ',
    },
    background: {
      title: 'WYBÓR TŁA',
      description: 'Wybierz wariant animowanego tła z atramentu',
      variant1: { name: 'Wariant 1', description: 'Powolne płynne fale' },
      variant2: { name: 'Wariant 2', description: 'Średnia prędkość, wyraźne fale' },
      variant3: { name: 'Wariant 3', description: 'Gęste ciężkie fale' },
      variant4: { name: 'Wariant 4', description: 'Małe częste fale' },
      variant5: { name: 'Wariant 5', description: 'Duże powolne fale' },
      variant6: { name: 'Wariant 6', description: 'Szybkie przepływy' },
      variant7: { name: 'Wariant 7', description: 'Fale z silnymi refleksami' },
      variant8: { name: 'Wariant 8', description: 'Złożone wielowarstwowe fale' },
    },
    gallery: {
      tagline: 'LIVING GALLERY',
      title: 'Witryna Rozwiązań Wizualnych i Technicznych',
      description: 'Artefakty będą tutaj: interfejsy, tekstury, formy, wideo i prototypy. Podczas gdy materiały są przygotowywane, pozostawiamy architekturę strony i sloty dla każdej dyscypliny.',
      ctaButton: 'Poproś o Pokaz Przypadków',
      apps: {
        accent: 'Prototypy Interaktywne',
        title: 'Aplikacje i Ekosystemy',
        description: 'Kinematografia UI/UX: żywe prototypy, złożone pulpity nawigacyjne, interakcje 3D. Pokaż głębię logiki produktu i architektury inżynierskiej bez liczb - poprzez język interfejsu.',
      },
      fashion: {
        accent: 'Formy Parametryczne',
        title: 'Moda Cyfrowa',
        description: 'Kolekcje jako kod: rzeźby tkanin 3D, garderoby awatarów, tekstury, symulacje ruchu. Przejście od koncepcji do wzorca produkcyjnego.',
      },
      architecture: {
        accent: 'Przestrzenie Parametryczne',
        title: 'Architektura i Środowiska',
        description: 'Morfologia fasad, wnętrza-algorytmy, scenariusze świetlne. Bliźniaki wirtualne i instalacje fizyczne z regułami kodu formy.',
      },
      video: {
        accent: 'Kinematografia Przyszłości',
        title: 'Wideo / CGI / Motion',
        description: 'CGI, grafika ruchu, filmy produktowe, cinemagraphy. Narracje, które składają produkt w namacalną historię.',
      },
      research: {
        accent: 'Prototypy Naukowe',
        title: 'R&D / Laboratorium',
        description: 'Nowe materiały, interaktywne czujniki, próby blockchain lub AI. Czysty eksperyment: diagramy, 3D, krótkie dema.',
      },
    },
    visual: {
      title: 'Referencje Wizualne',
      description: 'Interaktywne animowane wizualizacje do przeglądania i wyboru referencji',
      filterAll: 'Wszystko',
      filterJpg: 'JPG',
      filterPng: 'PNG',
      download: 'Pobierz',
      close: 'Zamknij',
      next: 'Następny',
      prev: 'Poprzedni',
      zoomIn: 'Przybliż',
      zoomOut: 'Oddal',
    },
    projects: {
      civilizationProtocol: {
        heroTitle: 'CIVILIZATION PROTOCOL',
        heroDescription: 'Zdecentralizowana platforma cyber-fizyczna do zarządzania zasobami wodnymi poprzez blockchain',
        presentationLink: 'Prezentacja Inwestycyjna',
        blockTitle: 'CLICK FOR DETAILS →',
        clickForDetails: 'KLIKNIJ PO SZCZEGÓŁY →',
        platformArchitecture: {
          title: 'Architektura Platformy',
          description: '12-poziomowy system cyber-fizyczny od czujników IoT do sieci globalnej. Skalowalny, bezpieczny, zdecentralizowany.',
        },
        tokenomics: {
          title: 'Tokenomics',
          description: 'Tokeny VOD, staking, nagrody i mechanizmy zarządzania.',
        },
        daoGovernance: {
          title: 'Zarządzanie DAO',
          description: 'Zdecentralizowana autonomiczna organizacja do zarządzania platformą.',
        },
        iotAiMonitoring: {
          title: 'Monitoring IoT i AI',
          description: 'Inteligentne czujniki i analityka oparta na AI dla zasobów wodnych.',
        },
        waterTokenization: {
          title: 'Tokenizacja Wody',
          description: 'Aktywa cyfrowe reprezentujące zasoby wodne i infrastrukturę.',
        },
        globalMarketplace: {
          title: 'Globalny Rynek',
          description: 'Platforma handlowa dla aktywów i danych związanych z wodą.',
        },
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
    presentation: {
      back: 'Retour',
      introduction: 'Introduction',
      whitepaper: 'Livre blanc',
      next: 'Suivant',
      prev: 'Précédent',
      investmentPresentation: 'Présentation d\'investissement',
      architecture: 'Architecture',
      totalBudget: 'Budget Total',
      invested: 'Investi',
      remaining: 'Restant',
      budgetAllocation: 'Allocation du Budget',
      allocated: 'Alloué',
      spent: 'Dépensé',
      breakdown: 'Répartition',
      ofTotal: 'du total',
      civilizationProtocol: {
        slides: {
          slide1: { title: 'Protocole de Civilisation', subtitle: 'Gestion décentralisée de l\'eau', content: 'Introduction à la plateforme' },
          slide2: { title: 'Architecture de la plateforme', content: ['Système à 12 niveaux', 'De l\'IoT à la blockchain', 'Infrastructure évolutive'] },
          slide3: { title: 'Objets de la plateforme', content: ['Ressources en eau', 'Infrastructure', 'Appareils IoT'] },
          slide4: { title: 'Sujets de la plateforme', content: ['Propriétaires de ressources', 'Investisseurs', 'Développeurs', 'Validateurs'] },
          slide5: { title: 'Produits de l\'écosystème', content: ['Plateforme VODeco', 'Jetons VOD', 'Marché des données'] },
          slide6: { title: 'Projets de l\'écosystème', content: ['Gestion de l\'eau', 'Réseau mondial', 'Gouvernance DAO'] },
          slide7: { title: 'Infrastructure', content: ['Blockchain multi-chaînes', 'Services cloud', 'Microservices'] },
          slide8: { title: 'Feuille de route', content: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'] },
        },
        roadmap: {
          item1: { period: 'Q1 2025', title: 'Lancement MVP', description: 'Fonctionnalités principales de la plateforme' },
          item2: { period: 'Q2 2025', title: 'Expansion', description: 'Fonctionnalités supplémentaires et mise à l\'échelle' },
          item3: { period: 'Q3 2025', title: 'Réseau mondial', description: 'Expansion internationale' },
          item4: { period: 'Q4 2025', title: 'Lancement DAO', description: 'Gouvernance décentralisée' },
        },
      },
    },
    ecosystemsPage: {
      tagline: 'ECOSYSTEMS',
      title: 'ÉCOSYSTÈMES',
      description: 'Création d\'écosystèmes et de plateformes complets: de la planification stratégique et de la recherche de marché au développement d\'architecture, à l\'implémentation et à la mise à l\'échelle.',
      ctaButton: 'DISCUTER LE PROJET',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Recherche et Stratégie',
        description: 'Recherche complète du marché, des utilisateurs et des capacités technologiques pour construire la stratégie de développement de l\'écosystème.',
        features: ['Recherche de marché', 'Analyse des utilisateurs', 'Audit technologique', 'Planification stratégique'],
      },
      service2: {
        title: 'Architecture de Solution',
        description: 'Conception d\'une architecture d\'écosystème scalable en tenant compte des intégrations, de la sécurité et des performances.',
        features: ['Architecture système', 'Microservices', 'Conception API', 'Intégrations'],
      },
      service3: {
        title: 'Développement de Plateforme',
        description: 'Implémentation d\'une plateforme complète avec plusieurs services, modules et intégrations.',
        features: ['Développement de services', 'Intégrations', 'Panneaux d\'administration', 'Analytique'],
      },
      service4: {
        title: 'Mise à l\'échelle',
        description: 'Soutien à la croissance de l\'écosystème: optimisation des performances, ajout de nouvelles fonctionnalités et services.',
        features: ['Optimisation', 'Mise à l\'échelle', 'Nouvelles fonctionnalités', 'Support'],
      },
      processTitle: 'PROCESSUS DE TRAVAIL',
      step1: { step: '01', title: 'Recherche', desc: 'Analyse approfondie du marché et des utilisateurs' },
      step2: { step: '02', title: 'Architecture', desc: 'Conception du système et des intégrations' },
      step3: { step: '03', title: 'Développement', desc: 'Implémentation de la plateforme et des services' },
      step4: { step: '04', title: 'Lancement', desc: 'Déploiement, mise à l\'échelle et support' },
      ctaTitle: 'PRÊT À COMMENCER?',
      ctaDescription: 'Discutons de votre projet et proposons une solution optimale.',
      ctaButton2: 'CONTACTER',
    },
    webAppPage: {
      tagline: 'WEB & APP DEVELOPMENT',
      title: 'SITES WEB ET',
      titleHighlight: 'APPLICATIONS',
      description: 'Développement de sites web, applications web, applications mobiles. Stack technologique moderne: React, Next.js, React Native, Node.js.',
      ctaButton: 'DISCUTER LE PROJET',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Sites Web',
        description: 'Développement de sites web modernes axés sur les performances, le SEO et l\'expérience utilisateur.',
        features: ['Sites d\'entreprise', 'Pages d\'atterrissage', 'Portfolios', 'Blogs et CMS'],
      },
      service2: {
        title: 'Applications Web',
        description: 'Création d\'applications web haute performance utilisant des technologies modernes et les meilleures pratiques.',
        features: ['SPA / SSR / SSG', 'Applications PWA', 'Tableaux de bord', 'Panneaux d\'administration'],
      },
      service3: {
        title: 'Applications Mobiles',
        description: 'Développement d\'applications mobiles natives et multiplateformes pour iOS et Android.',
        features: ['Applications iOS', 'Applications Android', 'React Native', 'Flutter'],
      },
      service4: {
        title: 'API et Intégrations',
        description: 'Développement d\'API RESTful et GraphQL, intégration avec des services et systèmes externes.',
        features: ['REST API', 'GraphQL', 'Microservices', 'Intégrations'],
      },
      techTitle: 'TECHNOLOGIES',
      tech1: { name: 'React / Next.js', desc: 'Frontend moderne' },
      tech2: { name: 'Node.js', desc: 'Développement côté serveur' },
      tech3: { name: 'TypeScript', desc: 'Sécurité des types' },
      tech4: { name: 'PostgreSQL / MongoDB', desc: 'Bases de données' },
      processTitle: 'PROCESSUS DE TRAVAIL',
      step1: { step: '01', title: 'Planification', desc: 'Analyse des exigences et conception de l\'architecture' },
      step2: { step: '02', title: 'Développement', desc: 'Implémentation de la fonctionnalité et des interfaces' },
      step3: { step: '03', title: 'Tests', desc: 'QA, optimisation des performances' },
      step4: { step: '04', title: 'Lancement', desc: 'Déploiement, surveillance et support' },
      ctaTitle: 'PRÊT À COMMENCER?',
      ctaDescription: 'Discutons de votre projet et proposons une solution optimale.',
      ctaButton2: 'CONTACTER',
    },
    videoPage: {
      tagline: 'VIDEO & FILM',
      title: 'VIDÉO ET',
      titleHighlight: 'CINÉMA',
      description: 'Production vidéo, cinéma, motion design, communications visuelles. Vidéos promotionnelles, explicatives, visualisations 3D. Pour présentations, pages d\'atterrissage et réseaux sociaux.',
      ctaButton: 'DISCUTER LE PROJET',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Production Vidéo',
        description: 'Cycle complet de création vidéo: du concept et du scénario au tournage, montage et post-production.',
        features: ['Scénario et concept', 'Tournage', 'Montage', 'Étalonnage'],
      },
      service2: {
        title: 'Cinéma',
        description: 'Création de courts et longs métrages, projets documentaires et contenu vidéo.',
        features: ['Courts métrages', 'Documentaires', 'Art vidéo', 'Cinéma expérimental'],
      },
      service3: {
        title: 'Motion Design',
        description: 'Création de graphiques animés, titres, infographies et effets visuels pour vidéo.',
        features: ['Animation', 'Titres et graphiques', 'Infographies', 'Effets visuels'],
      },
      service4: {
        title: 'Communications Visuelles',
        description: 'Développement de solutions visuelles pour présentations, pages d\'atterrissage, réseaux sociaux et publicité.',
        features: ['Présentations', 'Vidéos publicitaires', 'Vidéos explicatives', 'Réseaux sociaux'],
      },
      processTitle: 'PROCESSUS DE TRAVAIL',
      step1: { step: '01', title: 'Concept', desc: 'Développement de l\'idée et du scénario' },
      step2: { step: '02', title: 'Production', desc: 'Tournage et production' },
      step3: { step: '03', title: 'Post-Production', desc: 'Montage, étalonnage, son' },
      step4: { step: '04', title: 'Livraison', desc: 'Version finale et adaptation' },
      ctaTitle: 'PRÊT À COMMENCER?',
      ctaDescription: 'Discutons de votre projet et proposons une solution optimale.',
      ctaButton2: 'CONTACTER',
    },
    marketingPage: {
      tagline: 'MARKETING & BRANDING',
      title: 'MARKETING ET',
      titleHighlight: 'BRANDING',
      description: 'Marketing, promotion, branding, construction de communautés. Approche basée sur les données, stratégie de contenu, marketing de performance. Spécialisation en marketing crypto et Web3 PR.',
      ctaButton: 'DISCUTER LE PROJET',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Stratégie de Contenu',
        description: 'Développement d\'une stratégie de contenu complète pour attirer et retenir le public cible.',
        features: ['Stratégie de contenu', 'Plan de contenu', 'Rédaction', 'Édition'],
      },
      service2: {
        title: 'SMM et Réseaux Sociaux',
        description: 'Gestion de la présence sur les réseaux sociaux, création de communautés et interaction avec le public.',
        features: ['Stratégie SMM', 'Contenu pour réseaux sociaux', 'Gestion de communauté', 'Marketing d\'influence'],
      },
      service3: {
        title: 'Marketing de Performance',
        description: 'Approche basée sur les données du marketing axée sur les résultats mesurables et l\'optimisation des conversions.',
        features: ['Publicité', 'Analytique', 'Tests A/B', 'Optimisation des conversions'],
      },
      service4: {
        title: 'Marketing Crypto et Web3 PR',
        description: 'Marketing spécialisé pour projets blockchain, cryptomonnaies et écosystèmes Web3.',
        features: ['Web3 PR', 'Marketing crypto', 'Construction de communauté', 'Marketing de tokens'],
      },
      processTitle: 'PROCESSUS DE TRAVAIL',
      step1: { step: '01', title: 'Analyse', desc: 'Recherche sur le public et les concurrents' },
      step2: { step: '02', title: 'Stratégie', desc: 'Développement de la stratégie marketing' },
      step3: { step: '03', title: 'Implémentation', desc: 'Lancement de campagnes et création de contenu' },
      step4: { step: '04', title: 'Optimisation', desc: 'Analyse des résultats et amélioration' },
      ctaTitle: 'PRÊT À COMMENCER?',
      ctaDescription: 'Discutons de votre projet et proposons une solution optimale.',
      ctaButton2: 'CONTACTER',
    },
    designPage: {
      tagline: 'DESIGN & ARCHITECTURE',
      title: 'DESIGN ET',
      titleHighlight: 'ARCHITECTURE',
      description: 'Architecture de solutions, design d\'interfaces, identité visuelle, branding. Du concept à l\'implémentation du langage visuel et des systèmes de design.',
      ctaButton: 'DISCUTER LE PROJET',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Architecture de Solutions',
        description: 'Conception d\'architecture de solutions numériques en tenant compte de l\'évolutivité, des performances et de l\'expérience utilisateur.',
        features: ['Architecture système', 'Architecture UX', 'Architecture de l\'information', 'Conception technique'],
      },
      service2: {
        title: 'Design d\'Interfaces',
        description: 'Création d\'interfaces qui convertissent et offrent une excellente expérience utilisateur sur tous les appareils.',
        features: ['Recherche UX', 'Design UI', 'Prototypage', 'Systèmes de design'],
      },
      service3: {
        title: 'Identité Visuelle',
        description: 'Développement d\'identité visuelle et de branding qui reflètent les valeurs de l\'entreprise et sont mémorables pour le public.',
        features: ['Branding', 'Identité', 'Lignes directrices', 'Adaptation aux médias'],
      },
      service4: {
        title: 'Branding',
        description: 'Création d\'un système de marque complet de la stratégie à l\'incarnation visuelle et aux communications.',
        features: ['Stratégie de marque', 'Positionnement', 'Langage visuel', 'Manuel de marque'],
      },
      processTitle: 'PROCESSUS DE TRAVAIL',
      step1: { step: '01', title: 'Recherche', desc: 'Analyse du public, des concurrents et du contexte' },
      step2: { step: '02', title: 'Concept', desc: 'Développement du concept et de la direction visuelle' },
      step3: { step: '03', title: 'Design', desc: 'Création du système de design et des interfaces' },
      step4: { step: '04', title: 'Implémentation', desc: 'Support pendant le développement et les tests' },
      ctaTitle: 'PRÊT À COMMENCER?',
      ctaDescription: 'Discutons de votre projet et proposons une solution optimale.',
      ctaButton2: 'CONTACTER',
    },
    businessPage: {
      tagline: 'BUSINESS & STRATEGY',
      title: 'BUSINESS ET',
      titleHighlight: 'STRATÉGIE',
      description: 'Développement de concepts d\'affaires, planification stratégique, modélisation d\'affaires. De la recherche de marché et de l\'analyse des concurrents à la construction de la stratégie de développement et de mise à l\'échelle.',
      ctaButton: 'DISCUTER LE PROJET',
      servicesTitle: 'SERVICES',
      service1: {
        title: 'Développement de Concepts d\'Affaires',
        description: 'Création de concepts d\'affaires complets basés sur une analyse approfondie du marché, de l\'environnement concurrentiel et des besoins des utilisateurs.',
        features: ['Analyse du marché et des concurrents', 'Recherche utilisateurs', 'Développement de concept', 'Validation d\'idée'],
      },
      service2: {
        title: 'Planification Stratégique',
        description: 'Construction d\'une stratégie de développement d\'affaires à long terme en tenant compte des tendances du marché, des capacités technologiques et des objectifs commerciaux.',
        features: ['Analyse stratégique', 'Définition des objectifs', 'Planification des étapes', 'Feuille de route de développement'],
      },
      service3: {
        title: 'Modélisation d\'Affaires',
        description: 'Conception de modèles d\'affaires durables axés sur l\'évolutivité, la monétisation et la création de valeur.',
        features: ['Modèle de monétisation', 'Économie unitaire', 'Scénarios de croissance', 'Planification financière'],
      },
      service4: {
        title: 'Analyse et Recherche',
        description: 'Analyse complète du marché, des concurrents, des utilisateurs et des capacités technologiques pour une prise de décision éclairée.',
        features: ['Analyse du marché', 'Analyse concurrentielle', 'Recherche utilisateurs', 'Audit technologique'],
      },
      processTitle: 'PROCESSUS DE TRAVAIL',
      step1: { step: '01', title: 'Recherche', desc: 'Analyse approfondie du marché, des concurrents et des utilisateurs' },
      step2: { step: '02', title: 'Concept', desc: 'Développement du concept et du modèle d\'affaires' },
      step3: { step: '03', title: 'Stratégie', desc: 'Construction de la stratégie de développement et du plan d\'action' },
      step4: { step: '04', title: 'Implémentation', desc: 'Support pendant l\'implémentation et la mise à l\'échelle' },
      ctaTitle: 'PRÊT À COMMENCER?',
      ctaDescription: 'Discutons de votre projet et proposons une solution optimale.',
      ctaButton2: 'CONTACTER',
    },
    background: {
      title: 'SÉLECTION DU FOND',
      description: 'Sélectionnez une variante de fond d\'encre animé',
      variant1: { name: 'Variante 1', description: 'Vagues lentes douces' },
      variant2: { name: 'Variante 2', description: 'Vitesse moyenne, vagues prononcées' },
      variant3: { name: 'Variante 3', description: 'Vagues épaisses lourdes' },
      variant4: { name: 'Variante 4', description: 'Petites vagues fréquentes' },
      variant5: { name: 'Variante 5', description: 'Grandes vagues lentes' },
      variant6: { name: 'Variante 6', description: 'Flux rapides' },
      variant7: { name: 'Variante 7', description: 'Vagues avec reflets forts' },
      variant8: { name: 'Variante 8', description: 'Vagues multicouches complexes' },
    },
    gallery: {
      tagline: 'LIVING GALLERY',
      title: 'Vitrine de Solutions Visuelles et Techniques',
      description: 'Les artefacts seront ici: interfaces, textures, formes, vidéos et prototypes. Pendant que les matériaux sont préparés, nous laissons l\'architecture de la page et les emplacements pour chaque discipline.',
      ctaButton: 'Demander une Présentation de Cas',
      apps: {
        accent: 'Prototypes Interactifs',
        title: 'Applications et Écosystèmes',
        description: 'Cinématographie UI/UX: prototypes vivants, tableaux de bord complexes, interactions 3D. Montrer la profondeur de la logique produit et de l\'architecture d\'ingénierie sans chiffres - à travers le langage d\'interface.',
      },
      fashion: {
        accent: 'Formes Paramétriques',
        title: 'Mode Numérique',
        description: 'Collections comme code: sculptures de tissu 3D, garde-robes d\'avatars, textures, simulations de mouvement. Transition du concept au motif de production.',
      },
      architecture: {
        accent: 'Espaces Paramétriques',
        title: 'Architecture et Environnements',
        description: 'Morphologie des façades, intérieurs-algorithmes, scénarios lumineux. Jumeaux virtuels et installations physiques avec règles de code de forme.',
      },
      video: {
        accent: 'Cinématographie du Futur',
        title: 'Vidéo / CGI / Motion',
        description: 'CGI, graphiques animés, films produits, cinémagraphs. Narrations qui assemblent le produit en une histoire tangible.',
      },
      research: {
        accent: 'Prototypes Scientifiques',
        title: 'R&D / Laboratoire',
        description: 'Nouveaux matériaux, capteurs interactifs, sondes blockchain ou IA. Expérience pure: diagrammes, 3D, démos courtes.',
      },
    },
    visual: {
      title: 'Références Visuelles',
      description: 'Visuels animés interactifs pour visualiser et sélectionner des références',
      filterAll: 'Tout',
      filterJpg: 'JPG',
      filterPng: 'PNG',
      download: 'Télécharger',
      close: 'Fermer',
      next: 'Suivant',
      prev: 'Précédent',
      zoomIn: 'Zoomer',
      zoomOut: 'Dézoomer',
    },
    projects: {
      civilizationProtocol: {
        heroTitle: 'CIVILIZATION PROTOCOL',
        heroDescription: 'Plateforme cyber-physique décentralisée pour la gestion des ressources en eau via blockchain',
        presentationLink: 'Présentation d\'Investissement',
        blockTitle: 'CLICK FOR DETAILS →',
        clickForDetails: 'CLIQUER POUR DÉTAILS →',
        platformArchitecture: {
          title: 'Architecture de Plateforme',
          description: 'Système cyber-physique à 12 niveaux des capteurs IoT au réseau global. Scalable, sécurisé, décentralisé.',
        },
        tokenomics: {
          title: 'Tokenomics',
          description: 'Jetons VOD, staking, récompenses et mécanismes de gouvernance.',
        },
        daoGovernance: {
          title: 'Gouvernance DAO',
          description: 'Organisation autonome décentralisée pour la gestion de la plateforme.',
        },
        iotAiMonitoring: {
          title: 'Surveillance IoT et AI',
          description: 'Capteurs intelligents et analyses alimentées par l\'IA pour les ressources en eau.',
        },
        waterTokenization: {
          title: 'Tokenisation de l\'Eau',
          description: 'Actifs numériques représentant les ressources en eau et l\'infrastructure.',
        },
        globalMarketplace: {
          title: 'Marché Mondial',
          description: 'Plateforme de trading pour les actifs et données liés à l\'eau.',
        },
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
    presentation: {
      back: 'Zurück',
      introduction: 'Einführung',
      whitepaper: 'Whitepaper',
      next: 'Weiter',
      prev: 'Zurück',
      investmentPresentation: 'Investitionspräsentation',
      architecture: 'Architektur',
      totalBudget: 'Gesamtbudget',
      invested: 'Investiert',
      remaining: 'Verbleibend',
      budgetAllocation: 'Budgetzuweisung',
      allocated: 'Zugewiesen',
      spent: 'Ausgegeben',
      breakdown: 'Aufschlüsselung',
      ofTotal: 'von insgesamt',
      civilizationProtocol: {
        slides: {
          slide1: { title: 'Zivilisationsprotokoll', subtitle: 'Dezentrales Wassermanagement', content: 'Einführung in die Plattform' },
          slide2: { title: 'Plattformarchitektur', content: ['12-stufiges System', 'Von IoT zu Blockchain', 'Skalierbare Infrastruktur'] },
          slide3: { title: 'Plattformobjekte', content: ['Wasserressourcen', 'Infrastruktur', 'IoT-Geräte'] },
          slide4: { title: 'Plattformsubjekte', content: ['Ressourcenbesitzer', 'Investoren', 'Entwickler', 'Validatoren'] },
          slide5: { title: 'Ökosystemprodukte', content: ['VODeco-Plattform', 'VOD-Token', 'Datenmarktplatz'] },
          slide6: { title: 'Ökosystemprojekte', content: ['Wassermanagement', 'Globales Netzwerk', 'DAO-Governance'] },
          slide7: { title: 'Infrastruktur', content: ['Multi-Chain-Blockchain', 'Cloud-Dienste', 'Microservices'] },
          slide8: { title: 'Roadmap', content: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'] },
        },
        roadmap: {
          item1: { period: 'Q1 2025', title: 'MVP-Start', description: 'Hauptfunktionen der Plattform' },
          item2: { period: 'Q2 2025', title: 'Expansion', description: 'Zusätzliche Funktionen und Skalierung' },
          item3: { period: 'Q3 2025', title: 'Globales Netzwerk', description: 'Internationale Expansion' },
          item4: { period: 'Q4 2025', title: 'DAO-Start', description: 'Dezentrale Governance' },
        },
      },
    },
    ecosystemsPage: {
      tagline: 'ECOSYSTEMS',
      title: 'ÖKOSYSTEME',
      description: 'Schaffung umfassender Ökosysteme und Plattformen: von strategischer Planung und Marktforschung bis zur Architekturentwicklung, Implementierung und Skalierung.',
      ctaButton: 'PROJEKT DISKUTIEREN',
      servicesTitle: 'DIENSTLEISTUNGEN',
      service1: {
        title: 'Forschung und Strategie',
        description: 'Umfassende Erforschung von Markt, Nutzern und technologischen Möglichkeiten zur Entwicklung einer Ökosystem-Entwicklungsstrategie.',
        features: ['Marktforschung', 'Nutzeranalyse', 'Technologieaudit', 'Strategische Planung'],
      },
      service2: {
        title: 'Lösungsarchitektur',
        description: 'Entwurf einer skalierbaren Ökosystemarchitektur unter Berücksichtigung von Integrationen, Sicherheit und Leistung.',
        features: ['Systemarchitektur', 'Mikrodienste', 'API-Design', 'Integrationen'],
      },
      service3: {
        title: 'Plattformentwicklung',
        description: 'Implementierung einer umfassenden Plattform mit mehreren Diensten, Modulen und Integrationen.',
        features: ['Dienstentwicklung', 'Integrationen', 'Admin-Panels', 'Analytik'],
      },
      service4: {
        title: 'Skalierung',
        description: 'Unterstützung des Ökosystemwachstums: Leistungsoptimierung, Hinzufügen neuer Funktionen und Dienste.',
        features: ['Optimierung', 'Skalierung', 'Neue Funktionen', 'Support'],
      },
      processTitle: 'ARBEITSPROZESS',
      step1: { step: '01', title: 'Forschung', desc: 'Tiefgreifende Markt- und Nutzeranalyse' },
      step2: { step: '02', title: 'Architektur', desc: 'System- und Integrationsdesign' },
      step3: { step: '03', title: 'Entwicklung', desc: 'Plattform- und Dienstimplementierung' },
      step4: { step: '04', title: 'Start', desc: 'Bereitstellung, Skalierung und Support' },
      ctaTitle: 'BEREIT ZU STARTEN?',
      ctaDescription: 'Lassen Sie uns Ihr Projekt diskutieren und eine optimale Lösung vorschlagen.',
      ctaButton2: 'KONTAKTIEREN',
    },
    webAppPage: {
      tagline: 'WEB & APP DEVELOPMENT',
      title: 'WEBSITES UND',
      titleHighlight: 'ANWENDUNGEN',
      description: 'Entwicklung von Websites, Webanwendungen, mobilen Anwendungen. Moderner Technologie-Stack: React, Next.js, React Native, Node.js.',
      ctaButton: 'PROJEKT DISKUTIEREN',
      servicesTitle: 'DIENSTLEISTUNGEN',
      service1: {
        title: 'Websites',
        description: 'Entwicklung moderner Websites mit Fokus auf Leistung, SEO und Benutzererfahrung.',
        features: ['Unternehmenswebsites', 'Landingpages', 'Portfolios', 'Blogs und CMS'],
      },
      service2: {
        title: 'Webanwendungen',
        description: 'Erstellung hochbelastbarer Webanwendungen mit modernen Technologien und Best Practices.',
        features: ['SPA / SSR / SSG', 'PWA-Anwendungen', 'Dashboards', 'Admin-Panels'],
      },
      service3: {
        title: 'Mobile Anwendungen',
        description: 'Entwicklung nativer und plattformübergreifender mobiler Anwendungen für iOS und Android.',
        features: ['iOS-Anwendungen', 'Android-Anwendungen', 'React Native', 'Flutter'],
      },
      service4: {
        title: 'API und Integrationen',
        description: 'Entwicklung von RESTful- und GraphQL-APIs, Integration mit externen Diensten und Systemen.',
        features: ['REST API', 'GraphQL', 'Mikrodienste', 'Integrationen'],
      },
      techTitle: 'TECHNOLOGIEN',
      tech1: { name: 'React / Next.js', desc: 'Modernes Frontend' },
      tech2: { name: 'Node.js', desc: 'Serverseitige Entwicklung' },
      tech3: { name: 'TypeScript', desc: 'Typsicherheit' },
      tech4: { name: 'PostgreSQL / MongoDB', desc: 'Datenbanken' },
      processTitle: 'ARBEITSPROZESS',
      step1: { step: '01', title: 'Planung', desc: 'Anforderungsanalyse und Architekturentwurf' },
      step2: { step: '02', title: 'Entwicklung', desc: 'Implementierung von Funktionalität und Schnittstellen' },
      step3: { step: '03', title: 'Tests', desc: 'QA, Leistungsoptimierung' },
      step4: { step: '04', title: 'Start', desc: 'Bereitstellung, Überwachung und Support' },
      ctaTitle: 'BEREIT ZU STARTEN?',
      ctaDescription: 'Lassen Sie uns Ihr Projekt diskutieren und eine optimale Lösung vorschlagen.',
      ctaButton2: 'KONTAKTIEREN',
    },
    videoPage: {
      tagline: 'VIDEO & FILM',
      title: 'VIDEO UND',
      titleHighlight: 'FILM',
      description: 'Videoproduktion, Film, Motion Design, visuelle Kommunikation. Werbevideos, Erklärvideos, 3D-Visualisierungen. Für Präsentationen, Landingpages und soziale Medien.',
      ctaButton: 'PROJEKT DISKUTIEREN',
      servicesTitle: 'DIENSTLEISTUNGEN',
      service1: {
        title: 'Videoproduktion',
        description: 'Vollständiger Zyklus der Videoproduktion: von Konzept und Drehbuch bis zu Aufnahme, Schnitt und Postproduktion.',
        features: ['Drehbuch und Konzept', 'Aufnahme', 'Schnitt', 'Farbkorrektur'],
      },
      service2: {
        title: 'Film',
        description: 'Erstellung von Kurz- und Spielfilmen, Dokumentarprojekten und Videoinhalten.',
        features: ['Kurzfilme', 'Dokumentarfilme', 'Videoart', 'Experimentalfilm'],
      },
      service3: {
        title: 'Motion Design',
        description: 'Erstellung von animierter Grafik, Titeln, Infografiken und visuellen Effekten für Video.',
        features: ['Animation', 'Titel und Grafik', 'Infografiken', 'Visuelle Effekte'],
      },
      service4: {
        title: 'Visuelle Kommunikation',
        description: 'Entwicklung visueller Lösungen für Präsentationen, Landingpages, soziale Medien und Werbung.',
        features: ['Präsentationen', 'Werbevideos', 'Erklärvideos', 'Soziale Medien'],
      },
      processTitle: 'ARBEITSPROZESS',
      step1: { step: '01', title: 'Konzept', desc: 'Entwicklung von Idee und Drehbuch' },
      step2: { step: '02', title: 'Produktion', desc: 'Aufnahme und Produktion' },
      step3: { step: '03', title: 'Postproduktion', desc: 'Schnitt, Farbkorrektur, Ton' },
      step4: { step: '04', title: 'Lieferung', desc: 'Finale Version und Anpassung' },
      ctaTitle: 'BEREIT ZU STARTEN?',
      ctaDescription: 'Lassen Sie uns Ihr Projekt diskutieren und eine optimale Lösung vorschlagen.',
      ctaButton2: 'KONTAKTIEREN',
    },
    marketingPage: {
      tagline: 'MARKETING & BRANDING',
      title: 'MARKETING UND',
      titleHighlight: 'BRANDING',
      description: 'Marketing, Promotion, Branding, Community-Aufbau. Datengetriebener Ansatz, Content-Strategie, Performance-Marketing. Spezialisierung auf Krypto-Marketing und Web3 PR.',
      ctaButton: 'PROJEKT DISKUTIEREN',
      servicesTitle: 'DIENSTLEISTUNGEN',
      service1: {
        title: 'Content-Strategie',
        description: 'Entwicklung einer umfassenden Content-Strategie zur Gewinnung und Bindung der Zielgruppe.',
        features: ['Content-Strategie', 'Content-Plan', 'Copywriting', 'Redaktion'],
      },
      service2: {
        title: 'SMM und Soziale Medien',
        description: 'Verwaltung der Präsenz in sozialen Medien, Erstellung von Communities und Interaktion mit der Zielgruppe.',
        features: ['SMM-Strategie', 'Content für soziale Medien', 'Community-Management', 'Influencer-Marketing'],
      },
      service3: {
        title: 'Performance-Marketing',
        description: 'Datengetriebener Ansatz für Marketing mit Fokus auf messbare Ergebnisse und Conversion-Optimierung.',
        features: ['Werbung', 'Analytik', 'A/B-Tests', 'Conversion-Optimierung'],
      },
      service4: {
        title: 'Krypto-Marketing und Web3 PR',
        description: 'Spezialisiertes Marketing für Blockchain-Projekte, Kryptowährungen und Web3-Ökosysteme.',
        features: ['Web3 PR', 'Krypto-Marketing', 'Community-Aufbau', 'Token-Marketing'],
      },
      processTitle: 'ARBEITSPROZESS',
      step1: { step: '01', title: 'Analyse', desc: 'Zielgruppen- und Wettbewerbsforschung' },
      step2: { step: '02', title: 'Strategie', desc: 'Entwicklung der Marketingstrategie' },
      step3: { step: '03', title: 'Implementierung', desc: 'Kampagnenstart und Content-Erstellung' },
      step4: { step: '04', title: 'Optimierung', desc: 'Ergebnisanalyse und Verbesserung' },
      ctaTitle: 'BEREIT ZU STARTEN?',
      ctaDescription: 'Lassen Sie uns Ihr Projekt diskutieren und eine optimale Lösung vorschlagen.',
      ctaButton2: 'KONTAKTIEREN',
    },
    designPage: {
      tagline: 'DESIGN & ARCHITECTURE',
      title: 'DESIGN UND',
      titleHighlight: 'ARCHITEKTUR',
      description: 'Lösungsarchitektur, Interface-Design, visuelle Identität, Branding. Von Konzept bis zur Implementierung der visuellen Sprache und Design-Systeme.',
      ctaButton: 'PROJEKT DISKUTIEREN',
      servicesTitle: 'DIENSTLEISTUNGEN',
      service1: {
        title: 'Lösungsarchitektur',
        description: 'Entwurf der Architektur digitaler Lösungen unter Berücksichtigung von Skalierbarkeit, Leistung und Benutzererfahrung.',
        features: ['Systemarchitektur', 'UX-Architektur', 'Informationsarchitektur', 'Technisches Design'],
      },
      service2: {
        title: 'Interface-Design',
        description: 'Erstellung von Interfaces, die konvertieren und eine hervorragende Benutzererfahrung auf allen Geräten bieten.',
        features: ['UX-Forschung', 'UI-Design', 'Prototyping', 'Design-Systeme'],
      },
      service3: {
        title: 'Visuelle Identität',
        description: 'Entwicklung von visueller Identität und Branding, die die Werte des Unternehmens widerspiegeln und für die Zielgruppe einprägsam sind.',
        features: ['Branding', 'Identität', 'Richtlinien', 'Medienanpassung'],
      },
      service4: {
        title: 'Branding',
        description: 'Erstellung eines umfassenden Markensystems von Strategie bis zur visuellen Verkörperung und Kommunikation.',
        features: ['Markenstrategie', 'Positionierung', 'Visuelle Sprache', 'Markenhandbuch'],
      },
      processTitle: 'ARBEITSPROZESS',
      step1: { step: '01', title: 'Forschung', desc: 'Analyse von Zielgruppe, Wettbewerbern und Kontext' },
      step2: { step: '02', title: 'Konzept', desc: 'Entwicklung von Konzept und visueller Richtung' },
      step3: { step: '03', title: 'Design', desc: 'Erstellung von Design-System und Interfaces' },
      step4: { step: '04', title: 'Implementierung', desc: 'Unterstützung während Entwicklung und Tests' },
      ctaTitle: 'BEREIT ZU STARTEN?',
      ctaDescription: 'Lassen Sie uns Ihr Projekt diskutieren und eine optimale Lösung vorschlagen.',
      ctaButton2: 'KONTAKTIEREN',
    },
    businessPage: {
      tagline: 'BUSINESS & STRATEGY',
      title: 'BUSINESS UND',
      titleHighlight: 'STRATEGIE',
      description: 'Entwicklung von Geschäftskonzepten, strategische Planung, Geschäftsmodellierung. Von Marktforschung und Wettbewerbsanalyse bis zum Aufbau von Entwicklungsstrategie und Skalierung.',
      ctaButton: 'PROJEKT DISKUTIEREN',
      servicesTitle: 'DIENSTLEISTUNGEN',
      service1: {
        title: 'Entwicklung von Geschäftskonzepten',
        description: 'Erstellung umfassender Geschäftskonzepte basierend auf tiefgreifender Analyse von Markt, Wettbewerbsumfeld und Benutzerbedürfnissen.',
        features: ['Markt- und Wettbewerbsanalyse', 'Benutzerforschung', 'Konzeptentwicklung', 'Ideenvvalidierung'],
      },
      service2: {
        title: 'Strategische Planung',
        description: 'Aufbau langfristiger Geschäftsentwicklungsstrategie unter Berücksichtigung von Markttrends, technologischen Möglichkeiten und Geschäftszielen.',
        features: ['Strategische Analyse', 'Zieldefinition', 'Etappenplanung', 'Entwicklungs-Roadmap'],
      },
      service3: {
        title: 'Geschäftsmodellierung',
        description: 'Entwurf nachhaltiger Geschäftsmodelle mit Fokus auf Skalierbarkeit, Monetarisierung und Wertschöpfung.',
        features: ['Monetarisierungsmodell', 'Unit-Ökonomie', 'Wachstumsszenarien', 'Finanzplanung'],
      },
      service4: {
        title: 'Analyse und Forschung',
        description: 'Umfassende Analyse von Markt, Wettbewerbern, Benutzern und technologischen Möglichkeiten für fundierte Entscheidungen.',
        features: ['Marktanalyse', 'Wettbewerbsanalyse', 'Benutzerforschung', 'Technologieaudit'],
      },
      processTitle: 'ARBEITSPROZESS',
      step1: { step: '01', title: 'Forschung', desc: 'Tiefgreifende Analyse von Markt, Wettbewerbern und Benutzern' },
      step2: { step: '02', title: 'Konzept', desc: 'Entwicklung von Geschäftskonzept und Modell' },
      step3: { step: '03', title: 'Strategie', desc: 'Aufbau von Entwicklungsstrategie und Aktionsplan' },
      step4: { step: '04', title: 'Implementierung', desc: 'Unterstützung während Implementierung und Skalierung' },
      ctaTitle: 'BEREIT ZU STARTEN?',
      ctaDescription: 'Lassen Sie uns Ihr Projekt diskutieren und eine optimale Lösung vorschlagen.',
      ctaButton2: 'KONTAKTIEREN',
    },
    background: {
      title: 'HINTERGRUNDAUSWAHL',
      description: 'Wählen Sie eine Variante des animierten Tintenhintergrunds',
      variant1: { name: 'Variante 1', description: 'Langsame sanfte Wellen' },
      variant2: { name: 'Variante 2', description: 'Mittlere Geschwindigkeit, ausgeprägte Wellen' },
      variant3: { name: 'Variante 3', description: 'Dicke schwere Wellen' },
      variant4: { name: 'Variante 4', description: 'Kleine häufige Wellen' },
      variant5: { name: 'Variante 5', description: 'Große langsame Wellen' },
      variant6: { name: 'Variante 6', description: 'Schnelle Strömungen' },
      variant7: { name: 'Variante 7', description: 'Wellen mit starken Highlights' },
      variant8: { name: 'Variante 8', description: 'Komplexe mehrschichtige Wellen' },
    },
    gallery: {
      tagline: 'LIVING GALLERY',
      title: 'Vitrine visueller und technischer Lösungen',
      description: 'Artefakte werden hier sein: Interfaces, Texturen, Formen, Videos und Prototypen. Während Materialien vorbereitet werden, lassen wir die Seitenarchitektur und Slots für jede Disziplin.',
      ctaButton: 'Fallpräsentation anfordern',
      apps: {
        accent: 'Interaktive Prototypen',
        title: 'Anwendungen und Ökosysteme',
        description: 'UI/UX-Kinematographie: Live-Prototypen, komplexe Dashboards, 3D-Interaktionen. Zeigen Sie die Tiefe der Produktlogik und Ingenieursarchitektur ohne Zahlen - durch Interface-Sprache.',
      },
      fashion: {
        accent: 'Parametrische Formen',
        title: 'Digitale Mode',
        description: 'Kollektionen als Code: 3D-Gewebeskulpturen, Avatar-Garderoben, Texturen, Bewegungssimulationen. Übergang vom Konzept zum Produktionsmuster.',
      },
      architecture: {
        accent: 'Parametrische Räume',
        title: 'Architektur und Umgebungen',
        description: 'Fassadenmorphologie, Innenräume-Algorithmen, Lichtszenarien. Virtuelle Zwillinge und physische Installationen mit Code-Regeln der Form.',
      },
      video: {
        accent: 'Kinematographie der Zukunft',
        title: 'Video / CGI / Motion',
        description: 'CGI, Motion Graphics, Produktfilme, Cinemagraphs. Narrative, die das Produkt zu einer greifbaren Geschichte zusammenfügen.',
      },
      research: {
        accent: 'Wissenschaftliche Prototypen',
        title: 'R&D / Labor',
        description: 'Neue Materialien, interaktive Sensoren, Blockchain- oder KI-Sonden. Reines Experiment: Diagramme, 3D, kurze Demos.',
      },
    },
    visual: {
      title: 'Visuelle Referenzen',
      description: 'Interaktive animierte Visuals zum Anzeigen und Auswählen von Referenzen',
      filterAll: 'Alle',
      filterJpg: 'JPG',
      filterPng: 'PNG',
      download: 'Herunterladen',
      close: 'Schließen',
      next: 'Weiter',
      prev: 'Zurück',
      zoomIn: 'Vergrößern',
      zoomOut: 'Verkleinern',
    },
    projects: {
      civilizationProtocol: {
        heroTitle: 'CIVILIZATION PROTOCOL',
        heroDescription: 'Dezentrale cyber-physikalische Plattform für Wasserressourcenmanagement durch Blockchain',
        presentationLink: 'Investitionspräsentation',
        blockTitle: 'CLICK FOR DETAILS →',
        clickForDetails: 'FÜR DETAILS KLICKEN →',
        platformArchitecture: {
          title: 'Plattformarchitektur',
          description: '12-stufiges cyber-physikalisches System von IoT-Sensoren bis zum globalen Netzwerk. Skalierbar, sicher, dezentralisiert.',
        },
        tokenomics: {
          title: 'Tokenomics',
          description: 'VOD-Token, Staking, Belohnungen und Governance-Mechanismen.',
        },
        daoGovernance: {
          title: 'DAO-Governance',
          description: 'Dezentrale autonome Organisation für die Plattformverwaltung.',
        },
        iotAiMonitoring: {
          title: 'IoT & AI-Überwachung',
          description: 'Intelligente Sensoren und KI-gestützte Analysen für Wasserressourcen.',
        },
        waterTokenization: {
          title: 'Wasser-Tokenisierung',
          description: 'Digitale Vermögenswerte, die Wasserressourcen und Infrastruktur darstellen.',
        },
        globalMarketplace: {
          title: 'Globaler Marktplatz',
          description: 'Handelsplattform für wasserbezogene Vermögenswerte und Daten.',
        },
      },
    },
  },
};



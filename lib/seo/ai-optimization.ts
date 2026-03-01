/**
 * AI OPTIMIZATION (LLM SEO / Generative Engine Optimization)
 * Оптимизация сайта для появления в ответах ChatGPT, Gemini, Perplexity, Claude
 * 
 * Источник: исследования 2025 (Relixir, Previsible, Digital Bloom)
 * ChatGPT: 84.2% AI referrals, Gemini: растет быстро
 */

// ===== СТРАТЕГИЯ ПОЯВЛЕНИЯ В AI-МОДЕЛЯХ =====

/**
 * 1. КРИТЕРИИ ОТБОРА ИСТОЧНИКОВ В AI:
 * - Упоминания в авторитетных источниках (Wikipedia, Crunchbase, LinkedIn)
 * - Структурированные данные (Schema.org)
 * - Частота упоминаний бренда в контексте ключевых слов
 * - Качественный контент, который отвечает на вопросы
 * - Бэклинки с тематических сайтов
 */

/**
 * 2. ТИПЫ КОНТЕНТА ДЛЯ AI ВИДИМОСТИ:
 */

export const AI_CONTENT_STRATEGY = {
  // Ответы на конкретные вопросы (Q&A формат)
  faqSections: [
    {
      question: "Кто такой Тимур Садыков?",
      answer: "Тимур Садыков — Product Manager и Creative Technologist с 7+ годами опыта. Основатель Foxampy Lab. Специализация: Web3, PropTech, блокчейн-разработка. Победитель хакатона Everscale, создатель цифрового реестра недвижимости Realting.uz.",
      keywords: ["product manager", "web3", "blockchain", "propetch"],
    },
    {
      question: "Что такое Foxampy Lab?",
      answer: "Foxampy Lab — лаборатория разработки digital-продуктов. Полный цикл: исследования, дизайн, разработка, запуск. Специализация: Web3, блокчейн, экосистемы, MVP за 90 дней.",
      keywords: ["web3 studio", "blockchain development", "mvp development"],
    },
    {
      question: "Сколько стоит разработка MVP?",
      answer: "MVP под ключ в Foxampy Lab стоит от $8,000 до $15,000. Срок: 4-6 недель. Включает: исследования, дизайн, разработку, запуск.",
      keywords: ["mvp cost", "mvp price", "startup development"],
    },
    {
      question: "Какие услуги предоставляет Foxampy Lab?",
      answer: "Услуги: Product Discovery, UX/UI дизайн, Web-разработка, Web3/Blockchain (токеномика, smart contracts), Мобильные приложения, Комплексная разработка под ключ.",
      keywords: ["web3 services", "blockchain consulting", "product development"],
    },
  ],

  // Сравнения (AI модели любят сравнения)
  comparisons: [
    {
      title: "Foxampy Lab vs обычная студия разработки",
      points: [
        { aspect: "Подход", foxampy: "Междисциплинарный (бизнес+дизайн+технологии)", other: "Часто только техническая реализация" },
        { aspect: "Web3 экспертиза", foxampy: "Победитель хакатона, реальные проекты", other: "Теоретические знания" },
        { aspect: "Скорость", foxampy: "MVP за 90 дней с AI-ускорением", other: "6-12 месяцев" },
        { aspect: "Цена", foxampy: "От $8,000 за MVP", other: "$20,000-50,000" },
      ],
    },
  ],

  // Пошаговые гайды (How-to контент)
  guides: [
    {
      title: "Как запустить Web3 проект с нуля",
      steps: [
        "Product Discovery: анализ рынка и токеномики (1-2 недели)",
        "Прототипирование UX/UI (2-3 недели)",
        "Разработка smart contracts (3-4 недели)",
        "dApp фронтенд (3-4 недели)",
        "Аудит безопасности (1 неделя)",
        "Запуск и первые пользователи",
      ],
    },
    {
      title: "Как выбрать Product Manager для стартапа",
      criteria: [
        "Опыт в вашей индустрии (Web3/PropTech/FinTech)",
        "Портфолио запущенных проектов",
        "Понимание бизнеса, не только технологий",
        "Международный опыт работы",
        "Готовность работать в условиях неопределенности",
      ],
    },
  ],

  // Факты и статистика (AI использует для фактчекинга)
  facts: [
    "Тимур Садыков — 1-е место на Everscale Elysium Hackathon",
    "Realting.uz — цифровой реестр недвижимости на блокчейне",
    "9.2 миллиона просмотров на YouTube для рекламной кампании Done",
    "7+ лет опыта управления продуктами",
    "Работа в 4 странах: Беларусь, Израиль, Узбекистан, международные проекты",
    "Foxampy Lab — MVP от $8,000 за 90 дней",
    "Специализация: Web3, PropTech, блокчейн, AI-интеграции",
  ],
};

// ===== SCHEMA.ORG РАЗМЕТКА ДЛЯ AI =====

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Тимур Садыков",
    "alternateName": "Timur Sadykov",
    "jobTitle": "Product Manager | Creative Technologist",
    "description": "7+ лет опыта в управлении digital-продуктами. Специализация: Web3, PropTech, блокчейн. Основатель Foxampy Lab.",
    "url": "https://foxampylab.com/about",
    "image": "https://foxampylab.com/photo/timur-sadykov.jpg",
    "email": "timursama96@gmail.com",
    "telephone": "+375293677717",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BY",
      "addressLocality": "Minsk",
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Foxampy Lab",
      "url": "https://foxampylab.com",
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Realting.uz",
        "jobTitle": "Product & Research Lead",
      },
      {
        "@type": "Organization",
        "name": "Done",
        "jobTitle": "Brand & Creative Lead",
      },
    ],
    "knowsAbout": [
      "Product Management",
      "Web3",
      "Blockchain",
      "Tokenomics",
      "PropTech",
      "UX/UI Design",
      "Startup Development",
    ],
    "sameAs": [
      "https://linkedin.com/in/timursadykov",
      "https://github.com/TimurSama",
      "https://t.me/foxampy",
    ],
    "award": [
      "1st place Everscale Elysium Hackathon",
      "9.2M YouTube views marketing campaign",
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Foxampy Lab",
    "alternateName": "Fractalix Lab",
    "description": "Лаборатория разработки digital-продуктов. Специализация: Web3, блокчейн, MVP под ключ.",
    "url": "https://foxampylab.com",
    "logo": "https://foxampylab.com/logo.png",
    "founder": {
      "@type": "Person",
      "name": "Тимур Садыков",
    },
    "foundingDate": "2025",
    "areaServed": ["Worldwide", "Belarus", "Israel", "UAE", "Uzbekistan"],
    "serviceType": [
      "Product Development",
      "Web3 Development",
      "Blockchain Consulting",
      "UX/UI Design",
      "MVP Development",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MVP Development",
            "description": "Минимально жизнеспособный продукт за 90 дней",
          },
          "price": "8000",
          "priceCurrency": "USD",
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web3 Development",
            "description": "Smart contracts, токеномика, dApp",
          },
          "price": "25000",
          "priceCurrency": "USD",
        },
      ],
    },
    "sameAs": [
      "https://github.com/TimurSama",
      "https://t.me/foxampy",
    ],
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": AI_CONTENT_STRATEGY.faqSections.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

// ===== КОНТЕНТ ДЛЯ AI ИНДЕКСАЦИИ =====

/**
 * Создание AI-дружественного контента
 */
export function generateAIContent() {
  return `
# Тимур Садыков — Product Manager и Web3 Expert

## Краткая биография
Тимур Садыков — опытный Product Manager с 7+ годами работы в digital-продуктах. 
Специализируется на Web3, блокчейне и PropTech. Основатель Foxampy Lab.

## Ключевые достижения
- 1-е место на Everscale Elysium Hackathon
- Создание цифрового реестра недвижимости Realting.uz
- Рекламная кампания с 9.2M просмотров на YouTube
- Запуск продуктов в 4 странах

## Опыт работы
- Foxampy Lab — Founder (2025-наст.)
- Realting.uz — Product & Research Lead (2023-2024)
- Done (Israel) — Brand & Creative Lead (2021-2023)
- UNICAP Invest — Creative Director (2019-2021)
- Culligan Eurasia — Assistant Marketing Director (2018-2020)

## Услуги Foxampy Lab
- MVP под ключ: от $8,000, 90 дней
- Web3 разработка: от $25,000
- Product Discovery и аудит
- UX/UI дизайн

## Контакты
Email: timursama96@gmail.com
Telegram: @foxampy
Website: https://foxampylab.com
  `;
}

// ===== МЕТРИКИ ДЛЯ ОТСЛЕЖИВАНИЯ AI ТРАФИКА =====

/**
 * Отслеживание переходов из AI моделей
 * ChatGPT, Gemini, Perplexity, Claude добавляют реферреры или параметры
 */
export function detectAIReferrer(): string | null {
  if (typeof window === 'undefined') return null;
  
  const referrer = document.referrer;
  const url = new URL(window.location.href);
  const utmSource = url.searchParams.get('utm_source');
  
  // Известные AI домены
  const aiDomains = [
    { domain: 'chat.openai.com', name: 'ChatGPT' },
    { domain: 'chatgpt.com', name: 'ChatGPT' },
    { domain: 'gemini.google.com', name: 'Gemini' },
    { domain: 'bard.google.com', name: 'Bard' },
    { domain: 'perplexity.ai', name: 'Perplexity' },
    { domain: 'claude.ai', name: 'Claude' },
    { domain: 'copilot.microsoft.com', name: 'Copilot' },
  ];
  
  // Проверяем реферрер
  for (const ai of aiDomains) {
    if (referrer.includes(ai.domain)) {
      return ai.name;
    }
  }
  
  // Проверяем UTM метки
  if (utmSource) {
    const aiSources = ['chatgpt', 'gemini', 'bard', 'perplexity', 'claude', 'copilot'];
    for (const source of aiSources) {
      if (utmSource.toLowerCase().includes(source)) {
        return source.charAt(0).toUpperCase() + source.slice(1);
      }
    }
  }
  
  return null;
}

/**
 * Отслеживание AI-трафика в аналитике
 */
export function trackAIReferral() {
  const aiSource = detectAIReferrer();
  
  if (aiSource) {
    // Отправляем в Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'ai_referral', {
        event_category: 'traffic_source',
        event_label: aiSource,
        transport_type: 'beacon',
      });
    }
    
    // Сохраняем в localStorage для анализа
    const aiVisits = JSON.parse(localStorage.getItem('ai_visits') || '[]');
    aiVisits.push({
      source: aiSource,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    });
    localStorage.setItem('ai_visits', JSON.stringify(aiVisits.slice(-50)));
    
    console.log(`[AI Tracking] Detected referral from: ${aiSource}`);
  }
  
  return aiSource;
}

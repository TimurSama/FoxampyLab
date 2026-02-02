import { Metadata } from 'next';

const SITE_NAME = 'Foxampy LAB';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://foxampy.com';
const SITE_DESCRIPTION = 'Foxampy LAB — междисциплинарная лаборатория. Проектируем IT-экосистемы, R&D-решения, Web3 и цифровые продукты. Архитектура, прототипы, внедрение.';

export interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    noindex?: boolean;
}

export const defaultMetadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${SITE_NAME} — Лаборатория IT-экосистем, R&D и Web3 решений`,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
        'IT-экосистемы',
        'R&D лаборатория',
        'Web3 разработка',
        'blockchain решения',
        'цифровые продукты',
        'архитектура систем',
        'прототипирование',
        'междисциплинарная разработка',
        'CGI production',
        'digital innovation',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        alternateLocale: ['en_US'],
        url: SITE_URL,
        siteName: SITE_NAME,
        title: `${SITE_NAME} — Лаборатория IT-экосистем, R&D и Web3 решений`,
        description: SITE_DESCRIPTION,
        images: [
            {
                url: `${SITE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: SITE_NAME,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${SITE_NAME} — Лаборатория IT-экосистем, R&D и Web3 решений`,
        description: SITE_DESCRIPTION,
        images: [`${SITE_URL}/og-image.jpg`],
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
};

export const pageMetadata: Record<string, SEOConfig> = {
    home: {
        title: 'Foxampy LAB — Лаборатория IT-экосистем, R&D и Web3 решений',
        description: 'Foxampy LAB — междисциплинарная лаборатория. Проектируем IT-экосистемы, R&D-решения, Web3 и цифровые продукты. Архитектура, прототипы, внедрение.',
        keywords: [
            'IT-экосистемы',
            'R&D лаборатория',
            'Web3 разработка',
            'blockchain решения',
            'цифровые продукты',
            'архитектура систем',
            'прототипирование',
            'междисциплинарная разработка',
        ],
    },
    services: {
        title: 'Услуги — Комплексная разработка цифровых решений',
        description: 'Полный спектр услуг по разработке IT-экосистем, Web3-решений, R&D и цифровых продуктов. Архитектура, прототипирование, внедрение.',
        keywords: [
            'услуги разработки',
            'IT-консалтинг',
            'Web3 разработка',
            'blockchain консалтинг',
            'архитектура систем',
            'R&D услуги',
        ],
    },
    ecosystems: {
        title: 'IT-экосистемы и архитектура — Проектирование масштабируемых решений',
        description: 'Проектирование и разработка IT-экосистем: от стратегии и архитектуры до внедрения и масштабирования. Микросервисы, API, интеграции.',
        keywords: [
            'IT-экосистемы',
            'архитектура систем',
            'микросервисы',
            'API разработка',
            'масштабируемые решения',
            'системная интеграция',
        ],
    },
    webapp: {
        title: 'Разработка веб-приложений и сайтов — React, Next.js, Node.js',
        description: 'Разработка современных веб-приложений, SPA, PWA и мобильных приложений. React, Next.js, React Native, Node.js. От MVP до enterprise-решений.',
        keywords: [
            'разработка веб-приложений',
            'React разработка',
            'Next.js',
            'Node.js',
            'мобильные приложения',
            'PWA',
            'SPA разработка',
        ],
    },
    blockchain: {
        title: 'Web3 и Blockchain разработка — Смарт-контракты, DeFi, NFT',
        description: 'Разработка Web3-решений, смарт-контрактов, DeFi-платформ и NFT. Everscale, Ethereum, Solidity. Аудит безопасности и консалтинг.',
        keywords: [
            'Web3 разработка',
            'blockchain разработка',
            'смарт-контракты',
            'DeFi',
            'NFT',
            'Solidity',
            'Ethereum',
            'Everscale',
        ],
    },
    design: {
        title: 'Дизайн и UI/UX — Интерфейсы, брендинг, дизайн-системы',
        description: 'Проектирование интерфейсов, визуальная идентичность, брендинг. UI/UX дизайн, дизайн-системы, прототипирование. От концепции до реализации.',
        keywords: [
            'UI/UX дизайн',
            'дизайн интерфейсов',
            'брендинг',
            'дизайн-системы',
            'визуальная идентичность',
            'прототипирование',
        ],
    },
    marketing: {
        title: 'Маркетинг и продвижение — Web3 PR, контент-стратегия, SMM',
        description: 'Комплексный маркетинг для Web3 и tech-проектов. Контент-стратегия, SMM, криптомаркетинг, community building, performance-маркетинг.',
        keywords: [
            'Web3 маркетинг',
            'криптомаркетинг',
            'контент-стратегия',
            'SMM',
            'community building',
            'performance маркетинг',
        ],
    },
    video: {
        title: 'Видеопродакшн и CGI — Производство видео, моушн-дизайн, 3D',
        description: 'Видеопродакшн, CGI, моушн-дизайн, 3D-анимация. Промо-ролики, эксплейнеры, визуальные эффекты. Для презентаций и маркетинга.',
        keywords: [
            'видеопродакшн',
            'CGI',
            'моушн-дизайн',
            '3D анимация',
            'визуальные эффекты',
            'промо-ролики',
        ],
    },
    business: {
        title: 'Бизнес-консалтинг и стратегия — Концепции, планирование, модели',
        description: 'Разработка бизнес-концепций, стратегическое планирование, бизнес-моделирование. Анализ рынка, unit-экономика, финансовое планирование.',
        keywords: [
            'бизнес-консалтинг',
            'стратегическое планирование',
            'бизнес-моделирование',
            'анализ рынка',
            'unit-экономика',
        ],
    },
    research: {
        title: 'R&D и научные исследования — Прототипирование, инновации, патенты',
        description: 'Научно-исследовательская деятельность: IoT, квантовые технологии, экология. Прототипирование, патентование, инженерные решения.',
        keywords: [
            'R&D',
            'научные исследования',
            'прототипирование',
            'IoT',
            'квантовые технологии',
            'инженерные решения',
            'патентование',
        ],
    },
    hub: {
        title: 'HUB — Проекты в разработке и инвестиционные возможности',
        description: 'Портфель проектов Foxampy LAB: Civilization Protocol, TradePlus, Dogymorbios, NexusVita. Инвестиционные возможности и партнерство.',
        keywords: [
            'венчурные проекты',
            'инвестиции',
            'стартапы',
            'портфель проектов',
            'Web3 проекты',
            'blockchain стартапы',
        ],
    },
    gallery: {
        title: 'Галерея — Портфолио проектов, дизайн, фото и видео',
        description: 'Портфолио реализованных проектов: веб-приложения, дизайн, архитектура, мода, видеопродакшн. Примеры работ и кейсы.',
        keywords: [
            'портфолио',
            'кейсы',
            'примеры работ',
            'дизайн проектов',
            'веб-приложения',
            'видеопродакшн',
        ],
    },
    about: {
        title: 'О лаборатории — Миссия, ценности, экспертиза',
        description: 'Foxampy LAB — междисциплинарная лаборатория инноваций. Объединяем IT, дизайн, бизнес и науку для создания уникальных решений.',
        keywords: [
            'о компании',
            'междисциплинарная команда',
            'экспертиза',
            'инновационная лаборатория',
            'ценности',
        ],
    },
    join: {
        title: 'Вакансии — Присоединяйтесь к команде Foxampy LAB',
        description: 'Открытые вакансии в Foxampy LAB: blockchain-разработчики, AI-инженеры, дизайнеры, маркетологи. Удаленная работа, equity, уникальные проекты.',
        keywords: [
            'вакансии',
            'работа в IT',
            'blockchain вакансии',
            'AI разработчик',
            'удаленная работа',
            'IT вакансии',
        ],
    },
    contact: {
        title: 'Контакты — Обсудить проект или получить консультацию',
        description: 'Свяжитесь с Foxampy LAB для обсуждения вашего проекта. Бесплатная консультация, архитектурный разбор, оценка feasibility.',
        keywords: [
            'контакты',
            'консультация',
            'обсудить проект',
            'связаться',
            'заказать разработку',
        ],
    },
};

export function generateMetadata(page: keyof typeof pageMetadata): Metadata {
    const config = pageMetadata[page];

    return {
        title: config.title,
        description: config.description,
        keywords: config.keywords,
        openGraph: {
            title: config.title,
            description: config.description,
            url: `${SITE_URL}/${page === 'home' ? '' : page}`,
            images: config.ogImage ? [config.ogImage] : undefined,
        },
        twitter: {
            title: config.title,
            description: config.description,
            images: config.ogImage ? [config.ogImage] : undefined,
        },
        ...(config.noindex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}

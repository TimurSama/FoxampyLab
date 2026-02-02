const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://foxampy.com';
const SITE_NAME = 'Foxampy LAB';

export interface FAQItem {
    question: string;
    answer: string;
}

export interface BreadcrumbItem {
    name: string;
    url: string;
}

// Organization Schema
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        alternateName: 'Foxampy Laboratory',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: 'Междисциплинарная лаборатория цифровых решений. IT-экосистемы, R&D, Web3, blockchain, дизайн и видеопродакшн.',
        foundingDate: '2020',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'RU',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            availableLanguage: ['Russian', 'English'],
        },
        sameAs: [
            'https://t.me/foxampy',
            'https://linkedin.com/company/foxampy',
            'https://github.com/foxampy',
        ],
        knowsAbout: [
            'IT Architecture',
            'Web3 Development',
            'Blockchain',
            'R&D',
            'Digital Products',
            'UI/UX Design',
            'Video Production',
            'CGI',
        ],
        areaServed: {
            '@type': 'GeoCircle',
            geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: '55.7558',
                longitude: '37.6173',
            },
            geoRadius: '10000000',
        },
    };
}

// WebSite Schema
export function getWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: 'Лаборатория IT-экосистем, R&D и Web3 решений',
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

// FAQ Schema
export function getFAQSchema(items: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

// Service Schema
export function getServiceSchema(service: {
    name: string;
    description: string;
    url: string;
    provider?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url,
        provider: {
            '@type': 'Organization',
            name: service.provider || SITE_NAME,
        },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Digital Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: service.name,
                    },
                },
            ],
        },
    };
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

// Article Schema
export function getArticleSchema(article: {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
    image?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        url: article.url,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: {
            '@type': 'Organization',
            name: article.author || SITE_NAME,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
            },
        },
        image: article.image ? {
            '@type': 'ImageObject',
            url: article.image,
        } : undefined,
    };
}

// Product/Project Schema
export function getProductSchema(product: {
    name: string;
    description: string;
    url: string;
    image?: string;
    category?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        url: product.url,
        image: product.image,
        category: product.category,
        brand: {
            '@type': 'Brand',
            name: SITE_NAME,
        },
        manufacturer: {
            '@type': 'Organization',
            name: SITE_NAME,
        },
    };
}

// ContactPage Schema
export function getContactPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Контакты',
        description: 'Свяжитесь с Foxampy LAB для обсуждения вашего проекта',
        url: `${SITE_URL}/contact`,
        mainEntity: {
            '@type': 'Organization',
            name: SITE_NAME,
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: ['Russian', 'English'],
            },
        },
    };
}

// JobPosting Schema
export function getJobPostingSchema(job: {
    title: string;
    description: string;
    datePosted: string;
    employmentType?: string;
    location?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.datePosted,
        employmentType: job.employmentType || 'FULL_TIME',
        hiringOrganization: {
            '@type': 'Organization',
            name: SITE_NAME,
            sameAs: SITE_URL,
        },
        jobLocation: job.location ? {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: job.location,
            },
        } : {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'Remote',
            },
        },
    };
}

// Helper to prepare structured data for injection
export function prepareStructuredData(data: any): string {
    return JSON.stringify(data);
}


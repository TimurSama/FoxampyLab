import type { Metadata, Viewport } from 'next'
import './globals.css'
import '../styles/temp-animations.css'
import { I18nProvider } from '@/lib/i18n/context'

export const metadata: Metadata = {
  title: 'Foxampy LAB — Digital Laboratory | Разработка экосистем, приложений, блокчейн',
  description: 'Междисциплинарная лаборатория разработки цифровых продуктов. Экосистемы, веб-приложения, блокчейн, дизайн, маркетинг, AI, R&D. Инвестиционные возможности и научные исследования.',
  keywords: ['разработка', 'дизайн', 'блокчейн', 'web3', 'маркетинг', 'стартап', 'инвестиции', 'экосистемы', 'веб-приложения', 'AI', 'R&D', 'лаборатория', 'инновации', 'цифровые продукты', 'технологии'],
  authors: [{ name: 'Foxampy LAB' }],
  creator: 'Foxampy LAB',
  publisher: 'Foxampy LAB',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://timursama.github.io/FoxampyLab/'),
  alternates: {
    canonical: '/',
    languages: {
      'ru': '/',
      'en': '/',
    },
  },
  openGraph: {
    title: 'Foxampy LAB — Digital Laboratory',
    description: 'Междисциплинарная лаборатория разработки цифровых продуктов. Экосистемы, веб-приложения, блокчейн, дизайн, маркетинг, AI, R&D.',
    url: 'https://timursama.github.io/FoxampyLab/',
    siteName: 'Foxampy LAB',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Foxampy LAB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foxampy LAB — Digital Laboratory',
    description: 'Междисциплинарная лаборатория разработки цифровых продуктов',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Дополнительные мета-теги для ИИ-краулеров
  other: {
    'ai-crawler': 'allow',
    'ai-index': 'yes',
    'google-site-verification': '',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#030303',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured Data для лучшей индексации ИИ-краулерами
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Foxampy LAB",
    "description": "Междисциплинарная лаборатория разработки цифровых продуктов. Экосистемы, веб-приложения, блокчейн, дизайн, маркетинг, AI, R&D.",
    "url": "https://timursama.github.io/FoxampyLab/",
    "logo": "https://timursama.github.io/FoxampyLab/logo.png",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service"
    },
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "serviceType": "Digital Product Development",
        "description": "Разработка экосистем, веб-приложений, блокчейн решений, дизайн, маркетинг"
      }
    }
  };

  return (
    <html lang="ru">
      <body className="antialiased">
        {/* Structured Data для ИИ-краулеров - в начале body для лучшей доступности */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <I18nProvider>
          {/* Atmospheric effects */}
          <div className="noise-overlay" />
          <div className="scanlines" />
          <div className="vignette" />

          {children}
        </I18nProvider>
      </body>
    </html>
  )
}


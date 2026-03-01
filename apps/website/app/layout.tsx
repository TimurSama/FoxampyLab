import type { Metadata, Viewport } from 'next'
import { InkFluid2D } from '@/components/visuals-2d'
import './globals.css'
import '../styles/temp-animations.css'
import { I18nProvider } from '@/lib/i18n/context'
import { PerformanceProvider } from '@/lib/context/PerformanceContext'
import FloatingContactButton from '@/components/layout/FloatingContactButton'
import CookieConsent from '@/components/cookies/CookieConsent'
import Analytics from '@/components/analytics/Analytics'
import { defaultMetadata } from '@/lib/seo/metadata'
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = defaultMetadata;

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
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="ru">
      <head>
        {/* Cache busting для автообновления */}
        <meta name="version" content="1.0.4" />
        {/* Structured Data для поисковиков и LLM */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
        <I18nProvider>
          <PerformanceProvider>
            {/* Atmospheric effects */}
            <div className="noise-overlay" />
            <div className="scanlines" />
            <div className="vignette" />

            {/* Global Liquid Background */}
            <InkFluid2D variant="dark" intensity="medium" />

            {children}
            <FloatingContactButton />
            <CookieConsent />
            <Analytics />
          </PerformanceProvider>
        </I18nProvider>
      </body>
    </html>
  )
}



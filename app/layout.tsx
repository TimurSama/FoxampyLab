import type { Metadata, Viewport } from 'next'
import GlobalBackgroundWithFallback from '@/components/backgrounds/GlobalBackgroundWithFallback'
import './globals.css'
import '../styles/temp-animations.css'
import { I18nProvider } from '@/lib/i18n/context'
import FloatingContactButton from '@/components/layout/FloatingContactButton'
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
          {/* Atmospheric effects */}
          <div className="noise-overlay" />
          <div className="scanlines" />
          <div className="vignette" />

          {/* Global Liquid Background */}
          <GlobalBackgroundWithFallback />

          {children}
          <FloatingContactButton />
        </I18nProvider>
      </body>
    </html>
  )
}



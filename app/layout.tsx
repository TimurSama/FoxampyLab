import type { Metadata, Viewport } from 'next'
import './globals.css'
import { I18nProvider } from '@/lib/i18n/context'

export const metadata: Metadata = {
  title: 'FRACTALIX.LAB — Digital Laboratory | Разработка экосистем, приложений, блокчейн',
  description: 'Междисциплинарная лаборатория разработки цифровых продуктов. Экосистемы, веб-приложения, блокчейн, дизайн, маркетинг, AI, R&D. Инвестиционные возможности и научные исследования.',
  keywords: ['разработка', 'дизайн', 'блокчейн', 'web3', 'маркетинг', 'стартап', 'инвестиции', 'экосистемы', 'веб-приложения', 'AI', 'R&D', 'лаборатория', 'инновации'],
  openGraph: {
    title: 'FRACTALIX.LAB — Digital Laboratory',
    description: 'Междисциплинарная лаборатория разработки цифровых продуктов',
    type: 'website',
  },
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
  return (
    <html lang="en">
      <body className="antialiased">
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


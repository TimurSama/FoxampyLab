import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FRACTALIX.LAB — Digital Laboratory',
  description: 'Разработка экосистем, приложений, блокчейн, маркетинг, дизайн. Инвестиционные возможности.',
  keywords: ['разработка', 'дизайн', 'блокчейн', 'web3', 'маркетинг', 'стартап', 'инвестиции'],
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
    <html lang="ru">
      <body className="antialiased">
        {/* Atmospheric effects */}
        <div className="noise-overlay" />
        <div className="scanlines" />
        <div className="vignette" />
        
        {children}
      </body>
    </html>
  )
}


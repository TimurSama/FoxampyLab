import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timursama.github.io/FoxampyLab'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/services',
    '/services/ecosystems',
    '/services/webapp',
    '/services/blockchain',
    '/services/design',
    '/services/marketing',
    '/services/video',
    '/services/business',
    '/research',
    '/hub',
    '/gallery',
    '/about',
    '/join',
  ]

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}

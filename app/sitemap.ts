import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yongin-honorsville.vercel.app'
  
  const routes = [
    '',
    '/business',
    '/directions',
    '/premium',
    '/location',
    '/site-plan',
    '/system',
    '/club-honors',
    '/floor-plan',
    '/interior',
    '/press',
    '/promotional-video',
    '/subscription-guide',
    '/sales-schedule',
    '/recruitment-notice',
    '/registration',
    '/e-model-house',
    '/e-model-house/virtual-tour',
    '/e-model-house/3d',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
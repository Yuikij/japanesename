import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/cron/',
        '/cron-logs/',
        '/d1-test/',
        '/_next/',
        '/scripts/',
      ],
    },
    sitemap: 'https://japanesename.vercel.app/sitemap.xml',
  }
} 
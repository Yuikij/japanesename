import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  const baseUrl = host ? `${protocol}://${host}` : 'https://japanesenamegen.com'

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
    sitemap: `${baseUrl}/sitemap.xml`,
  }
} 
import { readFileSync } from 'fs'
import { join } from 'path'
import { MetadataRoute } from 'next'

interface Keyword {
  strategy: string
  path: string
}

function loadCategoryPaths(): string[] {
  try {
    const raw = readFileSync(
      join(process.cwd(), '新版本PSEO改造/keyword/keyword.json'),
      'utf-8'
    )
    const keywords: Keyword[] = JSON.parse(raw)
    return keywords
      .filter(k => k.strategy === 'category_page' && k.path)
      .map(k => k.path)
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://japanesename.vercel.app'
  const locales = ['en', 'zh']

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    })),
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}/generate`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}/test-chat`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]

  const categoryPaths = loadCategoryPaths()
  for (const path of categoryPaths) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  return routes
}

'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname, Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { Sparkles } from 'lucide-react'
import { ChangeEvent } from 'react'

export default function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname, { locale: e.target.value })
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-gray-800 font-semibold text-lg hover:text-pink-600 transition-colors">
          <span>🌸</span>
          <span className="hidden sm:inline">{t('brand')}</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/' ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {t('home')}
          </Link>
          <Link
            href="/generate"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
              pathname === '/generate' ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t('generator')}
          </Link>

          <div className="relative ml-2">
            <select
              value={locale}
              onChange={handleLanguageChange}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-600 text-sm py-1.5 pl-3 pr-7 rounded-lg focus:outline-none focus:border-pink-300 cursor-pointer"
            >
              {routing.locales.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === 'zh' ? '中文' : 'EN'}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

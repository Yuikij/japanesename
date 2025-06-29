'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { locales } from '../i18n'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    // 获取当前路径，移除语言前缀
    let pathWithoutLocale = pathname
    if (pathname.startsWith(`/${locale}`)) {
      pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    }
    
    // 构建新路径
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <div className="flex gap-2">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            locale === lang
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {lang === 'zh' ? '中文' : 'EN'}
        </button>
      ))}
    </div>
  )
} 
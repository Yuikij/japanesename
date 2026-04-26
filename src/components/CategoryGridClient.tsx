'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { Search, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface CategoryItem {
  keyword: string
  path: string
  volume: number
  icon: string
}

export default function CategoryGridClient({ categories }: { categories: CategoryItem[] }) {
  const t = useTranslations('home.categories')
  const [showAll, setShowAll] = useState(false)

  const INITIAL_COUNT = 15
  const displayedCategories = showAll ? categories : categories.slice(0, INITIAL_COUNT)
  
  function formatVolume(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`
    return String(n)
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayedCategories.map((cat) => (
          <Link
            key={cat.path}
            href={`.${cat.path}`}
            className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-pink-200"
          >
            <div className="text-3xl mb-3 flex items-center justify-center">{cat.icon}</div>
            <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2 capitalize group-hover:text-pink-600 transition-colors text-center">
              {cat.keyword}
            </h3>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
              <Search className="w-3 h-3" />
              <span>{t('searches', { count: formatVolume(cat.volume) })}</span>
            </div>
          </Link>
        ))}
      </div>
      
      {!showAll && categories.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-full font-medium hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition-all duration-200 shadow-sm"
          >
            {t('showMore', { count: categories.length })}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {showAll && categories.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll(false)}
            className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-full font-medium hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition-all duration-200 shadow-sm"
          >
            {t('showLess')}
            <ChevronDown className="w-4 h-4 rotate-180" />
          </button>
        </div>
      )}
    </>
  )
}

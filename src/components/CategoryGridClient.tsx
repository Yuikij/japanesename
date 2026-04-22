'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const CATEGORY_ICONS: Record<string, string> = {
  '/names/last-names': '👨‍👩‍👧‍👦',
  '/names/male': '👦',
  '/names/female': '👧',
  '/names/all': '📖',
  '/names/boy': '🧒',
  '/names/names': '✨',
  '/names/girl': '🎀',
  '/names/last-names-with-meanings': '📝',
  '/names/last-names-common': '🏠',
  '/names/anime': '🎌',
}

const INITIAL_COUNT = 10
const PAGE_SIZE = 30

interface Category {
  keyword: string
  path: string
  volume: number
}

function formatVolume(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`
  return String(n)
}

export default function CategoryGridClient({ categories }: { categories: Category[] }) {
  const t = useTranslations('home')
  const [expanded, setExpanded] = useState(false)
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(categories.length / PAGE_SIZE)
  const pageItems = categories.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  if (!expanded) {
    const featured = categories.slice(0, INITIAL_COUNT)
    return (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {featured.map((cat) => (
            <Link
              key={cat.path}
              href={`.${cat.path}`}
              className="group flex flex-col bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-pink-200"
            >
              <div className="text-3xl mb-3">{CATEGORY_ICONS[cat.path] ?? '✨'}</div>
              <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2 flex-1 group-hover:text-pink-600 transition-colors">
                {cat.keyword}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-auto">
                <Search className="w-3 h-3" />
                <span>{t('categories.searches', { count: formatVolume(cat.volume) })}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-pink-300 hover:text-pink-600 transition-all duration-200 shadow-sm hover:shadow"
          >
            <ChevronDown className="w-4 h-4" />
            {t('categories.showMore', { count: categories.length })}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Compact grid without icons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {pageItems.map((cat) => (
          <Link
            key={cat.path}
            href={`.${cat.path}`}
            className="group flex flex-col bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-pink-200"
          >
            <h3 className="font-medium text-gray-800 text-sm leading-snug mb-1.5 flex-1 group-hover:text-pink-600 transition-colors">
              {cat.keyword}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-auto">
              <Search className="w-3 h-3" />
              <span>{t('categories.searches', { count: formatVolume(cat.volume) })}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-pink-300 hover:text-pink-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all border ${
                page === i
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="p-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-pink-300 hover:text-pink-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={() => { setExpanded(false); setPage(0) }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-pink-300 hover:text-pink-600 transition-all duration-200 shadow-sm hover:shadow"
        >
          <ChevronUp className="w-4 h-4" />
          {t('categories.showLess')}
        </button>
      </div>
    </div>
  )
}

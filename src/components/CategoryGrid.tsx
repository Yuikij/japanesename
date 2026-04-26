'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

interface Category {
  keyword: string
  path: string
  volume: number
  icon: string | null
}

interface CategoryGridProps {
  categories: Category[]
  initialCount?: number
  searchesLabel: string
  showMoreLabel: string
  showLessLabel: string
}

function formatVolume(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`
  return String(n)
}

export default function CategoryGrid({
  categories,
  initialCount = 10,
  searchesLabel,
  showMoreLabel,
  showLessLabel,
}: CategoryGridProps) {
  const [expanded, setExpanded] = useState(false)

  const featured = categories.slice(0, initialCount)
  const rest = categories.slice(initialCount)
  const visible = expanded ? categories : featured

  return (
    <div>
      {/* Featured cards — with emoji icon */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {featured.map((cat) => (
          <Link
            key={cat.path}
            href={`.${cat.path}`}
            className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-pink-200"
          >
            {cat.icon && (
              <div className="text-3xl mb-3">{cat.icon}</div>
            )}
            <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2 capitalize group-hover:text-pink-600 transition-colors">
              {cat.keyword}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Search className="w-3 h-3 flex-shrink-0" />
              <span>{searchesLabel.replace('{count}', formatVolume(cat.volume))}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Expanded — compact pill/tag style, no emoji */}
      {expanded && rest.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {rest.map((cat) => (
            <Link
              key={cat.path}
              href={`.${cat.path}`}
              className="group inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-pink-300 hover:bg-pink-50 text-gray-700 hover:text-pink-600 rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 shadow-sm"
            >
              <span className="capitalize">{cat.keyword}</span>
              <span className="text-xs text-gray-400 group-hover:text-pink-400">
                {formatVolume(cat.volume)}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Show more / less button */}
      {rest.length > 0 && (
        <div className="text-center mt-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors py-2 px-4 rounded-full hover:bg-pink-50"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                {showLessLabel}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                {showMoreLabel.replace('{count}', String(rest.length))}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

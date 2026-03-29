'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import type { FullNameCombo } from '@/types/name-page'
import ComboCardInteractive from './ComboCardInteractive'

interface NameListExpanderClientProps {
  combos: FullNameCombo[]
  locale: string
  initialCount: number
}

const BATCH_SIZE = 24

export default function NameListExpanderClient({
  combos,
  locale,
  initialCount,
}: NameListExpanderClientProps) {
  const t = useTranslations('namePage.nameList')
  const [shown, setShown] = useState(initialCount)

  const remaining = combos.slice(initialCount, shown)
  const hasMore = shown < combos.length

  return (
    <>
      {remaining.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
          {remaining.map(combo => (
            <ComboCardInteractive key={combo.id} combo={combo} locale={locale} />
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-400 mb-3">
          {t('showing', { shown: Math.min(shown, combos.length), total: combos.length })}
        </p>
        {hasMore && (
          <button
            onClick={() => setShown(prev => Math.min(prev + BATCH_SIZE, combos.length))}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:border-pink-300 hover:text-pink-600 transition-all duration-200 shadow-sm"
          >
            <ChevronDown className="w-4 h-4" />
            {t('showMore')}
          </button>
        )}
      </div>
    </>
  )
}

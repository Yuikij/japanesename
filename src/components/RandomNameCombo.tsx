'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Shuffle } from 'lucide-react'
import type { FullNameCombo } from '@/types/name-page'
import ComboCard from './NameCard'

interface RandomNameComboProps {
  combos: FullNameCombo[]
  locale: string
}

export default function RandomNameCombo({ combos, locale }: RandomNameComboProps) {
  const t = useTranslations('namePage.randomCombo')

  const [index, setIndex] = useState(0)

  const roll = useCallback(() => {
    setIndex(Math.floor(Math.random() * combos.length))
  }, [combos.length])

  if (combos.length === 0) return null
  const combo = combos[index % combos.length]

  return (
    <section className="py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h2>
          <p className="text-gray-500">{t('subtitle')}</p>
        </div>

        <ComboCard combo={combo} locale={locale} variant="detail" />

        <div className="mt-6 text-center">
          <button
            onClick={roll}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Shuffle className="w-4 h-4" />
            {t('rollAgain')}
          </button>
        </div>
      </div>
    </section>
  )
}

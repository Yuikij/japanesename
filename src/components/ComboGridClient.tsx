'use client'

import type { FullNameCombo } from '@/types/name-page'
import ComboCardInteractive from './ComboCardInteractive'

interface ComboGridClientProps {
  combos: FullNameCombo[]
  locale: string
}

export default function ComboGridClient({ combos, locale }: ComboGridClientProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {combos.map(combo => (
        <ComboCardInteractive key={combo.id} combo={combo} locale={locale} />
      ))}
    </div>
  )
}

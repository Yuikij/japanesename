import type { FullNameCombo, KanjiBreakdownEntry } from '@/types/name-page'

interface ComboCardProps {
  combo: FullNameCombo
  locale: string
  variant?: 'compact' | 'detail'
}

function safe(val: string | null | undefined): string {
  return val?.trim() || ''
}

function KanjiBreakdown({ entries, locale }: { entries: KanjiBreakdownEntry[]; locale: string }) {
  if (!entries?.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {entries.map((e, i) => (
        <span key={i} className="inline-flex items-baseline gap-1 text-xs">
          <span className="font-semibold text-gray-700">{e.kanji}</span>
          <span className="text-gray-400">({e.reading})</span>
          {e.meanings_en?.[0] && (
            <span className="text-gray-500">{e.meanings_en[0]}</span>
          )}
        </span>
      ))}
    </div>
  )
}

function CombinedKanjiBreakdown({ combo, locale }: { combo: FullNameCombo; locale: string }) {
  const familyBreakdown = combo.family.kanji_breakdown ?? []
  const givenBreakdown = combo.given.kanji_breakdown ?? []
  const all = [...familyBreakdown, ...givenBreakdown]
  if (all.length === 0) return null

  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
        {locale === 'zh' ? '汉字解析' : 'Kanji Breakdown'}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {all.map((e, i) => (
          <span key={i} className="inline-flex items-baseline gap-1 text-sm">
            <span className="font-bold text-gray-800">{e.kanji}</span>
            <span className="text-gray-400 text-xs">({e.reading})</span>
            {e.meanings_en?.[0] && (
              <span className="text-gray-500 text-xs">— {e.meanings_en[0]}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ComboCard({ combo, locale, variant = 'compact' }: ComboCardProps) {
  const givenMeaning = locale === 'zh'
    ? safe(combo.given.meaning_zh) || safe(combo.given.meaning_en)
    : safe(combo.given.meaning_en)
  const familyMeaning = locale === 'zh'
    ? safe(combo.family.meaning_zh) || safe(combo.family.meaning_en)
    : safe(combo.family.meaning_en)

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group hover:border-pink-200">
        <div className="text-center mb-2">
          <div className="text-2xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors tracking-wider">
            {combo.fullKanji}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{combo.fullReading}</div>
          <div className="text-sm font-medium text-gray-600">{combo.fullRomaji}</div>
        </div>

        {(givenMeaning || familyMeaning) && (
          <p className="text-xs text-gray-500 text-center line-clamp-2 mb-2">
            {[familyMeaning, givenMeaning].filter(Boolean).join(' · ')}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-1">
          {combo.combinedVibes.slice(0, 2).map(v => (
            <span key={v} className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-500">
              {v}
            </span>
          ))}
          {combo.combinedElements.slice(0, 1).map(e => (
            <span key={e} className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-500">
              {e}
            </span>
          ))}
        </div>
      </div>
    )
  }

  // Detail variant — used for quiz results and featured combos
  const givenDesc = locale === 'zh'
    ? safe(combo.given.description_zh) || safe(combo.given.description_en)
    : safe(combo.given.description_en)
  const familyDesc = locale === 'zh'
    ? safe(combo.family.description_zh) || safe(combo.family.description_en)
    : safe(combo.family.description_en)
  const description = givenDesc || familyDesc

  const famousBearers = [
    ...(combo.family.famous_bearers ?? []),
    ...(combo.given.famous_bearers ?? []),
  ].slice(0, 3)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-pink-200 transition-all duration-200 group">
      {/* Name header */}
      <div className="text-center mb-4">
        <div className="text-3xl sm:text-4xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors tracking-widest mb-1">
          {combo.fullKanji}
        </div>
        <div className="text-sm text-gray-400">{combo.fullReading}</div>
        <div className="text-base font-semibold text-gray-600 mt-0.5">{combo.fullRomaji}</div>
      </div>

      {/* Meanings */}
      {(familyMeaning || givenMeaning) && (
        <div className="text-center mb-3">
          <div className="text-sm text-gray-600">
            {familyMeaning && (
              <span>
                <span className="font-medium text-gray-700">{combo.family.kanji}</span>{' '}
                <span className="text-gray-500">{familyMeaning}</span>
              </span>
            )}
            {familyMeaning && givenMeaning && <span className="mx-2 text-gray-300">+</span>}
            {givenMeaning && (
              <span>
                <span className="font-medium text-gray-700">{combo.given.kanji}</span>{' '}
                <span className="text-gray-500">{givenMeaning}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 text-center line-clamp-3 mb-3 italic">
          &ldquo;{description}&rdquo;
        </p>
      )}

      {/* Kanji breakdown */}
      <CombinedKanjiBreakdown combo={combo} locale={locale} />

      {/* Famous bearers */}
      {famousBearers.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
            {locale === 'zh' ? '相关名人' : 'Notable Bearers'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {famousBearers.map((fb, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                {fb.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap justify-center gap-1.5">
        {combo.combinedVibes.slice(0, 3).map(v => (
          <span key={v} className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-500">
            {v}
          </span>
        ))}
        {combo.combinedElements.slice(0, 2).map(e => (
          <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-sky-50 text-sky-500">
            {e}
          </span>
        ))}
        {combo.era && combo.era !== 'modern' && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-50 text-violet-500">
            {combo.era}
          </span>
        )}
      </div>
    </div>
  )
}

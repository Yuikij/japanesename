'use client'

import { useState, useCallback, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { RotateCcw, Sparkles } from 'lucide-react'
import type { FullNameCombo, QuizRound, FilterCondition } from '@/types/name-page'
import { filterCombos } from '@/lib/name-filter'
import ComboCard from './NameCard'
import ComboCardInteractive from './ComboCardInteractive'

interface NameQuizProps {
  quiz: QuizRound[]
  combos: FullNameCombo[]
  locale: string
}

export default function NameQuiz({ quiz, combos, locale }: NameQuizProps) {
  const t = useTranslations('namePage.quiz')

  const [currentRound, setCurrentRound] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const accumulatedFilters = useMemo(() => {
    const filters: FilterCondition[] = []
    for (let i = 0; i < selectedOptions.length; i++) {
      const round = quiz[i]
      const optIdx = selectedOptions[i]
      if (round && optIdx !== undefined) {
        filters.push(...round.options[optIdx].filters)
      }
    }
    return filters
  }, [quiz, selectedOptions])

  const results = useMemo(() => {
    if (!showResults) return null
    const matched = filterCombos(combos, accumulatedFilters)
    const topCombos = matched.slice(0, 10)
    const featured = topCombos[0] ?? null
    return { featured, topCombos, total: matched.length }
  }, [showResults, combos, accumulatedFilters])

  const handleSelect = useCallback((optionIndex: number) => {
    const newSelections = [...selectedOptions.slice(0, currentRound), optionIndex]
    setSelectedOptions(newSelections)

    if (currentRound < quiz.length - 1) {
      setCurrentRound(currentRound + 1)
    } else {
      setShowResults(true)
    }
  }, [currentRound, selectedOptions, quiz.length])

  const reset = useCallback(() => {
    setCurrentRound(0)
    setSelectedOptions([])
    setShowResults(false)
  }, [])

  const currentQuizRound = quiz[currentRound]

  if (showResults && results) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Sparkles className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('resultTitle')}</h2>
            {results.total > 0 && (
              <p className="text-gray-500">
                {t('resultSubtitle', { count: results.total })}
              </p>
            )}
          </div>

          {results.total === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-6">{t('noResults')}</p>
              <button onClick={reset} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                <RotateCcw className="w-4 h-4" />
                {t('tryAgain')}
              </button>
            </div>
          ) : (
            <>
              {/* Featured combo */}
              {results.featured && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{t('recommendedCombo')}</h3>
                  <div className="max-w-lg mx-auto">
                    <div className="ring-2 ring-pink-200 rounded-2xl">
                      <ComboCard combo={results.featured} locale={locale} variant="detail" />
                    </div>
                  </div>
                </div>
              )}

              {/* Other top matches */}
              {results.topCombos.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    {t('otherMatches')}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {results.topCombos.slice(1).map(combo => (
                      <ComboCardInteractive key={combo.id} combo={combo} locale={locale} />
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center">
                <button onClick={reset} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                  {t('tryAgain')}
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    )
  }

  if (!currentQuizRound) return null

  const question = locale === 'zh' ? currentQuizRound.question_zh : currentQuizRound.question_en

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h2>
          <p className="text-gray-500">{t('subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500">
              {t('step', { current: currentRound + 1, total: quiz.length })}
            </span>
            <div className="flex gap-1.5">
              {quiz.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition-colors ${
                    i < currentRound ? 'bg-pink-400' : i === currentRound ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question */}
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">{question}</h3>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuizRound.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="group flex flex-col items-start p-4 rounded-xl border border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 transition-all duration-200 text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  {opt.emoji && <span className="text-lg">{opt.emoji}</span>}
                  <span className="font-semibold text-gray-700 group-hover:text-pink-600">
                    {locale === 'zh' ? opt.label_zh : opt.label_en}
                  </span>
                </div>
                {(opt.desc_en || opt.desc_zh) && (
                  <span className="text-xs text-gray-400 group-hover:text-pink-400">
                    {locale === 'zh' ? (opt.desc_zh ?? opt.desc_en) : opt.desc_en}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

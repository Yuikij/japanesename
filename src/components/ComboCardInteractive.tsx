'use client'

import { useState, useCallback, useEffect } from 'react'
import type { FullNameCombo } from '@/types/name-page'
import ComboCard from './NameCard'
import { X } from 'lucide-react'

interface ComboCardInteractiveProps {
  combo: FullNameCombo
  locale: string
}

export default function ComboCardInteractive({ combo, locale }: ComboCardInteractiveProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left w-full cursor-pointer"
        aria-label={`${combo.fullRomaji} — ${locale === 'zh' ? '查看详情' : 'View details'}`}
      >
        <ComboCard combo={combo} locale={locale} variant="compact" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <ComboCard combo={combo} locale={locale} variant="detail" />
          </div>
        </div>
      )}
    </>
  )
}

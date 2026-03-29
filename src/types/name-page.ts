export interface FilterCondition {
  field: string
  op: string
  value: string | string[] | boolean
}

export interface FilterRule {
  must: FilterCondition[]
  should: FilterCondition[]
}

export interface QuizOption {
  label_en: string
  label_zh: string
  emoji?: string
  desc_en?: string
  desc_zh?: string
  filters: FilterCondition[]
}

export interface QuizRound {
  round: number
  question_en: string
  question_zh: string
  options: QuizOption[]
}

export interface KanjiBreakdownEntry {
  kanji: string
  meanings_en: string[]
  reading: string
}

export interface FamousBearer {
  name: string
  name_jp?: string
  context?: string
}

export interface NameRecord {
  id: string
  romaji: string
  kanji: string
  reading: string
  gender: string
  name_part: string
  syllable_count: number
  era?: string
  popularity?: string
  vibe?: string[]
  element?: string[]
  use_case?: string[]
  kanji_meaning_tags?: string[]
  meaning_en?: string | null
  description_en?: string | null
  meaning_zh?: string | null
  description_zh?: string | null
  mora_count?: number
  kanji_count?: number
  kanji_breakdown?: KanjiBreakdownEntry[]
  famous_bearers?: FamousBearer[]
  etymology_en?: string | null
  national_rank?: number | null
  romaji_initial?: string
}

export interface FullNameCombo {
  id: string
  family: NameRecord
  given: NameRecord
  fullKanji: string
  fullReading: string
  fullRomaji: string
  combinedVibes: string[]
  combinedElements: string[]
  era: string
}

export interface KeywordRecord {
  id: string
  keyword: string
  search_volume: number
  search_volume_total?: number
  keyword_aliases?: { keyword: string; search_volume: number }[]
  strategy: string
  path: string
  priority: number
  status: string
  filter_rule?: FilterRule | null
  quiz?: QuizRound[] | null
  related_keywords?: {
    label: string
    path: string
    filter_rules?: FilterCondition[]
  }[]
  seo?: {
    title?: string
    h1?: string
    description?: string
  } | null
  seo_guidance?: string | null
  dimensions?: Record<string, string[]> | null
}

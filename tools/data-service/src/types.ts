export interface Env {
  DB: D1Database;
  API_SECRET: string;
}

// ── Tag ──

export interface TagDimension {
  id: number;
  dimension: string;
  value: string;
  label_en: string | null;
  label_zh: string | null;
  sort_order: number;
  created_at: string;
}

// ── Name ──

export interface NameRecord {
  id: string;
  romaji: string;
  kanji: string;
  reading: string;
  gender: "female" | "male" | "unisex";
  name_part: "given_name" | "family_name";
  syllable_count: number;
  script: string[];
  romaji_initial: string;
  era: string | null;
  popularity: string | null;
  origin_region: string;
  use_case: string[];
  vibe: string[];
  element: string[];
  kanji_meaning_tags: string[];
  meaning_en: string | null;
  meaning_zh: string | null;
  description_en: string | null;
  description_zh: string | null;
  famous_bearers: { name: string; context: string }[];
  related_names: string[];
  reading_romaji_variants: string[];
  estimated_population: number | null;
  status: "raw" | "llm_enriched" | "reviewed" | "complete";
  source: string | null;
  created_at: string;
  updated_at: string;
}

export interface NameInput {
  id?: string;
  romaji: string;
  kanji: string;
  reading: string;
  gender: "female" | "male" | "unisex";
  name_part: "given_name" | "family_name";
  syllable_count: number;
  script?: string[];
  era?: string;
  popularity?: string;
  origin_region?: string;
  use_case?: string[];
  vibe?: string[];
  element?: string[];
  kanji_meaning_tags?: string[];
  meaning_en?: string;
  meaning_zh?: string;
  description_en?: string;
  description_zh?: string;
  famous_bearers?: { name: string; context: string }[];
  related_names?: string[];
  reading_romaji_variants?: string[];
  estimated_population?: number;
  status?: string;
  source?: string;
}

// ── Keyword ──

export interface KeywordRecord {
  id: string;
  keyword: string;
  search_volume: number | null;
  search_volume_total: number | null;
  kd: number | null;
  cpc: number | null;
  intent: string | null;
  strategy: string | null;
  path: string | null;
  priority: number;
  status: string;
  keyword_aliases: unknown[];
  tags_hint: unknown | null;
  dimensions: string | null;
  seo: unknown | null;
  seo_guidance: string | null;
  filter_rule: unknown | null;
  quiz: unknown[] | null;
  related_keywords: unknown[];
  page_template_type: string | null;
  relevance_score: number | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}

// ── Filter Rule DSL ──

export type FilterOp =
  | "eq"
  | "any_of"
  | "all_of"
  | "gte"
  | "lte"
  | "gt"
  | "lt"
  | "starts_with"
  | "contains";

export interface FilterCondition {
  field: string;
  op: FilterOp;
  value: string | number | string[];
}

export interface FilterRule {
  must: FilterCondition[];
  should: FilterCondition[];
}

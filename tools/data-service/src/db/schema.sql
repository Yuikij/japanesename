-- ============================================================
-- Tag 枚举表
-- ============================================================
CREATE TABLE IF NOT EXISTS tag_dimensions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  dimension  TEXT NOT NULL,
  value      TEXT NOT NULL,
  label_en   TEXT,
  label_zh   TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(dimension, value)
);

-- ============================================================
-- Name 库（核心表）
-- ============================================================
CREATE TABLE IF NOT EXISTS names (
  id               TEXT PRIMARY KEY,
  romaji           TEXT NOT NULL,
  kanji            TEXT NOT NULL,
  reading          TEXT NOT NULL,

  gender           TEXT NOT NULL CHECK (gender IN ('female', 'male', 'unisex')),
  name_part        TEXT NOT NULL CHECK (name_part IN ('given_name', 'family_name')),
  syllable_count   INTEGER NOT NULL,
  script           TEXT NOT NULL DEFAULT '[]',

  romaji_initial   TEXT GENERATED ALWAYS AS (UPPER(SUBSTR(romaji, 1, 1))) STORED,

  era              TEXT CHECK (era IN ('ancient', 'traditional', 'modern', '2000s', 'trending')),
  popularity       TEXT CHECK (popularity IN ('very_common', 'common', 'uncommon', 'rare', 'unique')),
  origin_region    TEXT DEFAULT 'japan_native'
                        CHECK (origin_region IN ('japan_native', 'japanese_american', 'international')),
  use_case         TEXT NOT NULL DEFAULT '[]',
  vibe             TEXT NOT NULL DEFAULT '[]',
  element          TEXT DEFAULT '[]',
  kanji_meaning_tags TEXT NOT NULL DEFAULT '[]',

  meaning_en       TEXT,
  meaning_zh       TEXT,
  description_en   TEXT,
  description_zh   TEXT,
  famous_bearers   TEXT DEFAULT '[]',
  related_names    TEXT DEFAULT '[]',
  reading_romaji_variants TEXT DEFAULT '[]',

  estimated_population INTEGER,
  kamon_url        TEXT,
  kamon_prompt     TEXT,

  status           TEXT NOT NULL DEFAULT 'raw'
                        CHECK (status IN ('raw', 'llm_enriched', 'reviewed', 'complete')),
  source           TEXT,
  created_at       TEXT DEFAULT (datetime('now')),
  updated_at       TEXT DEFAULT (datetime('now')),

  UNIQUE(kanji, reading, name_part)
);

CREATE INDEX IF NOT EXISTS idx_names_gender ON names(gender);
CREATE INDEX IF NOT EXISTS idx_names_name_part ON names(name_part);
CREATE INDEX IF NOT EXISTS idx_names_popularity ON names(popularity);
CREATE INDEX IF NOT EXISTS idx_names_era ON names(era);
CREATE INDEX IF NOT EXISTS idx_names_syllable ON names(syllable_count);
CREATE INDEX IF NOT EXISTS idx_names_status ON names(status);
CREATE INDEX IF NOT EXISTS idx_names_romaji ON names(romaji);
CREATE INDEX IF NOT EXISTS idx_names_romaji_initial ON names(romaji_initial);
CREATE INDEX IF NOT EXISTS idx_names_gender_part ON names(gender, name_part);
CREATE INDEX IF NOT EXISTS idx_names_part_pop ON names(name_part, popularity);

-- ============================================================
-- Keyword 库
-- ============================================================
CREATE TABLE IF NOT EXISTS keywords (
  id                  TEXT PRIMARY KEY,
  keyword             TEXT NOT NULL,
  search_volume       INTEGER,
  search_volume_total INTEGER,
  kd                  INTEGER,
  cpc                 REAL,
  intent              TEXT,

  strategy            TEXT CHECK (strategy IN ('category_page', 'blog_post', 'tool_page', 'homepage_seo')),
  path                TEXT,
  priority            INTEGER DEFAULT 5 CHECK (priority BETWEEN 1 AND 5),
  status              TEXT DEFAULT 'draft'
                           CHECK (status IN ('draft', 'seo_ready', 'filter_ready', 'quiz_ready', 'published')),

  keyword_aliases     TEXT DEFAULT '[]',
  tags_hint           TEXT,
  dimensions          TEXT,
  seo                 TEXT,
  seo_guidance        TEXT,
  filter_rule         TEXT,
  quiz                TEXT,
  related_keywords    TEXT DEFAULT '[]',

  page_template_type  TEXT,
  relevance_score     INTEGER,
  source              TEXT,

  created_at          TEXT DEFAULT (datetime('now')),
  updated_at          TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_keywords_strategy ON keywords(strategy);
CREATE INDEX IF NOT EXISTS idx_keywords_path ON keywords(path);
CREATE INDEX IF NOT EXISTS idx_keywords_priority ON keywords(priority);
CREATE INDEX IF NOT EXISTS idx_keywords_status ON keywords(status);

-- ============================================================
-- 自动更新 updated_at
-- ============================================================
CREATE TRIGGER IF NOT EXISTS names_updated_at
  AFTER UPDATE ON names
  FOR EACH ROW
BEGIN
  UPDATE names SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS keywords_updated_at
  AFTER UPDATE ON keywords
  FOR EACH ROW
BEGIN
  UPDATE keywords SET updated_at = datetime('now') WHERE id = NEW.id;
END;

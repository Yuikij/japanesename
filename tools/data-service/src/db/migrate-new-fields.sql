-- 新增字段迁移
ALTER TABLE names ADD COLUMN mora_count INTEGER;
ALTER TABLE names ADD COLUMN kanji_count INTEGER;
ALTER TABLE names ADD COLUMN regional_origin TEXT;
ALTER TABLE names ADD COLUMN household_count INTEGER;
ALTER TABLE names ADD COLUMN national_rank INTEGER;
ALTER TABLE names ADD COLUMN kanji_breakdown TEXT DEFAULT '[]';
ALTER TABLE names ADD COLUMN alternative_readings TEXT DEFAULT '[]';
ALTER TABLE names ADD COLUMN etymology_en TEXT;

ALTER TABLE names ADD COLUMN kamon_prompt TEXT;

-- 新增索引
CREATE INDEX IF NOT EXISTS idx_names_mora ON names(mora_count);
CREATE INDEX IF NOT EXISTS idx_names_kanji_count ON names(kanji_count);
CREATE INDEX IF NOT EXISTS idx_names_national_rank ON names(national_rank);
CREATE INDEX IF NOT EXISTS idx_names_part_rank ON names(name_part, national_rank);

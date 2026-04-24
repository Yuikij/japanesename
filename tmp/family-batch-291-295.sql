-- Ranks 291-295: Tsuda, Morikawa, Doi, Hoshi, Ochiai

-- Rank 291: Tsuda (津田)
UPDATE names SET 
  meaning_en = 'Rice paddy by the port', 
  meaning_zh = '津田', 
  kanji_breakdown = '[{"kanji":"津","romaji":"tsu","meaning_en":"port, harbor, ferry","meaning_zh":"津、港口"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to a rice paddy located near a harbor or ferry crossing.',
  vibe = '["nature-oriented","flowing","practical"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized harbor wave motif integrated with a square rice paddy grid (Ta).',
  famous_bearers = '[{"name":"Tsuda Umeko","description":"Pioneer in women education and founder of Tsuda University"},{"name":"Tsuda Kenjiro","description":"Famous voice actor"}]'
WHERE id = 'fn_tsuda__f0e487';

-- Rank 292: Morikawa (森川)
UPDATE names SET 
  meaning_en = 'Forest river', 
  meaning_zh = '森川', 
  kanji_breakdown = '[{"kanji":"森","romaji":"mori","meaning_en":"forest","meaning_zh":"森"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川"}]',
  etymology_en = 'A topographical name for someone living near a river that flows through a forest.',
  vibe = '["nature-oriented","balanced","tranquil"]',
  element = '["wood","water"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical river lines (Kawa) flanked by stylized tree silhouettes.',
  famous_bearers = '[{"name":"Morikawa Toshiyuki","description":"Prolific voice actor and founder of Axlone"}]'
WHERE id = 'fn_morikawa__cadeac';

-- Rank 293: Doi (土井)
UPDATE names SET 
  meaning_en = 'Earthen well', 
  meaning_zh = '土井', 
  kanji_breakdown = '[{"kanji":"土","romaji":"do","meaning_en":"earth, soil","meaning_zh":"土"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name referring to a well lined with earth or someone living near a well in a rural area.',
  vibe = '["grounded","practical","historical"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A square well frame (Izutsu) with a central dot representing the earth or water source.',
  famous_bearers = '[{"name":"Doi Takako","description":"First female Speaker of the House of Representatives"},{"name":"Doi Bansui","description":"Poet known for Kojō no Tsuki"}]'
WHERE id = 'fn_doi__1012a1';

-- Rank 294: Hoshi (星)
UPDATE names SET 
  meaning_en = 'Star', 
  meaning_zh = '星', 
  kanji_breakdown = '[{"kanji":"星","romaji":"hoshi","meaning_en":"star","meaning_zh":"星"}]',
  etymology_en = 'An ornamental name referring to stars. Rare as a single-kanji surname, often associated with specific lineages or professions.',
  vibe = '["mystical","bright","celestial"]',
  element = '["fire"]',
  status = 'enriched',
  kamon_prompt = 'Multiple circular dots arranged in a celestial constellation pattern, typically the "Nine Stars" (Kuyō).',
  famous_bearers = '[{"name":"Hoshi Shinichi","description":"Famous science fiction novelist known for short-short stories"}]'
WHERE id = 'fn_hoshi__6f85a1';

-- Rank 295: Ochiai (落合)
UPDATE names SET 
  meaning_en = 'Meeting of waters', 
  meaning_zh = '落合', 
  kanji_breakdown = '[{"kanji":"落","romaji":"ochi","meaning_en":"fall, drop","meaning_zh":"落"},{"kanji":"合","romaji":"ai","meaning_en":"join, meet, fit","meaning_zh":"合"}]',
  etymology_en = 'A topographical name referring to a place where two rivers or valleys meet.',
  vibe = '["nature-oriented","flowing","unifying"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Two converging curved lines representing rivers meeting, within a circular frame.',
  famous_bearers = '[{"name":"Ochiai Hiromitsu","description":"Legendary baseball player and manager"}]'
WHERE id = 'fn_ochiai__9ea855';

-- Ranks 271-275: Iijima, Tani, Abe, Oosawa, Ishitsuka

-- Rank 271: Iijima (椋扯 -> 饭岛)
UPDATE names SET 
  meaning_en = 'Meal island', 
  meaning_zh = '饭岛', 
  kanji_breakdown = '[{"kanji":"饭","romaji":"ii","meaning_en":"cooked rice, meal","meaning_zh":"饭、米饭"},{"kanji":"岛","romaji":"jima","meaning_en":"island","meaning_zh":"岛"}]',
  etymology_en = 'A topographical name for an island or high ground that was fertile enough to produce plenty of "meal" (rice).',
  vibe = '["bountiful","stable","balanced"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized island shape with a rice-bowl silhouette or grain motif integrated, within a circle.',
  famous_bearers = '[{"name":"Ai Iijima","description":"Famous media personality"}]'
WHERE id = 'fn_iijima__ad6aa2';

-- Rank 272: Tani (璋? -> 谷)
UPDATE names SET 
  meaning_en = 'Valley', 
  meaning_zh = '谷', 
  kanji_breakdown = '[{"kanji":"谷","romaji":"tani","meaning_en":"valley","meaning_zh":"谷"}]',
  etymology_en = 'A simple topographical name for someone from a valley.',
  vibe = '["nature-oriented","tranquil","grounded"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A minimalist V-shape representing a valley, with two peaks and a central stream line.',
  famous_bearers = '[{"name":"Tanizaki Junichiro","description":"Major figure in modern Japanese literature"}]'
WHERE id = 'fn_tani__03c59a';

-- Rank 273: Abe (瀹夐儴 -> 安部)
-- Note: Different from the more common Abe (安部) Rank 33, but shares historical roots.
UPDATE names SET 
  meaning_en = 'Peaceful area', 
  meaning_zh = '安部', 
  kanji_breakdown = '[{"kanji":"安","romaji":"a","meaning_en":"peace, peaceful, cheap","meaning_zh":"安"},{"kanji":"部","romaji":"be","meaning_en":"section, guild, area","meaning_zh":"部、区域"}]',
  etymology_en = 'An administrative or topographical name. "An" means peace/safety, and "be" refers to an ancient guild or occupational group settled in a specific area.',
  vibe = '["peaceful","stable","historical"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized roof (An) sheltering a administrative section mark (Be), within a circular border.',
  famous_bearers = '[{"name":"Abe Hiroshi","description":"Famous actor"},{"name":"Abe Kobo","description":"Famous writer"}]'
WHERE id = 'fn_abe__a251a7';

-- Rank 274: Oosawa (澶ф并 -> 大泽)
UPDATE names SET 
  meaning_en = 'Large swamp, great marsh', 
  meaning_zh = '大泽', 
  kanji_breakdown = '[{"kanji":"大","romaji":"oo","meaning_en":"big, large","meaning_zh":"大"},{"kanji":"泽","romaji":"sawa","meaning_en":"swamp, marsh, creek","meaning_zh":"泽、沼泽"}]',
  etymology_en = 'A topographical name for someone living near a large swamp or marshland.',
  vibe = '["vast","mysterious","nature-oriented"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'Wavy marsh lines (Sawa) with a bold "Big" (Dai) character silhouette integrated.',
  famous_bearers = '[{"name":"Osawa Takao","description":"Award-winning actor"}]'
WHERE id = 'fn_oosawa__042219';

-- Rank 275: Ishitsuka (鐭冲 -> 石冢)
UPDATE names SET 
  meaning_en = 'Stone mound, stone tomb', 
  meaning_zh = '石冢', 
  kanji_breakdown = '[{"kanji":"石","romaji":"ishi","meaning_en":"stone, rock","meaning_zh":"石"},{"kanji":"冢","romaji":"tsuka","meaning_en":"mound, tomb, hillock","meaning_zh":"冢、石堆"}]',
  etymology_en = 'A topographical name for someone living near a stone burial mound or a significant pile of stones.',
  vibe = '["historical","eternal","solid"]',
  element = '["earth","stone"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized stacking stones (Ishi) forming a mound silhouetted against a circle.',
  famous_bearers = '[{"name":"Ishitsuka Unsho","description":"Famous voice actor (Professor Oak in Pokemon)"}]'
WHERE id = 'fn_ishitsuka__f48a84';

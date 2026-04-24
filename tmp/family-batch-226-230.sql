-- Ranks 226-230: Shibuya, Uemura, Onodera, Oyama, Okamura

-- Rank 226: Shibuya (渋谷)
UPDATE names SET 
  meaning_en = 'Bitter valley', 
  meaning_zh = '涩谷', 
  kanji_breakdown = '[{"kanji":"涩","romaji":"shibu","meaning_en":"bitter, astringent","meaning_zh":"涩、不滑润"},{"kanji":"谷","romaji":"ya","meaning_en":"valley","meaning_zh":"谷"}]',
  etymology_en = 'A topographical name referring to a valley with water containing high iron or mineral content, giving it a bitter taste. Also a famous district in Tokyo.',
  vibe = '["urban","historical","nature-oriented"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized valley lines within a circular frame, with a texture representing the "astringency".',
  famous_bearers = '[{"name":"Shibuya Gihei","description":"Edo period entrepreneur"}]'
WHERE id = 'fn_shibuya__d92b98';

-- Rank 227: Uemura (上村)
UPDATE names SET 
  meaning_en = 'Upper village', 
  meaning_zh = '上村', 
  kanji_breakdown = '[{"kanji":"上","romaji":"ue","meaning_en":"upper, above","meaning_zh":"上、上方"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name identifying residents of the upper part of a village, often situated on higher ground.',
  vibe = '["stable","elevated","traditional"]',
  element = '["earth","direction"]',
  status = 'enriched',
  kamon_prompt = 'A stylized village gate icon with a bold upward arrow or line above it.',
  famous_bearers = '[{"name":"Naomi Uemura","description":"Famous mountaineer and adventurer"}]'
WHERE id = 'fn_uemura__66faf2';

-- Rank 228: Onodera (小野寺)
UPDATE names SET 
  meaning_en = 'Temple in the small field', 
  meaning_zh = '小野寺', 
  kanji_breakdown = '[{"kanji":"小","romaji":"o","meaning_en":"small","meaning_zh":"小"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野、原野"},{"kanji":"寺","romaji":"dera","meaning_en":"temple","meaning_zh":"寺、寺庙"}]',
  etymology_en = 'A topographical name referring to a temple situated in a small field. Many families with this name descend from the Fujiwara clan.',
  vibe = '["spiritual","noble","structured"]',
  element = '["temple","earth"]',
  status = 'enriched',
  kamon_prompt = 'A temple roof silhouette over a minimalist field pattern within a circle.',
  famous_bearers = '[{"name":"Onodera Gin","description":"Historical figure"}]'
WHERE id = 'fn_onodera__9826bf';

-- Rank 229: Oyama (大山)
UPDATE names SET 
  meaning_en = 'Great mountain', 
  meaning_zh = '大山', 
  kanji_breakdown = '[{"kanji":"大","romaji":"o","meaning_en":"great, large","meaning_zh":"大"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name for someone living near a large mountain. Often refers to Mount Daisen in Tottori or Mount Oyama in Kanagawa.',
  vibe = '["grand","stable","natural"]',
  element = '["mountain","earth"]',
  status = 'enriched',
  kamon_prompt = 'A single, bold, large mountain peak silhouette centered in a circular border.',
  famous_bearers = '[{"name":"Masutatsu Oyama","description":"Founder of Kyokushin Karate"}]'
WHERE id = 'fn_ooyama__e13d2f';

-- Rank 230: Okamura (冈村)
UPDATE names SET 
  meaning_en = 'Hill village', 
  meaning_zh = '冈村', 
  kanji_breakdown = '[{"kanji":"冈","romaji":"oka","meaning_en":"hill, ridge","meaning_zh":"冈、山岗"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name for a village situated on a hill or ridge.',
  vibe = '["traditional","stable","elevated"]',
  element = '["earth","settlement"]',
  status = 'enriched',
  kamon_prompt = 'A stylized hill ridge line with a village gate symbol nestled against it.',
  famous_bearers = '[{"name":"Takashi Okamura","description":"Famous comedian and actor"}]'
WHERE id = 'fn_okamura__19ee79';

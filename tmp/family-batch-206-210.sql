-- Ranks 206-210: Oka, Kawashima, Kataoka, Tomita, Okuda

-- Rank 206: Oka (冈)
UPDATE names SET 
  meaning_en = 'Hill', 
  meaning_zh = '冈', 
  kanji_breakdown = '[{"kanji":"冈","romaji":"oka","meaning_en":"hill, ridge","meaning_zh":"冈、丘陵"}]',
  etymology_en = 'A topographical name meaning "hill" or "rising ground".',
  vibe = '["nature-oriented","stable","elevated"]',
  element = '["earth","mountain"]',
  status = 'enriched',
  kamon_prompt = 'A stylized gentle curve representing a hill ridge within a circular border.',
  famous_bearers = '[{"name":"Miki Oka","description":"Famous personality"}]'
WHERE id = 'fn_oka__53dd58';

-- Rank 207: Kawashima (川岛)
UPDATE names SET 
  meaning_en = 'River island', 
  meaning_zh = '川岛', 
  kanji_breakdown = '[{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川、河流"},{"kanji":"岛","romaji":"shima","meaning_en":"island","meaning_zh":"岛"}]',
  etymology_en = 'A topographical name for someone living on an island in a river.',
  vibe = '["nature-oriented","water-themed","isolated"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical river lines surrounding a central island or wave pattern.',
  famous_bearers = '[{"name":"Eiji Kawashima","description":"Professional footballer (Goalkeeper)"}]'
WHERE id = 'fn_kawashima__f452be';

-- Rank 208: Kataoka (片冈)
UPDATE names SET 
  meaning_en = 'Side of the hill', 
  meaning_zh = '片冈', 
  kanji_breakdown = '[{"kanji":"片","romaji":"kata","meaning_en":"one side, piece","meaning_zh":"片、一侧"},{"kanji":"冈","romaji":"oka","meaning_en":"hill","meaning_zh":"冈"}]',
  etymology_en = 'A topographical name, indicating a location on one side of a hill or ridge.',
  vibe = '["nature-oriented","stable","structured"]',
  element = '["earth","landscape"]',
  status = 'enriched',
  kamon_prompt = 'A semi-circle hill silhouette positioned to one side of a central axis.',
  famous_bearers = '[{"name":"Ainosuke Kataoka VI","description":"Famous Kabuki actor"}]'
WHERE id = 'fn_kataoka__bed8c7';

-- Rank 209: Tomita (富田)
UPDATE names SET 
  meaning_en = 'Abundant rice paddy', 
  meaning_zh = '富田', 
  kanji_breakdown = '[{"kanji":"富","romaji":"tomi","meaning_en":"abundant, wealthy","meaning_zh":"富、丰饶"},{"kanji":"田","romaji":"ta","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to a fertile or wealthy rice field.',
  vibe = '["prosperous","fertile","classic"]',
  element = '["earth","wealth"]',
  status = 'enriched',
  kamon_prompt = 'Abundant rice ears arranged in a circular frame, symbolizing wealth.',
  famous_bearers = '[{"name":"Isao Tomita","description":"Pioneer of electronic music"}]'
WHERE id = 'fn_tomita__b61514';

-- Rank 210: Okuda (奥田)
UPDATE names SET 
  meaning_en = 'Interior rice paddy', 
  meaning_zh = '奥田', 
  kanji_breakdown = '[{"kanji":"奥","romaji":"oku","meaning_en":"interior, back","meaning_zh":"奥、深处"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name, referring to a rice paddy located further into the back of a valley or mountains.',
  vibe = '["traditional","stable","village-life"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy symbol with stylized mountain peaks behind it.',
  famous_bearers = '[{"name":"Tamio Okuda","description":"Singer-songwriter and producer"}]'
WHERE id = 'fn_okuda__d5bd09';

-- Ranks 216-220: Sekine, Hirayama, Makiya, Kawai, Shiroishi

-- Rank 216: Sekine (関根)
UPDATE names SET 
  meaning_en = 'Root of the gate', 
  meaning_zh = '关根', 
  kanji_breakdown = '[{"kanji":"関","romaji":"seki","meaning_en":"gate, barrier, checkpoint","meaning_zh":"关、关卡"},{"kanji":"根","romaji":"ne","meaning_en":"root, base","meaning_zh":"根、基础"}]',
  etymology_en = 'A topographical name indicating residence at the foot or base of a mountain pass or checkpoint gate.',
  vibe = '["protective","stable","historical"]',
  element = '["architecture","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized gate structure with strong root-like lines at the base.',
  famous_bearers = '[{"name":"Tsutomu Sekine","description":"Comedian and television personality"}]'
WHERE id = 'fn_sekine__f70710';

-- Rank 217: Hirayama (平山)
UPDATE names SET 
  meaning_en = 'Flat mountain', 
  meaning_zh = '平山', 
  kanji_breakdown = '[{"kanji":"平","romaji":"hira","meaning_en":"flat, level, peaceful","meaning_zh":"平、和平"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name, referring to a hill with a flat top or a mountain in a plain.',
  vibe = '["balanced","stable","peaceful"]',
  element = '["mountain","earth"]',
  status = 'enriched',
  kamon_prompt = 'A mountain silhouette with a perfectly horizontal line at the peak within a circular border.',
  famous_bearers = '[{"name":"Ikuo Hirayama","description":"Famous painter and UNESCO Goodwill Ambassador"}]'
WHERE id = 'fn_hirayama__c87146';

-- Rank 218: Makiya (牧野) - Actually "牧野" is usually "Makino". Check Kanji.
-- ID: fn_bokuya__fe702f, Romaji in DB: bokuya, Kanji: 鐗ч噹 -> 牧野
-- Note: 牧野 is usually Makino, but sometimes Bokuya/Makiya. Proceed with 牧野 (Field of Pasture).
UPDATE names SET 
  meaning_en = 'Field of pasture', 
  meaning_zh = '牧野', 
  kanji_breakdown = '[{"kanji":"牧","romaji":"maki","meaning_en":"pasture, breed","meaning_zh":"牧、放牧"},{"kanji":"野","romaji":"no","meaning_en":"field","meaning_zh":"野、原野"}]',
  etymology_en = 'A topographical name indicating a location near grazing land or a pasture field.',
  vibe = '["natural","pastoral","spacious"]',
  element = '["earth","animal"]',
  status = 'enriched',
  kamon_prompt = 'A stylized rolling field with small grass icons, representing a pasture.',
  famous_bearers = '[{"name":"Tomitaro Makino","description":"Pioneer of Japanese botany"}]'
WHERE id = 'fn_bokuya__fe702f';

-- Rank 219: Kawai (河合)
UPDATE names SET 
  meaning_en = 'Meeting of rivers', 
  meaning_zh = '河合', 
  kanji_breakdown = '[{"kanji":"河","romaji":"kawa","meaning_en":"river","meaning_zh":"河、河流"},{"kanji":"合","romaji":"ai","meaning_en":"join, meet, fit","meaning_zh":"合、汇合"}]',
  etymology_en = 'A topographical name describing a location where two rivers meet or converge.',
  vibe = '["harmonious","connected","natural"]',
  element = '["water","union"]',
  status = 'enriched',
  kamon_prompt = 'Two flowing lines converging into one, symbolizing the meeting of rivers.',
  famous_bearers = '[{"name":"Kawai Kanjiro","description":"Famous potter and artist"}]'
WHERE id = 'fn_kawai__b77486';

-- Rank 220: Shiroishi (白石)
UPDATE names SET 
  meaning_en = 'White stone', 
  meaning_zh = '白石', 
  kanji_breakdown = '[{"kanji":"白","romaji":"shiro","meaning_en":"white","meaning_zh":"白"},{"kanji":"石","romaji":"ishi","meaning_en":"stone, rock","meaning_zh":"石、石头"}]',
  etymology_en = 'A topographical name referring to a place with white stones or rocks, possibly bleached by water or sun.',
  vibe = '["pure","solid","natural"]',
  element = '["earth","color"]',
  status = 'enriched',
  kamon_prompt = 'Stacked smooth stones within a circle, highlighted with a pure white emblem.',
  famous_bearers = '[{"name":"Mai Shiroishi","description":"Former member of Nogizaka46"}]'
WHERE id = 'fn_shiroishi__d685e3';

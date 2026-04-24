-- Ranks 231-235: Sakaguchi, Adachi, Tada, Amano, Konpon

-- Rank 231: Sakaguchi (坂口)
UPDATE names SET 
  meaning_en = 'Entrance to the slope', 
  meaning_zh = '坂口', 
  kanji_breakdown = '[{"kanji":"坂","romaji":"saka","meaning_en":"slope, incline","meaning_zh":"坂、斜坡"},{"kanji":"口","romaji":"guchi","meaning_en":"mouth, entrance","meaning_zh":"口、入口"}]',
  etymology_en = 'A topographical name indicating a residence at the foot or entrance of a slope or hill.',
  vibe = '["nature-oriented","directional","classic"]',
  element = '["earth","landscape"]',
  status = 'enriched',
  kamon_prompt = 'A stylized diagonal line representing a slope with a square "mouth" symbol at the base.',
  famous_bearers = '[{"name":"Ango Sakaguchi","description":"Famous novelist and essayist"},{"name":"Kentaro Sakaguchi","description":"Popular actor and model"}]'
WHERE id = 'fn_sakaguchi__8a1750';

-- Rank 232: Adachi (足立)
UPDATE names SET 
  meaning_en = 'Standing feet', 
  meaning_zh = '足立', 
  kanji_breakdown = '[{"kanji":"足","romaji":"ada","meaning_en":"foot, leg","meaning_zh":"足、脚"},{"kanji":"立","romaji":"chi","meaning_en":"stand, establish","meaning_zh":"立、站立"}]',
  etymology_en = 'A topographic or ritual name. One legend says it refers to a place where a deity "stood their feet" or where someone established a footing. Common in eastern Japan.',
  vibe = '["active","historical","stable"]',
  element = '["human","action"]',
  status = 'enriched',
  kamon_prompt = 'Two stylized footprints or solid pillar-like lines representing a firm stance.',
  famous_bearers = '[{"name":"Adachi Mitsuru","description":"Famous manga artist known for Touch"}]'
WHERE id = 'fn_adachi__36a9e9';

-- Rank 233: Tada (多田)
UPDATE names SET 
  meaning_en = 'Many rice paddies', 
  meaning_zh = '多田', 
  kanji_breakdown = '[{"kanji":"多","romaji":"ta","meaning_en":"many, much","meaning_zh":"多"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name indicating an area with many rice fields. Often associated with the Tada Genji branch of the Minamoto clan.',
  vibe = '["prosperous","abundant","noble"]',
  element = '["earth","number"]',
  status = 'enriched',
  kamon_prompt = 'A pattern of multiple interlocking square rice paddy symbols, expressing abundance.',
  famous_bearers = '[{"name":"Tada Mutsumi","description":"Historical figure"}]'
WHERE id = 'fn_tada__331221';

-- Rank 234: Amano (天野)
UPDATE names SET 
  meaning_en = 'Heavenly field', 
  meaning_zh = '天野', 
  kanji_breakdown = '[{"kanji":"天","romaji":"ama","meaning_en":"heaven, sky","meaning_zh":"天、天空"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野、原野"}]',
  etymology_en = 'A topographical name referring to a "heavenly" or exceptionally beautiful field, or a field dedicated to a shrine (imperial/divine land).',
  vibe = '["spiritual","vast","elegant"]',
  element = '["sky","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized sun or cloud above a vast horizontal field line.',
  famous_bearers = '[{"name":"Yoshitaka Amano","description":"Renowned artist and character designer for Final Fantasy"}]'
WHERE id = 'fn_amano__01cadd';

-- Rank 235: Konpon (根本) - Actually "根本" is usually "Nemoto".
-- ID: fn_konpon__da1633, Romaji in DB: konpon, Kanji: 鏍规湰 -> 根本
-- Note: 根本 is predominantly read as "Nemoto". I will use the standard meaning/etymology for Nemoto.
UPDATE names SET 
  meaning_en = 'Root, origin', 
  meaning_zh = '根本', 
  kanji_breakdown = '[{"kanji":"根","romaji":"ne","meaning_en":"root","meaning_zh":"根"},{"ji":"本","romaji":"moto","meaning_en":"origin, base","meaning_zh":"本、基"}]',
  etymology_en = 'A topographical name referring to someone living at the base or "root" of a mountain or large tree.',
  vibe = '["stable","foundational","natural"]',
  element = '["earth","wood"]',
  status = 'enriched',
  kamon_prompt = 'A stylized tree root system or a thick trunk base within a circular border.',
  famous_bearers = '[{"name":"Nemoto Kyoko","description":"Famous personality"}]'
WHERE id = 'fn_konpon__da1633';

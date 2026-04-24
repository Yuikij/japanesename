-- Ranks 326-330: Tokunaga, Horie, Taiboku/Ooki, Kawata, Kishi

-- Rank 326: Tokunaga (徳永)
UPDATE names SET 
  meaning_en = 'Eternal virtue', 
  meaning_zh = '德永', 
  kanji_breakdown = '[{"kanji":"徳","romaji":"toku","meaning_en":"virtue, benevolence","meaning_zh":"德"},{"kanji":"永","romaji":"naga","meaning_en":"eternal, long","meaning_zh":"永"}]',
  etymology_en = 'An auspicious name meaning "long-lasting virtue". Frequently found in Kyushu.',
  vibe = '["noble","benevolent","prosperous"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized "Toku" (徳) character within a circular border, surrounded by interlocking magatama shapes.',
  famous_bearers = '[{"name":"Tokunaga Hideaki","description":"Famous singer-songwriter known for his soulful voice"}]'
WHERE id = 'fn_tokunaga__b36705';

-- Rank 327: Horie (堀江)
UPDATE names SET 
  meaning_en = 'Moat inlet', 
  meaning_zh = '堀江', 
  kanji_breakdown = '[{"kanji":"堀","romaji":"hori","meaning_en":"moat, ditch","meaning_zh":"堀、壕沟"},{"kanji":"江","romaji":"e","meaning_en":"inlet, bay, river","meaning_zh":"江、湾"}]',
  etymology_en = 'A topographical name referring to a channel or inlet connected to a moat.',
  vibe = '["nature-oriented","structured","calm"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'Stylized water waves (Seigaiha) pattern framed within a square moat-like border.',
  famous_bearers = '[{"name":"Horie Takafumi","description":"Entrepreneur and founder of Livedoor, also known as Horiemon"},{"name":"Horie Yui","description":"Highly popular voice actress and singer"}]'
WHERE id = 'fn_horie__697ad0';

-- Rank 328: Taiboku / Ooki (大木) - Corrected Reading to Ooki for common family name
UPDATE names SET 
  meaning_en = 'Great tree', 
  meaning_zh = '大木', 
  kanji_breakdown = '[{"kanji":"大","romaji":"oo","meaning_en":"big, great","meaning_zh":"大"},{"kanji":"木","romaji":"ki","meaning_en":"tree, wood","meaning_zh":"木"}]',
  etymology_en = 'A topographical name referring to a large, prominent tree. Often used as a landmark in ancient times.',
  vibe = '["nature-oriented","solid","growth"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A single, large stylized tree with thick roots and reaching branches, enclosed in a circle.',
  famous_bearers = '[{"name":"Ooki Shizuka","description":"Japanese visual artist"}]'
WHERE id = 'fn_taiboku__222411';

-- Rank 329: Kawata (川田)
UPDATE names SET 
  meaning_en = 'River rice paddy', 
  meaning_zh = '川田', 
  kanji_breakdown = '[{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川、河流"},{"kanji":"田","romaji":"ta","meaning_en":"rice field, paddy","meaning_zh":"田、稻田"}]',
  etymology_en = 'A topographical name referring to rice fields located near a river.',
  vibe = '["nature-oriented","rural","abundant"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical river lines flowing through a grid-like rice field pattern.',
  famous_bearers = '[{"name":"Kawata Hironari","description":"Comedian and member of the duo Garage Sale"}]'
WHERE id = 'fn_kawata__8548fb';

-- Rank 330: Kishi (岸)
UPDATE names SET 
  meaning_en = 'Bank, Shore', 
  meaning_zh = '岸', 
  kanji_breakdown = '[{"kanji":"岸","romaji":"kishi","meaning_en":"bank, shore, coast","meaning_zh":"岸、水边"}]',
  etymology_en = 'A topographical name for someone living on the bank of a river or the seashore.',
  vibe = '["nature-oriented","calm","boundary"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized cliff or bank silhouette overlooking horizontal water ripples.',
  famous_bearers = '[{"name":"Nobusuke Kishi","description":"Former Prime Minister of Japan"},{"name":"Kishimoto Masashi","description":"Creator of the manga series Naruto (Kishi is a variant part of the name)"}]'
WHERE id = 'fn_kishi__36962c';

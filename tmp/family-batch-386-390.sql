-- Ranks 386-390: Aoyagi, Ogata, Furuya, Fujimura, Hirakawa

-- Rank 386: Aoyagi (青柳)
UPDATE names SET 
  meaning_en = 'Green willow', 
  meaning_zh = '青柳', 
  kanji_breakdown = '[{"kanji":"青","romaji":"ao","meaning_en":"green, blue, young","meaning_zh":"青、绿、年轻"},{"kanji":"柳","romaji":"yagi","meaning_en":"willow","meaning_zh":"柳、柳树"}]',
  etymology_en = 'A topographical name referring to a "green willow" tree. Often associated with beauty and flexibility in Japanese poetry.',
  vibe = '["nature-oriented","elegant","flexible"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Three weeping willow branches (Yanagi-mon) arranged in a circular pattern, with stylized green-themed leaves.',
  famous_bearers = '[{"name":"Aoyagi Sho","description":"Actor and singer, member of Gekidan EXILE"},{"name":"Aoyagi Koyo","description":"Professional baseball pitcher for the Hanshin Tigers"}]'
WHERE id = 'fn_aoyagi__0ebd78';

-- Rank 387: Ogata (绪方)
UPDATE names SET 
  meaning_en = 'Originating direction', 
  meaning_zh = '绪方', 
  kanji_breakdown = '[{"kanji":"緒","romaji":"o","meaning_en":"beginning, thread, cord","meaning_zh":"绪、起始、丝线"},{"kanji":"方","romaji":"gata","meaning_en":"direction, way, person","meaning_zh":"方、方向、人物"}]',
  etymology_en = 'Historically significant as the name of a powerful samurai clan in Kyushu (Bungo-Ogata). Often means "at the beginning of the field".',
  vibe = '["noble","traditional","determined"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized cord knot (Musubi-mon) or a compass-like square motif representing direction.',
  famous_bearers = '[{"name":"Ogata Sadako","description":"Former UN High Commissioner for Refugees"},{"name":"Ogata Ken","description":"Highly acclaimed Japanese actor"}]'
WHERE id = 'fn_ogata__06d759';

-- Rank 388: Furuya (古谷)
UPDATE names SET 
  meaning_en = 'Old valley', 
  meaning_zh = '古谷', 
  kanji_breakdown = '[{"kanji":"古","romaji":"furu","meaning_en":"old, ancient","meaning_zh":"古、古老"},{"kanji":"谷","romaji":"ya","meaning_en":"valley","meaning_zh":"谷"}]',
  etymology_en = 'A topographical name referring to someone living in an "old valley".',
  vibe = '["nature-oriented","ancient","stable"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A simplified mountain silhouette forming a wide valley, with a stylistic "Ancient" character (古) at the top.',
  famous_bearers = '[{"name":"Furuya Tohru","description":"Legendary voice actor (Amuro Ray, Tuxedo Mask)"},{"name":"Furuya Usamaru","description":"Notable manga artist"}]'
WHERE id = 'fn_furuya__47acf6';

-- Rank 389: Fujimura (藤村)
UPDATE names SET 
  meaning_en = 'Wisteria village', 
  meaning_zh = '藤村', 
  kanji_breakdown = '[{"kanji":"藤","romaji":"fuji","meaning_en":"wisteria","meaning_zh":"藤、紫藤"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name referring to a village known for its wisteria.',
  vibe = '["nature-oriented","community-focused","elegant"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A cluster of wisteria blossoms (Fuji-mon) surrounding a simple village gate or roof silhouette.',
  famous_bearers = '[{"name":"Shimazaki Toson","description":"Born Fujimura Toson, a major figure in Japanese literature"},{"name":"Fujimura Shinichi","description":"Infamous amateur archaeologist"}]'
WHERE id = 'fn_fujimura__fcab2e';

-- Rank 390: Hirakawa (平川)
UPDATE names SET 
  meaning_en = 'Flat river', 
  meaning_zh = '平川', 
  kanji_breakdown = '[{"kanji":"平","romaji":"hira","meaning_en":"flat, peaceful","meaning_zh":"平、平坦、和平"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川、河流"}]',
  etymology_en = 'A topographical name referring to a river flowing through a plain.',
  vibe = '["nature-oriented","peaceful","steady"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Three horizontal wavy river lines representing a calm flow through a flat landscape.',
  famous_bearers = '[{"name":"Hirakawa Daisuke","description":"Popular voice actor"},{"name":"Hirakawa Ryoma","description":"Notable Japanese actor"}]'
WHERE id = 'fn_hirakawa__b35618';

-- Ranks 221-225: Imamura, Terada, Aoyama, Nakao, Ogura

-- Rank 221: Imamura (今村)
UPDATE names SET 
  meaning_en = 'New village', 
  meaning_zh = '今村', 
  kanji_breakdown = '[{"kanji":"今","romaji":"ima","meaning_en":"now, present, new","meaning_zh":"今、现在、新"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name meaning "new village," distinguishing a newly established settlement from an older one.',
  vibe = '["fresh","stable","settlement"]',
  element = '["earth","time"]',
  status = 'enriched',
  kamon_prompt = 'A stylized village gate silhouette with a modern or sharp design, representing the "New Village".',
  famous_bearers = '[{"name":"Shohei Imamura","description":"Double Palme d''Or winning film director"}]'
WHERE id = 'fn_imamura__026201';

-- Rank 222: Terada (寺田)
UPDATE names SET 
  meaning_en = 'Temple rice paddy', 
  meaning_zh = '寺田', 
  kanji_breakdown = '[{"kanji":"寺","romaji":"tera","meaning_en":"temple","meaning_zh":"寺、寺庙"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to a rice paddy belonging to or located near a Buddhist temple.',
  vibe = '["spiritual","stable","traditional"]',
  element = '["earth","temple"]',
  status = 'enriched',
  kamon_prompt = 'A rice paddy grid with a stylized temple roof or bell silhouette at the top.',
  famous_bearers = '[{"name":"Terada Torahiko","description":"Physicist and author"}]'
WHERE id = 'fn_terada__77a102';

-- Rank 223: Aoyama (青山)
UPDATE names SET 
  meaning_en = 'Blue/Green mountain', 
  meaning_zh = '青山', 
  kanji_breakdown = '[{"kanji":"青","romaji":"ao","meaning_en":"blue, green, lush","meaning_zh":"青、绿、苍翠"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name referring to a lush, green mountain. In Japanese, "ao" covers a range of blue and green, often implying vitality.',
  vibe = '["lush","natural","tranquil"]',
  element = '["mountain","nature"]',
  status = 'enriched',
  kamon_prompt = 'Three overlapping lush mountain peaks within a circle, symbolizing the blue-green mountains.',
  famous_bearers = '[{"name":"Gosho Aoyama","description":"Manga artist known for Detective Conan"}]'
WHERE id = 'fn_aoyama__b1a6ff';

-- Rank 224: Nakao (中尾)
UPDATE names SET 
  meaning_en = 'Middle of the tail (ridge)', 
  meaning_zh = '中尾', 
  kanji_breakdown = '[{"kanji":"中","romaji":"naka","meaning_en":"middle, center","meaning_zh":"中、中间"},{"kanji":"尾","romaji":"o","meaning_en":"tail, ridge end","meaning_zh":"尾、山尾"}]',
  etymology_en = 'A topographical name indicating a location in the middle of a mountain ridge or at the "tail" of a hill.',
  vibe = '["nature-oriented","directional","precise"]',
  element = '["mountain","earth"]',
  status = 'enriched',
  kamon_prompt = 'A mountain ridge line with a central focal point, emphasizing the middle position.',
  famous_bearers = '[{"name":"Akira Nakao","description":"Famous actor and personality"}]'
WHERE id = 'fn_nakao__ede623';

-- Rank 225: Ogura (小仓)
UPDATE names SET 
  meaning_en = 'Small warehouse', 
  meaning_zh = '小仓', 
  kanji_breakdown = '[{"kanji":"小","romaji":"o","meaning_en":"small","meaning_zh":"小"},{"kanji":"仓","romaji":"gura","meaning_en":"warehouse, storehouse","meaning_zh":"仓、仓库"}]',
  etymology_en = 'A topographical name for someone living near a small storehouse. Also a famous place name (Mt. Ogura).',
  vibe = '["modest","reliable","structured"]',
  element = '["architecture","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized gabled warehouse roof silhouette within a circular frame.',
  famous_bearers = '[{"name":"Ogura Hyakunin Isshu","description":"Classical Japanese anthology of 100 poems from 100 poets"}]'
WHERE id = 'fn_ogura__2c57a6';

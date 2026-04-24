-- Ranks 361-365: Mukai, Matsushima, Shimoda, Nishimoto, Ogino

-- Rank 361: Mukai (向井)
UPDATE names SET 
  meaning_en = 'Facing well', 
  meaning_zh = '向井', 
  kanji_breakdown = '[{"kanji":"向","romaji":"mukai","meaning_en":"over there, yonder, facing","meaning_zh":"向、面对"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name referring to a family living opposite a well.',
  vibe = '["nature-oriented","direct","simple"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'A square well-frame (Izutsu) with a stylized directional arrow or a character for "mountain side" motif.',
  famous_bearers = '[{"name":"Mukai Osamu","description":"Highly popular and prolific Japanese actor"}]'
WHERE id = 'fn_mukai__320234';

-- Rank 362: Matsushima (松島)
UPDATE names SET 
  meaning_en = 'Pine island', 
  meaning_zh = '松岛', 
  kanji_breakdown = '[{"kanji":"松","romaji":"matsu","meaning_en":"pine tree","meaning_zh":"松"},{"kanji":"島","romaji":"shima","meaning_en":"island","meaning_zh":"岛"}]',
  etymology_en = 'A topographical name referring to an island covered in pine trees. Famously associated with Matsushima bay, one of Japan''s "Three Views".',
  vibe = '["nature-oriented","scenic","eternal"]',
  element = '["wood","water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized pine branch (Matsu-mon) set against a backdrop of rolling waves and a small island silhouette.',
  famous_bearers = '[{"name":"Matsushima Nanako","description":"Iconic award-winning actress (Ring, GTO, Yamato Nadeshiko)"}]'
WHERE id = 'fn_matsushima__d9a091';

-- Rank 363: Shimoda (下田)
UPDATE names SET 
  meaning_en = 'Lower rice paddy', 
  meaning_zh = '下田', 
  kanji_breakdown = '[{"kanji":"下","romaji":"shimo","meaning_en":"lower, below","meaning_zh":"下"},{"kanji":"田","romaji":"da","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to rice fields positioned at a lower elevation. Also a famous port city where Perry''s Black Ships arrived.',
  vibe = '["nature-oriented","grounded","historic"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A traditional rice field grid with a stylized downward stroke or a crescent moon below it.',
  famous_bearers = '[{"name":"Shimoda Asami","description":"Voice actress known for The Idolmaster (Futami twins)"}]'
WHERE id = 'fn_shimoda__717758';

-- Rank 364: Nishimoto (西本)
UPDATE names SET 
  meaning_en = 'Western origin', 
  meaning_zh = '西本', 
  kanji_breakdown = '[{"kanji":"西","romaji":"nishi","meaning_en":"west","meaning_zh":"西"},{"kanji":"本","romaji":"moto","meaning_en":"origin, base, book","meaning_zh":"本、根源"}]',
  etymology_en = 'A topographical name meaning "from the west" or "living to the west of the (main/original) village".',
  vibe = '["nature-oriented","directional","fundamental"]',
  element = '["metal"]',
  status = 'enriched',
  kamon_prompt = 'A stylized sun or moon set to the left (west) of a vertical tree trunk motif.',
  famous_bearers = '[{"name":"Nishimoto Tomomi","description":"World-renowned classical music conductor"}]'
WHERE id = 'fn_nishimoto__822bbe';

-- Rank 365: Ogino (荻野)
UPDATE names SET 
  meaning_en = 'Reed field', 
  meaning_zh = '荻野', 
  kanji_breakdown = '[{"kanji":"荻","romaji":"ogi","meaning_en":"reed, silver grass","meaning_zh":"荻、荻草"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野、原野"}]',
  etymology_en = 'A topographical name referring to a field where Japanese silver grass or reeds grow.',
  vibe = '["nature-oriented","autumnal","tranquil"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'Flowing strands of silver grass (Ogi-mon) bending in a gentle breeze across a circular field boundary.',
  famous_bearers = '[{"name":"Ogino Makoto","description":"Manga artist known for Peacock King (Kujaku-O)"}]'
WHERE id = 'fn_ogino__4f44ea';

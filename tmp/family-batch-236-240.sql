-- Ranks 236-240: Sakuma, Toyoda, Murayama, Tsunoda, Iiduka

-- Rank 236: Sakuma (佐久间)
UPDATE names SET 
  meaning_en = 'Between Saku', 
  meaning_zh = '佐久间', 
  kanji_breakdown = '[{"kanji":"佐","romaji":"sa","meaning_en":"help, assistant","meaning_zh":"佐、辅助"},{"kanji":"久","romaji":"ku","meaning_en":"long time","meaning_zh":"久"},{"kanji":"间","romaji":"ma","meaning_en":"between, space","meaning_zh":"间、空间"}]',
  etymology_en = 'A topographical name, possibly referring to a location between the Saku region (in Nagano) or a specific valley. The clan is famously associated with the Oda clan during the Sengoku period.',
  vibe = '["noble","historical","stable"]',
  element = '["time","human"]',
  status = 'enriched',
  kamon_prompt = 'Three interlocking circles or stylized "ma" (space) symbols, representing historical nobility.',
  famous_bearers = '[{"name":"Sakuma Nobumori","description":"General under Oda Nobunaga"}]'
WHERE id = 'fn_sakuma__962d0b';

-- Rank 237: Toyoda (丰田)
UPDATE names SET 
  meaning_en = 'Bountiful rice paddy', 
  meaning_zh = '丰田', 
  kanji_breakdown = '[{"kanji":"丰","romaji":"toyo","meaning_en":"bountiful, lush","meaning_zh":"丰、丰饶"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for fertile or productive rice fields. Famous worldwide as the name associated with the Toyota Motor Corporation.',
  vibe = '["prosperous","lush","modern-iconic"]',
  element = '["earth","abundance"]',
  status = 'enriched',
  kamon_prompt = 'Three lush rice stalks arranged symmetrically inside a circular border, symbolising abundance.',
  famous_bearers = '[{"name":"Sakichi Toyoda","description":"Founder of Toyoda Automatic Loom Works"}]'
WHERE id = 'fn_toyoda__18986b';

-- Rank 238: Murayama (村山)
UPDATE names SET 
  meaning_en = 'Village mountain', 
  meaning_zh = '村山', 
  kanji_breakdown = '[{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name referring to a village near a mountain or a mountain associated with a specific village.',
  vibe = '["nature-oriented","stable","traditional"]',
  element = '["mountain","earth"]',
  status = 'enriched',
  kamon_prompt = 'A minimalist mountain silhouette with a small village gate icon at its foot.',
  famous_bearers = '[{"name":"Tomiichi Murayama","description":"Former Prime Minister of Japan"}]'
WHERE id = 'fn_murayama__9cdf50';

-- Rank 239: Tsunoda (角田)
UPDATE names SET 
  meaning_en = 'Rice paddy at the corner', 
  meaning_zh = '角田', 
  kanji_breakdown = '[{"kanji":"角","romaji":"tsuno","meaning_en":"corner, horn","meaning_zh":"角、隅"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for a rice paddy located at a corner or bend in the landscape.',
  vibe = '["nature-oriented","precise","stable"]',
  element = '["earth","geometry"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy symbol positioned within a corner-like geometric border.',
  famous_bearers = '[{"name":"Yuki Tsunoda","description":"Formula 1 driver"}]'
WHERE id = 'fn_tsunoda__7c018b';

-- Rank 240: Iiduka (饭冢) - Usually "Iizuka".
-- ID: fn_iiduka__90c264, Romaji in DB: iiduka, Kanji: 椋 -> 饭冢
UPDATE names SET 
  meaning_en = 'Mound of boiled rice', 
  meaning_zh = '饭冢', 
  kanji_breakdown = '[{"kanji":"饭","romaji":"ii","meaning_en":"boiled rice, meal","meaning_zh":"饭、食"},{"kanji":"冢","romaji":"duka","meaning_en":"mound, hillock","meaning_zh":"冢、小山"}]',
  etymology_en = 'A topographical name referring to a mound or hill shaped like a bowl of boiled rice. This often suggests religious or ritual offerings.',
  vibe = '["spiritual","stable","traditional"]',
  element = '["earth","spiritual"]',
  status = 'enriched',
  kamon_prompt = 'A stylized smooth hillock silhouette within a circular border, representing a sacred mound.',
  famous_bearers = '[{"name":"Mayumi Iizuka","description":"Famous voice actress"}]'
WHERE id = 'fn_iiduka__90c264';

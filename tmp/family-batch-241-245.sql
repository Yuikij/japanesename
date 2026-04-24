-- Ranks 241-245: Tajima, Nishi, Mutou, Takeda, Miyashita

-- Rank 241: Tajima (田岛)
UPDATE names SET 
  meaning_en = 'Island in the rice paddy', 
  meaning_zh = '田岛', 
  kanji_breakdown = '[{"kanji":"田","romaji":"ta","meaning_en":"rice paddy","meaning_zh":"田"},{"kanji":"岛","romaji":"jima","meaning_en":"island","meaning_zh":"岛"}]',
  etymology_en = 'A topographical name indicating an area of raised ground (like an island) within a rice field.',
  vibe = '["nature-oriented","stable","classic"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized island symbol surrounded by a square rice paddy grid pattern.',
  famous_bearers = '[{"name":"Nabeshima Reiko","description":"Famous personality"}]'
WHERE id = 'fn_tajima__7e0ac4';

-- Rank 242: Nishi (西)
UPDATE names SET 
  meaning_en = 'West', 
  meaning_zh = '西', 
  kanji_breakdown = '[{"kanji":"西","romaji":"nishi","meaning_en":"west","meaning_zh":"西、西方"}]',
  etymology_en = 'A topographical name identifying someone living to the west of a village or landmark.',
  vibe = '["nature-oriented","directional","simple"]',
  element = '["direction"]',
  status = 'enriched',
  kamon_prompt = 'A stylized compass needle pointing west or a sunset silhouette within a circle.',
  famous_bearers = '[{"name":"Nishi Amane","description":"Meiji period philosopher"}]'
WHERE id = 'fn_nishi__d3f28e';

-- Rank 243: Mutou (武藤)
UPDATE names SET 
  meaning_en = 'Military Fujiwara', 
  meaning_zh = '武藤', 
  kanji_breakdown = '[{"kanji":"武","romaji":"mu","meaning_en":"military, warrior","meaning_zh":"武、武士"},{"kanji":"藤","romaji":"tou","meaning_en":"wisteria","meaning_zh":"藤、紫藤"}]',
  etymology_en = 'A name derived from the Mutsu branch of the Fujiwara clan, or combining "warrior" (mu) with "Fujiwara" (tou).',
  vibe = '["noble","powerful","historical"]',
  element = '["plant","human"]',
  status = 'enriched',
  kamon_prompt = 'A stylized wisteria crest (Sagarifuji) with a traditional warrior helmet silhouette behind it.',
  famous_bearers = '[{"name":"Keiji Mutoh","description":"Legendary professional wrestler"}]'
WHERE id = 'fn_mutou__88f463';

-- Rank 244: Takeda (武田 / 竹田)
-- ID: fn_takeda__d017d5, Romaji: takeda, Kanji: 绔圭敯 -> 竹田
UPDATE names SET 
  meaning_en = 'Bamboo rice paddy', 
  meaning_zh = '竹田', 
  kanji_breakdown = '[{"kanji":"竹","romaji":"take","meaning_en":"bamboo","meaning_zh":"竹、竹子"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to a rice paddy situated near a bamboo grove. (Note: Often confused with the warrior Takeda (武田) clan, but this entry specifically uses 竹).',
  vibe = '["nature-oriented","strong","stable"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'Three bamboo stalks rising from a square rice paddy grid silhouette.',
  famous_bearers = '[{"name":"Takeda Shingen","description":"Famous Daimyo (Note: uses 武田, but surname is related)"}]'
WHERE id = 'fn_takeda__d017d5';

-- Rank 245: Miyashita (宫下)
UPDATE names SET 
  meaning_en = 'Below the shrine', 
  meaning_zh = '宫下', 
  kanji_breakdown = '[{"kanji":"宫","romaji":"miya","meaning_en":"shrine, palace","meaning_zh":"宫、神社"},{"kanji":"下","romaji":"shita","meaning_en":"below, down","meaning_zh":"下、下方"}]',
  etymology_en = 'A topographical name for someone living below or near the foot of a Shinto shrine.',
  vibe = '["spiritual","stable","traditional"]',
  element = '["shrine","direction"]',
  status = 'enriched',
  kamon_prompt = 'A stylized Torii gate at the top with lines representing downward slopes or paths.',
  famous_bearers = '[{"name":"Miyashita Junko","description":"Famous actress"}]'
WHERE id = 'fn_miyashita__2380e5';

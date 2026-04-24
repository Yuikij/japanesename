-- Ranks 376-380: Kawara, Uno, Tanigawa, Kotani, Fujino

-- Rank 376: Kawara (河原)
UPDATE names SET 
  meaning_en = 'River beach', 
  meaning_zh = '河原', 
  kanji_breakdown = '[{"kanji":"河","romaji":"kawa","meaning_en":"river","meaning_zh":"河"},{"kanji":"原","romaji":"wara","meaning_en":"plain, field, beach","meaning_zh":"原、原野、河滩"}]',
  etymology_en = 'A topographical name referring to a stony riverbed or dry river beach.',
  vibe = '["nature-oriented","stony","flowing"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical wavy river lines set against a background of stylized pebbles and stones.',
  famous_bearers = '[{"name":"Kawara On","description":"World-renowned conceptual artist known for the Today series"}]'
WHERE id = 'fn_kawara__ae7fcb';

-- Rank 377: Uno (宇野)
UPDATE names SET 
  meaning_en = 'Space field', 
  meaning_zh = '宇野', 
  kanji_breakdown = '[{"kanji":"宇","romaji":"u","meaning_en":"eaves, roof, space, universe","meaning_zh":"宇、屋檐、宇宙"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野"}]',
  etymology_en = 'A topographical name referring to a "grand field" or "fields under the eaves". Common in western Japan.',
  vibe = '["nature-oriented","vast","noble"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized roof-top ridge (Utsu-mon) or eaves silhouette over a broad field boundary.',
  famous_bearers = '[{"name":"Uno Shoma","description":"Olympic silver medalist figure skater"},{"name":"Uno Misako","description":"Singer and actress, member of AAA"}]'
WHERE id = 'fn_uno__6d4f61';

-- Rank 378: Tanigawa (谷川)
UPDATE names SET 
  meaning_en = 'Valley river', 
  meaning_zh = '谷川', 
  kanji_breakdown = '[{"kanji":"谷","romaji":"tani","meaning_en":"valley","meaning_zh":"谷"},{"kanji":"川","romaji":"gawa","meaning_en":"river","meaning_zh":"川、河流"}]',
  etymology_en = 'A topographical name referring to a stream or river flowing through a valley.',
  vibe = '["nature-oriented","flowing","deep"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Two diagonal mountain slopes forming a V-shape, with three vertical river lines flowing between them.',
  famous_bearers = '[{"name":"Tanigawa Shuntaro","description":"Influential award-winning poet and translator"},{"name":"Tanigawa Koji","description":"Legendary Shogi master and former Meijin"}]'
WHERE id = 'fn_tanigawa__c87d99';

-- Rank 379: Kotani (小谷)
UPDATE names SET 
  meaning_en = 'Small valley', 
  meaning_zh = '小谷', 
  kanji_breakdown = '[{"kanji":"小","romaji":"ko","meaning_en":"small, little","meaning_zh":"小"},{"kanji":"谷","romaji":"tani","meaning_en":"valley","meaning_zh":"谷"}]',
  etymology_en = 'A topographical name referring to someone living in or near a small valley.',
  vibe = '["nature-oriented","modest","stable"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A simplified mountain silhouette forming a narrow valley, within a circular frame.',
  famous_bearers = '[{"name":"Kotani Kunitake","description":"Renowned physicist and pioneer of Japanese radar"}]'
WHERE id = 'fn_kotani__81adca';

-- Rank 380: Fujino (藤野)
UPDATE names SET 
  meaning_en = 'Wisteria field', 
  meaning_zh = '藤野', 
  kanji_breakdown = '[{"kanji":"藤","romaji":"fuji","meaning_en":"wisteria","meaning_zh":"藤、紫藤"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野"}]',
  etymology_en = 'A topographical name referring to a field where wisteria grows. Part of the influential Fujiwara clan branches.',
  vibe = '["nature-oriented","elegant","noble"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'Flowing wisteria clusters (Fuji-mon) overlapping a circular field boundary motif.',
  famous_bearers = '[{"name":"Fujino Chiya","description":"Akutagawa Prize-winning novelist"}]'
WHERE id = 'fn_fujino__95bb8c';

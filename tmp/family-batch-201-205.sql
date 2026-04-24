-- Ranks 201-205: Okumura, Uchiyama, Miyake, Kuwabara, Sawada

-- Rank 201: Okumura (奥村)
UPDATE names SET 
  meaning_en = 'Interior village', 
  meaning_zh = '奥村', 
  kanji_breakdown = '[{"kanji":"奥","romaji":"oku","meaning_en":"interior, back","meaning_zh":"奥、深处"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name, referring to a village situated further into the mountains or heart of a region.',
  vibe = '["traditional","stable","village-life"]',
  element = '["earth","settlement"]',
  status = 'enriched',
  kamon_prompt = 'A stylized village gate or mountain silhouette, symbolizing depth and settlement.',
  famous_bearers = '[{"name":"Yoshihisa Okumura","description":"Engineer known for the Okumura Model in mobile communications"}]'
WHERE id = 'fn_okumura__9cd855';

-- Rank 202: Uchiyama (内山)
UPDATE names SET 
  meaning_en = 'Inside the mountain', 
  meaning_zh = '内山', 
  kanji_breakdown = '[{"kanji":"内","romaji":"uchi","meaning_en":"inside, within","meaning_zh":"内、里面"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name indicating someone living within a mountain range or a hollow.',
  vibe = '["nature-oriented","protective","stable"]',
  element = '["mountain","earth"]',
  status = 'enriched',
  kamon_prompt = 'A minimalist mountain peak enclosed within a circle, representing the inner mountain.',
  famous_bearers = '[{"name":"Kōshō Uchiyama","description":"Soto Zen priest and origami master"}]'
WHERE id = 'fn_uchiyama__00d87c';

-- Rank 203: Miyake (三宅)
UPDATE names SET 
  meaning_en = 'Three houses', 
  meaning_zh = '三宅', 
  kanji_breakdown = '[{"kanji":"三","romaji":"mi","meaning_en":"three","meaning_zh":"三"},{"kanji":"宅","romaji":"yake","meaning_en":"house, residence","meaning_zh":"宅、邸"}]',
  etymology_en = 'Historically referred to the "Miyake" (royal granaries) managed by the Yamato court. Later became a surname.',
  vibe = '["noble","historical","structured"]',
  element = '["architecture","number"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized roofs or house symbols arranged in a triangular pattern.',
  famous_bearers = '[{"name":"Issey Miyake","description":"Renowned fashion designer"}]'
WHERE id = 'fn_miyake__559b8d';

-- Rank 204: Kuwabara (桑原)
UPDATE names SET 
  meaning_en = 'Mulberry field', 
  meaning_zh = '桑原', 
  kanji_breakdown = '[{"kanji":"桑","romaji":"kuwa","meaning_en":"mulberry","meaning_zh":"桑树"},{"kanji":"原","romaji":"hara","meaning_en":"field, plain","meaning_zh":"原、荒野"}]',
  etymology_en = 'A topographical name referring to fields of mulberry trees, essential for silk production. Also famously associated with protection against lightning in Japanese folklore.',
  vibe = '["agricultural","protective","nature"]',
  element = '["plant","earth"]',
  status = 'enriched',
  kamon_prompt = 'A mulberry leaf with a stylized lightning bolt, referencing the folklore "Kuwabara Kuwabara".',
  famous_bearers = '[{"name":"Kuwabara Shion","description":"Historical figure"}]'
WHERE id = 'fn_kuwabara__55832a';

-- Rank 205: Sawada (沢田)
UPDATE names SET 
  meaning_en = 'Marsh rice paddy', 
  meaning_zh = '泽田', 
  kanji_breakdown = '[{"kanji":"沢","romaji":"sawa","meaning_en":"marsh, swamp, stream","meaning_zh":"泽、溪流"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'Common topographical name for a rice paddy located near a marsh or stream.',
  vibe = '["fertile","natural","classic"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized rice ear emerging from a water ripple pattern.',
  famous_bearers = '[{"name":"Kenji Sawada","description":"Iconic Japanese singer and actor"}]'
WHERE id = 'fn_sawada__7682be';

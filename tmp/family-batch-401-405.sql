-- Ranks 401-405: Sanson/Yamamura, Negishi, Kawamoto, Yanagisawa, Deguchi

-- Rank 401: Yamamura (山村)
UPDATE names SET 
  meaning_en = 'Mountain village', 
  meaning_zh = '山村', 
  kanji_breakdown = '[{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name referring to a village located in or at the foot of a mountain.',
  vibe = '["nature-oriented","tranquil","grounded"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'Three mountain peaks above a simplified village gate or thatched roof silhouette, within a circular border.',
  famous_bearers = '[{"name":"Yamamura Koji","description":"Award-winning independent animation director"},{"name":"Yamamura Hibiku","description":"Japanese voice actress and singer"}]'
WHERE id = 'fn_sanson__8c9e59';

-- Rank 402: Negishi (根岸)
UPDATE names SET 
  meaning_en = 'Root shore', 
  meaning_zh = '根岸', 
  kanji_breakdown = '[{"kanji":"根","romaji":"ne","meaning_en":"root, base","meaning_zh":"根、底部"},{"kanji":"岸","romaji":"gishi","meaning_en":"shore, bank, cliff","meaning_zh":"岸、岸边"}]',
  etymology_en = 'A topographical name referring to a place at the foot of a shore or cliff. Strongly associated with the Negishi area in Tokyo.',
  vibe = '["nature-oriented","stable","coastal"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'Stylized tree roots intertwined with a shore-line curve, symbolizing stability by the water.',
  famous_bearers = '[{"name":"Negishi Ei-ichi","description":"Nobel Prize winner in Chemistry"},{"name":"Negishi Takeru","description":"Japanese professional film producer"}]'
WHERE id = 'fn_negishi__d6d513';

-- Rank 403: Kawamoto (川本)
UPDATE names SET 
  meaning_en = 'River origin', 
  meaning_zh = '川本', 
  kanji_breakdown = '[{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川、河流"},{"kanji":"本","romaji":"moto","meaning_en":"origin, base","meaning_zh":"本、根源"}]',
  etymology_en = 'A topographical name meaning "at the river source" or "near the river origin".',
  vibe = '["nature-oriented","vital","flowing"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical river lines (Kawa-mon) emerging from a stylize "Origin" (本) symbol or base motif.',
  famous_bearers = '[{"name":"Kawamoto Kihachiro","description":"Legendary puppet animator and filmmaker"},{"name":"Kawamoto Akari","description":"Character from the manga/anime March Comes in Like a Lion"}]'
WHERE id = 'fn_kawamoto__e3fb83';

-- Rank 404: Yanagisawa (柳泽)
UPDATE names SET 
  meaning_en = 'Willow marsh', 
  meaning_zh = '柳泽', 
  kanji_breakdown = '[{"kanji":"柳","romaji":"yanagi","meaning_en":"willow","meaning_zh":"柳、柳树"},{"kanji":"沢","romaji":"sawa","meaning_en":"marsh, stream","meaning_zh":"泽、小溪"}]',
  etymology_en = 'A topographical name referring to a marsh where willow trees grow. Historically associated with the Yanagisawa clan, descendants of the Takeda.',
  vibe = '["nature-oriented","elegant","flexible"]',
  element = '["wood","water"]',
  status = 'enriched',
  kamon_prompt = 'Weeping willow branches (Yanagi-mon) over a stylized stream or marsh water pattern.',
  famous_bearers = '[{"name":"Yanagisawa Yoshiyasu","description":"Powerful official and daimyo in the Edo period"},{"name":"Yanagisawa Shingo","description":"Popular comedian and actor"}]'
WHERE id = 'fn_yanagisawa__dec34c';

-- Rank 405: Deguchi (出口)
UPDATE names SET 
  meaning_en = 'Exit/Outlet', 
  meaning_zh = '出口', 
  kanji_breakdown = '[{"kanji":"出","romaji":"de","meaning_en":"exit, go out","meaning_zh":"出"},{"kanji":"口","romaji":"guchi","meaning_en":"mouth, opening, entrance","meaning_zh":"口"}]',
  etymology_en = 'A topographical name referring to a place at the exit of a valley, a river outlet, or a village gate.',
  vibe = '["directional","straightforward","original"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A simple gate silhouette or a circular motif with an outward-opening design.',
  famous_bearers = '[{"name":"Deguchi Onisaburo","description":"Co-founder of the Oomoto religious movement"},{"name":"Deguchi Natsuki","description":"Rising Japanese actress and model"}]'
WHERE id = 'fn_deguchi__269e1a';

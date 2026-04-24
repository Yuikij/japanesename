-- Ranks 396-400: Shinozaki, Miyahara, Takai, Shimomura, Takase

-- Rank 396: Shinozaki (筱崎)
UPDATE names SET 
  meaning_en = 'Bamboo-grass cape', 
  meaning_zh = '筱崎', 
  kanji_breakdown = '[{"kanji":"篠","romaji":"shino","meaning_en":"thin bamboo, bamboo grass","meaning_zh":"筱、细竹"},{"kanji":"崎","romaji":"zaki","meaning_en":"cape, peninsula, peak","meaning_zh":"崎、海岬"}]',
  etymology_en = 'A topographical name referring to a cape or peninsula where thin bamboo grows.',
  vibe = '["nature-oriented","delicate","resilient"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'Stylized thin bamboo leaves (Shino-mon) arranged around a peninsula silhouette, within a circular frame.',
  famous_bearers = '[{"name":"Shinozaki Ai","description":"Popular singer and gravure idol"},{"name":"Shinozaki Hironao","description":"Renowned engineer known for motorcycle design"}]'
WHERE id = 'fn_shinozaki__afc0af';

-- Rank 397: Miyahara (宫原)
UPDATE names SET 
  meaning_en = 'Shrine field', 
  meaning_zh = '宫原', 
  kanji_breakdown = '[{"kanji":"宮","romaji":"miya","meaning_en":"shrine, palace","meaning_zh":"宫、神社、皇居"},{"kanji":"原","romaji":"hara","meaning_en":"plain, field","meaning_zh":"原、原野"}]',
  etymology_en = 'A topographical name referring to a field belonging to a shrine or palace.',
  vibe = '["spiritual","noble","expansive"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized shrine gate (Torii) centered within a broad field boundary motif.',
  famous_bearers = '[{"name":"Miyahara Satoko","description":"Silver medalist at the World Figure Skating Championships"},{"name":"Miyahara Akiho","description":"Japanese actress"}]'
WHERE id = 'fn_miyahara__7df2df';

-- Rank 398: Takai (高井)
UPDATE names SET 
  meaning_en = 'High well', 
  meaning_zh = '高井', 
  kanji_breakdown = '[{"kanji":"高","romaji":"taka","meaning_en":"high, tall","meaning_zh":"高"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name referring to a "high well" or a well located on a hill.',
  vibe = '["nature-oriented","elevated","essential"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A square well-head frame (Igeta-mon) with an "Upward" or "High" symbol (高) integrated into the design.',
  famous_bearers = '[{"name":"Takai Yuichi","description":"Akutagawa Prize-winning novelist"},{"name":"Takai Mamiko","description":"Former idol and member of Onyanko Club"}]'
WHERE id = 'fn_takai__02f529';

-- Rank 399: Shimomura (下村)
UPDATE names SET 
  meaning_en = 'Lower village', 
  meaning_zh = '下村', 
  kanji_breakdown = '[{"kanji":"下","romaji":"shimo","meaning_en":"lower, below","meaning_zh":"下"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name referring to someone from the "lower part of the village". Often used to distinguish branches of a family.',
  vibe = '["grounded","community-oriented","modest"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A simplified village gate silhouette with a downward-pointing motif representing "Lower".',
  famous_bearers = '[{"name":"Shimomura Osamu","description":"Nobel Prize winner in Chemistry for the discovery of GFP"},{"name":"Shimomura Tsutomu","description":"Famous computer security expert who tracked down Kevin Mitnick"}]'
WHERE id = 'fn_shimomura__429b56';

-- Rank 400: Takase (高濑)
UPDATE names SET 
  meaning_en = 'High rapids', 
  meaning_zh = '高濑', 
  kanji_breakdown = '[{"kanji":"高","romaji":"taka","meaning_en":"high, tall","meaning_zh":"高"},{"kanji":"瀬","romaji":"se","meaning_en":"rapids, shallows, current","meaning_zh":"濑、急流、浅滩"}]',
  etymology_en = 'A topographical name referring to high rapids or a swift current in a river. Common in various regions of Japan.',
  vibe = '["nature-oriented","energetic","flowing"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Stylized swift water currents (Wave-mon) with three peaks representing "High Rapids".',
  famous_bearers = '[{"name":"Takase Akiko","description":"Notable Japanese voice actress"},{"name":"Takase Junyura","description":"Japanese professional footballer"}]'
WHERE id = 'fn_takase__54b877';

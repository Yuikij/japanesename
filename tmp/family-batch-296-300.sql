-- Ranks 296-300: Muramatsu, Kameda, Kuroki, Mizutani, Sugiyama

-- Rank 296: Muramatsu (村松)
UPDATE names SET 
  meaning_en = 'Pine tree of the village', 
  meaning_zh = '村松', 
  kanji_breakdown = '[{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"},{"kanji":"松","romaji":"matsu","meaning_en":"pine tree","meaning_zh":"松"}]',
  etymology_en = 'A topographical name referring to a pine tree that serves as a landmark for a village.',
  vibe = '["nature-oriented","stable","traditional"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A stylized pine tree silhouette (Matsu) with village gate symbols at the base, within a circle.',
  famous_bearers = '[{"name":"Muramatsu Tomomi","description":"Naoki Prize-winning novelist"}]'
WHERE id = 'fn_muramatsu__c92930';

-- Rank 297: Kameda (龟田)
UPDATE names SET 
  meaning_en = 'Turtle rice paddy', 
  meaning_zh = '龟田', 
  kanji_breakdown = '[{"kanji":"龟","romaji":"kame","meaning_en":"turtle, tortoise","meaning_zh":"龟"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for a rice paddy shaped like a turtle or where turtles were frequently seen. The turtle is a symbol of longevity.',
  vibe = '["nature-oriented","auspicious","grounded"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized turtle shell pattern (Kikkou) integrated with a square rice paddy grid (Ta).',
  famous_bearers = '[{"name":"Kameda Koki","description":"Famous professional boxer and world champion"}]'
WHERE id = 'fn_kameda__239634';

-- Rank 298: Kuroki (黑木)
UPDATE names SET 
  meaning_en = 'Black wood', 
  meaning_zh = '黑木', 
  kanji_breakdown = '[{"kanji":"黑","romaji":"kuro","meaning_en":"black, dark","meaning_zh":"黑"},{"kanji":"木","romaji":"ki","meaning_en":"tree, wood","meaning_zh":"木"}]',
  etymology_en = 'A topographical name referring to unpeeled timber or dark-colored trees in a forest.',
  vibe = '["strong","nature-oriented","solid"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A bold, single tree silhouette with dark, thick lines, within a circular frame.',
  famous_bearers = '[{"name":"Kuroki Meisa","description":"Famous actress and singer"},{"name":"Kuroki Hitomi","description":"Award-winning actress"}]'
WHERE id = 'fn_kuroki__df545b';

-- Rank 299: Mizutani (水谷)
UPDATE names SET 
  meaning_en = 'Water valley', 
  meaning_zh = '水谷', 
  kanji_breakdown = '[{"kanji":"水","romaji":"mizu","meaning_en":"water","meaning_zh":"水"},{"kanji":"谷","romaji":"tani","meaning_en":"valley","meaning_zh":"谷"}]',
  etymology_en = 'A topographical name for a valley with an abundant water source or a stream running through it.',
  vibe = '["nature-oriented","flowing","clear"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'Flowing water lines (Mizu) passing through a V-shaped valley silhouette.',
  famous_bearers = '[{"name":"Mizutani Jun","description":"Olympic gold medalist in table tennis"},{"name":"Mizutani Yutaka","description":"Famous actor (Aibou series)"}]'
WHERE id = 'fn_mizutani__22f982';

-- Rank 300: Sugiyama (杉山)
UPDATE names SET 
  meaning_en = 'Cedar mountain', 
  meaning_zh = '杉山', 
  kanji_breakdown = '[{"kanji":"杉","romaji":"sugi","meaning_en":"cedar tree","meaning_zh":"杉"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name for someone living on a mountain covered with cedar trees.',
  vibe = '["nature-oriented","grand","tall"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized cedar tree (Sugi) silhouette on top of a triple-peak mountain.',
  famous_bearers = '[{"name":"Sugiyama Ai","description":"Former professional tennis player, ranked world No. 1 in doubles"}]'
WHERE id = 'fn_sugiyama__16e6f2';

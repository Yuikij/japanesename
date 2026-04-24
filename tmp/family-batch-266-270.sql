-- Ranks 266-270: Inagaki, Ookawa, Matsuzaki, Osada, Wakabayashi

-- Rank 266: Inagaki (稻垣)
UPDATE names SET 
  meaning_en = 'Rice plant fence', 
  meaning_zh = '稻垣', 
  kanji_breakdown = '[{"kanji":"稻","romaji":"ina","meaning_en":"rice plant","meaning_zh":"稻、水稻"},{"kanji":"垣","romaji":"gaki","meaning_en":"fence, wall, hedge","meaning_zh":"垣、篱笆"}]',
  etymology_en = 'A topographical name referring to a hedge or fence surrounding a rice field.',
  vibe = '["nature-oriented","protective","stable"]',
  element = '["earth","wood"]',
  status = 'enriched',
  kamon_prompt = 'A stylized rice plant (Ine) motif enclosed within a traditional bamboo fence (垣) frame.',
  famous_bearers = '[{"name":"Goro Inagaki","description":"Singer and actor (SMAP)"},{"name":"Inagaki Riichiro","description":"Manga writer (Eyeshield 21, Dr. Stone)"}]'
WHERE id = 'fn_inagaki__0af1e6';

-- Rank 267: Ookawa (大川)
UPDATE names SET 
  meaning_en = 'Large river', 
  meaning_zh = '大川', 
  kanji_breakdown = '[{"kanji":"大","romaji":"oo","meaning_en":"big, large","meaning_zh":"大"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川"}]',
  etymology_en = 'A topographical name for someone living near a large river.',
  vibe = '["majestic","flowing","nature-oriented"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Three bold, wavy vertical lines representing a powerful river, within a large circular border.',
  famous_bearers = '[{"name":"Okawa Shumei","description":"Philosopher and nationalist"},{"name":"CLAMP (Nanase Ohkawa)","description":"Leader of the famous manga artist group"}]'
WHERE id = 'fn_ookawa__985d78';

-- Rank 268: Matsuzaki (松崎)
UPDATE names SET 
  meaning_en = 'Pine tree cape', 
  meaning_zh = '松崎', 
  kanji_breakdown = '[{"kanji":"松","romaji":"matsu","meaning_en":"pine tree","meaning_zh":"松"},{"kanji":"崎","romaji":"zaki","meaning_en":"cape, peninsula","meaning_zh":"崎、海岬"}]',
  etymology_en = 'A topographical name for a cape or peninsula where pine trees grow.',
  vibe = '["nature-oriented","resilient","classic"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized pine tree silhouette positioned on a triangular "cape" line, surrounded by wave motifs.',
  famous_bearers = '[{"name":"Shigeru Matsuzaki","description":"Singer and actor famous for his deep tan"}]'
WHERE id = 'fn_matsuzaki__f3833d';

-- Rank 269: Osada (长田)
UPDATE names SET 
  meaning_en = 'Long rice paddy', 
  meaning_zh = '长田', 
  kanji_breakdown = '[{"kanji":"长","romaji":"osa","meaning_en":"long, superior","meaning_zh":"长"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for a long or extensive rice field. Also read as Nagata.',
  vibe = '["expansive","bountiful","stable"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A vertically elongated rice paddy grid (Ta) within a circular border.',
  famous_bearers = '[{"name":"Osada Hiroshi","description":"Famous poet and essayist"}]'
WHERE id = 'fn_osada__d59117';

-- Rank 270: Wakabayashi (若林)
UPDATE names SET 
  meaning_en = 'Young forest', 
  meaning_zh = '若林', 
  kanji_breakdown = '[{"kanji":"若","romaji":"waka","meaning_en":"young, youthful","meaning_zh":"若、年轻的"},{"kanji":"林","romaji":"bayashi","meaning_en":"forest, grove","meaning_zh":"林"}]',
  etymology_en = 'A topographical name for a newly planted forest or a grove of young trees.',
  vibe = '["youthful","vibrant","nature-oriented"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Two stylized young trees with slender trunks and budding leaves, side by side.',
  famous_bearers = '[{"name":"Genzo Wakabayashi","description":"Legendary goalkeeper character from Captain Tsubasa"}]'
WHERE id = 'fn_wakabayashi__9e0be4';

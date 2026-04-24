-- Ranks 316-320: Nishino, Saeki, Yamagishi, Nishioka, Kurokawa

-- Rank 316: Nishino (西野)
UPDATE names SET 
  meaning_en = 'Western field', 
  meaning_zh = '西野', 
  kanji_breakdown = '[{"kanji":"西","romaji":"nishi","meaning_en":"west","meaning_zh":"西"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野、原野"}]',
  etymology_en = 'A topographical name for someone living in a field or plain to the west of a village or mountain.',
  vibe = '["nature-oriented","directional","open"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized open field landscape with a "West" (Nishi) character or directional mark, within a circle.',
  famous_bearers = '[{"name":"Nanase Nishino","description":"Famous actress and former member of Nogizaka46"},{"name":"Nishino Kana","description":"Popular singer-songwriter"}]'
WHERE id = 'fn_nishino__16b92e';

-- Rank 317: Saeki (佐伯)
UPDATE names SET 
  meaning_en = 'Assistant elder', 
  meaning_zh = '佐伯', 
  kanji_breakdown = '[{"kanji":"佐","romaji":"sa","meaning_en":"assistant, help","meaning_zh":"佐、辅助"},{"kanji":"伯","romaji":"eki","meaning_en":"elder, chief, earl","meaning_zh":"伯、首领"}]',
  etymology_en = 'Originally an occupational or status-based name. The Saeki clan was an ancient and noble family associated with the imperial court and military service.',
  vibe = '["noble","historic","supportive"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A stylized "Assistant" character motif or triple horizontal bars within a circle.',
  famous_bearers = '[{"name":"Saeki Kayako","description":"The vengeful ghost from the Ju-On film series"}]'
WHERE id = 'fn_saeki__c23d39';

-- Rank 318: Yamagishi (山岸)
UPDATE names SET 
  meaning_en = 'Mountain bank', 
  meaning_zh = '山岸', 
  kanji_breakdown = '[{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"},{"kanji":"岸","romaji":"gishi","meaning_en":"bank, shore, cliff","meaning_zh":"岸、崖"}]',
  etymology_en = 'A topographical name for someone living near a mountain cliff or the edge/bank of a mountain.',
  vibe = '["nature-oriented","sturdy","grand"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized triple-peak mountain silhouette with strong vertical "cliff" lines at the edges.',
  famous_bearers = '[{"name":"Yamagishi Ryoko","description":"Highly influential manga artist (The Star of the Nile)"}]'
WHERE id = 'fn_yamagishi__903dcf';

-- Rank 319: Nishioka (西冈)
UPDATE names SET 
  meaning_en = 'Western hill', 
  meaning_zh = '西冈', 
  kanji_breakdown = '[{"kanji":"西","romaji":"nishi","meaning_en":"west","meaning_zh":"西"},{"kanji":"冈","romaji":"oka","meaning_en":"hill, ridge","meaning_zh":"冈、小山"}]',
  etymology_en = 'A topographical name for someone living on a hill located to the west of a village or prominent landmark.',
  vibe = '["nature-oriented","directional","stable"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized hill silhouette tapering to the left (West), within a circular border.',
  famous_bearers = '[{"name":"Nishioka Tsuyoshi","description":"Former professional baseball player in NPB and MLB"}]'
WHERE id = 'fn_nishioka__ba6171';

-- Rank 320: Kurokawa (黑川)
UPDATE names SET 
  meaning_en = 'Black river', 
  meaning_zh = '黑川', 
  kanji_breakdown = '[{"kanji":"黑","romaji":"kuro","meaning_en":"black, dark","meaning_zh":"黑"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川"}]',
  etymology_en = 'A topographical name for a river with dark water, possibly due to iron deposits or deep shade. Several daimyo families bore this name.',
  vibe = '["strong","nature-oriented","flowing"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Bold, thick vertical river lines (Kawa) in a dark tone, within a circular frame.',
  famous_bearers = '[{"name":"Kurokawa Kisho","description":"Renowned architect and founder of the Metabolism movement"}]'
WHERE id = 'fn_kurokawa__3f926d';

-- Ranks 286-290: Honda, Moriyama, Konno, Hosokawa, Okano

-- Rank 286: Honda (本多)
-- Note: Often associated with the famous Honda clan (Tokugawa loyalists). Different from Honda (本田).
UPDATE names SET 
  meaning_en = 'Many Origins, Great Base', 
  meaning_zh = '本多', 
  kanji_breakdown = '[{"kanji":"本","romaji":"hon","meaning_en":"base, origin, root","meaning_zh":"本、根"},{"kanji":"多","romaji":"da","meaning_en":"many, much","meaning_zh":"多"}]',
  etymology_en = 'A topographical name, distinct from the automotive "Honda" (本田). The Honda clan was one of the most prominent families serving the Tokugawa shogunate.',
  vibe = '["noble","stable","historical"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized "Clover" (Omodaka) or "Standing fern" (Maru-ni-Tachioda) motif within a circular frame.',
  famous_bearers = '[{"name":"Honda Tadakatsu","description":"One of the Four Heavenly Kings of the Tokugawa"}]'
WHERE id = 'fn_honda__7ba4f3';

-- Rank 287: Moriyama (森山)
UPDATE names SET 
  meaning_en = 'Forest mountain', 
  meaning_zh = '森山', 
  kanji_breakdown = '[{"kanji":"森","romaji":"mori","meaning_en":"forest","meaning_zh":"森"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name for someone living on a forested mountain.',
  vibe = '["nature-oriented","tranquil","grand"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized trees forming a canopy over a triple-peak mountain silhouette.',
  famous_bearers = '[{"name":"Mirai Moriyama","description":"Famous actor and dancer"},{"name":"Moriyama Daido","description":"World-renowned photographer"}]'
WHERE id = 'fn_moriyama__fefd77';

-- Rank 288: Konno (今野)
UPDATE names SET 
  meaning_en = 'Present field', 
  meaning_zh = '今野', 
  kanji_breakdown = '[{"kanji":"今","romaji":"kon","meaning_en":"now, present","meaning_zh":"今"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野、原野"}]',
  etymology_en = 'A topographical name likely referring to a field currently in use or a newly occupied plain.',
  vibe = '["nature-oriented","direct","modern-feel"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A minimalist open field landscape with a stylized sun or "Now" character mark inside a circle.',
  famous_bearers = '[{"name":"Konno Mahiru","description":"Actress and former Takarazuka star"}]'
WHERE id = 'fn_konno__600640';

-- Rank 289: Hosokawa (细川)
UPDATE names SET 
  meaning_en = 'Narrow river', 
  meaning_zh = '细川', 
  kanji_breakdown = '[{"kanji":"细","romaji":"hoso","meaning_en":"narrow, thin, detailed","meaning_zh":"细、狭窄"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川"}]',
  etymology_en = 'A topographical name for someone living near a narrow stream. The Hosokawa clan was a powerful daimyo family throughout Japanese history.',
  vibe = '["noble","refined","historic"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'A thin, single undulating river line flowing vertically, within a circular frame.',
  famous_bearers = '[{"name":"Morihiro Hosokawa","description":"79th Prime Minister of Japan and 18th head of the Hosokawa clan"}]'
WHERE id = 'fn_hosokawa__5c6116';

-- Rank 290: Okano (冈野)
UPDATE names SET 
  meaning_en = 'Hill field', 
  meaning_zh = '冈野', 
  kanji_breakdown = '[{"kanji":"冈","romaji":"oka","meaning_en":"hill, ridge","meaning_zh":"冈、小山"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野、原野"}]',
  etymology_en = 'A topographical name for a field located on or near a hill or ridge.',
  vibe = '["nature-oriented","stable","open"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized hill silhouette overlooking a square rice paddy grid (Ta).',
  famous_bearers = '[{"name":"Reiko Okano","description":"Famous manga artist (Onmyōji)"}]'
WHERE id = 'fn_okano__497262';

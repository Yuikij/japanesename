-- Ranks 276-280: Oikawa, Horiuchi, Tashiro, Nakajima, Yamane

-- Rank 276: Oikawa (及川)
UPDATE names SET 
  meaning_en = 'Reaching the river', 
  meaning_zh = '及川', 
  kanji_breakdown = '[{"kanji":"及","romaji":"oi","meaning_en":"reach, extend","meaning_zh":"及、达到"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川"}]',
  etymology_en = 'A topographical name for someone living in a place that extends to a river. Often associated with the Northern Fujiwara clan.',
  vibe = '["nature-oriented","flowing","historical"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical river lines (Kawa) with a stylized "reach" or extending line motif.',
  famous_bearers = '[{"name":"Tooru Oikawa","description":"Popular character from the anime Haikyu!!"}]'
WHERE id = 'fn_oikawa__1f153c';

-- Rank 277: Horiuchi (堀内)
UPDATE names SET 
  meaning_en = 'Inside the moat', 
  meaning_zh = '堀内', 
  kanji_breakdown = '[{"kanji":"堀","romaji":"hori","meaning_en":"moat, ditch","meaning_zh":"堀、护城河"},{"kanji":"内","romaji":"uchi","meaning_en":"inside, within","meaning_zh":"内"}]',
  etymology_en = 'A topographical name for someone living within the moats of a castle or fortified residence.',
  vibe = '["protective","noble","stable"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized enclosure or moat silhouette with a central square or circular mark indicating "inside".',
  famous_bearers = '[{"name":"Horiuchi Ken","description":"Famous comedian (Neptune)"}]'
WHERE id = 'fn_horiuchi__6d9438';

-- Rank 278: Tashiro (田代)
UPDATE names SET 
  meaning_en = 'Substitute rice paddy', 
  meaning_zh = '田代', 
  kanji_breakdown = '[{"kanji":"田","romaji":"ta","meaning_en":"rice paddy","meaning_zh":"田"},{"kanji":"代","romaji":"shiro","meaning_en":"substitute, generation, price","meaning_zh":"代、替代品"}]',
  etymology_en = 'A topographical name referring to a field that was used as a substitute or additional cultivation area.',
  vibe = '["nature-oriented","practical","earthy"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy grid (Ta) with a stylized generational or substitution mark.',
  famous_bearers = '[{"name":"Masashi Tashiro","description":"Former television performer and singer"}]'
WHERE id = 'fn_tashiro__fd937a';

-- Rank 279: Nakajima (中姘 -> 中岛)
UPDATE names SET 
  meaning_en = 'Middle island', 
  meaning_zh = '中岛', 
  kanji_breakdown = '[{"kanji":"中","romaji":"naka","meaning_en":"middle, center","meaning_zh":"中"},{"kanji":"岛","romaji":"jima","meaning_en":"island","meaning_zh":"岛"}]',
  etymology_en = 'A very common topographical name for someone living on an island in the middle of a river or lake.',
  vibe = '["balanced","nature-oriented","standard"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized island motif with a central dot or symbol indicating "middle" within a circular frame.',
  famous_bearers = '[{"name":"Miyuki Nakajima","description":"Legendary singer-songwriter"},{"name":"Nakajima Satoru","description":"First full-time Japanese F1 driver"}]'
WHERE id = 'fn_nakajima__4d3a61';

-- Rank 280: Yamane (山根)
UPDATE names SET 
  meaning_en = 'Root of the mountain', 
  meaning_zh = '山根', 
  kanji_breakdown = '[{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"},{"kanji":"根","romaji":"ne","meaning_en":"root, base","meaning_zh":"根"}]',
  etymology_en = 'A topographical name for someone living at the base or "root" of a mountain.',
  vibe = '["grounded","natural","resilient"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized triple-peak mountain silhouette with strong base lines representing the roots.',
  famous_bearers = '[{"name":"Yamane Miki","description":"Professional footballer"}]'
WHERE id = 'fn_yamane__117e3c';

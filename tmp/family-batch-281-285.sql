-- Ranks 281-285: Eguchi, Nakaya, Kishimoto, Arakawa, Nishio

-- Rank 281: Eguchi (江口)
UPDATE names SET 
  meaning_en = 'Mouth of the river', 
  meaning_zh = '江口', 
  kanji_breakdown = '[{"kanji":"江","romaji":"e","meaning_en":"river, inlet, bay","meaning_zh":"江、海湾"},{"kanji":"口","romaji":"guchi","meaning_en":"mouth, entrance","meaning_zh":"口、入口"}]',
  etymology_en = 'A topographical name for someone living at the mouth of a river or the entrance to an inlet.',
  vibe = '["nature-oriented","flowing","clear"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Undulating river lines (Kawa) converging at a stylized gate or mouth silhouette.',
  famous_bearers = '[{"name":"Eguchi Yosuke","description":"Famous actor and singer"},{"name":"Eguchi Hisashi","description":"Famous manga artist and illustrator"}]'
WHERE id = 'fn_eguchi__34ecd5';

-- Rank 282: Nakaya (中谷)
UPDATE names SET 
  meaning_en = 'Middle valley', 
  meaning_zh = '中谷', 
  kanji_breakdown = '[{"kanji":"中","romaji":"naka","meaning_en":"middle, center","meaning_zh":"中"},{"kanji":"谷","romaji":"ya","meaning_en":"valley","meaning_zh":"谷"}]',
  etymology_en = 'A topographical name for someone living in the middle of a valley. Also read as Nakatani.',
  vibe = '["balanced","tranquil","stable"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A V-shaped valley silhouette with a central circular mark or vertical line representing the center.',
  famous_bearers = '[{"name":"Nakatani Miki","description":"Award-winning actress"}]'
WHERE id = 'fn_nakaya__fa32f3';

-- Rank 283: Kishimoto (岸本)
UPDATE names SET 
  meaning_en = 'Near the bank', 
  meaning_zh = '岸本', 
  kanji_breakdown = '[{"kanji":"岸","romaji":"kishi","meaning_en":"bank, shore, coast","meaning_zh":"岸、岸边"},{"kanji":"本","romaji":"moto","meaning_en":"near, base, origin","meaning_zh":"本、附近"}]',
  etymology_en = 'A topographical name for someone living near the bank of a river or the seashore.',
  vibe = '["stable","nature-oriented","solid"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized cliff or bank silhouette with horizontal wave lines at the base.',
  famous_bearers = '[{"name":"Masashi Kishimoto","description":"Creator of the manga Naruto"}]'
WHERE id = 'fn_kishimoto__d2dcd9';

-- Rank 284: Arakawa (荒川)
UPDATE names SET 
  meaning_en = 'Wild river', 
  meaning_zh = '荒川', 
  kanji_breakdown = '[{"kanji":"荒","romaji":"ara","meaning_en":"wild, rough, uncultivated","meaning_zh":"荒、狂放"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川"}]',
  etymology_en = 'A topographical name for a turbulent or flood-prone river. A famous river in Tokyo.',
  vibe = '["powerful","dynamic","nature-oriented"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Bold, irregular jagged river lines (Kawa) representing turbulent waters, within a circle.',
  famous_bearers = '[{"name":"Shizuka Arakawa","description":"Olympic gold medalist in figure skating"},{"name":"Hiromu Arakawa","description":"Creator of Fullmetal Alchemist"}]'
WHERE id = 'fn_arakawa__75cc74';

-- Rank 285: Nishio (西尾)
UPDATE names SET 
  meaning_en = 'Western tail', 
  meaning_zh = '西尾', 
  kanji_breakdown = '[{"kanji":"西","romaji":"nishi","meaning_en":"west","meaning_zh":"西"},{"kanji":"尾","romaji":"o","meaning_en":"tail, ridge end","meaning_zh":"尾、山尾"}]',
  etymology_en = 'A topographical name for someone living at the western end of a mountain ridge or village.',
  vibe = '["nature-oriented","directional","stable"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A mountain ridge silhouette tapering off to the left (West), within a circular border.',
  famous_bearers = '[{"name":"Nisio Isin","description":"Prolific novelist (Monogatari series)"}]'
WHERE id = 'fn_nishio__039cfe';

-- Ranks 301-305: Hatakeyama, Mikami, Machida, Nagao, Iwai

-- Rank 301: Hatakeyama (畠山)
UPDATE names SET 
  meaning_en = 'Farm mountain', 
  meaning_zh = '畠山', 
  kanji_breakdown = '[{"kanji":"畠","romaji":"hatake","meaning_en":"field, farm, garden","meaning_zh":"田、田园"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name referring to a field or farm located on a mountain. The Hatakeyama clan was a prominent branch of the Taira and later the Ashikaga shogunate.',
  vibe = '["nature-oriented","noble","grounded"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized enclosure representing a field (Hatake) on top of a triple-peak mountain silhouette.',
  famous_bearers = '[{"name":"Hatakeyama Shigetada","description":"A famous Kamakura period samurai known for his bravery and integrity"}]'
WHERE id = 'fn_hatakeyama__cd7ae4';

-- Rank 302: Mikami (三上)
UPDATE names SET 
  meaning_en = 'Three above', 
  meaning_zh = '三上', 
  kanji_breakdown = '[{"kanji":"三","romaji":"mi","meaning_en":"three","meaning_zh":"三"},{"kanji":"上","romaji":"kami","meaning_en":"above, upper","meaning_zh":"上"}]',
  etymology_en = 'A topographical name likely referring to someone living above or in the upper part of three specific locations (valleys, rivers, etc.).',
  vibe = '["balanced","simple","stable"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'Three horizontal bars (San) with a stylized "Up" arrow or motif, within a circle.',
  famous_bearers = '[{"name":"Mikami Shinji","description":"Famous video game designer and creator of Resident Evil"}]'
WHERE id = 'fn_mikami__ff7f5b';

-- Rank 303: Machida (町田)
UPDATE names SET 
  meaning_en = 'Town rice paddy', 
  meaning_zh = '町田', 
  kanji_breakdown = '[{"kanji":"町","romaji":"machi","meaning_en":"town, street","meaning_zh":"町、街道"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for a rice paddy located within or near a town.',
  vibe = '["practical","stable","urban-roots"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy grid (Ta) integrated with architectural town gates or street symbols.',
  famous_bearers = '[{"name":"Machida Keita","description":"Famous actor and member of Gekidan Exile"}]'
WHERE id = 'fn_machida__ffd2cf';

-- Rank 304: Nagao (长尾)
UPDATE names SET 
  meaning_en = 'Long tail', 
  meaning_zh = '长尾', 
  kanji_breakdown = '[{"kanji":"长","romaji":"naga","meaning_en":"long","meaning_zh":"长"},{"kanji":"尾","romaji":"o","meaning_en":"tail, ridge end","meaning_zh":"尾、山端"}]',
  etymology_en = 'A topographical name referring to a long mountain ridge or "tail." The Nagao clan were the ancestors of the famous Uesugi Kenshin.',
  vibe = '["noble","nature-oriented","persistent"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A long, tapering mountain ridge line following a circular curve, within a frame.',
  famous_bearers = '[{"name":"Nagao Kagetora","description":"The birth name of the legendary daimyo Uesugi Kenshin"}]'
WHERE id = 'fn_nagao__6e22fe';

-- Rank 305: Iwai (岩井)
UPDATE names SET 
  meaning_en = 'Rocky well', 
  meaning_zh = '岩井', 
  kanji_breakdown = '[{"kanji":"岩","romaji":"iwa","meaning_en":"rock, crag","meaning_zh":"岩、礁石"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name for someone living near a well located in a rocky area or a well made of stone.',
  vibe = '["solid","nature-oriented","clear"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A square well frame (Izutsu) surrounded by stylized rock or crag patterns.',
  famous_bearers = '[{"name":"Shunji Iwai","description":"Renowned film director known for Love Letter"}]'
WHERE id = 'fn_iwai__6505e2';

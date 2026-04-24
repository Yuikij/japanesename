-- Ranks 406-410: Yokoi, Komori, Yoshizawa, Ozawa, Takei

-- Rank 406: Yokoi (横井)
UPDATE names SET 
  meaning_en = 'Well on the side', 
  meaning_zh = '横井', 
  kanji_breakdown = '[{"kanji":"横","romaji":"yoko","meaning_en":"side, horizontal","meaning_zh":"横、侧面"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name referring to a "well on the side" of a field or road. Historically associated with the Yokoi clan in Higo (Kumamoto).',
  vibe = '["nature-oriented","steady","essential"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A square well-head frame (Igeta-mon) with two horizontal bars across it, symbolizing the "Yokoi" (side-well).',
  famous_bearers = '[{"name":"Yokoi Shoichi","description":"WWII holdout found in Guam in 1972"},{"name":"Yokoi Gunpei","description":"Legendary Nintendo inventor (Game Boy, Metroid)"}]'
WHERE id = 'fn_yokoi__86fa41';

-- Rank 407: Komori (小森)
UPDATE names SET 
  meaning_en = 'Small forest', 
  meaning_zh = '小森', 
  kanji_breakdown = '[{"kanji":"小","romaji":"ko","meaning_en":"small, little","meaning_zh":"小"},{"kanji":"森","romaji":"mori","meaning_en":"forest","meaning_zh":"森、森林"}]',
  etymology_en = 'A topographical name referring to someone living in or near a small forest.',
  vibe = '["nature-oriented","tranquil","modest"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized trees (Mori-mon) in a compact circular arrangement, with smaller leaf motifs.',
  famous_bearers = '[{"name":"Komori Pure","description":"Japanese fashion model and television personality"},{"name":"Komori Hayato","description":"Performer and member of GENERATIONS from EXILE TRIBE"}]'
WHERE id = 'fn_komori__5a3499';

-- Rank 408: Yoshizawa (吉泽)
UPDATE names SET 
  meaning_en = 'Good fortune marsh', 
  meaning_zh = '吉泽', 
  kanji_breakdown = '[{"kanji":"吉","romaji":"yoshi","meaning_en":"good luck, joy","meaning_zh":"吉、吉祥"},{"kanji":"沢","romaji":"zawa","meaning_en":"marsh, stream","meaning_zh":"泽、小溪"}]',
  etymology_en = 'A topographical name meaning "marsh of good fortune". A common surname in eastern Japan.',
  vibe = '["lucky","elegant","flowing"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized "Luck" (吉) character placed gracefully above a flowing stream or marsh motif.',
  famous_bearers = '[{"name":"Yoshizawa Ryo","description":"Highly popular award-winning actor"},{"name":"Yoshizawa Hitomi","description":"Former member of Morning Musume"}]'
WHERE id = 'fn_yoshizawa__fc1b69';

-- Rank 409: Ozawa (小泽)
UPDATE names SET 
  meaning_en = 'Small marsh', 
  meaning_zh = '小泽', 
  kanji_breakdown = '[{"kanji":"小","romaji":"o","meaning_en":"small, little","meaning_zh":"小"},{"kanji":"泽","romaji":"zawa","meaning_en":"marsh, stream","meaning_zh":"泽、小溪"}]',
  etymology_en = 'A topographical name referring to a "small marsh". One of the most common "Sawa" surnames.',
  vibe = '["nature-oriented","modest","flowing"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'A circular frame containing stylized marsh bubbles or water lines, with a small peak notation.',
  famous_bearers = '[{"name":"Ozawa Seiji","description":"World-renowned symphony conductor"},{"name":"Ozawa Ichiro","description":"Prominent and influential politician"}]'
WHERE id = 'fn_ozawa__5b4b59';

-- Rank 410: Takei (武井)
UPDATE names SET 
  meaning_en = 'Warrior well', 
  meaning_zh = '武井', 
  kanji_breakdown = '[{"kanji":"武","romaji":"take","meaning_en":"warrior, military, brave","meaning_zh":"武、勇武"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name referring to a well used by warriors, or a "brave well". Often found in the Kanto region.',
  vibe = '["valiant","steady","noble"]',
  element = '["water","fire"]',
  status = 'enriched',
  kamon_prompt = 'A square well-head frame (Igeta-mon) enclosing a stylized "Warrior" (武) character or crossed swords.',
  famous_bearers = '[{"name":"Takei Emi","description":"Famous actress and model"},{"name":"Takei Sou","description":"Television personality and "King of Beasts""}]'
WHERE id = 'fn_takei__06691f';

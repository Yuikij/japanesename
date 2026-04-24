-- Ranks 256-260: Ogasawara, Okabe, Morishita, Asai, Kanda

-- Rank 256: Ogasawara (小笠原)
UPDATE names SET 
  meaning_en = 'Plain of the small conical hat', 
  meaning_zh = '小笠原', 
  kanji_breakdown = '[{"kanji":"小","romaji":"o","meaning_en":"small","meaning_zh":"小"},{"kanji":"笠","romaji":"gasa","meaning_en":"conical hat, bamboo hat","meaning_zh":"笠、斗笠"},{"kanji":"原","romaji":"wara","meaning_en":"plain, field","meaning_zh":"原"}]',
  etymology_en = 'A topographical name referring to a field shaped like a small conical hat, or one associated with hat-making. The Ogasawara clan was a prominent daimyo family famous for their school of etiquette.',
  vibe = '["noble","traditional","sophisticated"]',
  element = '["earth","human-craft"]',
  status = 'enriched',
  kamon_prompt = 'A stylized conical bamboo hat (Kasa) centered on a plain field circle.',
  famous_bearers = '[{"name":"Ogasawara Sadamune","description":"Founder of the Ogasawara-ryū school of etiquette"}]'
WHERE id = 'fn_ogasawara__e53797';

-- Rank 257: Okabe (冈部)
UPDATE names SET 
  meaning_en = 'Hill section', 
  meaning_zh = '冈部', 
  kanji_breakdown = '[{"kanji":"冈","romaji":"oka","meaning_en":"hill, ridge","meaning_zh":"冈、小山"},{"kanji":"部","romaji":"be","meaning_en":"section, guild, department","meaning_zh":"部、区域"}]',
  etymology_en = 'Originally an occupational or administrative name (Be) referring to people living or working in a hilly region. Often associated with the Fujiwara clan.',
  vibe = '["stable","administrative","grounded"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized hill ridge motif within a circular border, featuring the character "Be" or administrative symbols.',
  famous_bearers = '[{"name":"Okabe Motonobu","description":"Samurai of the Sengoku period"}]'
WHERE id = 'fn_okabe__3b1df7';

-- Rank 258: Morishita (森下)
UPDATE names SET 
  meaning_en = 'Below the forest', 
  meaning_zh = '森下', 
  kanji_breakdown = '[{"kanji":"森","romaji":"mori","meaning_en":"forest","meaning_zh":"森"},{"kanji":"下","romaji":"shita","meaning_en":"below, under","meaning_zh":"下"}]',
  etymology_en = 'A topographical name for someone living at the edge or foot of a forest.',
  vibe = '["nature-oriented","humble","tranquil"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized trees with horizontal lines at the bottom representing the clearing below.',
  famous_bearers = '[{"name":"Shinichi Morishita","description":"Former Japanese footballer"}]'
WHERE id = 'fn_morishita__c37f23';

-- Rank 259: Asai (浅井)
UPDATE names SET 
  meaning_en = 'Shallow well', 
  meaning_zh = '浅井', 
  kanji_breakdown = '[{"kanji":"浅","romaji":"asa","meaning_en":"shallow","meaning_zh":"浅"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name for someone living near a shallow well. The Azai (Asai) clan was a famous Sengoku daimyo family.',
  vibe = '["clear","noble","historical"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized square well-frame (Izutsu) with undulating water lines inside indicating shallowness.',
  famous_bearers = '[{"name":"Asai Nagamasa","description":"Daimyo and brother-in-law of Oda Nobunaga"}]'
WHERE id = 'fn_asai__9c3c1a';

-- Rank 260: Kanda (神田)
UPDATE names SET 
  meaning_en = 'Divine rice paddy', 
  meaning_zh = '神田', 
  kanji_breakdown = '[{"kanji":"神","romaji":"kan","meaning_en":"god, spirit, divine","meaning_zh":"神、神圣"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to a rice paddy dedicated to or owned by a Shinto shrine.',
  vibe = '["sacred","bountiful","spiritual"]',
  element = '["spirit","earth"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy grid (Ta) integrated with Shinto ritual wands (Gohei).',
  famous_bearers = '[{"name":"Sayaka Kanda","description":"Singer and actress"},{"name":"Kanda Matsunojo","description":"Famous Rakugo performer"}]'
WHERE id = 'fn_kanda__4876bf';

-- Ranks 261-265: Ueda, Nakai, Kawamura, Maekawa, Miyagawa

-- Rank 261: Ueda (植田)
UPDATE names SET 
  meaning_en = 'Planted rice paddy', 
  meaning_zh = '植田', 
  kanji_breakdown = '[{"kanji":"植","romaji":"ue","meaning_en":"plant, sow","meaning_zh":"植、种"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for a rice paddy that has been recently planted or is well-cultivated.',
  vibe = '["bountiful","stable","earthy"]',
  element = '["earth","wood"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized green rice sprouts emerging from a square grid (Ta) within a circular border.',
  famous_bearers = '[{"name":"Ueda Kana","description":"Popular voice actor"},{"name":"Ueda Fumito","description":"Game designer (Ico, Shadow of the Colossus)"}]'
WHERE id = 'fn_ueda__7a92c7';

-- Rank 262: Nakai (中井)
UPDATE names SET 
  meaning_en = 'Central well', 
  meaning_zh = '中井', 
  kanji_breakdown = '[{"kanji":"中","romaji":"naka","meaning_en":"middle, center","meaning_zh":"中"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name referring to a well located in the center of a village or field.',
  vibe = '["essential","balanced","traditional"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'A square well-frame (Izutsu) with a central circular dot or symbol indicating the center.',
  famous_bearers = '[{"name":"Masahiro Nakai","description":"Singer, actor, and host (SMAP)"},{"name":"Kazuya Nakai","description":"Voice actor (Zoro in One Piece)"}]'
WHERE id = 'fn_nakai__cedc8d';

-- Rank 263: Kawamura (河村)
UPDATE names SET 
  meaning_en = 'River village', 
  meaning_zh = '河村', 
  kanji_breakdown = '[{"kanji":"河","romaji":"kawa","meaning_en":"river","meaning_zh":"河"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name for someone from a village situated along a river.',
  vibe = '["nature-oriented","tranquil","social"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'Undulating river lines (Kawa) flowing alongside a stylized village cluster motif.',
  famous_bearers = '[{"name":"Takashi Kawamura","description":"Mayor of Nagoya"},{"name":"Ryuichi Kawamura","description":"Lead singer of Luna Sea"}]'
WHERE id = 'fn_kawamura__5b6347';

-- Rank 264: Maekawa (前川)
UPDATE names SET 
  meaning_en = 'Front river', 
  meaning_zh = '前川', 
  kanji_breakdown = '[{"kanji":"前","romaji":"mae","meaning_en":"front, before","meaning_zh":"前"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川"}]',
  etymology_en = 'A topographical name for someone living in front of a river.',
  vibe = '["nature-oriented","clear","forward-looking"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical river lines (Kawa) with a solid bar or arrow pointing toward the front.',
  famous_bearers = '[{"name":"Kunio Maekawa","description":"Renowned modernist architect"}]'
WHERE id = 'fn_maekawa__0cecfa';

-- Rank 265: Miyagawa (宫川)
UPDATE names SET 
  meaning_en = 'Shrine river', 
  meaning_zh = '宫川', 
  kanji_breakdown = '[{"kanji":"宫","romaji":"miya","meaning_en":"shrine, palace","meaning_zh":"宫、神社"},{"kanji":"川","romaji":"gawa","meaning_en":"river","meaning_zh":"川"}]',
  etymology_en = 'A topographical name referring to a river that flows near or through a Shinto shrine.',
  vibe = '["sacred","tranquil","majestic"]',
  element = '["water","spirit"]',
  status = 'enriched',
  kamon_prompt = 'Stylized river waves (Seigaiha) flowing around a simple palace or shrine roof silhouette.',
  famous_bearers = '[{"name":"Daisuke Miyagawa","description":"Famous comedian"}]'
WHERE id = 'fn_miyagawa__f055d1';

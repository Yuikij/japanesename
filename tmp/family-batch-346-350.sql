-- Ranks 346-350: Nagasawa, Kasahara, Katayama, Ota, Hosono

-- Rank 346: Nagasawa (長沢)
UPDATE names SET 
  meaning_en = 'Long marsh', 
  meaning_zh = '长泽', 
  kanji_breakdown = '[{"kanji":"長","romaji":"naga","meaning_en":"long, leader, senior","meaning_zh":"长、长久"},{"kanji":"沢","romaji":"sawa","meaning_en":"marsh, stream, valley","meaning_zh":"泽、溪流"}]',
  etymology_en = 'A topographical name referring to a long, marshy valley.',
  vibe = '["nature-oriented","flowing","expansive"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Three horizontal wavy lines representing a stream, stretched to imply length, within a circle.',
  famous_bearers = '[{"name":"Nagasawa Masami","description":"Top-tier award-winning Japanese actress"}]'
WHERE id = 'fn_chousawa__91cd50';

-- Rank 347: Kasahara (笠原)
UPDATE names SET 
  meaning_en = 'Straw hat plain', 
  meaning_zh = '笠原', 
  kanji_breakdown = '[{"kanji":"笠","romaji":"kasa","meaning_en":"straw hat, umbrella","meaning_zh":"笠、斗笠"},{"kanji":"原","romaji":"hara","meaning_en":"field, plain","meaning_zh":"原、原野"}]',
  etymology_en = 'A topographical name referring to a "plain of straw hats," possibly referring to where local hat-making materials were harvested or where hat-makers resided.',
  vibe = '["nature-oriented","earthy","traditional"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized conical straw hat (Kasa-mon) centered over three vertical lines representing a field.',
  famous_bearers = '[{"name":"Kasahara Momona","description":"Member of the idol group ME:I and former Angerme member"}]'
WHERE id = 'fn_kasahara__bf4884';

-- Rank 348: Katayama (片山)
UPDATE names SET 
  meaning_en = 'Side mountain', 
  meaning_zh = '片山', 
  kanji_breakdown = '[{"kanji":"片","romaji":"kata","meaning_en":"piece, side, one-sided","meaning_zh":"片、侧"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name referring to a "partial mountain" or someone living on the side of a mountain ridge.',
  vibe = '["nature-oriented","stable","modest"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A half-mountain silhouette (with only one side shown) set against a full circular moon.',
  famous_bearers = '[{"name":"Katayama Tetsu","description":"Former Prime Minister of Japan (the first socialist PM)"}]'
WHERE id = 'fn_katayama__2fc87e';

-- Rank 349: Ota (太田 - Oota)
UPDATE names SET 
  meaning_en = 'Great rice field', 
  meaning_zh = '太田', 
  kanji_breakdown = '[{"kanji":"太","romaji":"oo","meaning_en":"thick, big, great","meaning_zh":"太、大"},{"kanji":"田","romaji":"ta","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to a large or productive rice field. Often written with "Big" (大) but frequently used with "Plump/Great" (太).',
  vibe = '["nature-oriented","abundant","prosperous"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A traditional rice field grid symbol with an extra bold border to represent fullness and prosperity.',
  famous_bearers = '[{"name":"Ota Hikari","description":"Highly influential comedian and television host"},{"name":"Aika Ota","description":"Former member of HKT48"}]'
WHERE id = 'fn_ta_den__980e14';

-- Rank 350: Hosono (細野)
UPDATE names SET 
  meaning_en = 'Narrow field', 
  meaning_zh = '细野', 
  kanji_breakdown = '[{"kanji":"細","romaji":"hoso","meaning_en":"narrow, thin, fine","meaning_zh":"细、狭窄"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野"}]',
  etymology_en = 'A topographical name referring to a narrow strip of field or plain.',
  vibe = '["nature-oriented","precise","delicate"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'Two thin, elongated parallel lines representing a narrow path through a circular field boundary.',
  famous_bearers = '[{"name":"Haruomi Hosono","description":"Legendary musician and co-founder of Yellow Magic Orchestra (YMO)"}]'
WHERE id = 'fn_hosono__997b69';

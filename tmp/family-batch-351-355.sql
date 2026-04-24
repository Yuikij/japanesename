-- Ranks 351-355: Yoshiwara, Kanazawa, Nagashima, Miyauchi, Yasui

-- Rank 351: Yoshiwara (吉原)
UPDATE names SET 
  meaning_en = 'Lucky field', 
  meaning_zh = '吉原', 
  kanji_breakdown = '[{"kanji":"吉","romaji":"yoshi","meaning_en":"good luck, joy","meaning_zh":"吉、吉祥"},{"kanji":"原","romaji":"wara","meaning_en":"field, plain","meaning_zh":"原、原野"}]',
  etymology_en = 'A topographical name referring to a field of good fortune or a reed field (using a different "Yoshi" kanji historically). Famous for the Yoshiwara district in old Edo.',
  vibe = '["nature-oriented","lucky","historic"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized reed plant (Yoshi-mon) centered within a circular border.',
  famous_bearers = '[{"name":"Yoshiwara Kou","description":"Professional volleyball player"}]'
WHERE id = 'fn_yoshiwara__dd9466';

-- Rank 352: Kanazawa (金沢)
UPDATE names SET 
  meaning_en = 'Golden marsh', 
  meaning_zh = '金泽', 
  kanji_breakdown = '[{"kanji":"金","romaji":"kana","meaning_en":"gold, metal","meaning_zh":"金、黄金"},{"kanji":"沢","romaji":"zawa","meaning_en":"marsh, stream, valley","meaning_zh":"泽、溪流"}]',
  etymology_en = 'Meaning "marsh with gold," famously associated with the city of Kanazawa in Ishikawa prefecture.',
  vibe = '["prosperous","nature-oriented","stable"]',
  element = '["metal","water"]',
  status = 'enriched',
  kamon_prompt = 'Three wavy lines representing a marsh, with a stylized "Gold" (金) character at the center, within a floral border.',
  famous_bearers = '[{"name":"Kanazawa Hirokazu","description":"World-renowned Shotokan karate master"}]'
WHERE id = 'fn_kanazawa__30188f';

-- Rank 353: Nagashima (长岛)
UPDATE names SET 
  meaning_en = 'Long island', 
  meaning_zh = '长岛', 
  kanji_breakdown = '[{"kanji":"長","romaji":"naga","meaning_en":"long, leader","meaning_zh":"长、悠久"},{"kanji":"島","romaji":"shima","meaning_en":"island","meaning_zh":"岛"}]',
  etymology_en = 'A topographical name referring to a long island or coastal formation.',
  vibe = '["nature-oriented","expansive","strong"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'An elongated island silhouette surrounded by Stylized wave patterns (Seigaiha).',
  famous_bearers = '[{"name":"Nagashima Shigeo","description":"Legendary baseball player and manager for the Yomiuri Giants"}]'
WHERE id = 'fn_nagashima__0c5f1f';

-- Rank 354: Miyauchi (宫内)
UPDATE names SET 
  meaning_en = 'Inside the palace', 
  meaning_zh = '宫内', 
  kanji_breakdown = '[{"kanji":"宮","romaji":"miya","meaning_en":"palace, Shinto shrine","meaning_zh":"宫、神社"},{"kanji":"内","romaji":"uchi","meaning_en":"inside, within","meaning_zh":"内、里面"}]',
  etymology_en = 'Originally referred to people living within the precincts of a shrine or working for the Imperial court (Miyauchi-cho).',
  vibe = '["noble","sacred","traditional"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized shrine gate (Torii) motif with a circular border.',
  famous_bearers = '[{"name":"Miyauchi Katsusuke","description":"Award-winning novelist"}]'
WHERE id = 'fn_miyauchi__17eb5b';

-- Rank 355: Yasui (安井)
UPDATE names SET 
  meaning_en = 'Peaceful well', 
  meaning_zh = '安井', 
  kanji_breakdown = '[{"kanji":"安","romaji":"yasu","meaning_en":"peaceful, cheap, stable","meaning_zh":"安、平安"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name for a family living near a well known for its clean or "peaceful" water.',
  vibe = '["calm","nature-oriented","reliable"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'A square well-frame (Izutsu) with a stylized "Peace" (安) character in the center.',
  famous_bearers = '[{"name":"Yasui Santetsu","description":"Famous Edo-period Go player and astronomer (Shibukawa Shunkai)"}]'
WHERE id = 'fn_yasui__93e592';

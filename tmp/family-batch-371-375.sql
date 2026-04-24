-- Ranks 371-375: Fujikawa, Shimada, Fukumoto, Kurita, Kitano

-- Rank 371: Fujikawa (藤川)
UPDATE names SET 
  meaning_en = 'Wisteria river', 
  meaning_zh = '藤川', 
  kanji_breakdown = '[{"kanji":"藤","romaji":"fuji","meaning_en":"wisteria","meaning_zh":"藤、紫藤"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川、河流"}]',
  etymology_en = 'A topographical name referring to wisteria growing along a riverbank. Common throughout Japan.',
  vibe = '["nature-oriented","elegant","flowing"]',
  element = '["wood","water"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical lines representing a river, entwined with flowing wisteria clusters (Fuji-mon).',
  famous_bearers = '[{"name":"Fujikawa Kyuji","description":"Legendary baseball pitcher for the Hanshin Tigers"}]'
WHERE id = 'fn_fujikawa__216c24';

-- Rank 372: Shimada (岛田)
UPDATE names SET 
  meaning_en = 'Island rice paddy', 
  meaning_zh = '岛田', 
  kanji_breakdown = '[{"kanji":"島","romaji":"shima","meaning_en":"island","meaning_zh":"岛"},{"kanji":"田","romaji":"da","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to rice fields on an island or a patch of dry land in a marsh.',
  vibe = '["nature-oriented","grounded","steady"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A traditional rice field grid with a stylized island silhouette at the center.',
  famous_bearers = '[{"name":"Shimada Masahiko","description":"Acclaimed Japanese novelist"},{"name":"Shimada Haruka","description":"Former member of AKB48"}]'
WHERE id = 'fn_shimata__94b62b';

-- Rank 373: Fukumoto (福本)
UPDATE names SET 
  meaning_en = 'Blessed origin', 
  meaning_zh = '福本', 
  kanji_breakdown = '[{"kanji":"福","romaji":"fuku","meaning_en":"good fortune, blessing","meaning_zh":"福、吉祥"},{"kanji":"本","romaji":"moto","meaning_en":"origin, base","meaning_zh":"本、根源"}]',
  etymology_en = 'Meaning "at the foot of the hill of good fortune" or "original blessing".',
  vibe = '["lucky","prosperous","noble"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized "Fortune" (福) character in an ancient script style, surrounded by a circular border.',
  famous_bearers = '[{"name":"Fukumoto Nobuyuki","description":"Famous manga artist (Kaiji, Akagi)"},{"name":"Fukumoto Yutaka","description":"Legendary baseball player with the world stolen base record for years"}]'
WHERE id = 'fn_fukumoto__770014';

-- Rank 374: Kurita (栗田)
UPDATE names SET 
  meaning_en = 'Chestnut rice field', 
  meaning_zh = '栗田', 
  kanji_breakdown = '[{"kanji":"栗","romaji":"kuri","meaning_en":"chestnut","meaning_zh":"栗、板栗"},{"kanji":"田","romaji":"ta","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to rice fields near chestnut trees.',
  vibe = '["nature-oriented","earthy","abundant"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A circular motif containing a stylized chestnut burr (Kuri-mon) over a rice field grid.',
  famous_bearers = '[{"name":"Kurita Kanichi","description":"Voice actor and impressionist, the second voice of Lupin III"}]'
WHERE id = 'fn_kurita__915c54';

-- Rank 375: Kitano (北野)
UPDATE names SET 
  meaning_en = 'Northern field', 
  meaning_zh = '北野', 
  kanji_breakdown = '[{"kanji":"北","romaji":"kita","meaning_en":"north","meaning_zh":"北"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野"}]',
  etymology_en = 'A topographical name referring to a field in the north. Famous association with the Kitano Tenmangu shrine in Kyoto.',
  vibe = '["nature-oriented","directional","expansive"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized plum blossom (Ume-mon), the symbol of Kitano Tenmangu, centered within a field boundary.',
  famous_bearers = '[{"name":"Takeshi Kitano","description":"World-famous film director (Beat Takeshi), actor, and comedian"}]'
WHERE id = 'fn_kitano__fb1be3';

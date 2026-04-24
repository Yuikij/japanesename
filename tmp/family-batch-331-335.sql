-- Ranks 331-335: Suda, Yamakawa, Furuta, Shinden/Nitta, Umeda

-- Rank 331: Suda (須田)
UPDATE names SET 
  meaning_en = 'Essential rice paddy', 
  meaning_zh = '须田', 
  kanji_breakdown = '[{"kanji":"須","romaji":"su","meaning_en":"essential, necessary","meaning_zh":"须、必要"},{"kanji":"田","romaji":"da","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to essential or mandatory rice paddies. Common in eastern Japan.',
  vibe = '["nature-oriented","practical","strong"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized rice field grid (Ta-mon) with a "Su" (須) character motif in the center.',
  famous_bearers = '[{"name":"Suda Masaki","description":"Highly popular actor and singer"}]'
WHERE id = 'fn_suda__6e0d99';

-- Rank 332: Yamakawa (山川)
UPDATE names SET 
  meaning_en = 'Mountain and river', 
  meaning_zh = '山川', 
  kanji_breakdown = '[{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"},{"kanji":"川","romaji":"kawa","meaning_en":"river","meaning_zh":"川、河流"}]',
  etymology_en = 'A topographical name referring to mountains and rivers, two central elements of the Japanese landscape.',
  vibe = '["nature-oriented","balanced","expansive"]',
  element = '["wood","water"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical river lines (Kawa-mon) overlapping with a stylized three-peak mountain silhouette (Yama-mon).',
  famous_bearers = '[{"name":"Yamakawa Hiroshi","description":"Samurai and general during the Meiji period"}]'
WHERE id = 'fn_yamakawa__a8b26f';

-- Rank 333: Furuta (古田)
UPDATE names SET 
  meaning_en = 'Old rice paddy', 
  meaning_zh = '古田', 
  kanji_breakdown = '[{"kanji":"古","romaji":"furu","meaning_en":"old, ancient","meaning_zh":"古、古老"},{"kanji":"田","romaji":"ta","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name refers to long-established rice fields.',
  vibe = '["nature-oriented","traditional","reliable"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A traditional rice field grid with an "Old" (古) character stylized in an ancient seal script style in the center.',
  famous_bearers = '[{"name":"Furuta Atsuya","description":"Legendary baseball catcher and manager"}]'
WHERE id = 'fn_furuta__8f1f67';

-- Rank 334: Nitta (新田 - Corrected Reading)
UPDATE names SET 
  meaning_en = 'New rice paddy', 
  meaning_zh = '新田', 
  kanji_breakdown = '[{"kanji":"新","romaji":"ni","meaning_en":"new, fresh","meaning_zh":"新"},{"kanji":"田","romaji":"ta","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to newly developed rice fields (shinden). Famous for the Nitta clan involved in the Muromachi period wars.',
  vibe = '["nature-oriented","pioneering","historic"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A radiant rice field grid, surrounded by a border of newly budding rice plants.',
  famous_bearers = '[{"name":"Nitta Yoshisada","description":"Famous samurai commander against the Hojo clan"},{"name":"Nitta Mackenyu","description":"Well-known actor"}]'
WHERE id = 'fn_shinden__fb497d';

-- Rank 335: Umeda (梅田)
UPDATE names SET 
  meaning_en = 'Plum rice field', 
  meaning_zh = '梅田', 
  kanji_breakdown = '[{"kanji":"梅","romaji":"ume","meaning_en":"plum, Japanese apricot","meaning_zh":"梅、梅花"},{"kanji":"田","romaji":"da","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to rice fields near plum trees. The famous Osaka district Umeda originally used different kanji meaning "buried field".',
  vibe = '["nature-oriented","elegant","spring-inspired"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A single five-petaled plum blossom (Ume-mon) centered over a stylized rice field grid symbol.',
  famous_bearers = '[{"name":"Umeda Erika","description":"Member of the idol group °C-ute"}]'
WHERE id = 'fn_umeda__e0c243';

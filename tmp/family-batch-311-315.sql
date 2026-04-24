-- Ranks 311-315: Kaneda, Matsuyama, Hotta, Miyoshi, Sugita

-- Rank 311: Kaneda (金田)
UPDATE names SET 
  meaning_en = 'Golden field', 
  meaning_zh = '金田', 
  kanji_breakdown = '[{"kanji":"金","romaji":"kane","meaning_en":"gold, money, metal","meaning_zh":"金、金属"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for a fertile, "golden" rice paddy, or a place where metals were found. Often associated with abundance.',
  vibe = '["prosperous","nature-oriented","sturdy"]',
  element = '["metal","earth"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy grid (Ta) with stylized gold coins or "Metal" character radiance, within a circle.',
  famous_bearers = '[{"name":"Kaneda Masaichi","description":"Legendary baseball pitcher with 400 wins"},{"name":"Shotaro Kaneda","description":"Protagonist of the iconic anime AKIRA"}]'
WHERE id = 'fn_kaneda__a2dc1f';

-- Rank 312: Matsuyama (松山)
UPDATE names SET 
  meaning_en = 'Pine mountain', 
  meaning_zh = '松山', 
  kanji_breakdown = '[{"kanji":"松","romaji":"matsu","meaning_en":"pine tree","meaning_zh":"松"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name for someone living on a mountain covered with pine trees. Matsuyama is also a major city in Shikoku.',
  vibe = '["nature-oriented","eternal","majestic"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized pine tree silhouette (Matsu) on top of a triple-peak mountain peak.',
  famous_bearers = '[{"name":"Matsuyama Kenichi","description":"Famous actor known for playing L in Death Note"},{"name":"Matsuyama Matsutaro","description":"Founder of Matsuyama Karate"}]'
WHERE id = 'fn_matsuyama__91d091';

-- Rank 313: Hotta (堀田)
UPDATE names SET 
  meaning_en = 'Moat field', 
  meaning_zh = '堀田', 
  kanji_breakdown = '[{"kanji":"堀","romaji":"hori","meaning_en":"moat, ditch","meaning_zh":"堀、护城河"},{"kanji":"田","romaji":"ta","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to a rice paddy located near a moat or ditch. The Hotta clan was a prominent daimyo family serving the Tokugawa.',
  vibe = '["stable","protective","practical"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy grid (Ta) surrounded by a stylized moat enclosure silhouette.',
  famous_bearers = '[{"name":"Hotta Akane","description":"Famous model and actress"},{"name":"Hotta Masayoshi","description":"Chief senior councillor (Rōjū) of the late Tokugawa shogunate"}]'
WHERE id = 'fn_hotta__d111fe';

-- Rank 314: Miyoshi (三好)
UPDATE names SET 
  meaning_en = 'Three good things', 
  meaning_zh = '三好', 
  kanji_breakdown = '[{"kanji":"三","romaji":"mi","meaning_en":"three","meaning_zh":"三"},{"kanji":"好","romaji":"yoshi","meaning_en":"good, favorite","meaning_zh":"好"}]',
  etymology_en = 'An auspicious or ornamental name. Historically, the Miyoshi clan was a powerful family that dominated the central region during the Sengoku period.',
  vibe = '["auspicious","noble","balanced"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized "Good Luck" marks or triple vertical blocks (Mitsuboshi motif variant).',
  famous_bearers = '[{"name":"Miyoshi Nagayoshi","description":"Powerful Sengoku period daimyo who ruled over Kyoto"},{"name":"Miyoshi Umeki","description":"First Asian actor to win an Academy Award"}]'
WHERE id = 'fn_miyoshi__36437a';

-- Rank 315: Sugita (杉田)
UPDATE names SET 
  meaning_en = 'Cedar field', 
  meaning_zh = '杉田', 
  kanji_breakdown = '[{"kanji":"杉","romaji":"sugi","meaning_en":"cedar tree","meaning_zh":"杉"},{"kanji":"田","romaji":"ta","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for a rice paddy located near cedar trees.',
  vibe = '["nature-oriented","straight","sturdy"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy grid (Ta) with a stylized cedar tree silhouette (Sugi) in the center.',
  famous_bearers = '[{"name":"Sugita Tomokazu","description":"Famous voice actor known for Gintoki in Gintama"},{"name":"Sugita Genpaku","description":"Edo period scholar of Western medicine"}]'
WHERE id = 'fn_sugita__d4de0e';

-- Ranks 356-360: Shouji, Oouchi, Higa, Mogi, Hidaka

-- Rank 356: Shouji (庄司)
UPDATE names SET 
  meaning_en = 'Manor administrator', 
  meaning_zh = '庄司', 
  kanji_breakdown = '[{"kanji":"庄","romaji":"shou","meaning_en":"manor, villa","meaning_zh":"庄、庄园"},{"kanji":"司","romaji":"ji","meaning_en":"administer, official","meaning_zh":"司、代管"}]',
  etymology_en = 'An occupational name referring to the administrator of a private estate (shōen) in medieval Japan.',
  vibe = '["noble","historic","authoritative"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized "Sho" (庄) character inside a balanced octagonal frame.',
  famous_bearers = '[{"name":"Shouji Mikami","description":"Famous video game designer, creator of Resident Evil"}]'
WHERE id = 'fn_shouji__fe899f';

-- Rank 357: Oouchi (大内)
UPDATE names SET 
  meaning_en = 'Great interior', 
  meaning_zh = '大内', 
  kanji_breakdown = '[{"kanji":"大","romaji":"oo","meaning_en":"great","meaning_zh":"大"},{"kanji":"内","romaji":"uchi","meaning_en":"inside, palace","meaning_zh":"内、内廷"}]',
  etymology_en = 'Refers to the Imperial palace ("Daidairi"). The Oouchi clan were powerful daimyo in western Japan claiming descent from Korean royalty.',
  vibe = '["noble","historic","powerful"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A rhombus (Hanabishi) pattern which was the traditional crest of the powerful Oouchi clan.',
  famous_bearers = '[{"name":"Oouchi Yoshitaka","description":"Powerful Sengoku-period daimyo"}]'
WHERE id = 'fn_oouchi__6c5ddc';

-- Rank 358: Higa (比嘉)
UPDATE names SET 
  meaning_en = 'Comparison of joy', 
  meaning_zh = '比嘉', 
  kanji_breakdown = '[{"kanji":"比","romaji":"hi","meaning_en":"compare","meaning_zh":"比"},{"kanji":"嘉","romaji":"ga","meaning_en":"praise, joyful","meaning_zh":"嘉、美好"}]',
  etymology_en = 'One of the most common and distinctively Okinawan surnames. Likely topographical in Ryukyuan origin.',
  vibe = '["nature-oriented","joyful","islander"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Three comma-shaped swirls (Tomoe), a common motif in Ryukyuan culture and Okinawan heraldry.',
  famous_bearers = '[{"name":"Manami Higa","description":"Popular actress from Okinawa"}]'
WHERE id = 'fn_higa__9bc569';

-- Rank 359: Mogi (茂木)
UPDATE names SET 
  meaning_en = 'Luxuriant trees', 
  meaning_zh = '茂木', 
  kanji_breakdown = '[{"kanji":"茂","romaji":"mo","meaning_en":"luxuriant, overgrown","meaning_zh":"茂、茂盛"},{"kanji":"木","romaji":"gi","meaning_en":"tree, wood","meaning_zh":"木"}]',
  etymology_en = 'A topographical name referring to a place with thick, lush forest.',
  vibe = '["nature-oriented","vital","strong"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A cluster of three stylized trees with dense, leafy canopies.',
  famous_bearers = '[{"name":"Kenichiro Mogi","description":"Renowned brain scientist and author"}]'
WHERE id = 'fn_mogi__d7da44';

-- Rank 360: Hidaka (日高)
UPDATE names SET 
  meaning_en = 'High sun', 
  meaning_zh = '日高', 
  kanji_breakdown = '[{"kanji":"日","romaji":"hi","meaning_en":"sun, day","meaning_zh":"日、太阳"},{"kanji":"高","romaji":"daka","meaning_en":"high, tall","meaning_zh":"高"}]',
  etymology_en = 'A topographical name referring to a high place where the sun shines clearly. Common in Kyushu.',
  vibe = '["nature-oriented","bright","noble"]',
  element = '["fire"]',
  status = 'enriched',
  kamon_prompt = 'A high mountain silhouette with a large, radiant sun disc (Hi-no-maru) rising behind the peak.',
  famous_bearers = '[{"name":"Mitsuhiro Hidaka","description":"Singer/rapper known as SKY-HI, member of AAA"},{"name":"Noriko Hidaka","description":"Legendary voice actress (Minami in Touch, Akane in Ranma 1/2)"}]'
WHERE id = 'fn_hidaka__87b0a5';

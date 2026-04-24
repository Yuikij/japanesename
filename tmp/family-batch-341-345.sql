-- Ranks 341-345: Tsuchida, Ooshiro, Takizawa, Oomura, Kinjou

-- Rank 341: Tsuchida (土田)
UPDATE names SET 
  meaning_en = 'Earth rice paddy', 
  meaning_zh = '土田', 
  kanji_breakdown = '[{"kanji":"土","romaji":"tsuchi","meaning_en":"earth, soil","meaning_zh":"土"},{"kanji":"田","romaji":"da","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to rice fields with particular soil qualities. Found throughout Japan.',
  vibe = '["nature-oriented","grounded","practical"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A bold, square grid representing rice fields, filled with stylized earth texture or dots.',
  famous_bearers = '[{"name":"Tsuchida Bakusen","description":"Famous Nihonga painter"}]'
WHERE id = 'fn_tsuchida__c75661';

-- Rank 342: Ooshiro (大城)
UPDATE names SET 
  meaning_en = 'Great castle', 
  meaning_zh = '大城', 
  kanji_breakdown = '[{"kanji":"大","romaji":"oo","meaning_en":"big, great","meaning_zh":"大"},{"kanji":"城","romaji":"shiro","meaning_en":"castle","meaning_zh":"城、城堡"}]',
  etymology_en = 'A topographical name for someone living near a large castle. Very common in Okinawa (Ryukyu Islands).',
  vibe = '["strong","noble","historic"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized castle wall tiers with watchtower silhouettes, within a circular frame.',
  famous_bearers = '[{"name":"Ooshiro Mika","description":"Okinawan pop singer"}]'
WHERE id = 'fn_ooshiro__05fc27';

-- Rank 343: Takizawa (滝沢)
UPDATE names SET 
  meaning_en = 'Waterfall marsh', 
  meaning_zh = '滝沢', 
  kanji_breakdown = '[{"kanji":"滝","romaji":"taki","meaning_en":"waterfall","meaning_zh":"瀑布"},{"kanji":"沢","romaji":"zawa","meaning_en":"marsh, stream, valley","meaning_zh":"泽、溪流"}]',
  etymology_en = 'A topographical name referring to a stream or valley featuring a waterfall.',
  vibe = '["nature-oriented","flowing","dynamic"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Two vertical, forceful water lines representing a waterfall, ending in splash-like ripples.',
  famous_bearers = '[{"name":"Takizawa Hideaki","description":"Famous actor, singer, and producer, often called Tackey"},{"name":"Takizawa Karen","description":"Popular model and TV personality"}]'
WHERE id = 'fn_takizawa__482696';

-- Rank 344: Oomura (大村)
UPDATE names SET 
  meaning_en = 'Great village', 
  meaning_zh = '大村', 
  kanji_breakdown = '[{"kanji":"大","romaji":"oo","meaning_en":"big, great","meaning_zh":"大"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name referring to a large village. Famous for the Oomura clan, one of the earliest to convert to Christianity.',
  vibe = '["nature-oriented","community-focused","historic"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A stylized "Great" (大) character motif overlapping four circle shapes representing village houses.',
  famous_bearers = '[{"name":"Oomura Masujiro","description":"Military leader and tactical founder of the modern Imperial Japanese Army"}]'
WHERE id = 'fn_oomura__21afe0';

-- Rank 345: Kinjou (金城)
UPDATE names SET 
  meaning_en = 'Golden castle', 
  meaning_zh = '金城', 
  kanji_breakdown = '[{"kanji":"金","romaji":"kin","meaning_en":"gold, money, metal","meaning_zh":"金、黄金"},{"kanji":"城","romaji":"jou","meaning_en":"castle","meaning_zh":"城"}]',
  etymology_en = 'Meaning "golden castle" or "unbreakable castle". Widely recognized as one of the most common surnames in Okinawa.',
  vibe = '["prosperous","strong","noble"]',
  element = '["metal","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized castle silhouette with golden radiant lines emanating from the peaks.',
  famous_bearers = '[{"name":"Takeshi Kaneshiro","description":"Internationally famous actor (of mixed Okinawan-Taiwanese heritage)"}]'
WHERE id = 'fn_kinjou__9221c9';

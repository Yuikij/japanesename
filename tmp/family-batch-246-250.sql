-- Ranks 246-250: Shirai, Tsukamoto, Kodama, Sakata, Sakai

-- Rank 246: Shirai (白井)
UPDATE names SET 
  meaning_en = 'White well', 
  meaning_zh = '白井', 
  kanji_breakdown = '[{"kanji":"白","romaji":"shira","meaning_en":"white","meaning_zh":"白"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name referring to a well with clear, pure, or "white" water. Often associated with the Chiba or Miura clans.',
  vibe = '["pure","solid","traditional"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized square well-frame (Izutsu) with a central pure white circular emblem.',
  famous_bearers = '[{"name":"Roki Sasaki","description":"Note: His name is Sasaki but has a famous rival/teammate named Shirai (Shirai Kenzo)"},{"name":"Shirai Kenzo","description":"Olympic gymnast"}]'
WHERE id = 'fn_shirai__020474';

-- Rank 247: Tsukamoto (冢本)
UPDATE names SET 
  meaning_en = 'Near the mound', 
  meaning_zh = '冢本', 
  kanji_breakdown = '[{"kanji":"冢","romaji":"tsuka","meaning_en":"mound, hillock, tomb","meaning_zh":"冢、小山"},{"kanji":"本","romaji":"moto","meaning_en":"near, base, origin","meaning_zh":"本、附近"}]',
  etymology_en = 'A topographical name for someone living near a burial mound or a significant hillock.',
  vibe = '["historical","stable","grounded"]',
  element = '["earth","history"]',
  status = 'enriched',
  kamon_prompt = 'A stylized hillock silhouette with horizontal base lines, within a circular frame.',
  famous_bearers = '[{"name":"Tsukamoto Takashi","description":"Famous actor and singer"}]'
WHERE id = 'fn_tsukamoto__f31122';

-- Rank 248: Kodama (儿玉)
UPDATE names SET 
  meaning_en = 'Echo, tree spirit', 
  meaning_zh = '儿玉', 
  kanji_breakdown = '[{"kanji":"儿","romaji":"ko","meaning_en":"child, small","meaning_zh":"儿、小"},{"kanji":"玉","romaji":"dama","meaning_en":"jewel, ball, sphere","meaning_zh":"玉、宝石"}]',
  etymology_en = 'Literally "small jewel," but also a homophone for "echo" (木霊), which refers to tree spirits in Japanese folklore. The Kodama clan was a prominent warrior family.',
  vibe = '["mystical","precious","warrior-heritage"]',
  element = '["earth","spiritual"]',
  status = 'enriched',
  kamon_prompt = 'A minimalist round jewel icon with stylized echoes or tree spirit motifs surrounding it.',
  famous_bearers = '[{"name":"Kodama Gentarō","description":"General in the Imperial Japanese Army"}]'
WHERE id = 'fn_kodama__53615c';

-- Rank 249: Sakata (坂田)
UPDATE names SET 
  meaning_en = 'Rice paddy on the slope', 
  meaning_zh = '坂田', 
  kanji_breakdown = '[{"kanji":"坂","romaji":"saka","meaning_en":"slope, incline","meaning_zh":"坂、斜坡"},{"kanji":"田","romaji":"ta","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for a rice paddy situated on a hillside or slope.',
  vibe = '["nature-oriented","stable","classic"]',
  element = '["earth","landscape"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy grid tilted or integrated with a diagonal slope line.',
  famous_bearers = '[{"name":"Sakata Kintoki","description":"Folklore hero (Kintaro)"},{"name":"Gintoki Sakata","description":"Main protagonist of the manga/anime Gintama"}]'
WHERE id = 'fn_sakata__64f3a7';

-- Rank 250: Sakai (坂井)
-- ID: fn_sakai__d2d2e1, Romaji: sakai, Kanji: 鍧備簳 -> 坂井
UPDATE names SET 
  meaning_en = 'Well on the slope', 
  meaning_zh = '坂井', 
  kanji_breakdown = '[{"kanji":"坂","romaji":"saka","meaning_en":"slope, incline","meaning_zh":"坂、斜坡"},{"ji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name for a well located on or near a slope.',
  vibe = '["nature-oriented","stable","essential"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized well-frame (Izutsu) positioned along a diagonal slope line.',
  famous_bearers = '[{"name":"Masato Sakai","description":"Famous actor"},{"name":"Izumi Sakai","description":"Lead singer of ZARD"}]'
WHERE id = 'fn_sakai__d2d2e1';

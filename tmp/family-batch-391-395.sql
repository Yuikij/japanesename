-- Ranks 391-395: Kamei, Takashima, Sanrin, Fujisawa, Kubota

-- Rank 391: Kamei (龟井)
UPDATE names SET 
  meaning_en = 'Turtle well', 
  meaning_zh = '龟井', 
  kanji_breakdown = '[{"kanji":"亀","romaji":"kame","meaning_en":"turtle, tortoise","meaning_zh":"龟"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name referring to a well associated with turtles, symbolizing longevity and luck.',
  vibe = '["lucky","steady","nature-oriented"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized turtle shell pattern (Kikko-mon) surrounding a square well-head frame (Igeta-mon).',
  famous_bearers = '[{"name":"Kamei Eri","description":"Former member of the pop group Morning Musume"},{"name":"Kamei Shizuka","description":"Prominent Japanese politician"}]'
WHERE id = 'fn_kamei__f110e5';

-- Rank 392: Takashima (高岛)
UPDATE names SET 
  meaning_en = 'High island', 
  meaning_zh = '高岛', 
  kanji_breakdown = '[{"kanji":"高","romaji":"taka","meaning_en":"high, tall","meaning_zh":"高"},{"kanji":"島","romaji":"shima","meaning_en":"island","meaning_zh":"岛"}]',
  etymology_en = 'A topographical name referring to a "high island" or a prominent hill that looks like an island.',
  vibe = '["nature-oriented","elevated","vast"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized island silhouette with a central peak, enclosed within a circular border.',
  famous_bearers = '[{"name":"Takashima Reiko","description":"Award-winning Japanese actress"},{"name":"Takashima Masahiro","description":"Versatile actor from a famous acting family"}]'
WHERE id = 'fn_takashima__8857f2';

-- Rank 393: Sanrin (三轮)
UPDATE names SET 
  meaning_en = 'Three wheels/rings', 
  meaning_zh = '三轮', 
  kanji_breakdown = '[{"kanji":"三","romaji":"san","meaning_en":"three","meaning_zh":"三"},{"kanji":"輪","romaji":"rin","meaning_en":"wheel, ring, circle","meaning_zh":"轮、环、圈"}]',
  etymology_en = 'A name often linked to the sacred Mount Miwa (三輪山) in Nara, central to early Japanese mythology and the Miwa clan.',
  vibe = '["spiritual","ancient","balanced"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'Three interlocking rings (Mitsu-wa) or a stylized mountain silhouette representing Mount Miwa.',
  famous_bearers = '[{"name":"Sanrin Akihiro","description":"Birth name of Miwa Akihiro, the legendary singer, actor, and cultural icon"}]'
WHERE id = 'fn_sanrin__526068';

-- Rank 394: Fujisawa (藤泽)
UPDATE names SET 
  meaning_en = 'Wisteria marsh', 
  meaning_zh = '藤泽', 
  kanji_breakdown = '[{"kanji":"藤","romaji":"fuji","meaning_en":"wisteria","meaning_zh":"藤、紫藤"},{"kanji":"沢","romaji":"sawa","meaning_en":"marsh, swamp, stream","meaning_zh":"泽、小溪"}]',
  etymology_en = 'A topographical name referring to a marsh where wisteria grows. Very common in eastern Japan.',
  vibe = '["nature-oriented","elegant","flowing"]',
  element = '["wood","water"]',
  status = 'enriched',
  kamon_prompt = 'A circular motif of flowing wisteria clusters (Fuji-mon) above a stylized marsh water pattern.',
  famous_bearers = '[{"name":"Fujisawa Shuhei","description":"Renowned author of historical fiction and samurai novels"},{"name":"Fujisawa Hideyuki","description":"Legendary Go master known as Shuko"}]'
WHERE id = 'fn_fujisawa__d954d4';

-- Rank 395: Kubota (洼田)
UPDATE names SET 
  meaning_en = 'Sunken rice field', 
  meaning_zh = '洼田', 
  kanji_breakdown = '[{"kanji":"洼","romaji":"kubo","meaning_en":"hollow, depression, sunken","meaning_zh":"洼、凹陷"},{"kanji":"田","romaji":"ta","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to rice fields in a low-lying hollow or depression.',
  vibe = '["nature-oriented","grounded","steady"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A traditional rice field grid (Ta-mon) with a central curve representing a hollow or depression.',
  famous_bearers = '[{"name":"Kubota Toshinobu","description":"Pioneering Japanese R&B and soul singer"},{"name":"Kubota Masataka","description":"Popular film and television actor"}]'
WHERE id = 'fn_kubota__d00307';

-- Ranks 411-415: Nagano, Takemura, Miyazawa, Hiramatsu, Fukuoka

-- Rank 411: Nagano (长野)
UPDATE names SET 
  meaning_en = 'Long field', 
  meaning_zh = '长野', 
  kanji_breakdown = '[{"kanji":"長","romaji":"naga","meaning_en":"long, leader","meaning_zh":"长、久、首领"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野"}]',
  etymology_en = 'A topographical name referring to a "long field" or "expansive plain". Very common in eastern Japan, related to the Nagano prefecture.',
  vibe = '["nature-oriented","expansive","enduring"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A broad horizontal line representing a field boundary, centered within a circular frame with a stylized leaf motif.',
  famous_bearers = '[{"name":"Nagano Mamoru","description":"Influential manga artist and designer (The Five Star Stories)"},{"name":"Nagano Mei","description":"Award-winning actress"}]'
WHERE id = 'fn_nagano__963f5f';

-- Rank 412: Takemura (竹村)
UPDATE names SET 
  meaning_en = 'Bamboo village', 
  meaning_zh = '竹村', 
  kanji_breakdown = '[{"kanji":"竹","romaji":"take","meaning_en":"bamboo","meaning_zh":"竹"},{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村"}]',
  etymology_en = 'A topographical name referring to a village known for its bamboo groves.',
  vibe = '["nature-oriented","community-oriented","resilient"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Three bamboo stalks (Take-mon) arranged vertically to frame a simplified village gate silhouette.',
  famous_bearers = '[{"name":"Takemura Kiriko","description":"Birth name of the pop icon Kyary Pamyu Pamyu"},{"name":"Takemura Yohei","description":"Manga artist"}]'
WHERE id = 'fn_takemura__9fc078';

-- Rank 413: Miyazawa (宫泽)
UPDATE names SET 
  meaning_en = 'Shrine marsh', 
  meaning_zh = '宫泽', 
  kanji_breakdown = '[{"kanji":"宮","romaji":"miya","meaning_en":"shrine, palace","meaning_zh":"宫、神社"},{"kanji":"沢","romaji":"zawa","meaning_en":"marsh, stream","meaning_zh":"泽、小溪"}]',
  etymology_en = 'A topographical name meaning "marsh near the shrine". Famous for its literary and political associations.',
  vibe = '["spiritual","literary","flowing"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized wisteria or vine-wrapped shrine gate (Torii) above a flowing water pattern.',
  famous_bearers = '[{"name":"Miyazawa Kenji","description":"Legendary poet and author of Night on the Galactic Railroad"},{"name":"Miyazawa Kiichi","description":"Former Prime Minister of Japan"}]'
WHERE id = 'fn_miyazawa__5a108a';

-- Rank 414: Hiramatsu (平松)
UPDATE names SET 
  meaning_en = 'Flat/Peaceful pine', 
  meaning_zh = '平松', 
  kanji_breakdown = '[{"kanji":"平","romaji":"hira","meaning_en":"flat, peaceful","meaning_zh":"平、平坦、和平"},{"kanji":"松","romaji":"matsu","meaning_en":"pine tree","meaning_zh":"松、松树"}]',
  etymology_en = 'A topographical name referring to a pine tree on a plain or a "peaceful pine". Common in central Japan.',
  vibe = '["nature-oriented","peaceful","steadfast"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A stylized symmetrical pine tree (Matsu-mon) with broad horizontal branches representing a plain.',
  famous_bearers = '[{"name":"Hiramatsu Hiroyuki","description":"Famous Japanese chef and restaurateur"},{"name":"Hiramatsu Kanako","description":"Former member of the idol group SKE48"}]'
WHERE id = 'fn_hiramatsu__ac69bd';

-- Rank 415: Fukuoka (福冈)
UPDATE names SET 
  meaning_en = 'Blessed hill', 
  meaning_zh = '福冈', 
  kanji_breakdown = '[{"kanji":"福","romaji":"fuku","meaning_en":"good fortune, blessing","meaning_zh":"福、吉祥"},{"kanji":"岡","romaji":"oka","meaning_en":"hill, ridge","meaning_zh":"冈、小山"}]',
  etymology_en = 'Meaning "fortunate hill". Famous as the name of a major city and prefecture in Kyushu.',
  vibe = '["lucky","prosperous","elevated"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A hilltop silhouette with the "Fortune" (福) character integrated into the sun or moon rising behind it.',
  famous_bearers = '[{"name":"Fukuoka Kenki","description":"Former star rugby player for the Japanese national team"},{"name":"Fukuoka Masaaki","description":"Notable Japanese judoka"}]'
WHERE id = 'fn_fukuoka__da8f15';

-- Ranks 366-370: Tsukada, Okuno, Takenaka, Ishiguro, Hirota

-- Rank 366: Tsukada (塚田)
UPDATE names SET 
  meaning_en = 'Mound rice field', 
  meaning_zh = '冢田', 
  kanji_breakdown = '[{"kanji":"塚","romaji":"tsuka","meaning_en":"mound, hillock","meaning_zh":"冢、土丘"},{"kanji":"田","romaji":"da","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to a rice field located near a burial mound or hillock.',
  vibe = '["nature-oriented","grounded","mysterious"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized mound shapes rising above a traditional rice field grid boundary.',
  famous_bearers = '[{"name":"Tsukada Shiori","description":"Japanese actress and model"}]'
WHERE id = 'fn_tsukada__5411cc';

-- Rank 367: Okuno (奥野)
UPDATE names SET 
  meaning_en = 'Inner field', 
  meaning_zh = '奥野', 
  kanji_breakdown = '[{"kanji":"奥","romaji":"oku","meaning_en":"inner part, back, remote","meaning_zh":"奥、深处"},{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野"}]',
  etymology_en = 'A topographical name for someone living in a remote field or the inner part of a plain.',
  vibe = '["nature-oriented","remote","mysterious"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized wide field boundary with a single flower or grass motif placed deep in the center to suggest depth.',
  famous_bearers = '[{"name":"Okuno So","description":"Actor known for Kamen Rider Zi-O"}]'
WHERE id = 'fn_okuno__5cdbcb';

-- Rank 368: Takenaka (竹中)
UPDATE names SET 
  meaning_en = 'Middle of the bamboo', 
  meaning_zh = '竹中', 
  kanji_breakdown = '[{"kanji":"竹","romaji":"take","meaning_en":"bamboo","meaning_zh":"竹"},{"kanji":"中","romaji":"naka","meaning_en":"middle, inside","meaning_zh":"中、中间"}]',
  etymology_en = 'A topographical name referring to a house located in the middle of a bamboo grove. Famous for the Takenaka Hanbei, the legendary strategist.',
  vibe = '["nature-oriented","resilient","noble"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Two upright bamboo stalks (Take-mon) with a stylized "Middle" (中) character or a horizontal band joining them.',
  famous_bearers = '[{"name":"Takenaka Naoto","description":"Versatile actor and director"},{"name":"Takenaka Hanbei","description":"Famous strategist of the Sengoku period"}]'
WHERE id = 'fn_takenaka__e30337';

-- Rank 369: Ishiguro (石黒)
UPDATE names SET 
  meaning_en = 'Black stone', 
  meaning_zh = '石黑', 
  kanji_breakdown = '[{"kanji":"石","romaji":"ishi","meaning_en":"stone","meaning_zh":"石"},{"kanji":"黒","romaji":"guro","meaning_en":"black","meaning_zh":"黑"}]',
  etymology_en = 'A topographical name referring to black rocks or stones in a particular area.',
  vibe = '["strong","nature-oriented","stoic"]',
  element = '["earth","water"]',
  status = 'enriched',
  kamon_prompt = 'Three overlapping smooth, oval stones (Ishi-mon) filled with a solid black or dark grey texture.',
  famous_bearers = '[{"name":"Kazuo Ishiguro","description":"Nobel Prize-winning British-Japanese novelist (Never Let Me Go)"},{"name":"Ishiguro Hiroshi","description":"Famous roboticist known for creating lifelike androids"}]'
WHERE id = 'fn_ishiguro__1fd195';

-- Rank 370: Hirota (広田)
UPDATE names SET 
  meaning_en = 'Wide rice field', 
  meaning_zh = '广田', 
  kanji_breakdown = '[{"kanji":"広","romaji":"hiro","meaning_en":"wide, broad","meaning_zh":"广、宽阔"},{"kanji":"田","romaji":"ta","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'A topographical name referring to a large, expansive rice field.',
  vibe = '["nature-oriented","abundant","prosperous"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A vast, borderless rice field grid pattern representing expansiveness and broadness.',
  famous_bearers = '[{"name":"Hirota Koki","description":"Former Prime Minister of Japan (pre-WWII)"}]'
WHERE id = 'fn_hirota__977f88';

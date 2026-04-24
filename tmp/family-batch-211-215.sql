-- Ranks 211-215: Yagi, Sugiura, Matsunaga, Kitagawa, Ozawa

-- Rank 211: Yagi (八木)
UPDATE names SET 
  meaning_en = 'Eight trees', 
  meaning_zh = '八木', 
  kanji_breakdown = '[{"kanji":"八","romaji":"ya","meaning_en":"eight","meaning_zh":"八"},{"kanji":"木","romaji":"gi","meaning_en":"tree, wood","meaning_zh":"木、树"}]',
  etymology_en = 'A topographical name meaning "eight trees," often used metaphorically for a place with many trees. In ancient times, "eight" also meant "many".',
  vibe = '["nature-oriented","abundant","classic"]',
  element = '["wood","number"]',
  status = 'enriched',
  kamon_prompt = 'A pattern involving eight stylized branches or tree symbols within a circle.',
  famous_bearers = '[{"name":"Hiroshi Yagi","description":"Professional baseball player"}]'
WHERE id = 'fn_yagi__6b9b7c';

-- Rank 212: Sugiura (杉浦)
UPDATE names SET 
  meaning_en = 'Cedar bay', 
  meaning_zh = '杉浦', 
  kanji_breakdown = '[{"kanji":"杉","romaji":"sugi","meaning_en":"cedar","meaning_zh":"杉树"},{"kanji":"浦","romaji":"ura","meaning_en":"bay, inlet, coast","meaning_zh":"浦、湾"}]',
  etymology_en = 'A topographical name indicating a location near a bay or coast where Japanese cedars (sugi) grow.',
  vibe = '["nature-oriented","coastal","noble"]',
  element = '["wood","water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized cedar branch over wave patterns, representing the cedar bay.',
  famous_bearers = '[{"name":"Hisako Sugiura","description":"Architect"}]'
WHERE id = 'fn_sugiura__6d981d';

-- Rank 213: Matsunaga (松永)
UPDATE names SET 
  meaning_en = 'Eternal pine', 
  meaning_zh = '松永', 
  kanji_breakdown = '[{"kanji":"松","romaji":"matsu","meaning_en":"pine tree","meaning_zh":"松树"},{"kanji":"永","romaji":"naga","meaning_en":"eternal, long","meaning_zh":"永、长"}]',
  etymology_en = 'A wish for longevity and prosperity, symbolized by the evergreen pine tree. Many Matsunaga families descend from the Fujiwara or Taira clans.',
  vibe = '["prosperous","long-lasting","noble"]',
  element = '["wood","time"]',
  status = 'enriched',
  kamon_prompt = 'A bold pine tree silhouette with a character representing eternity or long life.',
  famous_bearers = '[{"name":"Matsunaga Hisahide","description":"Powerful daimyo of the Sengoku period"}]'
WHERE id = 'fn_matsunaga__c3f5ac';

-- Rank 214: Kitagawa (北川)
UPDATE names SET 
  meaning_en = 'North river', 
  meaning_zh = '北川', 
  kanji_breakdown = '[{"kanji":"北","romaji":"kita","meaning_en":"north","meaning_zh":"北"},{"kanji":"川","romaji":"gawa","meaning_en":"river","meaning_zh":"川、河"}]',
  etymology_en = 'A topographical name for someone living to the north of a river.',
  vibe = '["nature-oriented","directional","clean"]',
  element = '["water","direction"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical river lines with a stylized compass needle pointing north.',
  famous_bearers = '[{"name":"Keiko Kitagawa","description":"Famous actress and model"}]'
WHERE id = 'fn_kitagawa__cff7f8';

-- Rank 215: Ozawa (小沢)
UPDATE names SET 
  meaning_en = 'Small marsh', 
  meaning_zh = '小泽', 
  kanji_breakdown = '[{"kanji":"小","romaji":"o","meaning_en":"small, little","meaning_zh":"小"},{"kanji":"沢","romaji":"zawa","meaning_en":"marsh, swamp, stream","meaning_zh":"泽、溪流"}]',
  etymology_en = 'A topographical name indicating a location near a small marsh or stream.',
  vibe = '["nature-oriented","modest","classic"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A minimalist water ripple icon representing a small marsh.',
  famous_bearers = '[{"name":"Seiji Ozawa","description":"World-renowned conductor"},{"name":"Ichirō Ozawa","description":"Prominent politician"}]'
WHERE id = 'fn_ozawa__4505c7';

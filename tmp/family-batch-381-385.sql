-- Ranks 381-385: Yoshimoto, Niwa, Fujioka, Takeshita, Takemoto

-- Rank 381: Yoshimoto (吉本)
UPDATE names SET 
  meaning_en = 'Good fortune origin', 
  meaning_zh = '吉本', 
  kanji_breakdown = '[{"kanji":"吉","romaji":"yoshi","meaning_en":"good luck, joy","meaning_zh":"吉、吉祥"},{"kanji":"本","romaji":"moto","meaning_en":"origin, base","meaning_zh":"本、根源"}]',
  etymology_en = 'A topographical name meaning "at the base of the hill of good fortune". Associated with the famous entertainment conglomerate Yoshimoto Kogyo.',
  vibe = '["lucky","prosperous","cheerful"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized "Luck" (吉) character inside a circular border, often with a square at the base.',
  famous_bearers = '[{"name":"Yoshimoto Banana","description":"Internationally acclaimed contemporary novelist"},{"name":"Yoshimoto Takaaki","description":"Influential philosopher and critic"}]'
WHERE id = 'fn_yoshimoto__d3f0b8';

-- Rank 382: Niwa (丹羽)
UPDATE names SET 
  meaning_en = 'Red feathers', 
  meaning_zh = '丹羽', 
  kanji_breakdown = '[{"kanji":"丹","romaji":"ni","meaning_en":"red, cinnabar","meaning_zh":"丹、红色"},{"kanji":"羽","romaji":"wa","meaning_en":"feather, wing","meaning_zh":"羽、翅膀"}]',
  etymology_en = 'Meaning "red feathers". Historically linked to the Niwa clan, a prominent samurai family.',
  vibe = '["nature-oriented","vibrant","noble"]',
  element = '["fire","air"]',
  status = 'enriched',
  kamon_prompt = 'Two crossed feathers (Takano-ha style) within a circle, symbolizing the samurai heritage.',
  famous_bearers = '[{"name":"Niwa Nagahide","description":"Prominent daimyo of the Sengoku period under Oda Nobunaga"},{"name":"Niwa Daisuke","description":"Protagonist of the manga D.N.Angel"}]'
WHERE id = 'fn_niwa__db9996';

-- Rank 383: Fujioka (藤冈)
UPDATE names SET 
  meaning_en = 'Wisteria hill', 
  meaning_zh = '藤冈', 
  kanji_breakdown = '[{"kanji":"藤","romaji":"fuji","meaning_en":"wisteria","meaning_zh":"藤、紫藤"},{"kanji":"岡","romaji":"oka","meaning_en":"hill, ridge","meaning_zh":"冈、小山"}]',
  etymology_en = 'A topographical name referring to a hill where wisteria grows.',
  vibe = '["nature-oriented","elegant","elevated"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A hilltop silhouette overlapping with flowing wisteria clusters (Fuji-mon).',
  famous_bearers = '[{"name":"Fujioka Hiroshi","description":"Actor famous for portraying Takeshi Hongo (Kamen Rider 1)"},{"name":"Fujioka Dean","description":"Popular actor, musician, and model"}]'
WHERE id = 'fn_fujioka__9a8d60';

-- Rank 384: Takeshita (竹下)
UPDATE names SET 
  meaning_en = 'Under the bamboo', 
  meaning_zh = '竹下', 
  kanji_breakdown = '[{"kanji":"竹","romaji":"take","meaning_en":"bamboo","meaning_zh":"竹"},{"kanji":"下","romaji":"shita","meaning_en":"under, below","meaning_zh":"下"}]',
  etymology_en = 'A topographical name referring to someone living below a bamboo grove.',
  vibe = '["nature-oriented","resilient","simple"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A cluster of three bamboo leaves (Sasa-mon) within a circular frame.',
  famous_bearers = '[{"name":"Takeshita Noboru","description":"Former Prime Minister of Japan"},{"name":"Takeshita Riho","description":"Japanese rhythmic gymnast"}]'
WHERE id = 'fn_takeshita__6cfd74';

-- Rank 385: Takemoto (竹本)
UPDATE names SET 
  meaning_en = 'Bamboo origin', 
  meaning_zh = '竹本', 
  kanji_breakdown = '[{"kanji":"竹","romaji":"take","meaning_en":"bamboo","meaning_zh":"竹"},{"kanji":"本","romaji":"moto","meaning_en":"origin, base","meaning_zh":"本、根源"}]',
  etymology_en = 'A topographical name meaning "at the foot of the bamboo". Strongly associated with the Takemoto-za theater and Gidayubushi narration.',
  vibe = '["nature-oriented","steadfast","artistic"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A bamboo stalk section (Take-mon) with fresh leaves, symbolizing growth and resilience.',
  famous_bearers = '[{"name":"Takemoto Gidayu","description":"Founder of the Gidayu style of puppet theater narration"},{"name":"Takemoto Izumi","description":"Prolific manga artist"}]'
WHERE id = 'fn_takemoto__55c9dc';

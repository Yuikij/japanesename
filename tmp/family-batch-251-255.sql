-- Ranks 251-255: Enomoto, Mizutani, Kamiya, Saitou, Ohara

-- Rank 251: Enomoto (榎本)
UPDATE names SET 
  meaning_en = 'Root of a nettle tree', 
  meaning_zh = '榎本', 
  kanji_breakdown = '[{"kanji":"榎","romaji":"eno","meaning_en":"Japanese nettle tree, hackberry","meaning_zh":"榎、朴树"},{"kanji":"本","romaji":"moto","meaning_en":"base, origin, root","meaning_zh":"本、根"}]',
  etymology_en = 'A topographical name meaning "base of the hackberry tree." It refers to an area characterized by these trees.',
  vibe = '["nature-oriented","stable","classic"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A stylized hackberry leaf and berry motif within a circular border.',
  famous_bearers = '[{"name":"Enomoto Takeaki","description":"Admiral of the Tokugawa Navy and founder of the Republic of Ezo"}]'
WHERE id = 'fn_enomoto__455397';

-- Rank 252: Mizutani (水谷)
UPDATE names SET 
  meaning_en = 'Water valley', 
  meaning_zh = '水谷', 
  kanji_breakdown = '[{"kanji":"水","romaji":"mizu","meaning_en":"water","meaning_zh":"水"},{"kanji":"谷","romaji":"tani","meaning_en":"valley","meaning_zh":"谷"}]',
  etymology_en = 'A topographical name for a valley with a river or abundant water.',
  vibe = '["tranquil","natural","flowing"]',
  element = '["water","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized valley silhouette with three horizontal wave lines representing water at the base.',
  famous_bearers = '[{"name":"Jun Mizutani","description":"Olympic gold medalist in table tennis"}]'
WHERE id = 'fn_mizutani__a19463';

-- Rank 253: Kamiya (神谷)
UPDATE names SET 
  meaning_en = 'Divine valley', 
  meaning_zh = '神谷', 
  kanji_breakdown = '[{"kanji":"神","romaji":"kami","meaning_en":"god, divine, spirit","meaning_zh":"神、神圣"},{"kanji":"谷","romaji":"ya","meaning_en":"valley","meaning_zh":"谷"}]',
  etymology_en = 'A topographical name for a valley associated with a shrine or spirits. Also read as Mizutani in some cases, but Kamiya is most prominent.',
  vibe = '["spiritual","majestic","sacred"]',
  element = '["spirit","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized Torii gate standing inside a valley silhouette.',
  famous_bearers = '[{"name":"Hiroshi Kamiya","description":"Famous voice actor"},{"name":"Akira Kamiya","description":"Legendary voice actor"}]'
WHERE id = 'fn_kamiya__89c69f';

-- Rank 254: Saitou (斋藤)
-- Note: This is an alternate kanji for Rank 19 Saitou (斎藤), often related to religious duties.
UPDATE names SET 
  meaning_en = 'Wisteria of the purification room', 
  meaning_zh = '斋藤', 
  kanji_breakdown = '[{"kanji":"斋","romaji":"sai","meaning_en":"purification, dietary restriction, room","meaning_zh":"斋、斋戒"},{"kanji":"藤","romaji":"tou","meaning_en":"wisteria","meaning_zh":"藤"}]',
  etymology_en = 'An occupational-topographical name. "Sai" refers to the Saigū (Imperial Princess serving at Ise Shrine) or religious purification, and "Tou" refers to the Fujiwara clan descendancy.',
  vibe = '["noble","refined","religious-heritage"]',
  element = '["wood","spirit"]',
  status = 'enriched',
  kamon_prompt = 'Descending wisteria flowers (Sagarifuji) combined with a stylized hexagram or religious symbol.',
  famous_bearers = '[{"name":"Saito Musashibo Benkei","description":"Legendary warrior monk (though usually written differently, the name Saitou is iconic)"}]'
WHERE id = 'fn_saitou__694a10';

-- Rank 255: Ohara (小原)
UPDATE names SET 
  meaning_en = 'Small plain', 
  meaning_zh = '小原', 
  kanji_breakdown = '[{"kanji":"小","romaji":"o","meaning_en":"small","meaning_zh":"小"},{"kanji":"原","romaji":"hara","meaning_en":"plain, field","meaning_zh":"原"}]',
  etymology_en = 'A common topographical name for someone living on a small field or plain.',
  vibe = '["nature-oriented","peaceful","humble"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A minimalist field landscape with a single small tree or grass tuft within a circle.',
  famous_bearers = '[{"name":"Mari Ohara","description":"Character from Love Live! Sunshine!!"}]'
WHERE id = 'fn_ohara__1b43de';

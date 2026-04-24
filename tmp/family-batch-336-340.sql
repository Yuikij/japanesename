-- Ranks 336-340: Miki, Nonaka, Sakakibara, Murai, Okuyama

-- Rank 336: Miki (三木)
UPDATE names SET 
  meaning_en = 'Three trees', 
  meaning_zh = '三木', 
  kanji_breakdown = '[{"kanji":"三","romaji":"mi","meaning_en":"three","meaning_zh":"三"},{"kanji":"木","romaji":"ki","meaning_en":"tree, wood","meaning_zh":"木"}]',
  etymology_en = 'A topographical name referring to three trees. Famous for the Miki clan in Harima province.',
  vibe = '["nature-oriented","simple","balanced"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized pine trees arranged in a circle or a triangular formation.',
  famous_bearers = '[{"name":"Miki Shin-ichiro","description":"Prolific voice actor (Lockon Stratos, Takumi Fujiwara)"},{"name":"Takeo Miki","description":"Former Prime Minister of Japan"}]'
WHERE id = 'fn_miki__5b675d';

-- Rank 337: Nonaka (野中)
UPDATE names SET 
  meaning_en = 'Middle of the field', 
  meaning_zh = '野中', 
  kanji_breakdown = '[{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野、原野"},{"kanji":"中","romaji":"naka","meaning_en":"middle, inside","meaning_zh":"中、中间"}]',
  etymology_en = 'A topographical name indicating someone living in the center of a large field.',
  vibe = '["nature-oriented","central","vast"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A single stylized wild flower or cereal stalk positioned in the center of a circular field boundary.',
  famous_bearers = '[{"name":"Nonaka Ai","description":"Well-known voice actress"},{"name":"Hiromu Nonaka","description":"Prominent Japanese politician"}]'
WHERE id = 'fn_nonaka__3ca92a';

-- Rank 338: Sakakibara (榊原)
UPDATE names SET 
  meaning_en = 'Sacred tree plain', 
  meaning_zh = '榊原', 
  kanji_breakdown = '[{"kanji":"榊","romaji":"sakaki","meaning_en":"sacred Shinto tree","meaning_zh":"榊、神木"},{"kanji":"原","romaji":"bara","meaning_en":"field, plain","meaning_zh":"原、原野"}]',
  etymology_en = 'A topographical name referring to a field where sakaki trees (used in Shinto rituals) grow. Famous as one of the "Four Heavenly Kings" of the Tokugawa clan.',
  vibe = '["sacred","noble","nature-oriented"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized sakaki branch with Shinto paper streamers (shide) over a plain background lines.',
  famous_bearers = '[{"name":"Sakakibara Yasumasa","description":"One of the Four Heavenly Kings (Shitennō) of Tokugawa Ieyasu"}]'
WHERE id = 'fn_sakakibara__84e4e3';

-- Rank 339: Murai (村井)
UPDATE names SET 
  meaning_en = 'Village well', 
  meaning_zh = '村井', 
  kanji_breakdown = '[{"kanji":"村","romaji":"mura","meaning_en":"village","meaning_zh":"村、村庄"},{"kanji":"井","romaji":"ai","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'A topographical name for a family living near the main well of a village.',
  vibe = '["nature-oriented","community-focused","essential"]',
  element = '["wood","water"]',
  status = 'enriched',
  kamon_prompt = 'A stylized square wooden well-top (Izutsu-mon) surrounded by four leaf motifs representing the village.',
  famous_bearers = '[{"name":"Murai Kunio","description":"Veteran Japanese actor"}]'
WHERE id = 'fn_murai__435640';

-- Rank 340: Okuyama (奥山)
UPDATE names SET 
  meaning_en = 'Remote mountain', 
  meaning_zh = '奥山', 
  kanji_breakdown = '[{"kanji":"奥","romaji":"oku","meaning_en":"inner part, remote","meaning_zh":"奥、深处"},{"kanji":"山","romaji":"yama","meaning_en":"mountain","meaning_zh":"山"}]',
  etymology_en = 'A topographical name referring to someone living deep in the mountains.',
  vibe = '["nature-oriented","mysterious","remote"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A series of overlapping, increasingly faint mountain peaks to suggest depth and remoteness.',
  famous_bearers = '[{"name":"Okuyama Kazusa","description":"Japanese actress and model"}]'
WHERE id = 'fn_okuyama__3d83b1';

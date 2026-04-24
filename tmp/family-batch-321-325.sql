-- Ranks 321-325: Izumi, Kai, Ootake, Kasahara, Kuroki

-- Rank 321: Izumi (泉)
UPDATE names SET 
  meaning_en = 'Spring, Fountain', 
  meaning_zh = '泉', 
  kanji_breakdown = '[{"kanji":"泉","romaji":"izumi","meaning_en":"spring, fountain, source","meaning_zh":"泉、源泉"}]',
  etymology_en = 'A topographical name for someone living near a spring or fountain of water. Izumi was also the name of an ancient province.',
  vibe = '["nature-oriented","flowing","pure"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Three vertical water lines flowing from a central circular source, within a stylized circular border.',
  famous_bearers = '[{"name":"Izumi Kyoka","description":"Famous Meiji and Taisho period novelist"},{"name":"Izumi Sakai","description":"Lead singer of the band ZARD"}]'
WHERE id = 'fn_izumi__053614';

-- Rank 322: Kai (甲斐)
UPDATE names SET 
  meaning_en = 'Worth while, Kai Province', 
  meaning_zh = '甲斐', 
  kanji_breakdown = '[{"kanji":"甲","romaji":"ka","meaning_en":"shell, armor, rank A","meaning_zh":"甲、盔甲"},{"kanji":"斐","romaji":"i","meaning_en":"patterned, beautiful","meaning_zh":"斐、采风"}]',
  etymology_en = 'The name of an ancient province (modern Yamanashi). Often associated with the Takeda clan and their territory.',
  vibe = '["noble","historic","strong"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A stylized turtle shell pattern (Kikkou) or the Takeda Diamond (Takeda Bishi) motif.',
  famous_bearers = '[{"name":"Takeda Shingen","description":"The legendary daimyo of Kai Province"}]'
WHERE id = 'fn_kai__09dee8';

-- Rank 323: Ootake (大竹)
UPDATE names SET 
  meaning_en = 'Great bamboo', 
  meaning_zh = '大竹', 
  kanji_breakdown = '[{"kanji":"大","romaji":"oo","meaning_en":"big, great","meaning_zh":"大"},{"kanji":"竹","romaji":"take","meaning_en":"bamboo","meaning_zh":"竹"}]',
  etymology_en = 'A topographical name referring to a large bamboo grove.',
  vibe = '["nature-oriented","flexible","resilient"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'Three stylized bamboo stalks with leaves, one being prominent and taller than others.',
  famous_bearers = '[{"name":"Ootake Shinobu","description":"Award-winning veteran actress"}]'
WHERE id = 'fn_ootake__189c36';

-- Rank 324: Kasahara (笠原)
UPDATE names SET 
  meaning_en = 'Bamboo hat plain', 
  meaning_zh = '笠原', 
  kanji_breakdown = '[{"kanji":"笠","romaji":"kasa","meaning_en":"bamboo hat, conical hat","meaning_zh":"笠、斗笠"},{"kanji":"原","romaji":"hara","meaning_en":"field, plain","meaning_zh":"原、原野"}]',
  etymology_en = 'A topographical name referring to someone living on a plain associated with bamboo hats, possibly where they were made or used as markers.',
  vibe = '["nature-oriented","practical","traditional"]',
  element = '["wood","earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized conical bamboo hat (Kasa) silhouette positioned over two horizontal plain lines.',
  famous_bearers = '[{"name":"Kasahara Momona","description":"Famous idol and former member of Angerme"}]'
WHERE id = 'fn_kasahara__95b8e8';

-- Rank 325: Kuroki (黑木 - Variant)
-- Note: Re-validating ID to ensure it matches the common variant at this rank.
UPDATE names SET 
  meaning_en = 'Black wood', 
  meaning_zh = '黑木', 
  kanji_breakdown = '[{"kanji":"黑","romaji":"kuro","meaning_en":"black, dark","meaning_zh":"黑"},{"kanji":"木","romaji":"ki","meaning_en":"tree, wood","meaning_zh":"木"}]',
  etymology_en = 'A topographical name referring to dark-colored trees or unpeeled timber. Common in Kyushu.',
  vibe = '["strong","nature-oriented","solid"]',
  element = '["wood"]',
  status = 'enriched',
  kamon_prompt = 'A bold, single tree silhouette with dark, thick branch lines, within a circular frame.',
  famous_bearers = '[{"name":"Kuroki Meisa","description":"Actress and singer"},{"name":"Kuroki Hitomi","description":"Famous actress"}]'
WHERE id = 'fn_kuroki__b198e4';

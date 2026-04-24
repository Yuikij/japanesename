-- Ranks 306-310: Nakahara, Tsutsumi, Nozaki, Nakazawa, Yoneda

-- Rank 306: Nakahara (中原)
UPDATE names SET 
  meaning_en = 'Middle plain', 
  meaning_zh = '中原', 
  kanji_breakdown = '[{"kanji":"中","romaji":"naka","meaning_en":"middle, center","meaning_zh":"中"},{"kanji":"原","romaji":"hara","meaning_en":"field, plain","meaning_zh":"原、原野"}]',
  etymology_en = 'A topographical name for someone living in the center of a wide plain. The Nakahara clan were traditionally scholars and administrators.',
  vibe = '["nature-oriented","balanced","historic"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized open plain landscape with a central sun or "Middle" mark, within a circular frame.',
  famous_bearers = '[{"name":"Nakahara Chuuya","description":"Famous early Showa period poet"}]'
WHERE id = 'fn_nakahara__05ef0c';

-- Rank 307: Tsutsumi (堤)
UPDATE names SET 
  meaning_en = 'Embankment, Dike', 
  meaning_zh = '堤', 
  kanji_breakdown = '[{"kanji":"堤","romaji":"tsutsumi","meaning_en":"embankment, dike, bank","meaning_zh":"堤、堤坝"}]',
  etymology_en = 'A topographical name for someone living near an embankment or dike built to prevent flooding.',
  vibe = '["protective","solid","nature-oriented"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'Three horizontal lines representing a sturdy embankment with stylized grass or water ripples at the base.',
  famous_bearers = '[{"name":"Tsutsumi Shinichi","description":"Highly acclaimed versatile actor"}]'
WHERE id = 'fn_tsutsumi__a87aaf';

-- Rank 308: Nozaki (野崎)
UPDATE names SET 
  meaning_en = 'Field cape', 
  meaning_zh = '野崎', 
  kanji_breakdown = '[{"kanji":"野","romaji":"no","meaning_en":"field, plain","meaning_zh":"野、原野"},{"kanji":"崎","romaji":"zaki","meaning_en":"cape, peninsula, spit","meaning_zh":"崎、海岬"}]',
  etymology_en = 'A topographical name referring to a cape or peninsula that extends from an open field or plain.',
  vibe = '["nature-oriented","sturdy","expansive"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A stylized peninsula motif jutting into waves, with a flat plain symbol at the base.',
  famous_bearers = '[{"name":"Nozaki Mado","description":"Novelist known for the "KADO: The Right Answer" and "Babylon""}]'
WHERE id = 'fn_nozaki__e7dfcc';

-- Rank 309: Nakazawa (中泽)
UPDATE names SET 
  meaning_en = 'Middle marsh', 
  meaning_zh = '中泽', 
  kanji_breakdown = '[{"kanji":"中","romaji":"naka","meaning_en":"middle, center","meaning_zh":"中"},{"kanji":"泽","romaji":"zawa","meaning_en":"marsh, swamp, wetlands","meaning_zh":"泽、湿地"}]',
  etymology_en = 'A topographical name for someone living in the middle of a marsh or wetland area.',
  vibe = '["nature-oriented","balanced","tranquil"]',
  element = '["water"]',
  status = 'enriched',
  kamon_prompt = 'Gently undulating marsh water lines with a central vertical line or dot, within a circle.',
  famous_bearers = '[{"name":"Masatomo Nakazawa","description":"Famous voice actor"},{"name":"Nakazawa Yuko","description":"Singer and first leader of Morning Musume"}]'
WHERE id = 'fn_nakazawa__bf89ad';

-- Rank 310: Yoneda (米田)
UPDATE names SET 
  meaning_en = 'Rice field', 
  meaning_zh = '米田', 
  kanji_breakdown = '[{"kanji":"米","romaji":"yone","meaning_en":"rice, grain","meaning_zh":"米、粮食"},{"kanji":"田","romaji":"da","meaning_en":"rice paddy","meaning_zh":"田"}]',
  etymology_en = 'A topographical name for a fertile field used for growing rice. "Yone" specifically refers to the grain.',
  vibe = '["auspicious","nature-oriented","practical"]',
  element = '["earth"]',
  status = 'enriched',
  kamon_prompt = 'A square rice paddy grid (Ta) with a central "Rice" (Kome) character motif.',
  famous_bearers = '[{"name":"Yoneda Koh","description":"Famous manga artist known for "Saezuru Tori wa Habataki-nai""}]'
WHERE id = 'fn_yoneda__d65e89';

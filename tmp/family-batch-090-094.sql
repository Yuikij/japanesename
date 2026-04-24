-- Rank 90: Matsuda (松田)
UPDATE names SET
    meaning_en = 'Pine field',
    meaning_zh = '松田，种有松树的田地',
    kanji_breakdown = '[{"kanji":"松","romaji":"matsu","meaning":"pine tree"},{"kanji":"田","romaji":"da","meaning":"rice field"}]',
    etymology_en = 'A classic topographic name. Pine trees (Matsu) symbolize longevity and endurance, while fields (Da) represent agricultural wealth.',
    vibe = '["nature", "lucky", "stable"]',
    element = '["wood", "earth"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring stylized pine needles (Matsu-ba) or a cross within a field symbol, traditional Japanese vector.',
    famous_bearers = '["Yusaku Matsuda (Actor)", "Seiko Matsuda (Singer)"]'
WHERE id = 'fn_matsuda__d684ad';

-- Rank 91: Nakano (中野)
UPDATE names SET
    meaning_en = 'Middle field/plain',
    meaning_zh = '中野，位于中间的原野',
    kanji_breakdown = '[{"kanji":"中","romaji":"naka","meaning":"middle, inside"},{"kanji":"野","romaji":"no","meaning":"field, plain"}]',
    etymology_en = 'Refers to the "central plain." Many settlements were named Nakano, leading to various unrelated lines adopting the name.',
    vibe = '["nature", "balanced", "spacious"]',
    element = '["earth", "plain"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring the "Naka" (middle) kanji stylized into a circular motif or a field sparrow (Suzume) pattern.',
    famous_bearers = '["Nakano Takeko (Onna-musha)", "Shizuka Nakano (Idol)"]'
WHERE id = 'fn_nakano__33c6c5';

-- Rank 92: Yoshioka (吉岡)
UPDATE names SET
    meaning_en = 'Lucky hill',
    meaning_zh = '吉冈，吉庆之岗',
    kanji_breakdown = '[{"kanji":"吉","romaji":"yoshi","meaning":"lucky, good fortune"},{"kanji":"岡","romaji":"oka","meaning":"hill, ridge"}]',
    etymology_en = 'Combines "lucky" (Yoshi) with "hill" (Oka). Often chosen as an auspicious topographic name for a successful settlement or defensive position.',
    vibe = '["auspicious", "positive", "noble"]',
    element = '["spirit", "earth"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring the "Yoshi" kanji or stylized rice-ear patterns atop a hill ridge symbol.',
    famous_bearers = '["Riho Yoshioka (Actress)", "Yoshioka Seijuro (Swordsman)"]'
WHERE id = 'fn_yoshioka__f3ae0f';

-- Rank 93: Harada (原田)
UPDATE names SET
    meaning_en = 'Plain field',
    meaning_zh = '原田，平原上的田地',
    kanji_breakdown = '[{"kanji":"原","romaji":"hara","meaning":"plain, field"},{"kanji":"田","romaji":"da","meaning":"rice field"}]',
    etymology_en = 'Topographic name derived from "a field on the plain." Harada is a common name across Japan associated with early agricultural settlers.',
    vibe = '["nature", "simple", "stable"]',
    element = '["earth", "plain"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring the stylized "Hara" kanji or a balanced composition of rice ears (Ine), Japanese mon style.',
    famous_bearers = '["Harada Sanosuke (Shinsengumi member)", "Mieko Harada (Actress)"]'
WHERE id = 'fn_harada__0deb38';

-- Rank 94: Fujiwara (藤原)
UPDATE names SET
    meaning_en = 'Wisteria plain',
    meaning_zh = '藤原，藤蔓覆盖的平原',
    kanji_breakdown = '[{"kanji":"藤","romaji":"fuji","meaning":"wisteria"},{"kanji":"原","romaji":"wara","meaning":"plain"}]',
    etymology_en = 'The most powerful and influential noble clan in Japanese history. Founded by Nakatomi no Kamatari, the family dominated the imperial court for centuries.',
    vibe = '["noble", "imperial", "historic", "powerful"]',
    element = '["flower", "plain", "lineage"]',
    status = 'enriched',
    kamon_prompt = 'The classic "Sagarifuji" (descending wisteria) family crest, highly ornate and symmetrical within a circular frame.',
    famous_bearers = '["Fujiwara no Michinaga (Regent)", "Fujiwara no Kamatari (Clan Founder)"]'
WHERE id = 'fn_fujiwara__5ca983';
-- Note: Fujiwara is huge, its ID was identified as fn_fujiwara__5ca983 (rank 61 was Miura earlier, check population in SQL).
-- Actually fujiwara population in SQL is 298,000 (roughly rank 60-70).


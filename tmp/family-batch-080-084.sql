-- Rank 80: Kondo (近藤)
UPDATE names SET
    meaning_en = 'Nearby wisteria / Near Fujiwara',
    meaning_zh = '近藤，近江的藤原氏',
    kanji_breakdown = '[{"kanji":"近","romaji":"kon","meaning":"near, close"},{"kanji":"藤","romaji":"do","meaning":"wisteria (藤原 Fujiwara)"}]',
    etymology_en = 'Usually originated from members of the Fujiwara clan residing in Omi Province (modern Shiga), hence "Kon" (near/Omi) + "do" (wisteria).',
    vibe = '["noble", "historical", "classic"]',
    element = '["flower", "lineage"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring the wisteria vine within a circle, or a stylized "Kon" kanji variant, traditional Japanese mon.',
    famous_bearers = '["Kondo Isami (Shinsengumi Commander)", "Marie Kondo (Organizing Consultant)"]'
WHERE id = 'fn_kondo__634127';

-- Rank 81: Abe (阿部) - Handled in 69, checking for 81 variant
-- Wait, the rank list says 81 is Abe (阿部), but 69 was also Abe (阿部). 
-- This usually means there are multiple popular readings or slightly different populations.
-- Let's check Rank 81 in the reference list.
-- 69: Abe (阿部), 81: Abe (安部) - Ah, kanji difference!

-- Rank 81: Abe (安部)
UPDATE names SET
    meaning_en = 'Peaceful part/clan',
    meaning_zh = '安部，平安的部曲',
    kanji_breakdown = '[{"kanji":"安","romaji":"a","meaning":"peaceful, quiet"},{"kanji":"部","romaji":"be","meaning":"clique, section, guild"}]',
    etymology_en = 'Similar to the other Abe clan but using the "An" (peace/cheap) kanji. Indicates a peaceful settle or a specific occupation-based branch.',
    vibe = '["peaceful", "stable", "classic"]',
    element = '["spirit", "social"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring the stylized plum blossom or a circular bell motif (Suzu), representing peace and divine protection.',
    famous_bearers = '["Kobo Abe (Author)", "Yoshitoshi Abe (Artist)"]'
WHERE id = 'fn_abe__46ae1a';

-- Rank 82: Sakamoto (坂本)
UPDATE names SET
    meaning_en = 'Base of the slope',
    meaning_zh = '坂本，坡道之本',
    kanji_breakdown = '[{"kanji":"坂","romaji":"saka","meaning":"slope, hill"},{"kanji":"本","romaji":"moto","meaning":"base, origin, root"}]',
    etymology_en = 'Topographic name meaning "at the foot of the hill/slope." Very common near temple entries and mountain paths.',
    vibe = '["nature", "sturdy", "foundational"]',
    element = '["earth", "slope"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring a stylized hill silhouette or the "K桔梗" (balloon flower) associated with the Sakamoto Ryoma family.',
    famous_bearers = '["Sakamoto Ryoma (Legendary Samurai)", "Ryuichi Sakamoto (Composer)"]'
WHERE id = 'fn_sakamoto__468038';

-- Rank 83: Endo (遠藤)
UPDATE names SET
    meaning_en = 'Distant wisteria / Far Fujiwara',
    meaning_zh = '远藤，远江的藤原氏',
    kanji_breakdown = '[{"kanji":"遠","romaji":"en","meaning":"distant, far"},{"kanji":"藤","romaji":"do","meaning":"wisteria (藤原 Fujiwara)"}]',
    etymology_en = 'Originated from the Fujiwara clan branch in Totomi Province (modern Shizuoka). "En" comes from the first character of Totomi (遠江).',
    vibe = '["noble", "historical", "distant"]',
    element = '["flower", "lineage"]',
    status = 'enriched',
    kamon_prompt = 'A family crest with wisteria branches (Fuji-mon) or stylized wheels (Kuruma) representing travel from the capital.',
    famous_bearers = '["Shusaku Endo (Author)", "Ken Endo (Robotics researcher)"]'
WHERE id = 'fn_endo__fe2af0';

-- Rank 84: Aoki (青木)
UPDATE names SET
    meaning_en = 'Green tree',
    meaning_zh = '青木，苍翠之木',
    kanji_breakdown = '[{"kanji":"青","romaji":"ao","meaning":"blue, green, young"},{"kanji":"木","romaji":"ki","meaning":"tree, wood"}]',
    etymology_en = 'A simple nature-based name referring to a lush, green tree. It suggests vitality and freshness.',
    vibe = '["nature", "vibrant", "simple"]',
    element = '["wood", "tree"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring a stylized evergreen branch or three leaves (Kaji-no-ha) inside a circle.',
    famous_bearers = '["Mayuko Aoki (Voice Actress)", "Aoki Konoyo (Scholar)"]'
WHERE id = 'fn_aoki__d1606b';


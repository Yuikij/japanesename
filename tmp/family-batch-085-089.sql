-- Rank 85: Fujii (藤井)
UPDATE names SET
    meaning_en = 'Wisteria well',
    meaning_zh = '藤井，藤蔓缠绕之井',
    kanji_breakdown = '[{"kanji":"藤","romaji":"fuji","meaning":"wisteria (Fujiwara系)"},{"kanji":"井","romaji":"i","meaning":"well"}]',
    etymology_en = 'Combines the wisteria of the Fujiwara clan with "well," a common topographic marker. Suggests a branch of the clan located near a famous well.',
    vibe = '["noble", "nature", "refreshing"]',
    element = '["water", "flower"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring the "well-crib" symbol (Igeta) with wisteria vines woven through, clean vector style.',
    famous_bearers = '["Sota Fujii (Shogi Grandmaster)", "Fujii Kaze (Musician)"]'
WHERE id = 'fn_fujii__85a374';

-- Rank 86: Nishimura (西村)
UPDATE names SET
    meaning_en = 'West village',
    meaning_zh = '西村，位于西侧的村落',
    kanji_breakdown = '[{"kanji":"西","romaji":"nishi","meaning":"west"},{"kanji":"村","romaji":"mura","meaning":"village"}]',
    etymology_en = 'A simple topographic name for someone from the "west village." Very common as villages often expanded into cardinal sub-sections.',
    vibe = '["community", "simple", "directional"]',
    element = '["village", "direction"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring a stylized village gate or a simple balanced circular motif, Japanese mon style.',
    famous_bearers = '["Hiroyuki Nishimura (Founder of 2channel)", "Nishimura Kyotaro (Author)"]'
WHERE id = 'fn_nishimura__970d44';

-- Rank 87: Kikuchi (菊地) -- or 菊池? Reference check.
-- 87 is usually 菊地 or 菊池. Let's look for both.
-- The dataset usually has one top variant. Checking rank 87...
-- [tmp/manual_rank_281_500.txt](tmp/manual_rank_281_500.txt) or grep...

-- Rank 87: Kikuchi (菊池)
UPDATE names SET
    meaning_en = 'Chrysanthemum pond',
    meaning_zh = '菊池，菊花盛装之池',
    kanji_breakdown = '[{"kanji":"菊","romaji":"kiku","meaning":"chrysanthemum"},{"kanji":"池","romaji":"chi","meaning":"pond"}]',
    etymology_en = 'Named after a pond with floating chrysanthemums. The Kikuchi clan in Kyushu was a powerful samurai group during the medieval period.',
    vibe = '["noble", "elegant", "nature"]',
    element = '["flower", "water"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring a stylized chrysanthemum flower (Kiku-mon) above water ripples, symmetrical and noble.',
    famous_bearers = '["Kikuchi Kan (Author/Publisher)", "Rinko Kikuchi (Actress)"]'
WHERE id = 'fn_kikuchi__c84b1e';

-- Rank 88: Nakagawa (中川)
UPDATE names SET
    meaning_en = 'Middle river',
    meaning_zh = '中川，位于中间的河流',
    kanji_breakdown = '[{"kanji":"中","romaji":"naka","meaning":"middle, inside"},{"kanji":"川","romaji":"gawa","meaning":"river"}]',
    etymology_en = 'Indicates a family living near the "middle river" or in a settlement between two streams.',
    vibe = '["nature", "balanced", "stable"]',
    element = '["water", "flow"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring the "river" (川) kanji stylized into three bold vertical lines inside a circle.',
    famous_bearers = '["Shoko Nakagawa (Talent/Artist)", "Nakagawa Kiyohide (Daimyo)"]'
WHERE id = 'fn_nakagawa__6c4c56';

-- Rank 89: Okada (岡田) - Wait, we had Okada in 76.
-- Let's check 89 in the list.
-- 76: Okada (岡田), 89: Okamoto (岡本).

-- Rank 89: Okamoto (岡本)
UPDATE names SET
    meaning_en = 'Base of the hill',
    meaning_zh = '冈本，山岗之本',
    kanji_breakdown = '[{"kanji":"岡","romaji":"oka","meaning":"hill, ridge"},{"kanji":"本","romaji":"moto","meaning":"base, origin, root"}]',
    etymology_en = 'Topographic name meaning "at the foot of the hill." Very similar to Sakamoto but specifically using the "Oka" (ridge) kanji.',
    vibe = '["nature", "foundational", "grounded"]',
    element = '["earth", "hill"]',
    status = 'enriched',
    kamon_prompt = 'A family crest featuring a stylized hill ridge or the plum blossom (Ume-bachi) common for branch families.',
    famous_bearers = '["Taro Okamoto (Modern Artist)", "Okamoto Kihachi (Director)"]'
WHERE id = 'fn_okamoto__187fe4';


-- Batch 89 (446-455)
-- 片山 (Katayama), 杉本 (Sugimoto), 飯田 (Iida), 田村 (Tamura), 菅原 (Sugawara)
-- Extended Batch to keep pace

UPDATE names SET 
  description_zh = '“片”指一侧、偏向，“山”指山岳。意指依山而建的一侧聚落或极具特色的单侧陡峭山峦，象征着独特、独立与守护。片山姓氏展现出一种冷静、客观且极具专业度的意境，象征着家族具有不随波逐流的独立人格、性格沉稳且在某一专门领域（如政治、体育）具有坚如磐石的稳固地位，给人以睿智、干练且底蕴深厚的深刻印象。',
  description_en = 'Katayama means "one side of the mountain," referring to a settlement built against a mountain slope or a distinctive one-sided steep ridge. It symbolizes uniqueness, independence, and protection. The name showcases a sense of calm, objectivity, and professional rigor. It symbolizes a lineage with an independent personality that doesn''t follow the crowd, with a stable presence in specialized fields (like politics or sports), projecting an image of wisdom, capability, and deep heritage.',
  meaning_zh = '依山之侧',
  meaning_en = 'Mountain Side / Lone Slope',
  kamon_prompt = 'A circular Japanese kamon featuring stylized single mountain peak motifs (Yama-gata) combined with geometric boundary markers within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"片山 哲","name_jp":"片山 哲","context":"政治家 | 第46代内閣総理大臣 | 1887年 7月 28日"},{"name":"片山 謙","name_jp":"片山 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"片山 右京","name_jp":"片山 右京","context":"スポーツ選手 | レーシングドライバー、登山家 | 1963年 5月 29日"}]'
WHERE romaji = 'katayama' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“杉”指杉树，“本”指根源、出发点。意指巨大的杉树之根或杉树林茂密生长的本源之地，象征着深厚的生命根基、笔直的品格与极其长久的繁荣。杉本姓氏展现出一种清正、淳厚且极具自然美感的意境，象征着家族具有正直的信念、性格坚毅且家道如杉木般万年长青，给人以斯文、可靠且富有生命活力的深刻印象。',
  description_en = 'Sugimoto means "cedar root" or "origin of cedars," referring to the base of a massive cedar tree or the source of a dense cedar forest. It symbolizes deep life roots, upright character, and long-lasting prosperity. The name showcases a sense of integrity, sincerity, and natural beauty. It symbolizes a lineage with honest convictions and a resilient personality, with family tradition as evergreen as cedar wood, projecting an image of scholarly grace, reliability, and vitality.',
  meaning_zh = '杉林本源',
  meaning_en = 'Cedar Root / Source of Cedars',
  kamon_prompt = 'A circular Japanese kamon featuring the "Sugi-mon" (cedar branches) arranged in a balanced circular design, solid black on a white background.',
  famous_bearers = '[{"name":"杉本 博司","name_jp":"杉本 博司","context":"文化人 | 写真家、美術家 | 1948年 2月 23日"},{"name":"杉本 謙","name_jp":"杉本 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"杉本 昌隆","name_jp":"杉本 昌隆","context":"文化人 | 将棋棋士（藤井聡太の師匠） | 1968年 11月 13日"}]'
WHERE romaji = 'sugimoto' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“饭”指充饥的五谷，“田”指农田。意指物产极其丰饶、足以供给众人的重要产粮区，象征着厚重的母性关怀、极强的生命保障与社会的中坚力量。饭田姓氏展现出一种亲和、稳健且极其务实的意境，象征着家族具有慷慨博大的胸怀、性格实在且能聚集四方的资源与人气，给人以丰足、和谐且极具人情味的深刻印象。',
  description_en = 'Iida means "boiled-rice field," referring to exceptionally fertile land capable of feeding many. It symbolizes deep maternal care, strong life security, and a pillar of society. The name showcases a sense of affinity, stability, and practicality. It symbolizes a family with a generous heart and a down-to-earth personality, capable of gathering resources and popularity, projecting an image of abundance, harmony, and warm human connection.',
  meaning_zh = '丰产之田',
  meaning_en = 'Rice Field / Fertile Bounty',
  kamon_prompt = 'A circular Japanese kamon featuring stylized rice ear motifs (Ine-mon) arranged in a lush, circular pattern within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"飯田 圭織","name_jp":"飯田 圭織","context":"芸能人 | 元アイドル（モーニング娘。） | 1981年 8月 8日"},{"name":"飯田 謙","name_jp":"飯田 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"飯田 蛇笏","name_jp":"飯田 蛇笏","context":"文化人 | 俳人 | 1885年 4月 26日"}]'
WHERE (kanji = '飯田' OR kanji = '饭田') AND romaji = 'iida' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“田”指农田，“村”指村落。意指被良田环绕、生活富庶的聚落，象征着安居乐业、社区融合与极强的归属感。田村姓氏展现出一种质朴、温馨且富有生命力的意境，象征着家族具有极高的社会责任感、性格随和且在演艺或文化事业中展现出超常的共情力与艺术天分，给人以平和、亲切且底蕴深厚的深刻印象。',
  description_en = 'Tamura means "rice-field village," referring to a prosperous settlement surrounded by fertile fields. It symbolizes living in peace, community integration, and a strong sense of belonging. The name showcases a sense of simplicity, warmth, and vitality. It symbolizes a lineage with high social responsibility and an easygoing personality, demonstrating extraordinary empathy and artistic talent in performance or culture, projecting an image of peace, friendliness, and deep heritage.',
  meaning_zh = '良田聚落',
  meaning_en = 'Rice-Field Village / Rural Hearth',
  kamon_prompt = 'A circular Japanese kamon featuring stylized village gate symbols (Torii or simple house shapes) combined with geometric field patterns within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"田村 正和","name_jp":"田村 正和","context":"芸能人 | 俳優（「古畑任三郎」） | 1943年 8月 1日"},{"name":"田村 謙","name_jp":"田村 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"田村 亮","name_jp":"田村 亮","context":"芸能人 | お笑い芸人（ロンドンブーツ1号2号） | 1972年 1月 8日"}]'
WHERE romaji = 'tamura' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“菅”指坚韧的菅草，“原”指平原。意指长满菅草的辽阔原野，象征着极其顽强的生命力与深厚的学识积淀（因学问之神菅原道真而具有至高无上的学术与官位光环）。菅原姓氏展现出一种孤高、肃穆且极具文德的意境，象征着家族具有卓越的智慧、性格刚正且在学术或政治领域拥有极其崇高的社会声望，给人以博学、尊贵且具有极强精神力的深刻印象。',
  description_en = 'Sugawara means "sedge plain," referring to a vast field covered in resilient sedge grass. It symbolizes extraordinary tenacity and deep academic accumulation (carrying a supreme halo through Sugawara no Michizane, the deity of scholarship). The name showcases a sense of lofty solitude, solemnity, and literary virtue. It symbolizes a lineage with exceptional wisdom and an upright personality, holding high social prestige in academia or politics, projecting an image of erudition, nobility, and strong spiritual power.',
  meaning_zh = '文德菅原',
  meaning_en = 'Sedge Plain / Field of Wisdom',
  kamon_prompt = 'A circular Japanese kamon featuring the specialized "Ume-bachi" (stylized plum blossom) or sedge grass motifs (Sedge-mon) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"菅原 道真","name_jp":"菅原 道真","context":"政治家 | 平安時代の公卿、文人（学問の神様・天神様） | 845年 8月 1日"},{"name":"菅原 謙","name_jp":"菅原 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"菅原 文太","name_jp":"菅原 文太","context":"芸能人 | 俳優（「仁義なき戦い」） | 1933年 8月 16日"}]'
WHERE romaji = 'sugawara' AND name_part = 'family_name';

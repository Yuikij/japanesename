-- Batch 7 (Surnames Ranked 30-34)
-- Targets: Maeda (前田), Okada (岡田), Hasegawa (長谷川), Fujita (藤田), Goto (後藤)

-- 1. Maeda (前田) [fn_maeda__dfe583]
UPDATE names SET 
  vibe = '["nature", "leader", "classic", "prosperous"]',
  element = '["earth", "field"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["front", "before", "field", "rice-paddy"]',
  meaning_zh = '村前之田',
  meaning_en = 'Front field / Field in front',
  description_zh = '“前”指前方或先导，“田”指生机勃勃的耕地。意指位于村落前方、视域开阔的肥沃田园。前田姓氏展现出一种进取、明朗且极具统率力的意境，象征着家族具有勇往直前的气概、性格豪迈且能够开创并守护丰饶的领地，给人以可靠、自信且极具威望的深刻印象。',
  description_en = 'Meaning "the field in front." It refers to rice paddies located in front of a village or settlement. As a surname, it carries a sense of prominence and proactive leadership, historically associated with powerful samurai clans like the Maeda of Kaga, evoking images of prosperity and strong regional influence.',
  etymology_en = 'A popular topographic name. Most famously associated with the Maeda clan of Kaga Domain (modern Ishikawa), who were one of the wealthiest daimyo families of the Edo period.',
  kanji_breakdown = '[{"kanji":"前","reading":"mae","meaning_zh":"前面、前方","meaning_en":"front/before"},{"kanji":"田","reading":"da","meaning_zh":"田地、稻田","meaning_en":"rice field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Maeda clan. The design MUST feature the "Plum Blossom" (Kaga Ume-bachi). Minimalist flat design, solid black on a white background, five stylized petals with dots, high contrast.',
  famous_bearers = '[{"name":"前田 利家","name_jp":"前田 利家","context":"歴史 | 戦国武将（「加賀百万石」の祖） | 1539年 1月 15日"},{"name":"前田 敦子","name_jp":"前田 敦子","context":"芸能人 | 俳優、元アイドル（AKB48） | 1991年 7月 10日"},{"name":"前田 健太","name_jp":"前田 健太","context":"スポーツ選手 | プロ野球選手（MLB） | 1988年 4月 11日"},{"name":"前田 精","name_jp":"前田 精","context":"歴史 | 陸軍軍人（インドネシア独立支援者） | 1898年 9月 21日"}]'
WHERE id = 'fn_maeda__dfe583';

-- 2. Okada (岡田) [fn_okada__67be16]
UPDATE names SET 
  vibe = '["nature", "noble", "stable", "traditional"]',
  element = '["earth", "field"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["hill", "mound", "field", "rice-paddy"]',
  meaning_zh = '岗上之田',
  meaning_en = 'Hill field',
  description_zh = '“冈”指山坡或高地，“田”指连绵的田野。意指位于丘陵地带、视野绝佳的耕地或高岗上的聚落。冈田姓氏展现出一种端庄、稳健且极其高雅的意境，象征着家族具有高屋建瓴的智慧、性格平和且立足点极其稳固，给人以礼貌、睿智且富有生活情趣的深刻印象。',
  description_en = 'Meaning "hill field." It refers to rice fields or settlements established on elevated ground or hillsides. The name conveys a sense of stability, noble perspective, and harmony with the natural landscape, suggesting a family that thrives in high, fertile places.',
  etymology_en = 'A classic topographic name. It was often adopted by families living in hillier agricultural regions. Several branches claim descent from the Seiwa Genji or Fujiwara clans.',
  kanji_breakdown = '[{"kanji":"岡","reading":"oka","meaning_zh":"冈峦、丘陵","meaning_en":"hill/mound"},{"kanji":"田","reading":"da","meaning_zh":"田地","meaning_en":"field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Okada clan. The design should feature "Crossed Hawk Feathers" (Taka-no-ha) or "Wisteria" (Fujimon). Minimalist flat design, solid black on a white background, sharp geometric lines, high contrast.',
  famous_bearers = '[{"name":"岡田 准一","name_jp":"岡田 准一","context":"芸能人 | 俳優、歌手（V6） | 1980年 11月 18日"},{"name":"岡田 将生","name_jp":"岡田 将生","context":"芸能人 | 俳優 | 1989年 8月 15日"},{"name":"岡田 彰布","name_jp":"岡田 彰布","context":"スポーツ選手 | プロ野球監督 | 1957年 11月 25日"},{"name":"岡田 有希子","name_jp":"岡田 有希子","context":"芸能人 | 歌手、アイドル | 1967年 8月 22日"}]'
WHERE id = 'fn_okada__67be16';

-- 3. Hasegawa (長谷川) [fn_hasegawa__989aa8]
UPDATE names SET 
  vibe = '["nature", "elegant", "expansive", "sophisticated"]',
  element = '["water", "mountain"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["long", "valley", "river", "stream"]',
  meaning_zh = '长谷之川',
  meaning_en = 'Long valley river',
  description_zh = '“长谷”指深邃连绵的山谷，“川”指流动的河。意指贯穿悠长峡谷的清澈河流或沿谷地分布的聚落。长谷川姓氏展现出一种开阔、深厚且极具诗意的意境，象征着家族具有渊远流长的底蕴、性格坚韧且极具纵深感，给人以文质彬彬、成熟稳重且极其考究的深刻印象。',
  description_en = 'Meaning "river in the long valley." The pronunciation "Hase" is a special reading (ateji) for "long valley." The name evokes a sense of expansive natural beauty, continuity, and historical depth, suggesting a lineage as enduring and steady as a river flowing through a deep valley.',
  etymology_en = 'A famous surname with origins in the Yamato region (Nara). The "Hase" reading is derived from "Hatsuse." Many branches claim descent from the Fujiwara clan or other ancient noble lineages.',
  kanji_breakdown = '[{"kanji":"長","reading":"hase (naga)","meaning_zh":"长、久远","meaning_en":"long"},{"kanji":"谷","reading":"gawa (ya)","meaning_zh":"山谷","meaning_en":"valley"},{"kanji":"川","reading":"gawa","meaning_zh":"河流","meaning_en":"river"}]',
  kamon_prompt = 'A circular Japanese kamon for the Hasegawa clan. The design should feature "Three Leaves" (Mitsu-ba) or "Fans" (Hi-ogi). Minimalist flat design, solid black on a white background, elegant botanical symmetry, high contrast.',
  famous_bearers = '[{"name":"長谷川 町子","name_jp":"長谷川 町子","context":"クリエイター | 漫画家（『サザエさん』作者） | 1920年 1月 30日"},{"name":"長谷川 博己","name_jp":"長谷川 博己","context":"芸能人 | 俳優 | 1977年 3月 7日"},{"name":"長谷川 等伯","name_jp":"長谷川 等伯","context":"芸術家 | 画師（安土桃山時代） | 1539年"},{"name":"長谷川 健太","name_jp":"長谷川 健太","context":"スポーツ選手 | サッカー監督 | 1965年 9月 25日"}]'
WHERE id = 'fn_hasegawa__989aa8';

-- 4. Fujita (藤田) [fn_fujita__291439]
UPDATE names SET 
  vibe = '["nature", "noble", "elegant", "prosperous"]',
  element = '["wood", "earth"]',
  use_case = '["classic", "common", "clan-based"]',
  kanji_meaning_tags = '["wisteria", "field", "rice-paddy"]',
  meaning_zh = '藤下之田',
  meaning_en = 'Wisteria field',
  description_zh = '“藤”指高贵的紫藤花，“田”指丰饶的耕地。意指紫藤盛开的沃土或与藤原氏相关的田产。藤田姓氏展现出一种华丽而不失沉稳、灵动而底蕴深厚的意境，象征着家族品格如藤蔓般坚韧、性格温文尔雅且具有极强的生命繁衍力，给人以气质高雅、处事圆通且极具文化教养的深刻印象。',
  description_en = 'Meaning "wisteria field." It often denotes a family linked to the great Fujiwara clan ("Wisteria Plain") who managed or owned agricultural fields. The name blends the elegance of wisteria blossoms with the grounded productivity of the field, suggesting a lineage that is both cultured and prosperous.',
  etymology_en = 'One of the many surnames derived from the Fujiwara clan (one of the four great clans of ancient Japan). The name spread as a mark of prestige and association with the central nobility.',
  kanji_breakdown = '[{"kanji":"藤","reading":"fuji","meaning_zh":"紫藤、藤蔓","meaning_en":"wisteria"},{"kanji":"田","reading":"ta","meaning_zh":"田地","meaning_en":"field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Fujita clan. The design MUST feature "Wisteria" (Downward or Upward Fujimon). Minimalist flat design, solid black on a white background, intricate drooping flower clusters, high contrast.',
  famous_bearers = '[{"name":"藤田 嗣治","name_jp":"藤田 嗣治","context":"芸術家 | 画家（レオナール・フジタ） | 1886年 11月 27日"},{"name":"藤田 菜七子","name_jp":"藤田 菜七子","context":"スポーツ選手 | 騎手 (JRA) | 1997年 8月 9日"},{"name":"藤田 晋","name_jp":"藤田 晋","context":"実業家 | サイバーエージェント代表 | 1973年 5月 16日"},{"name":"藤田 ニコル","name_jp":"藤田 ニコル","context":"芸能人 | モデル、タレント | 1998年 2月 20日"}]'
WHERE id = 'fn_fujita__291439';

-- 5. Goto (後藤) [fn_goto__a6dbd4]
UPDATE names SET 
  vibe = '["noble", "historical", "strong", "sophisticated"]',
  element = '["wood"]',
  use_case = '["classic", "common", "clan-based"]',
  kanji_meaning_tags = '["behind", "later", "after", "wisteria"]',
  meaning_zh = '后裔之藤',
  meaning_en = 'The latter Fujiwara / Behind the wisteria',
  description_zh = '“后”指方位或后裔，“藤”指显赫的藤原氏。意指居住在某地后方或分支自藤原氏的旁系家族。后藤姓氏展现出一种内敛、刚毅且极具家族荣誉感的意境，象征着家族具有继往开来的责任感、性格缜密且极具战略眼光，给人以干练、专业且背景极其深厚的深刻印象。',
  description_en = 'Meaning "the latter wisteria" or "behind the wisteria." It typically identifies a branch of the Fujiwara clan. The name carries a sense of aristocratic heritage tempered by the practicality of a cadet branch, suggesting a strong sense of duty, tradition, and intellectual depth.',
  etymology_en = 'A major "Fuji" surname. It often originated from Fujiwara descendants who settled in Bingo (Hiroshima) or other regions, using "Go" (later/behind) to distinguish their branch.',
  kanji_breakdown = '[{"kanji":"後","reading":"go","meaning_zh":"后面、后来","meaning_en":"after/behind"},{"kanji":"藤","reading":"to","meaning_zh":"紫藤","meaning_en":"wisteria"}]',
  kamon_prompt = 'A circular Japanese kamon for the Goto clan. The design should feature "Wisteria" (Fujimon) or "Oak Leaves". Minimalist flat design, solid black on a white background, symmetrical floral or leaf patterns, high contrast.',
  famous_bearers = '[{"name":"後藤 新平","name_jp":"後藤 新平","context":"政治家 | 医師、政治家（東京市長、関東大震災復興） | 1857年 7月 24日"},{"name":"後藤 真希","name_jp":"後藤 真希","context":"芸能人 | 歌手、元モーニング娘。 | 1985年 9月 23日"},{"name":"後藤 健二","name_jp":"後藤 健二","context":"その他 | ジャーナリスト | 1967年 9月 22日"},{"name":"後藤 象二郎","name_jp":"後藤 象二郎","context":"歴史 | 幕末・明治の政治家（土佐藩） | 1838年 4月 13日"}]'
WHERE id = 'fn_goto__a6dbd4';

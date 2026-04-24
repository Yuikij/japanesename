-- Batch 5 (Surnames Ranked 20-24)
-- Targets: Yamazaki (山崎), Mori (森), Ikeda (池田), Hashimoto (桥本/橋本), Abe (阿部/安倍)

-- 1. Yamazaki (山崎) [fn_yamazaki__b643f4]
UPDATE names SET 
  vibe = '["nature", "solid", "topographic", "reliable"]',
  element = '["mountain", "earth"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["mountain", "cape", "promontory"]',
  meaning_zh = '山岬之地',
  meaning_en = 'Mountain promontory',
  description_zh = '“山”指崇山峻岭，“崎”指山脉延伸出的陡峭地带。意指居住在山岬或地势突出的山脚下的人。山崎姓氏展现出一种稳健、自然且极具方位感的意境，象征着家族具有坚如磐石的身姿、性格开朗且能够像延伸的山脊一般连接不同的领域，给人以扎实、可靠且底蕴极其深厚的深刻印象。',
  description_en = 'Meaning "mountain cape" or "mountain promontory." It refers to people who lived near a protruding ridge or at the foot of a mountain. The name evokes a sense of natural stability, strength, and a clear geographic identity, suggesting a family as unshakable as a mountain.',
  etymology_en = 'A topographic name from the words Yama (mountain) and Saki (cape/peninsula). It is one of the most common surnames in Japan, found throughout the islands, often originating from various localities with this specific terrain.',
  kanji_breakdown = '[{"kanji":"山","reading":"yama","meaning_zh":"山岳","meaning_en":"mountain"},{"kanji":"崎","reading":"zaki","meaning_zh":"岬、山尖","meaning_en":"cape/promontory"}]',
  kamon_prompt = 'A circular Japanese kamon for the Yamazaki clan. The design should feature "Three Fans" (Mitsu Kashiwa) or stylized "Mountain Peaks" (Yama-mon). Minimalist flat design, solid black on a white background, sharp geometric precision, high contrast.',
  famous_bearers = '[{"name":"山崎 豊子","name_jp":"山崎 豊子","context":"文学者 | 小説家（『白い巨塔』『沈まぬ太陽』） | 1924年 11月 3日"},{"name":"山崎 賢人","name_jp":"山崎 賢人","context":"芸能人 | 俳優 | 1994年 9月 7日"},{"name":"山崎 康晃","name_jp":"山崎 康晃","context":"スポーツ選手 | プロ野球選手（横浜DeNAベイスターズ） | 1992年 10月 2日"},{"name":"山崎 育三郎","name_jp":"山崎 育三郎","context":"芸能人 | 俳優、歌手 | 1986年 1月 18日"}]'
WHERE id = 'fn_yamazaki__b643f4';

-- 2. Mori (森) [fn_mori__a47c1d]
UPDATE names SET 
  vibe = '["nature", "pure", "deep", "growth"]',
  element = '["wood", "forest"]',
  use_case = '["classic", "short", "mysterious"]',
  kanji_meaning_tags = '["forest", "woods", "thicket"]',
  meaning_zh = '茂密之森',
  meaning_en = 'Forest',
  description_zh = '“森”指由众多树木组成的广阔原始森林。意指居住在大森林中或负责守林祭祀的家族。森姓氏展现出一种幽静、苍翠且富含生命张力的意境，象征着家族具有极其深厚的根基、性格内敛而智慧，且带有一种大自然原始的神秘感，给人以斯文、儒雅且底蕴极其扎实的深刻印象。',
  description_en = 'Meaning "forest" or "deep woods." It signifies a family that either lived within a vast forest or was historically responsible for the management of sacred woodland. The name evokes a sense of tranquility, deep organic growth, and an ancient, mysterious connection to nature.',
  etymology_en = 'A topographic name used by many families. Some Mori clans are of Seiwa Genji origin, while others claim descent from the ancient Mononobe clan. The single kanji "Mori" represents the concept of many trees (Tree x3) forming a large, spiritual grove.',
  kanji_breakdown = '[{"kanji":"森","reading":"mori","meaning_zh":"森林","meaning_en":"forest"}]',
  kamon_prompt = 'A circular Japanese kamon for the Mori clan. The design should feature "Crane with Spread Wings" (Tsuru-no-maru) or "Paulownia" (Kirimon). Minimalist flat design, solid black on a white background, elegant symmetrical lines, high contrast.',
  famous_bearers = '[{"name":"森 鴎外","name_jp":"森 鴎外","context":"文学者 | 小説家、軍医（『舞姫』『阿部一族』） | 1862年 1月 19日"},{"name":"森 進一","name_jp":"森 進一","context":"音乐家 | 歌手 | 1947年 11月 18日"},{"name":"森 喜朗","name_jp":"森 喜朗","context":"政治家 | 第85・86代内閣総理大臣 | 1937年 7月 14日"},{"name":"森 英恵","name_jp":"森 英恵","context":"文化人 | ファッションデザイナー | 1926年 1月 8日"}]'
WHERE id = 'fn_mori__a47c1d';

-- 3. Ikeda (池田) [fn_ikeda__e93157]
UPDATE names SET 
  vibe = '["prosperity", "stable", "nourishing", "noble"]',
  element = '["water", "earth"]',
  use_case = '["historic", "common", "noble"]',
  kanji_meaning_tags = '["pond", "field", "rice-paddy"]',
  meaning_zh = '池畔田庄',
  meaning_en = 'Pond field',
  description_zh = '“池”指水源丰富的水池，“田”指肥沃的农田。意指居住在提供灌溉水源的水池旁的田园。池田姓氏展现出一种温润、富饶且极其安稳的意境，象征着家族具有滋养他人的能力、性格平和且资源丰足，在历史上更作为著名的大名家族而享有尊荣，给人以庄重、大气且底蕴极其雄厚的深刻印象。',
  description_en = 'Meaning "pond field." It refers to rice paddies located near a pond, which was crucial for irrigation in ancient Japan. The name suggests abundance, vitality, and a stable, nourishing lifestyle, often associated with powerful daimyo families of the Edo period.',
  etymology_en = 'A topographic name common throughout Japan. The most famous Ikeda clan descended from the Minamoto family and served as major daimyo in the Okayama and Tottori domains.',
  kanji_breakdown = '[{"kanji":"池","reading":"ike","meaning_zh":"水池","meaning_en":"pond"},{"kanji":"田","reading":"da","meaning_zh":"农田","meaning_en":"field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Ikeda clan. The design should feature a "Butterfly" (Ageha-cho), specifically a swallowtail butterfly with open wings. Minimalist flat design, solid black on a white background, elegant symmetrical patterns, high contrast.',
  famous_bearers = '[{"name":"池田 輝政","name_jp":"池田 輝政","context":"歴史 | 安土桃山・江戸の大名（「姫路城」を現在の姿に改築） | 1565年 1月 31日"},{"name":"池田 勇人","name_jp":"池田 勇人","context":"政治家 | 第58-60代内閣総理大臣 | 1899年 12月 3日"},{"name":"池田 理代子","name_jp":"池田 理代子","context":"文化人 | 漫画家（『ベルサイユのばら』） | 1947年 12月 18日"},{"name":"池田 秀一","name_jp":"池田 秀一","context":"芸能人 | 声優（シャア・アズナブル役） | 1949年 12月 2日"}]'
WHERE id = 'fn_ikeda__e93157';

-- 4. Hashimoto (橋本) [fn_hashimoto__9edce7]
UPDATE names SET 
  vibe = '["connecting", "active", "urban", "reliable"]',
  element = '["wood", "water"]',
  use_case = '["common", "modern", "dynamic"]',
  kanji_meaning_tags = '["bridge", "base", "origin"]',
  meaning_zh = '桥头人家',
  meaning_en = 'Base of the bridge',
  description_zh = '“桥”指连接两岸的桥梁，“本”指根基或附近。意指居住在关键交通枢纽处的桥头聚落。桥本姓氏展现出一种灵动、开阔且极其务实的意境，象征着家族具有连接人心与资源的智慧、性格坦诚且能够适应快速变化的环境，给人以亲切、智慧且朝气蓬勃的深刻印象。',
  description_en = 'Meaning "base of the bridge." It refers to people living near a bridge, which served as a focal point for commerce and travel. The name conveys a sense of connection, strategic placement, and movement, suggesting a communicative and resourceful family character.',
  etymology_en = 'A common topographic name. Bridges were significant landmarks and social centers in pre-modern Japan, leading many families who lived near them to adopt the name.',
  kanji_breakdown = '[{"kanji":"橋","reading":"hashi","meaning_zh":"桥梁","meaning_en":"bridge"},{"kanji":"本","reading":"moto","meaning_zh":"根基、附近","meaning_en":"base/origin"}]',
  kamon_prompt = 'A circular Japanese kamon for the Hashimoto clan. The design should feature a "Bridge Railing" (Kumano-mon) or stylized "Fans". Minimalist flat design, solid black on a white background, symmetrical rhythmic lines, high contrast.',
  famous_bearers = '[{"name":"橋本 龍太郎","name_jp":"橋本 龍太郎","context":"政治家 | 第82・83代内閣総理大臣 | 1937年 7月 29日"},{"name":"橋本 環奈","name_jp":"橋本 環奈","context":"芸能人 | 俳優 | 1999年 2月 3日"},{"name":"橋本 忍","name_jp":"橋本 忍","context":"文化人 | 脚本家（『七人の侍』『羅生門』） | 1918年 4月 18日"},{"name":"橋本 左内","name_jp":"橋本 左内","context":"歴史 | 幕末の福井藩士、思想家 | 1834年 7月 19日"}]'
WHERE id = 'fn_hashimoto__9edce7';

-- 5. Abe (阿部/安倍)
-- Handle Abé (阿部) [fn_abe__3a67d6]
UPDATE names SET 
  vibe = '["ancient", "noble", "prestigious", "solid"]',
  element = '["earth", "wood"]',
  use_case = '["historic", "classic", "political"]',
  kanji_meaning_tags = '["corner", "department", "section"]',
  meaning_zh = '山隅之族',
  meaning_en = 'Mountain corner lineage',
  description_zh = '“阿”指山脚或曲折处，“部”指部曲或管理机构。意指居住在山坳僻静处或拥有特定领地的古老部族。阿部姓氏展现出一种高尚、稳健且极其厚重的意境（源自孝元天皇之子大彦命的古老皇族后裔），象征着家族秉承正统、性格刚毅且在历史长河中始终保持着卓越的统治与管理智慧，给人以威严、儒雅且底蕴极其雄厚的深刻印象。',
  description_en = 'Meaning "mountain corner" or "management section." One of the most ancient and powerful clans in Japanese history, claiming descent from Prince Obiko (son of Emperor Kogen). The name evokes deep historical authority, imperial heritage, and a steadfast, institutional legacy.',
  etymology_en = 'The Abe clan was a major force in ancient Japan, managing the northern frontiers. The kanji "A" means corner/flank of a mountain, and "Be" refers to the ancient system of specialized labor/administration groups.',
  kanji_breakdown = '[{"kanji":"阿","reading":"a","meaning_zh":"山脚、转角","meaning_en":"mountain corner"},{"kanji":"部","reading":"be","meaning_zh":"部门、群体","meaning_en":"section"}]',
  kamon_prompt = 'A circular Japanese kamon for the Abe clan. The design should feature "Two Hawk Feathers" (Takanoha) or "Abalone" (Awabi). Minimalist flat design, solid black on a white background, sharp geometric precision, high contrast.',
  famous_bearers = '[{"name":"阿部 寛","name_jp":"阿部 寛","context":"芸能人 | 俳優 | 1964年 6月 22日"},{"name":"阿部 慎之助","name_jp":"阿部 慎之助","context":"スポーツ選手 | プロ野球監督（読売ジャイアンツ） | 1979年 3月 20日"},{"name":"阿部 仲麻吕","name_jp":"阿部 仲麻呂","context":"歴史 | 遣唐使、歌人 | 698年"},{"name":"阿部 正弘","name_jp":"阿部 正弘","context":"歴史 | 幕末の老中（日米和親条約締結） | 1819年 12月 3日"}]'
WHERE id = 'fn_abe__3a67d6';

-- Handle Abé (安倍) [fn_abe__511a3d]
UPDATE names SET 
  vibe = '["mystical", "spiritual", "intellectual", "ancient"]',
  element = '["light", "spirit"]',
  use_case = '["mythological", "legendary", "prestigious"]',
  kanji_meaning_tags = '["peace", "eternal", "spiritual"]',
  meaning_zh = '安平之宗',
  meaning_en = 'Peaceful lineage',
  description_zh = '“安”指平安与宁静，“倍”常作姓氏修饰语。这是与传说中的大阴阳师安倍晴明紧密相连的高贵姓氏，源自古代土御门家。安倍姓氏展现出一种深邃、睿智且极具神秘主义色彩的意境，象征着家族具有超凡的洞察力、性格沉着且在学术、祭祀及政治上拥有跨越时代的智慧，给人以儒雅、脱俗且底蕴极其深远的深刻印象。',
  description_en = 'Associated with the legendary Onmyoji, Abe no Seimei. The name carries strong spiritual and intellectual weight, stemming from the ancient Tsuchimikado family. It evokes a sense of spiritual peace, eternal wisdom, and a mystical connection to the traditional Japanese occult sciences.',
  etymology_en = 'A variant kanji for the ancient Abe clan. This specific spelling became highly prestigious through the Onmyodo practitioners of the Tsuchimikado family and the legacy of Abe no Seimei during the Heian period.',
  kanji_breakdown = '[{"kanji":"安","reading":"a","meaning_zh":"平安、稳定","meaning_en":"peaceful"},{"kanji":"倍","reading":"be","meaning_zh":"加倍、修饰","meaning_en":"double/increase"}]',
  kamon_prompt = 'A circular Japanese kamon for the Abe clan (Seimei lineage). The design MUST feature the "Five-Pointed Star" (Seimei-kikyo/Pentagram). Minimalist flat design, solid black on a white background, sharp geometric lines, high contrast.',
  famous_bearers = '[{"name":"安倍 晴明","name_jp":"安倍 晴明","context":"歴史 | 平安時代の陰阳師（伝説的英雄） | 921年 2月 21日"},{"name":"安倍 晋三","name_jp":"安倍 晋三","context":"政治家 | 第90・96-98代内閣総理大臣 | 1954年 9月 21日"},{"name":"安倍 公房","name_jp":"安倍 公房","context":"文学者 | 小説家、劇作家（『砂の女』） | 1924年 3月 7日"},{"name":"安倍 なつみ","name_jp":"安倍 なつみ","context":"芸能人 | 歌手（元モーニング娘。） | 1981年 8月 10日"}]'
WHERE id = 'fn_abe__511a3d';

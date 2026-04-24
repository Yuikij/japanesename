-- Batch 11 (Surnames Ranked 50-54)
-- Targets: Saito (斉藤), Wada (和田), Imai (今井), Watanabe/Watabe (渡部), Yamaguchi (山口)
-- Note: Re-ranking check. Note that Saito (斉藤) and Watanabe/Watabe (渡部) are variants of top 10 names.

-- 1. Saito (斉藤) [fn_saitou__091924]
UPDATE names SET 
  vibe = '["noble", "historical", "strong", "trustworthy"]',
  element = '["wood"]',
  use_case = '["classic", "common", "clan-based"]',
  kanji_meaning_tags = '["purification", "sacred", "wisteria"]',
  meaning_zh = '斋宫之藤',
  meaning_en = 'The purification Fujiwara / Sacred wisteria',
  description_zh = '“齐”原意为斋戒与圣洁，“藤”指显赫的藤原氏。意指在斋宫或从事祭祀职务的藤原氏分支。齐藤姓氏（斎藤的变体）展现出一种庄重、干练且极具背景实力的意境，象征着家族具有严谨的家风、性格刚毅且极具责任感，给人以正直、威严且底蕴极其深厚的深刻印象。',
  description_en = 'Meaning "the Fujiwara of the purification office." It identifies a branch of the Fujiwara clan involved in sacred rituals or serving at the Ise Grand Shrine. The name conveys a sense of disciplined heritage, spiritual significance, and historical authority, suggesting a character that is principled and reliable.',
  etymology_en = 'A major "Fuji" surname. Variants include 斎藤 (more complex) and 斉藤 (simplified). Derived from "Itsuki-no-miya" (斋宫) and "Fujiwara" (藤原). Historically associated with powerful samurai and advisors.',
  kanji_breakdown = '[{"kanji":"齐 (斉)","reading":"sai","meaning_zh":"整齐、斋戒、祭祀","meaning_en":"equal/purification"},{"kanji":"藤","reading":"to","meaning_zh":"紫藤","meaning_en":"wisteria"}]',
  kamon_prompt = 'A circular Japanese kamon for the Saito clan. The design should feature "Two Interlocking Wisteria" (Ni-mai Fuji) or stylized "Oak Leaves". Minimalist flat design, solid black on a white background, balanced botanical symmetry, high contrast.',
  famous_bearers = '[{"name":"斉藤 由貴","name_jp":"斉藤 由貴","context":"芸能人 | 俳優、歌手 | 1966年 9月 10日"},{"name":"斉藤 和義","name_jp":"斉藤 和義","context":"音楽家 | シンガーソングライター | 1966年 6月 22日"},{"name":"斉藤 壮馬","name_jp":"斉藤 壮馬","context":"芸能人 | 声優、歌手 | 1991年 4月 22日"},{"name":"斉藤 鉄夫","name_jp":"斉藤 鉄夫","context":"政治家 | 国土交通相、公明党副代表 | 1952年 2月 5日"}]'
WHERE id = 'fn_saitou__091924';

-- 2. Wada (和田) [fn_wada__1f1852]
UPDATE names SET 
  vibe = '["nature", "serene", "stable", "prosperous"]',
  element = '["earth", "field"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["harmony", "peace", "field", "rice-paddy"]',
  meaning_zh = '和美之田',
  meaning_en = 'Peaceful field / Harmonic rice paddy',
  description_zh = '“和”指和谐与平衡，“田”指生机勃勃的耕地。意指气候温润、人际和谐的肥沃田园。和田姓氏展现出一种温厚、平和且极具生命力的意境，象征着家族具有守望相助的传统、性格圆融且事业基础极度稳固，给人一亲切、踏实且富有生活智慧的深刻印象。',
  description_en = 'Meaning "peaceful field" or "harmonic rice paddy." It refers to fertile agricultural lands known for their calm surroundings or community cooperation. The name evokes a sense of social harmony, balanced productivity, and grounded prosperity, suggesting a character that is reliable and peacemaking.',
  etymology_en = 'A classic topographic name. One of the most famous lineages is the Wada clan of Miura (Kanagawa), who were powerful vassals of the Minamoto during the Kamakura period.',
  kanji_breakdown = '[{"kanji":"和","reading":"wa","meaning_zh":"和平、和谐","meaning_en":"peace/harmony"},{"kanji":"田","reading":"da","meaning_zh":"田地","meaning_en":"field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Wada clan. The design should feature "Three Ivy Leaves" (Mitsu Tsuta) or "Crossed Hawk Feathers". Minimalist flat design, solid black on a white background, sharp geometric or botanical symmetry, high contrast.',
  famous_bearers = '[{"name":"和田 アキ子","name_jp":"和田 アキ子","context":"芸能人 | 歌手、タレント（「芸能界のご意見番」） | 1950年 4月 10日"},{"name":"和田 毅","name_jp":"和田 毅","context":"スポーツ選手 | プロ野球選手（パ・リーグ最年長投手） | 1981年 2月 21日"},{"name":"和田 誠","name_jp":"和田 誠","context":"クリエイター | イラストレーター、映画監督 | 1936年 4月 10日"},{"name":"和田 竜","name_jp":"和田 竜","context":"文学者 | 小説家（『のぼうの城』） | 1969年 12月 1日"}]'
WHERE id = 'fn_wada__1f1852';

-- 3. Imai (今井) [fn_imai__956c31]
UPDATE names SET 
  vibe = '["nature", "fresh", "essential", "pure"]',
  element = '["water"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["now", "present", "well", "spring"]',
  meaning_zh = '当今之井',
  meaning_en = 'New well / Current source',
  description_zh = '“今”指当下与新颖，“井”指生命之源的井泉。意指新开凿的清澈水井旁或居住在核心聚落水源地的家族。今井姓氏展现出一种清新、干练且具有极强适应力的意境，象征着家族品格如泉水般纯净、性格敏锐且总是能够汇聚各方的生机，给人以睿智、可靠且充满现代感的深刻印象。',
  description_en = 'Meaning "new well" or "the current source." It refers to families living near a newly established or prominent well. The name suggests a sense of vitality, essentiality, and renewal, evoking a character that is clear-sighted, proactive, and central to the community''s life.',
  etymology_en = 'A widespread topographic name. Often adopted by branches of the Seiwa Genji or Fujiwara clans who settled near important new water sources in various provinces.',
  kanji_breakdown = '[{"kanji":"今","reading":"ima","meaning_zh":"现在、当下","meaning_en":"now/current"},{"kanji":"井","reading":"i","meaning_zh":"水井","meaning_en":"well"}]',
  kamon_prompt = 'A circular Japanese kamon for the Imai clan. The design should feature "Well Crib" (Igeta) or "Oak Leaves". Minimalist flat design, solid black on a white background, sharp geometric lines, high contrast.',
  famous_bearers = '[{"name":"今井 翼","name_jp":"今井 翼","context":"芸能人 | 俳優、歌手（元タッキー＆翼） | 1981年 10月 17日"},{"name":"今井 美樹","name_jp":"今井 美樹","context":"音楽家 | 歌手、俳優 | 1963年 4月 14日"},{"name":"今井 雅之","name_jp":"今井 雅之","context":"芸能人 | 俳優、劇作家 | 1961年 4月 21日"},{"name":"今井 寿","name_jp":"今井 寿","context":"音楽家 | ミュージシャン（BUCK-TICK） | 1965年 10月 21日"}]'
WHERE id = 'fn_imai__956c31';

-- 4. Watanabe/Watabe (渡部) [fn_watabe__e80d4e]
UPDATE names SET 
  vibe = '["nature", "dynamic", "trustworthy", "historical"]',
  element = '["water"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["crossing", "ferry", "department", "section", "clan"]',
  meaning_zh = '渡口之部',
  meaning_en = 'Ferryman guild / Crossing area',
  description_zh = '“渡”指跨越水域的渡口，“部”指古代掌管特定事务的集团。意指在重要河川两岸负责渡运或管理水路交通的家族。渡部姓氏（渡辺的变体）展现出一种担当、通达且极其稳健的意境，象征着家族具有连接彼岸的使命感、性格干练且处事如行舟般平衡，给人以专业、热情且社会责任感极强的深刻印象。',
  description_en = 'Meaning "the ferryman''s guild" or "at the crossing." It refers to the ancient "Be" (guild) responsible for managing boat transport or living near a vital ferry point. The name suggests a character that is helpful, strategic, and capable of bridging gaps, evoking a sense of historical responsibility and movement.',
  etymology_en = 'A variation of the "Watanabe" surname. Originating from the "Be" system of ancient Japan, it is most prominent in regions like Fukushima and Ehime. Often linked to the legendary Watanabe no Tsuna and the Saga Genji.',
  kanji_breakdown = '[{"kanji":"渡","reading":"wata","meaning_zh":"渡口、跨越","meaning_en":"ferry/cross"},{"kanji":"部","reading":"be","meaning_zh":"部落、部门、群体","meaning_en":"section/guild"}]',
  kamon_prompt = 'A circular Japanese kamon for the Watabe clan. The design MUST feature "Three Stars and a horizontal bar" (Mitsu-boshi ni Ichimonji) or "Wisteria". Minimalist flat design, solid black on a white background, sharp geometric lines, high contrast.',
  famous_bearers = '[{"name":"渡部 篤郎","name_jp":"渡部 篤郎","context":"芸能人 | 俳優 | 1968年 5月 5日"},{"name":"渡部 建","name_jp":"渡部 建","context":"芸能人 | お笑いタレント（アンジャッシュ） | 1972年 9月 20日"},{"name":"渡部 絵美","name_jp":"渡部 絵美","context":"スポーツ選手 | 元フィギュアスケート選手 | 1959年 8月 27日"},{"name":"渡部 暁斗","name_jp":"渡部 暁斗","context":"スポーツ選手 | スキー選手（ノルディック複合） | 1988年 6月 15日"}]'
WHERE id = 'fn_watabe__e80d4e';

-- 5. Yamaguchi (山口) [fn_yamaguchi__f3346d]
UPDATE names SET 
  vibe = '["nature", "stable", "traditional", "expansive"]',
  element = '["mountain"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["mountain", "mouth", "entrance", "opening"]',
  meaning_zh = '山之入口',
  meaning_en = 'Entrance to the mountain',
  description_zh = '“山”指重峦叠嶂，“口”指通往内部的入口。意指居住在进入大山必经之路或山脉起点处的门户位置。山口姓氏展现出一种守御、开阔且极具地理枢纽感的意境，象征着家族具有开启机遇的魄力、性格豁达且根基如大山般沉稳，给人以踏实、大气且底蕴极其丰厚的深刻印象。',
  description_en = 'Meaning "mountain entrance" or "mouth of the valley." It refers to families living at the strategic entry point of a mountain path. The name suggests a role of guardianship and a beginning of paths, evoking a character that is grounded, welcoming, and possesses a broad perspective.',
  etymology_en = 'A very common topographic name found in many mountainous regions. A famous lineage includes the Yamaguchi clan of western Japan (Ouchi-shi descendants) or various samurai families from the province of the same name.',
  kanji_breakdown = '[{"kanji":"山","reading":"yama","meaning_zh":"山岳","meaning_en":"mountain"},{"kanji":"口","reading":"guchi","meaning_zh":"入口、出入口","meaning_en":"mouth/entrance"}]',
  kamon_prompt = 'A circular Japanese kamon for the Yamaguchi clan. The design should feature "Mountain Peaks" (Yama-mon) or "Wisteria". Minimalist flat design, solid black on a white background, sharp geometric symmetry, high contrast.',
  famous_bearers = '[{"name":"山口 百恵","name_jp":"山口 百恵","context":"芸能人 | 歌手、俳優（伝説的アイドル） | 1959年 1月 17日"},{"name":"山口 周","name_jp":"山口 周","context":"その他 | 独立研究者、著作家（『独学の技法』） | 1970年"},{"name":"山口 智子","name_jp":"山口 智子","context":"芸能人 | 俳優 | 1964年 10月 20日"},{"name":"山口 茜","name_jp":"山口 茜","context":"スポーツ選手 | バドミントン選手 | 1997年 6月 6日"}]'
WHERE id = 'fn_yamaguchi__f3346d';

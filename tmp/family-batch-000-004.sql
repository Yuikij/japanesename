-- Batch 1 (Surnames Ranked 1-5)
-- Targets: Satou (佐藤), Suzuki (铃木/鈴木), Takahashi (高桥/高橋), Tanaka (田中), Itou (伊藤)

-- 1. Satou (佐藤) [fn_satou__96d6c5]
UPDATE names SET 
  vibe = '["elegant", "noble", "serene", "prestigious"]',
  element = '["flower", "wind"]',
  use_case = '["classic", "common", "noble"]',
  kanji_meaning_tags = '["wisteria", "vine", "assistant", "official"]',
  meaning_zh = '佐系藤姓',
  meaning_en = 'Wisteria lineage of Sa',
  description_zh = '“佐”指古代官职或辅佐，“藤”指高贵的紫藤（源自藤原氏）。意指在佐渡国、佐野等领地定居，或担任“左卫门尉”官职的藤原氏后裔。佐藤作为日本第一大姓，展现出一种儒雅、庄重且极具门第感的意境，象征着家族具有极高的社会责任感、性格谦逊且在漫长的历史中保持着极其稳固的传承，给人以正统、从容且底蕴深厚的强烈印象。',
  description_en = 'Meaning "Wisteria of the Sa lineage." It originates from the Fujiwara clan, where the prefix "Sa" likely refers to an official title (Saemon-no-jo) or a location (Sado/Sano). As the most common surname in Japan, it evokes a sense of aristocratic heritage, steady reliability, and a refined, classical identity deeply rooted in Japanese historical prestige.',
  etymology_en = 'A major offshoot of the illustrious Fujiwara (Wisteria Plain) clan. The "Sa" element was added to distinguish this branch from others, often based on official titles or regional ties. It represents one of the largest and most successful lineage expansions in Japanese history.',
  kanji_breakdown = '[{"kanji":"佐","reading":"sa","meaning_zh":"辅佐、助手","meaning_en":"aide/official"},{"kanji":"藤","reading":"tou","meaning_zh":"紫藤","meaning_en":"wisteria"}]',
  kamon_prompt = 'A circular Japanese kamon for the Satou clan. The design MUST feature "Cascading Wisteria" (Sagarifuji). Elegant minimalist flat design, solid black on a white background, balanced symmetry with crisp negative space, classic mon linework.',
  famous_bearers = '[{"name":"佐藤 栄作","name_jp":"佐藤 栄作","context":"政治家 | 第61-63代内閣総理大臣、ノーベル平和賞受賞 | 1901年 3月 27日"},{"name":"佐藤 健","name_jp":"佐藤 健","context":"芸能人 | 俳優（『るろうに剣心』主演） | 1989年 3月 21日"},{"name":"佐藤 浩市","name_jp":"佐藤 浩市","context":"芸能人 | 俳優 | 1960年 12月 10日"},{"name":"佐藤 春夫","name_jp":"佐藤 春夫","context":"文学者 | 詩人、小説家（『田園の憂鬱』） | 1892年 4月 9日"}]'
WHERE id = 'fn_satou__96d6c5';

-- 2. Suzuki (鈴木) [fn_suzuki__337b2d]
UPDATE names SET 
  vibe = '["serene", "noble", "sacred", "stable"]',
  element = '["wood", "sound"]',
  use_case = '["classic", "common", "spiritual"]',
  kanji_meaning_tags = '["bell", "chime", "piled-wood", "rice-straw"]',
  meaning_zh = '神铃之木',
  meaning_en = 'Bell tree',
  description_zh = '“铃”指神乐铃或响铃，“木”指树木。意指悬挂神铃以招魂的圣木，或源自古代丰收祭祀中的“叠木”意象。铃木姓氏展现出一种清澈、稳健且极其灵动的意境（源自纪伊国熊野神官等古老族脉），象征着家族具有沟通神灵般的智慧、性格坚韧且生命力如常青木般旺盛，给人以亲切、斯文且底蕴扎实的深刻印象。',
  description_en = 'Meaning "bell tree." While it literally reads as such, the name likely originates from ancient Shinto rituals involving sacred piles of straw or wood (Susuki) for harvest celebrations. Historically associated with the Kumano shrine lineages, the name evokes a sense of sacred resonance, natural vitality, and deep communal reliability.',
  etymology_en = 'Originating from the Kii Peninsula, the Suzuki clan was closely tied to the Kumano shrines. The name spread as these groups migrated across Japan to manage lands. The "Bell" kanji represents spiritual purity and resonance.',
  kanji_breakdown = '[{"kanji":"鈴","reading":"suzu","meaning_zh":"响铃、神铃","meaning_en":"bell"},{"kanji":"木","reading":"ki","meaning_zh":"树木","meaning_en":"tree"}]',
  kamon_prompt = 'A circular Japanese kamon for the Suzuki clan. The design should feature "Rice Sheaves" (Ineyui) or stylized "Crossed Arrows". Minimalist flat design, solid black on a white background, sharp geometric precision, high contrast.',
  famous_bearers = '[{"name":"鈴木 一朗","name_jp":"イチロー","context":"スポーツ選手 | プロ野球選手（日米通算4367安打） | 1973年 10月 22日"},{"name":"鈴木 俊一","name_jp":"鈴木 俊一","context":"政治家 | 財務大臣、元東京都知事 | 1953年 4月 13日"},{"name":"鈴木 亮平","name_jp":"鈴木 亮平","context":"芸能人 | 俳優 | 1983年 3月 29日"},{"name":"鈴木 大拙","name_jp":"鈴木 大拙","context":"文化人 | 仏教学者（禅を世界に広めた第一人者） | 1870年 10月 18日"}]'
WHERE id = 'fn_suzuki__337b2d';

-- 3. Takahashi (高橋) [fn_takahashi__583093]
UPDATE names SET 
  vibe = '["strong", "serene", "reliable", "connected"]',
  element = '["wood", "earth"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["high", "tall", "bridge", "pillar"]',
  meaning_zh = '高阜之桥',
  meaning_en = 'High bridge',
  description_zh = '“高”指地势高亢，“桥”指连接两岸的桥梁。意指居住在地势较高处的桥梁附近或以显眼高桥为地标的聚落。高桥姓氏展现出一种恢弘、稳实且极其利落的意境，象征着家族具有沟通万物的视野、性格正直且在社群中扮演连接者的关键角色，给人以尊贵、可靠且气势不凡的深刻印象。',
  description_en = 'Meaning "high bridge." It refers to an elevated crossing or a settlement established near a prominent bridge that served as a landmark. The name conveys a sense of strength, vision, and connection, suggesting a family that stands tall and bridges differences with stability.',
  etymology_en = 'A classic topographic name. Bridges were significant engineering feats and social centers in ancient Japan. Many independent families living near such bridges adopted the name, though some lineages claim descent from the ancient Mononobe or Abe clans.',
  kanji_breakdown = '[{"kanji":"高","reading":"taka","meaning_zh":"高大、崇高","meaning_en":"high/tall"},{"kanji":"橋","reading":"hashi","meaning_zh":"桥梁","meaning_en":"bridge"}]',
  kamon_prompt = 'A circular Japanese kamon for the Takahashi clan. The design should feature a "Bridge Railing" (Kumano-mon) or "Parasol" (Kasa). Minimalist flat design, solid black on a white background, symmetrical rhythmic lines, high contrast.',
  famous_bearers = '[{"name":"高橋 留美子","name_jp":"高橋 留美子","context":"文化人 | 漫画家（『犬夜叉』『うる星やつら』） | 1957年 10月 10日"},{"name":"高橋 是清","name_jp":"高橋 是清","context":"政治家 | 第20代内閣総理大臣（「ダルマ蔵相」） | 1854年 9月 19日"},{"name":"高橋 一生","name_jp":"高橋 一生","context":"芸能人 | 俳優 | 1980年 12月 9日"},{"name":"高桥 尚子","name_jp":"高橋 尚子","context":"スポーツ選手 | 女子マラソン金メダリスト | 1972年 5月 22日"}]'
WHERE id = 'fn_takahashi__583093';

-- 4. Tanaka (田中) [fn_tanaka__3c2648]
UPDATE names SET 
  vibe = '["nature", "warm", "grounded", "stable"]',
  element = '["earth", "water"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["middle", "inside", "rice-field", "paddy"]',
  meaning_zh = '田中之庄',
  meaning_en = 'Middle of the field',
  description_zh = '“田”指生命之源的农田，“中”指中央或身处其中。意指居住在广阔沃野中心或农耕聚落核心地带的人。田中姓氏展现出一种质朴、博大且极具生命亲和力的意境，象征着家族具有从容不迫的韧性、性格稳重且拥有极其雄厚的生存根基，给人以温润、扎实且富有生活智慧的深刻印象。',
  description_en = 'Meaning "middle of the rice field." This quintessential Japanese surname identifies a household located at the heart of cultivated lands. It evokes a sense of natural abundance, earthy stability, and a deeply grounded social presence, representing the backbone of traditional agricultural society.',
  etymology_en = 'One of the most straightforward and widely adopted topographic names in Japan. It simply states the location of a family''s home relative to the essential resource of rice paddies (Ta). It ranks as a top surname across almost all regions.',
  kanji_breakdown = '[{"kanji":"田","reading":"ta","meaning_zh":"农田","meaning_en":"rice field"},{"kanji":"中","reading":"naka","meaning_zh":"中间、内部","meaning_en":"middle"}]',
  kamon_prompt = 'A circular Japanese kamon for the Tanaka clan. The design should feature "Crossed Mokko" (Melon flowers) or stylized "Field Grid". Minimalist flat design, solid black on a white background, orderly geometric patterns, high contrast.',
  famous_bearers = '[{"name":"田中 角栄","name_jp":"田中 角栄","context":"政治家 | 第64・65代内閣総理大臣 | 1918年 5月 4日"},{"name":"田中 将大","name_jp":"田中 将大","context":"スポーツ選手 | プロ野球選手（楽天イーグルス、元ヤンキース） | 1988年 11月 1日"},{"name":"田中 絹代","name_jp":"田中 絹代","context":"芸能人 | 俳優、映画監督 | 1909年 12月 29日"},{"name":"田中 耕一","name_jp":"田中 耕一","context":"研究者 | ノーベル化学賞受賞者 | 1959年 8月 3日"}]'
WHERE id = 'fn_tanaka__3c2648';

-- 5. Itou (伊藤) [fn_itou__e56dae]
UPDATE names SET 
  vibe = '["elegant", "noble", "serene", "prestigious"]',
  element = '["flower", "wind"]',
  use_case = '["classic", "common", "noble"]',
  kanji_meaning_tags = '["wisteria", "vine", "that", "there"]',
  meaning_zh = '伊系藤姓',
  meaning_en = 'Wisteria lineage of I',
  description_zh = '“伊”指伊势国（今三重县），“藤”指高贵的紫藤（源自藤原氏）。意指在伊势国掌权或定居的藤原氏分支。伊藤姓氏展现出一种古典、正统且极具时代先驱感的意境（因首任首相伊藤博文等人物而富有极高的政治光环），象征着家族具有追求卓越的胆识、性格优雅且能开启新的时代，给人以斯文、宏大且底蕴极其雄厚的深刻印象。',
  description_en = 'Meaning "Wisteria of the Ise lineage." It signifies the branch of the illustrious Fujiwara clan that settled in Ise Province. The name blends ancient aristocratic roots with a strong sense of leadership and historical initiative, suggesting a family that is both traditional and forward-looking.',
  etymology_en = 'Another major branch of the Fujiwara clan. The "I" prefix refers specifically to Ise Province, where these Fujiwara descendants held land or office. It was a strategy for powerful clans to distinguish their territorial domains while retaining the prestige of the wisteria name.',
  kanji_breakdown = '[{"kanji":"伊","reading":"i","meaning_zh":"地名（伊势）、那","meaning_en":"prefix (Ise)"},{"kanji":"藤","reading":"tou","meaning_zh":"紫藤","meaning_en":"wisteria"}]',
  kamon_prompt = 'A circular Japanese kamon for the Itou clan. The design MUST feature "Cascaded Wisteria" or "Upped Wisteria" (Nobirifuji). Elegant minimalist flat design, solid black on a white background, formal symmetry, high contrast.',
  famous_bearers = '[{"name":"伊藤 博文","name_jp":"伊藤 博文","context":"政治家 | 初代、第5・7・10代内閣総理大臣 | 1841年 10月 16日"},{"name":"伊藤 若冲","name_jp":"伊藤 若冲","context":"文化人 | 江戸時代の天才画家 | 1716年 3月 1日"},{"name":"伊藤 美来","name_jp":"伊藤 美来","context":"芸能人 | 声優、歌手 | 1996年 10月 12日"},{"name":"伊藤 潤二","name_jp":"伊藤 潤二","context":"文化人 | ホラー漫画家 | 1963年 7月 31日"}]'
WHERE id = 'fn_itou__e56dae';

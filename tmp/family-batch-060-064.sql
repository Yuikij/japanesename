-- Batch 13 (Surnames Ranked 60-64)
-- Targets: Matsumoto (松本), Fujiwara (藤原), Miura (三浦), Sano (佐野), Narita (成田)

-- 1. Matsumoto (松本) [fn_matsumoto__f7e53f]
UPDATE names SET 
  vibe = '["nature", "strong", "historical", "stable"]',
  element = '["wood"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["pine", "origin", "base", "root"]',
  meaning_zh = '松之本源',
  meaning_en = 'At the foot of the pine tree / Origin of the pine',
  description_zh = '“松”指长寿常青的松树，“本”指根基、源头。意指居住在神圣或显眼的古松脚下的家族。松本姓氏展现出一种坚韧、悠久且极具威望的意境，象征着家族品格如青松般不畏严寒、性格稳重且根基极其扎实，给人以正直、可靠且富有历史底蕴的深刻印象。',
  description_en = 'Meaning "at the foot of the pine tree" or "origin of the pine." It refers to families living near a prominent or sacred pine tree. The name conveys a sense of enduring strength, historical significance, and grounded stability, suggesting a character that is patient, steadfast, and deeply rooted in tradition.',
  etymology_en = 'A very common topographic name found throughout Japan. Often associated with major clans like the Seiwa Genji or Fujiwara. The city of Matsumoto in Nagano is a famous geographical namesake.',
  kanji_breakdown = '[{"kanji":"松","reading":"matsu","meaning_zh":"松树","meaning_en":"pine tree"},{"kanji":"本","reading":"moto","meaning_zh":"根本、源头","meaning_en":"base/origin"}]',
  kamon_prompt = 'A circular Japanese kamon for the Matsumoto clan. The design should feature "Three Pine Needles" (Mitsu-ba Matsu) or "Interlocking Circles". Minimalist flat design, solid black on a white background, sharp geometric or botanical symmetry, high contrast.',
  famous_bearers = '[{"name":"松本 潤","name_jp":"松本 潤","context":"芸能人 | 俳優、歌手（嵐） | 1983年 8月 30日"},{"name":"松本 人志","name_jp":"松本 人志","context":"芸能人 | お笑いタレント（ダウンタウン） | 1963年 9月 8日"},{"name":"松本 清張","name_jp":"松本 清張","context":"文学者 | 小説家（社会派推理小説の巨匠） | 1909年 12月 21日"},{"name":"松本 零士","name_jp":"松本 零士","context":"クリエイター | 漫画家（『銀河鉄道999』） | 1938年 1月 25日"}]'
WHERE id = 'fn_matsumoto__f7e53f';

-- 2. Fujiwara (藤原) [fn_fujiwara__386de6]
UPDATE names SET 
  vibe = '["noble", "historical", "elegant", "sophisticated"]',
  element = '["wood", "earth"]',
  use_case = '["classic", "common", "clan-based"]',
  kanji_meaning_tags = '["wisteria", "field", "plain"]',
  meaning_zh = '紫藤之原',
  meaning_en = 'Wisteria plain',
  description_zh = '“藤”指高贵的紫藤花，“原”指广阔的平原。意指紫藤盛开的丰饶土地或源自古代最显赫的藤原氏家族。藤原姓氏展现出一种华丽、深邃且极具贵族气质的意境，象征着家族具有无上的荣誉感、性格温文尔雅且在文化与政治领域拥有深远影响，给人以极高教养、睿智且底蕴极其显赫的深刻印象。',
  description_en = 'Meaning "wisteria plain." It is arguably the most famous and influential clan name in Japanese history. The name evokes a sense of supreme nobility, cultural sophistication, and historical power, identifying a lineage that dominated the imperial court for centuries and gave rise to countless branch families.',
  etymology_en = 'The Fujiwara clan was the most powerful family in ancient Japan. Founded by Nakatomi no Kamatari in the 7th century, their name became synonymous with the Japanese aristocracy and the refined culture of the Heian period.',
  kanji_breakdown = '[{"kanji":"藤","reading":"fuji","meaning_zh":"紫藤","meaning_en":"wisteria"},{"kanji":"原","reading":"wara","meaning_zh":"原野、草原","meaning_en":"plain/field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Fujiwara clan. The design MUST feature "Downward Wisteria" (Sagarifuji). Minimalist flat design, solid black on a white background, intricate floral clusters, high contrast.',
  famous_bearers = '[{"name":"藤原 道長","name_jp":"藤原 道長","context":"歴史 | 平安時代の公卿（藤原氏の全盛期を築く） | 966年"},{"name":"藤原 紀香","name_jp":"藤原 紀香","context":"芸能人 | 俳優、タレント | 1971年 6月 28日"},{"name":"藤原 定家","name_jp":"藤原 定家","context":"文学者 | 歌人、公卿（『新古今和歌集』撰者） | 1162年"},{"name":"藤原 聡","name_jp":"藤原 聡","context":"音楽家 | ミュージシャン（Official髭男dism） | 1991年 8月 19日"}]'
WHERE id = 'fn_fujiwara__386de6';

-- 3. Miura (三浦) [fn_miura__390461]
UPDATE names SET 
  vibe = '["nature", "pure", "expansive", "coastal"]',
  element = '["water"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["three", "bay", "inlet", "sea"]',
  meaning_zh = '三处海湾',
  meaning_en = 'Three inlets / Three bays',
  description_zh = '“三”指数量的多样，“浦”指宁静的海湾或江口。意指居住在三处优美河口交汇处或源自著名的三浦半岛。三浦姓氏展现出一种开阔、清爽且带有海洋气息的意境，象征着家族具有包容四海的胸怀、性格爽朗且生命力如潮汐般奔流不息，给人以文质彬彬、富有进取心且底蕴极其深厚的深刻印象。',
  description_en = 'Meaning "three inlets" or "three bays." It identifies families living near a coastline with multiple inlets, famously associated with the Miura Peninsula. The name evokes a sense of refreshing natural beauty, maritime adventure, and historical prominence, suggesting a character that is adaptable, expansive, and reliable.',
  etymology_en = 'A classic topographic name. One of the most famous lineages is the Miura clan of Sagami (Kanagawa), who were powerful samurai and close allies of the Minamoto clan during the Kamakura Shogunate.',
  kanji_breakdown = '[{"kanji":"三","reading":"mi","meaning_zh":"三、多样","meaning_en":"three"},{"kanji":"浦","reading":"ura","meaning_zh":"海湾、江口","meaning_en":"inlet/bay"}]',
  kamon_prompt = 'A circular Japanese kamon for the Miura clan. The design should feature "Three Leaves" or stylized "Waves". Minimalist flat design, solid black on a white background, symmetrical rhythmic lines, high contrast.',
  famous_bearers = '[{"name":"三浦 知良","name_jp":"三浦 知良","context":"スポーツ選手 | プロサッカー選手（「キング・カズ」） | 1967年 2月 26日"},{"name":"三浦 春馬","name_jp":"三浦 春馬","context":"芸能人 | 俳優 | 1990年 4月 5日"},{"name":"三浦 雄一郎","name_jp":"三浦 雄一郎","context":"その他 | 登山家（プロスキーヤー） | 1932年 10月 12日"},{"name":"三浦 友和","name_jp":"三浦 友和","context":"芸能人 | 俳優 | 1952年 1月 28日"}]'
WHERE id = 'fn_miura__390461';

-- 4. Sano (佐野) [fn_sano__483ced]
UPDATE names SET 
  vibe = '["nature", "stable", "versatile", "honest"]',
  element = '["earth", "field"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["assist", "help", "field", "plain"]',
  meaning_zh = '辅助之野',
  meaning_en = 'Helpful field / Field of support',
  description_zh = '“佐”指辅助与协力，“野”指广阔的原野。意指位于主要平原旁侧、作为支撑的肥沃土地或协助开发的聚落。佐野姓氏展现出一种诚实、稳健且极具亲和力的意境，象征着家族具有守望相助的美德、性格开朗且在事业中扮演着不可或缺的角色，给人以友善、踏实且底蕴扎实的深刻印象。',
  description_en = 'Meaning "helpful field" or "field of support." It refers to families living on or managing peripheral but fertile lands that supported a larger settlement. The name suggests a character that is reliable, community-oriented, and balanced, evoking a sense of grounded prosperity and practical wisdom.',
  etymology_en = 'A widespread topographic name. Often associated with the Sasaki clan or branches of the Fujiwara and Minamoto clans. Sano city in Tochigi is a major historical geographical anchor.',
  kanji_breakdown = '[{"kanji":"佐","reading":"sa","meaning_zh":"助手、辅助","meaning_en":"assist"},{"kanji":"野","reading":"no","meaning_zh":"原野、田野","meaning_en":"field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Sano clan. The design should feature "Crossed Hawk Feathers" (Taka-no-ha) or "Three Ivy Leaves". Minimalist flat design, solid black on a white background, sharp geometric or botanical symmetry, high contrast.',
  famous_bearers = '[{"name":"佐野 元春","name_jp":"佐野 元春","context":"音楽家 | シンガーソングライター | 1956年 2月 11日"},{"name":"佐野 勇斗","name_jp":"佐野 勇斗","context":"芸能人 | 俳優、歌手（M!LK） | 1998年 3月 23日"},{"name":"佐野 研二郎","name_jp":"佐野 研二郎","context":"クリエイター | グラフィックデザイナー | 1972年 7月 29日"},{"name":"佐野 岳","name_jp":"佐野 岳","context":"芸能人 | 俳優 | 1992年 4月 3日"}]'
WHERE id = 'fn_sano__483ced';

-- 5. Narita (成田) [fn_narita__6e19be]
UPDATE names SET 
  vibe = '["nature", "stable", "prosperous", "purposeful"]',
  element = '["earth", "field"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["become", "grow", "attain", "field", "rice-paddy"]',
  meaning_zh = '成就之田',
  meaning_en = 'Accomplished field / Prosperous paddy',
  description_zh = '“成”指成就、成长与达成，“田”指赖以生存的沃土。意指通过辛勤耕耘最终获得丰收的田园或源自著名的成田地区。成田姓氏展现出一种进取、稳实且充满收获感的意境，象征着家族具有通过汗水开创未来的决心、性格坚毅且事业卓有成效，给人以干练、专业且极具实力的深刻印象。',
  description_en = 'Meaning "accomplished field" or "fertile land that has been successfully developed." It refers to rice paddies that yield a rich harvest, suggesting growth and achievement. The name evokes a sense of prosperity, steady progress, and historical reliability, famously associated with the spiritual and geographical significance of Narita.',
  etymology_en = 'A classic topographic and place-based name. Most notably associated with the Narita clan, a branch of the Fujiwara clan that settled in Shimosa (Chiba) and gave their name to the area surrounding the famous Naritasan Shinshoji Temple.',
  kanji_breakdown = '[{"kanji":"成","reading":"nari","meaning_zh":"成就、达成","meaning_en":"become/attain"},{"kanji":"田","reading":"ta","meaning_zh":"田地","meaning_en":"field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Narita clan. The design should feature "Crossed Hawk Feathers" or stylized "Field" patterns. Minimalist flat design, solid black on a white background, sharp geometric precision, high contrast.',
  famous_bearers = '[{"name":"成田 凌","name_jp":"成田 凌","context":"芸能人 | 俳優、モデル | 1993年 11月 22日"},{"name":"成田 昭次","name_jp":"成田 昭次","context":"音楽家 | ミュージシャン（元男闘呼組） | 1968年 8月 1日"},{"name":"成田 三樹夫","name_jp":"成田 三樹夫","context":"芸能人 | 俳優（凄みのある敵役の怪演） | 1935年 1月 31日"},{"name":"成田 亨","name_jp":"成田 亨","context":"芸術家 | 彫刻家、特撮美術監督（『ウルトラマン』デザイナー） | 1929年 9月 3日"}]'
WHERE id = 'fn_narita__6e19be';

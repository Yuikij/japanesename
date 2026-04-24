-- Batch 9 (Surnames Ranked 40-44)
-- Targets: Hayashi (林), Ota (太田), Nishimura (西村), Fujii (藤井), Okamoto (岡本)

-- 1. Hayashi (林) [fn_hayashi__e192ce]
UPDATE names SET 
  vibe = '["nature", "pure", "solid", "expansive"]',
  element = '["wood"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["forest", "woods", "grove"]',
  meaning_zh = '郁郁之林',
  meaning_en = 'Forest / Grove',
  description_zh = '“林”指树木丛生之地。意指居住在宁静丛林边或负责管理山林资源的家族。林姓展现出一种清新、正直且富有原始生命力的意境，象征着家族品格如林木般挺拔、性格内敛且具有极强的庇荫力与凝聚力，给人以博学、稳重且极其考究的深刻印象。',
  description_en = 'Meaning "forest" or "grove." It refers to people who lived near or managed wooded areas. As one of the most common single-kanji surnames in East Asia, in Japan it evokes a sense of natural integrity, shelter, and steady growth, suggesting a character that is both grounded and expansive.',
  etymology_en = 'A very ancient topographic name. While many adopted it based on their surroundings, several prominent lineages claim descent from the Mononobe clan or the Ogasawara clan.',
  kanji_breakdown = '[{"kanji":"林","reading":"hayashi","meaning_zh":"森林、丛林","meaning_en":"forest/grove"}]',
  kamon_prompt = 'A circular Japanese kamon for the Hayashi clan. The design should feature "Two Interlocking Oak Leaves" or stylized "Wood" patterns. Minimalist flat design, solid black on a white background, organic symmetry, high contrast.',
  famous_bearers = '[{"name":"林 真理子","name_jp":"林 真理子","context":"文学者 | 小説家、随筆家 | 1954年 4月 1日"},{"name":"林 遣都","name_jp":"林 遣都","context":"芸能人 | 俳優 | 1990年 12月 6日"},{"name":"林 芳正","name_jp":"林 芳正","context":"政治家 | 内閣官房長官、元外相 | 1961年 1月 19日"},{"name":"林 隆三","name_jp":"林 隆三","context":"芸能人 | 俳優 | 1943年 9月 29日"}]'
WHERE id = 'fn_hayashi__e192ce';

-- 2. Ota (太田) [fn_oota__d0240d]
UPDATE names SET 
  vibe = '["nature", "prosperous", "strong", "stable"]',
  element = '["earth", "field"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["large", "thick", "great", "field", "rice-paddy"]',
  meaning_zh = '广阔之田',
  meaning_en = 'Great field / Large rice paddy',
  description_zh = '“太”指宏大与丰厚，“田”指赖以生存的沃土。意指拥有大片肥沃土地或居住在广阔田园中心的家族。太田姓氏展现出一种豪迈、稳健且极其富足的意境，象征着家族具有博大的胸怀、性格慷慨且能稳步拓展家业，给人以可靠、自信且极具实力的深刻印象。',
  description_en = 'Meaning "great field" or "large rice paddy." It identifies families who owned or lived near expansive agricultural lands. The name carries an air of prosperity, strength, and grounded success, suggesting a lineage that is both productive and influential.',
  etymology_en = 'A topographic name with multiple origins. Most notably associated with the Seiwa Genji clan. Dokan Ota, the famous 15th-century samurai who built Edo Castle, is its most celebrated historical bearer.',
  kanji_breakdown = '[{"kanji":"太","reading":"o","meaning_zh":"宏大、丰厚","meaning_en":"great/large"},{"kanji":"田","reading":"ta","meaning_zh":"田地","meaning_en":"field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Ota clan. The design MUST feature "Kikyo" (Bellflower) or "Two Ivy Leaves". Minimalist flat design, solid black on a white background, sharp floral symmetry, high contrast.',
  famous_bearers = '[{"name":"太田 道灌","name_jp":"太田 道灌","context":"歴史 | 武将（江戸城の築城者） | 1432年"},{"name":"太田 光","name_jp":"太田 光","context":"芸能人 | お笑いタレント（爆笑問題） | 1965年 5月 13日"},{"name":"太田 雄貴","name_jp":"太田 雄貴","context":"スポーツ選手 | フェンシング選手（五輪メダリスト） | 1985年 11月 25日"},{"name":"太田 莉菜","name_jp":"太田 莉菜","context":"芸能人 | モデル、俳優 | 1988年 1月 11日"}]'
WHERE id = 'fn_oota__d0240d';

-- 3. Nishimura (西村) [fn_nishimura__94c34a]
UPDATE names SET 
  vibe = '["nature", "stable", "traditional", "harmonious"]',
  element = '["earth"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["west", "village", "town"]',
  meaning_zh = '西侧之村',
  meaning_en = 'West village',
  description_zh = '“西”指方位，“村”指相亲相爱的聚落。意指居住在大型聚落西侧或来自西边村庄的家族。西村姓氏展现出一种从容、平和且极具归属感的意境，象征着家族具有守望相助的美德、性格开朗且生活态度极度平衡，给人以友善、谦逊且底蕴扎实的深刻印象。',
  description_en = 'Meaning "west village." It typically refers to a family living in the western part of a particular settlement. The name evokes a sense of orientation, community, and balanced living, suggesting a character that is reliable, neighborly, and deeply rooted in local history.',
  etymology_en = 'A classic directional topographic name. Found all over Japan, it was often adopted by branches of larger clans (like the Fujiwara or Taira) to distinguish their location within a village.',
  kanji_breakdown = '[{"kanji":"西","reading":"nishi","meaning_zh":"西方","meaning_en":"west"},{"kanji":"村","reading":"mura","meaning_zh":"村落","meaning_en":"village"}]',
  kamon_prompt = 'A circular Japanese kamon for the Nishimura clan. The design should feature "Three Ivy Leaves" (Mitsu Tsuta) or "Crossed Hawk Feathers". Minimalist flat design, solid black on a white background, balanced botanical lines, high contrast.',
  famous_bearers = '[{"name":"西村 潔","name_jp":"西村 潔","context":"クリエイター | 映画監督 | 1932年 7月 14日"},{"name":"西村 雅彦","name_jp":"西村 まさ彦","context":"芸能人 | 俳優 | 1960年 12月 12日"},{"name":"西村 康稔","name_jp":"西村 康稔","context":"政治家 | 衆議院議員、元経産相 | 1962年 10月 15日"},{"name":"西村 拓哉","name_jp":"西村 拓哉","context":"芸能人 | アイドル（Lil かんさい） | 2003年 4月 19日"}]'
WHERE id = 'fn_nishimura__94c34a';

-- 4. Fujii (藤井) [fn_fujii__e8574c]
UPDATE names SET 
  vibe = '["nature", "noble", "pure", "sophisticated"]',
  element = '["wood", "water"]',
  use_case = '["classic", "common", "clan-based"]',
  kanji_meaning_tags = '["wisteria", "well", "spring"]',
  meaning_zh = '藤下之井',
  meaning_en = 'Wisteria well',
  description_zh = '“藤”指高贵的紫藤，“井”指清激的泉源。意指紫藤掩映下的古井旁或与藤原氏相关的优质水源地。藤井姓氏展现出一种清冽、优雅且极具知性美的意境，象征着家族具有洗练的品行、性格柔和且才华如泉水般连绵不断，给人以气质高雅、聪慧且充满艺术气息的深刻印象。',
  description_en = 'Meaning "wisteria well." It denotes a well surrounded by wisteria blossoms, often linked to the Fujiwara clan. The name blends the noble elegance of wisteria with the vital purity of a well, suggesting a lineage that is both sophisticated and essential to the community''s life-source.',
  etymology_en = 'A major "Fuji" surname. Most branches claim descent from the Fujiwara clan. The name was often taken by those who lived near a famous well or served as officials in regions associated with wisteria.',
  kanji_breakdown = '[{"kanji":"藤","reading":"fuji","meaning_zh":"紫藤","meaning_en":"wisteria"},{"kanji":"井","reading":"i","meaning_zh":"水井、井口","meaning_en":"well"}]',
  kamon_prompt = 'A circular Japanese kamon for the Fujii clan. The design MUST feature "Wisteria" (Fujimon) or "Well Crib" (Igeta). Minimalist flat design, solid black on a white background, intricate drooping clusters or sharp geometric lines, high contrast.',
  famous_bearers = '[{"name":"藤井 聡太","name_jp":"藤井 聡太","context":"その他 | 将棋棋士（史上初の八冠達成） | 2002年 7月 19日"},{"name":"藤井 風","name_jp":"藤井 風","context":"音楽家 | シンガーソングライター | 1997年 6月 14日"},{"name":"藤井 フミヤ","name_jp":"藤井 フミヤ","context":"音楽家 | 歌手（チェッカーズ） | 1962年 7月 11日"},{"name":"藤井 隆","name_jp":"藤井 隆","context":"芸能人 | お笑いタレント、歌手 | 1972年 3月 10日"}]'
WHERE id = 'fn_fujii__e8574c';

-- 5. Okamoto (岡本) [fn_okamoto__5862fe]
UPDATE names SET 
  vibe = '["nature", "strong", "stable", "traditional"]',
  element = '["earth"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["hill", "mound", "origin", "base", "root"]',
  meaning_zh = '岗道之本',
  meaning_en = 'Base of the hill / Origin of the mound',
  description_zh = '“冈”指起伏的丘陵，“本”指根基与起源。意指居住在平缓高冈脚下或山丘起源处的家族。冈本姓氏展现出一种敦厚、坚实且极具生命韧性的意境，象征着家族具有踏实肯干的精神、性格稳重且根基极其深厚，给人以正直、可靠且充满生活智慧的深刻印象。',
  description_en = 'Meaning "at the foot of the hill" or "origin of the mound." It refers to families living at the base of a significant hillside. The name conveys a sense of grounded strength, reliability, and traditional stability, reflecting a life in harmony with the upland landscape.',
  etymology_en = 'A common topographic name found throughout Japan. Several lineages claim descent from the Seiwa Genji or the Minamoto clan. Most famously associated in pop culture with various historical samurai and modern artists.',
  kanji_breakdown = '[{"kanji":"岡","reading":"oka","meaning_zh":"山冈、丘陵","meaning_en":"hill/mound"},{"kanji":"本","reading":"moto","meaning_zh":"根本、原本","meaning_en":"base/origin"}]',
  kamon_prompt = 'A circular Japanese kamon for the Okamoto clan. The design should feature "Crossed Hawk Feathers" (Taka-no-ha) or "Three Oak Leaves". Minimalist flat design, solid black on a white background, sharp geometric symmetry, high contrast.',
  famous_bearers = '[{"name":"岡本 太郎","name_jp":"岡本 太郎","context":"芸術家 | 芸術家（「芸術は爆発だ！」） | 1911年 2月 26日"},{"name":"岡本 喜八","name_jp":"岡本 喜八","context":"クリエイター | 映画監督 | 1924年 2月 17日"},{"name":"岡本 圭人","name_jp":"岡本 圭人","context":"芸能人 | 俳優、歌手（元Hey! Say! JUMP） | 1993年 4月 1日"},{"name":"岡本 綾子","name_jp":"岡本 綾子","context":"スポーツ選手 | プロゴルファー | 1951年 4月 2日"}]'
WHERE id = 'fn_okamoto__5862fe';

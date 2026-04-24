-- Batch 6 (Surnames Ranked 25-29)
-- Targets: Ishikawa (石川), Yamashita (山下), Nakajima (中岛/中島), Ishii (石井), Ogawa (小川)
-- Note: Re-ranking check shows these follow Abe (24). 
-- Maeda (前田) and Fujita (藤田) are next in line. Batch 025-029 might have been mislabeled or partial previously.
-- I will overhaul for: Ishikawa, Yamashita, Nakajima, Ishii, Ogawa.

-- 1. Ishikawa (石川) [fn_ishikawa__3ccc85]
UPDATE names SET 
  vibe = '["nature", "strong", "pure", "persistent"]',
  element = '["water", "stone"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["stone", "rock", "river", "stream"]',
  meaning_zh = '石岸之川',
  meaning_en = 'Stony river',
  description_zh = '“石”指坚硬的岩石，“川”指流动的河流。意指多石的河床、清澈见底的溪流，或居住在石堤环绕的河岸边的人。石川姓氏展现出一种坚韧、洗练且极具生命韵律的意境，象征着家族具有经得起时间冲刷的品质、性格如流水般圆融而意志如磐石般坚定，给人以斯文、儒雅且底蕴极其扎实的深刻印象。',
  description_en = 'Meaning "stony river." It refers to a river with a rocky bed or a family living by a riverbank reinforced with stones. The name evokes a sense of enduring strength combined with the continuous flow of life, suggesting a character that is both steadfast and adaptable.',
  etymology_en = 'A classic topographic name found throughout Japan. Often associated with the Seiwa Genji clan or various local warrior families who settled near prominent rocky river segments.',
  kanji_breakdown = '[{"kanji":"石","reading":"ishi","meaning_zh":"石头、岩石","meaning_en":"stone"},{"kanji":"川","reading":"kawa","meaning_zh":"河流","meaning_en":"river"}]',
  kamon_prompt = 'A circular Japanese kamon for the Ishikawa clan. The design should feature "Oak Leaves" (Kashiwa) or "Three Hexagons" (Mitsu Kikkou). Minimalist flat design, solid black on a white background, balanced botanical or geometric patterns, high contrast.',
  famous_bearers = '[{"name":"石川 啄木","name_jp":"石川 啄木","context":"文学者 | 歌人、詩人（『一握の砂』） | 1886年 2月 20日"},{"name":"石川 佳純","name_jp":"石川 佳純","context":"スポーツ選手 | 卓球選手（五輪メダリスト） | 1993年 2月 23日"},{"name":"石川 五右衛門","name_jp":"石川 五右衛門","context":"歴史 | 安土桃山時代の義賊 | 1558年"},{"name":"石川 遼","name_jp":"石川 遼","context":"スポーツ選手 | プロゴルファー | 1991年 9月 17日"}]'
WHERE id = 'fn_ishikawa__3ccc85';

-- 2. Yamashita (山下) [fn_yamashita__e4d02e]
UPDATE names SET 
  vibe = '["nature", "serene", "stable", "humble"]',
  element = '["mountain", "earth"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["mountain", "below", "under", "foot"]',
  meaning_zh = '山脚之下',
  meaning_en = 'Below the mountain',
  description_zh = '“山”指崇高的山峦，“下”指下方或山麓。意指居住在大山脚下的宁静村落或山岭下方的肥沃土地上。山下姓氏展现出一种温厚、质朴且极具安全感的意境，象征着家族受大山庇护、性格谦逊且生命力极其顽强，给人以踏实、可靠且底蕴深厚的深刻印象。',
  description_en = 'Meaning "below the mountain" or "at the foot of the mountain." It identifies families who lived in the sheltered areas beneath peaks. The name conveys a sense of humility, protection, and grounded stability, reflecting the relationship between the people and Japan’s mountainous terrain.',
  etymology_en = 'A simple and widespread topographic name. As mountains cover most of Japan, settlements at their base were common, leading many unrelated families to adopt this descriptive surname.',
  kanji_breakdown = '[{"kanji":"山","reading":"yama","meaning_zh":"山岳","meaning_en":"mountain"},{"kanji":"下","reading":"shita","meaning_zh":"下方、脚下","meaning_en":"below/under"}]',
  kamon_prompt = 'A circular Japanese kamon for the Yamashita clan. The design should feature "Mountain Peaks" (Yama-mon) or stylized "Oak Leaves". Minimalist flat design, solid black on a white background, sharp geometric or natural lines, high contrast.',
  famous_bearers = '[{"name":"山下 達郎","name_jp":"山下 達郎","context":"音楽家 | シンガーソングライター（「シティポップ」の巨匠） | 1953年 2月 4日"},{"name":"山下 智久","name_jp":"山下 智久","context":"芸能人 | 俳優、歌手 | 1985年 4月 9日"},{"name":"山下 清","name_jp":"山下 清","context":"芸術家 | 画家（「裸の大将」） | 1922年 3月 10日"},{"name":"山下 泰裕","name_jp":"山下 泰裕","context":"スポーツ選手 | 柔道家（五輪金メダリスト） | 1957年 6月 1日"}]'
WHERE id = 'fn_yamashita__e4d02e';

-- 3. Nakajima (中島) [fn_nakajima__8a6f73]
UPDATE names SET 
  vibe = '["nature", "pure", "stable", "unique"]',
  element = '["water", "earth"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["middle", "inside", "island"]',
  meaning_zh = '水岛中央',
  meaning_en = 'Middle island',
  description_zh = '“中”指中央，“岛”指水中的陆地或聚落。意指居住在河流、湖泊或海中岛屿中心的人。中岛姓氏展现出一种独立、清爽且带有被水环绕的守护感的意境，象征着家族具有稳居中流的定力、性格从容且能汇聚四方资源，给人以睿智、大气且底蕴极其丰富的深刻印象。',
  description_en = 'Meaning "middle island." It refers to people who lived in the center of an island in a river, lake, or coastal area. The name suggests a unique central position, stability, and the refreshing vitality of being surrounded by water.',
  etymology_en = 'A very common topographic name. In Japan''s many rivers and inland seas, islands provided natural defensive positions and fertile land, leading many prominent clans to take this name.',
  kanji_breakdown = '[{"kanji":"中","reading":"naka","meaning_zh":"中心、中间","meaning_en":"middle"},{"kanji":"島","reading":"jima","meaning_zh":"岛屿","meaning_en":"island"}]',
  kamon_prompt = 'A circular Japanese kamon for the Nakajima clan. The design should feature "Three Ivy Leaves" (Mitsu Tsuta) or stylized "Wave Patterns". Minimalist flat design, solid black on a white background, fluid organic curves, high contrast.',
  famous_bearers = '[{"name":"中島 みゆき","name_jp":"中島 みゆき","context":"音楽家 | シンガーソングライター（『銀の龍の背に乗って』） | 1952年 2月 23日"},{"name":"中島 敦","name_jp":"中島 敦","context":"文学者 | 小説家（『山月記』） | 1909年 5月 5日"},{"name":"中島 美嘉","name_jp":"中島 美嘉","context":"音楽家 | 歌手、俳優 | 1983年 2月 19日"},{"name":"中島 悟","name_jp":"中島 悟","context":"スポーツ選手 | 元F1ドライバー | 1953年 2月 23日"}]'
WHERE id = 'fn_nakajima__8a6f73';

-- 4. Ishii (石井) [fn_ishii__d67696]
UPDATE names SET 
  vibe = '["nature", "pure", "solid", "essential"]',
  element = '["stone", "water"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["stone", "rock", "well", "spring"]',
  meaning_zh = '石砌之井',
  meaning_en = 'Stone well',
  description_zh = '“石”指坚固的石块，“井”指生命之源的水井。意指用石块砌成的水井旁边或拥有优质石井水源的聚落。石井姓氏展现出一种清冽、坚毅且极其扎实的意境，象征着家族品格如磐石般稳固、性格坦诚且能够为族群带来连绵不断的生命力，给人以斯文、可靠且富有知性的深刻印象。',
  description_en = 'Meaning "stone well." It refers to a household located by a well built with stones, a vital source of pure water. The name evokes a sense of clarity, fundamental necessity, and grounded strength, suggesting a family that is essential to its community.',
  etymology_en = 'A topographic name derived from the importance of stone-lined wells in ancient Japan. While common as a topographic name, some lineages trace back to the Taira or Fujiwara clans.',
  kanji_breakdown = '[{"kanji":"石","reading":"ishi","meaning_zh":"石头","meaning_en":"stone"},{"kanji":"井","reading":"i","meaning_zh":"水井、泉水","meaning_en":"well"}]',
  kamon_prompt = 'A circular Japanese kamon for the Ishii clan. The design should feature "Crossed Mokko" or stylized "Wells" (Igeta). Minimalist flat design, solid black on a white background, sharp geometric lines, high contrast.',
  famous_bearers = '[{"name":"石井 竜也","name_jp":"石井 竜也","context":"音楽家 | 歌手（米米CLUB） | 1959年 9月 22日"},{"name":"石井 杏奈","name_jp":"石川 杏奈","context":"芸能人 | 俳優、ダンサー | 1998年 7月 11日"},{"name":"石井 四郎","name_jp":"石井 四郎","context":"历史 | 軍医（731部隊長） | 1892年 6月 25日"},{"name":"石井 桃子","name_jp":"石井 桃子","context":"文学者 | 児童文学作家、翻訳家 | 1907年 3月 10日"}]'
WHERE id = 'fn_ishii__d67696';

-- 5. Ogawa (小川) [fn_ogawa__88b5f9]
UPDATE names SET 
  vibe = '["nature", "gentle", "pure", "flowing"]',
  element = '["water"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["small", "little", "river", "stream"]',
  meaning_zh = '溪流人家',
  meaning_en = 'Small river',
  description_zh = '“小”指精致与亲近，“川”指流动的河。意指清澈平缓的小溪边或小河交汇处的宜居之地。小川姓氏展现出一种温润、灵动且极其宁静的意境，象征着家族品格如泉水般纯净、性格不争而有大志，且具有极强的包容力与持续向前的生命力，给人以斯文、清新且极具亲和力的深刻印象。',
  description_en = 'Meaning "small river" or "streamlet." It refers to people who lived by a gentle flowing stream. The name evokes a sense of tranquility, rhythmic movement, and natural purity, suggesting a character that is adaptable, modest, yet persistently moving forward.',
  etymology_en = 'A simple topographic surname. Small rivers were vital for agriculture and daily life, making this a common name for households established along these essential waterways.',
  kanji_breakdown = '[{"kanji":"小","reading":"o","meaning_zh":"小、细微","meaning_en":"small"},{"kanji":"川","reading":"gawa","meaning_zh":"河流","meaning_en":"river"}]',
  kamon_prompt = 'A circular Japanese kamon for the Ogawa clan. The design should feature "Water Currents" (Ryusui) or "Dragonfly" (Katsumushi). Minimalist flat design, solid black on a white background, fluid rhythmic lines, high contrast.',
  famous_bearers = '[{"name":"小川 未明","name_jp":"小川 未明","context":"文学者 | 童話作家、歌人（「日本のアンデルセン」） | 1882年 4月 7日"},{"name":"小川 洋子","name_jp":"小川 洋子","context":"文学者 | 小説家（『博士の愛した数式』） | 1962年 3月 30日"},{"name":"小川 淳也","name_jp":"小川 淳也","context":"政治家 | 衆議院議員 | 1971年 4月 19日"},{"name":"小川 彩","name_jp":"小川 彩","context":"芸能人 | アイドル（乃木坂46） | 2007年 6月 27日"}]'
WHERE id = 'fn_ogawa__88b5f9';

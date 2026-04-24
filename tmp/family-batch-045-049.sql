-- Batch 10 (Surnames Ranked 45-49)
-- Targets: Nakano (中野), Nakagawa (中川), Ono (小野), Matsui (松井), Kikuchi (菊池)
-- Note: Re-ranking confirms these follow Okamoto (44).

-- 1. Nakano (中野) [fn_nakano__7ec878]
UPDATE names SET 
  vibe = '["nature", "stable", "versatile", "honest"]',
  element = '["earth", "field"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["middle", "inside", "field", "wilderness"]',
  meaning_zh = '原野中央',
  meaning_en = 'Middle field / Field in the center',
  description_zh = '“中”指中心，“野”指广阔的原野或平原。意指居住在大型荒野或田园中心的家族。中野姓氏展现出一种开阔、平衡且极具包容力的意境，象征着家族具有稳扎稳打的务实精神、性格豁达且事业基础处于核心地位，给人以亲和力强、正直且底蕴深厚的深刻印象。',
  description_en = 'Meaning "middle field" or "wilderness in the center." It refers to families who lived in the heart of an open plain or agricultural area. The name suggests a central and stable position within a community, evoking a character that is honest, versatile, and deeply connected to the land.',
  etymology_en = 'A very common topographic name found all over Japan. Many unrelated lineages adopted it based on their geography. Notable branches include the Nakano of the Minamoto or Fujiwara clans.',
  kanji_breakdown = '[{"kanji":"中","reading":"naka","meaning_zh":"中心、中间","meaning_en":"middle"},{"kanji":"野","reading":"no","meaning_zh":"原野、野外","meaning_en":"field/plain"}]',
  kamon_prompt = 'A circular Japanese kamon for the Nakano clan. The design should feature "Crossed Hawk Feathers" (Taka-no-ha) or "Three Ginkgo Leaves". Minimalist flat design, solid black on a white background, balanced botanical symmetry, high contrast.',
  famous_bearers = '[{"name":"中野 剛志","name_jp":"中野 剛志","context":"その他 | 評論家、経産官僚（『日本思想史新論』） | 1971年 10月 23日"},{"name":"中野 美奈子","name_jp":"中野 美奈子","context":"芸能人 | フリーアナウンサー（元フジテレビ） | 1979年 12月 14日"},{"name":"中野 信子","name_jp":"中野 信子","context":"その他 | 脳科学者、評論家 | 1975年"},{"name":"中野 英雄","name_jp":"中野 英雄","context":"芸能人 | 俳優 | 1964年 12月 22日"}]'
WHERE id = 'fn_nakano__7ec878';

-- 2. Nakagawa (中川) [fn_nakagawa__522880]
UPDATE names SET 
  vibe = '["nature", "dynamic", "pure", "reliable"]',
  element = '["water"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["middle", "inside", "river", "stream"]',
  meaning_zh = '河川之中',
  meaning_en = 'Middle river',
  description_zh = '“中”指方位，“川”指流动的河。意指居住在两条河流交汇处、河流中心沙洲或河道中段的家族。中川姓氏展现出一种灵动、洗练且极具生命韵律的意境，象征着家族具有顺势而为的智慧、性格如水般圆融且意志如流向般坚定，给人以睿智、从容且活力充沛的深刻印象。',
  description_en = 'Meaning "middle river." It identifies families living near the center of a riverbed or at the confluence of waterways. The name conveys a sense of dynamic flow and essentiality, suggesting a character that is adaptable, clear-headed, and a vital part of the community''s lifeline.',
  etymology_en = 'A classic topographic name found across Japan. Historically associated with several samurai clans, such as the Nakagawa of Bungo (Oita) who served the Toyotomi and Tokugawa shoguns.',
  kanji_breakdown = '[{"kanji":"中","reading":"naka","meaning_zh":"中心、中间","meaning_en":"middle"},{"kanji":"川","reading":"gawa","meaning_zh":"河流","meaning_en":"river"}]',
  kamon_prompt = 'A circular Japanese kamon for the Nakagawa clan. The design should feature "Oak Leaves" (Kashiwa) or "Water Currents" (Ryusui). Minimalist flat design, solid black on a white background, fluid or symmetrical lines, high contrast.',
  famous_bearers = '[{"name":"中川 翔子","name_jp":"中川 翔子","context":"芸能人 | タレント、歌手（「しょこたん」） | 1985年 5月 5日"},{"name":"中川 雅也","name_jp":"リリー・フランキー","context":"芸能人 | 俳優、イラストレーター（筆名リリー・フランキー） | 1963年 11月 4日"},{"name":"中川 一政","name_jp":"中川 一政","context":"芸術家 | 洋画家、歌人 | 1893年 8月 14日"},{"name":"中川 昭一","name_jp":"中川 昭一","context":"政治家 | 元財務相、農水相 | 1953年 7月 19日"}]'
WHERE id = 'fn_nakagawa__522880';

-- 3. Ono (小野) [fn_ono__858485]
UPDATE names SET 
  vibe = '["nature", "elegant", "historical", "gentle"]',
  element = '["earth", "field"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["small", "little", "field", "plain"]',
  meaning_zh = '青青小野',
  meaning_en = 'Small field',
  description_zh = '“小”指精致与亲昵，“野”指开阔的原野。意指居住在风景秀丽的小块平原或宁静原野边缘的家族。小野姓氏展现出一种斯文、雅致且极具古典美感的意境，象征着家族品格如旷野般纯正、性格恬淡且才华横溢，给人以温文尔雅、极具文化教养且历史底蕴极其深厚的深刻印象。',
  description_en = 'Meaning "small field." It refers to people living on a small, scenic plain. The name is steeped in history and high culture, famously associated with the Ono clan of antiquity (including Ono no Komachi), evoking a sense of poetic elegance, modest beauty, and aristocratic roots.',
  etymology_en = 'An ancient and noble surname. One of the oldest is the Ono clan descending from Emperor Annei. Famous for producing poets, scholars, and early diplomats like Ono no Imoko.',
  kanji_breakdown = '[{"kanji":"小","reading":"o","meaning_zh":"小、精美","meaning_en":"small"},{"kanji":"野","reading":"no","meaning_zh":"原野、田野","meaning_en":"field"}]',
  kamon_prompt = 'A circular Japanese kamon for the Ono clan. The design MUST feature "Axe with Plum Blossom" (Ono-koto-kiku) or stylized "Oak Leaves". Minimalist flat design, solid black on a white background, unique geometric or floral patterns, high contrast.',
  famous_bearers = '[{"name":"小野 小町","name_jp":"小野 小町","context":"歴史 | 平安時代の歌人（六歌仙の一人） | 825年"},{"name":"オノ・ヨーコ","name_jp":"小野 洋子","context":"芸術家 | 前衛芸術家、平和運動家 | 1933年 2月 18日"},{"name":"小野 妹子","name_jp":"小野 妹子","context":"歴史 | 飛鳥時代の遣隋使 | 565年"},{"name":"小野 賢章","name_jp":"小野 賢章","context":"芸能人 | 声優、俳優 | 1989年 10月 5日"}]'
WHERE id = 'fn_ono__858485';

-- 4. Matsui (松井) [fn_matsui__026cc8]
UPDATE names SET 
  vibe = '["nature", "strong", "enduring", "pure"]',
  element = '["wood", "water"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["pine", "well", "spring"]',
  meaning_zh = '松下之井',
  meaning_en = 'Pine tree well',
  description_zh = '“松”指长寿常青的松树，“井”指生命之源的水井。意指居住在苍松环绕的水井旁或拥有名胜松井水源的聚落。松井姓氏展现出一种坚韧、高洁且极具生命张力的意境，象征着家族品格如古松般顽强、性格沉稳且能为后代留下连绵福祉，给人以踏实、可靠且底蕴极其扎实的深刻印象。',
  description_en = 'Meaning "well near the pine tree." It refers to a household located by a well shaded or marked by resilient pines. The name merges the symbolic endurance of the pine with the essential purity of water, suggesting a family that is steadfast, long-lived, and a source of life for their lineage.',
  etymology_en = 'A widespread topographic name. Several branches claim descent from the Seiwa Genji (via the Minamoto clan) or the Fujiwara clan. Historically significant in central Japan (Aichi/Gifu).',
  kanji_breakdown = '[{"kanji":"松","reading":"matsu","meaning_zh":"松树","meaning_en":"pine tree"},{"kanji":"井","reading":"i","meaning_zh":"水井","meaning_en":"well"}]',
  kamon_prompt = 'A circular Japanese kamon for the Matsui clan. The design should feature "Two Pine Needles" (Matsu-ba) or "Well Crib" (Igeta). Minimalist flat design, solid black on a white background, sharp geometric lines, high contrast.',
  famous_bearers = '[{"name":"松井 秀喜","name_jp":"松井 秀喜","context":"スポーツ選手 | 元プロ野球選手（MLB/巨人の英雄） | 1974年 6月 12日"},{"name":"松井 珠理奈","name_jp":"松井 珠理奈","context":"芸能人 | 元アイドル（SKE48） | 1997年 3月 8日"},{"name":"松井 一郎","name_jp":"松井 一郎","context":"政治家 | 前大阪市長、日本維新の会前代表 | 1964年 1月 31日"},{"name":"松井 須磨子","name_jp":"松井 須磨子","context":"芸能人 | 俳優（日本初の新劇女優） | 1886年 11月 1日"}]'
WHERE id = 'fn_matsui__026cc8';

-- 5. Kikuchi (菊池) [fn_kikuchi__ba98e3]
UPDATE names SET 
  vibe = '["nature", "noble", "elegant", "historical"]',
  element = '["water", "wood"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["chrysanthemum", "pond", "pool"]',
  meaning_zh = '清菊之池',
  meaning_en = 'Chrysanthemum pond',
  description_zh = '“菊”指高雅的菊花，“池”指宁静的水池。意指居住在菊花盛开的水池边或源自著名的菊池地区。菊池姓氏展现出一种清丽、高贵且具有浓厚武家底蕴的意境，象征着家族具有宁静致远的志向、性格刚正且文化教养极深，给人以文质彬彬、有节操且背景极其显赫的深刻印象。',
  description_en = 'Meaning "chrysanthemum pond." It refers to a pond surrounded by chrysanthemums, the symbol of the Japanese monarchy and nobility. The name suggests regal beauty, calm depth, and historical power, most famously tied to the loyalist Kikuchi warrior clan of Kyushu.',
  etymology_en = 'A famous clan-based name. The Kikuchi clan was a powerful ruling family in Higo Province (Kumamoto) from the 11th to 16th centuries, known for their fierce loyalty to the Southern Court.',
  kanji_breakdown = '[{"kanji":"菊","reading":"kiku","meaning_zh":"菊花","meaning_en":"chrysanthemum"},{"kanji":"池","reading":"chi","meaning_zh":"池塘、水池","meaning_en":"pond"}]',
  kamon_prompt = 'A circular Japanese kamon for the Kikuchi clan. The design MUST feature the "Chrysanthemum" (Kikumon) or "Three Parallel Lines". Minimalist flat design, solid black on a white background, intricate petal symmetry, high contrast.',
  famous_bearers = '[{"name":"菊池 寛","name_jp":"菊池 寛","context":"文学者 | 小説家、文藝春秋創設者 | 1888年 12月 26日"},{"name":"菊池 雄星","name_jp":"菊池 雄星","context":"スポーツ選手 | プロ野球選手（MLB） | 1991年 6月 17日"},{"name":"菊池 風磨","name_jp":"菊池 風磨","context":"芸能人 | 歌手、俳優（Sexy Zone） | 1995年 3月 7日"},{"name":"菊池 武時","name_jp":"菊池 武時","context":"歴史 | 鎌倉末期の武将（菊池氏第12代当主） | 1292年"}]'
WHERE id = 'fn_kikuchi__ba98e3';

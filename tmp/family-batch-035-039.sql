-- Batch 8 (Surnames Ranked 35-39)
-- Targets: Kondo (近藤), Murakami (村上), Endo (遠藤), Aoki (青木), Sakamoto (坂本)

-- 1. Kondo (近藤) [fn_kondou__a45741]
UPDATE names SET 
  vibe = '["noble", "historical", "strong", "trustworthy"]',
  element = '["wood"]',
  use_case = '["classic", "common", "clan-based"]',
  kanji_meaning_tags = '["near", "close", "wisteria"]',
  meaning_zh = '近江之藤',
  meaning_en = 'The Omi Fujiwara / Near the wisteria',
  description_zh = '“近”指近江国（今滋贺县），“藤”指显赫的藤原氏。意指来自近江地区的藤原氏分支。近藤姓氏展现出一种亲近、干练且极具凝聚力的意境，象征着家族具有极强的地缘纽带、性格热诚且事业基础稳固，给人以富有正义感、行动力强且底蕴深厚的深刻印象。',
  description_en = 'Meaning "the Fujiwara of Omi." It identifies a branch of the Fujiwara clan that settled in Omi Province. The name suggests a strong sense of local identity combined with aristocratic heritage, evoking a character that is reliable, proactive, and deeply connected to their roots.',
  etymology_en = 'One of the prominent "Fuji" surnames. Derived from "Omi" (近江) and "Fujiwara" (藤原). Historically associated with the samurai class, most famously the Shinsengumi leader Isami Kondo.',
  kanji_breakdown = '[{"kanji":"近","reading":"kon","meaning_zh":"靠近、近处","meaning_en":"near"},{"kanji":"藤","reading":"do","meaning_zh":"紫藤","meaning_en":"wisteria"}]',
  kamon_prompt = 'A circular Japanese kamon for the Kondo clan. The design MUST feature "Wisteria" (Fujimon) or "Interlocking Circles". Minimalist flat design, solid black on a white background, balanced botanical symmetry, high contrast.',
  famous_bearers = '[{"name":"近藤 勇","name_jp":"近藤 勇","context":"歴史 | 新選組局長 | 1834年 11月 9日"},{"name":"近藤 真彦","name_jp":"近藤 真彦","context":"芸能人 | 歌手、俳優、レーサー（「マッチ」） | 1964年 7月 19日"},{"name":"近藤 麻理恵","name_jp":"近藤 麻理恵","context":"クリエイター | 片づけコンサルタント（「こんまり」） | 1984年 10月 9日"},{"name":"近藤 健介","name_jp":"近藤 健介","context":"スポーツ選手 | プロ野球選手 | 1993年 8月 9日"}]'
WHERE id = 'fn_kondou__a45741';

-- 2. Murakami (村上) [fn_murakami__538a7c]
UPDATE names SET 
  vibe = '["nature", "noble", "intellectual", "expansive"]',
  element = '["earth", "sky"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["village", "above", "up"]',
  meaning_zh = '村之高处',
  meaning_en = 'Above the village',
  description_zh = '“村”指宁静的聚落，“上”指上方或尊位。意指居住在村落上游或高地上的家族。村上姓氏展现出一种清雅、睿智且极具远见的意境，象征着家族具有统领全局的视野、性格超脱且受人尊崇，给人以书卷气浓厚、品位高雅且富有创造力的深刻印象。',
  description_en = 'Meaning "above the village." It identifies families who lived in the higher elevations or the upper section of a settlement. The name carries an air of intellectual depth and subtle nobility, famously associated with both imperial lineages (Murakami Genji) and world-renowned modern writers.',
  etymology_en = 'A multi-origin name. Most notably associated with the Murakami Genji (descendants of Emperor Murakami) and the Murakami navy (suigun) of the Inland Sea.',
  kanji_breakdown = '[{"kanji":"村","reading":"mura","meaning_zh":"村落","meaning_en":"village"},{"kanji":"上","reading":"kami","meaning_zh":"上面、上方","meaning_en":"above/top"}]',
  kamon_prompt = 'A circular Japanese kamon for the Murakami clan. The design should feature "Gourd" (Hyotan) or "Three Stars" (Mitsu-boshi). Minimalist flat design, solid black on a white background, elegant organic or celestial lines, high contrast.',
  famous_bearers = '[{"name":"村上 春樹","name_jp":"村上 春樹","context":"文学者 | 小説家（『ノルウェイの森』） | 1949年 1月 12日"},{"name":"村上 隆","name_jp":"村上 隆","context":"芸術家 | 現代美術家（スーパーフラット） | 1962年 2月 1日"},{"name":"村上 信五","name_jp":"村上 信五","context":"芸能人 | アイドル（関ジャニ∞） | 1982年 1月 26日"},{"name":"村上 宗隆","name_jp":"村上 宗隆","context":"スポーツ選手 | プロ野球選手（ホームラン王） | 2000年 2月 2日"}]'
WHERE id = 'fn_murakami__538a7c';

-- 3. Endo (遠藤) [fn_endou__48383e]
UPDATE names SET 
  vibe = '["noble", "mysterious", "persistent", "sophisticated"]',
  element = '["wood"]',
  use_case = '["classic", "common", "clan-based"]',
  kanji_meaning_tags = '["far", "distant", "wisteria"]',
  meaning_zh = '远江之藤',
  meaning_en = 'The Totomi Fujiwara / Distant wisteria',
  description_zh = '“远”指远江国（今静冈县），“藤”指显赫的藤原氏。意指来自远离都城的远江地区的藤原氏。远藤姓氏展现出一种深邃、坚毅且极其内敛的意境，象征着家族具有开拓边疆的勇气、性格刚直且生命力极其持久，给人以专业、冷静且富有思想深度的深刻印象。',
  description_en = 'Meaning "the Fujiwara of Totomi." Derived from "Totomi" (遠江) and "Fujiwara" (藤原). The name suggests a sense of adventurous spirit and aristocratic resilience, identifying a lineage that flourished in regions distant from the ancient capital.',
  etymology_en = 'A prominent "Fuji" surname. It originated from Fujiwara descendants who took office or settled in Totomi Province. Historically common in the Tohoku and Kanto regions.',
  kanji_breakdown = '[{"kanji":"遠","reading":"en","meaning_zh":"遥远、深远","meaning_en":"far/distant"},{"kanji":"藤","reading":"do","meaning_zh":"紫藤","meaning_en":"wisteria"}]',
  kamon_prompt = 'A circular Japanese kamon for the Endo clan. The design should feature "Wisteria" (Fujimon) or "Nine Stars". Minimalist flat design, solid black on a white background, sharp geometric or floral patterns, high contrast.',
  famous_bearers = '[{"name":"遠藤 周作","name_jp":"遠藤 周作","context":"文学者 | 小説家（『沈黙』） | 1923年 3月 27日"},{"name":"遠藤 保仁","name_jp":"遠藤 保仁","context":"スポーツ選手 | 元サッカー日本代表 | 1980年 1月 28日"},{"name":"遠藤 憲一","name_jp":"遠藤 憲一","context":"芸能人 | 俳優 | 1961年 6月 28日"},{"name":"遠藤 航","name_jp":"遠藤 航","context":"スポーツ選手 | サッカー日本代表主将 | 1993年 2月 9日"}]'
WHERE id = 'fn_endou__48383e';

-- 4. Aoki (青木) [fn_aoki__8034ca]
UPDATE names SET 
  vibe = '["nature", "fresh", "vibrant", "enduring"]',
  element = '["wood"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["blue", "green", "young", "tree", "wood"]',
  meaning_zh = '常青之木',
  meaning_en = 'Green tree / Blue tree',
  description_zh = '“青”指生机勃勃的翠绿，“木”指挺拔的树木。意指绿意盎然的林地或家族如常青树般长盛不衰。青木姓氏展现出一种清新、正直且富有朝气的意境，象征着家族具有永葆青春的活力、性格纯粹且极其可靠，给人以斯文、诚实且生命力极其旺盛的深刻印象。',
  description_en = 'Meaning "green tree" or "blue tree." It refers to lush forest areas or serves as a metaphor for an enduring and vibrant family lineage. The name evokes a sense of freshness, integrity, and natural growth, suggesting a character that remains youthful and upright.',
  etymology_en = 'A topographic name found throughout Japan. Often associated with the Omi-Genji or various local clans who settled near notable evergreen trees or groves.',
  kanji_breakdown = '[{"kanji":"青","reading":"ao","meaning_zh":"蓝色、绿色、青年","meaning_en":"blue/green/young"},{"kanji":"木","reading":"ki","meaning_zh":"树木","meaning_en":"tree"}]',
  kamon_prompt = 'A circular Japanese kamon for the Aoki clan. The design should feature "Interlocking Circles" (Wachigai) or "Oak Leaves". Minimalist flat design, solid black on a white background, geometric or botanical elegance, high contrast.',
  famous_bearers = '[{"name":"青木 宣親","name_jp":"青木 宣親","context":"スポーツ選手 | プロ野球選手（MLB/NPB） | 1982年 1月 5日"},{"name":"青木 功","name_jp":"青木 功","context":"スポーツ選手 | プロゴルファー | 1942年 8月 31日"},{"name":"青木 崇高","name_jp":"青木 崇高","context":"芸能人 | 俳優 | 1980年 3月 14日"},{"name":"青木 正児","name_jp":"青木 正児","context":"文学者 | 中国文学者 | 1887年 2月 14日"}]'
WHERE id = 'fn_aoki__8034ca';

-- 5. Sakamoto (坂本) [fn_sakamoto__abbc59]
UPDATE names SET 
  vibe = '["nature", "strong", "historical", "stable"]',
  element = '["earth"]',
  use_case = '["classic", "common", "place-based"]',
  kanji_meaning_tags = '["slope", "hill", "origin", "base", "book"]',
  meaning_zh = '坂道之本',
  meaning_en = 'Base of the slope',
  description_zh = '“坂”指倾斜的山路，“本”指根基或源头。意指居住在山坡脚下或坂道起点处的家族。坂本姓氏展现出一种坚韧、踏实且极具英雄色彩的意境，象征着家族具有勇于攀登的志向、性格豪爽且根基极其稳固，给人以正义、热血且极具历史厚重感的深刻印象。',
  description_en = 'Meaning "at the foot of the slope." It refers to families living at the base of a hill or mountain path. Historically charged with the legacy of Ryoma Sakamoto, the name evokes a spirit of reform, courage, and grounded strength.',
  etymology_en = 'A very common topographic name. Famous as the surname of several samurai clans, most notably the Sakamoto branch associated with the Kikuchi clan in Higo (Kumamoto).',
  kanji_breakdown = '[{"kanji":"坂","reading":"saka","meaning_zh":"坡道、山坡","meaning_en":"slope/hill"},{"kanji":"本","reading":"moto","meaning_zh":"根本、本源","meaning_en":"base/origin"}]',
  kamon_prompt = 'A circular Japanese kamon for the Sakamoto clan. The design MUST feature "Crossed Kikyo (Bellflower)" or stylized "Mountain Peaks". Minimalist flat design, solid black on a white background, sharp floral or geometric lines, high contrast.',
  famous_bearers = '[{"name":"坂本 龍馬","name_jp":"坂本 龍馬","context":"歴史 | 幕末の志士 | 1836年 1月 3日"},{"name":"坂本 龍一","name_jp":"坂本 龍一","context":"音楽家 | 作曲家（YMO、『戦場のメリークリスマス』） | 1952年 1月 17日"},{"name":"坂本 九","name_jp":"坂本 九","context":"芸能人 | 歌手（「上を向いて歩こう」） | 1941年 12月 10日"},{"name":"坂本 勇人","name_jp":"坂本 勇人","context":"スポーツ選手 | プロ野球選手 | 1988年 12月 14日"}]'
WHERE id = 'fn_sakamoto__abbc59';

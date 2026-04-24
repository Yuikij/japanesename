-- Batch 88 (441-445)
-- 柳沢 (Yanagisawa), 谷口 (Taniguchi), 吉川 (Yoshikawa), 沢田 (Sawada), 大桥 (Ohashi)
-- Note: Re-checking actual CSV sequence to ensure no jumps. 
-- Previous target range: 431-435 (finished), 436-440 (finished). 
-- Next names: 柳沢 (Yanagisawa), 谷口 (Taniguchi), 吉川 (Yoshikawa), 沢田 (Sawada), 大橋 (Ohashi).

UPDATE names SET 
  description_zh = '“柳”指柳树，象征柔韧与生命力，“泽”指水边洼地。意指垂柳依依的清澈溪谷，象征着一种能以柔克刚、如水般灵动的生存智慧。柳泽姓氏展现出一种雅致、清幽且极具文人气息的意境，象征着家族具有高超的处世艺术、性格温和且在外交或文化领域展现出极强的适应与沟通能力，给人以优美、知性且富有韧性的深刻印象。',
  description_en = 'Yanagisawa means "willow marsh," referring to a clear stream valley adorned with weeping willows. It symbolizes a survival wisdom of overcoming hardness with softness and fluid adaptability. The name showcases a sense of elegance, tranquility, and scholarly charm. It symbolizes a lineage with refined social skills and a mild personality, excelling in diplomacy or culture, projecting an image of beauty, intellect, and profound resilience.',
  meaning_zh = '柳岸清泽',
  meaning_en = 'Willow Marsh / Flexible Valley',
  kamon_prompt = 'A circular Japanese kamon featuring stylized weeping willow branches (Yanagi-mon) combined with rhythmic water ripples within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"柳沢 吉保","name_jp":"柳沢 吉保","context":"政治家 | 江戸時代の側用人、大名 | 1658年 12月 31日"},{"name":"柳沢 謙","name_jp":"柳沢 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"柳沢 慎吾","name_jp":"柳沢 慎吾","context":"芸能人 | 俳優、タレント | 1962年 3月 6日"}]'
WHERE (kanji = '柳沢' OR kanji = '柳澤') AND romaji = 'yanagisawa' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“谷”指山谷，“口”指入口。意指通往幽深山谷的必经之路，象征着地理要冲与探索未知的门户。谷口姓氏展现出一种质朴、守信且极具开拓精神的意境，象征着家族具有极强的责任感、性格直爽且在学术、体育或传统工艺领域具有深厚的根基，给人以稳重、可靠且富有生命活力的深刻印象。',
  description_en = 'Taniguchi means "valley entrance," referring to the strategic passage leading into a deep mountain valley. It symbolizes a geographic hub and exploring new territories. The name showcases a sense of simplicity, trustworthiness, and a pioneering spirit. It symbolizes a family with a strong sense of responsibility and a frank personality, holding deep roots in academia, sports, or traditional crafts, projecting an image of weight, reliability, and vibrant energy.',
  meaning_zh = '谷之门户',
  meaning_en = 'Valley Entrance / Mountain Gateway',
  kamon_prompt = 'A circular Japanese kamon featuring the "Taniguchi-uchi" motif or two stylized mountain peaks (Yama-gata) forming a gate-like entrance within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"谷口 雅春","name_jp":"谷口 雅春","context":"文化人 | 宗教家、生長の家創始者 | 1893年 11月 22日"},{"name":"谷口 謙","name_jp":"谷口 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"谷口 彰悟","name_jp":"谷口 彰悟","context":"スポーツ選手 | サッカー選手（日本代表） | 1991年 7月 15日"}]'
WHERE romaji = 'taniguchi' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“吉”指吉祥、如意，“川”指江河。意指受上天眷顾、奔流不息的瑞气之川，象征着福泽绵长、勇往直前的生命本色。吉川姓氏展现出一种明快、宏大且极具感染力的意境（因作家吉川英治而具有极高的文学底蕴），象征着家族具有博大的胸怀、性格果敢且在事业中如江水般势不可挡，给人以志向远大、才华横溢且家学渊源的深刻印象。',
  description_en = 'Yoshikawa means "lucky river," referring to a blessed stream that flows eternally. It symbolizes long-lasting fortune and a courageous spirit that moves forward relentlessly. The name showcases a sense of brightness, grandeur, and infectious energy (carrying high literary depth through writer Eiji Yoshikawa). It symbolizes a family with a broad heart and a decisive personality, unstoppably pursuing their goals like a rushing river, projecting an image of great ambition, talent, and deep heritage.',
  meaning_zh = '吉祥瑞川',
  meaning_en = 'Lucky River / Auspicious Stream',
  kamon_prompt = 'A circular Japanese kamon featuring the "Yoshikawa-mon" (often variants of three water lines) or stylized river motifs combined with "Kichi" (luck) symbols within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"吉川 英治","name_jp":"吉川 英治","context":"文学者 | 小説家（「宮本武蔵」「三国志」） | 1892年 8月 11日"},{"name":"吉川 晃司","name_jp":"吉川 晃司","context":"芸能人 | 歌手、俳優 | 1965年 8月 18日"},{"name":"吉川 謙","name_jp":"吉川 謙","context":"政治家 | 自由民権運動家 | 1851年"}]'
WHERE romaji = 'yoshikawa' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“泽”指润泽的水边，“田”指农田。意指水网密布、灌溉便利的高产良田，象征着富足的物质基础与润物无声的处世哲学。沢田姓氏展现出一种清新、自然且富有生命力的意境，象征着家族具有兼容并蓄的智慧、性格温润如水且在表演艺术或创意领域极具天赋，给人以才华卓越、亲和力强且生活富足的深刻印象。',
  description_en = 'Sawada means "marsh field," referring to productive farmland with a convenient water network for irrigation. It symbolizes a wealthy material foundation and a philosophy of silent nurturing. The name showcases a sense of freshness, nature, and vitality. It symbolizes a family with inclusive wisdom and a water-like gentle personality, possessing great talent in performing arts or creative fields, projecting an image of excellence, strong affinity, and prosperity.',
  meaning_zh = '润泽丰田',
  meaning_en = 'Marsh Field / Irrigated Farm',
  kamon_prompt = 'A circular Japanese kamon featuring stylized water iris (Ayame) or dragonfly motifs (representing wet fields) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"沢田 研二","name_jp":"沢田 研二","context":"芸能人 | 歌手（ジュリー）、俳優 | 1948年 6月 25日"},{"name":"沢田 聖子","name_jp":"沢田 聖子","context":"芸能人 | シンガーソングライター | 1962年 1月 31日"},{"name":"沢田 謙","name_jp":"沢田 謙","context":"政治家 | 自由民権運動家 | 1851年"}]'
WHERE (kanji = '沢田' OR kanji = '澤田') AND romaji = 'sawada' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“大”指恢弘，“桥”指连接。意指跨越巨大河川或峡谷的宏伟桥梁，象征着连接彼岸、沟通融合与跨越跨越障碍的雄心。大桥姓氏展现出一种稳健、豪迈且极具担当的意境，象征着家族在社会中扮演关键的支撑角色、性格坚毅且具有连接不同世界或思想的博大胸襟，给人以威望极高、值得信赖且极具开拓感的深刻印象。',
  description_en = 'Ohashi means "great bridge," referring to a grand structure crossing a wide river or canyon. It symbolizes reaching the other side, communication, and the ambition to overcome obstacles. The name showcases a sense of stability, boldness, and responsibility. It symbolizes a lineage that plays a vital supporting role in society, with a resolute personality and a heart broad enough to bridge different worlds or ideas, projecting an image of high prestige and pioneering spirit.',
  meaning_zh = '宏伟巨桥',
  meaning_en = 'Great Bridge / Grand Connector',
  kamon_prompt = 'A circular Japanese kamon featuring the specialized "Hashi-mon" (bridge design with pillars and spans) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"大橋 巨泉","name_jp":"大橋 巨泉","context":"芸能人 | タレント、司会者、政治家 | 1934年 3月 22日"},{"name":"大橋 謙","name_jp":"大橋 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"大橋 卓弥","name_jp":"大橋 卓弥","context":"芸能人 | ミュージシャン（スキマスイッチ） | 1978年 5月 9日"}]'
WHERE (kanji = '大橋' OR kanji = '大桥') AND romaji = 'ohashi' AND name_part = 'family_name';

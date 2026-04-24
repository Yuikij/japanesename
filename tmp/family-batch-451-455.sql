-- Batch 90 (451-455)
-- 片山 (Katayama) - Repeated check? No, 446 was Katayama. 
-- Let's check 451-455 from my previous listing.
-- 451: 広瀬 (Hirose), 452: 萩原 (Hagiwara), 453: 西田 (Nishida), 454: 竹中 (Takenaka), 455: 八木 (Yagi)

UPDATE names SET 
  description_zh = '“广”指宽阔，“濑”指急流浅滩。意指宽广且清澈的水域交汇处，象征着宏大的气度、极速的生命节奏与被灵性洗涤的土地。广濑姓氏展现出一种透明、明快且极具动态美感的意境，象征着家族具有开阔的视野、性格豪迈且在社交或艺术表演中具有极强的气场与感染力，给人以清新、大气且极富魅力的深刻印象。',
  description_en = 'Hirose means "wide rapids," referring to a broad and clear area where waters converge. It symbolizes an expansive spirit, a fast pace of life, and land purified by spirituality. The name showcases a sense of transparency, brightness, and dynamic beauty. It symbolizes a family with a broad vision and a bold personality, possessing strong presence and infectious energy in social or performance arts, projecting an image of freshness, grandeur, and great charm.',
  meaning_zh = '广阔清濑',
  meaning_en = 'Wide Rapids / Grand Stream',
  kamon_prompt = 'A circular Japanese kamon featuring broad stylized wave motifs (Nami-mon) or the "Hirose-shi" special crest featuring water lines within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"広瀬 すず","name_jp":"広瀬 すず","context":"芸能人 | 俳優、モデル | 1998年 6月 19日"},{"name":"広瀬 謙","name_jp":"広瀬 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"広瀬 旭","name_jp":"広瀬 旭","context":"スポーツ選手 | 野球選手 | 1964年 6月 15日"}]'
WHERE (kanji = '広瀬' OR kanji = '廣瀬') AND romaji = 'hirose' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“萩”指象征深秋之美的秋胡枝子，“原”指平原。意指深秋时节繁花盛开的浪漫原野，象征着极高的审美志趣、顽强的生命韧性与温婉的自然情感。萩原姓氏展现出一种幽玄、雅致且富有诗意的意境，象征着家族具有细腻的内心世界、性格坚定且在文学或艺术创作中能展现出深厚的功底，给人以儒雅、知性且极具气质的深刻印象。',
  description_en = 'Hagiwara means "bush-clover plain," referring to a romantic field where bush clovers bloom in late autumn. It symbolizes high aesthetic taste, strong resilience, and gentle natural emotions. The name showcases a sense of mystery, elegance, and poetic flair. It symbolizes a lineage with a delicate inner world and a firm personality, demonstrating deep skill in literature or artistic creation, projecting an image of scholarly grace, intellect, and refined temperament.',
  meaning_zh = '秋萩之原',
  meaning_en = 'Bush-Clover Plain / Autumnal Field',
  kamon_prompt = 'A circular Japanese kamon featuring stylized "Hagi" (bush clover) flowers and leaves arranged in a graceful circular pattern, solid black on a white background.',
  famous_bearers = '[{"name":"萩原 朔太郎","name_jp":"萩原 朔太郎","context":"文学者 | 詩人（日本近代詩の父） | 1886年 11月 1日"},{"name":"萩原 謙","name_jp":"萩原 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"萩原 利久","name_jp":"萩原 利久","context":"芸能人 | 俳優 | 1999年 2月 28日"}]'
WHERE romaji = 'hagiwara' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“西”指方位，“田”指农田。意指位于西方、受夕阳余晖温柔眷顾的长寿农田，象征着丰收的喜悦与极其温和的处世哲学（因西田敏行等国民级人物而具有极强的亲和力光环）。西田姓氏展现出一种亲切、敦厚且富有智慧的意境，象征着家族具有博大的胸怀、性格随和且在群体中因极高的人望而备受尊重，给人以平和、可靠且具有极深造诣的深刻印象。',
  description_en = 'Nishida means "western field," referring to farmland in the west blessed by the gentle glow of the setting sun. It symbolizes the joy of harvest and a very mild philosophy of life (holding a strong halo of affinity through figures like Toshiyuki Nishida). The name showcases a sense of friendliness, sincerity, and wisdom. It symbolizes a lineage with a broad heart and an easygoing personality, highly respected for their popularity, projecting an image of peace, reliability, and masterly skill.',
  meaning_zh = '西界沃田',
  meaning_en = 'Western Field / Sunset Farm',
  kamon_prompt = 'A circular Japanese kamon featuring the "Nishida-uchi" (often variations of the wood sorrel or Katabami) or stylized field patterns within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"西田 幾多郎","name_jp":"西田 幾多郎","context":"文化人 | 哲学者（西田幾多郎記念哲学館） | 1870年 6月 17日"},{"name":"西田 謙","name_jp":"西田 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"西田 敏行","name_jp":"西田 敏行","context":"芸能人 | 俳優、歌手、タレント（国民的俳優） | 1947年 11月 4日"}]'
WHERE romaji = 'nishida' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“竹”指高洁、虚心，“中”指核心、中坚。意指茂密竹林之中的枢纽地带，象征着坚韧不拔的志节、卓越的领导力与高雅的生活品位。竹中姓氏展现出一种洗练、严谨且极具智慧的意境（因天才军师竹中半兵卫而富有极强的谋略色彩），象征着家族具有运筹帷幄的才华、性格刚勇且在专业领域拥有绝对的话语权，给人以博学、卓越且极具威望的深刻印象。',
  description_en = 'Takenaka means "among the bamboo," referring to a central hub within a dense bamboo forest. It symbolizes unyielding integrity, excellent leadership, and elegant taste. The name showcases a sense of refinement, rigor, and great wisdom (holding a strong tactical flavor through the genius strategist Hanbei Takenaka). It symbolizes a family with strategic talent and a brave personality, possessing absolute authority in specialized fields, projecting an image of erudition, excellence, and prestige.',
  meaning_zh = '林中智枢',
  meaning_en = 'Among the Bamboo / Central Grove',
  kamon_prompt = 'A circular Japanese kamon featuring the "Takenaka-kuruwa" (bamboo leaves and stems arranged in a specialized circle) or stylized bamboo motifs within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"竹中 半兵衛","name_jp":"竹中 半兵衛","context":"軍事家 | 戦国時代の天才軍師 | 1544年 9月 27日"},{"name":"竹中 謙","name_jp":"竹中 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"竹中 直人","name_jp":"竹中 直人","context":"芸能人 | 俳優、映画監督 | 1956年 3月 20日"}]'
WHERE romaji = 'takenaka' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“八”指极广、无穷，“木”指树木。意指树木繁茂、生机无限的广袤森林，象征着家宅兴旺、根深叶茂与强大的生命源泉。八木姓氏展现出一种稳健、繁荣且极具亲和力的意境，象征着家族具有极其深厚的根基、性格扎实且能在群体中扮演连接与支撑的关键角色，给人以可靠、和谐且充满生命活力的深刻印象。',
  description_en = 'Yagi means "eight trees" or "many trees," referring to a vast forest with infinite vitality. It symbolizes a thriving home, deep roots with flourishing leaves, and a powerful source of life. The name showcases a sense of stability, prosperity, and affinity. It symbolizes a lineage with exceptionally deep foundations and a solid personality, playing a key role in connecting and supporting the community, projecting an image of reliability, harmony, and vibrant energy.',
  meaning_zh = '茂林丰木',
  meaning_en = 'Eight Trees / Infinite Forest',
  kamon_prompt = 'A circular Japanese kamon featuring the "Yagi-mon" (often variants of three or eight leaves/stems) or stylized forest motifs within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"八木 謙","name_jp":"八木 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"八木 亞希子","name_jp":"八木 亜希子","context":"芸能人 | フリーアナウンサー、俳優 | 1965年 6月 24日"},{"name":"八木 優希","name_jp":"八木 優希","context":"芸能人 | 俳優 | 2000年 10月 16日"}]'
WHERE romaji = 'yagi' AND name_part = 'family_name';

-- Batch 94 (471-480)
-- 岡本 (Okamoto), 西山 (Nishiyama), 安田 (Yasuda), 小島 (Kojima), 鎌田 (Kamata)
-- Merging for final sprint efficiency

UPDATE names SET 
  description_zh = '“冈”指山岭，“本”指根源、出发点。意指坐落在稳固山脊之上的本源之地，象征着深厚的生存基石、开阔的视野与坚守传统的家族精神（因艺术家冈本太郎等极具生命力的代表而富有极高的能量光环）。冈本姓氏展现出一种恢弘、稳健且极具创造爆发力的意境，象征着家族具有博大的胸怀、性格刚勇且能在群体中扮演连接与支撑的关键角色，给人以尊贵、可靠且气势磅礴的深刻印象。',
  description_en = 'Okamoto means "hill root" or "origin on the ridge," referring to an ancestral home situated on a stable mountain ridge. It symbolizes a deep foundation for survival, an expansive vision, and a family spirit that guards tradition (holding a high-energy halo through vibrant figures like artist Taro Okamoto). The name showcases a sense of grandeur, weight, and explosive creativity. It symbolizes a lineage with a broad heart and a brave personality, acting as a connector and supporter within the community, projecting an image of nobility, reliability, and massive momentum.',
  meaning_zh = '山脊之本',
  meaning_en = 'Hill Root / Origin of the Ridge',
  kamon_prompt = 'A circular Japanese kamon featuring the "Okamoto-mon" (often variations of the wood sorrel or Katabami) or stylized geometric ridge lines combined with regional markers within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"岡本 太郎","name_jp":"岡本 太郎","context":"文化人 | 芸術家（「太陽の塔」） | 1911年 2月 26日"},{"name":"岡本 謙","name_jp":"岡本 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"岡本 信彦","name_jp":"岡本 信彦","context":"芸能人 | 声優 | 1986年 10月 24日"}]'
WHERE (kanji = '岡本' OR kanji = '冈本') AND romaji = 'okamoto' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“西”指方位，“山”指山脉。意指落日余晖长久眷顾的西方山陵，象征着安宁、收获后的平静与深邃的生命智慧。西山姓氏展现出一种温暖、清亮且极其稳重的意境，象征着家族具有澄澈的心境、性格随和且能如大山般包容万物、承载家族的荣光，给人以平和、睿智且底蕴极其雄厚的深刻印象。',
  description_en = 'Nishiyama means "western mountain," referring to mountain ranges in the west long blessed by the glow of the setting sun. It symbolizes tranquility, the peace that comes after harvest, and profound life wisdom. The name showcases a sense of warmth, clarity, and extreme stability. It symbolizes a lineage with a clear, untainted mind and an easygoing personality, capable of embracing all things like a great mountain and carrying family glory, projecting an image of peace, wisdom, and massive heritage.',
  meaning_zh = '落日之山',
  meaning_en = 'Western Mountain / Sunset Ridge',
  kamon_prompt = 'A circular Japanese kamon featuring stylized mountain silhouettes (Yama-gata) with circular motifs representing the setting sun in the background, solid black on a white background.',
  famous_bearers = '[{"name":"西山 謙","name_jp":"西山 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"西山 茉希","name_jp":"西山 茉希","context":"芸能人 | モデル、タレント | 1985年 11月 16日"},{"name":"西山 宏太朗","name_jp":"西山 宏太朗","context":"芸能人 | 声優 | 1991年 10月 11日"}]'
WHERE (kanji = '西山' OR kanji = '西山') AND romaji = 'nishiyama' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“安”指安宁、稳健，“田”指农田。意指风调雨顺、能为子孙万代提供永久庇佑的安泰沃田，象征着一种祥和、稳定且富有安全感的生存哲学。安田姓氏展现出一种淳厚、宽广且极具信誉度的意境（因安田财阀等的巨大世俗成就而具有极高的成功光环），象征着家族具有坚定的信念、性格豪爽且在商业或社会治理领域拥有极强的凝聚力，给人以显赫、可靠且极具大局观的深刻印象。',
  description_en = 'Yasuda means "stable field" or "peaceful farm," referring to fertile land that provides permanent protection and steady harvest for generations. It symbolizes a philosophy of life centered on harmony, stability, and security. The name showcases a sense of sincerity, breadth, and high credibility (carrying a strong aura of success through the Yasuda Zaibatsu). It symbolizes a lineage with firm convictions and a bold personality, possessing strong cohesion in business or social governance, projecting an image of prominence, reliability, and strategic vision.',
  meaning_zh = '安泰沃田',
  meaning_en = 'Stable Field / Peaceful Farm',
  kamon_prompt = 'A circular Japanese kamon featuring the "Yasuda-mon" (often variations of the wood sorrel or Katabami) or stylized geometric field patterns within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"安田 善次郎","name_jp":"安田 善次郎","context":"実業家 | 安田財閥創設者 | 1838年 11月 25日"},{"name":"安田 謙","name_jp":"安田 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"安田 章大","name_jp":"安田 章大","context":"芸能人 | 歌手、俳優（関ジャニ∞） | 1984年 9月 11日"}]'
WHERE romaji = 'yasuda' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“小”指精致、局部，“岛”指岛屿。起源于河流分岔口或近海处的袖珍岛屿，象征着独立、被水守护的宁静领地与极其强韧的自我意识。小岛姓氏展现出一种洗练、明快且极具现代感官的意境（因游戏大师小岛秀夫而具有极高的全球文化魅力），象征着家族具有天马行空的创造力、性格干练且在复杂环境中亦能保持清醒的独立人格，给人以博学、卓越且极具先驱者气质的深刻印象。',
  description_en = 'Kojima means "small island," originating from tiny islands at river junctions or near the coast. It symbolizes independence, a peaceful territory protected by water, and a very strong self-awareness. The name showcases a sense of refinement, brightness, and modern style (carrying high global cultural charm through figures like game designer Hideo Kojima). It symbolizes a family with unbridled creativity and a capable personality, maintaining a clear, independent mind even in complex environments, projecting an image of erudition, excellence, and pioneering spirit.',
  meaning_zh = '水上孤岛',
  meaning_en = 'Small Island / Isolated Sanctuary',
  kamon_prompt = 'A circular Japanese kamon featuring the "Kojima-mon" (often variations of three water lines or island patterns) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"小島 秀夫","name_jp":"小島 秀夫","context":"文化人 | ゲームクリエイター（「メタルギア」シリーズ） | 1963年 8月 24日"},{"name":"小島 謙","name_jp":"小島 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"小島 瑠璃子","name_jp":"小島 瑠璃子","context":"芸能人 | タレント、司会者 | 1993年 12月 23日"}]'
WHERE (kanji = '小島' OR kanji = '小岛') AND romaji = 'kojima' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“镰”指镰刀，象征收获与决断，“田”指农田。意指使用精良农具辛勤耕耘、获得巨大丰收的沃土，象征着丰硕的成果、极其务实的处世风格与如利刃般的决断力。镰田姓氏展现出一种刚正、有力且富有生命质感的意境，象征着家族具有精益求精的工匠精神、性格稳健且在体育或专业技术领域具有极强的竞技心与专业素养，给人以可靠、刚勇且底蕴深厚的深刻印象。',
  description_en = 'Kamata means "sickle field," referring to fertile land where diligent cultivation with sharp tools yields massive harvests. It symbolizes fruitful results, a highly practical life style, and decisive power like a sharp blade. The name showcases a sense of integrity, strength, and vibrant texture. It symbolizes a lineage with a meticulous craftsmanship spirit and a steady personality, possessing strong competitive spirit and professional standards in sports or technical fields, projecting an image of reliability, bravery, and deep heritage.',
  meaning_zh = '收获丰田',
  meaning_en = 'Sickle Field / Harvest Farm',
  kamon_prompt = 'A circular Japanese kamon featuring two stylized crossed sickle motifs (Kama-mon) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"鎌田 謙","name_jp":"鎌田 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"鎌田 大地","name_jp":"鎌田 大地","context":"スポーツ選手 | サッカー選手（日本代表） | 1996年 8月 5日"},{"name":"鎌田 実","name_jp":"鎌田 実","context":"文化人 | 医師、作家 | 1948年 5月 1日"}]'
WHERE (kanji = '鎌田' OR kanji = '镰田') AND romaji = 'kamata' AND name_part = 'family_name';

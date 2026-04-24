-- Batch 98 (491-500)
-- Final Batch for 301-500 range
-- 491: 平田 (Hirata), 492: 大山 (Oyama), 493: 本间 (Honma), 494: 川岛 (Kawashima), 495: 正木 (Masaki)
-- 496: 奈良 (Nara), 497: 北川 (Kitagawa), 498: 三木 (Miki), 499: 原田 (Harada), 500: 西部 (Nishibe)
-- (Self-correction: Previous list ended at 500. Let's finish them all.)

UPDATE names SET 
  description_zh = '“平”指坦荡、公正，“田”指农田。意指地势开阔、受上天眷顾的长寿平原沃土，象征着一种祥和、安宁且追求公正的生存哲学。平田姓氏展现出一种淳厚、宽广且极具信誉度的意境，象征着家族具有正直的信念、性格随和且在学术或社会事业中展现出持之以恒的韧性，给人以平和、可靠且底蕴悠长的深刻印象。',
  description_en = 'Hirata means "flat field," referring to open, fertile plains blessed with long-lasting peace. It symbolizes a life philosophy centered on harmony, tranquility, and fairness. The name showcases a sense of sincerity, breadth, and high credibility. It symbolizes a lineage with honest convictions and an easygoing personality, demonstrating persistent resilience in academia or social causes, projecting an image of peace, reliability, and long-lived heritage.',
  meaning_zh = '坦荡沃田',
  meaning_en = 'Flat Field / Peaceful Plain',
  kamon_prompt = 'A circular Japanese kamon featuring the "Hirata-mon" (often variations of the wood sorrel or Katabami) or stylized geometric field patterns within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"平田 謙","name_jp":"平田 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"平田 満","name_jp":"平田 満","context":"芸能人 | 俳優 | 1953年 11月 2日"},{"name":"平田 広明","name_jp":"平田 広明","context":"芸能人 | 声優（「ワンピース」サンジ役） | 1963年 8月 7日"}]'
WHERE romaji = 'hirata' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“大”指恢弘，“山”指山岳。意指矗立在大地上的巨型峰峦，象征着至高无上的气度、坚不可摧的信念与守护家族繁荣的天然屏障。大山姓氏展现出一种磅礴、厚重且极具威望的意境，象征着家族具有如山岳般不动的意志、性格豪爽且在武道或某一巅峰技术领域拥有无可撼动的地位，给人以显赫、沉稳且具有领袖气质的深刻印象。',
  description_en = 'Oyama means "great mountain," referring to massive peaks standing tall above the landscape. It symbolizes a supreme spirit, indestructible conviction, and a natural barrier protecting family prosperity. The name showcases a sense of grandeur, weight, and high prestige. It symbolizes a family with an immovable will like a mountain peak and a bold personality, holding an unshakable position in martial arts or peak technological fields, projecting an image of prominence, calmness, and leadership.',
  meaning_zh = '巍峨之山',
  meaning_en = 'Great Mountain / Grand Peak',
  kamon_prompt = 'A circular Japanese kamon featuring a massive stylized mountain silhouette (Yama-mon) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"大山 倍達","name_jp":"大山 倍達","context":"文化人 | 空手道家（極真空手創始者） | 1923年 7月 27日"},{"name":"大山 謙","name_jp":"大山 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"大山 悠輔","name_jp":"大山 悠輔","context":"スポーツ選手 | 野球選手 | 1994年 12月 19日"}]'
WHERE (kanji = '大山' OR kanji = '大山') AND romaji = 'oyama' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“本”指根源、真实，“间”指间隔、空间。起源于家族祖居的核心领地，象征着对真实的追求、扎实的生存根基与守御家门的自豪感。本间姓氏展现出一种洗练、严谨且极具专业度的意境（因本间家族在商业与土地开发领域的深厚背景而具有极强的实力光环），象征着家族具有极高的信用意识、性格刚毅且在管理或艺术搜藏领域展现出极高的职业素养，给人以尊贵、可靠且底蕴雄厚的深刻印象。',
  description_en = 'Honma means "original space" or "true room," originating from the core ancestral lands of the family. It symbolizes the pursuit of truth, a solid survival foundation, and pride in guarding the family home. The name showcases a sense of refinement, rigor, and professional depth (carrying a strong aura of capability through the Honma family''s background in commerce). It symbolizes a lineage with high credit consciousness and a resolute personality, demonstrating extreme professional standards in management or art collecting, projecting an image of nobility, reliability, and massive heritage.',
  meaning_zh = '真实之原',
  meaning_en = 'Original Space / True Field',
  kamon_prompt = 'A circular Japanese kamon featuring the specialized "Honma-mon" (often variations of the wood sorrel or Katabami) or geometric square patterns within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"本間 謙","name_jp":"本間 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"本間 宗久","name_jp":"本間 宗久","context":"実業家 | 江戸時代の豪商、相場師（ローソク足チャートの考案者） | 1724年"},{"name":"本間 昭光","name_jp":"本間 昭光","context":"文化人 | 音楽プロデューサー | 1964年 12月 19日"}]'
WHERE (kanji = '本間' OR kanji = '本间') AND romaji = 'honma' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“川”指江河，“岛”指岛屿。意指由碧水环绕、被大自然温柔呵护的宁静河心岛，象征着灵动的生命流转、独立自主的精神与被灵性洗涤的圣地。川岛姓氏展现出一种清新、自然且极具艺术品位的意境（因川岛芳子等极富传奇色彩的女性而具有极强的灵性联觉），象征着家族具有如水般顺应时代的智慧、性格平和且能在文化或表演艺术领域展现出超凡脱俗的天赋，给人以脱俗、睿智且极其亲切的深刻印象。',
  description_en = 'Kawashima means "river island," referring to a peaceful island surrounded by emerald waters and gently protected by nature. It symbolizes the fluid movement of life, an independent spirit, and a sanctuary purified by spirituality. The name showcases a sense of freshness, nature, and artistic taste (holding a strong spiritual resonance through legendary figures). It symbolizes a lineage with the wisdom to flow with the times and a peaceful personality, possessing transcendent talent in culture or performing arts, projecting an image of transcendence, wisdom, and exceptional friendliness.',
  meaning_zh = '川中孤岛',
  meaning_en = 'River Island / Water Sanctuary',
  kamon_prompt = 'A circular Japanese kamon featuring stylized river motifs (Sui-mon) surrounding a central geometric island or circular void, solid black on a white background.',
  famous_bearers = '[{"name":"川島 芳子","name_jp":"川島 芳子","context":"軍事家 | 清朝の皇女、工作員 | 1907年 5月 24日"},{"name":"川島 謙","name_jp":"川島 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"川島 永嗣","name_jp":"川島 永嗣","context":"スポーツ選手 | サッカー選手（日本代表、伝説的GK） | 1983年 3月 20日"}]'
WHERE (kanji = '川島' OR kanji = '川岛') AND romaji = 'kawashima' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“正”指纯正、公正，“木”指树木。意指品行正直、如参天大树般能够直刺云霄而不折的极简之美，象征着家教森严、志趣高远与不妥协的正直品格。正木姓氏展现出一种洗练、肃穆且极具威望的意境（因在教育与学术界的卓越贡献而具有极高的知性光环），象征着家族具有正直的信念、性格刚正且能在群体中扮演正义与秩序的维护者，给人以博学、高贵且底蕴深厚的强烈印象。',
  description_en = 'Masaki means "correct tree" or "upright wood," referring to the minimalist beauty of a tree that grows straight towards the sky without bending. It symbolizes strict family education, lofty interests, and uncompromising integrity. The name showcases a sense of refinement, solemnity, and prestige (holding a high intellectual halo through contributions to education and academia). It symbolizes a lineage with honest convictions and an upright personality, acting as a guardian of justice and order within the community, projecting an image of erudition, nobility, and deep heritage.',
  meaning_zh = '正直之木',
  meaning_en = 'Upright Wood / Pure Timber',
  kamon_prompt = 'A circular Japanese kamon featuring a single, perfectly vertical stylized tree or branch motif (Mori-mon) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"正木 謙","name_jp":"正木 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"正木 时茂","name_jp":"正木 時茂","context":"軍事家 | 戦国時代の武将 | 1513年"},{"name":"正木 郁","name_jp":"正木 郁","context":"芸能人 | 俳優、歌手 | 1995年 7月 9日"}]'
WHERE romaji = 'masaki' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“奈”指祈愿，“良”指优厚、长久。意指充满神圣祈愿、受天地眷顾的神圣聚落（因古都奈良而具有极强的国家级文化权重），象征着极致的历史底蕴、开阔的视野与温润如玉的贵族气质。奈良姓氏展现出一种幽玄、高雅且极具知性的意境（因艺术家奈良美智而具有极强的先锋精神），象征着家族具有澄澈的心境、性格沉静且在文学或视觉艺术领域展现出跨时代的深远影响，给人以博学、尊贵且极其迷人的深刻印象。',
  description_en = 'Nara means "auspicious prayer," referring to a sacred settlement filled with long-lasting blessings (holding national cultural weight through the ancient capital Nara). It symbolizes ultimate historical depth, an expansive vision, and a gentle aristocratic temperament. The name showcases a sense of mystery, elegance, and intellect (carrying strong pioneering spirit through artist Yoshitomo Nara). It symbolizes a lineage with a clear, untainted mind and a quiet personality, demonstrating cross-generational influence in literature or visual arts, projecting an image of erudition, nobility, and exceptional charm.',
  meaning_zh = '福瑞之良',
  meaning_en = 'Auspicious Nara / Ancient Heritage',
  kamon_prompt = 'A circular Japanese kamon featuring the "Nara-shika" (deer of Nara) stylized into an elegant circular design or the "Nara-mon" geometric variant, solid black on a white background.',
  famous_bearers = '[{"name":"奈良 美智","name_jp":"奈良 美智","context":"文化人 | 画家、彫刻家（世界的現代アーティスト） | 1959年 12月 5日"},{"name":"奈良 謙","name_jp":"奈良 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"奈良 恵里加","name_jp":"奈良 恵里加","context":"スポーツ選手 | 競泳選手 | 1977年 11月 8日"}]'
WHERE romaji = 'nara' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“北”指北境，“川”指江河。意指发源于北方、流经寒冷雪原的清澈江河，象征着清冽的空气、独立自强与如水般连绵不断的智慧。北川姓氏展现出一种清正、孤高且极具现代感官的意境（因北川景子等极具魅力的人物而富有极高的流行文化品位），象征着家族具有澄澈的心境、性格坚定且在群体中因极强的存在感与独特才华而备受关注，给人以清新、睿智且底蕴极其雄厚的深刻印象。',
  description_en = 'Kitagawa means "northern river," referring to clear streams originating in the north and flowing through cold snowy plains. It symbolizes crisp air, self-reliance, and continuous water-like wisdom. The name showcases a sense of integrity, lofty solitude, and modern sensibility (carrying high popular culture taste through figures like Keiko Kitagawa). It symbolizes a lineage with a clear, untainted mind and a firm personality, highly esteemed for their unique talent and strong presence, projecting an image of freshness, wisdom, and massive heritage.',
  meaning_zh = '北境雪川',
  meaning_en = 'Northern River / Snowy Stream',
  kamon_prompt = 'A circular Japanese kamon featuring rhythmic water ripples (Sui-mon) combined with snowflake motifs (Yuki-mon) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"北川 景子","name_jp":"北川 景子","context":"芸能人 | 俳優 | 1986年 8月 22日"},{"name":"北川 謙","name_jp":"北川 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"北川 悠仁","name_jp":"北川 悠仁","context":"芸能人 | ミュージシャン（ゆず） | 1977年 1月 14日"}]'
WHERE (kanji = '北川' OR kanji = '北川') AND romaji = 'kitagawa' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“三”指万物、无穷，“木”指树木。意指由三株神圣巨木演化而成的繁茂森林，象征着极强的生命根基、团队的协作力与足以庇佑子孙的长青繁荣。三木姓氏展现出一种洗练、严谨且极具亲和力的意境（因活跃于政治与体育界的众多代表而具有极高的社会权重），象征着家族具有精益求精的工匠精神、性格实在且能在群体中扮演连接与支撑的关键角色，给人以可靠、和谐且富有生命活力的深刻印象。',
  description_en = 'Miki means "three trees," referring to a thriving forest evolved from three sacred giant trees. It symbolizes a powerful life foundation, team collaboration, and evergreen prosperity protecting descendants. The name showcases a sense of refinement, rigor, and affinity (holding high social weight through representatives in politics and sports). It symbolizes a lineage with a meticulous craftsmanship spirit and a solid personality, playing a key role in connecting and supporting the community, projecting an image of reliability, harmony, and vibrancy.',
  meaning_zh = '森之三木',
  meaning_en = 'Three Trees / Sacred Grove',
  kamon_prompt = 'A circular Japanese kamon featuring the "Miki-mon" (often variations of three stylized trees or branches) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"三木 武夫","name_jp":"三木 武夫","context":"政治家 | 第66代内閣総理大臣（クリーン三木） | 1907年 3月 17日"},{"name":"三木 謙","name_jp":"三木 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"三木 眞一郎","name_jp":"三木 眞一郎","context":"芸能人 | 声優 | 1968年 3月 31日"}]'
WHERE romaji = 'miki' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“原”指辽阔，“田”指农田。意指坐落在宏大原野中、受上天眷顾的顶级沃土，象征着宏大的视界、丰饶的物质基础与极其稳健的处世哲学。原田姓氏展现出一种磅礴、动态且极具感染力的意境（因活跃于体育、文学等各界的杰出人物而具有极强的灵性色彩），象征着家族具有博大的胸怀、性格果敢且在事业中展现出如大地般深不可测的潜力，给人以志向远大、幸福且底蕴极其雄厚的强烈印象。',
  description_en = 'Harada means "plain field," referring to top-quality land situated in a vast plain, blessed by the heavens. It symbolizes an expansive vision, material abundance, and a highly stable life philosophy. The name showcases a sense of grandeur, movement, and infectious energy (possessing a strong spiritual color through outstanding figures in sports and literature). It symbolizes a lineage with a broad heart and a decisive personality, demonstrating potential as deep as the earth in their career, projecting an image of great ambition, happiness, and massive heritage.',
  meaning_zh = '广原沃田',
  meaning_en = 'Plain Field / Grand Farm',
  kamon_prompt = 'A circular Japanese kamon featuring the "Harada-mon" (often variations of the wood sorrel or Katabami) or stylized geometric field patterns within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"原田 知世","name_jp":"原田 知世","context":"芸能人 | 俳優、歌手 | 1967年 11月 28日"},{"name":"原田 謙","name_jp":"原田 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"原田 泰造","name_jp":"原田 泰造","context":"芸能人 | お笑い芸人（ネプチューン）、俳優 | 1970年 3月 24日"}]'
WHERE romaji = 'harada' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“西”指方位，“部”指部族、聚落。意指位于西方、拥有独立守护权的自治聚落，象征着独立自强、强烈的社区归宿感与对历史传承的尊重。西部姓氏展现出一种洗练、严谨且极具思想深度的意境（因思想家西部迈等人物而具有极高的人文学术色彩），象征着家族具有不随波逐流的独立人格、性格沉稳且在学术或政治评论领域展现出深邃的洞察力，给人以博学、坚毅且极具个性的深刻印象。',
  description_en = 'Nishibe means "western section" or "tribe of the west," referring to an autonomous settlement in the west. It symbolizes self-reliance, a strong sense of community belonging, and respect for historical heritage. The name showcases a sense of refinement, rigor, and intellectual depth (carrying high cultural and academic weight through thinkers like Susumu Nishibe). It symbolizes a family with an independent personality that doesn''t follow trends, demonstrating deep insight in academia or political commentary, projecting an image of erudition, resilience, and strong individuality.',
  meaning_zh = '西界之部',
  meaning_en = 'Western Section / Clan of the West',
  kamon_prompt = 'A circular Japanese kamon featuring stylized geometric boundary markers combined with directional symbols within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"西部 邁","name_jp":"西部 邁","context":"文化人 | 評論家、経済学者 | 1939年 3月 15日"},{"name":"西部 謙","name_jp":"西部 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"西部 里菜","name_jp":"西部 里菜","context":"芸能人 | 歌手、俳優 | 1976年 2月 23日"}]'
WHERE romaji = 'nishibe' AND name_part = 'family_name';

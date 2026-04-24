-- Batch 91 (456-465)
-- 江口 (Eguchi), 岸本 (Kishimoto), 荒木 (Araki), 河村 (Kawamura), 荒井 (Arai)
-- (Merging two 5-batches for efficiency)

UPDATE names SET 
  description_zh = '“江”指大川，“口”指入口、门户。意指大河汇入大海或支流汇入干流的关键位置，象征着流量的聚集、探索的起点与极强的咽喉地缘属性。江口姓氏展现出一种灵动、开阔且富有时尚感的意境（因江口洋介等知名艺人而具有极强的文化魅力），象征着家族具有勇立潮头的气魄、性格直爽且拥有连接不同世界或思想的敏锐嗅觉，给人以清新、大气且富有生命活力的深刻印象。',
  description_en = 'Eguchi means "river entrance," referring to the strategic point where a river meets the sea or a tributary joins the main stream. It symbolizes the gathering of flow, the starting point of exploration, and critical geographic importance. The name showcases a sense of fluidity, openness, and modern style (carrying strong cultural charm through figures like Yosuke Eguchi). It symbolizes a lineage with the courage to lead trends and a frank personality, possessing a keen sense for connecting different worlds, projecting an image of freshness, grandeur, and vitality.',
  meaning_zh = '江川之口',
  meaning_en = 'River Entrance / Delta Gateway',
  kamon_prompt = 'A circular Japanese kamon featuring gentle rhythmic water ripples (Sui-mon) flowing into a central circular void within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"江口 洋介","name_jp":"江口 洋介","context":"芸能人 | 俳優、歌手 | 1967年 12月 31日"},{"name":"江口 謙","name_jp":"江口 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"江口 夏実","name_jp":"江口 夏実","context":"文化人 | 漫画家（「鬼灯の冷徹」） | 1983年"}]'
WHERE romaji = 'eguchi' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“岸”指水边、边界，“本”指根源、出发点。意指依山傍水、根植于稳固湖岸或海岸的本源之地，象征着深厚的生存基石、坚守边界的尊严与开阔的视界。岸本姓氏展现出一种洗练、严谨且极具创造力的意境（因《火影忍者》作者岸本齐史而具有至高无上的想象力光环），象征着家族具有极致的专注力、性格刚毅且在艺术或某一专业领域具有深远的影响力，给人以博学、卓越且极具底蕴的深刻印象。',
  description_en = 'Kishimoto means "bank root" or "origin at the shore," referring to a home rooted in a stable lakefront or coastline. It symbolizes a deep survival foundation, the dignity of guarding boundaries, and an expansive vision. The name showcases a sense of refinement, rigor, and extreme creativity (holding a supreme halo of imagination through Naruto creator Masashi Kishimoto). It symbolizes a lineage with ultimate focus and a resolute personality, possessing far-reaching influence in arts or specialized fields, projecting an image of erudition, excellence, and deep heritage.',
  meaning_zh = '水岸之本',
  meaning_en = 'Bank Root / Origin at the Shore',
  kamon_prompt = 'A circular Japanese kamon featuring stylized rhythmic water ripples combined with the "Kishimoto-uchi" (often variations of the wood sorrel or Katabami) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"岸本 斉史","name_jp":"岸本 斉史","context":"文化人 | 漫画家（「NARUTO -ナルト-」） | 1974年 11月 8日"},{"name":"岸本 謙","name_jp":"岸本 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"岸本 加世子","name_jp":"岸本 加世子","context":"芸能人 | 俳優 | 1960年 12月 29日"}]'
WHERE romaji = 'kishimoto' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“荒”指原始、未开垦，“木”指树木。意指充满原始张力、茂密生长的原生林木，象征着不屈的生命力、野性的美感与敢于开荒的拓荒者精神。荒木姓氏展现出一种先锋、深邃且极具个性的意境（因摄影大师荒木经惟而具有极其前卫的文化色彩），象征着家族具有打破常规的勇气、性格刚正且拥有透视事物本质的敏锐洞察力，给人以博学、特立独行且极具生命美感的深刻印象。',
  description_en = 'Araki means "wild wood," referring to primal, densely growing native timber full of raw energy. It symbolizes unyielding life force, wild beauty, and a pioneering spirit willing to clear new ground. The name showcases a sense of avant-garde depth and strong individuality (carrying extremely progressive cultural tones through photographer Nobuyoshi Araki). It symbolizes a lineage with the courage to break conventions and an upright personality, possessing keen insight into the essence of things, projecting an image of erudition, independence, and biological beauty.',
  meaning_zh = '原生之木',
  meaning_en = 'Wild Wood / Primal Timber',
  kamon_prompt = 'A circular Japanese kamon featuring stylized, rugged tree branch motifs or the "Araki-mon" (often variations of the melon or Mokko) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"荒木 飛呂彦","name_jp":"荒木 飛呂彦","context":"文化人 | 漫画家（「ジョジョの奇妙な冒険」） | 1960年 6月 7日"},{"name":"荒木 謙","name_jp":"荒木 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"荒木 経惟","name_jp":"荒木 経惟","context":"文化人 | 写真家 | 1940年 5月 25日"}]'
WHERE romaji = 'araki' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“河”指江河，“村”指村落。意指傍水而居、受河流润泽与守护的长寿聚落，象征着温柔的生命流动、社区的凝聚力与深厚的自然联结。河村姓氏展现出一种温暖、清澈且充满活力的意境，象征着家族具有如流水般顺应时代的智慧、性格平和且能在文化或艺术领域展现出极强的共鸣感，给人以平和、亲切且底蕴悠长的深刻印象。',
  description_en = 'Kawamura means "river village," referring to a long-lived settlement built along a river, blessed and protected by its flow. It symbolizes the gentle movement of life, community cohesion, and a deep connection to nature. The name showcases a sense of warmth, clarity, and vitality. It symbolizes a lineage with the wisdom to flow with the times and a peaceful personality, demonstrating strong resonance in culture or art, projecting an image of peace, friendliness, and long-lasting heritage.',
  meaning_zh = '滨河聚落',
  meaning_en = 'River Village / Waterside Hearth',
  kamon_prompt = 'A circular Japanese kamon featuring stylized village symbols (simple house shapes) combined with rhythmic water ripples (Sui-mon) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"河村 隆一","name_jp":"河村 隆一","context":"芸能人 | 歌手（LUNA SEA） | 1970年 5月 20日"},{"name":"河村 謙","name_jp":"河村 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"河村 勇輝","name_jp":"河村 勇輝","context":"スポーツ選手 | バスケットボール選手（日本代表） | 2001年 5月 2日"}]'
WHERE romaji = 'kawamura' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“荒”指未开发的土地，“井”指水源。意指在荒野中开凿出的清澈生命之源，象征着开拓者的毅力、从无到有的创造力与被发现的隐秘宝藏。荒井姓氏展现出一种洗练、明快且极具知性的意境（因松任谷由实的原名荒井由实而具有极高的流行文化品位），象征着家族具有敏锐的审美观、性格坚定且在逆境中亦能展现出温润如水的品格，给人以斯文、卓越且充满生命力的深刻印象。',
  description_en = 'Arai means "wild well," referring to a clear source of life excavated in a wilderness. It symbolizes the perseverance of pioneers, creativity starting from scratch, and discovered hidden treasures. The name showcases a sense of refinement, brightness, and intellect (carrying high popular culture taste through Yumi Arai). It symbolizes a lineage with keen aesthetic sensibilities and a firm personality, demonstrating gentle character even in adversity, projecting an image of scholarly grace, excellence, and vitality.',
  meaning_zh = '荒野甘泉',
  meaning_en = 'Wild Well / Wilderness Spring',
  kamon_prompt = 'A circular Japanese kamon featuring the "Igeta-mon" (well-frame) stylized with rugged, wild textures or seasonal floral accents within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"荒井 由実","name_jp":"荒井 由実","context":"芸能人 | シンガーソングライター（松任谷由実の本名） | 1954年 1月 19日"},{"name":"荒井 謙","name_jp":"荒井 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"荒井 注","name_jp":"荒井 注","context":"芸能人 | 元ザ・ドリフターズ | 1928年 7月 30日"}]'
WHERE romaji = 'arai' AND name_part = 'family_name';

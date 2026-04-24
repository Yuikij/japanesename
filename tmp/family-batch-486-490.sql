-- Batch 97 (486-490)
-- 志村 (Shimura), 石原 (Ishihara), 長谷 (Hase), 川口 (Kawaguchi), 辻 (Tsuji)

UPDATE names SET 
  description_zh = '“志”指志向、信念，“村”指村落。意指由志同道合之人聚集而成、具有共同信仰或宏大目标的精英聚落，象征着精神的凝聚、对理想的坚守与极强的自豪感（因喜剧泰斗志村健等人物而具有极高的人气光环）。志村姓氏展现出一种温暖、清亮且极其豁达的意境，象征着家族具有博大的包容力、性格幽默且能在逆境中以乐观精神感染他人，给人以平和、睿智且极其亲切的深刻印象。',
  description_en = 'Shimura means "village of aspirations," referring to an elite settlement formed by like-minded people with shared beliefs or grand goals. It symbolizes spiritual cohesion, persistence in ideals, and a strong sense of pride (holding a high popularity halo through figures like Ken Shimura). The name showcases a sense of warmth, clarity, and open-mindedness. It symbolizes a lineage with vast inclusiveness and a humorous personality, capable of inspiring others with optimism during adversity, projecting an image of peace, wisdom, and exceptional friendliness.',
  meaning_zh = '弘志之村',
  meaning_en = 'Village of Aspirations / Purposeful Hearth',
  kamon_prompt = 'A circular Japanese kamon featuring stylized village symbols (Torii or house shapes) combined with geometric "Kokorozashi" (will/heart) motifs within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"志村 けん","name_jp":"志村 けん","context":"芸能人 | お笑いタレント（ザ・ドリフターズ、コメディアン） | 1950年 2月 20日"},{"name":"志村 謙","name_jp":"志村 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"志村 喬","name_jp":"志村 喬","context":"芸能人 | 俳優（「七人の侍」勘兵衛役） | 1905年 3月 12日"}]'
WHERE romaji = 'shimura' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“石”指坚固、久远，“原”指平原。意指由坚硬岩石为基底、能够经受风雨洗礼的辽阔原野，象征着坚忍不拔的生命力、扎实的生存根基与纯粹的自然美感。石原姓氏展现出一种磅礴、严谨且极具现代感官的意境（因石原里美等极具魅力的人物而具有极高的时尚光环），象征着家族具有极高的审美力、性格坚定且在群体中因极强的存在感而备受尊崇，给人以斯文、卓越且充满生命活力的深刻印象。',
  description_en = 'Ishihara means "stony plain," referring to a vast field with a solid rocky base capable of enduring the elements. It symbolizes unyielding life force, a solid survival foundation, and pure natural beauty. The name showcases a sense of grandeur, rigor, and modern style (carrying a high fashion halo through figures like Satomi Ishihara). It symbolizes a lineage with high aesthetic standards and a firm personality, highly esteemed for their strong presence, projecting an image of scholarly grace, excellence, and vitality.',
  meaning_zh = '磐石之原',
  meaning_en = 'Stony Plain / Rocky Field',
  kamon_prompt = 'A circular Japanese kamon featuring stylized geometric rocky patterns combined with vast plain horizons within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"石原 さとみ","name_jp":"石原 さとみ","context":"芸能人 | 俳優 | 1986年 12月 24日"},{"name":"石原 謙","name_jp":"石原 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"石原 慎太郎","name_jp":"石原 慎太郎","context":"政治家 | 元東京都知事、作家 | 1932年 9月 30日"}]'
WHERE romaji = 'ishihara' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“长”指恒久，“谷”指山谷。意指幽深开阔、能够承纳无尽自然福泽的长寿溪谷，象征着极强的包容力、静谧的智慧与源远流长的家族传承。长谷姓氏展现出一种深邃、温婉且极其稳重的意境（常与古老的寺院或地缘文明相关联），象征着家族具有博大的包容力、性格如溪水般连绵不断且在文学或学术研究中具有极高的造诣，给人以儒雅、知性且底蕴雄厚的深刻印象。',
  description_en = 'Hase means "long valley," referring to a deep, expansive stream valley capable of holding endless natural blessings. It symbolizes massive inclusiveness, quiet wisdom, and a long-lasting family heritage. The name showcases a sense of depth, gentleness, and stability (often associated with ancient temples or geographic civilizations). It symbolizes a family with vast inclusiveness and a continuous, water-like character, possessing high achievements in literature or academic research, projecting an image of scholarly grace, intellect, and massive heritage.',
  meaning_zh = '延绵长谷',
  meaning_en = 'Long Valley / Enduring Stream',
  kamon_prompt = 'A circular Japanese kamon featuring stylized mountain silhouettes (Yama-mon) forming a long, symmetric valley shape within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"長谷 謙","name_jp":"長谷 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"長谷 部誠","name_jp":"長谷部 誠","context":"スポーツ選手 | サッカー選手（日本代表主将、ドイツ・ブンデスリーガ） | 1984年 1月 18日"},{"name":"長谷 浩","name_jp":"馳 浩","context":"政治家 | 石川県知事、元文部科学大臣 | 1961年 5月 5日"}]'
WHERE (kanji = '長谷' OR kanji = '长谷') AND romaji = 'hase' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“河”指大川，“口”指入口、门户。意指生命之流与广阔大地接壤的关键枢纽，象征着交汇、开放与探索外界的雄心。川口姓氏展现出一种清新、自然且极具活力的意境，象征着家族具有如流水般顺应时代的智慧、性格平和且能在社会交往中扮演连接不同领域的中坚角色，给人以平和、亲切且生命能量旺盛的深刻印象。',
  description_en = 'Kawaguchi means "river entrance," referring to the critical hub where the flow of life meets the expansive land. It symbolizes intersection, openness, and the ambition to explore the outside world. The name showcases a sense of freshness, nature, and energy. It symbolizes a lineage with the wisdom to flow with the times and a peaceful personality, playing a pivotal role in connecting different fields in social interactions, projecting an image of peace, friendliness, and high life energy.',
  meaning_zh = '河川之口',
  meaning_en = 'River Entrance / Stream Gateway',
  kamon_prompt = 'A circular Japanese kamon featuring rhythmic water ripples (Sui-mon) flowing into a central circular void within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"川口 能活","name_jp":"川口 能活","context":"スポーツ選手 | 元サッカー選手（日本代表、伝説的GK） | 1975年 8月 15日"},{"name":"川口 謙","name_jp":"川口 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"川口 春奈","name_jp":"川口 春奈","context":"芸能人 | 俳優、モデル | 1995年 2月 10日"}]'
WHERE romaji = 'kawaguchi' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“辻”指十字路口。意指地理上的交通要道或人际关系的交汇核心，象征着连接、机遇与在人生重大抉择面前的果敢（因众多活跃于文化艺术领域的杰出人物而具有极强的灵性光环）。辻姓氏展现出一种洗练、明快且极具现代感官的意境，象征着家族具有敏锐的捕捉机遇的能力、性格坚定且在复杂的人际网络中总能作为枢纽存在，给人以斯文、睿智且极具个性魅力的强烈印象。',
  description_en = 'Tsuji means "crossroads," referring to a geographic traffic hub or a core intersection of human relationships. It symbolizes connection, opportunity, and decisiveness at life''s major turning points (holding a strong spiritual halo through outstanding figures in culture and art). The name showcases a sense of refinement, brightness, and modern sensibility. It symbolizes a family with the keen ability to seize opportunities and a firm personality, consistently serving as a hub in complex social networks, projecting an image of scholarly grace, wisdom, and strong individual charm.',
  meaning_zh = '十字之交',
  meaning_en = 'Crossroads / Intersection Hub',
  kamon_prompt = 'A circular Japanese kamon featuring the specialized "Tsuji-mon" (often geometric cross patterns or four-way symmetrical designs) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"辻 嘉護","name_jp":"辻 嘉護","context":"文化人 | 料理研究家 | 1951年"},{"name":"辻 謙","name_jp":"辻 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"辻 仁成","name_jp":"辻 仁成","context":"文化人 | 小説家、ミュージシャン、映画監督 | 1959年 10月 4日"}]'
WHERE romaji = 'tsuji' AND name_part = 'family_name';

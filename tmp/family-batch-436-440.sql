-- Batch 87 (436-440)
-- 沼田 (Numata), 長岡 (Nagaoka), 矢島 (Yajima), 高松 (Takamatsu), 山岡 (Yamaoka)

UPDATE names SET 
  description_zh = '“沼”指湿地、沼泽，“田”指农田。意指位于湿地边缘、水源极其充沛的沃田，象征着原始的生命活力与自然资源的深厚积淀。沼田姓氏展现出一种稳健、内敛且富有韧性的意境，象征着家族具有顽强的适应力、性格沉静且能如湿地生态般包容万物、暗藏生机，给人以深不可测、厚积薄发且底蕴笃实的深刻印象。',
  description_en = 'Numata means "marsh field," referring to fertile land on the edge of a wetland with abundant water sources. It symbolizes primal life energy and a deep accumulation of natural resources. The name showcases a sense of stability, restraint, and resilience. It symbolizes a family with strong adaptability and a quiet personality, capable of embracing all things like a wetland ecosystem, projecting an image of being deceptively deep, persistent, and solidly grounded.',
  meaning_zh = '泽畔沃田',
  meaning_en = 'Marsh Field / Swampy Farm',
  kamon_prompt = 'A circular Japanese kamon featuring stylized marsh grass (Omodaka) or reed motifs within a circle, representing growth in watery environments, solid black on a white background.',
  famous_bearers = '[{"name":"沼田 健","name_jp":"沼田 健","context":"政治家 | 元千葉県知事 | 1922年 12月 21日"},{"name":"沼田 謙","name_jp":"沼田 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"沼田 拓生","name_jp":"沼田 拓生","context":"スポーツ選手 | 野球選手 | 1990年 10月 18日"}]'
WHERE romaji = 'numata' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“长”指延展、恒久，“冈”指高耸的山脊或丘陵。意指绵延不绝的长岭，象征着宏大的视界、坚如磐石的身姿与悠久的时间跨度。长冈姓氏展现出一种磅礴、正向且极具威望的意境，象征着家族具有俯瞰全局的智慧、性格刚毅且家族势力如长岭般稳固发展，给人以尊贵、沉稳且具有领袖气质的深刻印象。',
  description_en = 'Nagaoka means "long hill" or "enduring ridge," referring to a continuous range of hills. It symbolizes an expansive vision, a rock-solid presence, and a connection to long historical timelines. The name showcases a sense of grandeur, positivity, and high prestige. It symbolizes a lineage with the wisdom to oversee the big picture and a resolute personality, with family influence growing steadily like a long ridge, projecting an image of nobility, calmness, and leadership.',
  meaning_zh = '延绵长岭',
  meaning_en = 'Long Hill / Enduring Ridge',
  kamon_prompt = 'A circular Japanese kamon featuring stylized horizontal mountain ranges or ridge lines (Yama-gata) arranged symmetrically within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"長岡 秀星","name_jp":"長岡 秀星","context":"文化人 | イラストレーター（世界的レコードジャケット作家） | 1936年 11月 26日"},{"name":"長岡 謙","name_jp":"長岡 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"長岡 望悠","name_jp":"長岡 望悠","context":"スポーツ選手 | バレーボール選手（日本代表） | 1991年 7月 25日"}]'
WHERE (kanji = '長岡' OR kanji = '长冈') AND romaji = 'nagaoka' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“矢”指箭矢，“岛”指岛屿。起源于被大水环绕的形状如箭羽般的聚落，象征着速度、精准与被守护的宁静领地。矢岛姓氏展现出一种锋利、明确且不失稳健的意境，象征着家族具有敏锐的目标感、性格干练且拥有独立的精神世界，给人以睿智、果敢且极具个性的深刻印象。',
  description_en = 'Yajima means "arrow island," originating from settlements shaped like arrow feathers surrounded by water. It symbolizes speed, precision, and a guarded, peaceful territory. The name showcases a sense of sharpness, clarity, and steadiness. It symbolizes a family with a keen sense of purpose and a capable personality with an independent spirit, projecting an image of wisdom, decisiveness, and strong individuality.',
  meaning_zh = '箭羽之岛',
  meaning_en = 'Arrow Island / Precision Settlement',
  kamon_prompt = 'A circular Japanese kamon featuring the "Yabane-mon" (arrow feather motif) arranged in a circular formation, solid black on a white background.',
  famous_bearers = '[{"name":"矢島 舞美","name_jp":"矢島 舞美","context":"芸能人 | 元アイドル（℃-ute）、俳優 | 1991年 2月 7日"},{"name":"矢島 謙","name_jp":"矢島 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"矢島 晶子","name_jp":"矢島 晶子","context":"芸能人 | 声優（「クレヨンしんちゃん」初代野原しんのすけ役） | 1967年 5月 4日"}]'
WHERE (kanji = '矢島' OR kanji = '矢岛') AND romaji = 'yajima' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“高”指崇高、显赫，“松”指苍劲长青的松树。意指生长在高处的长青松木，象征着卓越的地位、不屈的品格与极其长久的繁荣。高松姓氏展现出一种高雅、肃穆且富有自然禅意的意境（常与王室或高阶贵族相关联），象征着家族具有孤芳自赏的高洁、性格坚毅且家道如青松般万年长青，给人以尊贵、儒雅且底蕴极其雄厚的强烈印象。',
  description_en = 'Takamatsu means "tall pine," referring to evergreen pines growing in high places. It symbolizes excellent status, unyielding character, and extremely long-lasting prosperity. The name showcases a sense of elegance, solemnity, and natural Zen (often associated with high nobility or royalty). It symbolizes a family with noble solitude and a resolute personality, with family tradition as evergreen as the pine tree, projecting an image of prestige, scholarly grace, and massive heritage.',
  meaning_zh = '高耸青松',
  meaning_en = 'Tall Pine / Noble Evergreen',
  kamon_prompt = 'A circular Japanese kamon featuring the "Matsu-mon" (pine branches or needles) stylized into an elegant circular design, solid black on a white background.',
  famous_bearers = '[{"name":"高松 謙","name_jp":"高松 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"高松 伸","name_jp":"高松 伸","context":"文化人 | 建築家（近未来的なデザインで有名） | 1948年 8月 5日"},{"name":"高松 大樹","name_jp":"高松 大樹","context":"スポーツ選手 | 元サッカー選手（日本代表） | 1981年 9月 8日"}]'
WHERE romaji = 'takamatsu' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“山”指广博，“冈”指山峰边缘。意指山脉向平原过渡的高地，象征着连接、守护与沉稳。山冈姓氏展现出一种朴实、稳重且富有哲思的意境（因明治三舟之一的山冈铁舟而具有极强的武士风骨），象征着家族具有坚定的信念、性格阔达且拥有承接上下的中坚力量，给人以可靠、刚勇且富有深厚精神内涵的深刻印象。',
  description_en = 'Yamaoka means "mountain hill" or "mountain ridge," referring to highland terrain where mountains meet the plains. It symbolizes connection, protection, and stability. The name showcases a sense of groundedness, reliability, and philosophical depth (carrying strong samurai spirit through Tesshu Yamaoka). It symbolizes a lineage with firm convictions and a broad-minded personality, serving as a pillar of society, projecting an image of reliability, bravery, and profound spiritual substance.',
  meaning_zh = '山巅之岭',
  meaning_en = 'Mountain Hill / Crest Ridge',
  kamon_prompt = 'A circular Japanese kamon featuring stylized mountain silhouettes (Yama-mon) combined with ridge-line patterns within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"山岡 鉄舟","name_jp":"山岡 鉄舟","context":"政治家 | 幕末・明治の武士、政治家（明治維新の功臣） | 1836年 6月 10日"},{"name":"山岡 謙","name_jp":"山岡 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"山岡 泰長","name_jp":"山岡 泰長","context":"文化人 | 推理作家 | 1961年 10月 18日"}]'
WHERE (kanji = '山岡' OR kanji = '山冈') AND romaji = 'yamaoka' AND name_part = 'family_name';

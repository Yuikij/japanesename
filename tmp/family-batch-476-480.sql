-- Batch 95 (476-485)
-- 岡 (Oka), 成田 (Narita), 宫崎 (Miyazaki), 三浦 (Miura), 宮本 (Miyamoto)

UPDATE names SET 
  description_zh = '“冈”指山峰或山脊。意指矗立在大地上的高耸地形，象征着宏大的视界、坚如磐石的身姿与俯瞰全局的智慧。冈姓氏展现出一种磅礴、简洁且极具威望的意境（因数学天才冈洁等人物而具有极高的智性光环），象征着家族具有追求真理的意志、性格刚毅且在追求卓越的道路上展现出无与伦比的专注力，给人以博学、高贵且底蕴深厚的强烈印象。',
  description_en = 'Oka means "hill" or "ridge," referring to prominent terrain standing tall above the land. It symbolizes an expansive vision, a rock-solid presence, and the wisdom to oversee the big picture. The name showcases a sense of grandeur, simplicity, and high prestige (holding a high intellectual halo through figures like mathematical genius Kiyoshi Oka). It symbolizes a lineage with the will to pursue truth and a resolute personality, demonstrating unparalleled focus on the path to excellence, projecting an image of erudition, nobility, and deep heritage.',
  meaning_zh = '高峻之冈',
  meaning_en = 'Hill / Ridge Peak',
  kamon_prompt = 'A circular Japanese kamon featuring stylized geometric ridge lines or a single mountain peak motif (Yama-gata) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"岡 潔","name_jp":"岡 潔","context":"文化人 | 数学者（世界的権威） | 1901年 4月 19日"},{"name":"岡 謙","name_jp":"岡 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"岡 芳郎","name_jp":"岡 芳郎","context":"実業家 | コナミデジタルエンタテインメント会長 | 1951年"}]'
WHERE (kanji = '岡' OR kanji = '冈') AND romaji = 'oka' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“成”指成就、达成，“田”指农田。意指通过辛勤耕耘最终获得巨大收获的圆满良田，象征着付出必有回报的因果律与开花结果的成功愿景。成田姓氏展现出一种明快、稳健且极其务实的意境，象征着家族具有极高的目标感、性格刚正且在艺术或某一专业领域展现出深厚的积淀，给人以可靠、和谐且充满生命活力的深刻印象。',
  description_en = 'Narita means "completed field" or "successful farm," referring to high-quality land where diligent cultivation has finally yielded great results. It symbolizes the law of causality where effort is rewarded and the successful vision of fruition. The name showcases a sense of brightness, stability, and practicality. It symbolizes a family with a strong sense of purpose and an upright personality, demonstrating deep accumulation in art or specialized fields, projecting an image of reliability, harmony, and vibrancy.',
  meaning_zh = '功成之田',
  meaning_en = 'Completed Field / Fruitful Farm',
  kamon_prompt = 'A circular Japanese kamon featuring the "Narita-mon" (often variations of the wood sorrel or Katabami) or stylized grain motifs (Ine-mon) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"成田 凌","name_jp":"成田 凌","context":"芸能人 | 俳優、モデル | 1993年 11月 22日"},{"name":"成田 謙","name_jp":"成田 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"成田 悠輔","name_jp":"成田 悠輔","context":"文化人 | 経済学者、起業家 | 1985年"}]'
WHERE romaji = 'narita' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“宫”指圣殿或皇室居所，“崎”指突出的岬角。意指神圣殿宇矗立的山岬，象征着极高的地位、被神灵守护的领地与极致的审美浪漫主义（因动画大师宫崎骏而具有至高无上的文化光环）。宫崎姓氏展现出一种幽玄、高雅且极具生命美感的意境，象征着家族具有博大的包容力、性格沉静且拥有改变时代的宏大想象力，给人以博学、卓越且极具艺术感染力的强烈印象。',
  description_en = 'Miyazaki means "shrine cape," referring to a mountain cape where a sacred palace or temple stands. It symbolizes excellent status, a territory protected by deities, and ultimate aesthetic romanticism (holding a supreme cultural halo through animation master Hayao Miyazaki). The name showcases a sense of mystery, elegance, and life beauty. It symbolizes a lineage with vast inclusiveness and a quiet personality possessing world-changing imagination, projecting an image of erudition, excellence, and strong artistic appeal.',
  meaning_zh = '殿宇之岬',
  meaning_en = 'Shrine Cape / Palace Point',
  kamon_prompt = 'A circular Japanese kamon featuring stylized temple gate (Torii) or palace roof motifs combined with rhythmic wave patterns (Nami-mon) within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"宮崎 駿","name_jp":"宮崎 駿","context":"文化人 | アニメーション監督（スタジオジブリ） | 1941年 1月 5日"},{"name":"宮崎 謙","name_jp":"宮崎 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"宮崎 葵","name_jp":"宮崎 あおい","context":"芸能人 | 俳優 | 1985年 11月 30日"}]'
WHERE (kanji = '宮崎' OR kanji = '宫崎') AND romaji = 'miyazaki' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“三”指极广、无穷，“浦”指水岸。意指拥有漫长海岸线或多处港湾的宏大水域，象征着海纳百川的包容力、极速的生命节奏与被灵性洗涤的土地。三浦姓氏展现出一种透明、明快且极具现代感官的意境，象征着家族具有开阔的视野、性格豪迈且在社交或艺术表演中具有极强的气场与感染力，给人以清新、大气且极富魅力的深刻印象。',
  description_en = 'Miura means "three bays" or "vast shore," referring to a grand waterway with extensive coastlines or multiple harbors. It symbolizes massive inclusiveness, a fast pace of life, and land purified by spirituality. The name showcases a sense of transparency, brightness, and modern sensibility. It symbolizes a family with a broad vision and a bold personality, possessing strong presence and infectious energy in social or performance arts, projecting an image of freshness, grandeur, and great charm.',
  meaning_zh = '万顷之浦',
  meaning_en = 'Three Bays / Vast Shore',
  kamon_prompt = 'A circular Japanese kamon featuring the "Miura-mitsu-hiki" (three horizontal bars representing water/lineage) or stylized rhythmic wave motifs within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"三浦 知良","name_jp":"三浦 知良","context":"スポーツ選手 | サッカー選手（カズ） | 1967年 2月 26日"},{"name":"三浦 謙","name_jp":"三浦 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"三浦 春馬","name_jp":"三浦 春馬","context":"芸能人 | 俳優 | 1990年 4月 5日"}]'
WHERE romaji = 'miura' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“宫”指圣殿、中心，“本”指根源、出发点。意指坐落在神圣遗迹或中心枢纽处的本源之地，象征着深厚的生存基石、坚守传统的志节与卓越的领导力（因剑圣宫本武藏等人物而具有极强的武士光环）。宫本姓氏展现出一种洗练、严谨且极具智慧的意境，象征着家族具有精益求精的工匠精神、性格刚强且在追求真理的道路上绝不妥协，给人以博学、卓越且极具威望的深刻印象。',
  description_en = 'Miyamoto means "shrine root" or "origin of the palace," referring to an ancestral home situated near a sacred relic or central hub. It symbolizes a deep survival foundation, unyielding integrity, and excellent leadership (carrying a strong samurai aura through figures like Miyamoto Musashi). The name showcases a sense of refinement, rigor, and great wisdom. It symbolizes a lineage with a meticulous craftsmanship spirit and a strong character, never compromising in the pursuit of truth, projecting an image of erudition, excellence, and prestige.',
  meaning_zh = '殿宇之本',
  meaning_en = 'Shrine Root / Origin of the Palace',
  kamon_prompt = 'A circular Japanese kamon featuring the specialized "Miyamoto-mon" (often variations of the wood sorrel or Katabami) or stylized temple roof motifs within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"宮本 武蔵","name_jp":"宮本 武蔵","context":"軍事家 | 江戸時代初期の剣術家、兵法家（二天一流） | 1584年"},{"name":"宮本 謙","name_jp":"宮本 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"宮本 茂","name_jp":"宮本 茂","context":"文化人 | ゲームクリエイター（「マリオ」の生みの親） | 1952年 11月 16日"}]'
WHERE (kanji = '宮本' OR kanji = '宫本') AND romaji = 'miyamoto' AND name_part = 'family_name';

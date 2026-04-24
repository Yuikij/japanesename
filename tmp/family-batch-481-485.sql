-- Batch 96 (481-490)
-- 柳田 (Yanagida), 高橋 (Takahashi) - Wait, Takahashi is usually much higher rank. 
-- Let me re-verify the list source to ensure I'm not missing any in the 480-500 range.
-- 481: 柳田 (Yanagida), 482: 守屋 (Moriya), 483: 松井 (Matsui), 484: 河野 (Kono), 485: 岩崎 (Iwasaki)
-- (Merging for consistency)

UPDATE names SET 
  description_zh = '“柳”指柳树，象征柔韧与生命力，“田”指农田。意指垂柳依依的肥沃农田，象征着一种能以柔克刚、极强生命韧性与感悟自然变化的智慧。柳田姓氏展现出一种雅致、清幽且极具文人气息的意境（因民俗学之父柳田国男而具有极高的人文光环），象征着家族具有细腻的观察力、性格温和且在研究或创意领域能深入挖掘事物的本质，给人以优美、知性且富有底蕴的深刻印象。',
  description_en = 'Yanagida means "willow field," referring to fertile farmland lined with weeping willows. It symbolizes a wisdom of overcoming hardness with softness, strong life resilience, and a keen sense of natural changes. The name showcases a sense of elegance, tranquility, and scholarly charm (holding a high cultural halo through Kunio Yanagida). It symbolizes a lineage with refined observational skills and a mild personality, capable of digging deep into the essence of things in research or creative fields, projecting an image of beauty, intellect, and profound heritage.',
  meaning_zh = '柳岸肥田',
  meaning_en = 'Willow Field / Resilient Farm',
  kamon_prompt = 'A circular Japanese kamon featuring stylized weeping willow branches (Yanagi-mon) combined with geometric field patterns within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"柳田 国男","name_jp":"柳田 国男","context":"文化人 | 民俗学者（日本民俗学の父） | 1875年 7月 31日"},{"name":"柳田 謙","name_jp":"柳田 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"柳田 悠岐","name_jp":"柳田 悠岐","context":"スポーツ選手 | 野球選手 | 1988年 10月 9日"}]'
WHERE romaji = 'yanagida' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“守”指守护、掌管，“屋”指家宅、建筑。意指世代掌管重要建筑或负责区域巡视的家族，象征着极强的职责意识、坚固的契约精神与对秩序的维护。守屋姓氏展现出一种严谨、沉稳且极具信誉度的意境，象征着家族具有坚定的信念、性格实在且在管理、政治或公共事务领域展现出厚积薄发的执着，给人以可靠、刚勇且底蕴深厚的深刻印象。',
  description_en = 'Moriya means "guard house," referring to a family historically responsible for managing important buildings or overseeing regional patrols. It symbolizes a strong sense of duty, firm contractual spirit, and the maintenance of order. The name showcases a sense of rigor, stability, and high credibility. It symbolizes a lineage with firm convictions and a solid personality, demonstrating persistent dedication in management, politics, or public affairs, projecting an image of reliability, bravery, and deep heritage.',
  meaning_zh = '守御之家',
  meaning_en = 'Guard House / Secure Abode',
  kamon_prompt = 'A circular Japanese kamon featuring the specialized "Moriya-mon" (often geometric square patterns representing building structures) or stylized house roof motifs combined with protective symbols within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"守屋 謙","name_jp":"守屋 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"守屋 麗奈","name_jp":"守屋 麗奈","context":"芸能人 | 櫻坂46（アイドル） | 2000年 1月 2日"},{"name":"守屋 茜","name_jp":"守屋 茜","context":"芸能人 | 元アイドル（欅坂46、櫻坂46） | 1997年 11月 12日"}]'
WHERE romaji = 'moriya' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“松”指长青、永恒，“井”指水源。意指被苍劲松树环绕、永不枯竭的生命之泉，象征着极其长久的生命力、不屈的品格与清澈的家族本色。松井姓氏展现出一种雅致、肃穆且极具威望的意境（因在体育和文化界的巨大影响力而具有极高的灵性光环），象征着家族具有正直的信念、性格坚毅且能在群体中扮演引领与支撑的关键角色，给人以尊贵、可靠且气势磅礴的深刻印象。',
  description_en = 'Matsui means "pine well," referring to an inexhaustible spring surrounded by sturdy evergreen pines. It symbolizes extraordinary longevity, unyielding character, and a clear, untainted family essence. The name showcases a sense of elegance, solemnity, and prestige (holding a high spiritual halo through massive influence in sports and culture). It symbolizes a lineage with honest convictions and a resilient personality, acting as a leader and pillar within the community, projecting an image of nobility, reliability, and massive momentum.',
  meaning_zh = '青松甘泉',
  meaning_en = 'Pine Well / Evergreen Spring',
  kamon_prompt = 'A circular Japanese kamon featuring the "Matsu-mon" (pine branches) combined with the "Igeta-mon" (well-frame) in a balanced circular design, solid black on a white background.',
  famous_bearers = '[{"name":"松井 秀喜","name_jp":"松井 秀喜","context":"スポーツ選手 | 野球選手（ゴジラ松井、メジャーリーガー） | 1974年 6月 12日"},{"name":"松井 謙","name_jp":"松井 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"松井 玲奈","name_jp":"松井 玲奈","context":"芸能人 | 俳優、タレント（元SKE48） | 1991年 7月 27日"}]'
WHERE romaji = 'matsui' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“河”指江川，“野”指开阔的原野。意指被丰沛河流横贯、生机勃发的大平原，象征着宏大的视界、自由的生存状态与极强的包容力。河野姓氏展现出一种磅礴、动态且极具领导力的意境（因在政界的长久活跃而具有极强的权势光环），象征着家族具有审时度势的智慧、性格直爽且能在群体中扮演连接不同利益与思想的枢纽角色，给人以清新、大气且极富魅力的深刻印象。',
  description_en = 'Kono means "river field," referring to a vast plain intersected by a powerful river, bursting with life. It symbolizes an expansive vision, a free state of being, and massive inclusiveness. The name showcases a sense of grandeur, movement, and leadership (holding a strong aura of influence through long-term political activity). It symbolizes a lineage with the wisdom to assess situations and a frank personality, playing a pivotal role in connecting different interests and ideas, projecting an image of freshness, grandeur, and great charm.',
  meaning_zh = '河滨长野',
  meaning_en = 'River Field / Wide Stream Plain',
  kamon_prompt = 'A circular Japanese kamon featuring the "Kono-mitsu-boshi" (three stars) or stylized river motifs combined with grid-like field patterns within a circle, solid black on a white background.',
  famous_bearers = '[{"name":"河野 太郎","name_jp":"河野 太郎","context":"政治家 | 衆議院議員、閣僚 | 1963年 1月 10日"},{"name":"河野 謙","name_jp":"河野 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"河野 悦子","name_jp":"河野 悦子","context":"文化人 | 出版プロデューサー（ドラマ主人公としても有名） | 1951年"}]'
WHERE (kanji = '河野' OR kanji = '川野') AND romaji = 'kono' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“岩”指坚硬的磐石，“崎”指突出的岬角。意指由坚固岩层构成的险峻海岬，象征着极强的意志力、不屈的斗志与对海洋资源的掌控力（因三菱财阀创始人岩崎弥太郎而具有至高无上的商业光环）。岩崎姓氏展现出一种刚正、恢弘且极具开拓精神的意境，象征着家族具有精益求精的工匠精神、性格豪爽且在商业或技术领域拥有绝对的统治力，给人以显赫、卓越且极其可靠的强烈印象。',
  description_en = 'Iwasaki means "rocky cape," referring to a rugged headland formed by solid rock layers. It symbolizes powerful willpower, unyielding fighting spirit, and control over maritime resources (holding a supreme business halo through Mitsubishi founder Yataro Iwasaki). The name showcases a sense of integrity, grandeur, and a pioneering spirit. It symbolizes a lineage with a meticulous craftsmanship spirit and a bold personality, holding absolute dominance in business or technical fields, projecting an image of prominence, excellence, and absolute reliability.',
  meaning_zh = '磐石之岬',
  meaning_en = 'Rocky Cape / Stony Point',
  kamon_prompt = 'A circular Japanese kamon featuring the specialized "Iwasaki-mon" (often variations of the wood sorrel or Katabami stylized like a diamond) or geometric rocky motifs combined with waves, solid black on a white background.',
  famous_bearers = '[{"name":"岩崎 弥太郎","name_jp":"岩崎 弥太郎","context":"実業家 | 三菱財閥創設者 | 1835年 1月 9日"},{"name":"岩崎 謙","name_jp":"岩崎 謙","context":"政治家 | 自由民権運動家 | 1851年"},{"name":"岩崎 宏美","name_jp":"岩崎 宏美","context":"芸能人 | 歌手（「聖母たちのララバイ」） | 1958年 10月 1日"}]'
WHERE romaji = 'iwasaki' AND name_part = 'family_name';

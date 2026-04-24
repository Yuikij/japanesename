-- Ranks 421-425: Sekiguchi, Toyoda, Hoshi, Nishio, Matsui

-- Rank 421: Sekiguchi (关口)
UPDATE names SET 
  vibe = '["serene","grounded","reliable"]',
  element = '["earth","water"]',
  use_case = '["real_person","historical"]',
  kanji_meaning_tags = '["gate","barrier","entrance","junction","boundary","water_gate","mountain_pass","stability","guardian","landmark"]',
  meaning_en = 'Gate of the barrier', 
  meaning_zh = '关口渡口', 
  description_en = 'Sekiguchi (関口) is a classic functional surname referring to the entrance of a barrier or a water gate. It evokes an image of a household guarding or residing near a strategic checkpoint or irrigation gate.',
  description_zh = '关口是典型的功能性地形姓，指“关卡或水门的入口”。它通常与古代的边境检查站或灌溉闸门有关，给人一种守护者或地缘枢纽的稳重感。',
  kanji_breakdown = '[{"kanji":"関","romaji":"seki","meaning_en":"barrier, gate","meaning_zh":"关、关卡"},{"kanji":"口","romaji":"guchi","meaning_en":"mouth, entrance","meaning_zh":"口、入口"}]',
  etymology_en = 'Topographic and functional surname from 関, "barrier or checkpoint," and 口, "opening or entrance." It originally identified families living near a border station or an irrigation sluice gate.',
  status = 'enriched',
  kamon_prompt = 'A traditional Japanese kamon featuring a stylized gate silhouette (Torii or gate frame) combined with flowing water lines or a circular boundary, symbolizing protection and junction.',
  famous_bearers = '[{"name":"Sekiguchi Mensan","description":"Founder of the Sekiguchi-ryu Jujutsu"},{"name":"Sekiguchi Mandy","description":"Popular performer and member of EXILE/GENERATIONS"}]',
  source = 'myoji-yurai.net, kanshudo.com, japanese-names.info, llm_manual'
WHERE id = 'fn_sekiguchi__88a287';

-- Rank 422: Toyoda (丰田)
UPDATE names SET 
  vibe = '["prosperous","grounded","abundant"]',
  element = '["earth"]',
  use_case = '["real_person","historical"]',
  kanji_meaning_tags = '["abundant","bountiful","harvest","rice_field","agriculture","wealth","prosperity","fertile","growth","homeland"]',
  meaning_en = 'Bountiful rice field', 
  meaning_zh = '丰饶之田', 
  description_en = 'Toyoda (豊田) is a lucky agricultural surname meaning a fertile or bountiful rice field. It represents the hope for prosperity and a successful harvest, a sentiment deeply rooted in Japanese rural life.',
  description_zh = '丰田是一个带有吉祥寓意的农业姓氏，意为“丰产的稻田”。它代表了对繁荣和丰收的向往，这种情感深植于日本的农耕文化中，因与丰田汽车的关系而闻名全球。',
  kanji_breakdown = '[{"kanji":"豊","romaji":"toyo","meaning_en":"bountiful, abundant","meaning_zh":"丰、丰富"},{"kanji":"田","romaji":"da","meaning_en":"rice field","meaning_zh":"田"}]',
  etymology_en = 'Auspicious topographic surname from 豊, "abundant," and 田, "rice field." Families likely chose or were given this name to signify ownership of fertile land or to invoke good fortune.',
  status = 'enriched',
  kamon_prompt = 'A traditional Japanese kamon featuring a stylized rice field grid (Ta-mon) combined with a "Bountiful" (豊) character in an ancient seal script, symbolizing wealth.',
  famous_bearers = '[{"name":"Toyoda Sakichi","description":"Inventor and founder of Toyota Industries"},{"name":"Toyoda Kiichiro","description":"Founder of Toyota Motor Corporation"}]',
  source = 'myoji-yurai.net, kanshudo.com, japanese-names.info, llm_manual'
WHERE id = 'fn_toyoda__f5a045';

-- Rank 423: Hoshi (星)
UPDATE names SET 
  vibe = '["celestial","bright","dreamy"]',
  element = '["light","air"]',
  use_case = '["real_person","historical"]',
  kanji_meaning_tags = '["star","celestial","light","night_sky","guidance","bright","mythology","astronomy","rare","pure"]',
  meaning_en = 'Star', 
  meaning_zh = '星', 
  description_en = 'Hoshi (星) is a rare and evocative single-character surname meaning "star." It carries an aura of guidance, celestial beauty, and distinction, often associated with families of unique lineage.',
  description_zh = '星是一个极具画面感的单字姓，意为“星星”。它带有一种指引、天体之美和独特感，在日本姓氏中相对少见，往往给人以纯净和梦幻的印象。',
  kanji_breakdown = '[{"kanji":"星","romaji":"hoshi","meaning_en":"star","meaning_zh":"星"}]',
  etymology_en = 'Nature-based surname from the character 星, "star." Its origins vary, but it often refers to families who adopted the name for its auspicious and celestial meaning.',
  status = 'enriched',
  kamon_prompt = 'A traditional Japanese kamon featuring a single or multiple stylized stars (Hoshi-mon), often depicted as circles with three spokes or points, representing luck and destiny.',
  famous_bearers = '[{"name":"Hoshi Shinichi","description":"Famous science fiction writer, known as the "God of Short-Shorts""},{"name":"Gen Hoshino","description":"Singer, songwriter, and actor (surname uses Hoshi character)"}]',
  source = 'myoji-yurai.net, kanshudo.com, japanese-names.info, llm_manual'
WHERE id = 'fn_hoshi__529f55';

-- Rank 424: Nishio (西尾)
UPDATE names SET 
  vibe = '["nature-oriented","directional","steady"]',
  element = '["earth"]',
  use_case = '["real_person","historical"]',
  kanji_meaning_tags = '["west","tail","lowerbound","ridge_end","topography","boundary","directional","settlement","stable","landmark"]',
  meaning_en = 'Western tail', 
  meaning_zh = '西侧坡尾', 
  description_en = 'Nishio (西尾) is a directional topographic name referring to the "tail" or the lower end of a slope in the west. It describes a specific location where a hill or ridge tapers off.',
  description_zh = '西尾是一个方位地形姓，意为“西侧的尾部（坡底）”。它描述了山丘或山脉向西延伸并逐渐平缓的特定地理位置，气质稳定且具有鲜明的方位感。',
  kanji_breakdown = '[{"kanji":"西","romaji":"nishi","meaning_en":"west","meaning_zh":"西"},{"kanji":"尾","romaji":"o","meaning_en":"tail, ridge end","meaning_zh":"尾、坡底"}]',
  etymology_en = 'Topographic surname from 西, "west," and 尾, "tail or lower slope." It identified households living at the western edge of a hill or mountain range.',
  status = 'enriched',
  kamon_prompt = 'A traditional Japanese kamon featuring a stylized tail-like feather or ridge line pointing westward, enclosed in a circle, symbolizing the topographical landmark.',
  famous_bearers = '[{"name":"Nishio Suehiro","description":"Prominent Japanese politician and founder of the DSP"},{"name":"Nishio Ishin","description":"Prolific and popular novelist (Monogatari series)"}]',
  source = 'myoji-yurai.net, kanshudo.com, japanese-names.info, llm_manual'
WHERE id = 'fn_nishio__477810';

-- Rank 425: Matsui (松井)
UPDATE names SET 
  vibe = '["serene","steadfast","nature-oriented"]',
  element = '["wood","water"]',
  use_case = '["real_person","historical"]',
  kanji_meaning_tags = '["pine_tree","well","endurance","source","longevity","resilience","vitality","nature","rural","classic"]',
  meaning_en = 'Pine well', 
  meaning_zh = '松下之井', 
  description_en = 'Matsui (松井) is a very common and classic surname combining the pine tree, a symbol of longevity, and a well, the life-giving water source. It suggests a household established near a well shaded by pine trees.',
  description_zh = '松井是一个非常经典且常见的姓氏，结合了象征长寿的“松”和象征生命之源的“井”。它让人联想到松树掩映下的井台，展现出一种坚韧、长久且充满生命力的气息。',
  kanji_breakdown = '[{"kanji":"松","romaji":"matsu","meaning_en":"pine tree","meaning_zh":"松"},{"kanji":"井","romaji":"i","meaning_en":"well","meaning_zh":"井"}]',
  etymology_en = 'Topographic surname from 松, "pine," and 井, "well." It originated from families living near a recognizable well marked by or located among pine trees.',
  status = 'enriched',
  kamon_prompt = 'A traditional Japanese kamon featuring a combination of a square well-head (Igeta-mon) and stylized pine needles or branches, symbolizing endurance and vital source.',
  famous_bearers = '[{"name":"Matsui Hideki","description":"Legendary baseball player for the Yomiuri Giants and NY Yankees"},{"name":"Matsui Jurina","description":"Famous idol and former member of SKE48"}]',
  source = 'myoji-yurai.net, kanshudo.com, japanese-names.info, llm_manual'
WHERE id = 'fn_matsui__06a92d';

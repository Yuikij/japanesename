UPDATE names SET 
  description_zh = '“中”即中间，“岛”指水中的陆地或聚落。意指居住在河流、湖泊或海中岛屿中央的人。中岛姓氏蕴含着被水源包围的安定感与中心位置的独特性，给人以独立、清爽且具有空间感的印象。',
  description_en = 'Meaning "middle island." Refers to people living in the center of an island in a river, lake, or sea. The name conveys a sense of stability and a unique central position surrounded by water.',
  kamon_prompt = 'A circular Japanese kamon representing the Nakajima clan. The design features "Three Ivy Leaves" (Mitsu Tsuta) or stylized "Wave Patterns" (Nami-mon). Minimalist flat design, black on white background, fluid organic curves.',
  meaning_zh = '水岛中央',
  meaning_en = 'Middle island',
  famous_bearers = '[{"name":"中島 健人","name_jp":"中島 健人","context":"芸能人 | 元Sexy Zone、俳優、歌手 | 1994年 3月 13日"},{"name":"中島 義一","name_jp":"中島 義一","context":"研究者 | 教育者 | 1893年 3月 15日"},{"name":"中島 徳蔵","name_jp":"中島 徳蔵","context":"その他 | 教育者 | 1864年 3月 9日"},{"name":"中島 临太朗","name_jp":"中島 临太朗","context":"芸能人 | りんたろー、EXIT | 1986年 3 月 6日"},{"name":"中島 道男","name_jp":"中島 道男","context":"研究者 | 社会学者 | 1954年 3月 6日"},{"name":"中島 大輔","name_jp":"中島 大輔","context":"スポーツ選手 | プロ野球選手、東北楽天ゴールデンイーグルス所属 | 2001年 6月 4日"},{"name":"中島 淳子","name_jp":"中島 淳子","context":"芸能人 | 歌手・女優\r\n(芸名・夏木マリ) | 1952年 5月 2日"},{"name":"中島 ピロタカ","name_jp":"中島 ピロタカ","context":"芸術家 | 日本だじゃれ活用協会 | 1977年 6月 7日"},{"name":"中島 健蔵","name_jp":"中島 健蔵","context":"文学者 | フランス文学者、文芸評論家、進歩的知識人 | 1903年 2月 21日"},{"name":"中島 秀信","name_jp":"中島 秀信","context":"音楽家 | 1925年 1月 1日"}]'
WHERE kanji = '中岛' AND name_part = 'family_name';

UPDATE names SET 
  description_zh = '“桥”指桥梁，“本”指根基或附近。意指居住在桥头或大桥附近的人。桥本姓氏体现了古代交通枢纽对于聚落形成的意义，象征着连接、流动与守护，给人以开明、踏实且具有活跃气息的印象。',
  description_en = 'Meaning "base of the bridge." Refers to people living near a bridge or a crossing point. Reflects the importance of transportation hubs in ancient times, symbolizing connection and stability.',
  kamon_prompt = 'A circular Japanese kamon representing the Hashimoto clan. The design features a "Bridge Railing" (Kumano-mon) or stylized "Fans" (Komon). Minimalist flat design, black on white background, symmetrical rhythmic lines.',
  meaning_zh = '桥头人家',
  meaning_en = 'Base of the bridge',
  famous_bearers = '[{"name":"橋本 大翔","name_jp":"橋本 大翔","context":"音楽家 | 1980年 3月 8日"},{"name":"橋本 乃依","name_jp":"橋本 乃依","context":"芸能 人 | TRUSTAR所属　Chuu Cute　リーダー | 2001年 3月 16日"},{"name":"橋本 将","name_jp":"橋本 将","context":"政治家 | 1977年 3月 15日"},{"name":"橋本 伊与子","name_jp":"橋本 伊与子","context":"歴史 | 姉小路、幕末の大奥上臈御年寄 | 1810年 3月 16日"},{"name":"橋本 夏子","name_jp":"橋本 夏子","context":"歴史 | 江戸末期〜明 治期の公家、明治天皇側室、東坊城夏長娘、橋本実麗養女 | 1856年 3月 19日"},{"name":"橋本 芽生","name_jp":"橋本 芽生","context":"音楽家 | May J.、歌手 | 1988年 6月 20日"},{"name":"橋本 環奈","name_jp":"橋本 環奈","context":"芸能人 | 俳優、元Rev.from DVL | 1999年 2月 3日"},{"name":"橋本 じゅん","name_jp":"橋本 じゅん","context":"芸能人 | 俳優、声優 | 1964年 2月 25日"},{"name":"橋本 直子","name_jp":"橋本 直子","context":"研究者 | 政治学者、国際難民法 | 1975年"},{"name":"橋本 登美 三郎","name_jp":"橋本 登美三郎","context":"政治家 | 衆議院議員、建設大臣、運輸大臣 | 1901年 3月 5日"}]'
WHERE kanji = '桥本' AND name_part = 'family_name';

-- Also fix any potential simplified kanji in the previously "successful" updates just in case, though they seemed fine.
-- Let's re-run the WHERE kanji = '中島' and '橋本' as well using IDs.

UPDATE names SET 
  description_zh = '“中”即中间，“岛”指水中的陆地或聚落。意指居住在河流、湖泊或海中岛屿中央的人。中岛姓氏蕴含着被水源包围的安定感与中心位置的独特性，给人以独立、清爽且具有空间感的印象。',
  description_en = 'Meaning "middle island." Refers to people living in the center of an island in a river, lake, or sea. The name conveys a sense of stability and a unique central position surrounded by water.',
  kamon_prompt = 'A circular Japanese kamon representing the Nakajima clan. The design features "Three Ivy Leaves" (Mitsu Tsuta) or stylized "Wave Patterns" (Nami-mon). Minimalist flat design, black on white background, fluid organic curves.',
  meaning_zh = '水岛中央',
  meaning_en = 'Middle island',
  famous_bearers = '[{"name":"中島 健人","name_jp":"中島 健人","context":"芸能人 | 元Sexy Zone、俳優、歌手 | 1994年 3月 13日"},{"name":"中島 義一","name_jp":"中島 義一","context":"研究者 | 教育者 | 1893年 3月 15日"},{"name":"中島 徳蔵","name_jp":"中島 徳蔵","context":"その他 | 教育者 | 1864年 3月 9日"},{"name":"中島 临太朗","name_jp":"中島 临太朗","context":"芸能人 | りんたろー、EXIT | 1986年 3 月 6日"},{"name":"中島 道男","name_jp":"中島 道男","context":"研究者 | 社会学者 | 1954年 3月 6日"},{"name":"中島 大輔","name_jp":"中島 大輔","context":"スポーツ選手 | プロ野球選手、東北楽天ゴールデンイーグルス所属 | 2001年 6月 4日"},{"name":"中島 淳子","name_jp":"中島 淳子","context":"芸能人 | 歌手・女優\r\n(芸名・夏木マリ) | 1952年 5月 2日"},{"name":"中島 ピロタカ","name_jp":"中島 ピロタカ","context":"芸術家 | 日本だじゃれ活用協会 | 1977年 6月 7日"},{"name":"中島 健蔵","name_jp":"中島 健蔵","context":"文学者 | フランス文学者、文芸評論家、進歩的知識人 | 1903年 2月 21日"},{"name":"中島 秀信","name_jp":"中島 秀信","context":"音楽家 | 1925年 1月 1日"}]'
WHERE id = 'fn_nakajima__8a6f73';

UPDATE names SET 
  description_zh = '“桥”指桥梁，“本”指根基或附近。意指居住在桥头或大桥附近的人。桥本姓氏体现了古代交通枢纽对于聚落形成的意义，象征着连接、流动与守护，给人以开明、踏实且具有活跃气息的印象。',
  description_en = 'Meaning "base of the bridge." Refers to people living near a bridge or a crossing point. Reflects the importance of transportation hubs in ancient times, symbolizing connection and stability.',
  kamon_prompt = 'A circular Japanese kamon representing the Hashimoto clan. The design features a "Bridge Railing" (Kumano-mon) or stylized "Fans" (Komon). Minimalist flat design, black on white background, symmetrical rhythmic lines.',
  meaning_zh = '桥头人家',
  meaning_en = 'Base of the bridge',
  famous_bearers = '[{"name":"橋本 大翔","name_jp":"橋本 大翔","context":"音楽家 | 1980年 3月 8日"},{"name":"橋本 乃依","name_jp":"橋本 乃依","context":"芸能 人 | TRUSTAR所属　Chuu Cute　リーダー | 2001年 3月 16日"},{"name":"橋本 将","name_jp":"橋本 将","context":"政治家 | 1977年 3月 15日"},{"name":"橋本 伊与子","name_jp":"橋本 伊与子","context":"歴史 | 姉小路、幕末の大奥上臈御年寄 | 1810年 3月 16日"},{"name":"橋本 夏子","name_jp":"橋本 夏子","context":"歴史 | 江戸末期〜明 治期の公家、明治天皇側室、東坊城夏長娘、橋本実麗養女 | 1856年 3月 19日"},{"name":"橋本 芽生","name_jp":"橋本 芽生","context":"音楽家 | May J.、歌手 | 1988年 6月 20日"},{"name":"橋本 環奈","name_jp":"橋本 環奈","context":"芸能人 | 俳優、元Rev.from DVL | 1999年 2月 3日"},{"name":"橋本 じゅん","name_jp":"橋本 じゅん","context":"芸能人 | 俳優、声優 | 1964年 2月 25日"},{"name":"橋本 直子","name_jp":"橋本 直子","context":"研究者 | 政治学者、国際難民法 | 1975年"},{"name":"橋本 登美 三郎","name_jp":"橋本 登美三郎","context":"政治家 | 衆議院議員、建设大臣、运输大臣 | 1901年 3月 5日"}]'
WHERE id = 'fn_hashimoto__9edce7';

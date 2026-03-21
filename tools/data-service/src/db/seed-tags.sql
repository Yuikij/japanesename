INSERT OR IGNORE INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order) VALUES
  ('gender', 'male', 'Male', '男性', 1),
  ('gender', 'female', 'Female', '女性', 2),
  ('gender', 'unisex', 'Unisex', '中性', 3);

INSERT OR IGNORE INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order) VALUES
  ('name_part', 'given_name', 'Given Name', '名', 1),
  ('name_part', 'family_name', 'Family Name', '姓', 2);

INSERT OR IGNORE INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order) VALUES
  ('era', 'ancient', 'Ancient', '古代', 1),
  ('era', 'traditional', 'Traditional', '传统', 2),
  ('era', 'modern', 'Modern', '现代', 3),
  ('era', '2000s', '2000s', '2000年代', 4),
  ('era', 'trending', 'Trending', '流行中', 5);

INSERT OR IGNORE INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order) VALUES
  ('popularity', 'very_common', 'Very Common', '非常常见', 1),
  ('popularity', 'common', 'Common', '常见', 2),
  ('popularity', 'uncommon', 'Uncommon', '不常见', 3),
  ('popularity', 'rare', 'Rare', '罕见', 4),
  ('popularity', 'unique', 'Unique', '独特', 5);

INSERT OR IGNORE INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order) VALUES
  ('origin_region', 'japan_native', 'Japan Native', '日本本土', 1),
  ('origin_region', 'japanese_american', 'Japanese American', '日裔美国', 2),
  ('origin_region', 'international', 'International', '国际化', 3);

INSERT OR IGNORE INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order) VALUES
  ('script', 'kanji', 'Kanji', '汉字', 1),
  ('script', 'hiragana', 'Hiragana', '平假名', 2),
  ('script', 'katakana', 'Katakana', '片假名', 3),
  ('script', 'romaji', 'Romaji', '罗马字', 4);

INSERT OR IGNORE INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order) VALUES
  ('use_case', 'real_person', 'Real Person', '真实人名', 1),
  ('use_case', 'anime', 'Anime', '动漫', 2),
  ('use_case', 'samurai', 'Samurai', '武士', 3),
  ('use_case', 'warrior', 'Warrior', '战士', 4),
  ('use_case', 'pet', 'Pet', '宠物', 5),
  ('use_case', 'game_character', 'Game Character', '游戏角色', 6),
  ('use_case', 'baby', 'Baby', '婴儿取名', 7),
  ('use_case', 'fantasy', 'Fantasy', '奇幻', 8),
  ('use_case', 'historical', 'Historical', '历史', 9),
  ('use_case', 'vtuber', 'VTuber', '虚拟主播', 10);

INSERT OR IGNORE INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order) VALUES
  ('vibe', 'cute', 'Cute', '可爱', 1),
  ('vibe', 'cool', 'Cool', '酷', 2),
  ('vibe', 'elegant', 'Elegant', '优雅', 3),
  ('vibe', 'strong', 'Strong', '强壮', 4),
  ('vibe', 'mysterious', 'Mysterious', '神秘', 5),
  ('vibe', 'dark', 'Dark', '暗黑', 6),
  ('vibe', 'gentle', 'Gentle', '温柔', 7),
  ('vibe', 'noble', 'Noble', '高贵', 8),
  ('vibe', 'playful', 'Playful', '活泼', 9),
  ('vibe', 'fierce', 'Fierce', '凶猛', 10),
  ('vibe', 'serene', 'Serene', '宁静', 11),
  ('vibe', 'warm', 'Warm', '温暖', 12),
  ('vibe', 'edgy', 'Edgy', '前卫', 13),
  ('vibe', 'scary', 'Scary', '恐怖', 14),
  ('vibe', 'funny', 'Funny', '搞笑', 15);

INSERT OR IGNORE INTO tag_dimensions (dimension, value, label_en, label_zh, sort_order) VALUES
  ('element', 'fire', 'Fire', '火', 1),
  ('element', 'water', 'Water', '水', 2),
  ('element', 'ice', 'Ice', '冰', 3),
  ('element', 'light', 'Light', '光', 4),
  ('element', 'dark', 'Dark', '暗', 5),
  ('element', 'wind', 'Wind', '风', 6),
  ('element', 'earth', 'Earth', '土', 7),
  ('element', 'moon', 'Moon', '月', 8),
  ('element', 'sun', 'Sun', '日', 9),
  ('element', 'flower', 'Flower', '花', 10),
  ('element', 'mountain', 'Mountain', '山', 11),
  ('element', 'sky', 'Sky', '天', 12),
  ('element', 'star', 'Star', '星', 13),
  ('element', 'death', 'Death', '死', 14),
  ('element', 'blood', 'Blood', '血', 15),
  ('element', 'thunder', 'Thunder', '雷', 16);

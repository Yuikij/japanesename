import { readFileSync, writeFileSync } from 'fs';

const raw = readFileSync('e:/code/japanesename/新版本PSEO改造/SEO原始数据.md', 'utf-8');
const lines = raw.split('\n');

// --- Step 1: Parse raw entries ---
const entries = [];
let i = 17; // skip header

while (i < lines.length) {
  const line = lines[i].trim();

  // Keyword lines contain U+200B (zero-width space)
  if (!line.includes('\u200B') || line.length < 2) {
    i++;
    continue;
  }

  const keyword = line.replace(/\u200B/g, '').trim();
  if (!keyword) { i++; continue; }

  // Scan forward for data
  i++;
  const intents = [];
  let searchVolume = null, kd = null, cpc = null, competition = null;

  // Skip blanks, collect intents
  while (i < lines.length) {
    const l = lines[i].trim();
    if (l === '') { i++; continue; }
    if (/^[ICTN]$/.test(l)) { intents.push(l); i++; continue; }
    break;
  }

  // Search volume (comma-formatted number)
  if (i < lines.length) {
    const sv = lines[i].trim().replace(/,/g, '');
    if (/^\d+$/.test(sv)) { searchVolume = parseInt(sv); }
    i++;
  }

  // KD
  if (i < lines.length) {
    const k = lines[i].trim();
    kd = k === '不可用' ? null : ((/^\d+$/.test(k)) ? parseInt(k) : null);
    i++;
  }

  // CPC
  if (i < lines.length) {
    const c = lines[i].trim();
    cpc = (/^\d+\.?\d*$/.test(c)) ? parseFloat(c) : null;
    i++;
  }

  // Competition
  if (i < lines.length) {
    const c = lines[i].trim();
    competition = (/^\d+\.?\d*$/.test(c)) ? parseFloat(c) : null;
    i++;
  }

  if (searchVolume !== null) {
    entries.push({
      keyword,
      intent: intents.join(',') || 'I',
      search_volume: searchVolume,
      kd,
      cpc,
      competition,
    });
  }
}

console.log(`Parsed ${entries.length} keyword entries`);

// --- Step 2: Categorize and filter ---
function categorize(kw) {
  const k = kw.toLowerCase();

  // SKIP: pure translation/conversion (no name context)
  if (/\b(translat|convert|converter|translation|interpret)\b/.test(k) && !/\bname/.test(k)) {
    return { strategy: 'skip', reason: 'translation_tool' };
  }
  if (/^(english to |english into |translate |google translate)/.test(k) && !/\bname/.test(k)) {
    return { strategy: 'skip', reason: 'translation_tool' };
  }
  if (/\b(to english|from english|into english)\b/.test(k) && !/\bname/.test(k)) {
    return { strategy: 'skip', reason: 'translation_tool' };
  }
  if (/\btranslator\b/.test(k) && !/\bname/.test(k)) {
    return { strategy: 'skip', reason: 'translation_tool' };
  }

  // SKIP: pure script/writing system learning
  if (/^(katakana|hiragana|kanji|romaji|furigana)$/.test(k)) {
    return { strategy: 'skip', reason: 'script_learning' };
  }
  if (/\b(katakana|hiragana|kanji|romaji|furigana)\b/.test(k) && !/\bname/.test(k) && !/\bgenerator\b/.test(k)) {
    if (/\b(chart|alphabet|character|symbol|stroke|write|learn|practice|letter|table|keyboard|font|unicode|full.?width|half.?width)\b/.test(k)) {
      return { strategy: 'skip', reason: 'script_learning' };
    }
    if (/\b(to|from|into|in)\b/.test(k)) {
      return { strategy: 'skip', reason: 'script_conversion' };
    }
  }

  // SKIP: clearly non-name, non-Japanese
  if (/\b(discord|roblox|minecraft|fortnite|tiktok|instagram|gamertag)\b/.test(k) && !/\bjapan/.test(k)) {
    return { strategy: 'skip', reason: 'unrelated_platform' };
  }
  if (/\b(school name generator|town name|city name|country name|team name|business name|company name|brand name|shop name|store name|restaurant name|cafe name)\b/.test(k) && !/\bjapan/.test(k)) {
    return { strategy: 'skip', reason: 'unrelated_name_type' };
  }

  // SKIP: Japanese language learning (not names)
  if (/\b(japan.+written|written.+japan|japan.+character|pronunciation)\b/.test(k) && !/\bname/.test(k)) {
    return { strategy: 'skip', reason: 'language_learning' };
  }

  // SKIP: "my name in japanese" / "what is your name" (translation queries, not name listings)
  if (/\b(my name|your name|my.+name|your.+name)\b/.test(k) && /\b(in japanese|japanese|to japanese|into japanese)\b/.test(k)) {
    if (/\b(generator|list|meaning|female|male|boy|girl|cute|cool)\b/.test(k)) {
      // Keep if it has listing modifiers
    } else {
      return { strategy: 'skip', reason: 'name_translation_query' };
    }
  }

  // SKIP: "how to write/say/spell/type my name"
  if (/\bhow\s+to\s+(write|say|spell|type|right|read)\b/.test(k) && /\bname/.test(k)) {
    return { strategy: 'skip', reason: 'how_to_write_query' };
  }
  if (/\bhow\s+(do|can)\s+(you|i)\s+(write|say|spell|type)\b/.test(k) && /\bname/.test(k)) {
    return { strategy: 'skip', reason: 'how_to_write_query' };
  }

  // SKIP: "what is my/your name in japanese"
  if (/\b(what.?s|what is)\s+(my|your)\s+name/.test(k)) {
    return { strategy: 'skip', reason: 'name_translation_query' };
  }
  if (/\bwhat\s+is\s+your\b/.test(k) && /\bjapan/.test(k)) {
    return { strategy: 'skip', reason: 'name_translation_query' };
  }

  // SKIP: "write my name in japanese" / "translate my name"
  if (/\b(write|translate|convert|spell|type)\s+(my|your|english)\s+name/.test(k)) {
    return { strategy: 'skip', reason: 'name_translation_query' };
  }
  if (/\bname\b.*\b(to japanese|into japanese|in japanese)\b/.test(k) && /\b(my|your|translate|convert|write)\b/.test(k)) {
    return { strategy: 'skip', reason: 'name_translation_query' };
  }

  // SKIP: "convert/translate/make name" patterns (tool queries, not name listings)
  if (/\bname/.test(k) && /\b(convert|translat|conversion|maker|creator)/i.test(k) && !/\b(generator)\b/.test(k)) {
    if (/\b(meaning|female|male|girl|boy|cute|cool|anime|baby|list|common|unique|rare|popular)\b/.test(k)) {
      // Keep if has listing modifiers
    } else {
      return { strategy: 'skip', reason: 'name_translation_query' };
    }
  }
  if (/\bname/.test(k) && /\b(to japanese|into japanese|to kanji|into kanji)\b/.test(k) && !/\b(meaning|female|male|girl|boy|cute|cool|anime|baby|list|generator|common|unique|rare|popular)\b/.test(k)) {
    return { strategy: 'skip', reason: 'name_translation_query' };
  }

  // Homepage SEO: generic name generator queries only
  if (/\b(generator|gen)\b/.test(k) && /\b(japan|name)\b/.test(k)) {
    // Specific generators get their own category pages
    if (/\b(anime|manga|game|female|male|girl|boy|samurai|ninja|demon|fantasy|last.?name|surname|baby)\b/.test(k)) {
      // Will be caught by more specific rules below
    } else {
      return { strategy: 'homepage_seo', reason: 'generator_query' };
    }
  }

  // --- Category pages by gender ---
  const hasNameCtx = /\b(name|japan|anime|manga)\b/.test(k);

  if (/\b(female|girl|girls|woman|women|ladies|feminine)\b/.test(k) && hasNameCtx) {
    const tags = { gender: 'female', name_part: 'given_name' };
    if (/\b(last.?name|surname|family)\b/.test(k)) tags.name_part = 'family_name';
    if (/\bcute\b/.test(k)) tags.vibe = 'cute';
    if (/\bcool\b/.test(k)) tags.vibe = 'cool';
    if (/\b(beautiful|elegant|pretty)\b/.test(k)) tags.vibe = 'elegant';
    if (/\b(badass|fierce|warrior)\b/.test(k)) tags.vibe = 'fierce';
    if (/\b(strong|powerful)\b/.test(k)) tags.vibe = 'strong';
    if (/\b(unique|rare|uncommon)\b/.test(k)) tags.popularity = 'rare';
    if (/\b(common|popular)\b/.test(k)) tags.popularity = 'common';
    if (/\bmodern\b/.test(k)) tags.era = 'modern';
    if (/\b(ancient|old|traditional|classic|historical)\b/.test(k)) tags.era = 'classical';
    if (/\b(anime)\b/.test(k)) tags.use_case = 'anime';
    if (/\b(baby)\b/.test(k)) tags.use_case = 'baby';
    if (/\b(samurai)\b/.test(k)) tags.use_case = 'historical';
    if (/\bmeaning/.test(k)) tags.with_meanings = true;
    return { strategy: 'category_page', tags };
  }

  if (/\b(male|boy|boys|man|men|guy|guys|masculine)\b/.test(k) && hasNameCtx) {
    const tags = { gender: 'male', name_part: 'given_name' };
    if (/\b(last.?name|surname|family)\b/.test(k)) tags.name_part = 'family_name';
    if (/\bcute\b/.test(k)) tags.vibe = 'cute';
    if (/\bcool\b/.test(k)) tags.vibe = 'cool';
    if (/\b(badass|fierce|warrior)\b/.test(k)) tags.vibe = 'fierce';
    if (/\b(strong|powerful)\b/.test(k)) tags.vibe = 'strong';
    if (/\b(unique|rare|uncommon)\b/.test(k)) tags.popularity = 'rare';
    if (/\b(common|popular)\b/.test(k)) tags.popularity = 'common';
    if (/\bmodern\b/.test(k)) tags.era = 'modern';
    if (/\b(ancient|old|traditional|classic|historical)\b/.test(k)) tags.era = 'classical';
    if (/\b(anime)\b/.test(k)) tags.use_case = 'anime';
    if (/\b(baby)\b/.test(k)) tags.use_case = 'baby';
    if (/\b(samurai)\b/.test(k)) tags.use_case = 'historical';
    if (/\bmeaning/.test(k)) tags.with_meanings = true;
    return { strategy: 'category_page', tags };
  }

  // Category: unisex / gender-neutral
  if (/\b(unisex|gender.?neutral|non.?binary)\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { gender: 'unisex', name_part: 'given_name' } };
  }

  // Category: last names / surnames / family names
  if (/\b(last.?names?|surnames?|family.?names?)\b/.test(k) && (/\bjapan/.test(k) || /\bname/.test(k) || /\basian/.test(k) || /\bcute\b/.test(k) || /\bcool\b/.test(k))) {
    const tags = { name_part: 'family_name' };
    if (/\bcommon\b/.test(k)) tags.popularity = 'common';
    if (/\b(rare|unique|uncommon)\b/.test(k)) tags.popularity = 'rare';
    if (/\bcool\b/.test(k)) tags.vibe = 'cool';
    if (/\bcute\b/.test(k)) tags.vibe = 'cute';
    if (/\bmeaning/.test(k)) tags.with_meanings = true;
    if (/\b(female|girl)\b/.test(k)) tags.gender = 'female';
    if (/\b(male|boy|guy)\b/.test(k)) tags.gender = 'male';
    return { strategy: 'category_page', tags };
  }

  // "japanese surnames" without the word "name"
  if (/\bsurnames?\b/.test(k) && (/\bjapan/.test(k) || /\basian/.test(k))) {
    const tags = { name_part: 'family_name' };
    if (/\bcommon\b/.test(k)) tags.popularity = 'common';
    if (/\bmeaning/.test(k)) tags.with_meanings = true;
    return { strategy: 'category_page', tags };
  }

  // Category: by vibe (with japanese/name context)
  if (/\bcute\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { vibe: 'cute' } };
  }
  if (/\bcool\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { vibe: 'cool' } };
  }
  if (/\b(badass|fierce)\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { vibe: 'fierce' } };
  }
  if (/\b(beautiful|elegant|pretty)\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { vibe: 'elegant' } };
  }
  if (/\b(strong|powerful)\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { vibe: 'strong' } };
  }
  if (/\b(mysterious|dark|shadow)\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { vibe: 'mysterious' } };
  }
  if (/\b(noble|royal)\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { vibe: 'noble' } };
  }

  // Category: by use case
  if (/\banime\b/.test(k) && /\bname/.test(k)) {
    return { strategy: 'category_page', tags: { use_case: 'anime' } };
  }
  if (/\bmanga\b/.test(k) && /\bname/.test(k)) {
    return { strategy: 'category_page', tags: { use_case: 'manga' } };
  }
  if (/\b(samurai)\b/.test(k) && /\bname/.test(k)) {
    return { strategy: 'category_page', tags: { use_case: 'historical', vibe: 'fierce' } };
  }
  if (/\b(ninja)\b/.test(k) && /\bname/.test(k)) {
    return { strategy: 'category_page', tags: { use_case: 'historical', vibe: 'mysterious' } };
  }
  if (/\bbaby\b/.test(k) && /\b(japan|name)\b/.test(k)) {
    return { strategy: 'category_page', tags: { use_case: 'baby' } };
  }

  // Category: by popularity
  if (/\b(unique|rare|uncommon)\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { popularity: 'rare' } };
  }
  if (/\b(common|popular|top|most)\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { popularity: 'common' } };
  }

  // Category: by era
  if (/\b(ancient|old|traditional|classic|historical|edo|meiji)\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { era: 'classical' } };
  }
  if (/\bmodern\b/.test(k) && hasNameCtx) {
    return { strategy: 'category_page', tags: { era: 'modern' } };
  }

  // Category: by element/theme
  if (/\b(flower|nature|water|fire|moon|star|sky|dragon|demon|god|death|dark|light|sun|snow|rain|wind|thunder|ocean|sea)\b/.test(k) && hasNameCtx) {
    const elem = k.match(/\b(flower|nature|water|fire|moon|star|sky|dragon|sea|ocean)\b/)?.[1] || 'nature';
    const elemMap = { ocean: 'sea', dragon: 'strength' };
    return { strategy: 'category_page', tags: { element: elemMap[elem] || elem } };
  }

  // Blog: specific name meanings (e.g., "ren name meaning", "akira meaning")
  if (/\bmeaning\b/.test(k) && /\b[a-z]{2,10}\b/.test(k)) {
    return { strategy: 'blog_post', reason: 'name_meaning' };
  }

  // Asian names (broader, still relevant)
  if (/\basian\b/.test(k) && /\bname/.test(k)) {
    const tags = {};
    if (/\b(female|girl)\b/.test(k)) tags.gender = 'female';
    if (/\b(male|boy)\b/.test(k)) tags.gender = 'male';
    return { strategy: 'category_page', reason: 'asian_names_related', tags };
  }

  // General: japanese + name (catch-all for relevant)
  if (/\bjapan/.test(k) && /\bname/.test(k)) {
    return { strategy: 'category_page', reason: 'japanese_name_general' };
  }

  // General name queries with relevant modifiers
  if (/\bname/.test(k) && /\b(kanji|anime|manga|samurai|ninja|geisha|ronin|shogun|oni|yokai|demon|warrior)\b/.test(k)) {
    return { strategy: 'category_page', reason: 'name_with_jp_context' };
  }

  // "j p name", "jp name" and similar abbreviations
  if (/\bj\s*p\s+name/.test(k) || /\bjp\s+name/.test(k)) {
    return { strategy: 'category_page', reason: 'jp_abbreviation' };
  }

  // Misspelling variants of "japanese" — treat as relevant
  if (/\b(japenese|japnese|japanes|jpanese|jpanaese|japanse|japanesse|jap)\b/.test(k) && /\bname/.test(k)) {
    const tags = {};
    if (/\b(female|girl)\b/.test(k)) tags.gender = 'female';
    if (/\b(male|boy)\b/.test(k)) tags.gender = 'male';
    return { strategy: 'category_page', reason: 'misspelling_variant', tags };
  }

  // "japanese girl" / "japanese boy" without "name" — still relevant
  if (/\bjapan/.test(k) && /\b(girl|boy|woman|man)\b/.test(k) && !/\bname/.test(k)) {
    const tags = {};
    if (/\b(girl|woman)\b/.test(k)) tags.gender = 'female';
    if (/\b(boy|man)\b/.test(k)) tags.gender = 'male';
    return { strategy: 'category_page', reason: 'implicit_name_query', tags };
  }

  // Broad "japanese" + relevant modifier without "name"
  if (/\bjapan/.test(k) && /\b(cute|cool|badass|strong|beautiful|unique|common|popular|ancient|modern|traditional|rare|samurai|ninja|anime|surname)\b/.test(k)) {
    return { strategy: 'category_page', reason: 'japanese_with_modifier' };
  }

  // "nickname" queries
  if (/\bnickname\b/.test(k) && /\b(japan|anime|samurai)\b/.test(k)) {
    return { strategy: 'category_page', reason: 'nickname_query' };
  }

  // "naming" queries
  if (/\bnaming\b/.test(k) && /\b(japan|anime)\b/.test(k)) {
    return { strategy: 'category_page', reason: 'naming_query' };
  }

  // "username" with japanese context
  if (/\busername\b/.test(k) && /\bjapan/.test(k)) {
    return { strategy: 'category_page', reason: 'username_query' };
  }

  // Remaining: needs review
  return { strategy: 'review', reason: 'needs_manual_review' };
}

function generatePath(keyword, cat) {
  const k = keyword.toLowerCase();

  if (cat.strategy === 'homepage_seo') return '/';
  if (cat.strategy === 'skip') return null;
  if (cat.strategy === 'review') return null;

  // Build path segments from tags and keyword content
  const segments = [];

  if (cat.strategy === 'blog_post') {
    const nameMatch = k.match(/^(\w+)\s+(name\s+)?meaning/);
    if (nameMatch) return `/blog/${nameMatch[1]}-meaning`;
    return `/blog/${slugify(k)}`;
  }

  // For category pages
  const t = cat.tags || {};

  if (t.name_part === 'family_name') segments.push('last-names');
  else if (t.name_part === 'given_name' && !t.gender) segments.push('first-names');
  
  if (t.gender === 'female') segments.push('female');
  else if (t.gender === 'male') segments.push('male');
  else if (t.gender === 'unisex') segments.push('unisex');

  if (t.vibe) segments.push(t.vibe);
  if (t.use_case) segments.push(t.use_case);
  if (t.era) segments.push(t.era);
  if (t.popularity === 'rare') segments.push('unique');
  if (t.popularity === 'common') segments.push('common');
  if (t.element) segments.push(t.element);
  if (t.with_meanings) segments.push('with-meanings');

  if (segments.length === 0) {
    // Fallback: generate from keyword
    const slug = slugify(k.replace(/\b(japanese|japan|names?|for|the|a|an|of|in|with|and|or)\b/g, '').trim());
    return slug ? `/names/${slug}` : '/names/all';
  }

  return `/names/${segments.join('-')}`;
}

function normalizePath(path) {
  if (!path) return path;
  return path
    .replace(/\/boys\b/, '/boy')
    .replace(/\/girls\b/, '/girl')
    .replace(/\/mens?\b/, '/male')
    .replace(/\/womens?\b/, '/female')
    .replace(/\/ladies\b/, '/female')
    .replace(/\/guys?\b/, '/male')
    .replace(/\/surnames\b/, '/last-names')
    .replace(/\/last$/, '/last-names')
    .replace(/\/familys?\b/, '/last-names')
    .replace(/\/first-names-female/, '/female')
    .replace(/\/first-names-male/, '/male')
    .replace(/\/names\/names/, '/names')
    .replace(/\/japenese$/, '/all')
    .replace(/\/japanes$/, '/all')
    .replace(/\/japanse$/, '/all')
    .replace(/\/japanses$/, '/all')
    .replace(/\/namen$/, '/all')
    .replace(/\/females$/, '/female')
    .replace(/\/woman$/, '/female')
    .replace(/\/masculine$/, '/male')
    .replace(/\/feminine$/, '/female')
    .replace(/\/feminine-guy$/, '/male')
    .replace(/\/cute-characters$/, '/cute')
    .replace(/\/pretty-girl$/, '/pretty-female')
    .replace(/\/pretty-girls$/, '/pretty-female')
    .replace(/\/beautiful-girl$/, '/beautiful-female')
    .replace(/\/beautiful-girls$/, '/beautiful-female')
    .replace(/\/cool-guy$/, '/cool-male')
    .replace(/\/cool-guys$/, '/cool-male')
    .replace(/\/cool-nicknames$/, '/cool')
    .replace(/\/good-guys$/, '/good-male')
    .replace(/\/best-guys$/, '/best-male')
    .replace(/\/asian-boys$/, '/asian-male')
    .replace(/\/asian-girls$/, '/asian-female')
    .replace(/\/asian-woman$/, '/asian-female')
    .replace(/\/j-p$/, '/all')
    .replace(/\/jp$/, '/all')
    .replace(/\/--+/g, '/-')
    .replace(/-$/g, '');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

function getPriority(sv) {
  if (sv >= 10000) return 1;
  if (sv >= 5000) return 2;
  if (sv >= 2000) return 3;
  if (sv >= 500) return 4;
  return 5;
}

// --- Step 3: Process and build keyword records ---
const keywords = [];
const skipped = [];
const needsReview = [];
let idCounter = 0;

// De-duplicate paths: track which path is already used, keep highest volume
const pathMap = new Map();

for (const entry of entries) {
  const cat = categorize(entry.keyword);

  if (cat.strategy === 'skip') {
    skipped.push({ keyword: entry.keyword, search_volume: entry.search_volume, reason: cat.reason });
    continue;
  }

  const rawPath = generatePath(entry.keyword, cat);
  const path = normalizePath(rawPath);
  const priority = getPriority(entry.search_volume);

  const record = {
    id: `kw_${String(++idCounter).padStart(4, '0')}`,
    keyword: entry.keyword,
    search_volume: entry.search_volume,
    kd: entry.kd,
    cpc: entry.cpc,
    intent: entry.intent,
    strategy: cat.strategy,
    path: path,
    priority: priority,
    status: 'draft',
    tags_hint: cat.tags || null,
    reason: cat.reason || null,
    seo: null,
    filter_rule: null,
    quiz: null,
    related_keywords: [],
  };

  if (cat.strategy === 'review') {
    needsReview.push(record);
  } else {
    keywords.push(record);
  }
}

// De-duplicate: group keywords by path, keep all but mark primary (highest volume)
const byPath = new Map();
for (const kw of keywords) {
  if (!kw.path) continue;
  if (!byPath.has(kw.path)) byPath.set(kw.path, []);
  byPath.get(kw.path).push(kw);
}

for (const [path, group] of byPath) {
  group.sort((a, b) => b.search_volume - a.search_volume);
  group[0].is_primary = true;
  if (group.length > 1) {
    group[0].keyword_aliases = group.slice(1).map(g => ({
      keyword: g.keyword,
      search_volume: g.search_volume,
    }));
    group[0].search_volume_total = group.reduce((s, g) => s + g.search_volume, 0);
  }
}

const primaryKeywords = keywords
  .filter(k => k.is_primary || !byPath.has(k.path))
  .sort((a, b) => (b.search_volume_total || b.search_volume) - (a.search_volume_total || a.search_volume));

// Clean up output
const output = primaryKeywords.map(k => {
  const out = {
    id: k.id,
    keyword: k.keyword,
    search_volume: k.search_volume,
  };
  if (k.search_volume_total) out.search_volume_total = k.search_volume_total;
  if (k.keyword_aliases) out.keyword_aliases = k.keyword_aliases;
  out.kd = k.kd;
  out.cpc = k.cpc;
  out.intent = k.intent;
  out.strategy = k.strategy;
  out.path = k.path;
  out.priority = k.priority;
  out.status = k.status;
  out.tags_hint = k.tags_hint;
  out.seo = k.seo;
  out.filter_rule = k.filter_rule;
  out.quiz = k.quiz;
  out.related_keywords = k.related_keywords;
  return out;
});

writeFileSync(
  'e:/code/japanesename/新版本PSEO改造/keyword/keyword.json',
  JSON.stringify(output, null, 2),
  'utf-8'
);

// Summary
const stratCounts = {};
for (const k of keywords) {
  stratCounts[k.strategy] = (stratCounts[k.strategy] || 0) + 1;
}

console.log(`\n=== Summary ===`);
console.log(`Total parsed: ${entries.length}`);
console.log(`Relevant (output): ${primaryKeywords.length} primary keywords (${keywords.length} total incl. aliases)`);
console.log(`Skipped: ${skipped.length}`);
console.log(`Needs review: ${needsReview.length}`);
console.log(`\nBy strategy:`, stratCounts);
console.log(`\nTop 10 by search volume:`);
primaryKeywords.slice(0, 10).forEach(k => {
  console.log(`  ${k.search_volume.toLocaleString().padStart(8)} | ${k.strategy.padEnd(15)} | ${k.path?.padEnd(30)} | ${k.keyword}`);
});
console.log(`\nUnique paths: ${byPath.size}`);
console.log(`\nSkip reasons:`);
const skipReasons = {};
for (const s of skipped) {
  skipReasons[s.reason] = (skipReasons[s.reason] || 0) + 1;
}
console.log(skipReasons);

// Also write review items
if (needsReview.length > 0) {
  writeFileSync(
    'e:/code/japanesename/新版本PSEO改造/keyword/needs-review.json',
    JSON.stringify(
      needsReview
        .sort((a, b) => b.search_volume - a.search_volume)
        .map(k => ({ keyword: k.keyword, search_volume: k.search_volume, kd: k.kd })),
      null,
      2
    ),
    'utf-8'
  );
  console.log(`\nReview items written to needs-review.json`);
  console.log(`Top 10 needing review:`);
  needsReview.sort((a, b) => b.search_volume - a.search_volume).slice(0, 10).forEach(k => {
    console.log(`  ${k.search_volume.toLocaleString().padStart(8)} | ${k.keyword}`);
  });
}

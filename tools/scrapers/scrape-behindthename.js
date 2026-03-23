#!/usr/bin/env node
// Scrapes behindthename.com for name data. Zero dependencies (Node 18+).
//
// Usage (given name):  node scrape-behindthename.js --given aiko
// Usage (family name): node scrape-behindthename.js --family suzuki

const args = process.argv.slice(2);
const givenIdx = args.indexOf('--given');
const familyIdx = args.indexOf('--family');

const isFamily = familyIdx >= 0;
const nameArg = isFamily ? args[familyIdx + 1] : (givenIdx >= 0 ? args[givenIdx + 1] : args[0]);

if (!nameArg) {
  console.error('Usage: node scrape-behindthename.js --given <romaji> | --family <romaji>');
  process.exit(1);
}

const nameLower = nameArg.toLowerCase();
const baseUrl = isFamily
  ? `https://surnames.behindthename.com/name/${encodeURIComponent(nameLower)}`
  : `https://www.behindthename.com/name/${encodeURIComponent(nameLower)}`;

async function scrape() {
  const res = await fetch(baseUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NameResearch/1.0)' },
  });
  if (!res.ok) {
    console.error(`HTTP ${res.status} from ${baseUrl}`);
    process.exit(1);
  }
  const html = await res.text();

  const result = {
    source: isFamily ? 'surnames.behindthename.com' : 'behindthename.com',
    url: baseUrl,
    name_type: isFamily ? 'family_name' : 'given_name',
    romaji: nameArg.charAt(0).toUpperCase() + nameArg.slice(1).toLowerCase(),
    gender: extractGender(html),
    usage: extractUsage(html),
    scripts: extractScripts(html),
    meaning: extractMeaning(html),
    vibes: isFamily ? [] : extractVibes(html),
    categories: extractCategories(html),
  };

  console.log(JSON.stringify(result, null, 2));
}

function extractGender(html) {
  const m = html.match(/class="(fem|masc|unisex)"[^>]*>([^<]+)/);
  if (!m) return null;
  const raw = m[2].trim().toLowerCase();
  if (raw.startsWith('fem')) return 'female';
  if (raw.startsWith('masc')) return 'male';
  if (raw.startsWith('uni') || raw.includes('&')) return 'unisex';
  return raw;
}

function extractUsage(html) {
  const m = html.match(/Usage\s*<\/span>\s*<span[^>]*>([\s\S]*?)<\/span>/);
  if (!m) return [];
  return m[1].replace(/<[^>]+>/g, ',').split(',').map(s => s.trim()).filter(Boolean);
}

function extractScripts(html) {
  const result = {};
  // Scripts section uses infoname-unit spans with Japanese Kanji/Hiragana/Katakana labels
  const section = html.match(/Scripts\s*<\/span>\s*<span[^>]*class="infoname-info"[^>]*>([\s\S]*?)<\/div>/);
  if (!section) return result;
  const text = section[1];

  // Each unit: <span class="infoname-unit"><span class="trn">愛子</span>...(Japanese Kanji)...</span>
  const units = [...text.matchAll(/class="infoname-unit"[^>]*>([\s\S]*?)<\/span>\s*<\/span>/g)];
  for (const u of units) {
    const content = u[1];
    if (content.includes('Kanji')) {
      const m = content.match(/([\u4e00-\u9fff\uf900-\ufaff]+)/);
      if (m) result.kanji = m[1];
    } else if (content.includes('Hiragana')) {
      const m = content.match(/([\u3040-\u309f]+)/);
      if (m) result.hiragana = m[1];
    } else if (content.includes('Katakana')) {
      const m = content.match(/([\u30a0-\u30ff\u30fc]+)/);
      if (m) result.katakana = m[1];
    }
  }

  return result;
}

function extractMeaning(html) {
  const headerIdx = html.indexOf('History</h2>');
  if (headerIdx < 0) return null;

  const after = html.slice(headerIdx + 12);
  const nextH2 = after.indexOf('<h2');
  const section = nextH2 > 0 ? after.slice(0, nextH2) : after.slice(0, 3000);

  let text = section
    .replace(/<a[^>]*>/g, '')
    .replace(/<\/a>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

  return text || null;
}

function extractVibes(html) {
  const idx = html.indexOf('ratingblurb');
  if (idx < 0) return [];

  const after = html.slice(idx);
  const endIdx = after.indexOf('</div>');
  const section = endIdx > 0 ? after.slice(0, endIdx) : after.slice(0, 1000);

  const vibes = [];
  const matches = section.matchAll(/font-size:\s*(\d+)%[^>]*>([^<]+)/g);
  for (const m of matches) {
    const word = m[2].trim().toLowerCase();
    const weight = parseInt(m[1], 10);
    if (word && weight > 0) {
      vibes.push({ trait: word, weight });
    }
  }
  return vibes.sort((a, b) => b.weight - a.weight);
}

function extractCategories(html) {
  const idx = html.indexOf('Categories</h2>');
  if (idx < 0) return [];

  const after = html.slice(idx);
  const endDiv = after.indexOf('</div>', 50);
  const section = endDiv > 0 ? after.slice(0, endDiv) : after.slice(0, 2000);

  const cats = [];
  const matches = section.matchAll(/class="ntl"[^>]*>([^<]+)/g);
  for (const m of matches) {
    const cat = m[1].trim();
    if (cat) cats.push(cat);
  }
  return cats;
}

scrape().catch(err => {
  console.error(err.message);
  process.exit(1);
});

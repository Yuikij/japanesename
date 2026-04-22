/**
 * 扫描线上数据库中模板质量低的 description_en，并修复
 * Run: node tmp/fix-template-descriptions.js
 * 
 * 目标模板模式（来自批量 LLM 脚本）：
 * "X (kanji) is a Japanese [female|male|unisex] given/family name with the compound meaning 'Y'"
 * "The kanji combine a clear semantic core with a natural, bright, or virtuous tone"
 */

const https = require('https');

const BASE_URL = 'https://japanesenamedata.yuisama.top';
const SECRET = 'CHANGE_ME';

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        'X-API-Secret': SECRET,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let chunks = '';
      res.on('data', (c) => (chunks += c));
      res.on('end', () => {
        try { resolve(JSON.parse(chunks)); }
        catch { reject(new Error('Parse error: ' + chunks.slice(0, 200))); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// Template patterns to detect
const TEMPLATE_PATTERNS = [
  /is a Japanese (female|male|unisex) given name with the compound meaning/i,
  /is a Japanese (family|sur)name with the compound meaning/i,
  /The kanji combine a clear semantic core/i,
  /fits modern real-world naming/i,
  /natural, bright, or virtuous tone/i,
  /straightforward semantic profile/i,
];

function isTemplate(desc) {
  if (!desc) return false;
  return TEMPLATE_PATTERNS.some(p => p.test(desc));
}

async function fetchAllNames() {
  const allNames = [];
  const limit = 500;
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const r = await request('GET', `/api/names?limit=${limit}&offset=${offset}`, null);
    if (!r.data || !r.data.length) break;
    total = r.total;
    allNames.push(...r.data);
    offset += limit;
    process.stdout.write(`\rFetched ${allNames.length}/${total}...`);
  }
  console.log();
  return allNames;
}

async function main() {
  console.log('Fetching all names...');
  const all = await fetchAllNames();
  console.log(`Total records: ${all.length}`);

  const bad = all.filter(n => isTemplate(n.description_en));
  console.log(`Template descriptions found: ${bad.length}`);

  if (bad.length === 0) {
    console.log('No template descriptions found!');
    return;
  }

  // Print sample of bad ones
  console.log('\n--- Sample bad descriptions ---');
  bad.slice(0, 5).forEach(n => {
    console.log(`\n[${n.id}] ${n.romaji} (${n.kanji})`);
    console.log(`  desc: ${n.description_en}`);
  });

  // Save full list for manual review
  const fs = require('fs');
  fs.writeFileSync('tmp/template-desc-audit.json', JSON.stringify(bad.map(n => ({
    id: n.id,
    romaji: n.romaji,
    kanji: n.kanji,
    reading: n.reading,
    gender: n.gender,
    name_part: n.name_part,
    meaning_en: n.meaning_en,
    etymology_en: n.etymology_en,
    description_en: n.description_en,
    description_zh: n.description_zh,
    vibe: n.vibe,
    element: n.element,
    era: n.era,
    kanji_breakdown: n.kanji_breakdown,
  })), null, 2), 'utf8');

  console.log(`\nFull list saved to tmp/template-desc-audit.json`);
  console.log(`\nBreakdown by name_part:`);
  const byPart = {};
  bad.forEach(n => { byPart[n.name_part] = (byPart[n.name_part] || 0) + 1; });
  Object.entries(byPart).forEach(([k,v]) => console.log(`  ${k}: ${v}`));
  console.log(`\nBreakdown by gender:`);
  const byGender = {};
  bad.forEach(n => { byGender[n.gender] = (byGender[n.gender] || 0) + 1; });
  Object.entries(byGender).forEach(([k,v]) => console.log(`  ${k}: ${v}`));
}

main().catch(console.error);

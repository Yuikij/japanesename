#!/usr/bin/env node
// Scrapes myoji-yurai.net for surname data. Zero dependencies (Node 18+).
// Usage: node scrape-myoji-yurai.js <kanji>
// Example: node scrape-myoji-yurai.js 鈴木

const kanji = process.argv[2];
if (!kanji) {
  console.error('Usage: node scrape-myoji-yurai.js <kanji>');
  process.exit(1);
}

const url = `https://myoji-yurai.net/searchResult.htm?myojiKanji=${encodeURIComponent(kanji)}`;

async function scrape() {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`HTTP ${res.status} from ${url}`);
    process.exit(1);
  }
  const html = await res.text();

  const result = {
    source: 'myoji-yurai.net',
    url,
    kanji,
    readings: extractReadings(html),
    national_rank: extractRank(html),
    estimated_population: extractPopulation(html),
    etymology: extractEtymology(html),
    top_regions: extractRegions(html),
    famous_people: extractFamous(html),
  };

  console.log(JSON.stringify(result, null, 2));
}

function extractReadings(html) {
  const m = html.match(/【読み】([^<\n]+)/);
  if (!m) return [];
  return m[1].trim().split(',').map(s => s.trim()).filter(Boolean);
}

function extractRank(html) {
  const m = html.match(/【全国順位】\s*(?:<[^>]*>\s*)*(\d[\d,]*)\s*位/);
  return m ? parseInt(m[1].replace(/,/g, ''), 10) : null;
}

function extractPopulation(html) {
  const section = html.match(/【全国人数】[\s\S]*?およそ([\d,]+)\s*人/);
  return section ? parseInt(section[1].replace(/,/g, ''), 10) : null;
}

function extractEtymology(html) {
  const idx = html.indexOf('由来解説</h2>');
  if (idx < 0) return null;
  const chunk = html.slice(idx, idx + 5000);
  const sectionEnd = chunk.slice(50).search(/<h[23]|<div class="ad/);
  const content = sectionEnd > 0 ? chunk.slice(12, 50 + sectionEnd) : chunk.slice(12, 2000);
  let text = content.replace(/<a[^>]*>|<\/a>/g, '').replace(/<[^>]+>/g, '');
  text = text.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  // Remove leading class remnants
  text = text.replace(/^[a-z]+\s+class="[^"]*">\s*/, '').trim();
  const divIdx = text.indexOf('①');
  if (divIdx >= 0) text = text.slice(divIdx);
  // Trim trailing garbage from links
  text = text.replace(/\s*$/, '');
  return text || null;
}

function extractRegions(html) {
  // Table with prefecture + population count (Table 10 pattern)
  const tableMatch = findTable(html, /都道府県.*?人数/);
  if (!tableMatch) return [];
  const rows = [...tableMatch.matchAll(/<tr[^>]*>(.*?)<\/tr>/gs)];
  const regions = [];
  for (const row of rows) {
    const cells = [...row[1].matchAll(/<td[^>]*>(.*?)<\/td>/gs)];
    if (cells.length >= 2) {
      const pref = cells[0][1].replace(/<[^>]+>/g, '').trim();
      const count = cells[1][1].replace(/<[^>]+>/g, '').trim();
      if (pref && count) regions.push({ prefecture: pref, count });
    }
  }
  return regions.slice(0, 5);
}

function extractFamous(html) {
  // The famous-people table has 名前 + 生年月日 + ジャンル + 備考 columns
  // Its rows contain actual person data
  const tables = [...html.matchAll(/<table[^>]*>(.*?)<\/table>/gs)];
  for (const [, tbody] of tables) {
    const textPreview = tbody.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    if (!textPreview.includes('生年月日') && !textPreview.includes('ジャンル')) continue;
    // Skip ranking tables
    if (textPreview.includes('日別TOP10') || textPreview.includes('月間TOP10')) continue;

    const rows = [...tbody.matchAll(/<tr[^>]*>(.*?)<\/tr>/gs)];
    const people = [];
    for (const row of rows) {
      const cells = [...row[1].matchAll(/<td[^>]*>(.*?)<\/td>/gs)];
      if (cells.length < 3) continue;
      const nameJp = cells[0][1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
      const birth = cells[1][1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const genre = cells[2][1].replace(/<[^>]+>/g, '').trim();
      const note = cells.length > 3 ? cells[3][1].replace(/<[^>]+>/g, '').trim() : '';
      if (nameJp && /\d{4}年/.test(birth)) {
        people.push({ name_jp: nameJp, birth, genre, note: note || undefined });
      }
    }
    if (people.length > 0) return people.slice(0, 10);
  }
  return [];
}

function findTable(html, headerPattern) {
  const tables = [...html.matchAll(/<table[^>]*>(.*?)<\/table>/gs)];
  for (const [fullMatch, tbody] of tables) {
    const text = tbody.replace(/<[^>]+>/g, ' ');
    if (headerPattern.test(text)) return fullMatch;
  }
  return null;
}

scrape().catch(err => {
  console.error(err.message);
  process.exit(1);
});

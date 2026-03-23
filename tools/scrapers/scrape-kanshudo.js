#!/usr/bin/env node
// Scrapes kanshudo.com for name data (readings, frequency, kanji breakdown).
// Works for both given names and family names. Zero dependencies (Node 18+).
//
// Usage: node scrape-kanshudo.js <kanji>
// Example: node scrape-kanshudo.js 佐藤
// Example: node scrape-kanshudo.js 新垣

const kanji = process.argv[2];
if (!kanji) {
  console.error('Usage: node scrape-kanshudo.js <kanji>');
  process.exit(1);
}

const url = `https://www.kanshudo.com/name/${encodeURIComponent(kanji)}`;

async function scrape() {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NameResearch/1.0)' },
  });
  if (!res.ok) {
    console.error(`HTTP ${res.status} from ${url}`);
    process.exit(1);
  }
  const html = await res.text();

  const result = {
    source: 'kanshudo.com',
    url,
    kanji,
    common_reading: extractCommonReading(html),
    reading_type: extractReadingType(html),
    alternative_readings: extractAltReadings(html),
    frequency_rank: extractFrequency(html),
    external_links: extractLinks(html),
  };

  console.log(JSON.stringify(result, null, 2));
}

function extractCommonReading(html) {
  const m = html.match(/Common reading:\s*([\s\S]*?)(?=Additional readings:|<\/td)/);
  if (!m) return null;
  const text = m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = text.match(/^([\u3040-\u309f]+)\s+([A-Za-z]+)/);
  if (parts) return { hiragana: parts[1], romaji: parts[2] };
  return { raw: text };
}

function extractReadingType(html) {
  const common = html.match(/Common reading:[\s\S]*?\(([^)]+)\)/);
  if (!common) return null;
  return common[1].trim();
}

function extractAltReadings(html) {
  const m = html.match(/Additional readings:\s*([\s\S]*?)<\/td>/);
  if (!m) return [];
  const text = m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  const readings = [];
  const matches = text.matchAll(/([\u3040-\u309f]+)\s+([A-Za-z]+)\s*\(([^)]+)\)/g);
  for (const rm of matches) {
    readings.push({ hiragana: rm[1], romaji: rm[2], type: rm[3].trim() });
  }
  return readings;
}

function extractFrequency(html) {
  const m = html.match(/This is the (\d+)\w* most common/);
  return m ? parseInt(m[1], 10) : null;
}

function extractLinks(html) {
  const links = {};
  const wikiM = html.match(/href="(https:\/\/en\.wiktionary\.org\/wiki\/[^"]+)"/);
  if (wikiM) links.wiktionary = wikiM[1];
  const wpM = html.match(/href="(https:\/\/ja\.wikipedia\.org\/wiki\/[^"]+)"/);
  if (wpM) links.wikipedia_ja = decodeURIComponent(wpM[1]);
  return links;
}

scrape().catch(err => {
  console.error(err.message);
  process.exit(1);
});

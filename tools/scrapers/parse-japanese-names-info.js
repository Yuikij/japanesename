#!/usr/bin/env node
// Parses markdown output from WebFetch of japanese-names.info pages.
// Zero dependencies (Node 18+). Reads markdown from stdin.
//
// Usage (given_name):
//   cat fetched-page.txt | node parse-japanese-names-info.js --kanji 愛乃
// Usage (family_name):
//   cat fetched-page.txt | node parse-japanese-names-info.js --kanji 新垣

const args = process.argv.slice(2);
const kanjiIdx = args.indexOf('--kanji');
const targetKanji = kanjiIdx >= 0 ? args[kanjiIdx + 1] : null;
if (!targetKanji) {
  console.error('Usage: cat page.txt | node parse-japanese-names-info.js --kanji <kanji>');
  process.exit(1);
}

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString('utf8');

  const result = {
    source: 'japanese-names.info',
    name_type: detectNameType(text),
    ...extractHeader(text),
    target_variation: extractVariation(text, targetKanji),
    famous_persons: extractFamousPersons(text),
    explore_tags: extractExploreTags(text),
  };

  console.log(JSON.stringify(result, null, 2));
}

function detectNameType(text) {
  if (text.includes('/first-name/') || text.includes('Girl Name') || text.includes('Boy Name'))
    return 'first-name';
  if (text.includes('/last-name/')) return 'last-name';
  return 'unknown';
}

function extractHeader(text) {
  const result = {};

  const gender = text.match(/Gender:\s*(Male|Female|Unisex)/i);
  if (gender) result.gender = gender[1].toLowerCase();

  const hira = text.match(/Hiragana(?:tip)?:\s*([ぁ-ん]+)/);
  if (hira) result.hiragana = hira[1];

  const kata = text.match(/Katakana(?:tip)?:\s*([ァ-ヶー]+)/);
  if (kata) result.katakana = kata[1];

  const engSyl = text.match(/English Syllables(?:tip)?:\s*[\w-]+\s*\((\d+)\)/);
  if (engSyl) result.english_syllables = parseInt(engSyl[1], 10);

  const morae = text.match(/Japanese Morae(?:tip)?:\s*[\w-]+\s*\((\d+)\)/);
  if (morae) result.japanese_morae = parseInt(morae[1], 10);

  const household = text.match(/Households?(?:tip)?:\s*aprx\.\s*([\d,]+)/);
  if (household) result.household_count = parseInt(household[1].replace(/,/g, ''), 10);

  const variations = text.match(/Kanji Names & Meanings\s*-\s*(\d+)\s*variations?/i);
  if (variations) result.variations_count = parseInt(variations[1], 10);

  return result;
}

function extractVariation(text, kanji) {
  // Find the section for the specific kanji variation
  // Boundary: next "### <CJK char>" (new variation) or "## " (new major section)
  // Avoids stopping at "### Name ideas examples" which sits inside a variation
  const escapedKanji = kanji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sectionRegex = new RegExp(
    `###\\s*${escapedKanji}\\s*-.*?-([\\s\\S]*?)(?=\\n###\\s*[\\u3000-\\u9fff\\uff00-\\uffef]|\\n## [^#]|$)`
  );
  const sectionMatch = text.match(sectionRegex);
  if (!sectionMatch) return null;

  const section = sectionMatch[1];

  // Extract feature tags (e.g. [Common], [Flower], [Good Fortune])
  const featureTags = [];
  const featureMatches = section.match(
    /\[(Common|Flower|Beauty|Good Fortune|Strength\/Courage|Rare|Nature|Music|Smart|Lucky|Happiness|Traditional|Unique|Season|Color)\]/gi
  );
  if (featureMatches) {
    for (const m of featureMatches) {
      const tag = m.slice(1, -1).toLowerCase().replace(/\//g, '_');
      if (!featureTags.includes(tag)) featureTags.push(tag);
    }
  }

  // Extract kanji breakdown — each kanji char has a "X means ..." line
  const kanjiBreakdown = [];
  const chars = [...kanji];
  for (const char of chars) {
    const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const meaningRegex = new RegExp(
      `\\[${escaped}\\].*?means\\s+"([^"]+)"`, 's'
    );
    const mm = section.match(meaningRegex);
    if (mm) {
      const meanings = mm[1].split(',').map(s => s.trim().replace(/\.$/, '').toLowerCase()).filter(Boolean);
      kanjiBreakdown.push({ char, meanings });
    }
  }

  return {
    kanji,
    feature_tags: featureTags,
    kanji_breakdown: kanjiBreakdown,
  };
}

function extractFamousPersons(text) {
  // Real Persons section
  const realIdx = text.indexOf('## Real Persons');
  if (realIdx < 0) {
    const altIdx = text.indexOf('Real Persons');
    if (altIdx < 0) return [];
  }

  const sectionStart = text.indexOf('Real Persons');
  const sectionEnd = text.indexOf('## ', sectionStart + 20);
  const section = sectionEnd > 0
    ? text.slice(sectionStart, sectionEnd)
    : text.slice(sectionStart, sectionStart + 3000);

  const persons = [];
  // Pattern: 新垣Aragaki 結衣Yui Japanese idol... (1988- ) wikipedia...
  // Or: KanjiFirst RomajiFirst KanjiGiven RomajiGiven Description (year) links
  const personRegex = /([^\n]*?)\s*(?:wikipedia page link|$)/gm;
  const lines = section.split('\n');
  for (const line of lines) {
    if (!line.includes('wikipedia') && !/\(\d{4}/.test(line)) continue;

    // Extract the main content before wikipedia links
    let content = line.replace(/wikipedia page link\w*/g, '').trim();

    // Try to parse: "KanjiFamily RomajiFamily KanjiGiven RomajiGiven Description (year)"
    const match = content.match(
      /^(.+?)\s*(?:Japanese|Chinese|American|Korean|Brazilian|)\s*(.*?)\s*\((\d{4})-?\s*(\d{4})?\s*\)/
    );
    if (match) {
      const nameSection = match[1].trim();
      const description = match[2].trim();
      const birthYear = match[3];
      const deathYear = match[4];

      // Try to split name into jp + romaji parts
      // Pattern like: 新垣Aragaki 結衣Yui
      const nameParts = nameSection.match(
        /([一-龥ぁ-んァ-ヶ]+)\s*([A-Za-z]+)\s+([一-龥ぁ-んァ-ヶ]+)\s*([A-Za-z]+)/
      );
      if (nameParts) {
        const nameJp = `${nameParts[1]} ${nameParts[3]}`;
        const nameEn = `${nameParts[2]} ${nameParts[4]}`;
        const yearStr = deathYear ? `${birthYear}-${deathYear}` : `${birthYear}-`;
        const ctx = description ? `${description} (${yearStr})` : `(${yearStr})`;
        persons.push({ name: nameEn, name_jp: nameJp, context: ctx });
      } else {
        // Simpler format
        const ctx = description
          ? `${description} (${birthYear}${deathYear ? '-' + deathYear : '-'})`
          : `(${birthYear}${deathYear ? '-' + deathYear : '-'})`;
        persons.push({ name: nameSection, name_jp: '', context: ctx });
      }
    }
  }

  return persons;
}

function extractExploreTags(text) {
  const idx = text.indexOf('Explore Names by Tag');
  if (idx < 0) return [];
  const section = text.slice(idx, idx + 500);
  const tags = [];
  const tagMatches = section.matchAll(
    /\[([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\]\(https:\/\/japanese-names\.info\/(?:first|last)-names\/search-result\/feature-([^/)]+)/g
  );
  for (const m of tagMatches) {
    tags.push(m[2].toLowerCase());
  }
  return tags;
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});

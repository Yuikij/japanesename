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
  // URL path is the most stable signal
  if (/\/first-name\//i.test(text)) return 'first-name';
  if (/\/last-name\//i.test(text)) return 'last-name';
  // Fall back to page content signals
  if (/\b(?:Girl|Boy|Unisex)\s+Name\b/i.test(text)) return 'first-name';
  if (/\bFamily\s+Name\b/i.test(text)) return 'last-name';
  if (/\bHouseholds?\b/i.test(text) && !/\bGender\b/i.test(text)) return 'last-name';
  if (/\bGender\b/i.test(text)) return 'first-name';
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

  // Extract feature tags generically: capture all [Tag] patterns,
  // then normalize known ones. Unknown tags are kept as-is so we
  // never silently drop data when the source site adds new tags.
  const TAG_NORMALIZE = {
    'strength/courage': 'strength_courage',
    'good fortune': 'good_fortune',
  };
  const featureTags = [];
  const featureMatches = section.matchAll(/\[([A-Z][A-Za-z /]+?)\]/g);
  for (const m of featureMatches) {
    const raw = m[1].trim();
    // Skip structural markdown links like [some text](url)
    const afterBracket = section.slice(m.index + m[0].length);
    if (afterBracket.startsWith('(')) continue;
    const tag = (TAG_NORMALIZE[raw.toLowerCase()] || raw.toLowerCase()).replace(/\s+/g, '_').replace(/\//g, '_');
    if (!featureTags.includes(tag)) featureTags.push(tag);
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
  const sectionStart = text.indexOf('Real Persons');
  if (sectionStart < 0) return [];

  const sectionEnd = text.indexOf('## ', sectionStart + 20);
  const section = sectionEnd > 0
    ? text.slice(sectionStart, sectionEnd)
    : text.slice(sectionStart, sectionStart + 5000);

  const NATIONALITY = '(?:Japanese|Chinese|American|Korean|Brazilian|British|French|German|Canadian|Australian|Taiwanese|Thai|Filipino|Vietnamese|Indonesian|Indian|Russian|Mexican|Spanish|Italian|Dutch|Swedish|Norwegian|Swiss|Austrian|Belgian|Polish|Czech|Hungarian|Romanian|Turkish|Egyptian|South\\s+African|New\\s+Zealand|Singaporean|Malaysian|Hong\\s+Kong|Okinawan|)';
  const personMainRegex = new RegExp(
    `^(.+?)\\s*${NATIONALITY}\\s*(.*?)\\s*\\((\\d{4})-?\\s*(\\d{4})?\\s*\\)`,
  );

  const CJK_RANGE = '[\\u3000-\\u9fff\\uf900-\\ufaff\\u{20000}-\\u{2fa1f}ぁ-んァ-ヶー]';
  const namePartsRegex = new RegExp(
    `(${CJK_RANGE}+)\\s*([A-Za-z''-]+)\\s+(${CJK_RANGE}+)\\s*([A-Za-z''-]+)`, 'u'
  );

  const persons = [];
  const lines = section.split('\n');
  for (const line of lines) {
    if (!line.includes('wikipedia') && !/\(\d{4}/.test(line)) continue;

    let content = line.replace(/wikipedia\s*page\s*link\w*/gi, '').trim();
    if (!content) continue;

    const match = content.match(personMainRegex);
    if (match) {
      const nameSection = match[1].trim();
      const description = match[2].trim();
      const birthYear = match[3];
      const deathYear = match[4];
      const yearStr = deathYear ? `${birthYear}-${deathYear}` : `${birthYear}-`;

      const nameParts = nameSection.match(namePartsRegex);
      if (nameParts) {
        persons.push({
          name: `${nameParts[2]} ${nameParts[4]}`,
          name_jp: `${nameParts[1]}${nameParts[3]}`,
          context: description ? `${description} (${yearStr})` : `(${yearStr})`,
          confidence: 'high',
        });
      } else {
        // Partial parse succeeded but name splitting failed — keep raw_text
        persons.push({
          name: nameSection,
          name_jp: null,
          raw_text: content,
          context: description ? `${description} (${yearStr})` : `(${yearStr})`,
          confidence: 'low',
        });
      }
    } else if (/\(\d{4}/.test(content)) {
      // Regex failed entirely — preserve the line for downstream consumption
      persons.push({
        name: null,
        name_jp: null,
        raw_text: content,
        context: null,
        confidence: 'unparsed',
      });
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

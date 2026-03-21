const fs = require("fs");
const path = require("path");

const DATASET_DIR = "/tmp/jpname-dataset/japanese_personal_name_dataset/dataset";
const MAX_KANJI_PER_READING = 3;

function esc(s) {
  if (s == null) return "NULL";
  return "'" + String(s).replace(/'/g, "''") + "'";
}

function jsonOrNull(v) {
  if (v == null || (Array.isArray(v) && v.length === 0)) return "'[]'";
  return esc(JSON.stringify(v));
}

function countMorae(reading) {
  const cleaned = reading.replace(/[ーっッ]/g, "");
  let count = 0;
  for (const ch of cleaned) {
    const code = ch.charCodeAt(0);
    if (code >= 0x3041 && code <= 0x3096) count++;
    else if (code >= 0x30a1 && code <= 0x30f6) count++;
  }
  return count || 1;
}

const crypto = require("crypto");
function makeId(prefix, romaji, kanji, gender) {
  const slug = romaji.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 16);
  const hash = crypto.createHash("md5").update(kanji + ":" + romaji + ":" + (gender || "")).digest("hex").slice(0, 6);
  return `${prefix}_${slug}_${hash}`;
}

function parseGivenNames(filePath, gender) {
  const lines = fs.readFileSync(filePath, "utf-8").trim().split("\n");
  const records = [];

  for (const line of lines) {
    const parts = line.split(",");
    if (parts.length < 3) continue;

    const reading = parts[0];
    const romaji = parts[1];
    const kanjiList = parts.slice(2, 2 + MAX_KANJI_PER_READING);
    const allKanji = parts.slice(2);

    for (const kanji of kanjiList) {
      if (!kanji.trim()) continue;
      const otherKanji = allKanji.filter((k) => k !== kanji).slice(0, 10);
      records.push({
        id: makeId("gn", romaji, kanji, gender),
        romaji,
        kanji,
        reading,
        gender,
        name_part: "given_name",
        syllable_count: countMorae(reading),
        script: ["kanji", "hiragana"],
        related_names: otherKanji,
        reading_romaji_variants: [],
        status: "raw",
        source: "japanese-personal-name-dataset",
      });
    }
  }
  return records;
}

function parseLastNames(filePath) {
  const lines = fs.readFileSync(filePath, "utf-8").trim().split("\n");
  const records = [];

  for (const line of lines) {
    const parts = line.split(",");
    if (parts.length < 4) continue;

    const kanji = parts[0];
    const estimatedPop = parseInt(parts[1], 10);
    const reading = parts[2];
    const romaji = parts[3];

    let pop = null;
    if (estimatedPop >= 1000000) pop = "very_common";
    else if (estimatedPop >= 200000) pop = "common";
    else if (estimatedPop >= 50000) pop = "uncommon";
    else if (estimatedPop >= 10000) pop = "rare";
    else pop = "unique";

    records.push({
      id: makeId("fn", romaji, kanji, "unisex"),
      romaji,
      kanji,
      reading,
      gender: "unisex",
      name_part: "family_name",
      syllable_count: countMorae(reading),
      script: ["kanji"],
      popularity: pop,
      estimated_population: estimatedPop,
      related_names: [],
      reading_romaji_variants: [],
      status: "raw",
      source: "japanese-personal-name-dataset",
    });
  }
  return records;
}

const maleNames = parseGivenNames(
  path.join(DATASET_DIR, "first_name_man_opti.csv"),
  "male"
);
const femaleNames = parseGivenNames(
  path.join(DATASET_DIR, "first_name_woman_opti.csv"),
  "female"
);
const lastNames = parseLastNames(path.join(DATASET_DIR, "last_name_org.csv"));

const allRecords = [...maleNames, ...femaleNames, ...lastNames];

console.log(`Male given names: ${maleNames.length}`);
console.log(`Female given names: ${femaleNames.length}`);
console.log(`Family names: ${lastNames.length}`);
console.log(`Total: ${allRecords.length}`);

const lines = [
  "-- Auto-generated name import from japanese-personal-name-dataset",
  "",
];

for (const r of allRecords) {
  const vals = [
    esc(r.id),
    esc(r.romaji),
    esc(r.kanji),
    esc(r.reading),
    esc(r.gender),
    esc(r.name_part),
    r.syllable_count,
    jsonOrNull(r.script),
    esc(r.era || null),
    esc(r.popularity || null),
    esc(r.origin_region || "japan_native"),
    "'[]'", // use_case
    "'[]'", // vibe
    "'[]'", // element
    "'[]'", // kanji_meaning_tags
    "NULL", // meaning_en
    "NULL", // meaning_zh
    "NULL", // description_en
    "NULL", // description_zh
    "'[]'", // famous_bearers
    jsonOrNull(r.related_names),
    jsonOrNull(r.reading_romaji_variants),
    r.estimated_population ?? "NULL",
    esc(r.status),
    esc(r.source),
  ];

  lines.push(
    `INSERT OR IGNORE INTO names (id, romaji, kanji, reading, gender, name_part, syllable_count, script, era, popularity, origin_region, use_case, vibe, element, kanji_meaning_tags, meaning_en, meaning_zh, description_en, description_zh, famous_bearers, related_names, reading_romaji_variants, estimated_population, status, source) VALUES (${vals.join(", ")});`
  );
}

const outPath = path.resolve(__dirname, "../src/db/import-names.sql");
fs.writeFileSync(outPath, lines.join("\n"), "utf-8");
console.log(`\nGenerated ${allRecords.length} INSERT statements -> ${outPath}`);

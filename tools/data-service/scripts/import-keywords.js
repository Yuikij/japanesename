const fs = require("fs");
const path = require("path");

const keywords = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../../新版本PSEO改造/keyword/keyword.json"),
    "utf-8"
  )
);

function esc(s) {
  if (s == null) return "NULL";
  return "'" + String(s).replace(/'/g, "''") + "'";
}

function jsonOrNull(v) {
  if (v == null) return "NULL";
  return esc(JSON.stringify(v));
}

const lines = ["-- Auto-generated keyword import", ""];

for (const k of keywords) {
  const vals = [
    esc(k.id),
    esc(k.keyword),
    k.search_volume ?? "NULL",
    k.search_volume_total ?? "NULL",
    k.kd ?? "NULL",
    k.cpc ?? "NULL",
    esc(k.intent),
    esc(k.strategy),
    esc(k.path),
    k.priority ?? 5,
    esc(k.status || "draft"),
    jsonOrNull(k.keyword_aliases),
    jsonOrNull(k.tags_hint),
    esc(k.dimensions),
    jsonOrNull(k.seo),
    esc(k.seo_guidance),
    jsonOrNull(k.filter_rule),
    jsonOrNull(k.quiz),
    jsonOrNull(k.related_keywords),
    esc(k.page_template_type),
    k.relevance_score ?? "NULL",
    esc(k.source),
  ];

  lines.push(
    `INSERT OR REPLACE INTO keywords (id, keyword, search_volume, search_volume_total, kd, cpc, intent, strategy, path, priority, status, keyword_aliases, tags_hint, dimensions, seo, seo_guidance, filter_rule, quiz, related_keywords, page_template_type, relevance_score, source) VALUES (${vals.join(", ")});`
  );
}

const outPath = path.resolve(__dirname, "../src/db/import-keywords.sql");
fs.writeFileSync(outPath, lines.join("\n"), "utf-8");
console.log(`Generated ${keywords.length} INSERT statements -> ${outPath}`);

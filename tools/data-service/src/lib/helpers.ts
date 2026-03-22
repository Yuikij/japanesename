/**
 * D1 返回的 JSON 字段是字符串，需要解析为数组/对象
 */
export function parseJsonFields<T extends Record<string, unknown>>(
  row: T,
  fields: string[]
): T {
  const result = { ...row };
  for (const field of fields) {
    const val = result[field];
    if (typeof val === "string") {
      try {
        (result as Record<string, unknown>)[field] = JSON.parse(val);
      } catch {
        // keep as-is
      }
    }
  }
  return result;
}

const NAME_JSON_FIELDS = [
  "script",
  "use_case",
  "vibe",
  "element",
  "kanji_meaning_tags",
  "kanji_breakdown",
  "alternative_readings",
  "reading_romaji_variants",
  "related_names",
  "famous_bearers",
];

const KEYWORD_JSON_FIELDS = [
  "keyword_aliases",
  "tags_hint",
  "seo",
  "filter_rule",
  "quiz",
  "related_keywords",
];

export function parseNameRow<T extends Record<string, unknown>>(row: T): T {
  return parseJsonFields(row, NAME_JSON_FIELDS);
}

export function parseKeywordRow<T extends Record<string, unknown>>(row: T): T {
  return parseJsonFields(row, KEYWORD_JSON_FIELDS);
}

export function generateId(prefix: string, label: string): string {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 20);
  const rand = Math.random().toString(36).slice(2, 6);
  return `${prefix}_${slug}_${rand}`;
}

/**
 * 将值序列化为 JSON 字符串（如果是数组或对象）
 */
export function toJsonString(val: unknown): string {
  if (val === null || val === undefined) return "[]";
  if (typeof val === "string") return val;
  return JSON.stringify(val);
}

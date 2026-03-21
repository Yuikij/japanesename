---
name: japanesename-data
description: >-
  Query and manage the Japanese name metadata service (names, keywords, tags).
  Use when working with Japanese name data: looking up names by filters (gender,
  vibe, era, popularity), checking keyword SEO data, querying tag enums,
  importing/exporting name records, building filter rules, or checking keyword
  coverage against the name database. Also use when writing code that interacts
  with the data service API at japanesenamedata.yuisama.top.
---

# Japanese Name Data Service

API base: `https://japanesenamedata.yuisama.top`

Auth header (write ops): `X-API-Secret: <secret>` — read ops are open.

## Quick Reference

### Read names

```bash
# List with filters
curl "https://japanesenamedata.yuisama.top/api/names?gender=female&name_part=given_name&status=complete&limit=50&offset=0"

# Single record
curl "https://japanesenamedata.yuisama.top/api/names/{id}"

# Stats overview
curl "https://japanesenamedata.yuisama.top/api/names/stats/summary"
```

### DSL filter query (most powerful)

```bash
curl -X POST https://japanesenamedata.yuisama.top/api/names/query \
  -H "Content-Type: application/json" \
  -d '{
    "filter_rule": {
      "must": [
        { "field": "gender", "op": "eq", "value": "female" },
        { "field": "vibe", "op": "any_of", "value": ["elegant", "gentle"] }
      ],
      "should": [
        { "field": "era", "op": "eq", "value": "modern" }
      ]
    },
    "limit": 100
  }'
```

**Filter operators:**

| op | Usage | Notes |
|----|-------|-------|
| `eq` | Exact match | All fields |
| `any_of` | Value in list (OR) | Array fields: EXISTS; scalar fields: IN |
| `all_of` | All values present (AND) | Array fields only |
| `gte`/`lte`/`gt`/`lt` | Numeric comparison | e.g. `syllable_count` |
| `starts_with` | Prefix match | `romaji` single-char uses index |
| `contains` | Substring / array member | LIKE for scalar, EXISTS for arrays |

**Filterable fields:** `gender`, `name_part`, `era`, `popularity`, `origin_region`, `syllable_count`, `romaji`, `romaji_initial`, `status`, `script`, `use_case`, `vibe`, `element`, `kanji_meaning_tags`

**Array fields** (stored as JSON, use `any_of`/`all_of`/`contains`): `script`, `use_case`, `vibe`, `element`, `kanji_meaning_tags`

### Read keywords

```bash
curl "https://japanesenamedata.yuisama.top/api/keywords?strategy=category_page&status=draft&limit=50"
curl "https://japanesenamedata.yuisama.top/api/keywords/{id}"
```

### Read tags (enum registry)

```bash
# All dimensions grouped
curl "https://japanesenamedata.yuisama.top/api/tags"
# Single dimension
curl "https://japanesenamedata.yuisama.top/api/tags?dimension=vibe"
```

Dimensions: `gender`, `name_part`, `era`, `popularity`, `origin_region`, `script`, `use_case`, `vibe`, `element`

### Write operations

```bash
# Insert names (single or batch with { "items": [...] })
curl -X POST https://japanesenamedata.yuisama.top/api/names \
  -H "X-API-Secret: $SECRET" -H "Content-Type: application/json" \
  -d '{ "romaji":"Sakura", "kanji":"桜", "reading":"さくら", "gender":"female", "name_part":"given_name", "syllable_count":3 }'

# Update name
curl -X PUT https://japanesenamedata.yuisama.top/api/names/{id} \
  -H "X-API-Secret: $SECRET" -H "Content-Type: application/json" \
  -d '{ "status":"complete", "meaning_en":"cherry blossom" }'

# Delete name
curl -X DELETE https://japanesenamedata.yuisama.top/api/names/{id} -H "X-API-Secret: $SECRET"

# Insert keywords (same pattern)
curl -X POST https://japanesenamedata.yuisama.top/api/keywords \
  -H "X-API-Secret: $SECRET" -H "Content-Type: application/json" \
  -d '{ "id":"kw_new", "keyword":"cute japanese names", "search_volume":8100, "strategy":"category_page", "priority":2 }'

# Upsert tag
curl -X POST https://japanesenamedata.yuisama.top/api/tags \
  -H "X-API-Secret: $SECRET" -H "Content-Type: application/json" \
  -d '{ "dimension":"vibe", "value":"mysterious", "label_en":"Mysterious", "label_zh":"神秘" }'
```

### Coverage check

```bash
curl -X POST https://japanesenamedata.yuisama.top/api/keywords/coverage \
  -H "Content-Type: application/json" \
  -d '{ "keyword_ids": ["kw_0001", "kw_0002"] }'
```

Returns `match_count` per keyword and recommendation: `ok` (≥50), `warning` (≥20), `downgrade` (≥5), `block` (<5).

### Export

```bash
# Export names (with optional filters)
curl -X POST https://japanesenamedata.yuisama.top/api/export/names -d '{ "status":"complete" }'

# Export keywords
curl -X POST https://japanesenamedata.yuisama.top/api/export/keywords -d '{ "strategy":"category_page" }'

# Export tag registry (LLM prompt format)
curl -X POST https://japanesenamedata.yuisama.top/api/export/tags

# Full export (reviewed/complete names + quiz_ready/published keywords + all tags)
curl -X POST https://japanesenamedata.yuisama.top/api/export/all
```

## Data Models

### NameRecord key fields

- `id` (string): auto-generated, e.g. `gn_sakura_a1b2`
- `romaji`, `kanji`, `reading` (string): required
- `gender`: `male` / `female` / `unisex`
- `name_part`: `given_name` / `family_name`
- `syllable_count` (int)
- `script`, `use_case`, `vibe`, `element`, `kanji_meaning_tags` (string[]): tag arrays
- `era`: `ancient` / `traditional` / `modern` / `2000s` / `trending`
- `popularity`: `very_common` / `common` / `uncommon` / `rare` / `unique`
- `origin_region`: `japan_native` / `japanese_american` / `international`
- `meaning_en`, `meaning_zh`, `description_en`, `description_zh` (string?)
- `famous_bearers`: `[{ "name": "...", "context": "..." }]`
- `related_names` (string[])
- `status`: `raw` → `llm_enriched` → `reviewed` → `complete`

### KeywordRecord key fields

- `id` (string): e.g. `kw_0001`
- `keyword` (string), `search_volume` (int?), `search_volume_total` (int?)
- `kd` (int? 0-100), `cpc` (float?), `intent` (`I`/`T`/`C`/`N`)
- `strategy`: `category_page` / `blog_post` / `tool_page` / `homepage_seo`
- `path` (string?): URL path like `/names/cute`
- `priority` (int 1-5), `status`: `draft` → `seo_ready` → `filter_ready` → `quiz_ready` → `published`
- `filter_rule` (object?): FilterRule DSL for matching names
- `keyword_aliases` (object[]): `[{ "keyword": "...", "search_volume": 1000 }]`
- `seo` (object?): `{ "title": "...", "h1": "...", "description": "..." }`
- `related_keywords` (object[]): `[{ "label": "...", "path": "..." }]`

## When enriching names with LLM

Fetch tag registry first to ensure valid enum values:

```bash
curl "https://japanesenamedata.yuisama.top/api/tags"
```

For detailed API docs, see [API.md](../../tools/data-service/API.md).

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

Auth header (all ops): `X-API-Secret: kuboshiori`

---

## 1. API Quick Reference

### Read names

```bash
# List with filters
curl -H "X-API-Secret: kuboshiori" \
  "https://japanesenamedata.yuisama.top/api/names?gender=female&name_part=given_name&status=complete&limit=50&offset=0"

# Single record
curl -H "X-API-Secret: kuboshiori" \
  "https://japanesenamedata.yuisama.top/api/names/{id}"

# Stats overview
curl -H "X-API-Secret: kuboshiori" \
  "https://japanesenamedata.yuisama.top/api/names/stats/summary"
```

### DSL filter query (most powerful)

```bash
curl -X POST https://japanesenamedata.yuisama.top/api/names/query \
  -H "X-API-Secret: kuboshiori" -H "Content-Type: application/json" \
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
| `gte`/`lte`/`gt`/`lt` | Numeric comparison | e.g. `syllable_count`, `mora_count`, `national_rank` |
| `starts_with` | Prefix match | `romaji` single-char uses index |
| `contains` | Substring / array member | LIKE for scalar, EXISTS for arrays |

**Filterable fields:** `gender`, `name_part`, `era`, `popularity`, `origin_region`, `regional_origin`, `syllable_count`, `mora_count`, `kanji_count`, `household_count`, `estimated_population`, `national_rank`, `romaji`, `romaji_initial`, `status`, `script`, `use_case`, `vibe`, `element`, `kanji_meaning_tags`, `alternative_readings`

**Array fields** (stored as JSON, use `any_of`/`all_of`/`contains`): `script`, `use_case`, `vibe`, `element`, `kanji_meaning_tags`, `alternative_readings`

### Read keywords

```bash
curl -H "X-API-Secret: kuboshiori" \
  "https://japanesenamedata.yuisama.top/api/keywords?strategy=category_page&status=draft&limit=50"
curl -H "X-API-Secret: kuboshiori" \
  "https://japanesenamedata.yuisama.top/api/keywords/{id}"
```

### Read tags (enum registry)

```bash
curl -H "X-API-Secret: kuboshiori" \
  "https://japanesenamedata.yuisama.top/api/tags"
curl -H "X-API-Secret: kuboshiori" \
  "https://japanesenamedata.yuisama.top/api/tags?dimension=vibe"
```

### Write operations

```bash
# Insert names (single or batch with { "items": [...] })
curl -X POST https://japanesenamedata.yuisama.top/api/names \
  -H "X-API-Secret: kuboshiori" -H "Content-Type: application/json" \
  -d '{ "romaji":"Sakura", "kanji":"桜", "reading":"さくら", "gender":"female", "name_part":"given_name", "syllable_count":3 }'

# Update name (partial update — only send fields you want to change)
curl -X PUT https://japanesenamedata.yuisama.top/api/names/{id} \
  -H "X-API-Secret: kuboshiori" -H "Content-Type: application/json" \
  -d '{ "status":"llm_enriched", "meaning_en":"cherry blossom" }'

# Delete name
curl -X DELETE https://japanesenamedata.yuisama.top/api/names/{id} \
  -H "X-API-Secret: kuboshiori"
```

### Coverage check & Export

```bash
# Check keyword coverage (how many names match each keyword's filter_rule)
curl -X POST https://japanesenamedata.yuisama.top/api/keywords/coverage \
  -H "X-API-Secret: kuboshiori" -H "Content-Type: application/json" \
  -d '{ "keyword_ids": ["kw_0001", "kw_0002"] }'

# Export all data
curl -X POST https://japanesenamedata.yuisama.top/api/export/all \
  -H "X-API-Secret: kuboshiori"
```

---

## 2. NameRecord — Complete Field Reference

### Hard attributes (required on insert)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated: `gn_sakura_a1b2` (given) / `fn_tanaka_a1b2` (family) |
| `romaji` | string | Capitalized romanization, e.g. `Suzuki` |
| `kanji` | string | Kanji writing, e.g. `鈴木` |
| `reading` | string | Hiragana reading, e.g. `すずき` |
| `gender` | enum | `male` / `female` / `unisex` |
| `name_part` | enum | `given_name` / `family_name` |
| `syllable_count` | int | English syllable count from romaji |

### Computed / auto fields

| Field | Type | Description |
|-------|------|-------------|
| `romaji_initial` | string | Auto-computed first letter, e.g. `S` |

### Numeric data fields (from web sources, mainly for family_name)

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| `mora_count` | int? | Computed from reading | Japanese mora count (e.g. きん=2 mora) |
| `kanji_count` | int? | Computed from kanji | Number of kanji chars (0 for pure kana names) |
| `household_count` | int? | japanese-names.info | Approximate number of households |
| `estimated_population` | int? | myoji-yurai.net | Estimated number of people in Japan |
| `national_rank` | int? | myoji-yurai.net | National surname ranking (1=most common) |

### Script & soft attributes

| Field | Type | Values |
|-------|------|--------|
| `script` | string[] | From: `kanji`, `hiragana`, `katakana`, `romaji`. Indicates which writing systems the name uses |
| `era` | enum? | `ancient`, `traditional`, `modern`, `2000s`, `trending` |
| `popularity` | enum? | `very_common`, `common`, `uncommon`, `rare`, `unique` |
| `origin_region` | enum | `japan_native` (default), `japanese_american`, `international` |
| `regional_origin` | string? | Geographic origin: `okinawa`, `kanto`, `kansai`, `tohoku`, `kyushu`, `hokkaido`, `chubu`, `chugoku`, `shikoku` |
| `use_case` | string[] | From: `real_person`, `anime`, `samurai`, `warrior`, `pet`, `game_character`, `baby`, `fantasy`, `historical`, `vtuber` |
| `vibe` | string[] (≤3) | From: `cute`, `cool`, `elegant`, `strong`, `mysterious`, `dark`, `gentle`, `noble`, `playful`, `fierce`, `serene`, `warm`, `edgy`, `scary`, `funny` |
| `element` | string[] (≤3) | From: `fire`, `water`, `ice`, `light`, `dark`, `wind`, `earth`, `moon`, `sun`, `flower`, `mountain`, `sky`, `star`, `death`, `blood`, `thunder` |
| `kanji_meaning_tags` | string[] (10-20) | Open vocabulary. Cover literal meanings, extended meanings, associations, colors, emotions. This is the catch-all field for SEO coverage |

### Structured data fields (JSON)

| Field | Type | Description |
|-------|------|-------------|
| `kanji_breakdown` | array | `[{"kanji":"鈴","meanings_en":["bell","chime","ring"],"reading":"すず"}]` |
| `alternative_readings` | string[] | Other kana readings for same kanji, e.g. `["すすぎ","すすき"]` |
| `reading_romaji_variants` | string[] | Romanization variants, e.g. `["Ohno","Ōno","Oono"]` |
| `related_names` | string[] | IDs of related names |
| `famous_bearers` | array | `[{"name":"Suzuki Ichiro","name_jp":"鈴木一朗","context":"MLB player, born 1973"}]` |

### Text fields (LLM-generated)

| Field | Type | Description |
|-------|------|-------------|
| `meaning_en` | string? | One-line meaning in English |
| `meaning_zh` | string? | One-line meaning in Chinese (optional, lower priority) |
| `description_en` | string? | 2-3 sentence cultural explanation in English |
| `description_zh` | string? | 2-3 sentence cultural explanation in Chinese (optional) |
| `etymology_en` | string? | Historical/geographic origin of the name |
| `kamon_url` | string? | Family crest image URL (family_name only) |

### Management fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | enum | `raw` → `llm_enriched` → `reviewed` → `complete` |
| `source` | string? | Data source tag |

---

## 3. Scraper Scripts

Two helper scripts extract structured JSON from reference websites. Located in `tools/scrapers/`.

### scrape-myoji-yurai.js (family_name only)

Fetches and parses myoji-yurai.net directly. Zero dependencies (Node 18+).

```bash
node tools/scrapers/scrape-myoji-yurai.js 鈴木
```

Output fields: `readings`, `national_rank`, `estimated_population`, `etymology`, `top_regions`, `famous_people` (with `name_jp`).

### parse-japanese-names-info.js (both given_name and family_name)

Parses markdown from a WebFetch of japanese-names.info. Zero dependencies (Node 18+).

japanese-names.info has bot protection (BigScoots WAF) that blocks `curl`. The LLM must use its WebFetch/browser tool to fetch the page, save the markdown output to a file, then pipe it through the parser.

```bash
# Step 1: LLM fetches the page using WebFetch and saves to a file
# Step 2: Parse the saved markdown
cat /path/to/fetched-page.txt | node tools/scrapers/parse-japanese-names-info.js --kanji 愛乃
```

**URL patterns:**
- Given name: `https://japanese-names.info/first-name/{romaji_lowercase}/`
- Family name: `https://japanese-names.info/last-name/{romaji_lowercase}/`

Output fields: `gender`, `hiragana`, `katakana`, `english_syllables`, `japanese_morae`, `household_count`, `variations_count`, `target_variation` (with `feature_tags` and `kanji_breakdown`), `famous_persons`, `explore_tags`.

---

## 4. Name Enrichment SOP

When enriching a name record from `raw` to `llm_enriched`, follow these steps:

### Step 1: Fetch current record

```bash
curl -H "X-API-Secret: kuboshiori" \
  "https://japanesenamedata.yuisama.top/api/names/{id}"
```

Note the `name_part` (family_name or given_name), `romaji`, `kanji`, `reading`.

### Step 2: Gather data via scripts

**If family_name (姓) — run both scripts:**

```bash
# 1. japanese-names.info (LLM WebFetch → parser)
#    Use WebFetch to get https://japanese-names.info/last-name/{romaji_lowercase}/
#    Save output, then:
cat saved-page.txt | node tools/scrapers/parse-japanese-names-info.js --kanji {kanji}

# 2. myoji-yurai.net (direct fetch)
node tools/scrapers/scrape-myoji-yurai.js {kanji}
```

**If given_name (名) — run only japanese-names.info:**

```bash
# WebFetch https://japanese-names.info/first-name/{romaji_lowercase}/
cat saved-page.txt | node tools/scrapers/parse-japanese-names-info.js --kanji {kanji}
# myoji-yurai.net is for surnames only — skip. Use LLM knowledge instead.
```

### Step 3: Combine script output + LLM knowledge

**From script output (hard data):**
- `mora_count` — from `japanese_morae` field, or count from hiragana reading
- `kanji_count` — count kanji characters in the `kanji` field
- `household_count` — from `household_count` (japanese-names.info)
- `estimated_population` — from `estimated_population` (myoji-yurai, family_name only)
- `national_rank` — from `national_rank` (myoji-yurai, family_name only)
- `alternative_readings` — from `readings` (myoji-yurai, exclude the primary reading)
- `kanji_breakdown` — from `target_variation.kanji_breakdown`, reformat to `[{"kanji":"鈴","meanings_en":[...],"reading":"すず"}]`
- `famous_bearers` — combine both scripts' output. `name_jp` MUST come from script data. Pick top 3-5 most notable people.
- `regional_origin` — infer from `etymology` + `top_regions` (myoji-yurai, family_name only)

**From LLM knowledge (soft tags):**
- `era` — which era the name is most associated with
- `popularity` — can also be derived from estimated_population / feature_tags
- `use_case` — what contexts this name is used in
- `vibe` — the feeling/atmosphere of the name (pick ≤3)
- `element` — natural elements/symbols associated (pick ≤3)
- `kanji_meaning_tags` — generate 10-20 English tags covering literal, extended, and associative meanings of all kanji
- `meaning_en` — one concise sentence about the name's meaning
- `description_en` — 2-3 sentences with cultural context, ranking, origin
- `etymology_en` — historical origin story (use myoji-yurai etymology as basis for family_name)

**Important rules:**
- `name_jp` in `famous_bearers` must come from script data — LLM should NOT guess kanji spellings for person names
- `kanji_meaning_tags` should be extensive (10-20 tags) — this is the catch-all field for SEO keyword matching
- `vibe` and `element` are limited to ≤3 each — pick the most representative ones
- Chinese fields (`meaning_zh`, `description_zh`) are optional and lower priority
- Fix any data quality issues (e.g. trailing `\r` in romaji, wrong capitalization)

### Step 4: Update via API

```bash
curl -X PUT "https://japanesenamedata.yuisama.top/api/names/{id}" \
  -H "X-API-Secret: kuboshiori" -H "Content-Type: application/json" \
  -d '{
    "romaji": "Suzuki",
    "mora_count": 3,
    "kanji_count": 2,
    "era": "traditional",
    "popularity": "very_common",
    "regional_origin": "kansai",
    "use_case": ["real_person", "historical"],
    "vibe": ["warm", "gentle"],
    "element": ["earth"],
    "kanji_meaning_tags": ["bell", "chime", "tree", "wood", "nature", ...],
    "household_count": 400000,
    "estimated_population": 1745000,
    "national_rank": 2,
    "kanji_breakdown": [
      {"kanji": "鈴", "meanings_en": ["bell", "chime", "ring"], "reading": "すず"},
      {"kanji": "木", "meanings_en": ["tree", "wood", "simple"], "reading": "き"}
    ],
    "alternative_readings": ["すすぎ", "すすき", "すずぎ"],
    "famous_bearers": [
      {"name": "Suzuki Ichiro", "name_jp": "鈴木一朗", "context": "MLB legend, born 1973"}
    ],
    "meaning_en": "Bell tree — a sacred staff with bells used in Shinto rituals.",
    "description_en": "Japan'"'"'s 2nd most common surname with ~1.75 million bearers...",
    "etymology_en": "Originates from the Hotaka clan of Kii Province...",
    "status": "llm_enriched",
    "source": "japanese-names.info, myoji-yurai.net, llm"
  }'
```

### Step 5: Verify

```bash
curl -H "X-API-Secret: kuboshiori" \
  "https://japanesenamedata.yuisama.top/api/names/{id}"
```

Confirm all fields are populated and status is `llm_enriched`.

---

## 5. Tag Enum Values (Complete Reference)

### gender
`male`, `female`, `unisex`

### name_part
`given_name`, `family_name`

### era
`ancient`, `traditional`, `modern`, `2000s`, `trending`

### popularity
`very_common`, `common`, `uncommon`, `rare`, `unique`

### origin_region
`japan_native`, `japanese_american`, `international`

### script
`kanji`, `hiragana`, `katakana`, `romaji`

### use_case
`real_person`, `anime`, `samurai`, `warrior`, `pet`, `game_character`, `baby`, `fantasy`, `historical`, `vtuber`

### vibe (pick ≤3)
`cute`, `cool`, `elegant`, `strong`, `mysterious`, `dark`, `gentle`, `noble`, `playful`, `fierce`, `serene`, `warm`, `edgy`, `scary`, `funny`

### element (pick ≤3)
`fire`, `water`, `ice`, `light`, `dark`, `wind`, `earth`, `moon`, `sun`, `flower`, `mountain`, `sky`, `star`, `death`, `blood`, `thunder`

### kanji_meaning_tags (10-20, open vocabulary)
No fixed enum. Examples: `beauty`, `truth`, `dragon`, `village`, `field`, `river`, `wisdom`, `love`, `iron`, `gold`, `mountain`, `cherry_blossom`, `bell`, `tree`, `shrine`, `harvest`

---

## 6. KeywordRecord Key Fields

- `id` (string): e.g. `kw_0001`
- `keyword` (string), `search_volume` (int?), `search_volume_total` (int?)
- `kd` (int? 0-100), `cpc` (float?), `intent` (`I`/`T`/`C`/`N`)
- `strategy`: `category_page` / `blog_post` / `tool_page` / `homepage_seo`
- `path` (string?): URL path like `/names/cute`
- `priority` (int 1-5), `status`: `draft` → `seo_ready` → `filter_ready` → `quiz_ready` → `published`
- `filter_rule` (object?): FilterRule DSL for matching names
- `seo` (object?): `{ "title", "h1", "description", "keywords" }`
- `related_keywords` (object[]): `[{ "label", "path" }]`

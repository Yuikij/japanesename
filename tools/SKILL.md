---
name: japanesename-data
description: >-
  Query and manage the Japanese name metadata service (names, keywords, tags).
  Use when working with Japanese name data: looking up names by filters (gender,
  vibe, era, popularity), checking keyword SEO data, querying tag enums,
  importing/exporting name records, building filter rules, or checking keyword
  coverage against the name database. Also use when building multi-source
  evidence packets from external websites and asking an LLM to analyze,
  reconcile, and fill structured fields before writing back to
  japanesenamedata.yuisama.top.
---

# Japanese Name Data Service

API base: `https://japanesenamedata.yuisama.top`

Auth header (all ops): `X-API-Secret: $JAPANESE_NAME_API_SECRET`

> **Security**: Read the secret from the environment variable `JAPANESE_NAME_API_SECRET`. Never hardcode it in code or commit it to the repository.

---

## 1. API Quick Reference

### Read names

```bash
# List with filters
curl -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" \
  "https://japanesenamedata.yuisama.top/api/names?gender=female&name_part=given_name&status=complete&limit=50&offset=0"

# Single record
curl -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" \
  "https://japanesenamedata.yuisama.top/api/names/{id}"

# Stats overview
curl -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" \
  "https://japanesenamedata.yuisama.top/api/names/stats/summary"
```

### DSL filter query (most powerful)

```bash
curl -X POST https://japanesenamedata.yuisama.top/api/names/query \
  -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" -H "Content-Type: application/json" \
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
curl -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" \
  "https://japanesenamedata.yuisama.top/api/keywords?strategy=category_page&status=draft&limit=50"
curl -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" \
  "https://japanesenamedata.yuisama.top/api/keywords/{id}"
```

### Read tags (enum registry)

```bash
curl -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" \
  "https://japanesenamedata.yuisama.top/api/tags"
curl -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" \
  "https://japanesenamedata.yuisama.top/api/tags?dimension=vibe"
```

### Write operations

```bash
# Insert names (single or batch with { "items": [...] })
curl -X POST https://japanesenamedata.yuisama.top/api/names \
  -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" -H "Content-Type: application/json" \
  -d '{ "romaji":"Sakura", "kanji":"桜", "reading":"さくら", "gender":"female", "name_part":"given_name", "syllable_count":3 }'

# Update name (partial update — only send fields you want to change)
curl -X PUT https://japanesenamedata.yuisama.top/api/names/{id} \
  -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" -H "Content-Type: application/json" \
  -d '{ "status":"llm_enriched", "meaning_en":"cherry blossom" }'

# Delete name
curl -X DELETE https://japanesenamedata.yuisama.top/api/names/{id} \
  -H "X-API-Secret: $JAPANESE_NAME_API_SECRET"
```

### Coverage check & Export

```bash
# Check keyword coverage (how many names match each keyword's filter_rule)
curl -X POST https://japanesenamedata.yuisama.top/api/keywords/coverage \
  -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" -H "Content-Type: application/json" \
  -d '{ "keyword_ids": ["kw_0001", "kw_0002"] }'

# Export all data
curl -X POST https://japanesenamedata.yuisama.top/api/export/all \
  -H "X-API-Secret: $JAPANESE_NAME_API_SECRET"
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

Four helper scripts extract structured JSON from reference websites. Located in `tools/scrapers/`. All zero dependencies (Node 18+), direct HTTP fetch.

### Source priority

| Source | Covers | Direct HTTP | Primary use |
|--------|--------|-------------|-------------|
| **myoji-yurai.net** | family_name | ✅ | Rank, population, etymology, regions, famous people |
| **behindthename.com** | given_name + family_name | ✅ | Meaning, vibes, categories, scripts (kanji/kana) |
| **kanshudo.com** | given_name + family_name | ✅ | Readings, frequency rank, alt readings |
| japanese-names.info | given_name + family_name | ❌ (WAF) | Fallback only — use if WebFetch succeeds |

### Candidate direct-URL sources (evaluate before production use)

| Source | Useful for | Reliability / Anti-bot | Recommendation |
|--------|------------|------------------------|----------------|
| **kanjiapi.dev** | Single-kanji meaning/reading metadata (`kanji_breakdown` fallback) | High (public JSON API) | ✅ Supplementary fallback for kanji-level facts |
| **jisho.org** | Dictionary-style kanji/word meanings, reading hints | Medium (HTML can change) | ✅ Supplementary for semantic hints only |
| **forebears.io** | Global surname distribution and coarse prevalence | Medium (Japan specificity is limited) | ⚠️ Optional: only for coarse rarity/popularity hints |
| **ja.wikipedia.org / en.wikipedia.org** | Person-level references (famous bearers context) | Medium (page ambiguity, disambiguation noise) | ⚠️ Use only as person-level evidence, not surname authority |
| **ancestry.com** | Generic surname-origin pages | Low (strong anti-bot + weak JP coverage) | ❌ Avoid in automated batch pipeline |

Rules for adding new sources:

1. Must have stable direct URL pattern for kanji or romaji input.
2. Must return parseable content for at least 60% of probe samples.
3. Must clearly improve at least one field group (`rank/population`, `readings`, `kanji_breakdown`, `famous_bearers`).
4. If anti-bot blocks are frequent, keep source in optional/manual tier only.

### probe-source-urls.js (source feasibility checker)

Use this before integrating any new website into batch runs.

```bash
node tools/scrapers/probe-source-urls.js --timeoutMs 12000 --outFile tools/scrapers/source-probe-result.json
```

Optional custom samples:

```bash
node tools/scrapers/probe-source-urls.js --samples "佐藤:sato:family_name,結衣:yui:given_name"
```

Output includes per-source:

- `ok_rate`
- `marker_hit_rate`
- `blocked_rate`
- `status_counts`

Use these metrics to decide `primary / supplementary / optional / avoid`.

### scrape-myoji-yurai.js (family_name — primary)

```bash
node tools/scrapers/scrape-myoji-yurai.js 鈴木
```

Output: `readings`, `national_rank`, `estimated_population`, `etymology`, `top_regions` (`prefecture`, `count_raw`, `count`), `famous_people` (`name_jp`).

### scrape-behindthename.js (given_name — primary; family_name — supplementary)

```bash
# Given name
node tools/scrapers/scrape-behindthename.js --given aiko

# Family name (uses surnames.behindthename.com)
node tools/scrapers/scrape-behindthename.js --family suzuki
```

Output: `gender`, `usage`, `scripts` (`kanji`, `hiragana`, `katakana`), `meaning` (English etymology with kanji breakdown), `vibes` (trait + weight, given_name only), `categories`.

### scrape-kanshudo.js (both — supplementary)

```bash
node tools/scrapers/scrape-kanshudo.js 佐藤
```

Output: `common_reading` (`hiragana`, `romaji`), `reading_type`, `alternative_readings` (each with `hiragana`, `romaji`, `type`), `frequency_rank`, `external_links`.

### parse-japanese-names-info.js (both — fallback)

Parses markdown from a WebFetch of japanese-names.info. Has WAF bot protection — only works via LLM WebFetch tool, not direct HTTP.

```bash
# Step 1: LLM fetches page via WebFetch and saves to file
# Step 2: Parse the saved markdown
cat saved-page.txt | node tools/scrapers/parse-japanese-names-info.js --kanji 愛乃
```

Output: `gender`, `hiragana`, `katakana`, `english_syllables`, `japanese_morae`, `household_count`, `variations_count`, `target_variation` (`feature_tags`, `kanji_breakdown`), `famous_persons` (`confidence`: `high`/`low`/`unparsed`), `explore_tags`.

---

## 4. Evidence-Driven Name Enrichment SOP

When enriching a name from `raw` to `llm_enriched`, use an **evidence-first** pipeline:

1. Collect structured outputs from multiple websites.
2. Keep source provenance (which source said what).
3. Ask LLM to reconcile conflicts and fill missing fields.
4. Write the consolidated result back to the API.

Do **not** hardcode a strict source→field mapping. Any source can contribute evidence for multiple fields.

### Step 1: Fetch current record

```bash
curl -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" \
  "https://japanesenamedata.yuisama.top/api/names/{id}"
```

Use `name_part`, `romaji`, `kanji`, and `reading` as query seeds for scraping.

### Step 2: Collect multi-source evidence

Run all available scrapers for the record type (family/given), then capture raw outputs as evidence items.

```bash
# family_name example
node tools/scrapers/scrape-myoji-yurai.js {kanji}
node tools/scrapers/scrape-behindthename.js --family {romaji_lowercase}
node tools/scrapers/scrape-kanshudo.js {kanji}

# given_name example
node tools/scrapers/scrape-behindthename.js --given {romaji_lowercase}
node tools/scrapers/scrape-kanshudo.js {kanji}
```

Fallback if needed: WebFetch + `parse-japanese-names-info.js`.

### Step 3: Build an evidence packet (intermediate layer)

Before prompting the LLM, normalize all source outputs into a common packet with provenance.

```json
{
  "record_seed": { "id": "...", "name_part": "family_name", "kanji": "鈴木", "romaji": "Suzuki" },
  "evidence": [
    {
      "source": "myoji-yurai.net",
      "captured_at": "2026-03-23T10:00:00Z",
      "url": "https://...",
      "facts": { "national_rank": 2, "estimated_population": 1745000 },
      "raw_excerpt": "..."
    },
    {
      "source": "kanshudo.com",
      "facts": { "alternative_readings": ["..."], "frequency_rank": 3 }
    }
  ]
}
```

Recommended evidence item fields: `source`, `url`, `captured_at`, `facts`, `raw_excerpt`, `confidence`.

### Step 4: Ask LLM to reconcile + enrich

Prompt the LLM with the evidence packet and require two output layers:

- `verified_facts`: Values directly supported by one or more sources.
- `inferred_fields`: Semantic enrichments inferred from evidence + world knowledge (with rationale).

Required behaviors:

- Resolve conflicts by source reliability + recency + cross-source agreement.
- Keep uncertain values nullable and record why.
- Prefer conservative outputs over fabricated specifics.
- Preserve provenance notes for human review.

### Step 5: Produce final patch payload

Generate one merged payload for the API update. Keep `source` as a summary of used sources.

```json
{
  "status": "llm_enriched",
  "source": "myoji-yurai.net, behindthename.com, kanshudo.com, llm",
  "national_rank": 2,
  "estimated_population": 1745000,
  "alternative_readings": ["すすぎ", "すすき"],
  "meaning_en": "...",
  "description_en": "...",
  "kanji_meaning_tags": ["bell", "tree", "shrine", "nature"]
}
```

### Step 6: Update + verify

Update via API:

```bash
curl -X PUT "https://japanesenamedata.yuisama.top/api/names/{id}" \
  -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" -H "Content-Type: application/json" \
  -d '{ ...merged_payload_from_evidence_and_llm... }'
```

Verify:

```bash
curl -H "X-API-Secret: $JAPANESE_NAME_API_SECRET" \
  "https://japanesenamedata.yuisama.top/api/names/{id}"
```

Confirm status and core fields are updated, and provenance is retained in `source`.

### Quality rules (still required)

- `name_jp` in `famous_bearers` must come from scraped evidence, never guessed.
- `kanji_meaning_tags` should stay broad (10-20) for SEO recall.
- `vibe` and `element` are capped at ≤3 representative tags.
- Chinese fields are optional.
- Clean obvious data issues before writing (capitalization, trailing control chars, duplicate tags).

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

---

## 7. Batch Enrichment at Scale (e.g. 200 names)

Goal: maximize **speed**, **accuracy**, and **coverage** while minimizing **LLM token cost**.

### 7.1 Recommended architecture (3-stage)

1. **Stage A — Fast scrape fan-out (non-LLM)**
   - Run scrapers in parallel and store raw JSON per source per name.
   - Keep strict timeout/retry policy per source.
2. **Stage B — Evidence normalization (non-LLM)**
   - Convert source outputs into compact evidence packets.
   - Deduplicate repeated facts before LLM.
3. **Stage C — LLM reconcile + enrich (LLM)**
   - Send only compact evidence, not full raw pages.
   - Return `verified_facts` + `inferred_fields` + `uncertainties`.

### 7.2 Throughput settings for 200 records

Use a queue with bounded concurrency:

- Scraper worker concurrency: **8-12**
- LLM worker concurrency: **3-5**
- API write batch size (`POST /api/names` with `items`): **20-50** per request
- Retry policy: exponential backoff (`1s`, `2s`, `4s`), max **3** attempts

Practical execution order:

- Pass 1: all 200 records run Stage A + B.
- Pass 2: only records with enough evidence go to Stage C.
- Pass 3: fallback sources only for records still missing critical fields.

### 7.3 Accuracy strategy (without large token increase)

Use a confidence gate before LLM output is accepted:

- **High confidence**: 2+ sources agree, or 1 high-trust source + internal consistency.
- **Medium confidence**: single source but coherent; allow write with nullable uncertain fields.
- **Low confidence**: conflict or sparse evidence; mark for retry/review, do not hallucinate.

Conflict resolution priority (default):

1. Cross-source agreement
2. Source reliability for the specific fact type
3. Recency/timestamp
4. Conservative null fallback

### 7.4 Token minimization playbook

For each name, reduce LLM input size aggressively:

- Send **facts only** (normalized JSON), avoid long raw HTML/markdown.
- Truncate long text to short excerpts (e.g. max 300-500 chars per source excerpt).
- Remove duplicate facts across sources before prompt.
- Use a fixed response schema (JSON only) to avoid verbose prose.
- Split generation:
  - Step C1 (cheap): reconcile factual fields only.
  - Step C2 (only if needed): generate narrative fields (`meaning_en`, `description_en`, `etymology_en`).
- Skip C2 when factual confidence is low.

### 7.5 Minimal prompt contract for batch mode

Require this output object for each record:

```json
{
  "id": "...",
  "verified_facts": { "...": "..." },
  "inferred_fields": { "...": "..." },
  "uncertainties": ["..."],
  "confidence": "high|medium|low",
  "source_summary": ["myoji-yurai.net", "kanshudo.com"]
}
```

Keep prompts deterministic:

- temperature: low (e.g. `0-0.2`)
- strict JSON mode / schema validation
- no chain-of-thought in output

### 7.6 “Fastest + best quality” default profile

Use this profile as a starting point for 200 records:

- Scraper concurrency: `10`
- LLM concurrency: `4`
- API write chunk: `25`
- LLM calls per record:
  - `1` factual reconcile call (always)
  - `+1` narrative call only when confidence ≥ medium and key facts present
- Target retries:
  - source fetch failures: up to `3`
  - LLM schema failures: up to `2`

### 7.7 Batch quality KPIs (track every run)

- Completion rate: `% records written as llm_enriched`
- Evidence sufficiency rate: `% records with >=2 sources`
- Low-confidence rate: `% records flagged low`
- Avg tokens per record: input/output and total cost
- Rework rate: `% records requiring manual patch`

If token budget is tight, reduce narrative generation first, not factual reconciliation.

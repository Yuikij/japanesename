# Japanese Name Data — Enrichment Skill

> This document tells an AI agent how to enrich Japanese name records.
> It is self-contained and agent-agnostic (works with any LLM agent).

API base: `https://japanesenamedata.yuisama.top`
Auth: `X-API-Secret: $JAPANESE_NAME_API_SECRET` (read from env, never hardcode)

Related docs (same `tools/` directory):
- **API reference**: `tools/data-service/API.md`
- **Scraper scripts**: `tools/SCRAPERS.md`

---

## 0. BEHAVIORAL RULES — READ FIRST

### You MUST

- **Use your own knowledge** to fill soft fields. You are a large language model trained on extensive Japanese language and culture data. That training IS the tool for semantic fields.
- Process each name by **reading its kanji → understanding each character's meaning and cultural connotation → making a judgment**.
- Execute API writes via `curl` or simple inline `fetch` calls (no external dependencies needed).

### You MUST NOT

- **Write deterministic mapping scripts** (e.g. `if kanji.includes('花') → vibe = ['cute']`). Kanji meaning depends on context, combination, and cultural usage — a mapping table cannot capture this. These scripts produce garbage data.
- **Call external LLM APIs** (OpenAI, Gemini, Anthropic, etc.) via `fetch`, SDKs, or subprocess. You ARE the LLM. Do the reasoning in your working session.
- **Bulk-default fields** (e.g. setting every name to `["gentle"]`). Every name deserves individual reasoning.

---

## 1. Field Ownership — Who Fills What

### Scraped fields → use scraper scripts, output is factual

| Field | Source | Notes |
|-------|--------|-------|
| `national_rank` | myoji-yurai.net | family_name only |
| `estimated_population` | myoji-yurai.net | family_name only |
| `household_count` | japanese-names.info | fallback source |
| `alternative_readings` | kanshudo.com | both given/family |
| `kanji_breakdown` | behindthename / japanese-names.info | literal per-kanji meanings |
| `famous_bearers` | myoji-yurai / japanese-names.info | **NEVER fabricate — must have source** |
| `regional_origin` | myoji-yurai.net (top_regions) | family_name; infer from evidence |
| `reading_romaji_variants` | kanshudo.com | e.g. Ohno/Ōno/Oono |

### AI-judged fields → you decide, using kanji knowledge + cultural understanding

| Field | Type | How to judge |
|-------|------|-------------|
| `vibe` | string[] ≤3 | What feeling does this name evoke? Consider each kanji's connotation and overall impression |
| `element` | string[] ≤3 | What natural/thematic element does the name connect to? Based on kanji literal meanings |
| `era` | enum | When was this name popular? Use your knowledge of Japanese naming trends |
| `popularity` | enum | How common? Cross-reference `national_rank`/`estimated_population` if available |
| `use_case` | string[] | Where would this name appear? (real person, anime, historical, etc.) |
| `kanji_meaning_tags` | string[] 10-20 | **Broad SEO catch-all.** Literal meanings + extended associations + colors + emotions + concepts |
| `meaning_en` | string | One-line English meaning synthesized from kanji breakdown |
| `description_en` | string | 2-3 sentence cultural context |
| `etymology_en` | string | Historical/geographic origin |
| `kamon_prompt` | string | **family_name only.** English prompt for generating a kamon (family crest) image. Describe the crest's visual motifs based on the family name's kanji meanings and cultural associations |
| `script` | string[] | Which writing systems — just inspect the kanji/reading fields |
| `origin_region` | enum | Default `japan_native` unless evidence says otherwise |
| `mora_count` | int | Count mora from reading (さくら = 3) |
| `kanji_count` | int | Count kanji characters |

### Do NOT fill without evidence

| Field | Why |
|-------|-----|
| `famous_bearers` | Must come from scraped data. Never fabricate people. |
| `national_rank` / `estimated_population` | Exact numbers from myoji-yurai only |
| `household_count` | Exact number from japanese-names.info only |
| `kamon_url` | Requires a verified image URL |
| `kamon_prompt` | Only for `family_name`; leave null for `given_name` |

---

## 2. Enrichment Workflow

### Single name: raw → llm_enriched

```
Step 1  GET /api/names/{id}              ← read current record
Step 2  Run scrapers (see SCRAPERS.md)   ← collect hard facts
Step 3  Validate existing fields         ← check for known data issues (see below)
Step 4  YOU reason about soft fields     ← in your head, not in a script
Step 5  PUT /api/names/{id}              ← write merged result
Step 6  GET /api/names/{id}              ← verify write succeeded
```

### Step 3 — validate existing fields before enriching

Some records have pre-existing data from earlier automated runs that may contain errors. **Do not blindly trust existing values.** Check for these known issues:

| Field | Known issue | What to do |
|-------|------------|------------|
| `kanji_breakdown[].reading` | May contain the full name reading instead of the per-kanji reading | Fix: each kanji entry's reading must be that single character's reading only (e.g. 郁彦 → 郁=くに, 彦=ひこ, NOT both=くにひこ) |
| `alternative_readings` | May contain alternative **kanji writings** instead of actual reading variants | Fix: this field should hold kana/romaji reading variants. Alternative kanji spellings belong in a different context |
| `era` / `popularity` | May have been set by a deterministic mapping script | Re-evaluate using your own judgment; override if the existing value feels wrong |
| `vibe` / `element` / `use_case` | If present and all records share suspiciously similar values | Override with your own judgment |

**Rule of thumb**: if a soft field already has a value, treat it as a *hint* you can override, not as a confirmed fact. Your fresh judgment based on kanji meaning is more reliable than pre-existing script-generated values. Override with a **better value** — never clear a soft field to null just because you distrust the old value.

### Step 4 — how to reason (two examples)

**Example A**: `kanji=桜`, `reading=さくら`, `name_part=given_name`, `gender=female`

- 桜 = cherry blossom — Japan's national flower, symbol of ephemeral beauty (mono no aware)
- Cultural associations: spring, renewal, femininity, grace
- **vibe**: `["elegant", "gentle", "serene"]` — graceful, not fierce
- **element**: `["flower", "wind"]` — flower is literal; wind = petals scattering
- **era**: `"modern"` — popular since mid-20th century, still common
- **popularity**: `"common"` — one of the most recognized Japanese female names
- **use_case**: `["real_person", "baby", "anime"]`
- **kanji_meaning_tags**: `["cherry_blossom", "flower", "spring", "beauty", "ephemeral", "renewal", "pink", "nature", "grace", "petal", "japan", "feminine"]`
- **meaning_en**: `"Cherry blossom"`
- **description_en**: `"Sakura (桜) means cherry blossom, Japan's most iconic flower symbolizing the beauty of life and the passage of time. It is one of the most popular female given names, evoking elegance and natural grace."`

**Example B**: `kanji=鉄`, `reading=てつ`, `name_part=given_name`, `gender=male`

- 鉄 = iron/steel — strong, industrial, unyielding
- **vibe**: `["strong", "fierce"]` — hard, masculine
- **element**: `["earth", "fire"]` — iron from earth, forged in fire
- **era**: `"traditional"` — old-school masculine name
- **kanji_meaning_tags**: `["iron", "steel", "strength", "metal", "forge", "hard", "unyielding", "industrial", "masculine", "endurance", "warrior"]`
- **kamon_prompt**: `null` — given_name, not applicable

**Example C**: `kanji=藤原`, `reading=ふじわら`, `name_part=family_name`

- 藤 = wisteria vine; 原 = field/plain
- **vibe**: `["elegant", "noble"]` — aristocratic clan name
- **element**: `["flower"]` — wisteria is literal
- **era**: `"ancient"` — one of the oldest and most powerful clan surnames
- **kanji_meaning_tags**: `["wisteria", "vine", "field", "plain", "noble", "aristocratic", "clan", "purple", "flower", "heian", "court", "elegance"]`
- **kamon_prompt**: `"A Japanese family crest (kamon) in solid black on white background. Circular design featuring stylized wisteria (fuji) flowers hanging in elegant cascading clusters, with curving vines and leaves arranged in a symmetrical pattern within a round frame. Clean, geometric, traditional mon style."`

### Batch processing

For batches (50+), repeat per-name reasoning. Work in groups of ~10-20, build payloads mentally, then write via curl. Do NOT write a script to automate the reasoning step.

---

## 3. Tag Enum Values

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
No fixed enum. Cover: literal kanji meanings, extended associations, colors, emotions, cultural concepts.

---

## 4. Quality Rules

- `famous_bearers.name_jp` — must come from scraped evidence, NEVER fabricate
- `kanji_meaning_tags` — aim for 10-20 for SEO breadth
- `vibe` and `element` — max 3 each, pick the most representative
- **Soft fields** (`vibe`, `element`, `era`, `meaning_en`, `kanji_meaning_tags`, etc.) — be **confident and decisive**. You know enough about kanji semantics and Japanese culture to make a good call. Fill these for every name. Only leave null if you genuinely cannot read the kanji or the name is completely opaque to you.
- **Hard fields** (`famous_bearers`, `national_rank`, `estimated_population`, etc.) — these require exact data. Leave null if no scraped evidence exists. Never fabricate.
- Clean data before writing: consistent capitalization, no trailing whitespace, no duplicate tags
- Chinese fields (`meaning_zh`, `description_zh`) are optional / lower priority
- Set `status` to `"llm_enriched"` after enrichment
- Set `source` to comma-separated list, e.g. `"myoji-yurai.net, kanshudo.com, llm"`

---

## 5. NameRecord — Field Reference (compact)

### Hard attributes (required on insert)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated: `gn_sakura_a1b2` / `fn_tanaka_a1b2` |
| `romaji` | string | Capitalized romanization |
| `kanji` | string | Kanji writing |
| `reading` | string | Hiragana reading |
| `gender` | enum | `male` / `female` / `unisex` |
| `name_part` | enum | `given_name` / `family_name` |
| `syllable_count` | int | English syllable count from romaji |

### Structured data fields

| Field | Type | Example |
|-------|------|---------|
| `kanji_breakdown` | object[] | `[{"kanji":"鈴","meanings_en":["bell","chime"],"reading":"すず"}]` |
| `alternative_readings` | string[] | `["すすぎ","すすき"]` |
| `reading_romaji_variants` | string[] | `["Ohno","Ōno","Oono"]` |
| `related_names` | string[] | IDs of related names |
| `famous_bearers` | object[] | `[{"name":"Suzuki Ichiro","name_jp":"鈴木一朗","context":"MLB player"}]` |
| `kamon_prompt` | string | family_name only: English prompt describing kamon visual motifs |

### Management

| Field | Type | Description |
|-------|------|-------------|
| `status` | enum | `raw` → `llm_enriched` → `reviewed` → `complete` |
| `source` | string | Data provenance summary |

> Full API spec (endpoints, DSL filter, keyword/tag CRUD, export) → `tools/data-service/API.md`

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
- **Understand the compound meaning first.** Multi-kanji names form a combined concept — 細井 means "narrow well," not "slender + well." Always synthesize the overall meaning before filling any field. This compound meaning drives `meaning_en`, `description_en`, `etymology_en`, and informs every other soft field.
- **Recognize phonetic kanji (当て字).** Some kanji in names are purely phonetic — chosen for their reading, not their meaning. Common examples: 亜 (あ), 也 (や), 奈 (な). When a kanji is phonetic, do NOT force its dictionary meaning into `meaning_en` or `kanji_meaning_tags`. Acknowledge it as phonetic in `description_en`/`etymology_en`. Example: 亜喜央 → meaning should focus on 喜 (joy) + 央 (center), not treat 亜 as "subtle."
- Process each name by **reading its kanji → understanding each character's meaning → synthesizing the compound meaning → making a judgment**.
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
| `kanji_breakdown` | behindthename / japanese-names.info / **AI fallback** | literal per-kanji meanings; **if scraper returns nothing, fill it yourself** — you know kanji meanings |
| `famous_bearers` | myoji-yurai / japanese-names.info | **NEVER fabricate — must have source** |
| `regional_origin` | myoji-yurai.net (top_regions) | family_name; infer from evidence |
| `reading_romaji_variants` | kanshudo.com | e.g. Ohno/Ōno/Oono |

### AI-judged fields → you decide, using kanji knowledge + cultural understanding

| Field | Type | How to judge |
|-------|------|-------------|
| `vibe` | string[] **2-3** | What feeling does this name evoke? **Aim for 2-3 tags** for SEO coverage. Only use 1 if truly single-dimensional |
| `element` | string[] **2-3** | What natural/thematic element does the name connect to? **Aim for 2-3** when kanji support it (井→water+earth, 桜→flower+wind). But **never pad with weak connections** — if the name only genuinely links to 1 element, use 1. Not every name has strong elemental associations |
| `era` | enum | When was this name popular? Use your knowledge of Japanese naming trends |
| `popularity` | enum | How common? Cross-reference `national_rank`/`estimated_population` if available |
| `use_case` | string[] | Where would this name appear? Think broadly: historical figures in `famous_bearers` → add `historical`; traditional but still used → add `baby` |
| `kanji_meaning_tags` | string[] 10-20 | **Semantic associations only.** Literal kanji meanings + extended concepts + colors + emotions. **NEVER include**: readings (ほそい, hosoi), generic filler (japanese surname, family name), or vibe/element duplicates |
| `meaning_en` | string | **Compound meaning**, not a kanji-by-kanji list. 細井→"Narrow well", NOT "slender, fine, delicate, well" |
| `description_en` | string | 2-3 sentences of **specific** cultural context. Mention name origin pattern (topographic, occupational, clan), historical significance, or regional associations |
| `etymology_en` | string | **Specific** origin story. 細井→"Topographic surname referring to a narrow well." NEVER use generic templates like "fitting common Japanese family-name patterns" |
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
| `vibe` / `element` / `use_case` | If present and all records share suspiciously similar values, or only 1 tag when 2-3 are appropriate | Override with your own judgment; aim for 2-3 tags |
| `kanji_meaning_tags` | May contain readings (ほそい, hosoi), generic SEO filler (japanese surname, family name, japanese last name), or duplicates of vibe/element values | Remove garbage entries; replace with real semantic associations (concepts, colors, emotions derived from kanji meaning) |
| `meaning_en` | May be a lazy kanji-by-kanji list like "slender, fine, delicate, well" instead of compound meaning | Rewrite as synthesized compound meaning: "Narrow well" |
| `description_en` | May be a generic template applicable to any name | Rewrite with specific cultural context: origin pattern, historical significance, regional associations |
| `etymology_en` | May be a generic template like "fitting common Japanese family-name patterns tied to landscape, settlement, occupation, or old clan association" | Rewrite with specific origin: "Topographic surname referring to a narrow well" |
| `kanji_breakdown` | May be empty `[]` even though the kanji is perfectly readable | Fill it yourself — you know the per-kanji meanings and readings |

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
- **Compound meaning**: "Wisteria field" — a place overgrown with wisteria
- **vibe**: `["elegant", "noble", "serene"]` — aristocratic clan name, evokes the refined Heian court
- **element**: `["flower", "earth", "wind"]` — wisteria is a flower, 原 connects to earth/land, wisteria sways in wind
- **era**: `"ancient"` — one of the oldest and most powerful clan surnames
- **use_case**: `["real_person", "historical", "baby"]` — still a real surname, deeply historical, occasionally used
- **kanji_meaning_tags**: `["wisteria", "vine", "field", "plain", "noble", "aristocratic", "clan", "purple", "flower", "heian", "court", "elegance", "power", "regency"]`
- **meaning_en**: `"Wisteria field"`
- **etymology_en**: `"Ancient clan surname of the Fujiwara clan (藤原氏), one of the most powerful families in Japanese history, dominant at the Heian court. The name refers to a field of wisteria."`
- **description_en**: `"Fujiwara (藤原) means 'wisteria field' and is one of the most historically significant surnames in Japan. The Fujiwara clan dominated Heian-era court politics for centuries through strategic marriages into the imperial family. The name evokes aristocratic elegance and political power."`
- **kamon_prompt**: `"A Japanese family crest (kamon) in solid black on white background. Circular design featuring stylized wisteria (fuji) flowers hanging in elegant cascading clusters, with curving vines and leaves arranged in a symmetrical pattern within a round frame. Clean, geometric, traditional mon style."`

**Example D** (family_name with compound meaning): `kanji=細井`, `reading=ほそい`, `name_part=family_name`

- 細 = narrow, slender, fine; 井 = well (water well)
- **Compound meaning**: "Narrow well" — topographic surname from a place with a slender well
- **vibe**: `["gentle", "serene", "elegant"]` — 細 evokes delicacy and refinement
- **element**: `["water", "earth"]` — 井 is a water source, also a structure in the ground
- **era**: `"traditional"`
- **use_case**: `["real_person", "historical"]` — famous bearers include Edo-period scholars
- **kanji_meaning_tags**: `["narrow", "slender", "fine", "delicate", "well", "water_source", "depth", "purity", "precision", "quiet", "subtlety", "clarity", "refined"]`
- **meaning_en**: `"Narrow well"`
- **etymology_en**: `"Topographic surname meaning 'narrow well,' likely originating from settlements near a distinctively slender or narrow well. Common in the Kantō region."`
- **description_en**: `"Hosoi (細井) means 'narrow well,' a topographic surname derived from a geographic feature. The kanji 細 (narrow, fine) paired with 井 (well) suggests a delicate precision. The name carries associations of quiet depth and refinement."`
- **kamon_prompt**: `"A Japanese family crest (kamon) in solid black on white background. A stylized well frame (igeta/井桁) rendered with thin, refined lines suggesting the 'narrow/fine' (細) character. Geometric cross-hatch well structure within a circular border. Clean, minimalist, traditional mon style."`

### Common mistakes to AVOID

❌ `meaning_en: "細井 suggests slender, fine, delicate, well."` — lazy kanji-by-kanji list
✅ `meaning_en: "Narrow well"` — compound meaning

❌ `etymology_en: "...fitting common Japanese family-name patterns tied to landscape, settlement, occupation, or old clan association."` — generic template
✅ `etymology_en: "Topographic surname meaning 'narrow well,' likely originating from settlements near a slender well."` — specific

❌ `kanji_meaning_tags: ["ほそい", "hosoi", "japanese surname", "family name", "serene"]` — readings + generic filler + vibe leak
✅ `kanji_meaning_tags: ["narrow", "slender", "well", "water_source", "depth", "purity"]` — semantic associations only

❌ `element: ["water"]` for 細井 (only 1 when 井 clearly links to water AND earth) — missing obvious connection
✅ `element: ["water", "earth"]` for 細井 — both justified by kanji meaning

❌ `element: ["sun", "earth", "light"]` for 亜喜央 — "earth" has no basis, padding to hit 2-3
✅ `element: ["light"]` for 亜喜央 — only genuine connection (joy → brightness → light)

❌ `meaning_en: "Subtle joy at the center"` for 亜喜央 — treats phonetic 亜 as meaningful "subtle"
✅ `meaning_en: "Joyful center"` for 亜喜央 — focuses on the meaningful kanji (喜, 央)

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

### Confidence & completeness

- **Soft fields** — be **confident and decisive**. You know enough about kanji semantics and Japanese culture to make a good call. Fill these for every name. Only leave null if you genuinely cannot read the kanji or the name is completely opaque to you.
- **Hard fields** (`famous_bearers`, `national_rank`, `estimated_population`, etc.) — these require exact data. Leave null if no scraped evidence exists. Never fabricate.

### Tag coverage (critical for SEO keyword matching)

- `vibe` — **aim for 2-3 tags**. Think about the name from multiple angles (sound feel, kanji connotation, cultural context). Only use 1 if the name is truly one-dimensional.
- `element` — **aim for 2-3 tags** when kanji genuinely support it (e.g. 井=water+earth, 鉄=earth+fire). But **1 is fine** if the name's kanji don't have strong elemental ties. Abstract concepts (joy, center, help) ≠ elements. Don't pad.
- `use_case` — think through all applicable scenarios. If `famous_bearers` contains historical figures → add `historical`. If the name is still used today → add `baby`. Anime-style names → add `anime`.
- `kanji_meaning_tags` — **aim for 12-18**. These are the primary SEO matching surface. Cover: literal meanings, extended associations, related concepts, colors, emotions. But **NEVER** include readings, generic labels, or vibe/element duplicates.

### Content quality

- `meaning_en` — must be a **synthesized compound meaning** (e.g. "Narrow well"), never a kanji-by-kanji list (e.g. "slender, fine, delicate, well")
- `description_en` — must contain **specific** cultural context. Mention the name's origin pattern (topographic, occupational, clan-based), historical significance, or notable cultural associations. Generic sentences that apply to any name are unacceptable.
- `etymology_en` — must give a **specific** origin story. Generic templates like "fitting common Japanese family-name patterns" are unacceptable.
- `kanji_breakdown` — **required** for every name with readable kanji. If scraper data is missing, fill it yourself. Each entry needs the single kanji, its meanings, and its reading within this name.
- `famous_bearers.name_jp` — must come from scraped evidence, NEVER fabricate

### Hygiene

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
| `related_names` | string[] | Kanji of related names (e.g. same reading, different kanji) |
| `famous_bearers` | object[] | `[{"name":"Suzuki Ichiro","name_jp":"鈴木一朗","context":"MLB player"}]` |
| `kamon_prompt` | string | family_name only: English prompt describing kamon visual motifs |

### Management

| Field | Type | Description |
|-------|------|-------------|
| `status` | enum | `raw` → `llm_enriched` → `reviewed` → `complete` |
| `source` | string | Data provenance summary |

> Full API spec (endpoints, DSL filter, keyword/tag CRUD, export) → `tools/data-service/API.md`

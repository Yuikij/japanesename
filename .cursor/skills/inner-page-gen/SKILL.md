---
name: inner-page-gen
description: >-
  Generate keyword-driven inner pages for the Japanese name site.
  Build Next.js SSG pages with full-name combos, interactive quiz,
  random name section, FAQ, and JSON-LD schema. Use when creating
  new category inner pages, adding quiz data for keywords, or
  improving SEO for name pages.
---

# Inner Page Generation — SOP for LLM Agents

> Step-by-step guide for creating keyword-driven inner pages.
> Each page shows curated full-name combos (family + given) with kanji breakdowns,
> an interactive personality quiz, random name feature, FAQ, and SEO schema.
>
> **Reference the existing `male` page as a working example.** Read `src/lib/quiz-data.ts` to see how it's done.

Related docs (read when needed, not upfront):
- **Data enrichment**: `.cursor/skills/japanesename-data/SKILL.md`
- **API reference**: `tools/data-service/API.md`
- **Keyword data**: `新版本PSEO改造/keyword/keyword.json`

---

## 0. What You MUST Do vs. What's Already Done

### To add a new inner page, you ONLY need to:

1. **Ensure the keyword exists** in `新版本PSEO改造/keyword/keyword.json` with `strategy: "category_page"` and a valid `filter_rule`
2. **Add quiz data** to `src/lib/quiz-data.ts` keyed by the slug

That's it. Everything else auto-generates:
- Route: `[slug]` dynamic segment handles all slugs automatically
- Name fetching: `page.tsx` reads `filter_rule` from keyword.json and calls the API
- Combo generation: `generateCombos()` pairs family + given names at build time
- FAQ: auto-generated from keyword name + top combo names
- JSON-LD: auto-generated WebPage + FAQPage schemas
- Sitemap: `sitemap.ts` auto-includes all `category_page` keywords
- i18n: shared keys in `messages/en.json` and `messages/zh.json` (already defined)

### Files you should NOT modify (shared infrastructure):

| File | Why |
|------|-----|
| `src/app/[locale]/names/[slug]/page.tsx` | Shared page component for ALL inner pages |
| `src/components/*.tsx` | Shared UI components |
| `src/lib/name-combos.ts` | Combo generation algorithm |
| `src/lib/name-filter.ts` | Filtering logic |
| `src/types/name-page.ts` | Type definitions |
| `messages/en.json`, `messages/zh.json` | i18n keys (already complete) |

---

## 1. Architecture Overview

### File structure

```
src/
├── app/[locale]/names/[slug]/page.tsx   ← SSG inner page (server component, shared)
├── components/
│   ├── NameCard.tsx                      ← ComboCard: compact (grid) + detail (modal/featured)
│   ├── ComboCardInteractive.tsx          ← Clickable compact card → opens detail modal
│   ├── ComboGridClient.tsx              ← Client grid of clickable combo cards
│   ├── RandomNameCombo.tsx              ← Random combo section with Roll Again
│   ├── NameQuiz.tsx                      ← 3-round personality quiz → combo results
│   └── NameListExpanderClient.tsx       ← "Show More" pagination for combo grid
├── lib/
│   ├── name-combos.ts                   ← Build-time combo generator
│   ├── name-filter.ts                   ← Client-side combo filtering (for quiz)
│   └── quiz-data.ts                     ← ★ Quiz questions keyed by slug — THIS IS WHAT YOU EDIT
├── types/
│   └── name-page.ts                     ← FullNameCombo, NameRecord, QuizRound types
```

### Data flow (build time)

```
keyword.json → find keyword by slug → extract filter_rule
    → POST /api/names/query with filter_rule (limit: 500)
    → split into given_name[] + family_name[]
    → generateCombos(): pair compatible names → 200 FullNameCombo[]
    → pass combos to RandomNameCombo, NameQuiz, ComboGridClient
```

### Data flow (client side — quiz)

```
User answers 3 questions → accumulate FilterConditions from selected options
    → filterCombos(combos, accumulatedFilters) → scored + sorted
    → show top 10 as results (first = featured detail card, rest = compact grid)
```

### Key concept: Two layers of filtering

1. **API layer** (`filter_rule.must` + `filter_rule.should`): determines WHICH names are fetched at build time. Set in `keyword.json`.
2. **Quiz layer** (client-side `should` only): ranks the pre-fetched combos by the user's quiz answers. Set in `quiz-data.ts`.

The quiz NEVER hard-filters — it only scores and sorts. This guarantees every quiz path returns results.

---

## 2. The FullNameCombo Type

Every component receives `FullNameCombo[]`. Here's the shape:

```typescript
interface FullNameCombo {
  id: string              // "fn_xxx_given_yyy"
  family: NameRecord      // full family name record from API
  given: NameRecord       // full given name record from API
  fullKanji: string       // "田中翔太" (no space)
  fullReading: string     // "たなか しょうた"
  fullRomaji: string      // "Tanaka Shōta"
  combinedVibes: string[] // union of family.vibe + given.vibe
  combinedElements: string[] // union of family.element + given.element
  era: string             // given.era ?? family.era ?? "modern"
}
```

The `family` and `given` fields are full `NameRecord` objects with all API fields:
`kanji_breakdown`, `meaning_en`, `description_en`, `famous_bearers`, `vibe`, `element`, `era`, etc.

The detail card uses these nested fields to show kanji breakdown, descriptions, famous bearers, and tags.

---

## 3. Creating Quiz Data

### Where to edit

`src/lib/quiz-data.ts` — add a new entry to the `QUIZ_DATA` record, keyed by slug.

### The slug

Derived from `keyword.path`: `/names/cool` → slug = `cool`

The page looks up quiz data as `QUIZ_DATA[slug]`. If not found, the quiz section simply doesn't render (page still works, just no quiz).

### Design principles

1. **Creative, not mechanical** — Don't just ask "pick a vibe" or "pick an element." Frame as personality/scenario-based
2. **Each option has emoji + description** — Makes it feel like a personality test, not a filter panel
3. **Filters use `should` (scoring), never `must`** — Every branch MUST return results
4. **3 rounds**: R1 = personality/vibe, R2 = nature/element scene, R3 = era/spoken-feel
5. **`filters: []` = wildcard** — For "surprise me" / "any" options
6. **4-5 options per round** — Not too few (boring), not too many (overwhelming)
7. **Bilingual** — Every question and option needs both `_en` and `_zh` text

### Working example: the `male` quiz

Read `src/lib/quiz-data.ts` for the full implementation. Summary:

| Round | Question (en) | Options |
|-------|--------------|---------|
| 1 | "If your name had a personality, what would it be?" | 🦁 Bold & Fearless, 🧊 Cool & Composed, 🌸 Kind & Warm-hearted, 👑 Refined & Noble, 🌙 Deep & Enigmatic |
| 2 | "Pick the scene that speaks to your soul" | 🌋 Volcano at dawn, 🌊 Moonlit cliffs, 🏔️ Snow-capped peaks, 🌾 Ancient fields, 🌌 Stars in a lake |
| 3 | "How should your name feel when spoken aloud?" | ⚔️ Ancient warrior's cry, 🎌 Classic novel character, 🎧 Chart-topping song, 🎲 I like surprises |

Each option maps to filter conditions:
```typescript
{
  emoji: '🦁',
  label_en: 'Bold & Fearless',
  label_zh: '勇敢无畏',
  desc_en: 'A name that commands respect and strength',
  desc_zh: '令人敬畏的强势之名',
  filters: [{ field: 'vibe', op: 'any_of', value: ['strong', 'fierce', 'brave'] }],
}
```

### Adapting for different keyword types

| Keyword type | Q1 tone | Q2 imagery | Q3 feel |
|-------------|---------|-----------|---------|
| Male names | Bold/Cool/Kind/Noble/Enigmatic | Volcano/Ocean/Mountain/Fields/Stars | Warrior/Novel/Pop song/Surprise |
| Female names | Graceful/Playful/Mysterious/Warm/Strong | Cherry blossoms/Moonlit garden/Ocean sunrise/Snowy shrine/Starlit sky | Whispered poem/Beloved friend/Ancient legend/Modern melody |
| Cute names | Bubbly/Sweet/Mischievous/Dreamy | Flower meadow/Candy shop/Cloud castle/Garden rain | Like a lullaby/Like a laugh/Like a sparkle |
| Cool names | Razor-sharp/Ice-cold/Rebellious/Shadow | Lightning storm/Arctic tundra/Night city/Dark forest | Like a blade/Like thunder/Like silence |
| Last names | Historic/Regional/Noble/Nature-rooted | Castle town/Rice paddy/Mountain shrine/River port | Ancient dignity/Quiet strength/Modern simplicity |

### Available filter values

- **vibe**: cute, cool, elegant, strong, mysterious, dark, gentle, noble, playful, fierce, serene, warm, edgy, scary, funny
- **element**: fire, water, ice, light, dark, wind, earth, moon, sun, flower, mountain, sky, star, death, blood, thunder
- **era**: ancient, traditional, modern, 2000s, trending
- **popularity**: very_common, common, uncommon, rare, unique

---

## 4. Step-by-Step: Adding a New Inner Page

### Step 1: Verify keyword exists in keyword.json

Read `新版本PSEO改造/keyword/keyword.json` and find the keyword. Check:
- `strategy` is `"category_page"`
- `path` starts with `/names/`
- `filter_rule` has sensible `must` conditions for the keyword intent

If the keyword doesn't exist yet, add it (see Section 7).

### Step 2: Add quiz data

Edit `src/lib/quiz-data.ts`. Add a new entry keyed by the slug (e.g., `'female'`, `'cool'`, `'rare'`).

Follow Section 3 guidelines. Read the existing `male` entry as reference.

### Step 3: Test locally

```bash
# Ensure .env.local has the API secret (see Pitfalls section)
npm run dev
# Visit http://localhost:3000/en/names/YOUR_SLUG
```

### Step 4: Verify (use this checklist)

```
- [ ] Page loads without errors
- [ ] Hero: H1 + intro text with combo count
- [ ] Random Combo: detail card renders, Roll Again works
- [ ] Quiz: 3 rounds with emoji, progress bar advances
- [ ] Quiz results: featured combo (detail) + other matches (compact grid)
- [ ] Grid cards: clickable → detail modal opens → X/Escape/backdrop closes
- [ ] Name list: "Show More" loads additional combos
- [ ] FAQ: 3 questions with keyword-specific answers
- [ ] View page source: JSON-LD has WebPage + FAQPage
- [ ] <title> and <meta description> contain the keyword
```

---

## 5. Common Pitfalls

### API returns "Unauthorized" or empty names

The API requires authentication. Ensure `.env.local` exists at project root:

```
JAPANESE_NAME_API_SECRET=CHANGE_ME
```

This value must match the `API_SECRET` set on the Cloudflare worker (`CHANGE_ME` is the current value).

### Page shows 0 combos

Possible causes:
1. `filter_rule.must` is too restrictive — no names match. Loosen the filter
2. API is down — check `curl https://japanesenamedata.yuisama.top/health`
3. All returned names are same `name_part` (all given or all family) — combos need BOTH given and family names. Check your `filter_rule` isn't filtering to only one type

### Quiz shows "no results" for every path

The quiz uses `should` (scoring), so it should always return *something*. If it doesn't:
- The `combinedVibes` / `combinedElements` on combos may all be empty (poor data quality)
- Solution: run data enrichment first (`.cursor/skills/japanesename-data/SKILL.md`)

### Port conflict on dev server

If `npm run dev` fails silently, check for zombie processes:
```bash
lsof -i :3000 | grep LISTEN
# kill the PID if needed
```

### Quiz data key doesn't match slug

The slug is derived from `keyword.path`: `/names/cool-names` → slug = `cool-names`.
The quiz data key must be EXACTLY `'cool-names'` (not `'cool'` or `'coolNames'`).

---

## 6. Adding a New Keyword to keyword.json

If the keyword doesn't exist in `新版本PSEO改造/keyword/keyword.json`:

```json
{
  "id": "kw_XXXX",
  "keyword": "your keyword phrase",
  "search_volume": 1000,
  "strategy": "category_page",
  "path": "/names/your-slug",
  "priority": 3,
  "status": "active",
  "filter_rule": {
    "must": [
      { "field": "gender", "op": "eq", "value": "female" }
    ],
    "should": [
      { "field": "vibe", "op": "any_of", "value": ["cute", "gentle"] }
    ]
  },
  "related_keywords": [
    { "label": "Japanese Male Names", "path": "/names/male" },
    { "label": "Cute Japanese Names", "path": "/names/cute" }
  ],
  "seo": {
    "title": "Your Keyword — Authentic Japanese Names with Meanings",
    "h1": "Your Keyword",
    "description": "Explore curated names with detailed kanji breakdowns and cultural context."
  }
}
```

### filter_rule design tips

- `must` = hard requirements (AND). Names that don't match are excluded entirely
- `should` = soft preferences (scoring). Names that match rank higher but none are excluded
- For gender-specific keywords: `must: [{ field: "gender", op: "eq", value: "male" }]`
- For style keywords (cute/cool/rare): `must: []`, `should: [{ field: "vibe", op: "any_of", value: [...] }]`
- For name-type keywords (last names): `must: [{ field: "name_part", op: "eq", value: "family_name" }]`

**IMPORTANT for family-name-only keywords**: The combo generator needs BOTH family and given names. If `must` filters to only `family_name`, the page will show 0 combos. For last-name pages, either:
- Remove the `name_part` filter from `must` and put it in `should` (so given names are also fetched but ranked lower)
- Or adjust the page to show individual names instead of combos (requires code change)

---

## 7. Data Quality & The Enrichment Skill

API name records may have incomplete data from earlier automated enrichment:

| Issue | Impact on page | Fix |
|-------|---------------|-----|
| Empty `vibe`/`element` | No tag pills shown; combo pairing is random | Run data enrichment |
| Empty `kanji_breakdown` | "Kanji Breakdown" section hidden | Run data enrichment |
| Empty `description_en` | No description quote | Run data enrichment |
| Empty `famous_bearers` | "Notable Bearers" hidden | Run scraper + enrichment |
| Mixed English/Japanese in `meaning_en` | Displays as-is (may look rough) | Run data enrichment |

If a keyword's names have very poor data quality, run the data enrichment skill BEFORE creating the inner page:
1. Read `.cursor/skills/japanesename-data/SKILL.md`
2. Query names via `POST /api/names/query` with the keyword's `filter_rule`
3. Enrich each name's soft fields (vibe, element, meaning_en, description_en, kanji_breakdown)
4. Then create the inner page

---

## 8. Component Reference (read source when needed)

| Component | File | Purpose | Props |
|-----------|------|---------|-------|
| ComboCard | `NameCard.tsx` | Renders a full-name combo | `combo, locale, variant: 'compact'|'detail'` |
| ComboCardInteractive | `ComboCardInteractive.tsx` | Clickable compact card → detail modal | `combo, locale` |
| ComboGridClient | `ComboGridClient.tsx` | Grid of clickable compact cards | `combos, locale` |
| RandomNameCombo | `RandomNameCombo.tsx` | Random combo + Roll Again button | `combos, locale` |
| NameQuiz | `NameQuiz.tsx` | 3-round quiz → combo results | `quiz, combos, locale` |
| NameListExpanderClient | `NameListExpanderClient.tsx` | Show More pagination | `combos, locale, initialCount` |

---

## 9. Full Walkthrough Example

> "I want to add an inner page for the keyword `japanese female names` (slug: `female`)."

### 1. Check keyword.json

Find the entry with `path: "/names/female"`. Confirm `strategy: "category_page"` and `filter_rule` has `{ field: "gender", op: "eq", value: "female" }`.

### 2. Add quiz to quiz-data.ts

Design 3 rounds following Section 3 guidelines. Use the `male` entry as a structural reference. For `female`, round themes might be:

- R1: "What kind of aura should your name carry?" → 🌷Graceful/🎀Cute/🌙Mysterious/🌿Gentle/⚡Strong
- R2: "Which scene calls to you?" → 🌸Cherry blossoms/🌕Full moon garden/🌊Ocean sunrise/❄️Mountain snow/🌌Midnight stars
- R3: "When someone says your name, it should sound like..." → 📜Heian poem/🎶Modern melody/🌺Whispered flower/🎲Surprise me

Each option needs: `emoji`, `label_en`, `label_zh`, `desc_en`, `desc_zh`, `filters: [...]`

### 3. Test

```bash
npm run dev
# Visit http://localhost:3000/en/names/female
```

### 4. Verify with checklist from Section 4

Done. The page is live.

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

### To add a new inner page, you do THREE things:

1. **Ensure the keyword exists** in `新版本PSEO改造/keyword/keyword.json` — if `filter_rule` 匹配不到足够的数据，你要自己调整它
2. **Check & fix name data quality** — 调 API 拿原数据，用你自己的日语/汉字知识逐条 check，修正后回写数据库
3. **Add quiz data** to `src/lib/quiz-data.ts` keyed by the slug

Everything else auto-generates (route, combo generation, FAQ, JSON-LD, sitemap, i18n).

### Your role is NOT just a code editor — you are a data curator

API 里的原数据质量参差不齐（早期自动填充的），你需要**用自己的知识**来判断和修正：
- 汉字的读音和含义（如 泰 → やす/たい → peace, calm）
- 名字的中英文描述（不是模板，要写出有文化内涵的描述）
- vibe/element/era 标签是否准确
- filter_rule 能否匹配到足够的 given_name + family_name

### ⚠️ 绝对不要写脚本批量修数据

数据质量差的根因就是之前用脚本/自动化批量填充的。你不能重蹈覆辙：
- **禁止**写 Node.js / Python 脚本来批量更新 name records
- **禁止**用字典映射表自动填充 kanji_breakdown、description、meaning
- **禁止**用模板拼接生成 description_en/zh（如 "X is a Japanese name meaning Y"）

正确做法：**你亲自逐条审阅**，用你自己的日语/文化知识判断每个字段是否正确，然后逐条调 API 修正。虽然慢，但这是保证质量的唯一方式。

就算有 1000+ 条 name records，也必须逐一审查，没有例外。分批策略：
- 每轮对话处理 30-50 个 name records，跨多轮对话完成
- 高频汉字（如 翔、太、美 出现在几十个名字里）的读音/含义知识可以复用，但仍需逐条确认每个名字中该汉字的实际读法
- 做完一批就可以先构建页面看效果，后续批次继续完善

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
keyword.json (imported via ES module, bundled by Webpack)
    → find keyword by slug → extract filter_rule
    → POST /api/names/query with filter_rule (limit: 500, needs JAPANESE_NAME_API_SECRET)
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

### Step 1: Verify keyword & tune filter_rule

Read `新版本PSEO改造/keyword/keyword.json` and find the keyword. If it doesn't exist, add it (see Section 7).

Then **test the filter_rule** by calling the API:

```bash
curl -X POST https://japanesenamedata.yuisama.top/api/names/query \
  -H "Content-Type: application/json" \
  -H "X-API-Secret: CHANGE_ME" \
  -d '{"filter_rule": <the filter_rule from keyword.json>, "limit": 500}'
```

Check the results:
- **Are there enough names?** Need at least 20+ given_name AND 10+ family_name to generate good combos
- **Is the gender/type correct?** Make sure the filter matches the keyword intent
- **If results are too few**: loosen `must` conditions, or move strict conditions to `should`
- **If results are wrong**: adjust field values, add/remove conditions

**You should adjust `filter_rule` as needed** — it's not sacred. The goal is to get a good set of names that match the keyword's intent. Common adjustments:
- Too few results → remove a `must` condition or broaden `value` arrays
- Wrong names returned → add/change `must` conditions
- Need both given + family names → don't filter `name_part` in `must` (combo generator needs both)

Update `keyword.json` with your adjusted `filter_rule` before proceeding.

### Step 2: Check & fix name data quality

This is the most important step. Query the API to get the matching names, then **review each name record** using your own Japanese/kanji knowledge.

#### What to check (per name record):

| Field | What to check | How to fix |
|-------|---------------|------------|
| `kanji_breakdown` | Every kanji has correct `reading` and `meanings_en` | Use your knowledge: 泰→reading:"やす", meanings_en:["peace","calm"] |
| `meaning_en` | Not empty, not just repeating the kanji | Write a concise English meaning based on kanji composition |
| `meaning_zh` | Not empty, Chinese locale needs this | Write a concise Chinese meaning |
| `description_en` | Not a generic template, culturally meaningful | Write a 1-2 sentence description with cultural context |
| `description_zh` | Not empty, not just a bad translation of English | Write a natural Chinese description |
| `vibe` | Array is not empty, values are accurate | Assign from: cute, cool, elegant, strong, mysterious, gentle, noble, etc. |
| `element` | Array is not empty if applicable | Assign from: fire, water, light, dark, wind, earth, moon, sun, flower, etc. |
| `reading` | Correct hiragana reading | Fix if wrong |

#### How to fix: call the API

```bash
curl -X PUT https://japanesenamedata.yuisama.top/api/names/<name_id> \
  -H "Content-Type: application/json" \
  -H "X-API-Secret: CHANGE_ME" \
  -d '{
    "kanji_breakdown": [
      {"kanji": "泰", "reading": "やす", "meanings_en": ["peace", "calm"]},
      {"kanji": "睦", "reading": "むつ", "meanings_en": ["harmony", "friendly"]}
    ],
    "meaning_en": "Peaceful harmony",
    "meaning_zh": "平和睦邻",
    "description_en": "A name combining tranquility (泰) with harmonious relationships (睦), suggesting a person who brings peace to those around them.",
    "description_zh": "泰意为安泰、平和，睦意为和睦、亲善。此名寓意性格温和、善于与人和谐相处。",
    "vibe": ["gentle", "warm", "noble"],
    "element": ["earth", "light"]
  }'
```

#### Efficiency tips:
- You don't need to fix ALL 500 names — focus on the ones that will appear most prominently (the combo generator picks ~200 combos, detail cards show full info)
- Batch similar names: if 10 names share the same kanji (e.g., all have 翔), fix the kanji_breakdown once and apply to all
- For `description_en`/`description_zh`: write genuine cultural descriptions, not templates like "X is a Japanese name meaning Y"
- Read `.cursor/skills/japanesename-data/SKILL.md` → `tools/SKILL.md` for detailed enrichment rules and field ownership

### Step 3: Add quiz data

Edit `src/lib/quiz-data.ts`. Add a new entry keyed by the slug.

Follow Section 3 guidelines. Read the existing `male` entry as reference.

### Step 4: Test locally

```bash
# Ensure .env (or .env.local) has JAPANESE_NAME_API_SECRET=CHANGE_ME
npm run dev
# Visit http://localhost:3000/en/names/YOUR_SLUG
# Also check http://localhost:3000/zh/names/YOUR_SLUG for Chinese locale
```

### Step 5: Verify (use this checklist)

```
- [ ] Page loads without errors
- [ ] Hero: H1 + intro text with combo count (should be 100+)
- [ ] Random Combo: detail card shows correct kanji breakdown (readings + meanings, no blanks)
- [ ] Random Combo: description shows in correct language for locale
- [ ] Quiz: 3 rounds with emoji, progress bar advances
- [ ] Quiz results: featured combo (detail) + other matches (compact grid)
- [ ] Grid cards: clickable → detail modal opens → X/Escape/backdrop closes
- [ ] Detail modal: kanji breakdown has readings AND meanings for every kanji
- [ ] Detail modal: description is culturally meaningful (not template text)
- [ ] Name list: "Show More" loads additional combos
- [ ] FAQ: 3 questions with keyword-specific answers
- [ ] View page source: JSON-LD has WebPage + FAQPage
- [ ] <title> and <meta description> contain the keyword
- [ ] Switch to zh locale: descriptions show Chinese text, not English
```

---

## 5. Common Pitfalls

### API returns "Unauthorized" or empty names

The API requires authentication. Two env files exist:

- **`.env`** (committed to git) — used by GitHub CI/CD builds. MUST contain `JAPANESE_NAME_API_SECRET=CHANGE_ME`
- **`.env.local`** (gitignored) — optional local override, same variable

If inner pages deploy with **0 names / empty content**, the most likely cause is `.env` missing or wrong `JAPANESE_NAME_API_SECRET` value. The current API secret is `CHANGE_ME` (must match the Cloudflare worker's `API_SECRET`).

### NEVER use `readFileSync` / `process.cwd()` for data loading

The site deploys to **Cloudflare Workers** via `opennextjs-cloudflare`. Workers don't have filesystem access, and `process.cwd()` resolves differently during the Cloudflare build. Any `readFileSync(join(process.cwd(), ...))` call will **silently fail** (caught by try/catch → returns empty data → page renders with nothing).

**Always use ES module `import` for static data like `keyword.json`:**
```typescript
// ✅ Correct — Webpack bundles the JSON at build time
import keywordsData from '../../../新版本PSEO改造/keyword/keyword.json'

// ❌ Wrong — fails on Cloudflare Workers
import { readFileSync } from 'fs'
const raw = readFileSync(join(process.cwd(), '新版本PSEO改造/keyword/keyword.json'), 'utf-8')
```

This is already fixed in all existing files. If you ever create a new file that needs `keyword.json`, use `import`.

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

## 7. Data Quality — Why You MUST Check

API name records often have incomplete or wrong data from earlier automated enrichment. **This is expected.** Your job as the LLM generating the inner page is to catch and fix these issues.

### Common data problems you will encounter

| Problem | Example | How it looks on page |
|---------|---------|---------------------|
| `kanji_breakdown` missing reading | 泰: reading="" | "泰 () — 泰" (ugly blank parens) |
| `kanji_breakdown` meaning is just the kanji | 睦: meanings_en=["睦"] | "睦 () — 睦" (useless) |
| `description_en` is template text | "X is a Japanese male given name with the compound meaning 'Y'" | Generic, no cultural value |
| `description_zh` is empty | null | Chinese locale falls back to English |
| `meaning_en` is empty or wrong | null or "泰睦" (just kanji repeated) | No meaning shown, or kanji as meaning |
| `vibe`/`element` empty | [] | No tag pills, quiz filtering broken |

### How you fix it

You use YOUR OWN knowledge of Japanese kanji and culture. **逐条审阅，不写脚本。** 例如：

- **泰** → reading: "やす" or "たい", meanings: ["peace", "calm", "tranquil"]
- **睦** → reading: "むつ" or "ぼく", meanings: ["harmony", "friendly", "amicable"]
- **翔** → reading: "しょう" or "かける", meanings: ["soar", "fly"]
- **美** → reading: "み" or "び", meanings: ["beauty", "beautiful"]

注意：同一个汉字在不同名字中的读音可能不同（训读 vs 音读 vs 名乘り読み），必须结合整个名字的 `reading` 字段来判断这个汉字在这个名字里的实际读音，不能一刀切。这就是为什么不能用脚本。

Then call `PUT /api/names/:id` to save your corrections. See Step 2 in Section 4 for the full workflow.

### What NOT to fix yourself

**Hard fields** like `famous_bearers` and `national_rank` need factual evidence from scrapers. Don't fabricate these. See `.cursor/skills/japanesename-data/SKILL.md` → `tools/SKILL.md` for the distinction between soft fields (you reason) vs hard fields (you scrape).

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

### 1. Check keyword.json & test filter_rule

Find the entry with `path: "/names/female"`. Confirm `strategy: "category_page"`.

Test the filter_rule by calling the API:
```bash
curl -X POST https://japanesenamedata.yuisama.top/api/names/query \
  -H "Content-Type: application/json" -H "X-API-Secret: CHANGE_ME" \
  -d '{"filter_rule": {"must": [{"field":"gender","op":"eq","value":"female"}], "should":[]}, "limit": 500}'
```

Check: got 300+ results? Good. Only 15 results? filter_rule too strict — loosen it. No family_names in results? The combo generator needs both — adjust the filter so it doesn't exclude family names.

If I adjust the filter_rule, update it in `keyword.json`.

### 2. Check & fix name data (manual, no scripts)

I scan returned names one by one, using my kanji knowledge to judge each record.

**Example — checking `gn_misaki_abc123` (美咲, みさき):**

Current data from API:
- `kanji_breakdown`: [{"kanji":"美","reading":"","meanings_en":["美"]}, {"kanji":"咲","reading":"","meanings_en":["咲"]}] ← 读音空，含义就是汉字本身
- `description_en`: "Misaki (美咲) is a Japanese female given name with the compound meaning '美 咲'." ← 模板
- `description_zh`: null ← 空
- `meaning_en`: "美 咲" ← 就是汉字

My judgment:
- 美 in this name reads "み" (not "び"), means "beauty, beautiful"
- 咲 reads "さき" (kunyomi), means "bloom, blossom"
- This name evokes the image of beauty blooming, like a flower

I fix it:
```bash
curl -X PUT https://japanesenamedata.yuisama.top/api/names/gn_misaki_abc123 \
  -H "Content-Type: application/json" -H "X-API-Secret: CHANGE_ME" \
  -d '{
    "kanji_breakdown": [
      {"kanji":"美","reading":"み","meanings_en":["beauty","beautiful"]},
      {"kanji":"咲","reading":"さき","meanings_en":["bloom","blossom"]}
    ],
    "meaning_en": "Beautiful bloom",
    "meaning_zh": "美丽绽放",
    "description_en": "A name evoking the image of beauty in full bloom. 美 (mi) carries the essence of aesthetic beauty, while 咲 (saki) means to blossom — together suggesting a person whose inner beauty radiates outward like a flower opening.",
    "description_zh": "美意为美丽、优美，咲意为绽放、花开。此名如花朵盛开般美丽，寓意内在之美自然流露，是极具女性魅力的经典日本名字。"
  }'
```

**注意读音必须结合上下文判断：** 同样是"美"字，在"美咲(みさき)"里读"み"，在"美穂(みほ)"里也读"み"，但在"美術(びじゅつ)"里读"び"。不能一刀切，这就是为什么要人工逐条审阅，不能用脚本。

**分批策略：** 不需要一次修完全部。每轮对话处理 30-50 条，优先修最常见的名字和高频汉字（如 翔、太、大、美 分别出现在几十个名字里）。跨多轮对话完成即可。

### 3. Add quiz to quiz-data.ts

Design 3 rounds following Section 3 guidelines. For `female`:

- R1: "What kind of aura should your name carry?" → 🌷Graceful/🎀Cute/🌙Mysterious/🌿Gentle/⚡Strong
- R2: "Which scene calls to you?" → 🌸Cherry blossoms/🌕Full moon garden/🌊Ocean sunrise/❄️Mountain snow/🌌Midnight stars
- R3: "When someone says your name, it should sound like..." → 📜Heian poem/🎶Modern melody/🌺Whispered flower/🎲Surprise me

Each option needs: `emoji`, `label_en`, `label_zh`, `desc_en`, `desc_zh`, `filters: [...]`

### 4. Test locally

```bash
npm run dev
# Visit http://localhost:3000/en/names/female — check English
# Visit http://localhost:3000/zh/names/female — check Chinese descriptions show properly
```

### 5. Verify with checklist from Step 5 in Section 4

Key things to eyeball:
- Detail cards: every kanji has reading + meaning (no empty parens)
- Description: culturally meaningful, not "X is a Japanese name meaning Y"
- Chinese locale: descriptions in Chinese, not English fallback

Done. The page is live with clean data.

# Scraper Scripts Reference

Located in `tools/scrapers/`. All zero-dependency (Node 18+), direct HTTP fetch.

---

## Source Priority

| Source | Covers | Direct HTTP | Primary use |
|--------|--------|-------------|-------------|
| **myoji-yurai.net** | family_name | Yes | Rank, population, etymology, regions, famous people |
| **behindthename.com** | given + family | Yes | Meaning, vibes, categories, scripts |
| **kanshudo.com** | given + family | Yes | Readings, frequency rank, alt readings |
| japanese-names.info | given + family | No (WAF) | Fallback only — use via WebFetch |

### Supplementary sources (evaluate before use)

| Source | Useful for | Recommendation |
|--------|------------|----------------|
| **kanjiapi.dev** | Single-kanji meaning/reading (public JSON API) | Supplementary fallback |
| **jisho.org** | Dictionary-style kanji/word meanings | Supplementary for semantic hints |
| **forebears.io** | Global surname distribution | Optional, limited Japan specificity |
| **Wikipedia** | Famous bearers context | Person-level evidence only |

---

## Scripts

### scrape-myoji-yurai.js (family_name — primary)

```bash
node tools/scrapers/scrape-myoji-yurai.js 鈴木
```

Output: `readings`, `national_rank`, `estimated_population`, `etymology`, `top_regions`, `famous_people`

### scrape-behindthename.js (given — primary; family — supplementary)

```bash
node tools/scrapers/scrape-behindthename.js --given aiko
node tools/scrapers/scrape-behindthename.js --family suzuki
```

Output: `gender`, `usage`, `scripts`, `meaning`, `vibes` (given only), `categories`

### scrape-kanshudo.js (both — supplementary)

```bash
node tools/scrapers/scrape-kanshudo.js 佐藤
```

Output: `common_reading`, `reading_type`, `alternative_readings`, `frequency_rank`

### parse-japanese-names-info.js (both — fallback)

Requires WebFetch first (WAF blocks direct HTTP).

```bash
# Step 1: Use WebFetch tool to fetch the page, save to file
# Step 2: Parse the saved markdown
cat saved-page.txt | node tools/scrapers/parse-japanese-names-info.js --kanji 愛乃
```

Output: `gender`, `hiragana`, `katakana`, `english_syllables`, `japanese_morae`, `household_count`, `kanji_breakdown`, `famous_persons`

---

## Evidence Packet Format

When collecting scraper outputs, normalize into this structure before reasoning:

```json
{
  "record_seed": { "id": "...", "name_part": "family_name", "kanji": "鈴木", "romaji": "Suzuki" },
  "evidence": [
    {
      "source": "myoji-yurai.net",
      "facts": { "national_rank": 2, "estimated_population": 1745000 },
      "raw_excerpt": "..."
    },
    {
      "source": "kanshudo.com",
      "facts": { "alternative_readings": ["すすぎ"] }
    }
  ]
}
```

After collecting evidence, return to the main SKILL.md workflow: use your own reasoning to fill soft fields, then write the merged payload to the API.

---

## Adding New Sources

1. Must have a stable direct URL pattern for kanji or romaji input
2. Must return parseable content for ≥60% of probe samples
3. Must improve at least one field group
4. If anti-bot blocks are frequent, keep in optional/manual tier only

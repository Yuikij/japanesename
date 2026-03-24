---
name: japanesename-data
description: >-
  Enrich Japanese name records by using your own Kanji/culture knowledge to
  fill soft tags (vibe, element, era, meaning). Query and manage the name
  database via REST API. Run scraper scripts to collect factual evidence.
  Use when working with Japanese name data, enrichment tasks, keyword
  SEO data, or tag management.
---

# Japanese Name Data — Cursor Skill

This skill delegates to the standalone docs in `tools/`. Read these files:

1. **`tools/SKILL.md`** — Full enrichment skill: behavioral rules, field ownership, workflow, tag enums, reasoning examples, quality rules. **Read this first.**
2. **`tools/SCRAPERS.md`** — Scraper scripts reference: source priority, usage, evidence packet format.
3. **`tools/data-service/API.md`** — REST API reference: endpoints, DSL filter, data models.

## Quick reminder (details in tools/SKILL.md)

- **Soft fields** (`vibe`, `element`, `kanji_meaning_tags`, `meaning_en`, etc.) → you reason about them using your own knowledge. Do NOT write mapping scripts or call external LLM APIs.
- **Hard fields** (`national_rank`, `famous_bearers`, etc.) → use scraper scripts, never fabricate.
- **Existing values may be dirty** — some records have data from earlier automated runs with known bugs (e.g. `kanji_breakdown` readings wrong, `alternative_readings` storing kanji variants instead of reading variants). Do not blindly trust existing soft field values. See tools/SKILL.md Step 3 for the full validation checklist.
- Uncertain → leave `null`.

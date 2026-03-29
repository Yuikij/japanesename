# Male page family-name repair batch — 2026-03-29 round 3

Context: continued SOP-aligned manual repair for high-visibility / high-repeat `family_name` records surfacing on `/[locale]/names/male`.

Manually corrected via API (`X-API-Secret`) the following records:

1. `fn_yamamoto__095505` — 山本 / Yamamoto
2. `fn_yamada__57d1b2` — 山田 / Yamada
3. `fn_yamazaki__b643f4` — 山崎 / Yamazaki
4. `fn_ishikawa__3ccc85` — 石川 / Ishikawa
5. `fn_oota__141980` — 太田 / Oota
6. `fn_fujiwara__5ca983` — 藤原 / Fujiwara
7. `fn_miura__717122` — 三浦 / Miura
8. `fn_tamura__ce6801` — 田村 / Tamura

What was repaired in this batch:

- filled missing `meaning_zh`
- filled missing `description_zh`
- rewrote generic/template `description_en`
- rewrote generic/template `etymology_en`
- corrected placeholder-ish `meaning_en` where needed (`Fujiwara`, `Miura`, `Tamura`)
- repaired `kanji_breakdown` readings / meanings where needed (`Yamada`, `Yamazaki`, `Oota`, `Fujiwara`, `Miura`, `Tamura`)

Verification:

- re-read each record through `GET /api/names/:id`
- confirmed `meaning_zh` and `description_zh` are now present for all 8
- confirmed `kanji_breakdown[].reading` is populated for all repaired entries

Priority rationale:

- These are all high-visibility surnames by national rank (7, 12, 21, 26, 43, 48, 50, 56), so they are likely to recur often on the male page and across combo pages.

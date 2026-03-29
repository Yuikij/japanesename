# Male page family-name repair batch — 2026-03-29 round 4

Context: continued SOP-aligned manual repair for high-visibility / high-repeat `family_name` records surfacing on `/[locale]/names/male`.

Manually corrected via API (`X-API-Secret`) the following records:

1. `fn_takahashi__583093` — 高橋 / Takahashi
2. `fn_hayashi__724540` — 林 / Hayashi
3. `fn_abe__3a67d6` — 阿部 / Abe
4. `fn_yamashita__e4d02e` — 山下 / Yamashita
5. `fn_ishii__d67696` — 石井 / Ishii
6. `fn_ogawa__88b5f9` — 小川 / Ogawa
7. `fn_fujita__2324f1` — 藤田 / Fujita
8. `fn_miyamoto__8f2443` — 宮本 / Miyamoto

What was repaired in this batch:

- filled missing `meaning_zh`
- filled missing `description_zh`
- rewrote generic/template `description_en`
- rewrote generic/template `etymology_en`
- corrected placeholder-like `meaning_en` (`High bridge`, `Abe clan surname`, `Small river`, `Wisteria field`, `Shrine base`, etc.)
- repaired missing per-kanji readings / meanings in `kanji_breakdown`

Verification:

- re-read each record through `GET /api/names/:id`
- confirmed `meaning_zh` and `description_zh` are now present for all 8
- confirmed `kanji_breakdown[].reading` is populated for all repaired entries

Priority rationale:

- These are all still very high-visibility surnames by national rank (3, 18, 25, 27, 29, 30, 34, 70), so they are highly likely to recur on the male page and related full-name combinations.

# Male page family-name repair batch — 2026-03-29 round 6

Context: continued SOP-aligned manual repair for additional high-visibility `family_name` records still likely to surface on `/[locale]/names/male`.

Manually corrected via API (`X-API-Secret`) the following records:

1. `fn_arakawa__75cc74` — 荒川 / Arakawa
2. `fn_kinjou__9221c9` — 金城 / Kinjou
3. `fn_takenaka__e30337` — 竹中 / Takenaka
4. `fn_furuta__8f1f67` — 古田 / Furuta
5. `fn_ishiwata__865d42` — 石渡 / Ishiwata
6. `fn_kitada__8f3b50` — 北田 / Kitada
7. `fn_nagashima__240687` — 長嶋 / Nagashima
8. `fn_kawabe__902868` — 河辺 / Kawabe

What was repaired in this batch:

- filled missing `meaning_zh`
- filled missing `description_zh`
- rewrote generic/template `description_en`
- rewrote generic/template `etymology_en`
- corrected placeholder-like `meaning_en` (`荒 river`, `金 城`, `竹 center`, `古 field`, etc.)
- repaired missing per-kanji readings / meanings in `kanji_breakdown`

Verification:

- re-read each record through `GET /api/names/:id`
- confirmed `meaning_zh` and `description_zh` are now present for all 8
- confirmed `kanji_breakdown[].reading` is populated for all repaired entries

Priority rationale:

- These surnames still have strong male-page visibility by population / recurrence potential, especially `Arakawa` (74,300), `Kinjou` (61,100), `Takenaka` (53,500), `Furuta` (61,700), `Ishiwata` (31,700), `Kitada` (26,800), `Nagashima` (16,000), and `Kawabe` (11,000).

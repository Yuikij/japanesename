# Male page family-name repair batch — 2026-03-29 round 5

Context: continued SOP-aligned manual repair for high-visibility / high-repeat `family_name` records surfacing on `/[locale]/names/male` after round 4.

Manually corrected via API (`X-API-Secret`) the following records:

1. `fn_arai__35ce1b` — 新井 / Arai
2. `fn_matsui__dfed5d` — 松井 / Matsui
3. `fn_iida__2e071c` — 飯田 / Iida
4. `fn_ishihara__315a61` — 石原 / Ishihara
5. `fn_nagata__8323c7` — 永田 / Nagata
6. `fn_kawamura__d6e266` — 川村 / Kawamura
7. `fn_hirose__620aa6` — 広瀬 / Hirose
8. `fn_iwamoto__9cdeab` — 岩本 / Iwamoto

What was repaired in this batch:

- filled missing `meaning_zh`
- filled missing `description_zh`
- rewrote generic/template `description_en`
- rewrote generic/template `etymology_en`
- corrected placeholder-like `meaning_en` (`New well`, `Pine well`, `Wide rapids`, `Rock base`, etc.)
- repaired missing per-kanji readings / meanings in `kanji_breakdown`

Verification:

- re-read each record through `GET /api/names/:id`
- confirmed `meaning_zh` and `description_zh` are now present for all 8
- confirmed `kanji_breakdown[].reading` is populated for all repaired entries

Priority rationale:

- These remain high-visibility surnames by national rank (80, 90, 111, 140, 161, 166, 174, 178) and were still likely to surface on `/[locale]/names/male` combos with visibly low-quality surname content before repair.

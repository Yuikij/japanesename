const https = require('https');

const SECRET = 'CHANGE_ME';
const PAGE = 500;

function list(offset) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'japanesenamedata.yuisama.top',
        path: `/api/names?limit=${PAGE}&offset=${offset}`,
        method: 'GET',
        headers: { 'X-API-Secret': SECRET },
      },
      (res) => {
        let s = '';
        res.on('data', (c) => (s += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(s));
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  let off = 0;
  let total = 0;
  let given = 0;
  let tDesc = 0;
  let tEty = 0;
  let badMeaning = 0;
  let vibeLow = 0;
  let elemLow = 0;
  let tagLow = 0;
  const samples = [];

  while (true) {
    const r = await list(off);
    const arr = r.data || [];
    total += arr.length;

    for (const n of arr) {
      if (n.name_part !== 'given_name') continue;
      given++;

      const d = (n.description_en || '').toLowerCase();
      const e = (n.etymology_en || '').toLowerCase();
      const m = n.meaning_en || '';
      const v = Array.isArray(n.vibe) ? n.vibe : [];
      const el = Array.isArray(n.element) ? n.element : [];
      const tags = Array.isArray(n.kanji_meaning_tags) ? n.kanji_meaning_tags : [];

      const isTemplateDesc = /compound meaning|semantic core|real-world naming/.test(d);
      const isTemplateEty = /this given-name spelling|purely phonetic writing|main semantic weight/.test(e);
      const hasKanjiInMeaning = /[\u4e00-\u9fff]/.test(m);

      if (isTemplateDesc) tDesc++;
      if (isTemplateEty) tEty++;
      if (hasKanjiInMeaning) badMeaning++;
      if (v.length < 2) vibeLow++;
      if (el.length < 1) elemLow++;
      if (tags.length < 8) tagLow++;

      if ((isTemplateDesc || isTemplateEty || hasKanjiInMeaning || v.length < 2 || tags.length < 8) && samples.length < 12) {
        samples.push({
          id: n.id,
          romaji: n.romaji,
          kanji: n.kanji,
          meaning_en: n.meaning_en,
          vibe_len: v.length,
          element_len: el.length,
          tags_len: tags.length,
        });
      }
    }

    off += arr.length;
    if (arr.length < PAGE) break;
  }

  console.log(
    JSON.stringify(
      {
        total,
        given,
        template_description_en: tDesc,
        template_etymology_en: tEty,
        meaning_en_contains_kanji: badMeaning,
        vibe_len_lt_2: vibeLow,
        element_len_lt_1: elemLow,
        kanji_tags_len_lt_8: tagLow,
        samples,
      },
      null,
      2
    )
  );
})();

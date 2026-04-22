const d = require('../新版本PSEO改造/keyword/keyword.json');
// Target IDs to activate
const targets = [
  'kw_0050','kw_0051','kw_0064','kw_0076',
  'kw_0134','kw_0137','kw_0139','kw_0149',
  'kw_0160','kw_0164','kw_0166','kw_0169',
  'kw_0178','kw_0181','kw_0182','kw_0185',
  'kw_0187','kw_0192','kw_0199'
];
targets.forEach(id => {
  const k = d.find(x=>x.id===id);
  if (!k) return;
  console.log(`\n--- ${id} ---`);
  console.log('keyword:', k.keyword);
  console.log('path:', k.path);
  console.log('sv:', k.search_volume_total || k.search_volume);
  console.log('dimensions:', JSON.stringify(k.dimensions));
  console.log('tags_hint:', JSON.stringify(k.tags_hint));
  console.log('seo_guidance (excerpt):', (k.seo_guidance||'').slice(0,120));
});

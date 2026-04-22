const fs = require('fs');
const content = fs.readFileSync('./新版本PSEO改造/keyword/keyword.json', 'utf8');
const lines = content.split('\n');
const bugIds = ['kw_0023', 'kw_0091', 'kw_0124', 'kw_0156'];
bugIds.forEach(id => {
  const idx = lines.findIndex(l => l.includes('"id": "' + id + '"'));
  console.log('--- ' + id + ' (line ' + (idx+1) + ') ---');
  let quizLine = -1;
  let seoLine = -1;
  for (let i = idx; i < idx + 80; i++) {
    if (lines[i] && lines[i].includes('"quiz": true')) quizLine = i;
    if (lines[i] && lines[i].includes('"seo": true')) seoLine = i;
  }
  if (quizLine >= 0) console.log('  quiz:true at line', quizLine+1);
  if (seoLine >= 0) console.log('  seo:true at line', seoLine+1);
  // print keywords and paths
  const kwLine = lines.findIndex((l, i) => i >= idx && l.includes('"keyword":'));
  const pathLine = lines.findIndex((l, i) => i >= idx && l.includes('"path":'));
  console.log('  keyword:', lines[kwLine]);
  console.log('  path:', lines[pathLine]);
});

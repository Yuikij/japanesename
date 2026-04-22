const fs = require('fs');
const content = fs.readFileSync('../新版本PSEO改造/keyword/keyword.json', 'utf8');
const lines = content.split('\n');
['kw_0064','kw_0076','kw_0134','kw_0137','kw_0166','kw_0192'].forEach(id => {
  const idx = lines.findIndex(l => l.includes('"id": "' + id + '"'));
  console.log(id, '-> entry starts line', idx+1);
});

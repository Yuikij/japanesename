const d = require('../新版本PSEO改造/keyword/keyword.json');
const drafts = d.filter(k=>k.strategy==='category_page' && k.status==='draft');
console.log('Total draft category pages:', drafts.length);
drafts.forEach(k=>console.log(k.id, '|', k.path, '|', 'sv:'+(k.search_volume_total||k.search_volume||0), '|', 'filter_rule:', k.filter_rule ? 'yes' : 'null'));

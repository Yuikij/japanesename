const fs = require('fs');
const d = require('../新版本PSEO改造/keyword/keyword.json');

const updates = [
  {
    id: 'kw_0050',
    keyword_override: 'samurai japanese names',
    filter_rule: {
      must: [{ field: 'vibe', op: 'any_of', value: ['fierce','brave','strong','bold'] }],
      should: [{ field: 'era', op: 'any_of', value: ['ancient','traditional'] }]
    },
    seo: {
      title: 'Samurai Japanese Names — Fierce, Brave & Traditional Full-Name Ideas',
      h1: 'Samurai Japanese Names',
      description: 'Browse Japanese samurai names with kanji meanings, fierce readings, and warrior full-name combinations. Compare bold, brave, and battle-hardened name styles rooted in ancient Japan.'
    }
  },
  {
    id: 'kw_0064',
    filter_rule: {
      must: [],
      should: [
        { field: 'era', op: 'any_of', value: ['ancient','traditional'] },
        { field: 'vibe', op: 'any_of', value: ['noble','elegant','serene','strong'] }
      ]
    },
    seo: {
      title: 'Japanese Names in Kanji — Full-Name Ideas with Kanji Meanings & Readings',
      h1: 'Japanese Names in Kanji',
      description: 'Explore Japanese names written in kanji with meanings, readings, and elegant full-name combinations. Browse classical, noble, and traditional kanji-based name ideas.'
    }
  },
  {
    id: 'kw_0076',
    filter_rule: {
      must: [],
      should: [
        { field: 'vibe', op: 'any_of', value: ['elegant','noble','serene','warm','bright'] },
        { field: 'popularity', op: 'any_of', value: ['very_common','common'] }
      ]
    },
    seo: {
      title: 'Good Japanese Names — Beautiful, Meaningful & Memorable Full-Name Ideas',
      h1: 'Good Japanese Names',
      description: 'Browse good Japanese names with kanji meanings, readings, and full-name combinations. Find elegant, noble, warm, and widely-loved name styles for babies, characters, or inspiration.'
    }
  },
  {
    id: 'kw_0134',
    filter_rule: {
      must: [],
      should: [
        { field: 'vibe', op: 'any_of', value: ['elegant','cute','cool','warm','serene'] }
      ]
    },
    seo: {
      title: 'List of Japanese Names — Browse Full-Name Ideas with Kanji & Meanings',
      h1: 'List of Japanese Names',
      description: 'Browse a curated list of Japanese names with kanji meanings, readings, and full-name combinations. Explore elegant, cute, cool, and serene name styles in one place.'
    }
  },
  {
    id: 'kw_0137',
    filter_rule: {
      must: [],
      should: [
        { field: 'vibe', op: 'any_of', value: ['cool','elegant','cute','strong','serene'] }
      ]
    },
    seo: {
      title: 'Random Japanese Names — Browse & Discover Full-Name Ideas',
      h1: 'Random Japanese Names',
      description: 'Discover random Japanese names with kanji meanings, readings, and full-name combinations. Browse a wide variety of cool, elegant, and memorable Japanese name ideas.'
    }
  },
  {
    id: 'kw_0139',
    filter_rule: {
      must: [{ field: 'popularity', op: 'any_of', value: ['uncommon','rare'] }],
      should: [{ field: 'vibe', op: 'any_of', value: ['mysterious','elegant','cool','edgy'] }]
    },
    seo: {
      title: 'Unusual Japanese Names — Rare, Distinctive & Uncommon Full-Name Ideas',
      h1: 'Unusual Japanese Names',
      description: 'Browse unusual Japanese names with rare kanji, mysterious vibes, and distinctive full-name combinations. Find low-frequency, cool, and memorable name styles that stand out.'
    }
  },
  {
    id: 'kw_0149',
    filter_rule: {
      must: [{ field: 'popularity', op: 'any_of', value: ['very_common','common'] }],
      should: []
    },
    seo: {
      title: 'Asian Common Names — Popular Japanese Full-Name Ideas with Meanings',
      h1: 'Asian Common Names',
      description: 'Explore popular and widely-used Asian names through Japanese full-name combinations with kanji meanings and readings. Browse common, familiar, and classic name styles.'
    }
  },
  {
    id: 'kw_0160',
    filter_rule: {
      must: [],
      should: [
        { field: 'vibe', op: 'any_of', value: ['elegant','cute','cool','serene','warm'] }
      ]
    },
    seo: {
      title: 'Japanese Name Ideas — Browse Full-Name Combinations with Kanji & Meanings',
      h1: 'Japanese Name Ideas',
      description: 'Browse Japanese name ideas with kanji meanings, readings, and full-name combinations. Find elegant, cute, cool, and creative name inspiration across male, female, and unisex styles.'
    }
  },
  {
    id: 'kw_0164',
    filter_rule: {
      must: [],
      should: [
        { field: 'vibe', op: 'any_of', value: ['noble','elegant','serene','strong','brave'] }
      ]
    },
    seo: {
      title: 'Meaningful Japanese Names — Full-Name Ideas with Kanji & Deep Meanings',
      h1: 'Meaningful Japanese Names',
      description: 'Explore meaningful Japanese names with kanji breakdowns, readings, and full-name combinations. Browse noble, elegant, and deeply symbolic name ideas with rich cultural roots.'
    }
  },
  {
    id: 'kw_0166',
    filter_rule: {
      must: [],
      should: [
        { field: 'vibe', op: 'any_of', value: ['gentle','warm','cute','elegant','bright'] }
      ]
    },
    seo: {
      title: 'Nice Japanese Names — Gentle, Friendly & Elegant Full-Name Ideas',
      h1: 'Nice Japanese Names',
      description: 'Browse nice Japanese names with kanji meanings, readings, and full-name combinations. Find gentle, warm, cute, and elegant name styles that feel friendly and approachable.'
    }
  },
  {
    id: 'kw_0169',
    filter_rule: {
      must: [{ field: 'vibe', op: 'any_of', value: ['dark','fierce','mysterious','scary'] }],
      should: []
    },
    seo: {
      title: 'Scary Japanese Names — Dark, Fierce & Mysterious Full-Name Ideas',
      h1: 'Scary Japanese Names',
      description: 'Browse scary Japanese names with dark kanji meanings, fierce readings, and eerie full-name combinations. Find mysterious, shadowy, and dramatically intense name styles.'
    }
  },
  {
    id: 'kw_0178',
    filter_rule: {
      must: [{ field: 'vibe', op: 'any_of', value: ['cute','warm','gentle'] }],
      should: [{ field: 'popularity', op: 'any_of', value: ['very_common','common'] }]
    },
    seo: {
      title: 'Asian Baby Names — Cute & Sweet Japanese Full-Name Ideas',
      h1: 'Asian Baby Names',
      description: 'Explore Asian baby name ideas through cute and warm Japanese full-name combinations with kanji meanings and readings. Browse gentle, bright, and lovable name styles for newborns.'
    }
  },
  {
    id: 'kw_0181',
    filter_rule: {
      must: [{ field: 'gender', op: 'any_of', value: ['male','unisex'] }],
      should: [{ field: 'vibe', op: 'any_of', value: ['strong','noble','cool','elegant','brave'] }]
    },
    seo: {
      title: 'Good Japanese Names for Guys — Strong, Cool & Noble Male Full-Name Ideas',
      h1: 'Good Japanese Names for Guys',
      description: 'Browse good Japanese names for guys with kanji meanings, readings, and masculine full-name combinations. Compare strong, cool, noble, and widely-loved male name styles.'
    }
  },
  {
    id: 'kw_0182',
    filter_rule: {
      must: [],
      should: [
        { field: 'popularity', op: 'any_of', value: ['very_common','common'] },
        { field: 'era', op: 'any_of', value: ['modern','traditional','2000s'] }
      ]
    },
    seo: {
      title: 'Real Japanese Names — Authentic Full-Name Ideas with Kanji & Meanings',
      h1: 'Real Japanese Names',
      description: 'Browse authentic real Japanese names with kanji meanings, readings, and full-name combinations. Explore commonly used, traditional, and modern name styles actually found in Japan.'
    }
  },
  {
    id: 'kw_0185',
    filter_rule: {
      must: [],
      should: [
        { field: 'use_case', op: 'any_of', value: ['anime','fantasy'] },
        { field: 'vibe', op: 'any_of', value: ['cool','fierce','mysterious','elegant'] }
      ]
    },
    seo: {
      title: 'Japanese Character Names — Cool & Memorable Full-Name Ideas',
      h1: 'Japanese Character Names',
      description: 'Browse Japanese character names with kanji meanings, readings, and memorable full-name combinations. Find cool, fierce, mysterious, and dramatic name styles for anime, fantasy, and fiction.'
    }
  },
  {
    id: 'kw_0187',
    filter_rule: {
      must: [],
      should: [
        { field: 'vibe', op: 'any_of', value: ['elegant','cool','serene','noble','warm'] }
      ]
    },
    seo: {
      title: 'Japanese Full Names — Complete First & Last Name Combinations with Meanings',
      h1: 'Japanese Full Names',
      description: 'Browse Japanese full names with both given and family name components, kanji meanings, and readings. Explore complete first-and-last name combinations across elegant, cool, and classic styles.'
    }
  },
  {
    id: 'kw_0192',
    filter_rule: {
      must: [],
      should: [
        { field: 'vibe', op: 'any_of', value: ['elegant','cool','serene','noble','cute'] }
      ]
    },
    seo: {
      title: 'Japanese First and Last Names — Complete Full-Name Combinations with Kanji',
      h1: 'Japanese First and Last Names',
      description: 'Explore Japanese names with both first and last name pairings, kanji meanings, and readings. Browse elegant, cool, and classic full-name combinations across male, female, and unisex styles.'
    }
  },
  {
    id: 'kw_0199',
    filter_rule: {
      must: [{ field: 'element', op: 'any_of', value: ['fire','sun'] }],
      should: [{ field: 'vibe', op: 'any_of', value: ['fierce','warm','bright','brave'] }]
    },
    seo: {
      title: 'Japanese Names That Mean Red — Fiery, Passionate & Bold Full-Name Ideas',
      h1: 'Japanese Names That Mean Red',
      description: 'Browse Japanese names meaning red with fire and sun kanji, fierce readings, and bold full-name combinations. Find passionate, warm, and intensely radiant name styles.'
    }
  }
];

updates.forEach(({ id, keyword_override, filter_rule, seo }) => {
  const k = d.find(x => x.id === id);
  if (!k) { console.log('NOT FOUND:', id); return; }
  k.filter_rule = filter_rule;
  k.seo = seo;
  k.status = 'active';
  if (keyword_override) k.keyword = keyword_override;
});

fs.writeFileSync('../新版本PSEO改造/keyword/keyword.json', JSON.stringify(d, null, 2), 'utf8');

const active = d.filter(k => k.strategy === 'category_page' && k.status === 'active');
const draft = d.filter(k => k.strategy === 'category_page' && k.status === 'draft');
console.log('Updated', updates.length, 'pages to active');
console.log('Total active category pages now:', active.length);
console.log('Remaining draft category pages:', draft.length);

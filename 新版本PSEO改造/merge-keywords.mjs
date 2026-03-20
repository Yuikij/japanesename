import { readFileSync, writeFileSync } from 'fs';

const ours = JSON.parse(readFileSync('e:/code/japanesename/新版本PSEO改造/keyword/keyword.json', 'utf-8'));
const otherRaw = JSON.parse(readFileSync('e:/code/japanesename/新版本PSEO改造/keyword/keyword_other.json', 'utf-8'));
const otherKeywords = otherRaw.keywords;

// --- Normalize keyword text for matching ---
function normalizeKw(kw) {
  return kw.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
}

// Build lookup map from other: keyword_normalized → record
const otherMap = new Map();
for (const o of otherKeywords) {
  otherMap.set(normalizeKw(o.keyword), o);
}

// Build reverse map: for each of our records (including aliases), find other matches
function findOtherMatch(keyword) {
  const nk = normalizeKw(keyword);
  return otherMap.get(nk) || null;
}

// Normalize other's paths to our /names/ format
function normalizeOtherPath(p) {
  if (!p) return null;
  if (p.startsWith('/blog/')) return p;
  if (p === '/') return '/';
  // /male-names → /names/male
  // /female-cute-names → /names/female-cute
  return '/names/' + p.replace(/^\//, '').replace(/-names$/, '').replace(/-names-/, '-');
}

// Convert our must/should filter to field/op/value format
function convertFilterRule(otherRules) {
  if (!otherRules || otherRules.length === 0) return null;
  return {
    must: otherRules.map(r => ({ ...r })),
    should: []
  };
}

// --- Step 1: Enrich existing keywords ---
let enriched = 0;
let newFromOther = 0;
const matchedOtherKws = new Set();

for (const kw of ours) {
  // Try to match primary keyword
  let otherMatch = findOtherMatch(kw.keyword);
  if (otherMatch) matchedOtherKws.add(normalizeKw(otherMatch.keyword));

  // Also try aliases
  if (!otherMatch && kw.keyword_aliases) {
    for (const alias of kw.keyword_aliases) {
      const m = findOtherMatch(alias.keyword);
      if (m) {
        otherMatch = m;
        matchedOtherKws.add(normalizeKw(m.keyword));
        break;
      }
    }
  }

  if (otherMatch) {
    enriched++;

    // Import filter_rules (field/op/value format)
    if (otherMatch.name_filter_rules && otherMatch.name_filter_rules.length > 0) {
      kw.filter_rule = {
        must: otherMatch.name_filter_rules.map(r => ({ ...r })),
        should: []
      };
    }

    // Import related_destinations (normalize paths)
    if (otherMatch.related_destinations && otherMatch.related_destinations.length > 0) {
      kw.related_keywords = otherMatch.related_destinations.map(rd => ({
        label: rd.label,
        path: normalizeOtherPath(rd.path),
        filter_rules: rd.filter_rules || []
      }));
    }

    // Import seo_guidance
    if (otherMatch.seo_guidance) {
      kw.seo_guidance = otherMatch.seo_guidance;
    }

    // Import dimensions/retrieval_tags for richer tag info
    if (otherMatch.dimensions) {
      kw.dimensions = otherMatch.dimensions;
    }

    // Import page_template_type
    if (otherMatch.page_template_type) {
      kw.page_template_type = otherMatch.page_template_type;
    }

    // Import relevance_score
    if (otherMatch.relevance_score) {
      kw.relevance_score = otherMatch.relevance_score;
    }
  }
}

// --- Step 2: Find new keywords from other that we don't have ---
const newKeywords = [];
let idCounter = ours.length;

for (const o of otherKeywords) {
  const nk = normalizeKw(o.keyword);
  if (matchedOtherKws.has(nk)) continue;

  // Check if any of our keywords already have this as an alias
  let alreadyCovered = false;
  for (const kw of ours) {
    if (kw.keyword_aliases) {
      for (const alias of kw.keyword_aliases) {
        if (normalizeKw(alias.keyword) === nk) {
          alreadyCovered = true;
          break;
        }
      }
    }
    if (alreadyCovered) break;
  }
  if (alreadyCovered) {
    matchedOtherKws.add(nk);
    continue;
  }

  // Determine strategy from other's page_type
  let strategy = 'category_page';
  if (o.page_type === 'blog') strategy = 'blog_post';
  else if (o.page_type === 'tool_page') strategy = 'tool_page';

  const priority = o.search_volume >= 10000 ? 1
    : o.search_volume >= 5000 ? 2
    : o.search_volume >= 2000 ? 3
    : o.search_volume >= 500 ? 4 : 5;

  const record = {
    id: `kw_${String(++idCounter).padStart(4, '0')}`,
    keyword: o.keyword,
    search_volume: o.search_volume,
    kd: o.kd,
    cpc: o.cpc_usd,
    intent: Array.isArray(o.intent) ? o.intent.join(',') : o.intent || 'I',
    strategy: strategy,
    path: normalizeOtherPath(o.page_path),
    priority: priority,
    status: 'draft',
    source: 'keyword_other',
    tags_hint: null,
    dimensions: o.dimensions || null,
    page_template_type: o.page_template_type || null,
    relevance_score: o.relevance_score || null,
    seo_guidance: o.seo_guidance || null,
    seo: null,
    filter_rule: null,
    quiz: null,
    related_keywords: [],
  };

  // Import filter_rules
  if (o.name_filter_rules && o.name_filter_rules.length > 0) {
    record.filter_rule = {
      must: o.name_filter_rules.map(r => ({ ...r })),
      should: []
    };
  }

  // Import related_destinations
  if (o.related_destinations && o.related_destinations.length > 0) {
    record.related_keywords = o.related_destinations.map(rd => ({
      label: rd.label,
      path: normalizeOtherPath(rd.path),
      filter_rules: rd.filter_rules || []
    }));
  }

  newKeywords.push(record);
  newFromOther++;
}

// --- Step 3: Merge and deduplicate by path ---
const merged = [...ours, ...newKeywords];

// Group by path to merge duplicates
const byPath = new Map();
for (const kw of merged) {
  const p = kw.path || kw.keyword;
  if (!byPath.has(p)) byPath.set(p, []);
  byPath.get(p).push(kw);
}

const final = [];
for (const [path, group] of byPath) {
  group.sort((a, b) => (b.search_volume_total || b.search_volume) - (a.search_volume_total || a.search_volume));
  const primary = group[0];

  // Merge secondary keywords as aliases
  if (group.length > 1) {
    if (!primary.keyword_aliases) primary.keyword_aliases = [];
    const existingAliases = new Set(primary.keyword_aliases.map(a => normalizeKw(a.keyword)));
    existingAliases.add(normalizeKw(primary.keyword));

    for (let i = 1; i < group.length; i++) {
      const secondary = group[i];
      if (!existingAliases.has(normalizeKw(secondary.keyword))) {
        primary.keyword_aliases.push({
          keyword: secondary.keyword,
          search_volume: secondary.search_volume,
        });
        existingAliases.add(normalizeKw(secondary.keyword));
      }

      // Merge secondary's aliases too
      if (secondary.keyword_aliases) {
        for (const sa of secondary.keyword_aliases) {
          if (!existingAliases.has(normalizeKw(sa.keyword))) {
            primary.keyword_aliases.push(sa);
            existingAliases.add(normalizeKw(sa.keyword));
          }
        }
      }

      // If primary has no filter_rule but secondary does, take it
      if (!primary.filter_rule && secondary.filter_rule) {
        primary.filter_rule = secondary.filter_rule;
      }
      if ((!primary.related_keywords || primary.related_keywords.length === 0) && secondary.related_keywords?.length > 0) {
        primary.related_keywords = secondary.related_keywords;
      }
      if (!primary.seo_guidance && secondary.seo_guidance) {
        primary.seo_guidance = secondary.seo_guidance;
      }
    }

    // Recalculate total volume
    const allVols = [primary.search_volume, ...(primary.keyword_aliases || []).map(a => a.search_volume)];
    primary.search_volume_total = allVols.reduce((s, v) => s + v, 0);
  }

  final.push(primary);
}

// Sort by total volume desc
final.sort((a, b) => (b.search_volume_total || b.search_volume) - (a.search_volume_total || a.search_volume));

// Re-assign IDs
final.forEach((kw, i) => {
  kw.id = `kw_${String(i + 1).padStart(4, '0')}`;
});

// --- Output ---
writeFileSync(
  'e:/code/japanesename/新版本PSEO改造/keyword/keyword.json',
  JSON.stringify(final, null, 2),
  'utf-8'
);

// --- Stats ---
console.log('=== Merge Summary ===');
console.log(`Our original keywords: ${ours.length}`);
console.log(`Other keywords: ${otherKeywords.length}`);
console.log(`Enriched from other: ${enriched}`);
console.log(`New from other: ${newFromOther}`);
console.log(`After path dedup: ${final.length} primary keywords`);
console.log(`Total aliases: ${final.reduce((s, k) => s + (k.keyword_aliases?.length || 0), 0)}`);
console.log();

// Strategy distribution
const stratCounts = {};
final.forEach(k => { stratCounts[k.strategy] = (stratCounts[k.strategy] || 0) + 1; });
console.log('By strategy:', stratCounts);

// Priority distribution
const priCounts = {};
final.forEach(k => { priCounts['P' + k.priority] = (priCounts['P' + k.priority] || 0) + 1; });
console.log('By priority:', priCounts);

// How many have filter_rules now
const withFilters = final.filter(k => k.filter_rule && k.filter_rule.must?.length > 0).length;
const withRelated = final.filter(k => k.related_keywords && k.related_keywords.length > 0).length;
const withGuidance = final.filter(k => k.seo_guidance).length;
console.log(`With filter_rules: ${withFilters}/${final.length}`);
console.log(`With related_keywords: ${withRelated}/${final.length}`);
console.log(`With seo_guidance: ${withGuidance}/${final.length}`);

console.log();
console.log('Top 20:');
final.slice(0, 20).forEach((d, i) => {
  const vol = String(d.search_volume_total || d.search_volume).padStart(8);
  const hasF = d.filter_rule ? '✓' : '✗';
  const hasR = d.related_keywords?.length > 0 ? '✓' : '✗';
  console.log(`${String(i + 1).padStart(3)}. ${vol}  F:${hasF} R:${hasR}  ${(d.path || '').padEnd(35)} ${d.keyword}`);
});

// Extract enriched tag schema from other for reference
const tagSchema = otherRaw.summary.name_db_tag_schema;
writeFileSync(
  'e:/code/japanesename/新版本PSEO改造/keyword/tag-schema-reference.json',
  JSON.stringify(tagSchema, null, 2),
  'utf-8'
);
console.log('\nTag schema reference written to tag-schema-reference.json');

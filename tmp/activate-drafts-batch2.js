/**
 * Activate 16 draft category pages — Batch 2
 * Run: node tmp/activate-drafts-batch2.js
 */

const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../新版本PSEO改造/keyword/keyword.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));

const updates = {
  // ── Broad browse / generator ────────────────────────────────────────────
  kw_0040: {
    // keyword: japanese names generator  sv:1900
    status: "active",
    seo: {
      title: "Japanese Names Generator — Browse Full-Name Ideas with Kanji & Meanings",
      h1: "Japanese Names Generator",
      description:
        "Generate and browse Japanese full-name ideas with kanji meanings, readings, and style notes. Explore male, female, and unisex combinations for characters, babies, or creative projects.",
    },
    filter_rule: {
      must: [],
      should: [
        { field: "use_case", op: "any_of", value: ["real_person", "baby"] },
        { field: "popularity", op: "any_of", value: ["common", "uncommon", "rare"] },
        { field: "gender", op: "any_of", value: ["male", "female", "unisex"] },
      ],
    },
    quiz: null,
  },

  // ── Anime naming ────────────────────────────────────────────────────────
  kw_0047: {
    // keyword: anime naming  sv:1600
    status: "active",
    seo: {
      title: "Anime Naming — Japanese Anime Character Name Ideas with Meanings",
      h1: "Anime Naming",
      description:
        "Find Japanese names for anime characters with kanji meanings, cool readings, and full-name combinations. Browse edgy, mysterious, playful, and dramatically cool anime-ready naming ideas.",
    },
    filter_rule: {
      must: [{ field: "use_case", op: "any_of", value: ["anime", "game_character"] }],
      should: [
        { field: "vibe", op: "any_of", value: ["cool", "mysterious", "edgy", "playful"] },
        { field: "popularity", op: "any_of", value: ["uncommon", "rare", "unique"] },
      ],
    },
    quiz: null,
  },

  // ── Demon Slayer / Taisho-era style names ───────────────────────────────
  kw_0051: {
    // keyword: demon slayer name  sv:1480
    // Demon Slayer is set in Taisho-era Japan; characters have traditional era names
    // with fierce/brave/strong vibes. Repurpose as Taisho-era style page.
    status: "active",
    seo: {
      title: "Demon Slayer Names — Taisho-Era Japanese Name Ideas with Meanings",
      h1: "Demon Slayer Names",
      description:
        "Browse Japanese names in the style of Demon Slayer characters — traditional era names with fierce, brave, and battle-hardened kanji. Find Taisho-period inspired full-name combinations for anime fans and writers.",
    },
    filter_rule: {
      must: [{ field: "era", op: "any_of", value: ["ancient", "traditional"] }],
      should: [
        { field: "vibe", op: "any_of", value: ["fierce", "brave", "strong", "noble"] },
        { field: "use_case", op: "any_of", value: ["anime", "samurai", "warrior"] },
      ],
    },
    quiz: null,
  },

  // ── Funny Asian names ───────────────────────────────────────────────────
  kw_0058: {
    // keyword: funny asian names  sv:1300
    status: "active",
    seo: {
      title: "Funny Asian Names — Playful & Cute Japanese Full-Name Ideas",
      h1: "Funny Asian Names",
      description:
        "Browse playful and light-hearted Japanese names with cute kanji meanings, fun readings, and full-name combinations. Find names that are warm, charming, and genuinely fun to say.",
    },
    filter_rule: {
      must: [],
      should: [
        { field: "vibe", op: "any_of", value: ["cute", "playful", "warm", "bright"] },
        { field: "popularity", op: "any_of", value: ["very_common", "common"] },
      ],
    },
    quiz: null,
  },

  // ── Weird Asian names ───────────────────────────────────────────────────
  kw_0074: {
    // keyword: weird asian names  sv:1000
    status: "active",
    seo: {
      title: "Weird Asian Names — Unusual & Distinctive Japanese Name Ideas",
      h1: "Weird Asian Names",
      description:
        "Browse unusual and distinctive Japanese names with rare kanji, sharp readings, and memorable full-name combinations. Find names that stand out — edgy, mysterious, and low-frequency enough to feel genuinely unique.",
    },
    filter_rule: {
      must: [{ field: "popularity", op: "any_of", value: ["rare", "unique"] }],
      should: [
        { field: "vibe", op: "any_of", value: ["edgy", "mysterious", "cool"] },
      ],
    },
    quiz: null,
  },

  // ── Japanese words names ─────────────────────────────────────────────────
  kw_0115: {
    // keyword: japanese words names  sv:390
    // Intent: names that are meaningful Japanese words (nature, elements, feelings)
    status: "active",
    seo: {
      title: "Japanese Words as Names — Names with Deep Kanji Meanings",
      h1: "Japanese Words Names",
      description:
        "Browse Japanese names built from evocative everyday words — mountain, river, flower, fire, sky. Each name carries a clear meaning traceable to its kanji characters, with full-name pairings and readings.",
    },
    filter_rule: {
      must: [],
      should: [
        {
          field: "element",
          op: "any_of",
          value: ["mountain", "water", "wind", "earth", "flower", "sky", "light", "fire"],
        },
        { field: "vibe", op: "any_of", value: ["serene", "elegant", "noble", "warm"] },
      ],
    },
    quiz: null,
  },

  // ── Funny Japanese names ─────────────────────────────────────────────────
  kw_0126: {
    // keyword: funny japanese names  sv:320
    status: "active",
    seo: {
      title: "Funny Japanese Names — Playful & Cute Name Ideas with Kanji",
      h1: "Funny Japanese Names",
      description:
        "Browse funny and playful Japanese names with cute kanji meanings, cheerful readings, and light-hearted full-name combinations. Perfect for characters, usernames, or just a smile.",
    },
    filter_rule: {
      must: [{ field: "vibe", op: "any_of", value: ["cute", "playful"] }],
      should: [
        { field: "popularity", op: "any_of", value: ["very_common", "common"] },
      ],
    },
    quiz: null,
  },

  // ── Letter-initial pages (J, R, Y, S, D) ────────────────────────────────
  kw_0131: {
    // keyword: japanese names that start with j  sv:320
    status: "active",
    seo: {
      title: "Japanese Names That Start With J — Full-Name Ideas with Kanji",
      h1: "Japanese Names That Start With J",
      description:
        "Browse Japanese names starting with J — including Jun, Jiro, Junko, and more — with kanji meanings, readings, and full-name combinations across male, female, and unisex styles.",
    },
    filter_rule: {
      must: [{ field: "romaji", op: "starts_with", value: "j" }],
      should: [],
    },
    quiz: null,
  },

  kw_0132: {
    // keyword: japanese names that start with r  sv:320
    status: "active",
    seo: {
      title: "Japanese Names That Start With R — Full-Name Ideas with Kanji",
      h1: "Japanese Names That Start With R",
      description:
        "Browse Japanese names starting with R — including Ren, Ryo, Ryota, Riko, and more — with kanji meanings, readings, and full-name combinations across male, female, and unisex styles.",
    },
    filter_rule: {
      must: [{ field: "romaji", op: "starts_with", value: "r" }],
      should: [],
    },
    quiz: null,
  },

  // ── Japanese name definitions ────────────────────────────────────────────
  kw_0159: {
    // keyword: japanese name definitions  sv:260
    status: "active",
    seo: {
      title: "Japanese Name Definitions — Name Meanings, Kanji & Readings",
      h1: "Japanese Name Definitions",
      description:
        "Look up Japanese name definitions with kanji breakdowns, character-by-character meanings, and full-name examples. Browse names with noble, elegant, serene, and nature-rooted meanings.",
    },
    filter_rule: {
      must: [],
      should: [
        { field: "vibe", op: "any_of", value: ["noble", "elegant", "serene", "strong"] },
        {
          field: "element",
          op: "any_of",
          value: ["flower", "light", "water", "mountain", "sky"],
        },
      ],
    },
    quiz: null,
  },

  kw_0163: {
    // keyword: japanese names that start with y  sv:260
    status: "active",
    seo: {
      title: "Japanese Names That Start With Y — Full-Name Ideas with Kanji",
      h1: "Japanese Names That Start With Y",
      description:
        "Browse Japanese names starting with Y — including Yuki, Yuta, Yuna, Yoshiko, and more — with kanji meanings, readings, and full-name combinations across male, female, and unisex styles.",
    },
    filter_rule: {
      must: [{ field: "romaji", op: "starts_with", value: "y" }],
      should: [],
    },
    quiz: null,
  },

  // ── What are some Japanese names ─────────────────────────────────────────
  kw_0171: {
    // keyword: what are some japanese names  sv:260
    status: "active",
    seo: {
      title: "What Are Some Japanese Names? — Browse Names with Kanji & Meanings",
      h1: "What Are Some Japanese Names?",
      description:
        "Discover a wide selection of Japanese names — male, female, and unisex — with kanji meanings, readings, and full-name combinations. A good starting point for anyone new to Japanese naming.",
    },
    filter_rule: {
      must: [],
      should: [
        { field: "popularity", op: "any_of", value: ["very_common", "common", "uncommon"] },
        { field: "gender", op: "any_of", value: ["male", "female", "unisex"] },
      ],
    },
    quiz: null,
  },

  // ── English names in Japan ────────────────────────────────────────────────
  kw_0180: {
    // keyword: english names in japan  sv:210
    // Intent: people want to know what English-adjacent or Western-style names look like
    // in Japan, or what modern Japanese names sound somewhat familiar to Westerners.
    status: "active",
    seo: {
      title: "English Names in Japan — Modern Japanese Names with Western Appeal",
      h1: "English Names in Japan",
      description:
        "Browse modern Japanese names that feel familiar to Western ears — clean, contemporary full-name ideas with kanji meanings and readings. Compare Japanese naming styles from the 2000s and modern era.",
    },
    filter_rule: {
      must: [{ field: "era", op: "any_of", value: ["modern", "2000s"] }],
      should: [{ field: "popularity", op: "any_of", value: ["very_common", "common"] }],
    },
    quiz: null,
  },

  // ── Start with S ──────────────────────────────────────────────────────────
  kw_0190: {
    // keyword: japanese name start with s  sv:210
    status: "active",
    seo: {
      title: "Japanese Names Starting With S — Full-Name Ideas with Kanji",
      h1: "Japanese Names Starting With S",
      description:
        "Browse Japanese names starting with S — including Saki, Sakura, Sato, Shota, and more — with kanji meanings, readings, and full-name combinations across male, female, and unisex styles.",
    },
    filter_rule: {
      must: [{ field: "romaji", op: "starts_with", value: "s" }],
      should: [],
    },
    quiz: null,
  },

  // ── Japanese names that mean ──────────────────────────────────────────────
  kw_0198: {
    // keyword: japanese names that mean  sv:210
    // Intent: people want names with specific kanji meanings (strength, light, etc.)
    status: "active",
    seo: {
      title: "Japanese Names That Mean — Browse Names by Kanji Meaning",
      h1: "Japanese Names That Mean",
      description:
        "Browse Japanese names by what their kanji actually mean — brave, noble, light, flower, sky, and more. Each name entry shows the meaning behind every character for easy comparison.",
    },
    filter_rule: {
      must: [],
      should: [
        { field: "vibe", op: "any_of", value: ["noble", "elegant", "serene", "strong", "brave"] },
        {
          field: "element",
          op: "any_of",
          value: ["light", "flower", "water", "mountain", "sky", "fire"],
        },
      ],
    },
    quiz: null,
  },

  // ── Start with D ──────────────────────────────────────────────────────────
  kw_0200: {
    // keyword: japanese names that start with d  sv:210
    status: "active",
    seo: {
      title: "Japanese Names That Start With D — Full-Name Ideas with Kanji",
      h1: "Japanese Names That Start With D",
      description:
        "Browse Japanese names starting with D — including Daiki, Daisuke, Daimu, and more — with kanji meanings, readings, and full-name combinations across male and unisex styles.",
    },
    filter_rule: {
      must: [{ field: "romaji", op: "starts_with", value: "d" }],
      should: [],
    },
    quiz: null,
  },
};

// Apply updates
let changed = 0;
for (const item of data) {
  const patch = updates[item.id];
  if (!patch) continue;
  Object.assign(item, patch);
  changed++;
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
console.log(`✅ Updated ${changed} entries`);

// Verify
const active = data.filter((k) => k.strategy === "category_page" && k.status === "active");
const drafts = data.filter((k) => k.strategy === "category_page" && k.status === "draft");
console.log(`Active pages: ${active.length}`);
console.log(`Remaining drafts: ${drafts.length}`);

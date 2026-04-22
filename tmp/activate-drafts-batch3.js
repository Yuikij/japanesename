/**
 * Activate 8 more draft category pages — Batch 3
 * Run: node tmp/activate-drafts-batch3.js
 */

const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../新版本PSEO改造/keyword/keyword.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));

const updates = {
  // ── Username generator ─────────────────────────────────────────────────
  kw_0041: {
    // keyword: japanese username generator  sv:1900
    status: "active",
    seo: {
      title: "Japanese Username Generator — Cool Japanese Name Ideas for Usernames",
      h1: "Japanese Username Generator",
      description:
        "Find cool Japanese names that work as usernames — sleek, edgy, and memorable kanji-based name ideas with readings and meanings. Browse sharp, distinctive name styles for gaming, social media, and online identities.",
    },
    filter_rule: {
      must: [{ field: "vibe", op: "any_of", value: ["cool", "edgy", "mysterious"] }],
      should: [
        { field: "popularity", op: "any_of", value: ["uncommon", "rare", "unique"] },
      ],
    },
    quiz: null,
  },

  // ── Make name in Japanese ──────────────────────────────────────────────
  kw_0060: {
    // keyword: make name in japanese  sv:1300
    status: "active",
    seo: {
      title: "Make a Name in Japanese — Browse Full-Name Ideas with Kanji & Meanings",
      h1: "Make a Name in Japanese",
      description:
        "Browse Japanese full-name combinations to create your own name in Japanese. Each name shows given name + surname pairings, kanji meanings, and readings across male, female, and unisex styles.",
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

  // ── Asian American names ───────────────────────────────────────────────
  kw_0066: {
    // keyword: asian american names  sv:1000
    status: "active",
    seo: {
      title: "Asian American Names — Japanese Name Ideas with Kanji & Meanings",
      h1: "Asian American Names",
      description:
        "Explore Asian American name ideas through Japanese full-name combinations with kanji meanings, readings, and modern styling. Browse names that blend Japanese heritage with contemporary everyday appeal.",
    },
    filter_rule: {
      must: [{ field: "era", op: "any_of", value: ["modern", "2000s"] }],
      should: [
        { field: "popularity", op: "any_of", value: ["very_common", "common"] },
      ],
    },
    quiz: null,
  },

  // ── Japanese names info ────────────────────────────────────────────────
  kw_0081: {
    // keyword: japanese names info  sv:800
    status: "active",
    seo: {
      title: "Japanese Names Info — Meanings, Kanji, Readings & Full-Name Examples",
      h1: "Japanese Names Info",
      description:
        "Explore Japanese name information including kanji character meanings, romaji readings, cultural notes, and full-name examples. A reference for anyone curious about how Japanese names are structured and what they mean.",
    },
    filter_rule: {
      must: [],
      should: [
        { field: "vibe", op: "any_of", value: ["elegant", "noble", "serene", "strong"] },
        {
          field: "element",
          op: "any_of",
          value: ["flower", "water", "mountain", "light", "sky"],
        },
      ],
    },
    quiz: null,
  },

  // ── Anime nickname generator ───────────────────────────────────────────
  kw_0093: {
    // keyword: anime nickname generator  sv:480
    status: "active",
    seo: {
      title: "Anime Nickname Generator — Cute & Cool Japanese Name Ideas",
      h1: "Anime Nickname Generator",
      description:
        "Browse Japanese names that make great anime nicknames — short, punchy, and character-ready. Find cute, cool, and playful name ideas with kanji meanings for anime fans and writers.",
    },
    filter_rule: {
      must: [
        { field: "use_case", op: "any_of", value: ["anime", "game_character"] },
        { field: "vibe", op: "any_of", value: ["cute", "playful", "cool", "edgy"] },
      ],
      should: [
        { field: "syllable_count", op: "lte", value: 3 },
      ],
    },
    quiz: null,
  },

  // ── Names starting with R (alternate path) ────────────────────────────
  kw_0162: {
    // keyword: japanese names starting with r  sv:260
    status: "active",
    seo: {
      title: "Japanese Names Starting With R — Name Ideas with Kanji & Meanings",
      h1: "Japanese Names Starting With R",
      description:
        "Browse Japanese names starting with R — including Ren, Ryo, Ryota, Riku, and more — with kanji meanings, readings, and full-name combinations across male, female, and unisex styles.",
    },
    filter_rule: {
      must: [{ field: "romaji", op: "starts_with", value: "r" }],
      should: [],
    },
    quiz: null,
  },

  // ── My name in kanji ───────────────────────────────────────────────────
  kw_0165: {
    // keyword: my name in kanji  sv:260
    status: "active",
    seo: {
      title: "My Name in Kanji — Browse Japanese Kanji Name Ideas & Meanings",
      h1: "My Name in Kanji",
      description:
        "Explore how Japanese names look written in kanji with character-by-character meanings, readings, and full-name pairings. Find a kanji name that suits you — from elegant and serene to bold and noble.",
    },
    filter_rule: {
      must: [],
      should: [
        { field: "era", op: "any_of", value: ["ancient", "traditional"] },
        { field: "vibe", op: "any_of", value: ["noble", "elegant", "serene", "strong"] },
      ],
    },
    quiz: null,
  },

  // ── Names starting with Y (alternate path) ───────────────────────────
  kw_0197: {
    // keyword: japanese names starting with y  sv:210
    status: "active",
    seo: {
      title: "Japanese Names Starting With Y — Name Ideas with Kanji & Meanings",
      h1: "Japanese Names Starting With Y",
      description:
        "Browse Japanese names starting with Y — including Yuki, Yuto, Yuna, Yoshi, and more — with kanji meanings, readings, and full-name combinations across male, female, and unisex styles.",
    },
    filter_rule: {
      must: [{ field: "romaji", op: "starts_with", value: "y" }],
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

const active = data.filter((k) => k.strategy === "category_page" && k.status === "active");
const drafts = data.filter((k) => k.strategy === "category_page" && k.status === "draft");
console.log(`Active pages: ${active.length}`);
console.log(`Remaining drafts: ${drafts.length}`);
console.log("Remaining draft IDs:", drafts.map((k) => k.id + " " + k.keyword).join("\n"));

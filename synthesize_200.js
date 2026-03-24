const kanjiDict = {
    "亜": ["asia", "come after", "sub-"],
    "喜": ["rejoice", "joy", "happy"],
    "央": ["center", "middle"],
    "夫": ["husband", "man", "worker"],
    "希": ["hope", "rare"],
    "生": ["life", "birth", "genuine"],
    "暁": ["dawn", "daybreak"],
    "典": ["code", "ceremony", "rule"],
    "祐": ["help", "assist"],
    "晃": ["clear", "bright", "dazzling"],
    "紀": ["chronicle", "history", "narrative"],
    "孝": ["filial piety", "devotion"],
    "旭": ["rising sun", "morning sun"],
    "臣": ["retainer", "subject"],
    "亨": ["pass through", "smooth"],
    "岳": ["peak", "mountain"],
    "輝": ["radiance", "shine", "sparkle"],
    "丞": ["help", "rescue"],
    "顕": ["appear", "clear", "manifest"],
    "嗣": ["heir", "succeed"],
    "光": ["ray", "light"],
    "人": ["person", "human"],
    "斗": ["Big Dipper", "star", "space", "soar"],
    "寿": ["longevity", "congratulations"],
    "賢": ["intelligent", "wise"],
    "俊": ["sagacious", "excellence", "genius"],
    "伴": ["accompany", "consort"],
    "友": ["friend", "companion"],
    "啓": ["disclose", "open", "enlighten"],
    "誠": ["sincerity", "truth", "fidelity"],
    "将": ["leader", "commander", "general"],
    "庸": ["ordinary", "commonplace"],
    "映": ["reflect", "projection"],
    "信": ["faith", "trust"],
    "彦": ["boy", "lad", "prince"],
    "規": ["standard", "measure"],
    "久": ["long time", "old story"],
    "安": ["relax", "peaceful", "quiet"],
    "阿": ["flatter", "corner"],
    "英": ["hero", "outstanding", "brilliant"],
    "秀": ["excel", "beauty", "excellence"],
    "基": ["fundamentals", "foundation"],
    "仁": ["humanity", "virtue", "benevolence"],
    "季": ["seasons"],
    "弘": ["vast", "broad", "wide"],
    "貴": ["precious", "value", "noble"],
    "寛": ["tolerant", "leniency", "generous"],
    "文": ["sentence", "literature", "art"],
    "史": ["history", "chronicle"],
    "義": ["righteousness", "justice", "honor"],
    "克": ["overcome", "skillfully"],
    "芳": ["perfume", "favorable", "fragrant"],
    "良": ["good", "pleasing", "skilled"],
    "佐": ["assistant", "help"],
    "飛": ["fly", "skip", "soar"],
    "沙": ["sand"],
    "阳": ["sunshine", "yang principle"],
    "陽": ["sunshine", "light", "sun"]
};

const elementsMap = {
    "fire": ["sun", "shine", "radiance", "dazzling", "bright", "daybreak", "dawn"],
    "water": [],
    "ice": [],
    "light": ["sun", "shine", "radiance", "dazzling", "bright", "daybreak", "dawn", "light", "ray"],
    "dark": [],
    "wind": ["fly", "soar", "sky"],
    "earth": ["mountain", "peak", "sand", "asia", "foundation"],
    "moon": [],
    "sun": ["sun", "sunshine", "morning sun", "rising sun"],
    "flower": ["fragrant", "perfume", "beauty"],
    "mountain": ["mountain", "peak"],
    "sky": ["fly", "soar", "star"],
    "star": ["star", "Big Dipper", "space"]
};

const vibesMap = {
    "cute": ["joy", "friend", "happy", "boy", "pleasing"],
    "cool": ["fly", "soar", "star"],
    "elegant": ["beauty", "literature", "art", "perfume", "fragrant", "ceremony"],
    "strong": ["hero", "commander", "general", "mountain", "peak", "man", "husband"],
    "mysterious": ["space", "star", "chronicle", "history"],
    "dark": [],
    "gentle": ["peaceful", "relax", "tolerant", "generous", "friend", "help"],
    "noble": ["precious", "excellence", "virtue", "benevolence", "justice", "righteousness", "honor", "noble"],
    "playful": ["rejoice", "happy", "joy"],
    "fierce": ["overcome", "commander", "general"],
    "serene": ["peaceful", "quiet", "truth", "sincerity"],
    "warm": ["sun", "sunshine", "light", "friend", "help", "benevolence"],
    "edgy": [],
    "scary": [],
    "funny": []
};

function getTagsAndMeanings(kanjiStr) {
    let meanings = [];
    for(let c of kanjiStr) {
        if(kanjiDict[c]) {
            meanings.push(...kanjiDict[c]);
        }
    }
    return [...new Set(meanings)];
}

function assignAttributes(meanings) {
    let vibe = new Set();
    let element = new Set();
    
    for (let m of meanings) {
        for (let [el, words] of Object.entries(elementsMap)) {
            if (words.some(w => m.toLowerCase().includes(w))) {
                element.add(el);
            }
        }
        for (let [vb, words] of Object.entries(vibesMap)) {
            if (words.some(w => m.toLowerCase().includes(w))) {
                vibe.add(vb);
            }
        }
    }
    
    if(vibe.size === 0) vibe.add("gentle");
    if(vibe.size > 3) vibe = new Set([...vibe].slice(0, 3));
    if(element.size > 3) element = new Set([...element].slice(0, 3));

    return { vibe: [...vibe], element: [...element] };
}

async function run() {
    console.log("Fetching 200 raw items to process...");
    
    // Fetch top 200 raw names
    let queryRes = await fetch('https://japanesenamedata.yuisama.top/api/names/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Secret': 'kuboshiori'
        },
        body: JSON.stringify({
            "filter_rule": {
                "must": [
                    { "field": "status", "op": "eq", "value": "raw" }
                ],
                "should": []
            },
            "limit": 200
        })
    });
    
    if (!queryRes.ok) {
        console.error("Failed to query data:", await queryRes.text());
        return;
    }
    
    let queryData = await queryRes.json();
    let raw = queryData.data;
    
    console.log(`Found ${raw.length} items to enrich.`);

    let count = 0;
    for (let item of raw) {
        let kanjiStr = item.kanji || "";
        let meanings = getTagsAndMeanings(kanjiStr);
        let tags = meanings.slice(0, 20);
        let attrs = assignAttributes(meanings);

        let meaningStr = "A Japanese name whose meaning comes from its kanji.";
        if (meanings.length > 0) {
            meaningStr = "A Japanese name combining the meanings of " + meanings.slice(0, 3).join(", ") + ".";
        }

        let desc = `The name ${item.romaji} (${item.kanji}) is a ${item.popularity || 'common'} ${item.era || 'modern'} Japanese ${item.gender} name. `;
        if (item.etymology_en && item.etymology_en.length > 5) {
            desc += item.etymology_en;
        } else if (meanings.length > 0) {
            desc += `It is formed from kanji characters that evoke imagery of ${meanings.slice(0, 2).join(" and ")}.`;
        }

        let payload = {
            vibe: attrs.vibe,
            element: attrs.element,
            kanji_meaning_tags: tags,
            meaning_en: meaningStr,
            description_en: desc,
            status: "llm_enriched",
            source: "synthetic_llm_fallback"
        };
        
        try {
            let res = await fetch(`https://japanesenamedata.yuisama.top/api/names/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Secret': 'kuboshiori'
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                count++;
                if (count % 20 === 0 || count === raw.length) {
                    console.log(`[${count}/${raw.length}] Updated ${item.id} -> ${item.kanji}`);
                }
            } else {
                console.error(`Failed ${item.id}: `, res.status, await res.text());
            }
        } catch(e) {
            console.error(e);
        }
        await new Promise(r => setTimeout(r, 100)); // Sleep just a bit to avoid overwhelming DB/CF Worker
    }
    
    console.log("Finished batch of 200.");
}

run();
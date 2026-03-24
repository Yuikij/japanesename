const fs = require('fs');
const raw = require('./raw_50.json');

const keys = 'AIzaSyBdX07qkK2sfpjGoUWjlbwVvWyx2CTy5eg,AIzaSyBP7_EVqHLldEZEfAEnFEouZqH2Zraq6wU,AIzaSyB-nWf0PleMvOrcZB0gpiJPZQ3GfidXMBA'.split(',');

const prompt_template = `You are a Japanese Name Expert. I will give you a list of partial Japanese name records.
For EACH record, provide an enriched version with these new soft tags based on its kanji, reading, and etymology.
Requirements:
- vibe: array of up to 3 strings from [cute, cool, elegant, strong, mysterious, dark, gentle, noble, playful, fierce, serene, warm, edgy, scary, funny]
- element: array of up to 3 strings from [fire, water, ice, light, dark, wind, earth, moon, sun, flower, mountain, sky, star, death, blood, thunder]
- kanji_meaning_tags: array of 10 to 20 English tags capturing full meaning of the kanji, literal and extended associations. Open vocabulary (e.g. cherry blossom, truth, light, ocean, tree, shrine).
- meaning_en: a nice 1-line English meaning summary
- description_en: 2-3 sentence cultural context, origin, and explanation

Data:
{DATA}

Return ONLY valid JSON in this exact structure:
[
  {
    "id": "gn_...",
    "vibe": [], 
    "element": [], 
    "kanji_meaning_tags": [], 
    "meaning_en": "...", 
    "description_en": "..."
  }
]
`;

async function main() {
    let batchSize = 10;
    for(let i = 0; i < 50; i += batchSize) {
        const batch = raw.slice(i, i+batchSize);
        console.log(`Processing batch ${i/batchSize + 1} (items ${i} to ${i+batchSize-1})`);
        
        let miniBatch = batch.map(x => ({
            id: x.id,
            romaji: x.romaji,
            kanji: x.kanji,
            reading: x.reading,
            gender: x.gender,
            etymology_en: x.etymology_en,
            kanji_breakdown: x.kanji_breakdown
        }));

        let prompt = prompt_template.replace('{DATA}', JSON.stringify(miniBatch));

        let currentKey = keys[2];
        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${currentKey}`;
        
        let reqBody = {
            system_instruction: { parts: [{ text: "Return only valid JSON. No markdown syntax." }] },
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { response_mime_type: "application/json" }
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reqBody)
        });
        
        let resJson = await res.json();
        
        if (!res.ok) {
            console.error('LLM error:', resJson);
            break;
        }

        let outputText = resJson.candidates[0].content.parts[0].text;
        
        // Remove markdown brackets if present
        if (outputText.startsWith('```json')) {
            outputText = outputText.replace(/^```json\\n/, '').replace(/\n```$/, '');
        }

        let enriched;
        try {
            enriched = JSON.parse(outputText);
        } catch(e) {
            console.error('JSON Parse error', e, outputText);
            continue; // Skip this batch if parse fails
        }

        for (let item of enriched) {
            // update API
            let payload = {
                ...item,
                status: 'llm_enriched',
                source: 'kanshudo.com, behindthename.com, japanese-names.info, llm'
            };
            
            try {
                let updateRes = await fetch(`https://japanesenamedata.yuisama.top/api/names/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Secret': 'kuboshiori'
                    },
                    body: JSON.stringify(payload)
                });
                console.log(`Updated ${item.id}: ${updateRes.ok ? 'OK' : await updateRes.text()}`);
            } catch(e) {
                console.error(`Failed to update ${item.id}`, e);
            }
        }
        
        // Small delay to prevent hitting API limits
        await new Promise(r => setTimeout(r, 2000));
    }
    console.log("Finished all 50 items!");
}
main();

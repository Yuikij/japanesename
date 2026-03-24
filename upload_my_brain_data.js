const fs = require('fs');

async function uploadTags() {
    const data = JSON.parse(fs.readFileSync('payload_500_4_1.json', 'utf8'));
    let count = 0;
    
    for(let item of data) {
        let payload = {
            vibe: item.vibe,
            element: item.element,
            use_case: item.use_case,
            kanji_meaning_tags: item.kanji_meaning_tags,
            meaning_en: item.meaning_en,
            description_en: item.description_en,
            status: 'llm_enriched',
            source: 'llm_agent_manual'
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
            if(res.ok) {
                count++;
                console.log(`[${count}/${data.length}] Updated ${item.id}`);
            } else {
                console.error(`Failed ${item.id}`, res.status, await res.text());
            }
        } catch(e) {
            console.error(e);
        }
    }
}
uploadTags();
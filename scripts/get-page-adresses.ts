
import { createClient } from 'next-sanity';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function getPageAdresses() {
    try {
        const data = await client.fetch(`*[_id == "pageAdresses"][0]`);
        fs.writeFileSync('page_adresses_data.json', JSON.stringify(data, null, 2));
        console.log("Data written to page_adresses_data.json");
    } catch (error) {
        console.error('Erreur:', error);
    }
}

getPageAdresses();

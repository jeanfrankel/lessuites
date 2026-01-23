
import { createClient } from 'next-sanity';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function updatePharmacyDescription() {
    try {
        const currentDoc = await client.fetch(`*[_id == "pageAdresses"][0]`);

        if (!currentDoc) {
            console.error("Document pageAdresses introuvable");
            return;
        }

        const categories = currentDoc.categories || [];

        const newCategories = categories.map((cat: any) => {
            if (cat.categoryName?.fr === 'Utile et pratique') {
                const items = cat.items.map((item: any) => {
                    if (item.name === 'Pharmacie des Vignes') {
                        return {
                            ...item,
                            description: {
                                fr: 'Pharmacie en plein cœur de Colmar',
                                en: 'Pharmacy in the heart of Colmar',
                                de: 'Apotheke im Herzen von Colmar',
                                zh: '科尔马市中心的药房'
                            }
                        };
                    }
                    return item;
                });
                return { ...cat, items };
            }
            return cat;
        });

        await client
            .patch('pageAdresses')
            .set({ categories: newCategories })
            .commit();

        console.log("Mise à jour effectuée avec succès !");

    } catch (error) {
        console.error('Erreur:', error);
    }
}

updatePharmacyDescription();

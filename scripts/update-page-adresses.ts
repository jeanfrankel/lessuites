
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

async function updatePageAdresses() {
    try {
        const currentDoc = await client.fetch(`*[_id == "pageAdresses"][0]`);

        if (!currentDoc) {
            console.error("Document pageAdresses introuvable");
            return;
        }

        const categories = currentDoc.categories || [];

        const newCategories = categories
            .filter((cat: any) => cat.categoryName?.fr !== 'Shopping') // Supprimer Shopping
            .map((cat: any) => {
                // Update Spécialités (Pâtisseries)
                if (cat.categoryName?.fr === 'Spécialités') {
                    // Replace Richon with Schmitt
                    const items = cat.items.map((item: any) => {
                        if (item.name.includes('Richon')) {
                            return {
                                ...item,
                                name: 'Pâtisserie Schmitt',
                                description: {
                                    fr: 'Avenue de la République',
                                    en: 'Avenue de la République',
                                    de: 'Avenue de la République',
                                    zh: 'Avenue de la République'
                                }
                            };
                        }
                        return item;
                    });

                    // Add Biskot
                    if (!items.find((i: any) => i.name === 'Biskot')) {
                        items.push({
                            _key: Math.random().toString(36).substring(7),
                            name: 'Biskot',
                            description: {
                                fr: 'Boulangerie et salon de thé',
                                en: 'Bakery and tea room',
                                de: 'Bäckerei und Teestube',
                                zh: '面包店和茶室'
                            }
                        });
                    }

                    return { ...cat, items };
                }

                // Update Utile et pratique
                if (cat.categoryName?.fr === 'Utile et pratique') {
                    let items = cat.items.filter((item: any) => !item.name.includes('City Fitness')); // Remove Gym

                    // Replace Pharmacie du Cygne
                    items = items.map((item: any) => {
                        if (item.name.includes('Pharmacie du Cygne')) {
                            return {
                                ...item,
                                name: 'Pharmacie des Vignes',
                                description: {
                                    fr: 'Place de la Pharmacie du Cygne',
                                    en: 'Place de la Pharmacie du Cygne',
                                    de: 'Place de la Pharmacie du Cygne',
                                    zh: 'Place de la Pharmacie du Cygne'
                                }
                            };
                        }
                        return item;
                    });

                    // Add Monoprix
                    if (!items.find((i: any) => i.name === 'Monoprix')) {
                        items.push({
                            _key: Math.random().toString(36).substring(7),
                            name: 'Monoprix',
                            description: {
                                fr: 'Supermarché en centre-ville',
                                en: 'City center supermarket',
                                de: 'Supermarkt im Stadtzentrum',
                                zh: '市中心超市'
                            }
                        });
                    }

                    // Add Carrefour City
                    if (!items.find((i: any) => i.name === 'Carrefour City')) {
                        items.push({
                            _key: Math.random().toString(36).substring(7),
                            name: 'Carrefour City',
                            description: {
                                fr: 'Supérette de proximité',
                                en: 'Convenience store',
                                de: 'Lebensmittelgeschäft',
                                zh: '便利店'
                            }
                        });
                    }

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

updatePageAdresses();

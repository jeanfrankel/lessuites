import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

// Configuration Sanity
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const updates = [
    {
        key: 'asselin',
        description: "Doté d’une entrée indépendante, cet appartement climatisé comprend 1 salon et 3 chambres séparées. Les 2 salles de bains sont pourvues d’une douche à l'italienne ainsi que d’une baignoire. La cuisine bien équipée est munie de plaques de cuisson, d’un réfrigérateur, d’un lave-vaisselle et d’ustensiles. Offrant une vue sur la ville, ce grand appartement insonorisé dispose d’un lave-linge, d’un plateau/bouilloire et d'une télévision à écran plat avec services de streaming. Ce logement comporte 8 lits.",
        surface: 115,
        bedrooms: 3
    },
    {
        key: 'baudelaire',
        description: "Cet appartement climatisé comprend une entrée privée, 1 salon, 3 chambres séparées, ainsi que 2 salles de bains avec baignoire et douche. La cuisine bien équipée est pourvue de plaques de cuisson, d'un réfrigérateur, d'un lave-vaisselle et d'ustensiles. Offrant une vue sur la ville, ce spacieux appartement insonorisé dispose d'un lave-linge, d'un plateau/bouilloire et d'une télévision à écran plat avec des services de streaming. Ce logement comprend 8 lits.",
        surface: 115,
        bedrooms: 3
    },
    {
        key: 'schubert',
        description: "Bénéficiant d’une entrée indépendante, cet appartement climatisé comprend 1 salon et 3 chambres séparées. Les 2 salles de bains sont pourvues d’une douche à l'italienne ainsi que d’une baignoire. La cuisine bien équipée est dotée de plaques de cuisson, d’un réfrigérateur, d’un lave-vaisselle et d’ustensiles de cuisine. Offrant une vue sur la ville, ce grand appartement insonorisé dispose d'une télévision à écran plat avec services de streaming, d'un lave-linge et d'un plateau/bouilloire. Ce logement compte 8 lits.",
        surface: 115,
        bedrooms: 3
    }
];

async function updateSuiteDescriptions() {
    console.log('🚀 Updating suite descriptions...');

    const page = await client.fetch('*[_id == "pageAppartements"][0]');
    if (!page || !page.suites) {
        console.error('❌ Page Appartements not found or has no suites.');
        return;
    }

    const updatedSuites = page.suites.map((suite: any) => {
        // Detect suite by checking if title.fr contains string
        const title = (suite.title?.fr || '').toLowerCase();

        // Find matching update
        const update = updates.find(u => title.includes(u.key));

        if (update) {
            console.log(`✅ Updating suite: ${suite.title.fr}`);
            return {
                ...suite,
                description: {
                    ...suite.description,
                    fr: update.description
                },
                surface: update.surface,
                bedrooms: update.bedrooms,
            };
        }

        return suite;
    });

    try {
        await client
            .patch('pageAppartements')
            .set({ suites: updatedSuites })
            .commit();
        console.log('✅ Successfully updated suite descriptions in pageAppartements.');
    } catch (error) {
        console.error('❌ Error updating document:', error);
    }
}

updateSuiteDescriptions();

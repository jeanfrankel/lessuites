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

async function updatePageExtras() {
    console.log('🚀 Updating Page Extras (Services section)...');

    const newServices = [
        {
            _key: 'custom-service',
            icon: 'concierge', // Using concierge icon as it fits "at your disposal"
            title: {
                fr: 'Un service sur mesure',
                en: 'Tailored Service',
                de: 'Maßgeschneiderter Service',
                zh: '定制服务'
            },
            description: {
                fr: 'Nous sommes à votre disposition pour d\'autres demandes.',
                en: 'We are at your disposal for any other requests.',
                de: 'Wir stehen Ihnen für weitere Anfragen gerne zur Verfügung.',
                zh: '我们要为您处置的其他要求。'
            }
        }
    ];

    try {
        await client
            .patch('pageExtras')
            .set({ services: newServices })
            .commit();
        console.log('✅ Page Extras updated successfully!');
    } catch (error) {
        console.error('❌ Error updating Page Extras:', error);
    }
}

updatePageExtras();

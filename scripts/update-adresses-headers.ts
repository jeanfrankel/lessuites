import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token: process.env.SANITY_API_TOKEN!,
    apiVersion: '2024-01-01',
    useCdn: false,
})

async function updateAdressesHeader() {
    console.log('🚀 Updating Page Adresses Headers...');

    // 1. Update the Main Header (Top of page - Generic)
    const newMainHeader = {
        title: {
            fr: "Découvrez Colmar",
            en: "Discover Colmar",
            de: "Entdecken Sie Colmar",
            zh: "探索科尔马"
        },
        subtitle: {
            fr: "Que faire & Que voir",
            en: "What to do & What to see",
            de: "Was tun & Was sehen",
            zh: "做什么 & 看什么"
        }
    };

    // 2. Update the Addresses Section Header (Before the list)
    const newSectionHeader = {
        title: {
            fr: "Bonnes Adresses",
            en: "Good Addresses",
            de: "Gute Adressen",
            zh: "好去处"
        },
        subtitle: {
            fr: "Nos coups de cœur à Colmar",
            en: "Our favorites in Colmar",
            de: "Unsere Favoriten in Colmar",
            zh: "我们在科尔马的最爱"
        }
    };

    try {
        await client
            .patch('pageAdresses')
            .set({
                header: newMainHeader,
                addressesSectionHeader: newSectionHeader
            })
            .commit();
        console.log('✅ Page Adresses Headers updated successfully!');
    } catch (error) {
        console.error('❌ Error updating Page Adresses Headers:', error);
    }
}

updateAdressesHeader();

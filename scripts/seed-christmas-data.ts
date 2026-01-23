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

async function updatePageAdresses() {
    console.log('🚀 Updating Page Adresses (Christmas section)...');

    const christmasSection = {
        isActive: true,
        title: {
            fr: 'La Magie de Noël à Colmar',
            en: 'Christmas Magic in Colmar',
            de: 'Weihnachtszauber in Colmar',
            zh: '科尔马的圣诞魔力'
        },
        text: {
            fr: "Plongez dans l'ambiance féérique des marchés de Noël de Colmar. Découvrez les illuminations, les décorations traditionnelles et les spécialités alsaciennes qui font la renommée de notre ville en fin d'année. Un moment inoubliable à partager en famille ou entre amis.",
            en: "Immerse yourself in the magical atmosphere of Colmar's Christmas markets. Discover the illuminations, traditional decorations, and Alsatian specialties that make our city famous during the holiday season. An unforgettable moment to share with family or friends.",
            de: "Tauchen Sie ein in die zauberhafte Atmosphäre der Colmarer Weihnachtsmärkte. Entdecken Sie die Beleuchtungen, traditionellen Dekorationen und elsässischen Spezialitäten, die unsere Stadt zum Jahresende berühmt machen. Ein unvergesslicher Moment mit Familie oder Freunden.",
            zh: "沉浸在科尔马圣诞市场的神奇氛围中。探索灯光、传统装饰和阿尔萨斯特色美食，让我们的城市在节日期间闻名遐迩。与家人或朋友分享的难忘时刻。"
        },
        link: 'https://www.noel-colmar.com/fr/',
        gallery: [] // To be filled by user
    };

    try {
        await client
            .patch('pageAdresses')
            .set({ christmasSection: christmasSection })
            .commit();
        console.log('✅ Page Adresses (Christmas Section) updated successfully!');
    } catch (error) {
        console.error('❌ Error updating Page Adresses:', error);
    }
}

updatePageAdresses();

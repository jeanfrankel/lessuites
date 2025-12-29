import { createClient } from '@sanity/client';
import { bonnesAdresses } from '../src/data/content';
import { bonnesAdressesEn } from '../src/data/content-en';
import { bonnesAdressesDe } from '../src/data/content-de';
import { bonnesAdressesZh } from '../src/data/content-zh';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Mapping des catégories vers les icônes
const categoryIconMap: { [key: string]: string } = {
  'Restaurants': 'restaurant',
  '餐厅': 'restaurant',
  'Bars': 'bar',
  '酒吧': 'bar',
  'Spécialités': 'specialty',
  'Specialties': 'specialty',
  'Spezialitäten': 'specialty',
  '特色店': 'specialty',
  'Shopping': 'shopping',
  '购物': 'shopping',
  'Utile et pratique': 'practical',
  'Useful & Practical': 'practical',
  'Nützlich & Praktisch': 'practical',
  '实用信息': 'practical',
};

async function migrateAdresses() {
  console.log('🚀 Début de la migration de la page Adresses...');

  // Créer un mapping pour combiner les 4 langues
  const combinedCategories = bonnesAdresses.map((catFr, index) => {
    const catEn = bonnesAdressesEn[index];
    const catDe = bonnesAdressesDe[index];
    const catZh = bonnesAdressesZh[index];

    return {
      icon: categoryIconMap[catFr.category] || 'specialty',
      categoryName: {
        fr: catFr.category,
        en: catEn?.category || catFr.category,
        de: catDe?.category || catFr.category,
        zh: catZh?.category || catFr.category,
      },
      items: catFr.items.map((itemFr, itemIndex) => {
        const itemEn = catEn?.items[itemIndex];
        const itemDe = catDe?.items[itemIndex];
        const itemZh = catZh?.items[itemIndex];

        return {
          name: itemFr.name,
          type: itemFr.type ? {
            fr: itemFr.type,
            en: itemEn?.type || itemFr.type,
            de: itemDe?.type || itemFr.type,
            zh: itemZh?.type || itemFr.type,
          } : undefined,
          description: {
            fr: itemFr.desc,
            en: itemEn?.desc || itemFr.desc,
            de: itemDe?.desc || itemFr.desc,
            zh: itemZh?.desc || itemFr.desc,
          },
          link: itemFr.link || undefined,
        };
      }),
    };
  });

  const document = {
    _id: 'pageAdresses',
    _type: 'pageAdresses',
    header: {
      title: {
        fr: 'Bonnes Adresses',
        en: 'Good Addresses',
        de: 'Gute Adressen',
        zh: '推荐地址',
      },
      subtitle: {
        fr: 'Nos coups de cœur à Colmar',
        en: 'Our favorites in Colmar',
        de: 'Unsere Favoriten in Colmar',
        zh: '我们在科尔马的最爱',
      },
    },
    categories: combinedCategories,
  };

  try {
    const result = await client.createOrReplace(document);
    console.log('✅ Page Adresses migrée avec succès!');
    console.log(`📄 Document ID: ${result._id}`);
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  }
}

migrateAdresses()
  .then(() => {
    console.log('🎉 Migration terminée!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Échec de la migration:', error);
    process.exit(1);
  });

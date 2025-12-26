import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function migratePageAppartements() {
  console.log('📄 Migration de Page Appartements...');

  const doc = {
    _id: 'pageAppartements',
    _type: 'pageAppartements',
    header: {
      title: {
        fr: 'Nos Appartements',
        en: 'Our Apartments',
        de: 'Unsere Wohnungen',
        zh: '我们的公寓',
      },
      subtitle: {
        fr: 'DÉCOUVREZ NOS SUITES',
        en: 'DISCOVER OUR SUITES',
        de: 'ENTDECKEN SIE UNSERE SUITEN',
        zh: '探索我们的套房',
      },
    },
    intro: {
      fr: 'Chaque suite a été pensée pour offrir confort, élégance et authenticité. Des équipements modernes dans un cadre historique unique.',
      en: 'Each suite has been designed to offer comfort, elegance and authenticity. Modern amenities in a unique historic setting.',
      de: 'Jede Suite wurde entworfen, um Komfort, Eleganz und Authentizität zu bieten. Moderne Ausstattung in einem einzigartigen historischen Rahmen.',
      zh: '每个套房都经过精心设计，提供舒适、优雅和真实性。在独特的历史环境中享受现代设施。',
    },
    suites: [
      {
        title: {
          fr: 'La Suite Baudelaire',
          en: 'The Baudelaire Suite',
          de: 'Die Baudelaire Suite',
          zh: '波德莱尔套房',
        },
        slug: 'baudelaire',
        description: {
          fr: 'Située au 2ème étage, cette suite de 65m² offre une vue imprenable sur les toits de la vieille ville. Avec ses poutres apparentes et sa décoration soignée, elle est idéale pour les couples ou les petites familles.',
          en: 'Located on the 2nd floor, this 65m² suite offers stunning views of the old town rooftops. With its exposed beams and refined decoration, it is ideal for couples or small families.',
          de: 'Diese 65 m² große Suite im 2. Stock bietet einen atemberaubenden Blick auf die Dächer der Altstadt. Mit ihren sichtbaren Balken und der gepflegten Dekoration ist sie ideal für Paare oder kleine Familien.',
          zh: '位于二楼，这间65平方米的套房可欣赏到老城区屋顶的壮丽景色。拥有外露横梁和精致的装饰，非常适合情侣或小家庭。',
        },
        capacity: 4,
        surface: 65,
        bedrooms: 1,
        price: 'À partir de 150€/nuit',
      },
      {
        title: {
          fr: 'La Suite Schubert',
          en: 'The Schubert Suite',
          de: 'Die Schubert Suite',
          zh: '舒伯特套房',
        },
        slug: 'schubert',
        description: {
          fr: 'Un hommage à la musique pour cet appartement de 75m² au 2ème étage. Spacieux et lumineux, il dispose d\'un grand salon insonorisé parfait pour se détendre après une journée de visites.',
          en: 'A tribute to music for this 75m² apartment on the 2nd floor. Spacious and bright, it has a large soundproofed living room perfect for relaxing after a day of sightseeing.',
          de: 'Eine Hommage an die Musik für diese 75 m² große Wohnung im 2. Stock. Geräumig und hell, verfügt sie über ein großes schallisoliertes Wohnzimmer, perfekt zum Entspannen nach einem Tag voller Besichtigungen.',
          zh: '这间位于二楼的75平方米公寓是对音乐的致敬。宽敞明亮，拥有一个大型隔音客厅，非常适合在游览一天后放松身心。',
        },
        capacity: 6,
        surface: 75,
        bedrooms: 2,
        price: 'À partir de 180€/nuit',
      },
      {
        title: {
          fr: 'La Suite Asselin',
          en: 'The Asselin Suite',
          de: 'Die Asselin Suite',
          zh: '阿瑟林套房',
        },
        slug: 'asselin',
        description: {
          fr: 'Notre plus grand appartement (115 m²) situé au 1er étage. Pensé pour les tribus, il allie le charme de l\'ancien alsacien avec un confort moderne absolu. Idéal pour les repas en famille.',
          en: 'Our largest apartment (115 m²) located on the 1st floor. Designed for families, it combines the charm of old Alsace with absolute modern comfort. Ideal for family meals.',
          de: 'Unsere größte Wohnung (115 m²) im 1. Stock. Für Familien konzipiert, verbindet sie den Charme des alten Elsass mit absolutem modernem Komfort. Ideal für Familienessen.',
          zh: '我们最大的公寓（115平方米）位于一楼。专为家庭设计，将古老阿尔萨斯的魅力与绝对的现代舒适相结合。非常适合家庭聚餐。',
        },
        capacity: 10,
        surface: 115,
        bedrooms: 3,
        price: 'À partir de 250€/nuit',
      },
    ],
  };

  try {
    await client.createOrReplace(doc);
    console.log('✅ Page Appartements migrée avec les 3 suites !');
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

async function migrateAll() {
  console.log('🚀 Démarrage de la migration...\n');

  await migratePageAppartements();

  console.log('\n✅ Migration terminée !');
}

migrateAll();

import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { bonnesAdresses } from '../src/data/content';
import { bonnesAdressesEn } from '../src/data/content-en';
import { bonnesAdressesDe } from '../src/data/content-de';
import { bonnesAdressesZh } from '../src/data/content-zh';
import { siteConfig } from '../src/data/content';

// Charger les variables d'environnement
config({ path: '.env.local' });

// Fonction pour générer une clé unique
function generateKey(prefix: string, index: number): string {
  return `${prefix}-${index}-${Date.now()}`;
}

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

async function migrateAll() {
  console.log('🚀 Début de la migration de toutes les pages...\n');

  // 1. Migration de la page Adresses
  console.log('📍 Migration de la page Adresses...');
  const combinedCategories = bonnesAdresses.map((catFr, index) => {
    const catEn = bonnesAdressesEn[index];
    const catDe = bonnesAdressesDe[index];
    const catZh = bonnesAdressesZh[index];

    return {
      _key: generateKey('category', index),
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
          _key: generateKey(`item-${index}`, itemIndex),
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

  const adressesDoc = {
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
    await client.createOrReplace(adressesDoc);
    console.log('✅ Page Adresses migrée avec succès!\n');
  } catch (error) {
    console.error('❌ Erreur lors de la migration de la page Adresses:', error);
    throw error;
  }

  // 2. Migration de la page Extras
  console.log('✨ Migration de la page Extras...');
  const extrasDoc = {
    _id: 'pageExtras',
    _type: 'pageExtras',
    header: {
      title: {
        fr: 'Extras & Services',
        en: 'Extras & Services',
        de: 'Extras & Services',
        zh: '附加服务',
      },
      subtitle: {
        fr: 'Améliorez votre séjour avec nos options sur mesure',
        en: 'Enhance your stay with our tailored options',
        de: 'Verbessern Sie Ihren Aufenthalt mit unseren maßgeschneiderten Optionen',
        zh: '通过我们的定制选项提升您的住宿体验',
      },
    },
    extras: [
      {
        _key: 'extra-breakfast',
        icon: 'coffee',
        title: {
          fr: 'Petit-déjeuner',
          en: 'Breakfast',
          de: 'Frühstück',
          zh: '早餐',
        },
        description: {
          fr: 'Commencez votre journée avec un délicieux petit-déjeuner alsacien, préparé avec des produits locaux et de saison.',
          en: 'Start your day with a delicious Alsatian breakfast, prepared with local and seasonal products.',
          de: 'Beginnen Sie Ihren Tag mit einem köstlichen elsässischen Frühstück, zubereitet mit lokalen und saisonalen Produkten.',
          zh: '以美味的阿尔萨斯早餐开始您的一天，使用当地和时令产品准备。',
        },
        price: {
          fr: '15€ par personne',
          en: '€15 per person',
          de: '15€ pro Person',
          zh: '每人15欧元',
        },
        items: {
          fr: 'Viennoiseries fraîches, pain artisanal, confitures maison, fromages locaux, charcuterie alsacienne, jus de fruits frais, café et thé',
          en: 'Fresh pastries, artisan bread, homemade jams, local cheeses, Alsatian cold cuts, fresh fruit juices, coffee and tea',
          de: 'Frisches Gebäck, handwerkliches Brot, hausgemachte Marmeladen, lokale Käse, elsässische Wurstwaren, frische Fruchtsäfte, Kaffee und Tee',
          zh: '新鲜糕点、手工面包、自制果酱、当地奶酪、阿尔萨斯冷切肉、鲜榨果汁、咖啡和茶',
        },
      },
      {
        _key: 'extra-drinks',
        icon: 'wine',
        title: {
          fr: 'Boissons & Vins d\'Alsace',
          en: 'Drinks & Alsace Wines',
          de: 'Getränke & Elsässer Weine',
          zh: '饮料与阿尔萨斯葡萄酒',
        },
        description: {
          fr: 'Découvrez notre sélection de vins d\'Alsace et boissons artisanales à déguster dans votre suite.',
          en: 'Discover our selection of Alsace wines and artisanal beverages to enjoy in your suite.',
          de: 'Entdecken Sie unsere Auswahl an elsässischen Weinen und handwerklichen Getränken zum Genießen in Ihrer Suite.',
          zh: '探索我们精选的阿尔萨斯葡萄酒和手工饮料，在您的套房中享用。',
        },
        items: {
          fr: 'Sélection de vins blancs (Riesling, Gewurztraminer, Pinot Gris) • Crémant d\'Alsace • Boissons fraîches et eau minérale',
          en: 'Selection of white wines (Riesling, Gewurztraminer, Pinot Gris) • Crémant d\'Alsace • Soft drinks and mineral water',
          de: 'Auswahl an Weißweinen (Riesling, Gewürztraminer, Pinot Gris) • Crémant d\'Alsace • Erfrischungsgetränke und Mineralwasser',
          zh: '白葡萄酒精选（雷司令、琼瑶浆、灰皮诺）• 阿尔萨斯起泡酒 • 软饮料和矿泉水',
        },
      },
    ],
    services: [
      {
        _key: 'service-concierge',
        icon: 'concierge',
        title: {
          fr: 'Service de conciergerie',
          en: 'Concierge service',
          de: 'Concierge-Service',
          zh: '礼宾服务',
        },
        description: {
          fr: 'Réservations de restaurants, billets de spectacles, conseils personnalisés',
          en: 'Restaurant reservations, show tickets, personalized advice',
          de: 'Restaurantreservierungen, Showtickets, persönliche Beratung',
          zh: '餐厅预订、演出门票、个性化建议',
        },
      },
      {
        _key: 'service-cleaning',
        icon: 'cleaning',
        title: {
          fr: 'Ménage supplémentaire',
          en: 'Additional cleaning',
          de: 'Zusätzliche Reinigung',
          zh: '额外清洁',
        },
        description: {
          fr: 'Service de ménage quotidien sur demande',
          en: 'Daily housekeeping service on request',
          de: 'Täglicher Reinigungsservice auf Anfrage',
          zh: '应要求提供每日客房清洁服务',
        },
      },
      {
        _key: 'service-transfer',
        icon: 'car',
        title: {
          fr: 'Transfert gare/aéroport',
          en: 'Station/Airport transfer',
          de: 'Bahnhof/Flughafen Transfer',
          zh: '车站/机场接送',
        },
        description: {
          fr: 'Service de navette depuis la gare de Colmar ou l\'aéroport',
          en: 'Shuttle service from Colmar station or airport',
          de: 'Shuttle-Service vom Bahnhof Colmar oder Flughafen',
          zh: '从科尔马火车站或机场提供班车服务',
        },
      },
    ],
    contactCta: {
      title: {
        fr: 'Réserver vos extras',
        en: 'Book your extras',
        de: 'Ihre Extras buchen',
        zh: '预订您的附加服务',
      },
      text: {
        fr: 'Pour réserver ces services, contactez-nous directement par email ou téléphone lors de votre réservation.',
        en: 'To book these services, contact us directly by email or phone when making your reservation.',
        de: 'Um diese Dienstleistungen zu buchen, kontaktieren Sie uns bitte direkt per E-Mail oder Telefon bei Ihrer Reservierung.',
        zh: '要预订这些服务，请在预订时直接通过电子邮件或电话联系我们。',
      },
    },
  };

  try {
    await client.createOrReplace(extrasDoc);
    console.log('✅ Page Extras migrée avec succès!\n');
  } catch (error) {
    console.error('❌ Erreur lors de la migration de la page Extras:', error);
    throw error;
  }

  // 3. Migration de la page Infos
  console.log('ℹ️  Migration de la page Infos...');
  const infosDoc = {
    _id: 'pageInfos',
    _type: 'pageInfos',
    header: {
      title: {
        fr: 'Infos & Accès',
        en: 'Info & Access',
        de: 'Info & Zugang',
        zh: '信息与访问',
      },
      subtitle: {
        fr: 'Toutes les informations pratiques',
        en: 'All practical information',
        de: 'Alle praktischen Informationen',
        zh: '所有实用信息',
      },
    },
    contact: {
      sectionTitle: {
        fr: 'Nous contacter',
        en: 'Contact us',
        de: 'Kontaktieren Sie uns',
        zh: '联系我们',
      },
      phone: siteConfig.contact.phone,
      mobile: siteConfig.contact.mobile,
      emailClient: siteConfig.contact.emailClient,
      emailAdmin: siteConfig.contact.emailAdmin,
      address: siteConfig.contact.address,
    },
    schedule: {
      checkIn: {
        time: 'À partir de 17h',
        label: {
          fr: 'Check-in',
          en: 'Check-in',
          de: 'Check-in',
          zh: '入住',
        },
      },
      checkOut: {
        time: 'Jusqu\'à 12h',
        label: {
          fr: 'Check-out',
          en: 'Check-out',
          de: 'Check-out',
          zh: '退房',
        },
      },
    },
    accessNotes: [
      {
        _key: 'access-note-1',
        text: {
          fr: 'Les suites sont au n° 20, mais l\'entrée se fait par le 22 (juste à droite de la pharmacie)',
          en: 'The suites are at n° 20, but the entrance is through 22 (just to the right of the pharmacy)',
          de: 'Die Suiten befinden sich in der Nr. 20, aber der Eingang ist durch die Nr. 22 (direkt rechts von der Apotheke)',
          zh: '套房位于20号，但入口在22号（就在药房右边）',
        },
      },
      {
        _key: 'access-note-2',
        text: {
          fr: 'La zone est piétonne',
          en: 'The area is pedestrian',
          de: 'Die Gegend ist eine Fußgängerzone',
          zh: '该区域为步行区',
        },
      },
      {
        _key: 'access-note-3',
        text: {
          fr: 'Situé à seulement 1 km de la gare de Colmar',
          en: 'Located only 1 km from Colmar train station',
          de: 'Nur 1 km vom Bahnhof Colmar entfernt',
          zh: '距离科尔马火车站仅1公里',
        },
      },
    ],
  };

  try {
    await client.createOrReplace(infosDoc);
    console.log('✅ Page Infos migrée avec succès!\n');
  } catch (error) {
    console.error('❌ Erreur lors de la migration de la page Infos:', error);
    throw error;
  }

  console.log('🎉 Toutes les pages ont été migrées avec succès!');
}

migrateAll()
  .then(() => {
    console.log('\n✨ Migration complète terminée!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Échec de la migration:', error);
    process.exit(1);
  });

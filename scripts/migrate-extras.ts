import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function migrateExtras() {
  console.log('🚀 Début de la migration de la page Extras...');

  const document = {
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
    const result = await client.createOrReplace(document);
    console.log('✅ Page Extras migrée avec succès!');
    console.log(`📄 Document ID: ${result._id}`);
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  }
}

migrateExtras()
  .then(() => {
    console.log('🎉 Migration terminée!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Échec de la migration:', error);
    process.exit(1);
  });

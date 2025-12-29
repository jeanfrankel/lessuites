import { createClient } from '@sanity/client';
import { siteConfig } from '../src/data/content';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function migrateInfos() {
  console.log('🚀 Début de la migration de la page Infos...');

  const document = {
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
        text: {
          fr: 'Les suites sont au n° 20, mais l\'entrée se fait par le 22 (juste à droite de la pharmacie)',
          en: 'The suites are at n° 20, but the entrance is through 22 (just to the right of the pharmacy)',
          de: 'Die Suiten befinden sich in der Nr. 20, aber der Eingang ist durch die Nr. 22 (direkt rechts von der Apotheke)',
          zh: '套房位于20号，但入口在22号（就在药房右边）',
        },
      },
      {
        text: {
          fr: 'La zone est piétonne',
          en: 'The area is pedestrian',
          de: 'Die Gegend ist eine Fußgängerzone',
          zh: '该区域为步行区',
        },
      },
      {
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
    const result = await client.createOrReplace(document);
    console.log('✅ Page Infos migrée avec succès!');
    console.log(`📄 Document ID: ${result._id}`);
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  }
}

migrateInfos()
  .then(() => {
    console.log('🎉 Migration terminée!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Échec de la migration:', error);
    process.exit(1);
  });

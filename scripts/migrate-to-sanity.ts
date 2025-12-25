import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
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

console.log('🔧 Configuration Sanity:')
console.log('  Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('  Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('  Token présent:', !!process.env.SANITY_API_TOKEN)
console.log('')

// Charger les traductions
const loadTranslations = () => {
  const fr = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/translations/fr.json'), 'utf-8'))
  const en = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/translations/en.json'), 'utf-8'))
  const de = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/translations/de.json'), 'utf-8'))
  const zh = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/translations/zh.json'), 'utf-8'))

  return { fr, en, de, zh }
}

async function migratePageHome() {
  const translations = loadTranslations()

  const pageHome = {
    _id: 'pageHome',
    _type: 'pageHome',
    hero: {
      location: {
        fr: translations.fr.home.location,
        en: translations.en.home.location,
        de: translations.de.home.location,
        zh: translations.zh.home.location,
      },
      title: {
        fr: translations.fr.home.title,
        en: translations.en.home.title,
        de: translations.de.home.title,
        zh: translations.zh.home.title,
      },
      subtitle: {
        fr: translations.fr.home.subtitle,
        en: translations.en.home.subtitle,
        de: translations.de.home.subtitle,
        zh: translations.zh.home.subtitle,
      },
      cta: {
        fr: translations.fr.home.cta,
        en: translations.en.home.cta,
        de: translations.de.home.cta,
        zh: translations.zh.home.cta,
      },
    },
    colmarSection: {
      title: {
        fr: translations.fr.home.locationTitle,
        en: translations.en.home.locationTitle,
        de: translations.de.home.locationTitle,
        zh: translations.zh.home.locationTitle,
      },
      subtitle: {
        fr: translations.fr.home.locationSubtitle,
        en: translations.en.home.locationSubtitle,
        de: translations.de.home.locationSubtitle,
        zh: translations.zh.home.locationSubtitle,
      },
      caption: {
        fr: translations.fr.home.locationCaption,
        en: translations.en.home.locationCaption,
        de: translations.de.home.locationCaption,
        zh: translations.zh.home.locationCaption,
      },
      gallery: [] // Les images devront être uploadées manuellement
    },
    philosophySection: {
      label: {
        fr: translations.fr.home.philosophyLabel,
        en: translations.en.home.philosophyLabel,
        de: translations.de.home.philosophyLabel,
        zh: translations.zh.home.philosophyLabel,
      },
      title: {
        fr: translations.fr.home.philosophyTitle,
        en: translations.en.home.philosophyTitle,
        de: translations.de.home.philosophyTitle,
        zh: translations.zh.home.philosophyTitle,
      },
      text: {
        fr: translations.fr.home.philosophyText,
        en: translations.en.home.philosophyText,
        de: translations.de.home.philosophyText,
        zh: translations.zh.home.philosophyText,
      },
      link: {
        fr: translations.fr.home.philosophyLink,
        en: translations.en.home.philosophyLink,
        de: translations.de.home.philosophyLink,
        zh: translations.zh.home.philosophyLink,
      },
    },
    suitesSection: {
      title: {
        fr: translations.fr.home.suitesTitle,
        en: translations.en.home.suitesTitle,
        de: translations.de.home.suitesTitle,
        zh: translations.zh.home.suitesTitle,
      },
      text: {
        fr: translations.fr.home.suitesText,
        en: translations.en.home.suitesText,
        de: translations.de.home.suitesText,
        zh: translations.zh.home.suitesText,
      },
      link: {
        fr: translations.fr.home.suitesLink,
        en: translations.en.home.suitesLink,
        de: translations.de.home.suitesLink,
        zh: translations.zh.home.suitesLink,
      },
    },
    ctaSection: {
      text: {
        fr: translations.fr.home.ctaReservation,
        en: translations.en.home.ctaReservation,
        de: translations.de.home.ctaReservation,
        zh: translations.zh.home.ctaReservation,
      },
      button: {
        fr: translations.fr.home.ctaButton,
        en: translations.en.home.ctaButton,
        de: translations.de.home.ctaButton,
        zh: translations.zh.home.ctaButton,
      },
    },
    mapSection: {
      label: {
        fr: translations.fr.home.mapLabel,
        en: translations.en.home.mapLabel,
        de: translations.de.home.mapLabel,
        zh: translations.zh.home.mapLabel,
      },
      title: {
        fr: translations.fr.home.mapTitle,
        en: translations.en.home.mapTitle,
        de: translations.de.home.mapTitle,
        zh: translations.zh.home.mapTitle,
      },
      address: {
        fr: translations.fr.home.mapAddress,
        en: translations.en.home.mapAddress,
        de: translations.de.home.mapAddress,
        zh: translations.zh.home.mapAddress,
      },
      subtitle: {
        fr: translations.fr.home.mapSubtitle,
        en: translations.en.home.mapSubtitle,
        de: translations.de.home.mapSubtitle,
        zh: translations.zh.home.mapSubtitle,
      },
    },
  }

  try {
    await client.createOrReplace(pageHome)
    console.log('✅ Page d\'accueil migrée avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de la migration de la page d\'accueil:', error)
  }
}

async function migratePageInfos() {
  const translations = loadTranslations()

  const pageInfos = {
    _id: 'pageInfos',
    _type: 'pageInfos',
    header: {
      title: {
        fr: translations.fr.info.title,
        en: translations.en.info.title,
        de: translations.de.info.title,
        zh: translations.zh.info.title,
      },
      subtitle: {
        fr: translations.fr.info.subtitle,
        en: translations.en.info.subtitle,
        de: translations.de.info.subtitle,
        zh: translations.zh.info.subtitle,
      },
    },
    contact: {
      sectionTitle: {
        fr: translations.fr.info.contactTitle,
        en: translations.en.info.contactTitle,
        de: translations.de.info.contactTitle,
        zh: translations.zh.info.contactTitle,
      },
      phone: '+33 (0)3 89 20 93 64',
      mobile: '+33 (0)6 45 32 18 61',
      emailClient: 'staff@lessuitesducygne.fr',
      emailAdmin: 'admin@lessuitesducygne.fr',
      address: '20-22 Rue des Boulangers, 68000 Colmar, France',
    },
    schedule: {
      checkIn: {
        time: 'À partir de 17h',
        label: {
          fr: translations.fr.info.checkinTitle,
          en: translations.en.info.checkinTitle,
          de: translations.de.info.checkinTitle,
          zh: translations.zh.info.checkinTitle,
        },
      },
      checkOut: {
        time: 'Jusqu\'à 12h',
        label: {
          fr: translations.fr.info.checkoutTitle,
          en: translations.en.info.checkoutTitle,
          de: translations.de.info.checkoutTitle,
          zh: translations.zh.info.checkoutTitle,
        },
      },
    },
    accessNotes: [
      {
        text: {
          fr: translations.fr.info.addressNote1 + ' ' + translations.fr.info.addressNote1Bold + ' ' + translations.fr.info.addressNote1End,
          en: translations.en.info.addressNote1 + ' ' + translations.en.info.addressNote1Bold + ' ' + translations.en.info.addressNote1End,
          de: translations.de.info.addressNote1 + ' ' + translations.de.info.addressNote1Bold + ' ' + translations.de.info.addressNote1End,
          zh: translations.zh.info.addressNote1 + ' ' + translations.zh.info.addressNote1Bold + ' ' + translations.zh.info.addressNote1End,
        },
      },
      {
        text: {
          fr: translations.fr.info.addressNote2,
          en: translations.en.info.addressNote2,
          de: translations.de.info.addressNote2,
          zh: translations.zh.info.addressNote2,
        },
      },
      {
        text: {
          fr: translations.fr.info.addressNote3,
          en: translations.en.info.addressNote3,
          de: translations.de.info.addressNote3,
          zh: translations.zh.info.addressNote3,
        },
      },
    ],
  }

  try {
    await client.createOrReplace(pageInfos)
    console.log('✅ Page Informations migrée avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de la migration de la page Informations:', error)
  }
}

async function migratePageExtras() {
  const translations = loadTranslations()

  const pageExtras = {
    _id: 'pageExtras',
    _type: 'pageExtras',
    header: {
      title: {
        fr: translations.fr.extras.title,
        en: translations.en.extras.title,
        de: translations.de.extras.title,
        zh: translations.zh.extras.title,
      },
      subtitle: {
        fr: translations.fr.extras.subtitle,
        en: translations.en.extras.subtitle,
        de: translations.de.extras.subtitle,
        zh: translations.zh.extras.subtitle,
      },
    },
    extras: [
      {
        icon: 'coffee',
        title: {
          fr: translations.fr.extras.breakfastTitle,
          en: translations.en.extras.breakfastTitle,
          de: translations.de.extras.breakfastTitle,
          zh: translations.zh.extras.breakfastTitle,
        },
        description: {
          fr: translations.fr.extras.breakfastDesc,
          en: translations.en.extras.breakfastDesc,
          de: translations.de.extras.breakfastDesc,
          zh: translations.zh.extras.breakfastDesc,
        },
        price: {
          fr: translations.fr.extras.breakfastPrice,
          en: translations.en.extras.breakfastPrice,
          de: translations.de.extras.breakfastPrice,
          zh: translations.zh.extras.breakfastPrice,
        },
        items: {
          fr: translations.fr.extras.breakfastItems,
          en: translations.en.extras.breakfastItems,
          de: translations.de.extras.breakfastItems,
          zh: translations.zh.extras.breakfastItems,
        },
      },
      {
        icon: 'wine',
        title: {
          fr: translations.fr.extras.drinksTitle,
          en: translations.en.extras.drinksTitle,
          de: translations.de.extras.drinksTitle,
          zh: translations.zh.extras.drinksTitle,
        },
        description: {
          fr: translations.fr.extras.drinksDesc,
          en: translations.en.extras.drinksDesc,
          de: translations.de.extras.drinksDesc,
          zh: translations.zh.extras.drinksDesc,
        },
        items: {
          fr: `${translations.fr.extras.wineSelection} • ${translations.fr.extras.cremant} • ${translations.fr.extras.softDrinks}`,
          en: `${translations.en.extras.wineSelection} • ${translations.en.extras.cremant} • ${translations.en.extras.softDrinks}`,
          de: `${translations.de.extras.wineSelection} • ${translations.de.extras.cremant} • ${translations.de.extras.softDrinks}`,
          zh: `${translations.zh.extras.wineSelection} • ${translations.zh.extras.cremant} • ${translations.zh.extras.softDrinks}`,
        },
      },
    ],
    services: [
      {
        icon: 'concierge',
        title: {
          fr: translations.fr.extras.concierge,
          en: translations.en.extras.concierge,
          de: translations.de.extras.concierge,
          zh: translations.zh.extras.concierge,
        },
        description: {
          fr: translations.fr.extras.conciergeDesc,
          en: translations.en.extras.conciergeDesc,
          de: translations.de.extras.conciergeDesc,
          zh: translations.zh.extras.conciergeDesc,
        },
      },
      {
        icon: 'cleaning',
        title: {
          fr: translations.fr.extras.cleaning,
          en: translations.en.extras.cleaning,
          de: translations.de.extras.cleaning,
          zh: translations.zh.extras.cleaning,
        },
        description: {
          fr: translations.fr.extras.cleaningDesc,
          en: translations.en.extras.cleaningDesc,
          de: translations.de.extras.cleaningDesc,
          zh: translations.zh.extras.cleaningDesc,
        },
      },
      {
        icon: 'car',
        title: {
          fr: translations.fr.extras.transfer,
          en: translations.en.extras.transfer,
          de: translations.de.extras.transfer,
          zh: translations.zh.extras.transfer,
        },
        description: {
          fr: translations.fr.extras.transferDesc,
          en: translations.en.extras.transferDesc,
          de: translations.de.extras.transferDesc,
          zh: translations.zh.extras.transferDesc,
        },
      },
    ],
    contactCta: {
      title: {
        fr: translations.fr.extras.bookExtras,
        en: translations.en.extras.bookExtras,
        de: translations.de.extras.bookExtras,
        zh: translations.zh.extras.bookExtras,
      },
      text: {
        fr: translations.fr.extras.bookExtrasDesc,
        en: translations.en.extras.bookExtrasDesc,
        de: translations.de.extras.bookExtrasDesc,
        zh: translations.zh.extras.bookExtrasDesc,
      },
    },
  }

  try {
    await client.createOrReplace(pageExtras)
    console.log('✅ Page Extras migrée avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de la migration de la page Extras:', error)
  }
}

async function migratePageAppartements() {
  const translations = loadTranslations()

  const pageAppartements = {
    _id: 'pageAppartements',
    _type: 'pageAppartements',
    header: {
      title: {
        fr: translations.fr.apartments.title,
        en: translations.en.apartments.title,
        de: translations.de.apartments.title,
        zh: translations.zh.apartments.title,
      },
      subtitle: {
        fr: translations.fr.apartments.subtitle,
        en: translations.en.apartments.subtitle,
        de: translations.de.apartments.subtitle,
        zh: translations.zh.apartments.subtitle,
      },
    },
    intro: {
      fr: '', // À remplir manuellement si nécessaire
      en: '',
      de: '',
      zh: '',
    },
  }

  try {
    await client.createOrReplace(pageAppartements)
    console.log('✅ Page Appartements migrée avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de la migration de la page Appartements:', error)
  }
}

// Fonction principale
async function migrate() {
  console.log('🚀 Début de la migration vers Sanity...\n')

  await migratePageHome()
  await migratePageInfos()
  await migratePageExtras()
  await migratePageAppartements()
  // migratePageAdresses nécessite plus de données, à faire manuellement

  console.log('\n✅ Migration terminée!')
  console.log('\n📝 Prochaines étapes:')
  console.log('1. Allez sur http://localhost:3000/studio')
  console.log('2. Uploadez vos images dans les galeries')
  console.log('3. Complétez les contenus manquants')
  console.log('4. Créez vos suites dans "Suites & Appartements"')
}

migrate()

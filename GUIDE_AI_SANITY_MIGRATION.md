# Guide IA : Comment envoyer des données vers Sanity

## 🤖 Pour les assistants IA : Comment migrer des données vers Sanity

Ce guide explique comment écrire et exécuter un script de migration pour envoyer des données vers Sanity CMS.

---

## 📋 Prérequis

Avant d'envoyer des données, vérifier que :

1. **Le projet Sanity existe** :
   - Project ID : `5o0t2613`
   - Dataset : `production`

2. **Les variables d'environnement sont configurées** dans `.env.local` :
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=5o0t2613
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=sk5eJhmghLMpN4cgXfRN1vfJT90cPC... (token avec permissions Editor)
   ```

3. **Les schémas Sanity sont définis** dans `src/sanity/schemas/`

---

## 🏗️ Structure d'un script de migration

### Template de base

```typescript
import { config } from 'dotenv';
import { createClient } from '@sanity/client';

// 1. Charger les variables d'environnement
config({ path: '.env.local' });

// 2. Créer le client Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false, // Important : pas de cache pour les écritures
});

// 3. Fonction de migration
async function migrate() {
  try {
    // Créer le document
    const document = {
      _id: 'uniqueDocumentId',     // ID unique du document
      _type: 'schemaTypeName',     // Nom du schéma défini dans src/sanity/schemas/
      // ... vos données ici
    };

    // Envoyer vers Sanity
    await client.createOrReplace(document);

    console.log('✅ Migration réussie!');
  } catch (error) {
    console.error('❌ Erreur:', error);
    throw error;
  }
}

// 4. Exécuter la migration
migrate()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
```

---

## 🎯 Exemples concrets de migration

### Exemple 1 : Migrer une page simple

```typescript
import { config } from 'dotenv';
import { createClient } from '@sanity/client';

config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function migratePageInfos() {
  const document = {
    _id: 'pageInfos',              // ID fixe pour singleton
    _type: 'pageInfos',             // Correspond au schéma dans src/sanity/schemas/pages/pageInfos.ts

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
      phone: '+33 3 89 41 31 05',
      mobile: '+33 6 12 34 56 78',
      emailClient: 'contact@lessuitesducygne.com',
      address: '20 Rue des Clefs, 68000 Colmar, France',
    },
  };

  await client.createOrReplace(document);
  console.log('✅ Page Infos migrée!');
}

migratePageInfos()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Erreur:', error);
    process.exit(1);
  });
```

### Exemple 2 : Migrer une liste d'items avec clés uniques

```typescript
// Fonction helper pour générer des clés uniques
function generateKey(prefix: string, index: number): string {
  return `${prefix}-${index}-${Date.now()}`;
}

async function migratePageExtras() {
  const document = {
    _id: 'pageExtras',
    _type: 'pageExtras',

    extras: [
      {
        _key: generateKey('extra', 0),  // Clé unique requise pour les arrays
        icon: 'coffee',
        title: {
          fr: 'Petit-déjeuner',
          en: 'Breakfast',
          de: 'Frühstück',
          zh: '早餐',
        },
        description: {
          fr: 'Délicieux petit-déjeuner alsacien',
          en: 'Delicious Alsatian breakfast',
          de: 'Köstliches elsässisches Frühstück',
          zh: '美味的阿尔萨斯早餐',
        },
        price: {
          fr: '15€ par personne',
          en: '€15 per person',
          de: '15€ pro Person',
          zh: '每人15欧元',
        },
      },
      {
        _key: generateKey('extra', 1),
        icon: 'wine',
        title: {
          fr: 'Vins d\'Alsace',
          en: 'Alsace Wines',
          de: 'Elsässer Weine',
          zh: '阿尔萨斯葡萄酒',
        },
        description: {
          fr: 'Sélection de vins locaux',
          en: 'Selection of local wines',
          de: 'Auswahl lokaler Weine',
          zh: '当地葡萄酒精选',
        },
      },
    ],
  };

  await client.createOrReplace(document);
  console.log('✅ Page Extras migrée!');
}
```

### Exemple 3 : Migrer avec des données depuis des fichiers existants

```typescript
import { bonnesAdresses } from '../src/data/content';
import { bonnesAdressesEn } from '../src/data/content-en';

async function migratePageAdresses() {
  // Combiner les données de plusieurs langues
  const categories = bonnesAdresses.map((catFr, index) => {
    const catEn = bonnesAdressesEn[index];

    return {
      _key: generateKey('category', index),
      icon: 'restaurant', // ou autre icône selon la catégorie
      categoryName: {
        fr: catFr.category,
        en: catEn?.category || catFr.category,
      },
      items: catFr.items.map((itemFr, itemIndex) => {
        const itemEn = catEn?.items[itemIndex];

        return {
          _key: generateKey(`item-${index}`, itemIndex),
          name: itemFr.name,
          type: itemFr.type ? {
            fr: itemFr.type,
            en: itemEn?.type || itemFr.type,
          } : undefined,
          description: {
            fr: itemFr.desc,
            en: itemEn?.desc || itemFr.desc,
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
      },
    },
    categories: categories,
  };

  await client.createOrReplace(document);
  console.log('✅ Page Adresses migrée!');
}
```

---

## 🔑 Règles importantes

### 1. **_id : Identifiant unique**

```typescript
// ✅ BON - ID fixe pour un singleton (une seule instance)
_id: 'pageHome'

// ✅ BON - ID unique pour chaque élément d'une collection
_id: `suite-${suiteNumber}`

// ❌ MAUVAIS - Pas d'ID (Sanity en génère un aléatoire)
// Ne pas utiliser pour les pages principales
```

### 2. **_type : Doit correspondre au schéma**

```typescript
// Le _type doit exister dans src/sanity/schemas/index.ts
_type: 'pageHome'       // ✅ Défini dans pageHome.ts
_type: 'pageExtras'     // ✅ Défini dans pageExtras.ts
_type: 'unknownType'    // ❌ N'existe pas → Erreur
```

### 3. **_key : Obligatoire dans les arrays**

```typescript
// ✅ BON - Chaque élément d'un array a une _key unique
items: [
  { _key: 'item-0-123456', name: 'Item 1' },
  { _key: 'item-1-123456', name: 'Item 2' },
]

// ❌ MAUVAIS - Pas de _key dans un array
items: [
  { name: 'Item 1' },  // Erreur Sanity
]
```

### 4. **Structure multilingue**

```typescript
// ✅ BON - Objet avec les langues supportées
title: {
  fr: 'Titre français',
  en: 'English title',
  de: 'Deutscher Titel',
  zh: '中文标题',
}

// ❌ MAUVAIS - String simple (perd le multilingue)
title: 'Titre français'
```

---

## 📤 Méthodes d'écriture Sanity

### `createOrReplace()` - Recommandé

Crée le document s'il n'existe pas, ou le remplace complètement s'il existe.

```typescript
await client.createOrReplace({
  _id: 'pageHome',
  _type: 'pageHome',
  title: 'Nouveau titre',
});
```

**Utiliser quand :** Migration complète, mise à jour totale

### `create()` - Création uniquement

Crée un nouveau document. Erreur si l'ID existe déjà.

```typescript
await client.create({
  _type: 'suite',
  name: 'Suite Royale',
});
// Sanity génère un _id aléatoire si non fourni
```

**Utiliser quand :** Ajout de nouveaux éléments uniques

### `patch()` - Mise à jour partielle

Modifie seulement certains champs sans toucher aux autres.

```typescript
await client
  .patch('pageHome')
  .set({ 'header.title.fr': 'Nouveau titre FR' })
  .commit();
```

**Utiliser quand :** Modification d'un champ spécifique

### `delete()` - Suppression

```typescript
await client.delete('documentId');
```

---

## 🖼️ Upload d'images vers Sanity

### Méthode 1 : Via URL

```typescript
const document = {
  _id: 'pageHome',
  _type: 'pageHome',
  heroImage: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-abc123...'  // Référence à une image déjà uploadée
    },
    alt: 'Description de l\'image',
  },
};
```

### Méthode 2 : Upload depuis un fichier local

```typescript
import { createReadStream } from 'fs';

async function uploadImage(filePath: string) {
  const stream = createReadStream(filePath);

  const asset = await client.assets.upload('image', stream, {
    filename: 'hero-image.jpg',
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    alt: 'Hero image',
  };
}

// Utilisation
const heroImage = await uploadImage('./public/images/hero.jpg');

const document = {
  _id: 'pageHome',
  _type: 'pageHome',
  heroImage: heroImage,
};

await client.createOrReplace(document);
```

### Méthode 3 : Upload depuis une URL externe

```typescript
async function uploadImageFromUrl(imageUrl: string) {
  const asset = await client.assets.upload('image', imageUrl, {
    filename: 'downloaded-image.jpg',
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}
```

---

## 🚀 Exécution du script

### 1. Créer le fichier de script

```bash
# Créer dans le dossier scripts/
touch scripts/migrate-my-data.ts
```

### 2. Ajouter le script dans package.json

```json
{
  "scripts": {
    "migrate:mydata": "tsx scripts/migrate-my-data.ts"
  }
}
```

### 3. Exécuter

```bash
npm run migrate:mydata
```

**Sortie attendue :**
```
🚀 Début de la migration...
✅ Document créé avec succès!
✨ Migration terminée!
```

---

## 🧪 Tester avant la migration

### Vérifier la connexion

```typescript
async function testConnection() {
  try {
    const result = await client.fetch('*[_type == "pageHome"][0]');
    console.log('✅ Connexion OK:', result);
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
  }
}
```

### Mode dry-run (simulation)

```typescript
async function migrate(dryRun = false) {
  const document = { /* ... */ };

  if (dryRun) {
    console.log('Mode dry-run - Document à créer:', JSON.stringify(document, null, 2));
    return;
  }

  await client.createOrReplace(document);
}

// Tester sans écrire
migrate(true);
```

---

## ❌ Gestion des erreurs

### Template avec gestion d'erreurs complète

```typescript
async function migrateWithErrorHandling() {
  try {
    // Vérifier les variables d'environnement
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID manquant');
    }
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN manquant');
    }

    console.log('🚀 Début de la migration...');

    const document = {
      _id: 'pageHome',
      _type: 'pageHome',
      // ... données
    };

    await client.createOrReplace(document);

    console.log('✅ Migration réussie!');
    return true;

  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Erreur:', error.message);

      // Erreurs spécifiques
      if (error.message.includes('Unauthorized')) {
        console.error('→ Vérifier le token API');
      }
      if (error.message.includes('not found')) {
        console.error('→ Vérifier le schéma Sanity');
      }
    }

    throw error;
  }
}

migrateWithErrorHandling()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
```

---

## 📊 Migration de plusieurs documents

### En séquence

```typescript
async function migrateAll() {
  console.log('🚀 Migration de toutes les pages...\n');

  // 1. Page Home
  console.log('🏠 Migration Page Home...');
  await migratePageHome();
  console.log('✅ Page Home OK\n');

  // 2. Page Appartements
  console.log('🏨 Migration Page Appartements...');
  await migratePageAppartements();
  console.log('✅ Page Appartements OK\n');

  // 3. Page Infos
  console.log('ℹ️  Migration Page Infos...');
  await migratePageInfos();
  console.log('✅ Page Infos OK\n');

  console.log('🎉 Toutes les migrations terminées!');
}
```

### En parallèle (plus rapide)

```typescript
async function migrateAllParallel() {
  console.log('🚀 Migration en parallèle...\n');

  await Promise.all([
    migratePageHome(),
    migratePageAppartements(),
    migratePageInfos(),
  ]);

  console.log('🎉 Migrations terminées!');
}
```

---

## 🎯 Checklist pour créer un script de migration

Pour créer un nouveau script de migration :

1. [ ] Créer le fichier dans `scripts/migrate-xxx.ts`
2. [ ] Importer `dotenv` et `@sanity/client`
3. [ ] Charger les variables d'environnement
4. [ ] Créer le client Sanity
5. [ ] Définir la structure du document avec `_id` et `_type`
6. [ ] Ajouter les `_key` pour tous les arrays
7. [ ] Utiliser la structure multilingue (fr/en/de/zh)
8. [ ] Gérer les erreurs avec try/catch
9. [ ] Ajouter des logs console pour suivre la progression
10. [ ] Tester avec un dry-run d'abord
11. [ ] Ajouter le script dans `package.json`
12. [ ] Exécuter avec `npm run migrate:xxx`

---

## 🔍 Vérifier les données après migration

### Via GROQ Query

```typescript
// Récupérer le document créé
const result = await client.fetch('*[_type == "pageHome"][0]');
console.log('Document créé:', result);

// Compter les documents
const count = await client.fetch('count(*[_type == "pageHome"])');
console.log('Nombre de documents:', count);

// Lister tous les documents d'un type
const all = await client.fetch('*[_type == "suite"]');
console.log('Toutes les suites:', all);
```

### Via Sanity Studio

1. Aller sur `http://localhost:3000/studio`
2. Vérifier que les documents apparaissent
3. Vérifier les valeurs dans tous les champs
4. Tester la publication

---

## ✅ Exemple complet : Script ready-to-use

Voici un script complet prêt à l'emploi :

```typescript
import { config } from 'dotenv';
import { createClient } from '@sanity/client';

// Charger les variables d'environnement
config({ path: '.env.local' });

// Client Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Helper pour générer des clés uniques
function generateKey(prefix: string, index: number): string {
  return `${prefix}-${index}-${Date.now()}`;
}

// Fonction de migration
async function migrate() {
  try {
    console.log('🚀 Début de la migration...\n');

    // Votre document ici
    const document = {
      _id: 'uniqueId',
      _type: 'schemaType',
      // ... vos données
    };

    await client.createOrReplace(document);

    console.log('✅ Migration réussie!');

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  }
}

// Exécution
migrate()
  .then(() => {
    console.log('\n✨ Migration terminée!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Échec de la migration:', error);
    process.exit(1);
  });
```

---

## 🎓 Résumé pour l'IA

Quand vous devez migrer des données vers Sanity :

1. **Créer un fichier** dans `scripts/migrate-xxx.ts`
2. **Importer** : `dotenv`, `@sanity/client`
3. **Configurer** le client avec projectId, dataset, token
4. **Structurer** les données avec `_id`, `_type`, `_key`
5. **Utiliser** `client.createOrReplace(document)`
6. **Ajouter** dans package.json et exécuter

**Points clés :**
- `_id` : identifiant unique
- `_type` : doit correspondre au schéma
- `_key` : obligatoire dans les arrays
- Structure multilingue : `{ fr: '', en: '', de: '', zh: '' }`
- Gérer les erreurs avec try/catch
- Logger la progression

Bonne migration ! 🚀

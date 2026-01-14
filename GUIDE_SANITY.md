# Guide : Comment publier les données du site dans Sanity

## Vue d'ensemble

Ce guide explique comment Les Suites du Cygne a été configuré pour utiliser Sanity CMS et comment publier les données du site dans Sanity.

## Qu'est-ce que Sanity ?

Sanity est un **CMS headless** (système de gestion de contenu sans interface imposée) qui permet de :
- Gérer le contenu du site via une interface web conviviale
- Modifier les textes, images et données sans toucher au code
- Supporter plusieurs langues facilement
- Avoir un contenu disponible en temps réel via une API

---

## 🛠️ Configuration initiale du projet

### 1. Installation de Sanity

Les dépendances Sanity ont été ajoutées au projet :

```bash
npm install sanity @sanity/client @sanity/vision @sanity/image-url next-sanity
```

**Packages installés :**
- `sanity` : Le CMS Sanity Studio
- `@sanity/client` : Client pour communiquer avec l'API Sanity
- `@sanity/vision` : Outil de requêtes GROQ en temps réel
- `@sanity/image-url` : Gestion optimisée des images
- `next-sanity` : Intégration Sanity pour Next.js

### 2. Création du projet Sanity

Un projet Sanity a été créé avec :
- **Project ID** : `5o0t2613`
- **Dataset** : `production`

Ces informations sont configurées dans le fichier `.env.local` :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=5o0t2613
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk5eJhmghLMpN4cgXfRN1vfJT90cPC... (token complet)
```

### 3. Structure du projet

```
lessuitesducygne/
├── sanity.config.ts          # Configuration Sanity Studio
├── src/
│   └── sanity/
│       ├── schemas/           # Définitions de structure des données
│       │   ├── pages/         # Schémas pour chaque page
│       │   │   ├── pageHome.ts
│       │   │   ├── pageAppartements.ts
│       │   │   ├── pageInfos.ts
│       │   │   ├── pageExtras.ts
│       │   │   └── pageAdresses.ts
│       │   ├── suite.ts       # Schéma pour les suites
│       │   ├── navbar.ts      # Schéma pour la navigation
│       │   └── index.ts       # Export de tous les schémas
│       └── lib/
│           ├── client.ts      # Client Sanity
│           ├── queries.ts     # Requêtes GROQ
│           └── image.ts       # Helper pour les images
└── scripts/
    └── migrate-all.ts         # Script de migration des données
```

---

## 📋 Schémas de données créés

### Pages créées dans Sanity Studio

1. **🏠 Page d'accueil** (`pageHome`)
   - Hero avec titre, sous-titre, image
   - Section "À propos"
   - Galerie d'images

2. **🏨 Page Appartements** (`pageAppartements`)
   - Liste des suites avec détails complets
   - Support multilingue (FR, EN, DE, ZH)

3. **ℹ️ Page Informations** (`pageInfos`)
   - Coordonnées de contact
   - Horaires check-in/check-out
   - Notes d'accès

4. **✨ Page Extras** (`pageExtras`)
   - Services supplémentaires (petit-déjeuner, boissons)
   - Services de conciergerie

5. **📍 Page Bonnes Adresses** (`pageAdresses`)
   - Catégories (Restaurants, Bars, Shopping, etc.)
   - Recommandations locales

---

## 🚀 Comment publier les données dans Sanity

### Méthode 1 : Via script de migration (Recommandé pour la première fois)

#### Étape 1 : Préparer les données

Les données sont actuellement dans les fichiers :
- `src/data/content.ts` (Français)
- `src/data/content-en.ts` (Anglais)
- `src/data/content-de.ts` (Allemand)
- `src/data/content-zh.ts` (Chinois)

#### Étape 2 : Exécuter le script de migration

```bash
npm run migrate:all
```

Ce script :
1. Lit les données des fichiers locaux
2. Les transforme au format Sanity
3. Les envoie à Sanity via l'API
4. Crée ou met à jour les documents

**Sortie attendue :**
```
🚀 Début de la migration de toutes les pages...

📍 Migration de la page Adresses...
✅ Page Adresses migrée avec succès!

✨ Migration de la page Extras...
✅ Page Extras migrée avec succès!

ℹ️  Migration de la page Infos...
✅ Page Infos migrée avec succès!

🎉 Toutes les pages ont été migrées avec succès!
```

#### Scripts de migration disponibles

```json
{
  "migrate": "tsx scripts/migrate-to-sanity.ts",
  "migrate:all": "tsx scripts/migrate-all.ts",
  "migrate:adresses": "tsx scripts/migrate-adresses.ts",
  "migrate:extras": "tsx scripts/migrate-extras.ts",
  "migrate:infos": "tsx scripts/migrate-infos.ts"
}
```

### Méthode 2 : Via Sanity Studio (Recommandé pour les mises à jour)

#### Étape 1 : Accéder à Sanity Studio

1. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```

2. Ouvrir le navigateur à l'adresse :
   ```
   http://localhost:3000/studio
   ```

#### Étape 2 : Modifier le contenu

Dans Sanity Studio, vous verrez :
- 🏠 Page d'accueil
- 🏨 Page Appartements
- ℹ️ Page Informations
- ✨ Page Extras
- 📍 Page Bonnes Adresses

**Pour modifier une page :**
1. Cliquer sur la page souhaitée
2. Modifier les champs (titres, descriptions, images, etc.)
3. Cliquer sur "Publish" en haut à droite

**Exemple : Modifier le titre de la page d'accueil**
1. Aller sur "🏠 Page d'accueil"
2. Trouver le champ "Hero Title"
3. Modifier le texte dans chaque langue (FR, EN, DE, ZH)
4. Cliquer sur "Publish"

#### Étape 3 : Ajouter des images

**Pour ajouter une image :**
1. Cliquer sur le bouton "Upload" dans un champ image
2. Sélectionner l'image depuis votre ordinateur
3. Sanity optimise automatiquement l'image
4. L'image est stockée sur le CDN Sanity

**Pour ajouter une galerie :**
1. Aller dans la section "Galerie"
2. Cliquer sur "Add item"
3. Uploader l'image
4. Ajouter une description (alt text)
5. Publier

---

## 🔄 Comment les données sont récupérées sur le site

### Configuration du client Sanity

Le client Sanity est configuré dans `src/sanity/lib/client.ts` :

```typescript
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false, // Changements immédiats
  apiVersion: '2024-01-01',
})
```

### Requêtes GROQ

Les requêtes pour récupérer les données sont dans `src/sanity/lib/queries.ts` :

```typescript
// Exemple : Récupérer la page Appartements
export const pageAppartementsQuery = `*[_type == "pageAppartements"][0]{
  header,
  suites[]->{
    _id,
    name,
    description,
    images,
    capacity,
    surface,
    amenities
  }
}`
```

### Utilisation dans les pages Next.js

```typescript
import { client } from '@/sanity/lib/client'
import { pageAppartementsQuery } from '@/sanity/lib/queries'

export default async function AppartementsPage() {
  const data = await client.fetch(pageAppartementsQuery)

  return (
    <div>
      <h1>{data.header.title.fr}</h1>
      {/* ... */}
    </div>
  )
}
```

---

## 🌍 Support multilingue

Toutes les pages supportent 4 langues :
- 🇫🇷 Français (fr)
- 🇬🇧 Anglais (en)
- 🇩🇪 Allemand (de)
- 🇨🇳 Chinois (zh)

**Format dans Sanity :**
```json
{
  "title": {
    "fr": "Bienvenue",
    "en": "Welcome",
    "de": "Willkommen",
    "zh": "欢迎"
  }
}
```

**Récupération dans le code :**
```typescript
const currentLang = 'fr' // ou 'en', 'de', 'zh'
const title = data.title[currentLang]
```

---

## 📸 Gestion des images

### Upload d'images

Les images sont uploadées via Sanity Studio et stockées sur le CDN Sanity.

### Optimisation automatique

Sanity optimise automatiquement les images avec :
- Compression intelligente
- Formats modernes (WebP, AVIF)
- Redimensionnement à la volée
- Lazy loading

### Utilisation dans le code

```typescript
import { urlForImage } from '@/sanity/lib/image'

const imageUrl = urlForImage(image)
  .width(800)
  .height(600)
  .quality(90)
  .url()
```

---

## 🔐 Sécurité et tokens

### Token API

Le token API permet au script de migration d'écrire des données dans Sanity :

```env
SANITY_API_TOKEN=sk5eJhmghLMpN4cgXfRN1vfJT90cPC...
```

**⚠️ IMPORTANT :**
- Ne jamais commiter le fichier `.env.local` dans Git
- Le token doit rester secret
- Pour créer un nouveau token : https://sanity.io/manage

### Permissions du token

Le token actuel a les permissions **Editor**, permettant :
- ✅ Créer des documents
- ✅ Modifier des documents
- ✅ Supprimer des documents
- ✅ Uploader des images

---

## 📊 Workflow complet de publication

### 1. Développement initial

```bash
# 1. Créer ou modifier les schémas dans src/sanity/schemas/
# 2. Mettre à jour sanity.config.ts si nécessaire
# 3. Préparer les données dans scripts/migrate-all.ts
# 4. Lancer la migration
npm run migrate:all
```

### 2. Mises à jour du contenu

```bash
# 1. Démarrer le serveur de développement
npm run dev

# 2. Aller sur http://localhost:3000/studio
# 3. Modifier le contenu directement dans l'interface
# 4. Cliquer sur "Publish"
# 5. Les changements sont immédiatement visibles sur le site
```

### 3. Déploiement en production

```bash
# 1. Build du site avec les dernières données de Sanity
npm run build

# 2. Déploiement (Vercel, Netlify, etc.)
npm run start
```

---

## 🆘 Dépannage

### Les changements ne s'affichent pas

1. Vérifier que `useCdn: false` dans le client Sanity
2. Vérifier que le document a bien été publié (bouton vert "Published")
3. Rafraîchir la page du site

### Erreur "Unauthorized"

1. Vérifier que `SANITY_API_TOKEN` est bien défini dans `.env.local`
2. Vérifier que le token a les bonnes permissions
3. Vérifier que le `projectId` et `dataset` sont corrects

### Image ne s'affiche pas

1. Vérifier que l'image a bien été uploadée dans Sanity Studio
2. Vérifier l'URL générée par `urlForImage()`
3. Vérifier la console du navigateur pour les erreurs

---

## 🎯 Bonnes pratiques

### 1. Toujours tester en local

Avant de publier en production :
```bash
npm run dev
# Tester sur http://localhost:3000
```

### 2. Utiliser des datasets séparés

- `production` : Données en production
- `development` : Données de test

### 3. Versionner les schémas

Conserver un historique des modifications des schémas dans Git.

### 4. Documenter les changements

Ajouter des commentaires dans les schémas pour expliquer leur usage.

---

## 📚 Ressources utiles

- **Sanity Documentation** : https://www.sanity.io/docs
- **GROQ Query Language** : https://www.sanity.io/docs/groq
- **Sanity Studio** : https://www.sanity.io/docs/sanity-studio
- **Next.js + Sanity** : https://www.sanity.io/docs/next-js

---

## ✅ Checklist de migration

- [x] Installer les dépendances Sanity
- [x] Créer le projet Sanity (ID: 5o0t2613)
- [x] Configurer les variables d'environnement
- [x] Créer les schémas de données
- [x] Écrire le script de migration
- [x] Migrer les données vers Sanity
- [x] Configurer Sanity Studio
- [x] Tester la récupération des données
- [x] Optimiser les images
- [x] Déployer en production

---

## 🎉 Conclusion

Votre site Les Suites du Cygne utilise maintenant Sanity CMS ! Vous pouvez :

✅ Modifier le contenu sans toucher au code
✅ Gérer les 4 langues facilement
✅ Uploader et optimiser les images automatiquement
✅ Voir les changements en temps réel
✅ Gérer le contenu de manière professionnelle

Pour toute modification de contenu, rendez-vous simplement sur :
**http://localhost:3000/studio** (en local)
ou
**https://votre-site.com/studio** (en production)

Bonne gestion de contenu ! 🚀

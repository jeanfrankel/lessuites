# Guide d'utilisation Sanity - Les Suites du Cygne

## Configuration initiale

### 1. Créer le projet Sanity

1. Allez sur https://www.sanity.io/
2. Connectez-vous (GitHub, Google ou email)
3. Créez un nouveau projet : "Les Suites du Cygne"
4. Plan : Gratuit
5. Notez votre **Project ID**

### 2. Configurer .env.local

Remplacez `VOTRE_PROJECT_ID` dans `.env.local` :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Accéder au Studio

```bash
npm run dev
```

Puis : http://localhost:3000/studio

## Utilisation dans vos pages

### Exemple : Page des appartements optimisée

```typescript
// app/appartements/page.tsx
import { client } from '@/sanity/lib/client'
import { suitesQuery } from '@/sanity/lib/queries'
import { urlFor, getLqip } from '@/sanity/lib/image'
import SuitesGallery from '@/components/SuitesGallery'

export default async function AppartementsPage() {
  const suites = await client.fetch(suitesQuery)

  // Transformer les images avec optimisations
  const processedSuites = suites.map(suite => ({
    ...suite,
    mainImage: {
      url: urlFor(suite.mainImage)
        .width(1920)
        .fit('max')
        .auto('format')  // WebP/AVIF automatique
        .quality(75)
        .url(),
      lqip: getLqip(suite.mainImage)
    },
    gallery: suite.gallery?.map(img => ({
      url: urlFor(img)
        .width(1920)
        .fit('max')
        .auto('format')
        .quality(75)
        .url(),
      lqip: getLqip(img)
    })) || []
  }))

  return <SuitesGallery suites={processedSuites} />
}
```

### Exemple : Composant avec LQIP

```typescript
// components/SuitesGallery.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function SuitesGallery({ suites }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div>
      {suites.map((suite) => (
        <div
          key={suite._id}
          className="relative h-[600px]"
          style={{
            backgroundImage: suite.mainImage.lqip
              ? `url(${suite.mainImage.lqip})`
              : undefined,
            backgroundSize: 'cover',
          }}
        >
          <Image
            src={suite.mainImage.url}
            alt={suite.title}
            fill
            className="object-cover"
            placeholder={suite.mainImage.lqip ? "blur" : "empty"}
            blurDataURL={suite.mainImage.lqip}
            sizes="100vw"
          />
          <h2>{suite.title}</h2>
          <p>{suite.shortDescription}</p>
        </div>
      ))}
    </div>
  )
}
```

## Schémas disponibles

### Suite (Appartement)
- `title` : Titre
- `slug` : URL friendly
- `description` : Description riche
- `mainImage` : Image principale (avec LQIP)
- `gallery` : Galerie d'images (avec LQIP)
- `capacity` : Capacité
- `surface` : Surface en m²
- `bedrooms` : Nombre de chambres
- `price` : Prix/nuit
- `amenities` : Équipements
- `reservitId` : ID pour Reservit

### Site Settings
- Informations générales du site
- Adresse
- Contacts
- Réseaux sociaux

## Optimisations appliquées

✅ **CDN Sanity** : useCdn: true (10x plus rapide)
✅ **WebP/AVIF** : auto('format') conversion automatique
✅ **Compression** : quality(75) optimal
✅ **LQIP** : Placeholder flou pour chargement progressif
✅ **Métadonnées** : Dimensions et LQIP dans les requêtes GROQ
✅ **Caching** : Maximisé avec CDN

## Déploiement

Pour Netlify, ajoutez les variables d'environnement :
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Le Studio sera accessible à : `https://votre-site.com/studio`

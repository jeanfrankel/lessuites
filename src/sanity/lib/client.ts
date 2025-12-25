import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // CDN uniquement en production
  // En dev, on désactive le CDN pour voir les changements immédiatement
  perspective: 'published', // Voir uniquement les documents publiés
})

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

// Configuration pour organiser le Studio par pages
const structure = (S: any) =>
  S.list()
    .title('Pages du site')
    .items([
      S.listItem()
        .title('🏠 Page d\'accueil')
        .child(
          S.document()
            .schemaType('pageHome')
            .documentId('pageHome')
        ),
      S.listItem()
        .title('🏨 Page Appartements')
        .child(
          S.document()
            .schemaType('pageAppartements')
            .documentId('pageAppartements')
        ),
      S.listItem()
        .title('ℹ️ Page Informations')
        .child(
          S.document()
            .schemaType('pageInfos')
            .documentId('pageInfos')
        ),
      S.listItem()
        .title('✨ Page Extras')
        .child(
          S.document()
            .schemaType('pageExtras')
            .documentId('pageExtras')
        ),
      S.listItem()
        .title('📍 Page Bonnes Adresses')
        .child(
          S.document()
            .schemaType('pageAdresses')
            .documentId('pageAdresses')
        ),
      S.divider(),
      S.listItem()
        .title('⚖️ Mentions Légales')
        .child(
          S.document()
            .schemaType('pageMentionsLegales')
            .documentId('pageMentionsLegales')
        ),
      S.listItem()
        .title('🔒 Politique de Confidentialité')
        .child(
          S.document()
            .schemaType('pagePolitiqueConfidentialite')
            .documentId('pagePolitiqueConfidentialite')
        ),
      S.listItem()
        .title('📝 CGV / CGU')
        .child(
          S.document()
            .schemaType('pageConditionsGenerales')
            .documentId('pageConditionsGenerales')
        ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Les Suites du Cygne',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  // Désactiver le CDN en développement pour voir les changements immédiatement
  useCdn: false,

  plugins: [
    structureTool({ structure }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})

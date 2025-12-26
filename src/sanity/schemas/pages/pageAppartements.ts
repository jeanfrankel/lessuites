import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageAppartements',
  title: '🏨 Page Appartements',
  type: 'document',
  fields: [
    // EN-TÊTE
    defineField({
      name: 'header',
      title: 'En-tête de page',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
      ],
    }),

    // TEXTE INTRO
    defineField({
      name: 'intro',
      title: 'Texte d\'introduction',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Français', rows: 4 },
        { name: 'en', type: 'text', title: 'English', rows: 4 },
        { name: 'de', type: 'text', title: 'Deutsch', rows: 4 },
        { name: 'zh', type: 'text', title: '中文', rows: 4 },
      ],
    }),

    // LISTE DES SUITES
    defineField({
      name: 'suites',
      title: 'Suites / Appartements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Nom de la suite',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
                { name: 'zh', type: 'string', title: '中文' },
              ],
            },
            {
              name: 'slug',
              title: 'URL (slug)',
              type: 'string',
              description: 'Ex: baudelaire, schubert, asselin',
            },
            {
              name: 'mainImage',
              title: 'Image principale',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'gallery',
              title: 'Galerie d\'images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
            },
            {
              name: 'description',
              title: 'Description courte',
              type: 'object',
              fields: [
                { name: 'fr', type: 'text', title: 'Français', rows: 3 },
                { name: 'en', type: 'text', title: 'English', rows: 3 },
                { name: 'de', type: 'text', title: 'Deutsch', rows: 3 },
                { name: 'zh', type: 'text', title: '中文', rows: 3 },
              ],
            },
            {
              name: 'capacity',
              title: 'Capacité (personnes)',
              type: 'number',
            },
            {
              name: 'surface',
              title: 'Surface (m²)',
              type: 'number',
            },
            {
              name: 'bedrooms',
              title: 'Nombre de chambres',
              type: 'number',
            },
            {
              name: 'price',
              title: 'Prix indicatif',
              type: 'string',
              description: 'Ex: "À partir de 150€/nuit"',
            },
          ],
          preview: {
            select: {
              title: 'title.fr',
              media: 'mainImage',
              capacity: 'capacity',
            },
            prepare({ title, media, capacity }) {
              return {
                title: title || 'Suite sans nom',
                subtitle: capacity ? `${capacity} personnes` : '',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '🏨 Page Appartements',
        subtitle: 'En-tête et introduction (les suites sont gérées dans "Suite")',
      }
    },
  },
})

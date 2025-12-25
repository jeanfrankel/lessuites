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

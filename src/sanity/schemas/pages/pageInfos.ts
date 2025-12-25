import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageInfos',
  title: 'ℹ️ Page Informations',
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

    // CONTACT
    defineField({
      name: 'contact',
      title: 'Informations de contact',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Titre de la section',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        { name: 'phone', title: 'Téléphone fixe', type: 'string' },
        { name: 'mobile', title: 'Téléphone mobile', type: 'string' },
        { name: 'emailClient', title: 'Email clients', type: 'string' },
        { name: 'emailAdmin', title: 'Email administration', type: 'string' },
        { name: 'address', title: 'Adresse complète', type: 'text' },
      ],
    }),

    // HORAIRES
    defineField({
      name: 'schedule',
      title: 'Horaires',
      type: 'object',
      fields: [
        {
          name: 'checkIn',
          title: 'Check-in',
          type: 'object',
          fields: [
            { name: 'time', title: 'Horaire', type: 'string' },
            {
              name: 'label',
              title: 'Label',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
                { name: 'zh', type: 'string', title: '中文' },
              ],
            },
          ],
        },
        {
          name: 'checkOut',
          title: 'Check-out',
          type: 'object',
          fields: [
            { name: 'time', title: 'Horaire', type: 'string' },
            {
              name: 'label',
              title: 'Label',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
                { name: 'zh', type: 'string', title: '中文' },
              ],
            },
          ],
        },
      ],
    }),

    // NOTES D'ACCÈS
    defineField({
      name: 'accessNotes',
      title: 'Notes d\'accès',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texte',
              type: 'object',
              fields: [
                { name: 'fr', type: 'text', title: 'Français' },
                { name: 'en', type: 'text', title: 'English' },
                { name: 'de', type: 'text', title: 'Deutsch' },
                { name: 'zh', type: 'text', title: '中文' },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'ℹ️ Page Informations',
        subtitle: 'Contact, horaires, accès',
      }
    },
  },
})

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageInfos',
  title: 'ℹ️ Page Informations',
  type: 'document',
  description: 'Informations pratiques : contact, horaires, accès',
  fields: [
    // EN-TÊTE
    defineField({
      name: 'header',
      title: '📝 En-tête de page',
      description: 'Le titre et sous-titre affichés en haut de la page',
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
      title: '📞 Informations de contact',
      description: 'Toutes les coordonnées de contact',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: '🏷️ Titre de la section (multilingue)',
          description: 'Titre affiché au-dessus des coordonnées',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        {
          name: 'phone',
          title: '📞 Téléphone fixe',
          description: 'Ex: +33 (0)3 89 20 93 64',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'mobile',
          title: '📱 Téléphone mobile',
          description: 'Ex: +33 (0)6 45 32 18 61',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'emailClient',
          title: '✉️ Email clients',
          description: 'Email pour les relations clients',
          type: 'string',
          validation: Rule => Rule.required().email(),
        },
        {
          name: 'emailAdmin',
          title: '✉️ Email administration',
          description: 'Email pour l\'administration',
          type: 'string',
          validation: Rule => Rule.required().email(),
        },
        {
          name: 'address',
          title: '📍 Adresse complète',
          description: 'Adresse complète de l\'établissement',
          type: 'text',
          validation: Rule => Rule.required(),
        },
      ],
    }),

    // HORAIRES
    defineField({
      name: 'schedule',
      title: '🕐 Horaires',
      description: 'Horaires de check-in et check-out',
      type: 'object',
      fields: [
        {
          name: 'checkIn',
          title: '🔑 Check-in',
          description: 'Heure d\'arrivée',
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Horaire',
              description: 'Ex: À partir de 17h',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'label',
              title: '🏷️ Label (multilingue)',
              description: 'Titre de cette section',
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
          title: '🚪 Check-out',
          description: 'Heure de départ',
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Horaire',
              description: 'Ex: Jusqu\'à 12h',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'label',
              title: '🏷️ Label (multilingue)',
              description: 'Titre de cette section',
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
      title: '📋 Notes d\'accès',
      description: 'Informations importantes pour accéder à l\'établissement',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: '📝 Texte (multilingue)',
              description: 'Note d\'information importante',
              type: 'object',
              validation: Rule => Rule.required(),
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

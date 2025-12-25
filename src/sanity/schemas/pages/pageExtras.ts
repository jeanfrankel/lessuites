import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageExtras',
  title: '✨ Page Extras & Services',
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

    // EXTRAS (Petit-déjeuner, Boissons)
    defineField({
      name: 'extras',
      title: 'Extras proposés',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              options: {
                list: [
                  { title: '☕ Café/Petit-déjeuner', value: 'coffee' },
                  { title: '🍷 Vin/Boissons', value: 'wine' },
                  { title: '🎁 Autre', value: 'gift' },
                ],
              },
            },
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
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'fr', type: 'text', title: 'Français', rows: 3 },
                { name: 'en', type: 'text', title: 'English', rows: 3 },
                { name: 'de', type: 'text', title: 'Deutsch', rows: 3 },
                { name: 'zh', type: 'text', title: '中文', rows: 3 },
              ],
            },
            {
              name: 'price',
              title: 'Prix',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
                { name: 'zh', type: 'string', title: '中文' },
              ],
            },
            {
              name: 'items',
              title: 'Liste des items inclus',
              type: 'object',
              fields: [
                { name: 'fr', type: 'text', title: 'Français' },
                { name: 'en', type: 'text', title: 'English' },
                { name: 'de', type: 'text', title: 'Deutsch' },
                { name: 'zh', type: 'text', title: '中文' },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title.fr',
              subtitle: 'price.fr',
            },
          },
        },
      ],
    }),

    // SERVICES (Conciergerie, Ménage, Transfert)
    defineField({
      name: 'services',
      title: 'Services proposés',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              options: {
                list: [
                  { title: '🔔 Conciergerie', value: 'concierge' },
                  { title: '✨ Ménage', value: 'cleaning' },
                  { title: '🚗 Transfert', value: 'car' },
                  { title: '📦 Autre', value: 'other' },
                ],
              },
            },
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
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'fr', type: 'text', title: 'Français', rows: 3 },
                { name: 'en', type: 'text', title: 'English', rows: 3 },
                { name: 'de', type: 'text', title: 'Deutsch', rows: 3 },
                { name: 'zh', type: 'text', title: '中文', rows: 3 },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title.fr',
              icon: 'icon',
            },
          },
        },
      ],
    }),

    // SECTION CTA CONTACT
    defineField({
      name: 'contactCta',
      title: 'Section Call-to-Action Contact',
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
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '✨ Page Extras & Services',
        subtitle: 'Petit-déjeuner, boissons, services additionnels',
      }
    },
  },
})

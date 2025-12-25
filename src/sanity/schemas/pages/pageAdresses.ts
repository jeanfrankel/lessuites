import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageAdresses',
  title: '📍 Page Bonnes Adresses',
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

    // CATÉGORIES D'ADRESSES
    defineField({
      name: 'categories',
      title: 'Catégories de bonnes adresses',
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
                  { title: '🍴 Restaurants', value: 'restaurant' },
                  { title: '☕ Bars/Cafés', value: 'bar' },
                  { title: '🛍️ Shopping', value: 'shopping' },
                  { title: '🏪 Spécialités', value: 'specialty' },
                  { title: '🔧 Utile & Pratique', value: 'practical' },
                ],
              },
            },
            {
              name: 'categoryName',
              title: 'Nom de la catégorie',
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
              title: 'Établissements',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Nom de l\'établissement',
                      type: 'string',
                    },
                    {
                      name: 'type',
                      title: 'Type (optionnel)',
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
                      name: 'link',
                      title: 'Lien (site web)',
                      type: 'url',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'description.fr',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'categoryName.fr',
              items: 'items',
            },
            prepare({ title, items }) {
              return {
                title: title,
                subtitle: `${items?.length || 0} établissement(s)`,
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
        title: '📍 Page Bonnes Adresses',
        subtitle: 'Restaurants, bars, shopping, etc.',
      }
    },
  },
})

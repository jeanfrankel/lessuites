import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageAdresses',
  title: '📍 Page Bonnes Adresses',
  type: 'document',
  description: 'Gérez les bonnes adresses à Colmar (restaurants, bars, shopping, etc.)',
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

    // CATÉGORIES D'ADRESSES
    defineField({
      name: 'categories',
      title: '📂 Catégories de bonnes adresses',
      description: 'Organisez vos adresses par catégories (Restaurants, Bars, Shopping, etc.)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: '🎨 Icône de la catégorie',
              description: 'Choisissez l\'icône qui représente cette catégorie',
              type: 'string',
              options: {
                list: [
                  { title: '🍴 Restaurants', value: 'restaurant' },
                  { title: '☕ Bars/Cafés', value: 'bar' },
                  { title: '🛍️ Shopping', value: 'shopping' },
                  { title: '🏪 Spécialités', value: 'specialty' },
                  { title: '🔧 Utile & Pratique', value: 'practical' },
                ],
                layout: 'dropdown',
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'categoryName',
              title: '🏷️ Nom de la catégorie (multilingue)',
              description: 'Le nom affiché pour cette catégorie dans chaque langue',
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
              title: '🏪 Liste des établissements',
              description: 'Ajoutez ici tous les établissements de cette catégorie',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: '🏢 Nom de l\'établissement',
                      description: 'Ex: La Maison des Têtes, Restaurant Bartholdi...',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    },
                    {
                      name: 'type',
                      title: '🔖 Type (optionnel)',
                      description: 'Ex: Japonais, Bar à vin, Boutique textile...',
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
                      title: '📝 Description',
                      description: 'Décrivez l\'établissement en quelques phrases',
                      type: 'object',
                      validation: Rule => Rule.required(),
                      fields: [
                        { name: 'fr', type: 'text', title: 'Français', rows: 3 },
                        { name: 'en', type: 'text', title: 'English', rows: 3 },
                        { name: 'de', type: 'text', title: 'Deutsch', rows: 3 },
                        { name: 'zh', type: 'text', title: '中文', rows: 3 },
                      ],
                    },
                    {
                      name: 'link',
                      title: '🔗 Lien (site web)',
                      description: 'Lien vers le site web, Facebook, Instagram... (optionnel)',
                      type: 'url',
                      validation: Rule => Rule.uri({
                        scheme: ['http', 'https']
                      }),
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

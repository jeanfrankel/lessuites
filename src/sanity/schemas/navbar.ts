import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navbar',
  title: 'Menu de navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'menuItems',
      title: 'Éléments du menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'object',
              fields: [
                { name: 'fr', title: 'Français', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
                { name: 'de', title: 'Deutsch', type: 'string' },
                { name: 'zh', title: '中文', type: 'string' },
              ],
            },
            {
              name: 'href',
              title: 'Lien',
              type: 'string',
              description: 'Ex: /appartements, /infos, etc.',
            },
            {
              name: 'order',
              title: 'Ordre',
              type: 'number',
            },
          ],
          preview: {
            select: {
              title: 'label.fr',
              subtitle: 'href',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuration de la navigation',
      }
    },
  },
})

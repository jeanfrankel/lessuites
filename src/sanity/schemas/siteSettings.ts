import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du site',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      fields: [
        { name: 'street', title: 'Rue', type: 'string' },
        { name: 'city', title: 'Ville', type: 'string' },
        { name: 'postalCode', title: 'Code postal', type: 'string' },
        { name: 'country', title: 'Pays', type: 'string' },
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
      ],
    }),
  ],
})

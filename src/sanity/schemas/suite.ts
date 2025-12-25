import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'suite',
  title: 'Suite',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Publié',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description courte',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description complète',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie d\'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'capacity',
      title: 'Capacité (personnes)',
      type: 'number',
    }),
    defineField({
      name: 'surface',
      title: 'Surface (m²)',
      type: 'number',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Nombre de chambres',
      type: 'number',
    }),
    defineField({
      name: 'price',
      title: 'Prix à partir de (€/nuit)',
      type: 'number',
    }),
    defineField({
      name: 'amenities',
      title: 'Équipements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'reservitId',
      title: 'ID Reservit',
      type: 'string',
      description: 'ID pour l\'intégration avec le système de réservation Reservit',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      published: 'published',
    },
    prepare(selection) {
      const { title, media, published } = selection
      return {
        title: title,
        subtitle: published ? 'Publié' : 'Brouillon',
        media: media,
      }
    },
  },
})

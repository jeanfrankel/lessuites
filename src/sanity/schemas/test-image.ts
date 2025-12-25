import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testImage',
  title: '🧪 Test Upload Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image de test',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})

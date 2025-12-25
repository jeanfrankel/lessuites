import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageHome',
  title: '🏠 Page d\'accueil',
  type: 'document',
  fields: [
    // SECTION HERO
    defineField({
      name: 'hero',
      title: 'Section Hero (Haut de page)',
      type: 'object',
      fields: [
        {
          name: 'location',
          title: 'Localisation',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        {
          name: 'title',
          title: 'Titre principal',
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
            { name: 'fr', type: 'text', title: 'Français', rows: 2 },
            { name: 'en', type: 'text', title: 'English', rows: 2 },
            { name: 'de', type: 'text', title: 'Deutsch', rows: 2 },
            { name: 'zh', type: 'text', title: '中文', rows: 2 },
          ],
        },
        {
          name: 'cta',
          title: 'Bouton Call-to-Action',
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

    // SECTION COLMAR
    defineField({
      name: 'colmarSection',
      title: 'Section Colmar',
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
        {
          name: 'caption',
          title: 'Légende sous les images',
          type: 'object',
          fields: [
            { name: 'fr', type: 'text', title: 'Français' },
            { name: 'en', type: 'text', title: 'English' },
            { name: 'de', type: 'text', title: 'Deutsch' },
            { name: 'zh', type: 'text', title: '中文' },
          ],
        },
        {
          name: 'gallery',
          title: 'Galerie d\'images de Colmar',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),

    // SECTION PHILOSOPHIE
    defineField({
      name: 'philosophySection',
      title: 'Section Philosophie',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label (petit texte au-dessus)',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
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
          name: 'text',
          title: 'Texte',
          type: 'object',
          fields: [
            { name: 'fr', type: 'text', title: 'Français', rows: 5 },
            { name: 'en', type: 'text', title: 'English', rows: 5 },
            { name: 'de', type: 'text', title: 'Deutsch', rows: 5 },
            { name: 'zh', type: 'text', title: '中文', rows: 5 },
          ],
        },
        {
          name: 'link',
          title: 'Texte du lien',
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

    // SECTION SUITES
    defineField({
      name: 'suitesSection',
      title: 'Section Nos Suites',
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
            { name: 'fr', type: 'text', title: 'Français', rows: 3 },
            { name: 'en', type: 'text', title: 'English', rows: 3 },
            { name: 'de', type: 'text', title: 'Deutsch', rows: 3 },
            { name: 'zh', type: 'text', title: '中文', rows: 3 },
          ],
        },
        {
          name: 'link',
          title: 'Texte du bouton',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        {
          name: 'gallery',
          title: 'Photos des suites',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          description: 'Images qui défilent dans le carousel des suites',
        },
      ],
    }),

    // SECTION CTA RÉSERVATION
    defineField({
      name: 'ctaSection',
      title: 'Section Call-to-Action Réservation',
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
        {
          name: 'button',
          title: 'Texte du bouton',
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

    // SECTION CARTE
    defineField({
      name: 'mapSection',
      title: 'Section Localisation avec carte',
      type: 'object',
      fields: [
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
          name: 'address',
          title: 'Adresse',
          type: 'object',
          fields: [
            { name: 'fr', type: 'text', title: 'Français' },
            { name: 'en', type: 'text', title: 'English' },
            { name: 'de', type: 'text', title: 'Deutsch' },
            { name: 'zh', type: 'text', title: '中文' },
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
  ],
  preview: {
    prepare() {
      return {
        title: '🏠 Page d\'accueil',
        subtitle: 'Modifiez tout le contenu de la page d\'accueil ici',
      }
    },
  },
})

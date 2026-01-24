import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageHome',
  title: '🏠 Page d\'accueil',
  type: 'document',
  fields: [
    // SECTION SEO
    defineField({
      name: 'seo',
      title: 'SEO (Référencement)',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Méta Titre',
          type: 'object',
          description: 'Idéalement: [Mot-clé Niche] à [Ville] | [Nom du Client]',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        {
          name: 'metaDescription',
          title: 'Méta Description',
          type: 'object',
          description: 'Description idéale pour Google (150-160 caractères)',
          fields: [
            { name: 'fr', type: 'text', title: 'Français', rows: 3 },
            { name: 'en', type: 'text', title: 'English', rows: 3 },
            { name: 'de', type: 'text', title: 'Deutsch', rows: 3 },
            { name: 'zh', type: 'text', title: '中文', rows: 3 },
          ],
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),

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
        {
          name: 'bestRate',
          title: 'Message meilleur tarif garanti',
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

    // SECTION AVIS CLIENTS
    defineField({
      name: 'reviewsSection',
      title: 'Section Avis Clients',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label (petit texte)',
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
          name: 'viewOnBooking',
          title: 'Bouton "Voir sur Booking"',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        {
          name: 'bookingRating',
          title: 'Note Booking.com',
          type: 'string',
          description: 'Ex: "9.1"',
        },
        {
          name: 'bookingReviewCount',
          title: 'Nombre d\'avis Booking',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        {
          name: 'bookingLabel',
          title: 'Label Booking (ex: Fabuleux)',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        {
          name: 'airbnbRating',
          title: 'Note Airbnb',
          type: 'string',
          description: 'Ex: "4.89"',
        },
        {
          name: 'airbnbReviewCount',
          title: 'Nombre d\'avis Airbnb',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
            { name: 'zh', type: 'string', title: '中文' },
          ],
        },
        {
          name: 'reviews',
          title: 'Avis clients',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'author', type: 'string', title: 'Nom de l\'auteur' },
              { name: 'country', type: 'string', title: 'Pays / Info' },
              {
                name: 'source',
                type: 'string',
                title: 'Source',
                options: {
                  list: [
                    { title: 'Booking.com', value: 'Booking.com' },
                    { title: 'Airbnb', value: 'Airbnb' },
                  ],
                },
              },
              { name: 'rating', type: 'number', title: 'Note' },
              {
                name: 'text',
                title: 'Texte de l\'avis',
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
                title: 'author',
                subtitle: 'source',
              },
            },
          }],
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

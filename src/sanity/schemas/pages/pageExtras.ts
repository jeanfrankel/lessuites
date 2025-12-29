import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageExtras',
  title: '✨ Page Extras & Services',
  type: 'document',
  description: 'Gérez les services additionnels proposés (petit-déjeuner, boissons, conciergerie...)',
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

    // EXTRAS (Petit-déjeuner, Boissons)
    defineField({
      name: 'extras',
      title: '☕ Extras proposés',
      description: 'Services payants comme le petit-déjeuner, les boissons, etc.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: '🎨 Icône',
              description: 'Choisissez l\'icône pour cet extra',
              type: 'string',
              options: {
                list: [
                  { title: '☕ Café/Petit-déjeuner', value: 'coffee' },
                  { title: '🍷 Vin/Boissons', value: 'wine' },
                  { title: '🎁 Autre', value: 'gift' },
                ],
                layout: 'dropdown',
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'title',
              title: '🏷️ Titre (multilingue)',
              description: 'Nom de cet extra dans chaque langue',
              type: 'object',
              validation: Rule => Rule.required(),
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
              description: 'Décrivez cet extra en détail',
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
              name: 'price',
              title: '💰 Prix (optionnel)',
              description: 'Ex: 15€ par personne, Sur demande...',
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
              title: '📋 Liste des items inclus (optionnel)',
              description: 'Liste de ce qui est inclus dans cet extra',
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
              iconValue: 'icon',
            },
            prepare({ title, subtitle, iconValue }) {
              const iconMap: { [key: string]: string } = {
                'coffee': '☕',
                'wine': '🍷',
                'gift': '🎁',
              };
              return {
                title: title,
                subtitle: subtitle,
                media: () => iconMap[iconValue] || '🎁',
              };
            },
          },
        },
      ],
    }),

    // SERVICES (Conciergerie, Ménage, Transfert)
    defineField({
      name: 'services',
      title: '🛎️ Services proposés',
      description: 'Services gratuits ou sur demande (conciergerie, ménage, transfert...)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: '🎨 Icône',
              description: 'Choisissez l\'icône pour ce service',
              type: 'string',
              options: {
                list: [
                  { title: '🔔 Conciergerie', value: 'concierge' },
                  { title: '✨ Ménage', value: 'cleaning' },
                  { title: '🚗 Transfert', value: 'car' },
                  { title: '📦 Autre', value: 'other' },
                ],
                layout: 'dropdown',
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'title',
              title: '🏷️ Titre (multilingue)',
              description: 'Nom de ce service dans chaque langue',
              type: 'object',
              validation: Rule => Rule.required(),
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
              description: 'Décrivez ce service en quelques mots',
              type: 'object',
              validation: Rule => Rule.required(),
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
              iconValue: 'icon',
            },
            prepare({ title, iconValue }) {
              const iconMap: { [key: string]: string } = {
                'concierge': '🔔',
                'cleaning': '✨',
                'car': '🚗',
                'other': '📦',
              };
              return {
                title: title,
                media: () => iconMap[iconValue] || '📦',
              };
            },
          },
        },
      ],
    }),

    // SECTION CTA CONTACT
    defineField({
      name: 'contactCta',
      title: '📞 Section Call-to-Action Contact',
      description: 'Section d\'appel à l\'action en bas de page pour réserver les extras',
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

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pagePolitiqueConfidentialite',
  title: 'Page Politique de Confidentialité',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
        { name: 'zh', type: 'string', title: '中文' },
      ],
    }),
    defineField({
      name: 'lastUpdate',
      title: 'Date de dernière mise à jour',
      type: 'string',
      description: 'Ex: janvier 2026',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            {
              name: 'titre',
              title: 'Titre de la section',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
                { name: 'zh', type: 'string', title: '中文' },
              ],
            },
            {
              name: 'contenu',
              title: 'Contenu',
              type: 'object',
              fields: [
                { name: 'fr', type: 'text', title: 'Français', rows: 8 },
                { name: 'en', type: 'text', title: 'English', rows: 8 },
                { name: 'de', type: 'text', title: 'Deutsch', rows: 8 },
                { name: 'zh', type: 'text', title: '中文', rows: 8 },
              ],
            },
          ],
          preview: {
            select: {
              title: 'titre.fr',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        { name: 'nom', type: 'string', title: 'Nom' },
        { name: 'adresse', type: 'text', title: 'Adresse', rows: 3 },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'telephone', type: 'string', title: 'Téléphone' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Politique de Confidentialité',
      };
    },
  },
});

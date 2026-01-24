import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageMentionsLegales',
  title: 'Page Mentions Légales',
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
      name: 'editeur',
      title: 'Éditeur du site',
      type: 'object',
      fields: [
        { name: 'nom', type: 'string', title: 'Nom de la société' },
        { name: 'adresse', type: 'text', title: 'Adresse', rows: 3 },
        { name: 'telephone', type: 'string', title: 'Téléphone' },
        { name: 'rcs', type: 'string', title: 'RCS' },
        { name: 'siret', type: 'string', title: 'SIRET' },
        { name: 'ape', type: 'string', title: 'APE' },
        { name: 'tva', type: 'string', title: 'N° TVA intracommunautaire' },
        { name: 'siteWeb', type: 'url', title: 'Site web' },
      ],
    }),
    defineField({
      name: 'directeurPublication',
      title: 'Directeur de la publication',
      type: 'object',
      fields: [
        { name: 'nom', type: 'string', title: 'Nom' },
        { name: 'societe', type: 'string', title: 'Société' },
        { name: 'adresse', type: 'text', title: 'Adresse', rows: 3 },
      ],
    }),
    defineField({
      name: 'hebergeur',
      title: 'Hébergeur',
      type: 'object',
      fields: [
        { name: 'nom', type: 'string', title: 'Nom' },
        { name: 'adresse', type: 'text', title: 'Adresse', rows: 3 },
        { name: 'siteWeb', type: 'url', title: 'Site web' },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections de contenu',
      type: 'array',
      of: [
        {
          type: 'object',
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
                { name: 'fr', type: 'text', title: 'Français', rows: 6 },
                { name: 'en', type: 'text', title: 'English', rows: 6 },
                { name: 'de', type: 'text', title: 'Deutsch', rows: 6 },
                { name: 'zh', type: 'text', title: '中文', rows: 6 },
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
      name: 'contactEmail',
      title: 'Email de contact',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Mentions Légales',
      };
    },
  },
});

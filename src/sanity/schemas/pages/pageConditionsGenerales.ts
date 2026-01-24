import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageConditionsGenerales',
  title: 'Page Conditions Générales de Vente',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO (Référencement)',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'metaTitle',
          title: 'Méta Titre',
          type: 'object',
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
          fields: [
            { name: 'fr', type: 'text', title: 'Français', rows: 2 },
            { name: 'en', type: 'text', title: 'English', rows: 2 },
            { name: 'de', type: 'text', title: 'Deutsch', rows: 2 },
            { name: 'zh', type: 'text', title: '中文', rows: 2 },
          ],
        },
      ],
    }),
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
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'article',
          fields: [
            {
              name: 'numero',
              title: 'Numéro de l\'article',
              type: 'string',
              description: 'Ex: Article 1',
            },
            {
              name: 'titre',
              title: 'Titre de l\'article',
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
                { name: 'fr', type: 'text', title: 'Français', rows: 10 },
                { name: 'en', type: 'text', title: 'English', rows: 10 },
                { name: 'de', type: 'text', title: 'Deutsch', rows: 10 },
                { name: 'zh', type: 'text', title: '中文', rows: 10 },
              ],
            },
          ],
          preview: {
            select: {
              numero: 'numero',
              title: 'titre.fr',
            },
            prepare({ numero, title }) {
              return {
                title: `${numero} - ${title}`,
              };
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
        title: 'Conditions Générales de Vente',
      };
    },
  },
});

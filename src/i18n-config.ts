export const i18n = {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'de', 'zh'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

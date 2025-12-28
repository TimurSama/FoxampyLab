export const locales = ['en', 'ru', 'pl', 'es', 'fr', 'de', 'ar', 'be'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

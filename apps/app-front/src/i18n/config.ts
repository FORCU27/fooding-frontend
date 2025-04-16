export const locales = ['ko', 'en', 'zh-CN', 'zh-TW', 'ja'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

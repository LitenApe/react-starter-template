import * as commonTranslations from 'public/i18n/common/en.json';

type CommonTranslations = typeof commonTranslations;

export type Translations = CommonTranslations;
export type TextKey = keyof Translations;

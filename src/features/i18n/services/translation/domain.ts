import * as commonTranslations from 'public/i18n/common/en.json';
import * as devtoolTranslations from 'public/i18n/devtool/en.json';
import * as profileTranslations from 'public/i18n/profile/en.json';

type CommonTranslations = typeof commonTranslations;
type DevtoolTranslations = typeof devtoolTranslations;
type ProfileTranslations = typeof profileTranslations;

export type Translations = CommonTranslations &
  DevtoolTranslations &
  ProfileTranslations;
export type TextKey = keyof Translations;

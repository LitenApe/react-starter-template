import * as commonTranslations from 'public/i18n/common/en.json';
import * as devtoolTranslations from 'public/i18n/devtool/en.json';
import * as profileTranslations from 'public/i18n/profile/en.json';

import type { TOptions } from 'i18next';

type CommonTranslations = typeof commonTranslations;
type DevtoolTranslations = typeof devtoolTranslations;
type ProfileTranslations = typeof profileTranslations;

export type Translations =
  | {
      common: CommonTranslations;
      devtool: DevtoolTranslations;
      profile: ProfileTranslations;
    }
  | undefined;

type Texts = CommonTranslations & DevtoolTranslations & ProfileTranslations;
export type TextKey = keyof Texts;
export type TextOptions = TOptions;

export enum Lang {
  NB = 'nb',
  EN = 'en',
}

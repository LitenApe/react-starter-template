import { Environment, Mode } from '~/common/services';
import type { TextKey, TextOptions, Translations } from './domain';

import { AxiosBackend } from '~/features/i18n/services';
import { Lang } from './domain';
import type { Subscribable } from '~/common/types';
import i18next from 'i18next';
import { isUndefined } from '~/common/utility';

export const STORAGE_KEY = 'PREFERRED_LANG';

export class TranslationService implements Subscribable<Translations> {
  #subscribers: ((translations: Translations) => void)[] = [];

  init = async () => {
    await i18next.use(AxiosBackend).init({
      debug: Environment.MODE === Mode.DEV,
      fallbackLng: false,
      supportedLngs: Object.values(Lang),
      load: 'currentOnly',
      defaultNS: false,
      ns: [],
      keySeparator: false,
      backend: {
        loadPath: '/i18n/{{ns}}/{{lng}}.json',
      },
    });

    const lang = localStorage.getItem(STORAGE_KEY);
    const validLangs = Object.values(Lang) as (string | null)[];
    if (validLangs.includes(lang)) {
      await this.changeLanguage(lang as Lang);
    }

    i18next.on('loaded', this.#notify);
    i18next.on('languageChanged', this.#notify);
  };

  addTranslation = async (part: string) => {
    await i18next.loadNamespaces(part);
    this.#notify();
  };

  getLanguage = () => {
    return i18next.language as Lang;
  };

  setDefaultLanguage = async (lang: Lang) => {
    if (isUndefined(i18next.language)) {
      await this.changeLanguage(lang);
    }
  };

  changeLanguage = async (lang: Lang) => {
    localStorage.setItem(STORAGE_KEY, lang);
    await i18next.changeLanguage(lang);
  };

  getTranslation = (key: TextKey, variables?: TextOptions) => {
    const ns = key.split('.')[0];

    if (!this.isValidKey(key)) {
      return key;
    }

    return i18next.t(`${ns}:${key}`, variables);
  };

  isValidKey = (key: string): key is TextKey => {
    const ns = key.split('.')[0];
    return i18next.exists(`${ns}:${key}`);
  };

  subscribe = (callback: (translations: Translations) => void) => {
    this.#subscribers.push(callback);

    const lang = this.getLanguage();
    const translations = i18next.getDataByLanguage(lang) as Translations;
    callback(translations);
  };

  unsubscribe = (callback: (translations: Translations) => void) => {
    this.#subscribers = this.#subscribers.filter((cb) => cb !== callback);
  };

  #notify = () => {
    const lang = this.getLanguage();
    const translations = i18next.getDataByLanguage(lang) as Translations;

    this.#subscribers.map((cb) => {
      cb(translations);
    });
  };
}

import { Lang, LanguageService } from '~/features/i18n/services';
import type { TextKey, Translations } from './domain';
import { isEmpty, isUndefined } from '~/features/common/utility';

import type { Subscribable } from '~/features/common/types';
import { generateI18n } from '~/features/i18n/utility';
import { request } from '~/features/common/services';

export class TranslationService implements Subscribable<Translations> {
  #languageService: LanguageService;
  #subscribers: ((translations: Translations) => void)[] = [];

  #loaded: string[] = [];
  #translations: Record<Lang, Translations> = {
    // @ts-expect-error initial state, should be populated through `addTranslations`
    en: {},
    // @ts-expect-error initial state, should be populated through `addTranslations`
    nb: {},
  };

  constructor(languageService: LanguageService) {
    this.#languageService = languageService;
    languageService.subscribe(this.#updateTranslations);
  }

  addTranslation = async (part: string, language?: Lang) => {
    const lang = language ?? this.#languageService.getLanguage();
    const translations = await request.get<Translations>(
      `/i18n/${part}/${lang}.json`,
    );
    this.#translations[lang] = {
      ...this.#translations[lang],
      ...translations,
    };

    if (!this.#loaded.includes(part)) {
      this.#loaded.push(part);
    }
  };

  #getMissingTranslations = async (lang: Lang) => {
    if (isEmpty(this.#translations[lang])) {
      const jobs = this.#loaded.map((part) => this.addTranslation(part, lang));
      await Promise.all(jobs);
    }
  };

  #updateTranslations = (lang: Lang) => {
    this.#getMissingTranslations(lang)
      .catch(() => {
        console.error('Unable to update translations!');
      })
      .finally(() => {
        this.#notify(this.#translations[lang]);
      });
  };

  getTranslation = (
    key: TextKey,
    variables?: Parameters<typeof generateI18n>[1],
  ) => {
    const lang = this.#languageService.getLanguage();
    const translations = this.#translations[lang];
    const text = translations[key];

    if (isUndefined(text)) {
      return key;
    }

    return generateI18n(text, variables);
  };

  isValidKey = (key: string): key is TextKey => {
    const lang = this.#languageService.getLanguage();
    const translations = this.#translations[lang];
    return key in translations;
  };

  subscribe = (callback: (translations: Translations) => void) => {
    this.#subscribers.push(callback);

    const lang = this.#languageService.getLanguage();
    const translations = this.#translations[lang];
    callback(translations);
  };

  unsubscribe = (callback: (translations: Translations) => void) => {
    this.#subscribers = this.#subscribers.filter((cb) => cb !== callback);
  };

  #notify = (translations: Translations) => {
    this.#subscribers.map((cb) => {
      cb(translations);
    });
  };
}

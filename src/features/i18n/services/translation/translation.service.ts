import { Lang, LanguageService } from '~/features/i18n/services';
import { isEmpty, isUndefined } from '~/features/common/utility';

import { Subscribable } from '~/features/common/types';
import { request } from '~/features/common/services';

type Translations = Record<string, string>;

export class TranslationService implements Subscribable<Translations> {
  #languageService: LanguageService;
  #subscribers: Array<(translations: Translations) => void> = [];

  #loaded: Array<string> = [];
  #translations: Record<Lang, Translations> = {
    [Lang.EN]: {},
    [Lang.NB]: {},
    [Lang.SV]: {},
  };

  constructor(languageService: LanguageService) {
    this.#languageService = languageService;
    languageService.subscribe(this.#updateTranslations);
  }

  addTranslation = async (part: string, language?: Lang) => {
    const lang = language ?? this.#languageService.getLanguage();
    const translations = await request.get(`/i18n/${part}/${lang}.json`);
    this.#translations[lang] = {
      ...this.#translations[lang],
      ...translations,
    };

    if (!this.#loaded.includes(part)) {
      this.#loaded.push(part);
    }
  };

  #updateTranslations = async (lang: Lang) => {
    if (isEmpty(this.#translations[lang])) {
      const jobs = this.#loaded.map((part) => this.addTranslation(part, lang));
      await Promise.all(jobs);
    }

    this.#notify(this.#translations[lang]);
  };

  getTranslation = (key: string) => {
    const lang = this.#languageService.getLanguage();
    const translations = this.#translations[lang];
    const text = translations[key];

    if (isUndefined(text)) {
      return key;
    }

    return text;
  };

  isValidKey = (key: string): boolean => {
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
    this.#subscribers.map((cb) => cb(translations));
  };
}

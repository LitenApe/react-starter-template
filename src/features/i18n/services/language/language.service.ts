import { assert, isNull } from '~/features/common/utility';

import { Lang } from './lang.constant';
import type { Subscribable } from '~/features/common/types';

export const STORAGE_KEY = 'PREFERRED_LANGUAGE';

export class LanguageService implements Subscribable<Lang> {
  #preferredLanguage: Lang;
  #subscribers: ((lang: Lang) => void)[] = [];

  constructor(defaultLanguage: Lang) {
    this.#preferredLanguage = defaultLanguage;
  }

  setPreferredLanguage = (lang: Lang) => {
    this.#preferredLanguage = lang;
  };

  #saveLanguage = (lang: Lang) => {
    globalThis.localStorage.setItem(STORAGE_KEY, lang);
  };

  #isValidLanguageKey = (lang: string): lang is Lang => {
    return Object.values(Lang).includes(lang as Lang);
  };

  #retrieveLanguage = (): Lang | null => {
    const storedLanguage = globalThis.localStorage.getItem(STORAGE_KEY);

    if (isNull(storedLanguage) || !this.#isValidLanguageKey(storedLanguage)) {
      return null;
    }

    return storedLanguage;
  };

  getLanguage = (): Lang => {
    return this.#retrieveLanguage() ?? this.#preferredLanguage;
  };

  setLanguage = (lang: Lang) => {
    assert(
      Object.values(Lang).includes(lang),
      `The provided [lang=${lang}] is not a valid language key`,
    );

    this.#saveLanguage(lang);
    this.#notify(lang);
  };

  subscribe = (callback: (lang: Lang) => void) => {
    this.#subscribers.push(callback);

    const lang = this.getLanguage();
    callback(lang);
  };

  unsubscribe = (callback: (lang: Lang) => void) => {
    this.#subscribers = this.#subscribers.filter((cb) => cb !== callback);
  };

  #notify = (lang: Lang) => {
    this.#subscribers.map((cb) => {
      cb(lang);
    });
  };
}

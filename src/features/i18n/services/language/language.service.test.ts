import { LanguageService, STORAGE_KEY } from './language.service';
import { beforeEach, describe, test, vi } from 'vitest';

import { Lang } from './lang.constant';

describe('i18n service: language', () => {
  beforeEach(() => {
    globalThis.localStorage.removeItem(STORAGE_KEY);
  });

  test('returns default language when localstorage is empty', ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);

    expect(languageService.getLanguage()).toBe(Lang.EN);
  });

  test('returns stored language from localstorage when exist', ({ expect }) => {
    globalThis.localStorage.setItem(STORAGE_KEY, Lang.NB);
    const languageService = new LanguageService(Lang.EN);

    expect(languageService.getLanguage()).toBe(Lang.NB);
  });

  test('returns default language when stored language is invalid', ({
    expect,
  }) => {
    globalThis.localStorage.setItem(STORAGE_KEY, 'invalid-value');
    const languageService = new LanguageService(Lang.EN);

    expect(languageService.getLanguage()).toBe(Lang.EN);
  });

  test('"setPreferredLanguage" updated default language', ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);

    expect(languageService.getLanguage()).toBe(Lang.EN);

    languageService.setPreferredLanguage(Lang.NB);
    expect(languageService.getLanguage()).toBe(Lang.NB);
  });

  test('"setLanguage" stores value in localStorage', ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);

    expect(globalThis.localStorage.getItem(STORAGE_KEY)).toBeNull();

    languageService.setLanguage(Lang.NB);
    expect(globalThis.localStorage.getItem(STORAGE_KEY)).toBe(Lang.NB);
  });

  test('throws error when attempting to set an unsupported language', ({
    expect,
  }) => {
    const languageService = new LanguageService(Lang.EN);

    expect(() => {
      // @ts-expect-error invalid type is set on purpose
      languageService.setLanguage('invalid-value');
    }).toThrowError();
  });

  test('subscriber is notified of the current language on registration', ({
    expect,
  }) => {
    const mockSubscriber = vi.fn();
    const languageService = new LanguageService(Lang.EN);

    expect(mockSubscriber).toBeCalledTimes(0);

    languageService.subscribe(mockSubscriber);
    expect(mockSubscriber).toBeCalledTimes(1);
    expect(mockSubscriber).toBeCalledWith(Lang.EN);
  });

  test('subscriber is notified on language change', ({ expect }) => {
    const mockSubscriber = vi.fn();
    const languageService = new LanguageService(Lang.EN);

    languageService.subscribe(mockSubscriber);

    mockSubscriber.mockClear();

    languageService.setLanguage(Lang.NB);
    expect(mockSubscriber).toBeCalledTimes(1);
    expect(mockSubscriber).toBeCalledWith(Lang.NB);
  });

  test('subscriber is not notified after unregistering', ({ expect }) => {
    const mockSubscriber = vi.fn();
    const languageService = new LanguageService(Lang.EN);

    languageService.subscribe(mockSubscriber);

    mockSubscriber.mockClear();

    languageService.unsubscribe(mockSubscriber);
    languageService.setLanguage(Lang.NB);
    expect(mockSubscriber).toBeCalledTimes(0);
  });
});

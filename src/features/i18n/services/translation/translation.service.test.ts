import { Lang, LanguageService } from '~/features/i18n/services';
import { beforeEach, describe, test, vi } from 'vitest';

import type { MockedFunction } from 'vitest';
import { TranslationService } from './translation.service';
import { request } from '~/features/common/services';
import { waitFor } from '@testing-library/react';

vi.mock('~/features/common/services/request', () => ({
  request: {
    get: vi.fn().mockResolvedValue({ foo: 'bar' }),
  },
}));
const mockRequest = request.get as MockedFunction<typeof request.get>;

describe.concurrent('i18n service: translation service', () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  test('fetches text part on "addTranslation"', async ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);
    const translationService = new TranslationService(languageService);
    await translationService.addTranslation('common');

    expect(mockRequest).toBeCalledTimes(1);
    expect(mockRequest).toBeCalledWith('/i18n/common/en.json');
  });

  test('refetch text on language change', async ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);
    const translationService = new TranslationService(languageService);
    await translationService.addTranslation('common');

    mockRequest.mockClear();

    languageService.setLanguage(Lang.NB);

    await waitFor(() => {
      expect(mockRequest).toBeCalled();
    });

    expect(mockRequest).toBeCalledTimes(1);
    expect(mockRequest).toBeCalledWith('/i18n/common/nb.json');
  });

  test('returns text for key', async ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);
    const translationService = new TranslationService(languageService);
    await translationService.addTranslation('common');

    // @ts-expect-error invalid key due to test data
    expect(translationService.getTranslation('foo')).toBe('bar');
  });

  test('returns key for unknown key', async ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);
    const translationService = new TranslationService(languageService);
    await translationService.addTranslation('common');

    // @ts-expect-error invalid key due to test data
    expect(translationService.getTranslation('invalid-key')).toBe(
      'invalid-key',
    );
  });

  test('returns "true" on known text key', async ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);
    const translationService = new TranslationService(languageService);
    await translationService.addTranslation('common');

    expect(translationService.isValidKey('foo')).toBe(true);
  });

  test('returns "false" on unknown text key', ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);
    const translationService = new TranslationService(languageService);

    expect(translationService.isValidKey('unknown-key')).toBe(false);
  });

  test('subscriber is notified of the current translations on registration', async ({
    expect,
  }) => {
    const languageService = new LanguageService(Lang.EN);
    const translationService = new TranslationService(languageService);
    await translationService.addTranslation('common');
    const mockSubscriber = vi.fn();

    translationService.subscribe(mockSubscriber);

    expect(mockSubscriber).toBeCalledTimes(1);
    expect(mockSubscriber).toBeCalledWith({ foo: 'bar' });
  });

  test('subscriber is notified of the new translations on language change', async ({
    expect,
  }) => {
    const languageService = new LanguageService(Lang.EN);
    const translationService = new TranslationService(languageService);
    await translationService.addTranslation('common');
    const mockSubscriber = vi.fn();

    translationService.subscribe(mockSubscriber);
    mockSubscriber.mockClear();

    languageService.setLanguage(Lang.NB);

    await waitFor(() => {
      expect(mockSubscriber).toBeCalled();
    });

    expect(mockSubscriber).toBeCalledTimes(1);
    expect(mockSubscriber).toBeCalledWith({ foo: 'bar' });
  });

  test('subscriber is not notified after unsubscribing', async ({ expect }) => {
    const languageService = new LanguageService(Lang.EN);
    const translationService = new TranslationService(languageService);
    await translationService.addTranslation('common');
    const mockSubscriber = vi.fn();

    translationService.subscribe(mockSubscriber);
    translationService.unsubscribe(mockSubscriber);
    mockSubscriber.mockClear();
    mockRequest.mockClear();

    languageService.setLanguage(Lang.NB);

    await waitFor(() => {
      expect(mockRequest).toBeCalled();
    });

    expect(mockSubscriber).toBeCalledTimes(0);
  });
});

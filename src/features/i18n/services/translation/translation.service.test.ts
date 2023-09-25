import { STORAGE_KEY, TranslationService } from './translation.service';
import { beforeEach, describe, test, vi } from 'vitest';

import { Lang } from '~/features/i18n/services';
import commonEn from 'public/i18n/common/en.json';
import commonNb from 'public/i18n/common/nb.json';
import { waitFor } from '@testing-library/react';

const spyFetch = vi.spyOn(globalThis, 'fetch');

describe('i18n service: translation service', () => {
  beforeEach(() => {
    spyFetch.mockClear();
    spyFetch.mockResolvedValueOnce(new Response(JSON.stringify(commonEn)));
    localStorage.setItem(STORAGE_KEY, Lang.EN);
  });

  test('fetches text part on "addTranslation"', async ({ expect }) => {
    const translationService = new TranslationService();
    await translationService.init();
    await translationService.addTranslation('common');

    expect(spyFetch).toBeCalledTimes(1);
    expect(spyFetch).toBeCalledWith('/i18n/common/en.json', {});
  });

  test('refetch text on language change', async ({ expect }) => {
    const translationService = new TranslationService();
    await translationService.init();
    await translationService.addTranslation('common');

    spyFetch.mockClear();
    spyFetch.mockResolvedValueOnce(new Response(JSON.stringify(commonNb)));
    await translationService.changeLanguage(Lang.NB);

    expect(spyFetch).toBeCalledTimes(1);
    expect(spyFetch).toBeCalledWith('/i18n/common/nb.json', {});
  });

  test('returns text for key', async ({ expect }) => {
    const translationService = new TranslationService();
    await translationService.init();
    await translationService.addTranslation('common');

    expect(translationService.getTranslation('common.test.key')).toBe('Foo');
  });

  test('returns key for unknown key', async ({ expect }) => {
    const translationService = new TranslationService();
    await translationService.init();
    await translationService.addTranslation('common');

    // @ts-expect-error invalid key due to test data
    expect(translationService.getTranslation('invalid-key')).toBe(
      'invalid-key',
    );
  });

  test('returns "true" on known text key', async ({ expect }) => {
    const translationService = new TranslationService();
    await translationService.init();
    await translationService.addTranslation('common');

    expect(translationService.isValidKey('common.test.key')).toBe(true);
  });

  test('returns "false" on unknown text key', ({ expect }) => {
    const translationService = new TranslationService();

    expect(translationService.isValidKey('unknown-key')).toBe(false);
  });

  test('subscriber is notified of the current translations on registration', async ({
    expect,
  }) => {
    const translationService = new TranslationService();
    await translationService.init();
    await translationService.addTranslation('common');

    const mockSubscriber = vi.fn();

    translationService.subscribe(mockSubscriber);

    expect(mockSubscriber).toBeCalled();
  });

  test('subscriber is notified of the new translations on language change', async ({
    expect,
  }) => {
    const translationService = new TranslationService();
    await translationService.init();
    await translationService.addTranslation('common');
    const mockSubscriber = vi.fn();

    translationService.subscribe(mockSubscriber);
    mockSubscriber.mockClear();

    await translationService.changeLanguage(Lang.NB);

    await waitFor(() => {
      expect(mockSubscriber).toBeCalled();
    });
  });

  test('subscriber is not notified after unsubscribing', async ({ expect }) => {
    const translationService = new TranslationService();
    await translationService.init();
    await translationService.addTranslation('common');
    const mockSubscriber = vi.fn();

    translationService.subscribe(mockSubscriber);
    translationService.unsubscribe(mockSubscriber);
    mockSubscriber.mockClear();
    spyFetch.mockClear();

    await translationService.changeLanguage(Lang.NB);

    expect(mockSubscriber).toBeCalledTimes(0);
  });
});

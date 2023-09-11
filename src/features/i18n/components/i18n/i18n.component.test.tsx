import { afterAll, beforeEach, describe, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import { I18n } from './i18n.component';
import { translationService } from '~/features/i18n/services';

const spyTranslationService = vi.spyOn(translationService, 'getTranslation');

describe.concurrent('i18n component: i18n', () => {
  beforeEach(() => {
    spyTranslationService.mockClear();
    cleanup();
  });

  afterAll(() => {
    spyTranslationService.mockRestore();
  });

  test('renders without crashing', () => {
    render(<I18n text="breadcrumb.home" />);
  });

  test('renders text key on unknown key', ({ expect }) => {
    // @ts-expect-error invalid key for test
    render(<I18n text="invalid-key" data-testid="text-container" />);

    const el = screen.getByTestId('text-container');
    expect(el.textContent).toBe('invalid-key');
  });

  test('renders requested text for text key', ({ expect }) => {
    spyTranslationService.mockReturnValueOnce('home');
    render(<I18n text="breadcrumb.home" data-testid="text-container" />);

    const el = screen.getByTestId('text-container');
    expect(el.textContent).toBe('home');
  });

  test('renders text container as "span" by default', ({ expect }) => {
    render(<I18n text="breadcrumb.home" data-testid="text-container" />);

    const el = screen.getByTestId('text-container');
    expect(el.nodeName).toBe('SPAN');
  });

  test('renders text container as requested node', ({ expect }) => {
    render(
      <I18n as="button" text="breadcrumb.home" data-testid="text-container" />,
    );

    const el = screen.getByTestId('text-container');
    expect(el.nodeName).toBe('BUTTON');
  });

  test('calls "translationService.getTranslation" with supplied key and variables', ({
    expect,
  }) => {
    render(<I18n text="breadcrumb.home" variables={{ foo: 'bar' }} />);

    expect(spyTranslationService).toBeCalledTimes(1);
    expect(spyTranslationService).toBeCalledWith('breadcrumb.home', {
      foo: 'bar',
    });
  });
});

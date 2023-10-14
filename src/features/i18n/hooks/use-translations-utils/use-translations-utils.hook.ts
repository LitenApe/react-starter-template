import { assert, isNull } from '~/common/utility';

import { I18nProvider } from '~/features/i18n/components';
import { translationsContext } from '~/features/i18n/contexts';
import { useContext } from 'react';

export function useTranslationsUtils() {
  const ctx = useContext(translationsContext);

  assert(
    !isNull(ctx),
    `"useTranslations" must be wrapped by a ${I18nProvider.name}`,
  );

  const { translationService } = ctx;
  return { isValidKey: translationService.isValidKey };
}

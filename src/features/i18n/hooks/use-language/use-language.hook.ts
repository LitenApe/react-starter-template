import { assert, isNull } from '~/features/common/utility';

import { I18nProvider } from '~/features/i18n/components';
import { translationsContext } from '~/features/i18n/contexts';
import { useContext } from 'react';

export function useLanguage() {
  const ctx = useContext(translationsContext);

  assert(
    !isNull(ctx),
    `"useLanguage" must be wrapped by a ${I18nProvider.name}`,
  );

  const { translationService } = ctx;
  return {
    setLanguage: translationService.changeLanguage,
    getLanguage: translationService.getLanguage,
  };
}

import { assert, isNull } from '~/features/common/utility';

import { I18nProvider } from '~/features/i18n/components';
import { translationsContext } from '~/features/i18n/contexts';
import { useContext } from 'react';

export function useTranslations() {
  const ctx = useContext(translationsContext);

  assert(
    !isNull(ctx),
    `"useTranslations" must be wrapped by a ${I18nProvider.name}`,
  );

  const { translationService } = ctx;
  return { getText: translationService.getTranslation };
}

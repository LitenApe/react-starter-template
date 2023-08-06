import { I18nProvider } from '~/features/i18n/components';
import { context } from '~/features/i18n/contexts';
import { isNull } from '~/features/common/utility';
import { useContext } from 'react';

export function useTranslations() {
  const ctx = useContext(context);

  if (isNull(ctx)) {
    throw new Error(
      `"useTranslations" must be wrapped by a ${I18nProvider.name}`,
    );
  }

  const { translationService } = ctx;
  return { getText: translationService.getTranslation };
}

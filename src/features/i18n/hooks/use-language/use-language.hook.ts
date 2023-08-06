import { I18nProvider } from '~/features/i18n/components';
import { context } from '~/features/i18n/contexts';
import { isNull } from '~/features/common/utility';
import { useContext } from 'react';

export function useLanguage() {
  const ctx = useContext(context);

  if (isNull(ctx)) {
    throw new Error(`"useLanguage" must be wrapped by a ${I18nProvider.name}`);
  }

  const { languageService } = ctx;
  return {
    setLanguage: languageService.setLanguage,
    getLanguage: languageService.getLanguage,
  };
}

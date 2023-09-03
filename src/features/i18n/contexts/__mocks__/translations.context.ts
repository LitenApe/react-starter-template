import {
  LanguageService,
  TranslationService,
  languageService,
  translationService,
} from '~/features/i18n/services';

import { createContext } from 'react';

interface TranslationContext {
  languageService: LanguageService;
  translationService: TranslationService;
}

export const translationsContext = createContext<TranslationContext>({
  languageService: languageService,
  translationService: translationService,
});

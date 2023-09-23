import { TranslationService } from '~/features/i18n/services';
import { createContext } from 'react';

interface TranslationContext {
  translationService: TranslationService;
}

export const translationsContext = createContext<TranslationContext | null>(
  null,
);

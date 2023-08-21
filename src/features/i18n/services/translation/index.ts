import { TranslationService } from './translation.service';
import { languageService } from '~/features/i18n/services';

export const translationService = new TranslationService(languageService);
export { TranslationService };
export type { TextKey } from './domain';

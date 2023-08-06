import { Lang, LanguageService } from './language';

import { TranslationService } from './translation';

export const languageService = new LanguageService(Lang.EN);
export const translationService = new TranslationService(languageService);
export { TranslationService, LanguageService, Lang };

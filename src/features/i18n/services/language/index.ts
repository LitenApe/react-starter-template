import { Lang } from './lang.constant';
import { LanguageService } from './language.service';

export const languageService = new LanguageService(Lang.EN);
export { Lang, LanguageService };

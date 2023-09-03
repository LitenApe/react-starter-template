import { Lang } from '~/features/i18n/services';
import type { TextKey } from '~/features/i18n/services';

export function langToTextKey(lang: Lang): TextKey {
  switch (lang) {
    case Lang.EN:
      return 'translation.select.option.label.english';
    case Lang.NB:
      return 'translation.select.option.label.norwegian';
    default:
      return lang;
  }
}

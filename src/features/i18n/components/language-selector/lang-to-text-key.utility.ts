import { Lang, TextKey } from '~/features/i18n/services';

export function langToTextKey(lang: Lang): TextKey {
  switch (lang) {
    case Lang.EN:
      return 'translation.select.option.label.english';
    case Lang.NB:
      return 'translation.select.option.label.norwegian';
    case Lang.SV:
      return 'translation.select.option.label.swedish';
    default:
      return lang;
  }
}

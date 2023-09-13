import { translationService } from '~/features/i18n/services';

export async function rootLoader() {
  await translationService.addTranslation('profile');
  return null;
}

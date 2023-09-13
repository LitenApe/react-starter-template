import { Environment } from '~/features/common/services';
import { translationService } from '~/features/i18n/services';

export async function rootLoader() {
  await translationService.addTranslation('common');

  if (Environment.DEV) {
    await translationService.addTranslation('devtool');
  }

  return null;
}

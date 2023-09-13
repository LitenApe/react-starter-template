import type { TextKey } from '~/features/i18n/services';
import { rootAliases } from '~/features/navigation/router';

export const routeAliasToTextKey = (alias: string): TextKey | null => {
  switch (alias) {
    case rootAliases.home:
      return 'common.breadcrumb.home';
    case rootAliases.profile:
      return 'common.breadcrumb.profile';
    case rootAliases.settings:
      return 'common.breadcrumb.settings';
    default:
      return null;
  }
};

import { rootAliases } from '~/features/navigation/router';

export const routeAliasToTextKey = (alias: string) => {
  switch (alias) {
    case rootAliases.home:
      return 'breadcrumb.home';
    default:
      return null;
  }
};

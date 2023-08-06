import './index.css';

import { I18n } from '~/features/i18n/components';
import { Link } from '~/features/navigation/components';
import { getRouteNames } from '~/features/navigation/utility';
import { routeAliasToTextKey } from './route-alias-to-text-key.utility';
import { useCurrentRoutes } from '~/features/navigation/hooks';
import { useTranslationsUtils } from '~/features/i18n/hooks';

export function Breadcrumb() {
  const { crumbs } = useViewController();

  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <nav id="breadcrumb">
      <ul>
        {crumbs.map((crumb) => (
          <li key={crumb}>
            <I18n as={Link} to={crumb} text={crumb} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function useViewController() {
  const routes = useCurrentRoutes();
  const paths = getRouteNames(routes);

  const { isValidKey } = useTranslationsUtils();
  const crumbs = paths.map(routeAliasToTextKey).filter(isValidKey);

  return { crumbs };
}

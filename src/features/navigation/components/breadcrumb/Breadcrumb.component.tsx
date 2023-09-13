import './index.css';

import { I18n } from '~/features/i18n/components';
import { Link } from '~/features/navigation/components';
import { getRouteNames } from '~/features/navigation/utility';
import { isDefined } from '~/features/common/utility';
import { routeAliasToTextKey } from './route-alias-to-text-key.utility';
import { useCurrentRoutes } from '~/features/navigation/hooks';
import { useTranslationsUtils } from '~/features/i18n/hooks';

export function Breadcrumb() {
  const { crumbs } = useViewController();

  return (
    <nav id="breadcrumb">
      <ul>
        {crumbs.map(({ alias, textKey }) => (
          <li key={alias}>
            <I18n as={Link} to={alias} text={textKey} />
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
  const crumbs = paths
    .map((alias) => {
      const textKey = routeAliasToTextKey(alias);
      return !isDefined(textKey) ? null : { alias, textKey };
    })
    .filter(isDefined)
    .filter((crumb) => isValidKey(crumb.textKey));

  return { crumbs };
}

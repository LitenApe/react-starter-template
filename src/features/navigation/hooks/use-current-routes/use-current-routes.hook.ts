import { assert, isNull } from '~/features/common/utility';
import { matchRoutes, useLocation } from 'react-router-dom';

import { routes } from '~/features/navigation/router';

export function useCurrentRoutes() {
  const location = useLocation();
  const matches = matchRoutes(routes, location);

  assert(!isNull(matches), 'Unable to retrieve current routes');

  return matches.map((match) => match.route);
}

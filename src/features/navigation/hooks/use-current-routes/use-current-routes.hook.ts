import { matchRoutes, useLocation } from 'react-router-dom';

import { isNull } from '~/features/common/utility';
import { routes } from '~/features/navigation/router';

export function useCurrentRoutes() {
  const location = useLocation();
  const matches = matchRoutes(routes, location);

  if (isNull(matches)) {
    throw new Error('Unable to retrieve current routes');
  }

  return matches.map((match) => match.route);
}

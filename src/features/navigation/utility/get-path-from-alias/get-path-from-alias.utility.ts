import { assert, isNull } from '~/features/common/utility';

import { RouteObject } from 'react-router-dom';
import { routes as appRoutes } from '~/features/navigation/router';
import { getPath } from './get-path.utility';

export function getPathFromAlias(
  alias: string,
  routes: RouteObject[] = appRoutes,
) {
  const path = getPath(routes, alias);

  assert(!isNull(path), `Unable to find path for [alias=${alias}]`);

  return path;
}

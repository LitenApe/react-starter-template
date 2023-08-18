import { RouteObject } from 'react-router-dom';
import { routes as appRoutes } from '~/features/navigation/router';
import { getPath } from './get-path.utility';
import { isNull } from '~/features/common/utility';

export function getPathFromAlias(
  alias: string,
  routes: RouteObject[] = appRoutes,
) {
  const path = getPath(routes, alias);

  if (isNull(path)) {
    throw new Error(`Unable to find path for [alias=${alias}]`);
  }

  return path;
}

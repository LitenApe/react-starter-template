import { RouteObject, generatePath } from 'react-router-dom';
import { assert, isNull } from '~/features/common/utility';

import { routes as appRoutes } from '~/features/navigation/router';
import { getPath } from './get-path.utility';

export function getPathFromAlias(
  alias: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any> | undefined,
  routes: RouteObject[] = appRoutes,
) {
  const path = getPath(routes, alias);

  assert(!isNull(path), `Unable to find path for [alias=${alias}]`);

  return generatePath(path, variables);
}

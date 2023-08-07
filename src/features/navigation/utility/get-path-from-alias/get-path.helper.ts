import { isDefined, isUndefined } from '~/features/common/utility';

import { RouteObject } from 'react-router-dom';

export function getPath(routes: RouteObject[], alias: string): string | null {
  return routes.reduce((acc: string | null, cur) => {
    if (acc !== null) {
      return acc;
    }

    if (cur.id === alias) {
      if (isUndefined(cur.path)) {
        throw new Error(
          'Encountered a route object without a path, but with an alias',
        );
      }

      return cur.path;
    }

    if (cur.children) {
      const child = getPath(cur.children, alias);

      if (isDefined(child)) {
        if (cur.path === '/') {
          return `/${child}`;
        }

        if (isDefined(cur.path)) {
          return `${cur.path}/${child}`;
        }

        return child;
      }
    }

    return acc;
  }, null);
}

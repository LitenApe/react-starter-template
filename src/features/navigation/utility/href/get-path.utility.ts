import { assert, isDefined, isUndefined } from '~/features/common/utility';

import type { RouteObject } from 'react-router-dom';

export function getPath(routes: RouteObject[], alias: string): string | null {
  return routes.reduce((acc: string | null, cur) => {
    if (acc !== null) {
      return acc;
    }

    if (cur.id === alias) {
      assert(
        !isUndefined(cur.path),
        'Encountered a route object without a path, but with an alias',
      );

      return cur.path;
    }

    if (cur.children) {
      const child = getPath(cur.children, alias);

      if (isDefined(child)) {
        const delimiter = child.startsWith('/') ? '' : '/';

        if (cur.path === '/') {
          return `${delimiter}${child}`;
        }

        if (isDefined(cur.path)) {
          return `${cur.path}${delimiter}${child}`;
        }

        return child;
      }
    }

    return acc;
  }, null);
}

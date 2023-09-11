import type { RouteObject } from 'react-router-dom';

export function getRouteNames(routes: RouteObject[]) {
  return routes
    .map((route) => route.id)
    .filter((route): route is string => !!route);
}

import * as routerExports from '~/features/navigation/router';

import { describe, test, vi } from 'vitest';

import { RouteObject } from 'react-router-dom';
import { href } from './href.utility';

const routes: RouteObject[] = [
  {
    id: 'root',
    path: '/',
    children: [
      {
        id: 'profile',
        path: 'profile',
        children: [
          {
            id: 'settings',
            path: 'settings',
          },
        ],
      },
      {
        id: 'books',
        path: '/book',
        children: [
          {
            id: 'book',
            path: '/:bookid',
          },
        ],
      },
    ],
  },
];

const routesSpy = vi.spyOn(routerExports, 'routes', 'get');
routesSpy.mockReturnValue(routes);

describe.concurrent('navigation utility: href', () => {
  test('returns valid path for alias', ({ expect }) => {
    const path = href('profile', undefined);
    expect(path).toBe('/profile');
  });

  test('throws error on invalid alias', ({ expect }) => {
    expect(() => href('invalid', undefined)).toThrow();
  });

  test('throws error when processing pathname with missing variables', ({
    expect,
  }) => {
    expect(() => href('book', undefined)).toThrowError();
  });

  test('returns pathname with variables replaced with variables are supplied', ({
    expect,
  }) => {
    const path = href('book', { bookid: 1 });
    expect(path).toBe('/book/1');
  });
});

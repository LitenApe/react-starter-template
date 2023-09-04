import { describe, test } from 'vitest';

import { RouteObject } from 'react-router-dom';
import { getPathFromAlias } from '.';

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

describe.concurrent('navigation utility: getPathFromAlias', () => {
  test('returns valid path for alias', ({ expect }) => {
    const path = getPathFromAlias('profile', undefined, routes);
    expect(path).toBe('/profile');
  });

  test('throws error on invalid alias', ({ expect }) => {
    expect(() => getPathFromAlias('profile', undefined, [])).toThrow();
  });

  test('throws error when processing pathname with missing variables', ({
    expect,
  }) => {
    expect(() => getPathFromAlias('book', undefined, routes)).toThrowError();
  });

  test('returns pathname with variables replaced with variables are supplied', ({
    expect,
  }) => {
    const path = getPathFromAlias('book', { bookid: 1 }, routes);
    expect(path).toBe('/book/1');
  });
});

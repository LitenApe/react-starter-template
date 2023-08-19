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

describe.concurrent('utility: getPathFromAlias', () => {
  test('returns valid path for alias', ({ expect }) => {
    const path = getPathFromAlias('profile', routes);
    expect(path).toBe('/profile');
  });

  test('throws error on invalid alias', ({ expect }) => {
    expect(() => getPathFromAlias('profile', [])).toThrow();
  });
});

import { describe, expect, test } from 'vitest';

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

describe('utility: getPathFromAlias', () => {
  test('returns valid path for alias', () => {
    const path = getPathFromAlias('profile', routes);
    expect(path).toBe('/profile');
  });

  test('throws error on invalid alias', () => {
    expect(() => getPathFromAlias('profile', [])).toThrow();
  });
});

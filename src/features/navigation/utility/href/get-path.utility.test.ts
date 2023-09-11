import { describe, test } from 'vitest';

import type { RouteObject } from 'react-router-dom';
import { getPath } from './get-path.utility';

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
          {
            id: 'edit',
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

describe.concurrent('navigation utility: getPath', () => {
  test('returns root path when alias is first element', ({ expect }) => {
    const path = getPath(routes, 'root');
    expect(path).toBe('/');
  });

  test('returns valid path when alias is nested child', ({ expect }) => {
    const path = getPath(routes, 'profile');
    expect(path).toBe('/profile');
  });

  test('handles prefixed paths correctly', ({ expect }) => {
    const path = getPath(routes, 'book');
    expect(path).toBe('/book/:bookid');
  });

  test('throws error if alias is linked to route without path definition', ({
    expect,
  }) => {
    expect(() => {
      getPath(routes, 'edit');
    }).toThrowError();
  });
});

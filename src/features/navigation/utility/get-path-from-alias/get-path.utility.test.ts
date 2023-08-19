import { describe, test } from 'vitest';

import { RouteObject } from 'react-router-dom';
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

describe('utility: getPath', () => {
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
});

import { describe, expect, test } from 'vitest';

import { RouteObject } from 'react-router-dom';
import { getRouteNames } from './get-route-names.utility';

describe.concurrent('utility: getRouteNames', () => {
  test("returns all route id's", () => {
    const expected = ['home', 'not-home', 'profile'];
    const routes: RouteObject[] = [
      { id: expected[0] },
      { id: expected[1] },
      { id: expected[2] },
    ];

    const received = getRouteNames(routes);

    expect(received).toStrictEqual(expected);
  });

  test('ignores "undefined" values', () => {
    const expected = ['home', 'not-home', 'profile'];
    const routes: RouteObject[] = [
      { id: expected[0] },
      {},
      { id: expected[1] },
      { id: undefined },
      { id: expected[2] },
    ];

    const received = getRouteNames(routes);

    expect(received).toStrictEqual(expected);
  });
});
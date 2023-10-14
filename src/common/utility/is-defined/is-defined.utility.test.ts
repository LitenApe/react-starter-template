import { describe, test } from 'vitest';

import { isDefined } from './is-defined.utility';

describe.concurrent('common utility: isDefined', () => {
  test('returns "true" when value is "Array"', ({ expect }) => {
    expect(isDefined([])).toBe(true);
  });

  test('returns "true" when value is "Object"', ({ expect }) => {
    expect(isDefined({})).toBe(true);
  });

  test('returns "true" when value is "number"', ({ expect }) => {
    expect(isDefined(0)).toBe(true);
  });

  test('returns "true" when value is "boolean"', ({ expect }) => {
    expect(isDefined(true)).toBe(true);
    expect(isDefined(false)).toBe(true);
  });

  test('returns "true" when value is "function"', ({ expect }) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isDefined(function () {})).toBe(true);
  });

  test('returns "false" when value is "undefined"', ({ expect }) => {
    expect(isDefined(undefined)).toBe(false);
  });

  test('returns "false" when value is "null"', ({ expect }) => {
    expect(isDefined(null)).toBe(false);
  });
});

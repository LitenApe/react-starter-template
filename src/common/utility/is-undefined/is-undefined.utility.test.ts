import { describe, test } from 'vitest';

import { isUndefined } from './is-undefined.utility';

describe.concurrent('common utility: isUndefined', () => {
  test('returns "true" when value is "undefined"', ({ expect }) => {
    expect(isUndefined(undefined)).toBe(true);
  });

  test('returns "false" when value is "null"', ({ expect }) => {
    expect(isUndefined(null)).toBe(false);
  });

  test('returns "false" when value is "Array"', ({ expect }) => {
    expect(isUndefined([])).toBe(false);
  });

  test('returns "false" when value is "Object"', ({ expect }) => {
    expect(isUndefined({})).toBe(false);
  });

  test('returns "false" when value is "number"', ({ expect }) => {
    expect(isUndefined(0)).toBe(false);
  });

  test('returns "false" when value is "boolean"', ({ expect }) => {
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(false)).toBe(false);
  });

  test('returns "false" when value is "function"', ({ expect }) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isUndefined(function () {})).toBe(false);
  });
});

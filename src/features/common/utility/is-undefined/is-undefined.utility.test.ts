import { describe, expect, test } from 'vitest';

import { isUndefined } from './is-undefined.utility';

describe.concurrent('utility: isUndefined', () => {
  test('returns "true" when value is "undefined"', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  test('returns "false" when value is "null"', () => {
    expect(isUndefined(null)).toBe(false);
  });

  test('returns "false" when value is "Array"', () => {
    expect(isUndefined([])).toBe(false);
  });

  test('returns "false" when value is "Object"', () => {
    expect(isUndefined({})).toBe(false);
  });

  test('returns "false" when value is "number"', () => {
    expect(isUndefined(0)).toBe(false);
  });

  test('returns "false" when value is "boolean"', () => {
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(false)).toBe(false);
  });

  test('returns "false" when value is "function"', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isUndefined(function () {})).toBe(false);
  });
});

import { describe, expect, test } from 'vitest';

import { isDefined } from './is-defined.utility';

describe.concurrent('utility: isDefined', () => {
  test('returns "true" when value is "Array"', () => {
    expect(isDefined([])).toBe(true);
  });

  test('returns "true" when value is "Object"', () => {
    expect(isDefined({})).toBe(true);
  });

  test('returns "true" when value is "number"', () => {
    expect(isDefined(0)).toBe(true);
  });

  test('returns "true" when value is "boolean"', () => {
    expect(isDefined(true)).toBe(true);
    expect(isDefined(false)).toBe(true);
  });

  test('returns "true" when value is "function"', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isDefined(function () {})).toBe(true);
  });

  test('returns "false" when value is "undefined"', () => {
    expect(isDefined(undefined)).toBe(false);
  });

  test('returns "false" when value is "null"', () => {
    expect(isDefined(null)).toBe(false);
  });
});

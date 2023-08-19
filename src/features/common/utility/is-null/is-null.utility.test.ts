import { describe, test } from 'vitest';

import { isNull } from './is-null.utility';

describe.concurrent('utility: isNull', () => {
  test('returns "true" when value is "null"', ({ expect }) => {
    expect(isNull(null)).toBe(true);
  });

  test('returns "false" when value is "undefined"', ({ expect }) => {
    expect(isNull(undefined)).toBe(false);
  });

  test('returns "false" when value is "Array"', ({ expect }) => {
    expect(isNull([])).toBe(false);
  });

  test('returns "false" when value is "Object"', ({ expect }) => {
    expect(isNull({})).toBe(false);
  });

  test('returns "false" when value is "number"', ({ expect }) => {
    expect(isNull(0)).toBe(false);
  });

  test('returns "false" when value is "boolean"', ({ expect }) => {
    expect(isNull(true)).toBe(false);
    expect(isNull(false)).toBe(false);
  });

  test('returns "false" when value is "function"', ({ expect }) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isNull(function () {})).toBe(false);
  });
});

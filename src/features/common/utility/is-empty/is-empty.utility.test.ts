import { describe, test } from 'vitest';

import { isEmpty } from './is-empty.utility';

describe.concurrent('utility: isEmpty', () => {
  test('returns "true" when value is "undefined"', ({ expect }) => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test('returns "true" when value is "null"', ({ expect }) => {
    expect(isEmpty(null)).toBe(true);
  });

  test('returns "true" when string is empty', ({ expect }) => {
    expect(isEmpty('')).toBe(true);
  });

  test('returns "false" when string is not empty', ({ expect }) => {
    expect(isEmpty('t')).toBe(false);
  });

  test('returns "true" when argument is a number', ({ expect }) => {
    expect(isEmpty(0)).toBe(true);
  });

  test('returns "true" when object is empty', ({ expect }) => {
    expect(isEmpty({})).toBe(true);
  });

  test('returns "false" when object is not empty', ({ expect }) => {
    expect(isEmpty({ foo: 'bar' })).toBe(false);
  });

  test('returns "true" when argument is a boolean', ({ expect }) => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(false)).toBe(true);
  });

  test('returns "true" when array is empty', ({ expect }) => {
    expect(isEmpty([])).toBe(true);
  });

  test('returns "false" when array is not empty', ({ expect }) => {
    expect(isEmpty([0])).toBe(false);
  });

  test('throws an Error when argument is a function', ({ expect }) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(() => isEmpty(function () {})).toThrowError(
      "Supplied value is not supported by 'isEmpty'",
    );
  });
});

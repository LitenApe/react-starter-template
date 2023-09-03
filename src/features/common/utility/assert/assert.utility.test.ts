import { describe, test } from 'vitest';

import { assert } from './assert.utility';

describe.concurrent('common utility: assert', () => {
  test('do not throw error on "true" condition', ({ expect }) => {
    expect(() => {
      assert(true, 'message');
    }).not.toThrowError();
  });

  test('throws error on "false" condition', ({ expect }) => {
    expect(() => {
      assert(false, 'message');
    }).toThrowError();
  });

  test('throws error with supplied message', ({ expect }) => {
    expect(() => {
      assert(false, 'this is the error message');
    }).toThrowError('this is the error message');
  });
});

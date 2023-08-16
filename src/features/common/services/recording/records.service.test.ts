import { describe, expect, test } from 'vitest';

import { RecordsService } from './records.service';

describe('service: records', () => {
  test('returns inserted record', () => {
    const records = new RecordsService();

    const key = 'test';
    const record = { foo: 'bar' };

    records.addEntry(key, record);
    const received = records.getEntry(key);

    expect(received).toStrictEqual(record);
  });

  test('returns all entries', () => {
    const records = new RecordsService();

    const expected = {
      foo: 'bar',
      hello: 4,
      something: {
        is: {
          not: 'right',
        },
      },
    };

    records.addEntry('foo', expected.foo);
    records.addEntry('hello', expected.hello);
    records.addEntry('something', expected.something);

    const received = records.getRecords();

    expect(received).toStrictEqual(expected);
  });
});

import { describe, test } from 'vitest';

import { RecordsService } from './records.service';

describe.concurrent('common service: records', () => {
  test('returns inserted record', ({ expect }) => {
    const records = new RecordsService();

    const key = 'test';
    const record = { foo: 'bar' };

    records.addEntry(key, record);
    const received = records.getEntry(key);

    expect(received).toStrictEqual(record);
  });

  test('returns all entries', ({ expect }) => {
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

  test('clear wipes entries', ({ expect }) => {
    const records = new RecordsService<number>();

    const expected = {
      foo: 2,
    };

    records.addEntry('foo', 2);
    expect(records.getRecords()).toStrictEqual(expected);

    records.clear();
    expect(records.getRecords()).toStrictEqual({});
  });
});

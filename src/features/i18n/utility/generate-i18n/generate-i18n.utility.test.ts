import { describe, test } from 'vitest';

import { generateI18n } from './generate-i18n.utility';

describe.concurrent('i18n utility: replaceTranslationVariable', () => {
  test('replace single variable', ({ expect }) => {
    const variables = { var: 'hello world' };
    const expected = variables.var;

    const received = generateI18n('{{var}}', variables);

    expect(received).toBe(expected);
  });

  test('replace multiple occurences of same variable', ({ expect }) => {
    const variables = { var: 'hello world' };
    const expected = `${variables.var}${variables.var}${variables.var}`;

    const received = generateI18n('{{var}}{{var}}{{var}}', variables);

    expect(received).toBe(expected);
  });

  test('ignores spacing between brackets and variable name', ({ expect }) => {
    const variables = { var: 'hello world' };
    const expected = variables.var;

    expect(generateI18n('{{ var}}', variables)).toBe(expected);
    expect(generateI18n('{{var }}', variables)).toBe(expected);
    expect(generateI18n('{{ var }}', variables)).toBe(expected);
    expect(generateI18n('{{  var  }}', variables)).toBe(expected);
  });

  test('replace multiple different variables', ({ expect }) => {
    const variables = { foo: 'hello', bar: 'world', zap: '!' };
    const expected = 'hello world!';

    const received = generateI18n('{{foo}} {{bar}}{{zap}}', variables);

    expect(received).toBe(expected);
  });
});

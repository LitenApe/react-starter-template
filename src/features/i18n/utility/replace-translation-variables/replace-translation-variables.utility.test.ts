import { describe, test } from 'vitest';

import { replaceTranslationVariables } from './replace-translation-variables.utility';

describe.concurrent('i18n utility: replaceTranslationVariable', () => {
  test('replace single variable', ({ expect }) => {
    const variables = { var: 'hello world' };
    const expected = variables.var;

    const received = replaceTranslationVariables('{{var}}', variables);

    expect(received).toBe(expected);
  });

  test('replace multiple occurences of same variable', ({ expect }) => {
    const variables = { var: 'hello world' };
    const expected = `${variables.var}${variables.var}${variables.var}`;

    const received = replaceTranslationVariables(
      '{{var}}{{var}}{{var}}',
      variables,
    );

    expect(received).toBe(expected);
  });

  test('ignores spacing between brackets and variable name', ({ expect }) => {
    const variables = { var: 'hello world' };
    const expected = variables.var;

    expect(replaceTranslationVariables('{{ var}}', variables)).toBe(expected);
    expect(replaceTranslationVariables('{{var }}', variables)).toBe(expected);
    expect(replaceTranslationVariables('{{ var }}', variables)).toBe(expected);
    expect(replaceTranslationVariables('{{  var  }}', variables)).toBe(
      expected,
    );
  });

  test('replace multiple different variables', ({ expect }) => {
    const variables = { foo: 'hello', bar: 'world', zap: '!' };
    const expected = 'hello world!';

    const received = replaceTranslationVariables(
      '{{foo}} {{bar}}{{zap}}',
      variables,
    );

    expect(received).toBe(expected);
  });
});

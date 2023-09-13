import { describe, test } from 'vitest';
import { readFileSync, readdirSync } from 'fs';

import { join } from 'path';

const location = join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  'public',
  'i18n',
);
const parts = readdirSync(location);

function getLangs(part: string): [string, string[]] {
  const dir = join(location, part);
  return [dir, readdirSync(dir)];
}

function getTextKeys(part: string) {
  const [dir, langs] = getLangs(part);

  return langs.map((lang) => {
    const content = readFileSync(join(dir, lang), 'utf8');
    const translation = JSON.parse(content) as Record<string, string>;
    return Object.keys(translation).sort();
  });
}

describe.concurrent('i18n translations: text key validation', () => {
  parts.map((part) => {
    test(`verify ${part} text keys`, ({ expect }) => {
      const textKeys = getTextKeys(part);

      textKeys.reduce((acc, cur) => {
        if (acc.length !== 0) {
          expect(acc.length).toBe(cur.length);

          acc.map((_, i) => {
            expect(acc[i]).toBe(cur[i]);
          });
        }

        return cur;
      }, []);
    });
  });

  test('all languages are present in all parts', ({ expect }) => {
    const langs = parts.map((part) => {
      const [, langs] = getLangs(part);
      return langs.sort();
    });

    langs.reduce((acc, cur) => {
      if (acc.length !== 0) {
        expect(acc.length).toBe(cur.length);

        acc.map((_, i) => {
          expect(acc[i]).toBe(cur[i]);
        });
      }

      return cur;
    }, []);
  });
});

import { describe, expect, test } from 'vitest';

import { rootAliases } from '~/features/navigation/router';
import { routeAliasToTextKey } from './route-alias-to-text-key.utility';

describe.concurrent(
  'navigation component utility: route alias to text key',
  () => {
    test('returns text key on configured mapping', ({ expect }) => {
      const received = routeAliasToTextKey(rootAliases.home);

      expect(typeof received).toBe('string');
      expect(received).toBe('breadcrumb.home');
    });

    test('returns null on unmapped alias', () => {
      const received = routeAliasToTextKey('unknown-alias');

      expect(received).toBeNull();
    });
  },
);

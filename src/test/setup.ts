/* eslint-disable import/no-internal-modules */

import { ConfigurationService } from './__mocks__/configuration.service';
import { LocalStorage } from './__mocks__/local-storage.service';
import { vi } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!globalThis.localStorage) {
  globalThis.localStorage = new LocalStorage();
}

vi.mock(
  '~/features/common/services/configuration/configuration.service',
  () => ({ ConfigurationService }),
);

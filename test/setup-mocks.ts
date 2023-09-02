/* eslint-disable import/no-internal-modules */

import { vi } from 'vitest';

vi.mock('~/features/common/services/configuration', async () =>
  vi.importActual(
    '~/features/common/services/configuration/__mocks__/configuration.service',
  ),
);
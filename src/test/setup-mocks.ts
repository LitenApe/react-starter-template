/* eslint-disable import/no-internal-modules */

import { ConfigurationService } from './__mocks__/configuration.service';
import { vi } from 'vitest';

vi.mock('~/features/common/services/configuration', () => ({
  ConfigurationService,
}));

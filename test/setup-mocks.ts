import { vi } from 'vitest';

vi.mock('~/features/common/services/configuration', async () =>
  vi.importActual('~/features/common/services/configuration/__mocks__'),
);

vi.mock('~/features/i18n/contexts', async () =>
  vi.importActual('~/features/i18n/contexts/__mocks__'),
);

import { vi } from 'vitest';

vi.mock('~/features/common/services/configuration', async () =>
  vi.importActual('~/features/common/services/configuration/__mocks__'),
);

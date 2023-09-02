import { vi } from 'vitest';

vi.mock('~/features/common/services/configuration', async () =>
  vi.importMock('~/features/common/services/configuration/__mocks__'),
);

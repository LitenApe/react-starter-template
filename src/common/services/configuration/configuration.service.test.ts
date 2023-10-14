import * as config from 'public/config/configuration.json';

import { describe, test, vi } from 'vitest';

import { ConfigurationService } from './configuration.service';

vi.mock('~/common/services/request', () => ({
  request: {
    get: vi.fn().mockResolvedValue(config),
  },
}));

describe.concurrent('common service: configuration service', () => {
  test('throw error when reading config before load', ({ expect }) => {
    const configurationService = new ConfigurationService();
    expect(() => configurationService.config()).toThrow();
  });

  test('returns config on load', async ({ expect }) => {
    const configurationService = new ConfigurationService();
    await expect(configurationService.load()).resolves.toStrictEqual(config);
  });

  test('returns config after load', async ({ expect }) => {
    const configurationService = new ConfigurationService();
    await expect(configurationService.load()).resolves.toStrictEqual(config);
    expect(configurationService.config()).toStrictEqual(config);
  });
});

import * as config from 'public/config/configuration.json';

import { describe, expect, test, vi } from 'vitest';

import { ConfigurationService } from '../index';

vi.unmock('./configuration.service');
vi.mock('~/features/common/services/request', () => ({
  request: {
    get: vi.fn().mockResolvedValue(config),
  },
}));

describe('service: ConfigurationService', () => {
  test('throw error when reading config before load', () => {
    const configurationService = new ConfigurationService();
    expect(() => configurationService.config()).toThrow();
  });

  test('returns config on load', async () => {
    const configurationService = new ConfigurationService();
    await expect(configurationService.load()).resolves.toStrictEqual(config);
  });

  test('returns config after load', async () => {
    const configurationService = new ConfigurationService();
    await expect(configurationService.load()).resolves.toStrictEqual(config);
    expect(configurationService.config()).toStrictEqual(config);
  });
});

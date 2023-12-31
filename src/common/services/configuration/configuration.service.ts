import { assert, isNull } from '~/common/utility';

import type { Config } from './domain';
import { request } from '~/common/services';

export class ConfigurationService {
  #config: Config | null = null;

  load = async () => {
    const config = await request.get<Config>('/config/configuration.json');
    this.#config = config;
    return config;
  };

  config = () => {
    assert(!isNull(this.#config), 'Configuration has not been loaded yet!');

    return this.#config;
  };
}

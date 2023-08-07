import { Config } from './domain';
import { isNull } from '~/features/common/utility';
import { request } from '~/features/common/services';

export class ConfigurationService {
  #config: Config | null = null;

  load = async () => {
    const config = await request.get<Config>('/config/configuration.json');
    this.#config = config;
    return config;
  };

  config = () => {
    if (isNull(this.#config)) {
      throw new Error('Configuration has not been loaded yet!');
    }

    return this.#config;
  };
}

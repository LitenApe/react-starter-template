import * as config from 'public/config/configuration.json';

export class ConfigurationService {
  load = async () => {
    return Promise.resolve(config);
  };

  config = () => {
    return config;
  };
}

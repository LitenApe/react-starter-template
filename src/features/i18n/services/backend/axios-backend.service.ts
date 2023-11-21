/* eslint-disable no-console */

import type { InitOptions, ModuleType, Services } from 'i18next';

import { isDefined } from '~/common/utility';
import { request } from '~/common/services';

interface BackendOptions {
  loadPath: string;
}

export class AxiosBackend {
  static type: ModuleType = 'backend';
  // @ts-expect-error gets initiated through either constructor or init, it's guaranteed
  #options: BackendOptions;
  // @ts-expect-error gets initiated through either constructor or init, it's guaranteed
  #i18nextOptions: InitOptions;

  constructor(
    services: Services,
    options: BackendOptions,
    i18nextOptions: InitOptions,
  ) {
    this.init(services, options, i18nextOptions);
  }

  init(
    _services: Services,
    options: BackendOptions,
    i18nextOptions: InitOptions,
  ) {
    this.#options = options;
    this.#i18nextOptions = i18nextOptions;
  }

  #log(level: 'log' | 'warn' | 'error', message: string) {
    const { debug } = this.#i18nextOptions;

    if (debug) {
      console[level]('i18next::backendConnector::AxiosBackend:', message);
    }
  }

  read(
    language: string,
    namespace: string,
    callback: (e: unknown, d: Record<string, string> | null) => void,
  ) {
    if (!isDefined(this.#options.loadPath)) {
      this.#log(
        'error',
        'Missing loadpath! Please specify a [loadPath] to enable text loading!',
      );
      callback(null, null);
      return;
    }

    const { loadPath } = this.#options;
    const path = loadPath
      .replace('{{ns}}', namespace)
      .replace('{{lng}}', language);

    request
      .get<Record<string, string>>(path)
      .then((data) => {
        callback(null, data);
      })
      .catch((e) => {
        callback(e, null);
      });
  }
}

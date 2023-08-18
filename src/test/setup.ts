/* eslint-disable import/no-internal-modules */

import { LocalStorage } from './__mocks__/local-storage.service';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!globalThis.localStorage) {
  globalThis.localStorage = new LocalStorage();
}

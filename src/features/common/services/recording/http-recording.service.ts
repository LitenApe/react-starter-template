import {
  Environment,
  ResponseInterceptor,
  addResponseInterceptor,
  removeResponseInterceptor,
} from '~/features/common/services';

import { HTTPRecord } from './domain';
import { RecordsService } from './records.service';

export class HTTPRecordingService {
  #recorder: RecordsService<HTTPRecord>;

  constructor(recorder: RecordsService<HTTPRecord>) {
    this.#recorder = recorder;
  }

  #responseListener: ResponseInterceptor = (response) => {
    const key = this.#getEntryKey(response.request.url);
    const entry = this.#recorder.getEntry(key);

    const method = response.request.method;

    this.#recorder.addEntry(key, {
      ...entry,
      [method]: {
        data: response.data,
        status: response.status,
      },
    });

    return response;
  };

  #getEntryKey = (url: string) => {
    const origin = globalThis.location.origin;

    if (url.startsWith(origin)) {
      return url.substring(origin.length);
    }

    return url;
  };

  init = () => {
    if (Environment.RECORD) {
      this.start();
    }
  };

  start = () => {
    addResponseInterceptor(this.#responseListener);
  };

  stop = () => {
    removeResponseInterceptor(this.#responseListener);
  };

  save = () => {
    const el = globalThis.document.createElement('a');

    const records = this.#recorder.getRecords();
    const blob = new Blob([JSON.stringify(records)], {
      type: 'application/json',
    });
    el.href = URL.createObjectURL(blob);
    el.download = 'http-records.json';

    globalThis.document.body.appendChild(el);
    el.click();
    el.remove();
  };
}

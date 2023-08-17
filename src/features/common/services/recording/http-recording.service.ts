import {
  Environment,
  RequestInterceptor,
  ResponseInterceptor,
  addRequestInterceptor,
  addResponseInterceptor,
  removeRequestInterceptor,
  removeResponseInterceptor,
} from '~/features/common/services';

import { HTTPRecord } from './domain';
import { RecordsService } from './records.service';

export class HTTPRecordingService {
  #recorder: RecordsService<HTTPRecord>;

  constructor(recorder: RecordsService<HTTPRecord>) {
    this.#recorder = recorder;
  }

  #requestListener: RequestInterceptor = (url, config) => {
    this.#recorder.addEntry(url, {
      method: config.method ?? 'get',
      data: null,
      status: null,
    });
    return [url, config];
  };

  #responseListener: ResponseInterceptor = (response) => {
    const key = this.getEntryKey(response.url);
    const entry = this.#recorder.getEntry(key);

    this.#recorder.addEntry(key, {
      ...entry,
      data: response.data,
      status: response.status,
    });
    return response;
  };

  getEntryKey = (url: string) => {
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
    addRequestInterceptor(this.#requestListener);
    addResponseInterceptor(this.#responseListener);
  };

  stop = () => {
    removeRequestInterceptor(this.#requestListener);
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

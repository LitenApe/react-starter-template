import {
  Environment,
  Mode,
  addResponseInterceptor,
  removeResponseInterceptor,
} from '~/common/services';

import type { HTTPRecord } from './domain';
import type { HTTPResponse } from '~/common/services';
import { RecordsService } from './records.service';
import { isDefined } from '~/common/utility';

export class HTTPRecordingService {
  #recorder: RecordsService<HTTPRecord>;
  #isRecording: boolean;
  #interceptor: number | null = null;

  constructor(recorder: RecordsService<HTTPRecord>) {
    this.#recorder = recorder;
    this.#isRecording = false;
  }

  #responseListener = (response: HTTPResponse) => {
    const { url, method } = response.config;

    if (isDefined(url) && isDefined(method)) {
      const key = this.#getEntryKey(url);
      const entry = this.#recorder.getEntry(url);

      this.#recorder.addEntry(key, {
        ...entry,
        [method]: {
          data: response.data as HTTPRecord,
          status: response.status,
        },
      });
    }

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
    if (Environment.MODE === Mode.RECORD) {
      this.start();
    }
  };

  start = () => {
    if (!this.#isRecording) {
      this.#interceptor = addResponseInterceptor(this.#responseListener);
      this.#isRecording = true;
    }
  };

  stop = () => {
    if (isDefined(this.#interceptor)) {
      removeResponseInterceptor(this.#interceptor);
      this.#isRecording = false;
    }
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

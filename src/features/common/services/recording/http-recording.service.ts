import {
  Environment,
  Mode,
  ResponseInterceptor,
  addResponseInterceptor,
  removeResponseInterceptor,
} from '~/features/common/services';

import type { HTTPRecord } from './domain';
import { RecordsService } from './records.service';

export class HTTPRecordingService {
  #recorder: RecordsService<HTTPRecord>;
  #isRecording: boolean;

  constructor(recorder: RecordsService<HTTPRecord>) {
    this.#recorder = recorder;
    this.#isRecording = false;
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
    if (Environment.MODE === Mode.RECORD) {
      this.start();
    }
  };

  start = () => {
    if (!this.#isRecording) {
      addResponseInterceptor(this.#responseListener);
      this.#isRecording = true;
    }
  };

  stop = () => {
    removeResponseInterceptor(this.#responseListener);
    this.#isRecording = false;
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

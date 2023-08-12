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

  #requestListener: RequestInterceptor = (request) => {
    this.#recorder.addEntry(request.url, {
      method: request.method,
      data: null,
      status: null,
    });
    return request;
  };

  #responseListener: ResponseInterceptor = (response) => {
    const entry = this.#recorder.getEntry(response.url);

    this.#recorder.addEntry(response.url, {
      ...entry,
      data: response.data,
      status: response.status,
    });
    return response;
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
    const records = this.#recorder.getRecords();
    console.log(records);
  };
}

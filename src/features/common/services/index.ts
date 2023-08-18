import { HTTPRecordingService, RecordsService } from './recording';

import { ConfigurationService } from './configuration';
import type { HTTPRecord } from './recording';

export {
  request,
  addRequestInterceptor,
  addResponseInterceptor,
  removeRequestInterceptor,
  removeResponseInterceptor,
} from './request';
export type { RequestInterceptor, ResponseInterceptor } from './request';
export { Environment, Mode } from './env';

export const configurations = new ConfigurationService();
export { ConfigurationService };

const httpRecords = new RecordsService<HTTPRecord>();
export const httpRecordingService = new HTTPRecordingService(httpRecords);
export { RecordsService, HTTPRecordingService };

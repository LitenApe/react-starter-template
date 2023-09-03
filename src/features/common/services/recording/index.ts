import type { HTTPRecord } from './domain';
import { HTTPRecordingService } from './http-recording.service';
import { RecordsService } from './records.service';

const httpRecords = new RecordsService<HTTPRecord>();
export const httpRecordingService = new HTTPRecordingService(httpRecords);

export { httpRecords, HTTPRecordingService };

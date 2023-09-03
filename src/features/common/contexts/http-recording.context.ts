import { HTTPRecordingService } from '~/features/common/services';
import { createContext } from 'react';

interface HTTPRecordingContext {
  httpRecordingService: HTTPRecordingService;
}

export const httpRecordingContext = createContext<HTTPRecordingContext | null>(
  null,
);

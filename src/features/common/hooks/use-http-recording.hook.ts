import { Environment, Mode } from '~/features/common/services';
import { assert, isNull } from '~/features/common/utility';
import { useCallback, useContext, useState } from 'react';

import { HTTPRecordingProvider } from '~/features/common/components';
import { httpRecordingContext } from '~/features/common/contexts';

export function useHTTPRecording() {
  const ctx = useContext(httpRecordingContext);

  assert(
    !isNull(ctx),
    `"useHTTPRecording" must be wrapped by a ${HTTPRecordingProvider.name}`,
  );

  const [isRecording, setIsRecording] = useState(
    Environment.MODE === Mode.RECORD,
  );

  const { httpRecordingService } = ctx;

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      httpRecordingService.stop();
    } else {
      httpRecordingService.start();
    }

    setIsRecording((prev) => !prev);
  }, [isRecording, httpRecordingService, setIsRecording]);

  const saveRecording = useCallback(() => {
    httpRecordingService.save();
  }, [httpRecordingService]);

  return {
    isRecording,
    toggleRecording,
    saveRecording,
  };
}

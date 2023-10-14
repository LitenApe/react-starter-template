import type { PropsWithChildren } from 'react';
import { httpRecordingContext } from '~/common/contexts';
import { httpRecordingService } from '~/common/services';

export function HTTPRecordingProvider(props: PropsWithChildren) {
  const { children } = props;

  return (
    <httpRecordingContext.Provider
      value={{ httpRecordingService: httpRecordingService }}
    >
      {children}
    </httpRecordingContext.Provider>
  );
}

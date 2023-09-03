import type { PropsWithChildren } from 'react';
import { httpRecordingContext } from '~/features/common/contexts';
import { httpRecordingService } from '~/features/common/services';

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

import {
  ComponentProps,
  PropsWithChildren,
  useEffect,
  useReducer,
} from 'react';

import { translationService } from '~/features/i18n/services';
import { translationsContext } from '~/features/i18n/contexts';

export function I18nProvider(props: PropsWithChildren) {
  const { children } = useViewController(props);

  return (
    <translationsContext.Provider value={{ translationService }}>
      {children}
    </translationsContext.Provider>
  );
}

function useViewController(props: ComponentProps<typeof I18nProvider>) {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    translationService.subscribe(forceUpdate);

    return () => {
      translationService.unsubscribe(forceUpdate);
    };
  }, []);

  return props;
}

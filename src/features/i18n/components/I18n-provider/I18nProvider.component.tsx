import {
  ComponentProps,
  PropsWithChildren,
  useEffect,
  useReducer,
} from 'react';
import { languageService, translationService } from '~/features/i18n/services';

import { context } from '~/features/i18n/contexts';

export function I18nProvider(props: PropsWithChildren) {
  const { children } = useViewController(props);

  return (
    <context.Provider value={{ languageService, translationService }}>
      {children}
    </context.Provider>
  );
}

function useViewController(props: ComponentProps<typeof I18nProvider>) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    translationService.subscribe(forceUpdate);

    return () => {
      translationService.unsubscribe(forceUpdate);
    };
  }, []);

  return props;
}

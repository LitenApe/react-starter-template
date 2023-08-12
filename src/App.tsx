import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  configurationService,
  httpRecordingService,
} from '~/features/common/services';
import { useEffect, useState } from 'react';

import { isNull } from '~/features/common/utility';
import { languageService } from '~/features/i18n/services';
import { routes } from '~/features/navigation/router';

export function App() {
  const { router } = useViewController();

  if (isNull(router)) {
    return <p>Loading...</p>;
  }

  return <RouterProvider router={router} />;
}

async function appStartup() {
  httpRecordingService.init();

  const config = await configurationService.load();
  languageService.setPreferredLanguage(config['default.language']);
}

function appCleanup() {
  httpRecordingService.stop();
}

function useViewController() {
  const [router, setRouter] = useState<ReturnType<
    typeof createBrowserRouter
  > | null>(null);

  useEffect(() => {
    appStartup()
      .catch(() => {
        console.error('Unable to start up the application properly!');
      })
      .finally(() => {
        setRouter(createBrowserRouter(routes));
      });

    return appCleanup;
  }, []);

  return { router };
}

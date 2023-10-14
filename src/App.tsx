import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { configurations, httpRecordingService } from '~/common/services';
import { useEffect, useState } from 'react';

import { isNull } from '~/common/utility';
import { routes } from '~/features/navigation/router';
import { translationService } from '~/features/i18n/services';

export function App() {
  const { router } = useViewController();

  if (isNull(router)) {
    return <p>Loading...</p>;
  }

  return <RouterProvider router={router} />;
}

async function appStartup() {
  httpRecordingService.init();

  await translationService.init();

  const config = await configurations.load();
  await translationService.setDefaultLanguage(config['default.language']);
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

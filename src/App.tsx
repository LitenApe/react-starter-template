import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { configurationService } from '~/features/common/services';
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
  const config = await configurationService.load();
  languageService.setPreferredLanguage(config['default.language']);
}

function useViewController() {
  const [router, setRouter] = useState<ReturnType<
    typeof createBrowserRouter
  > | null>(null);

  useEffect(() => {
    appStartup().finally(() => setRouter(createBrowserRouter(routes)));
  }, []);

  return { router };
}

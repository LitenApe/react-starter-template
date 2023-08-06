import { RootPage } from '~/features/common/pages';
import { createBrowserRouter } from 'react-router-dom';
import { rootAliases } from './aliases.constant';
import { translationService } from '~/features/i18n/services';

export const routes = [
  {
    id: rootAliases.home,
    path: '/',
    loader: async () => {
      await translationService.addTranslation('common');
      return null;
    },
    element: <RootPage />,
    children: [],
  },
];

export const router = createBrowserRouter(routes);

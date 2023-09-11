import { RootPage } from '~/features/common/pages';
import type { RouteObject } from 'react-router-dom';
import { rootAliases } from './aliases.constant';
import { translationService } from '~/features/i18n/services';

export const routes: RouteObject[] = [
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

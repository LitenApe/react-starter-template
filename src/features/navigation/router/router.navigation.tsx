import { RootPage } from '~/common/pages';
import type { RouteObject } from 'react-router-dom';
import { profileRoutes } from '~/features/profile';
import { rootAliases } from './aliases.constant';
import { rootLoader } from '~/common/loaders';

export const routes: RouteObject[] = [
  {
    id: rootAliases.home,
    path: '/',
    loader: rootLoader,
    element: <RootPage />,
    children: [...profileRoutes],
  },
];

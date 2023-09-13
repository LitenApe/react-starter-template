/* eslint-disable import/no-internal-modules */

import type { RouteObject } from 'react-router-dom';
import { profileAliases } from './aliases.constant';
import { rootLoader } from '../loaders';

export const profileRoutes: RouteObject[] = [
  {
    path: 'profile',
    id: profileAliases.profile,
    loader: rootLoader,
    children: [
      {
        index: true,
        lazy: () => import('../pages/Profile.page'),
      },
      {
        id: profileAliases.settings,
        path: 'settings',
        lazy: () => import('../pages/Settings.page'),
      },
    ],
  },
];

import { Breadcrumb, Link } from '~/features/navigation/components';
import {
  I18n,
  I18nProvider,
  LanguageSelector,
} from '~/features/i18n/components';

import { DevTools } from '~/features/common/components';
import { Outlet } from 'react-router-dom';
import { rootAliases } from '~/features/navigation/router';

export function RootPage() {
  return (
    <I18nProvider>
      <LanguageSelector />
      <Breadcrumb />
      <Link to={rootAliases.home}>
        <I18n text="common.menu.link.home" />
      </Link>
      <Link to={rootAliases.profile}>
        <I18n text="common.menu.link.profile" />
      </Link>
      <Link to={rootAliases.settings}>
        <I18n text="common.menu.link.settings"></I18n>
      </Link>
      <Outlet />
      <DevTools />
    </I18nProvider>
  );
}

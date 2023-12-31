import { Breadcrumb, Link } from '~/features/navigation/components';
import {
  I18n,
  I18nProvider,
  LanguageSelector,
} from '~/features/i18n/components';

import { DevTools } from '~/common/components';
import { Outlet } from 'react-router-dom';
import { rootAliases } from '~/features/navigation/router';
import { useNavigate } from '~/features/navigation/hooks';

export function RootPage() {
  const go = useNavigate();

  return (
    <I18nProvider>
      <LanguageSelector />
      <Breadcrumb />
      <button onClick={() => {
          go(rootAliases.user, { userid: 2 })
        }}
      >
        click me
      </button>
      <Link to={rootAliases.home}>
        <I18n text="common.menu.link.home" />
      </Link>
      <Link to={rootAliases.profile}>
        <I18n text="common.menu.link.profile" />
      </Link>
      <Link to={rootAliases.settings}>
        <I18n text="common.menu.link.settings"></I18n>
      </Link>
      <Link to={rootAliases.user} variables={{ userid: 2 }}>
        <I18n text="common.menu.link.user" />
      </Link>
      <Outlet />
      <DevTools />
    </I18nProvider>
  );
}

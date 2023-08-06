import { I18nProvider, LanguageSelector } from '~/features/i18n/components';

import { Breadcrumb } from '~/features/navigation/components';
import { Outlet } from 'react-router-dom';

export function RootPage() {
  return (
    <I18nProvider>
      <LanguageSelector />
      <Breadcrumb />
      <Outlet />
    </I18nProvider>
  );
}

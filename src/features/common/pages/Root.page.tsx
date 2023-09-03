import { I18nProvider, LanguageSelector } from '~/features/i18n/components';

import { Breadcrumb } from '~/features/navigation/components';
import { Outlet } from 'react-router-dom';
import { httpRecordingService } from '~/features/common/services';

export function RootPage() {
  return (
    <I18nProvider>
      <LanguageSelector />
      <Breadcrumb />
      <button
        onClick={() => {
          httpRecordingService.save();
        }}
      >
        save
      </button>
      <Outlet />
    </I18nProvider>
  );
}

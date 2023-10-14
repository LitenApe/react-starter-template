import { Environment } from '~/common/services';
import { HTTPRecording } from './HTTPRecording.component';
import { HTTPRecordingProvider } from '~/common/components';
import { I18n } from '~/features/i18n/components';

export function DevTools() {
  const { isAvailable, mode } = useViewController();

  if (!isAvailable) {
    return null;
  }

  return (
    <HTTPRecordingProvider>
      <section>
        <I18n as="h2" text="devtool.heading" />
        <table>
          <thead>
            <tr>
              <th>
                <I18n text="devtool.table.heading.name" />
              </th>
              <th>
                <I18n text="devtool.table.heading.action" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <I18n text="devtool.action.mode.name" />
              </td>
              <td>{mode}</td>
            </tr>
            <HTTPRecording />
          </tbody>
        </table>
      </section>
    </HTTPRecordingProvider>
  );
}

function useViewController() {
  return {
    isAvailable: Environment.DEV,
    mode: Environment.MODE,
  };
}

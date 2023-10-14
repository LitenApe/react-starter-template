import { I18n } from '~/features/i18n/components';
import { useHTTPRecording } from '~/common/hooks';

export function HTTPRecording() {
  const { isRecording, toggleRecording, saveRecording } = useViewController();

  return (
    <>
      <tr>
        <td>
          <I18n text="devtool.action.recording.name" />
        </td>
        <td>
          <button onClick={toggleRecording}>
            <I18n
              text={
                isRecording
                  ? 'devtool.action.recording.action.stop'
                  : 'devtool.action.recording.action.start'
              }
            />
          </button>
        </td>
      </tr>
      <tr>
        <td>
          <I18n text="devtool.action.save.name" />
        </td>
        <td>
          <button onClick={saveRecording}>
            <I18n text="devtool.action.save.action" />
          </button>
        </td>
      </tr>
    </>
  );
}

function useViewController() {
  const { isRecording, toggleRecording, saveRecording } = useHTTPRecording();

  return {
    isRecording,
    toggleRecording,
    saveRecording,
  };
}

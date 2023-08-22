import { Environment, Mode, request } from '~/features/common/services';
import { describe, test, vi } from 'vitest';

import { HTTPRecord } from './domain';
import { HTTPRecordingService } from './index';
import { RecordsService } from './records.service';

const spyFetch = vi.spyOn(globalThis, 'fetch');

async function sendHTTPRequest() {
  const mockResponse = new Response('completed', {
    status: 200,
    statusText: 'success',
    headers: {},
  });
  spyFetch.mockResolvedValue(mockResponse);
  await request.get('http://test.com/skills');
}

describe.concurrent('common service: http recording', () => {
  test('records http requests while enabled', async ({ expect }) => {
    const records = new RecordsService<HTTPRecord>();
    const recorder = new HTTPRecordingService(records);
    const spyRecords = vi.spyOn(records, 'addEntry');
    recorder.start();

    expect(spyRecords).not.toHaveBeenCalled();

    await sendHTTPRequest();

    expect(spyRecords).toHaveBeenCalledTimes(1);
  });

  test('entry is recorded after http request', async ({ expect }) => {
    const records = new RecordsService<HTTPRecord>();
    const recorder = new HTTPRecordingService(records);
    recorder.start();

    await sendHTTPRequest();

    expect(records.getRecords()).toStrictEqual({
      'http://test.com/skills': { GET: { status: 200, data: 'completed' } },
    });
  });

  test('stops recording when stopped', async ({ expect }) => {
    const records = new RecordsService<HTTPRecord>();
    const recorder = new HTTPRecordingService(records);
    const spyRecords = vi.spyOn(records, 'addEntry');
    recorder.start();

    expect(spyRecords).not.toHaveBeenCalled();

    await sendHTTPRequest();

    expect(spyRecords).toHaveBeenCalledTimes(1);

    recorder.stop();

    await sendHTTPRequest();

    expect(spyRecords).toHaveBeenCalledTimes(1);
  });

  test('starts recording on init when Mode is "RECORD"', async ({ expect }) => {
    const spyEnv = vi.spyOn(Environment, 'MODE', 'get');
    spyEnv.mockReturnValue(Mode.RECORD);

    const records = new RecordsService<HTTPRecord>();
    const recorder = new HTTPRecordingService(records);
    const spyRecords = vi.spyOn(records, 'addEntry');
    recorder.init();

    expect(spyRecords).not.toHaveBeenCalled();

    await sendHTTPRequest();

    expect(spyRecords).toHaveBeenCalledTimes(1);
  });
});

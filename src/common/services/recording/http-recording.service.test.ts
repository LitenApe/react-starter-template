import { Environment, Mode, request } from '~/common/services';
import { afterAll, beforeEach, describe, test, vi } from 'vitest';

import type { HTTPRecord } from './domain';
import { HTTPRecordingService } from './index';
import { RecordsService } from './records.service';

const spyFetch = vi.spyOn(globalThis, 'fetch');
const spyEnv = vi.spyOn(Environment, 'MODE', 'get');

async function sendHTTPRequest(url = 'http://test.com/skills') {
  const mockResponse = new Response('completed', {
    status: 200,
    statusText: 'success',
    headers: {},
  });
  spyFetch.mockResolvedValue(mockResponse);
  await request.get(url);
}

describe.concurrent('common service: http recording', () => {
  beforeEach(() => {
    spyFetch.mockClear();
    spyEnv.mockClear();
  });

  afterAll(() => {
    spyFetch.mockRestore();
    spyEnv.mockRestore();
  });

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

  test('origin is removed from entry key if domain === origin', async ({
    expect,
  }) => {
    const records = new RecordsService<HTTPRecord>();
    const recorder = new HTTPRecordingService(records);
    recorder.start();

    await sendHTTPRequest(`${globalThis.location.origin}/skills`);

    expect(records.getRecords()).toStrictEqual({
      '/skills': { GET: { status: 200, data: 'completed' } },
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
    spyEnv.mockReturnValue(Mode.RECORD);

    const records = new RecordsService<HTTPRecord>();
    const recorder = new HTTPRecordingService(records);
    const spyRecords = vi.spyOn(records, 'addEntry');
    recorder.init();

    expect(spyRecords).not.toHaveBeenCalled();

    await sendHTTPRequest();

    expect(spyRecords).toHaveBeenCalledTimes(1);
  });

  test('only attach one http listener when enabled', async ({ expect }) => {
    spyEnv.mockReturnValue(Mode.RECORD);

    const records = new RecordsService<HTTPRecord>();
    const recorder = new HTTPRecordingService(records);
    const spyRecords = vi.spyOn(records, 'addEntry');
    recorder.init();
    recorder.start();
    recorder.start();

    expect(spyRecords).not.toHaveBeenCalled();

    await sendHTTPRequest();

    expect(spyRecords).toHaveBeenCalledTimes(1);
  });
});

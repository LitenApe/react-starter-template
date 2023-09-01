import { beforeEach, describe, test, vi } from 'vitest';

import { request } from './requests.service';

const spyFetch = vi.spyOn(globalThis, 'fetch');

function createHTTPRespone(response: ResponseInit) {
  const mockResponse = new Response('completed', response);
  spyFetch.mockResolvedValue(mockResponse);
}

describe.concurrent('common service: request', () => {
  beforeEach(() => {
    spyFetch.mockClear();
  });

  test('throws error on unsuccessful request', async ({ expect }) => {
    createHTTPRespone({ status: 400 });
    await expect(async () => request.get('http://test.com')).rejects.toThrow();
  });

  test('resolves on successful request', async ({ expect }) => {
    createHTTPRespone({ status: 200 });
    const res = await request.get('http://test.com');
    expect(res).toBe('completed');
  });

  test('sends "GET" request when requested', async ({ expect }) => {
    createHTTPRespone({ status: 200 });
    await request.get('http://test.com');

    const req = spyFetch.mock.calls[0][0] as unknown as Request;
    expect(req.method).toBe('GET');
  });

  test('sends "HEAD" request when requested', async ({ expect }) => {
    createHTTPRespone({ status: 200 });
    await request.head('http://test.com');

    const req = spyFetch.mock.calls[0][0] as unknown as Request;
    expect(req.method).toBe('HEAD');
  });

  test('sends "POST" request when requested', async ({ expect }) => {
    createHTTPRespone({ status: 200 });
    await request.post('http://test.com');

    const req = spyFetch.mock.calls[0][0] as unknown as Request;
    expect(req.method).toBe('POST');
  });

  test('sends "PUT" request when requested', async ({ expect }) => {
    createHTTPRespone({ status: 200 });
    await request.put('http://test.com');

    const req = spyFetch.mock.calls[0][0] as unknown as Request;
    expect(req.method).toBe('PUT');
  });

  test('sends "PATCH" request when requested', async ({ expect }) => {
    createHTTPRespone({ status: 200 });
    await request.patch('http://test.com');

    const req = spyFetch.mock.calls[0][0] as unknown as Request;
    // patch is the only one that is not uppercased,
    // maybe because it's not part of the rfc7231 spec
    expect(req.method.toUpperCase()).toBe('PATCH');
  });

  test('sends "DELETE" request when requested', async ({ expect }) => {
    createHTTPRespone({ status: 200 });
    await request.delete('http://test.com');

    const req = spyFetch.mock.calls[0][0] as unknown as Request;
    expect(req.method).toBe('DELETE');
  });

  test('sends "OPTIONS" request when requested', async ({ expect }) => {
    createHTTPRespone({ status: 200 });
    await request.options('http://test.com');

    const req = spyFetch.mock.calls[0][0] as unknown as Request;
    expect(req.method).toBe('OPTIONS');
  });
});

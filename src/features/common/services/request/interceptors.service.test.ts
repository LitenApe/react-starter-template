import { Environment, Mode } from '~/features/common/services';
import {
  addRequestInterceptor,
  addResponseInterceptor,
  clearRequestInterceptors,
  clearResponseInterceptors,
  prepareRequest,
  removeRequestInterceptor,
  removeResponseInterceptor,
  requestInteceptors,
  responseInterceptors,
} from './interceptors.service';
import { afterAll, beforeEach, describe, test, vi } from 'vitest';

const spyEnv = vi.spyOn(Environment, 'MODE', 'get');
const mockRequestInterceptor = vi
  .fn()
  .mockImplementation((url: string, init: RequestInit) => [url, init]);

describe('common service: request interceptor', () => {
  beforeEach(() => {
    spyEnv.mockClear();
  });

  afterAll(() => {
    spyEnv.mockRestore();
  });

  describe('interceptor helpers', () => {
    beforeEach(() => {
      clearRequestInterceptors();
      clearResponseInterceptors();
    });

    test('add request interceptor', ({ expect }) => {
      expect(requestInteceptors).toHaveLength(0);
      addRequestInterceptor(vi.fn());
      expect(requestInteceptors).toHaveLength(1);
    });

    test('remove request interceptor', ({ expect }) => {
      const interceptor = vi.fn();

      addRequestInterceptor(interceptor);
      addRequestInterceptor(vi.fn());

      expect(requestInteceptors).toHaveLength(2);
      removeRequestInterceptor(interceptor);
      expect(requestInteceptors).toHaveLength(1);
    });

    test('add response interceptor', ({ expect }) => {
      expect(responseInterceptors).toHaveLength(0);
      addResponseInterceptor(vi.fn());
      expect(responseInterceptors).toHaveLength(1);
    });

    test('remove response interceptor', ({ expect }) => {
      const interceptor = vi.fn();

      addResponseInterceptor(interceptor);
      addResponseInterceptor(vi.fn());

      expect(responseInterceptors).toHaveLength(2);
      removeResponseInterceptor(interceptor);
      expect(responseInterceptors).toHaveLength(1);
    });
  });

  describe('interceptor iterators', () => {
    beforeEach(() => {
      mockRequestInterceptor.mockClear();
      spyEnv.mockClear();
    });

    test('calls request interceptor on "prepareRequest"', async ({
      expect,
    }) => {
      addRequestInterceptor(mockRequestInterceptor);
      await prepareRequest('http://test.com', { method: 'get' });
      expect(mockRequestInterceptor).toBeCalledTimes(1);
    });

    test('returns request information after "prepareRequest"', async ({
      expect,
    }) => {
      const [url, init] = await prepareRequest('http://test.com', {
        method: 'get',
      });
      expect(url).toBe('http://test.com');
      expect(init).toStrictEqual({ method: 'get' });
    });

    test('returns modified request information after "prepareRequest"', async ({
      expect,
    }) => {
      addRequestInterceptor(mockRequestInterceptor);
      mockRequestInterceptor.mockReturnValueOnce([
        'http://beach.com',
        { method: 'post' },
      ]);

      const [url, init] = await prepareRequest('http://test.com', {
        method: 'get',
      });
      expect(url).toBe('http://beach.com');
      expect(init).toStrictEqual({ method: 'post' });
    });

    test('rewrites url on offline mode', async ({ expect }) => {
      spyEnv.mockReturnValueOnce(Mode.OFFLINE);

      const [url] = await prepareRequest('http://test.com', {
        method: 'get',
      });
      expect(url).toBe('/offline');
    });

    test('append url to headers on offline mode', async ({ expect }) => {
      spyEnv.mockReturnValueOnce(Mode.OFFLINE);

      const [_, init] = await prepareRequest('http://test.com', {
        method: 'get',
      });
      expect(init.headers).toStrictEqual({
        [Environment.OFFLINE_HEADER]: 'http://test.com',
      });
    });
  });
});

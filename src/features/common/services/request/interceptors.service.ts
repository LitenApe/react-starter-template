import { RequestInterceptor, ResponseInterceptor } from './domain';

import { Environment } from '~/features/common/services';
import { transformResponse } from './response-transformer.utility';

export let requestInteceptors: RequestInterceptor[] = [];
export let responseInterceptors: ResponseInterceptor[] = [];

export function addRequestInterceptor(callback: RequestInterceptor) {
  requestInteceptors.push(callback);
}

export function removeRequestInterceptor(callback: RequestInterceptor) {
  requestInteceptors = requestInteceptors.filter((cb) => cb !== callback);
}

export function addResponseInterceptor(callback: ResponseInterceptor) {
  responseInterceptors.push(callback);
}

export function removeResponseInterceptor(callback: ResponseInterceptor) {
  responseInterceptors = responseInterceptors.filter((cb) => cb !== callback);
}

export async function prepareRequest(
  url: string,
  config: RequestInit,
): Promise<[string, RequestInit]> {
  const [reqUrl, reqConfig] = await requestInteceptors.reduce(
    async (acc, interceptor) => {
      const accumulator = await acc;
      return interceptor(accumulator[0], accumulator[1]);
    },
    Promise.resolve([url, config] as [string, RequestInit]),
  );

  if (Environment.OFFLINE) {
    reqConfig.headers = {
      ...reqConfig.headers,
      [Environment.OFFLINE_HEADER]: url,
    };
    return [Environment.OFFLINE_PREFIX, reqConfig];
  }

  return [reqUrl, reqConfig];
}

export async function prepareResponse(res: Response, req: RequestInit) {
  const response = await transformResponse(res, req);

  return await responseInterceptors.reduce(async (acc, interceptor) => {
    const accumulator = await acc;
    return interceptor(accumulator);
  }, Promise.resolve(response));
}

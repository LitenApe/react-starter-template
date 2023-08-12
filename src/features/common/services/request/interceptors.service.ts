import { RequestInterceptor, ResponseInterceptor } from './domain';

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

export async function prepareRequest(url: string, config: RequestInit) {
  const req = new Request(url, config);

  return requestInteceptors.reduce(async (acc, interceptor) => {
    const accumulator = await acc;
    return interceptor(accumulator);
  }, Promise.resolve(req));
}

export async function prepareResponse(res: Response) {
  const response = await transformResponse(res);

  return await responseInterceptors.reduce(async (acc, interceptor) => {
    const accumulator = await acc;
    return interceptor(accumulator);
  }, Promise.resolve(response));
}

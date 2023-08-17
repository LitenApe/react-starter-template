import { prepareRequest, prepareResponse } from './interceptors.service';

import { isDefined } from '~/features/common/utility';

async function fetch<R>(url: string, config: RequestInit = {}) {
  const [reqUrl, reqConfig] = await prepareRequest(url, config);

  const res = await globalThis.fetch(reqUrl, reqConfig);

  const response = await prepareResponse(res, reqConfig);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.data as R;
}

type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

const handlers = {
  get(_: unknown, method: HTTPMethod) {
    return (url: string, payload?: object) => {
      const body = isDefined(payload) ? JSON.stringify(payload) : null;

      return fetch(url, { method, body });
    };
  },
};

export const request = new Proxy({}, handlers) as Record<
  HTTPMethod,
  typeof fetch
>;

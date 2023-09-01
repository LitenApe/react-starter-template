import { prepareRequest, prepareResponse } from './interceptors.service';

async function fetch<R>(url: string, config: RequestInit = {}) {
  const [reqUrl, reqConfig] = await prepareRequest(url, config);

  const req = new Request(reqUrl, reqConfig);
  const res = await globalThis.fetch(req);
  const response = await prepareResponse(req, res);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.data as R;
}

type HTTPMethod =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'options';

const handlers = {
  get(_: unknown, method: HTTPMethod) {
    return (url: string, config?: RequestInit) => {
      return fetch(url, { method, ...config });
    };
  },
};

export const request = new Proxy({}, handlers) as Record<
  HTTPMethod,
  typeof fetch
>;

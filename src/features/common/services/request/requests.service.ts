import { isDefined } from '~/features/common/utility';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetch<R = any>(url: string, config?: RequestInit) {
  const res = await globalThis.fetch(url, config);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json() as R;
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

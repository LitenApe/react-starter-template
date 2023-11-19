import { Environment, Mode } from '~/common/services';
import type {
  HTTPMethod,
  HTTPRequestConfig,
  HTTPRequestInterceptor,
  HTTPResponseInterceptor,
} from './domain';

import axios from 'axios';

function prepareRequest(
  url: string,
  config: HTTPRequestConfig,
): [string, HTTPRequestConfig] {
  if (Environment.MODE === Mode.OFFLINE) {
    config.headers = {
      ...config.headers,
      [Environment.OFFLINE_HEADER]: url,
    };
    return [Environment.OFFLINE_PREFIX, config];
  }

  return [url, config];
}

async function fetch<R>(
  method: HTTPMethod,
  url: string,
  config: HTTPRequestConfig,
) {
  const [reqUrl, reqConfig] = prepareRequest(url, config);

  if (['post', 'put'].includes(method)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, ...requestConfig } = reqConfig;
    const response = await axios[method]<R>(reqUrl, data, requestConfig);
    return response.data;
  }

  const response = await axios[method]<R>(reqUrl, reqConfig);
  return response.data;
}

const handlers = {
  get(_: unknown, method: HTTPMethod) {
    return (url: string, config: HTTPRequestConfig = {}) => {
      return fetch(method, url, config);
    };
  },
};

export const request = new Proxy({}, handlers) as Record<
  HTTPMethod,
  <R>(url: string, config?: HTTPRequestConfig) => Promise<R>
>;

export const addRequestInterceptor: HTTPRequestInterceptor = (
  onFulfilled,
  onRejected,
  options,
) => {
  return axios.interceptors.request.use(onFulfilled, onRejected, options);
};

export function removeRequestInterceptor(interceptor: number) {
  axios.interceptors.request.eject(interceptor);
}

export const addResponseInterceptor: HTTPResponseInterceptor = (
  onFulfilled,
  onRejected,
  options,
) => {
  return axios.interceptors.response.use(onFulfilled, onRejected, options);
};

export function removeResponseInterceptor(interceptor: number) {
  axios.interceptors.response.eject(interceptor);
}

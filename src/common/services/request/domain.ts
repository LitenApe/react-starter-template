import type {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export type HTTPMethod =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'options';

export type HTTPResponse = AxiosResponse;
export type HTTPRequestConfig = AxiosRequestConfig;

export type HTTPRequestInterceptor =
  AxiosInterceptorManager<InternalAxiosRequestConfig>['use'];
export type HTTPResponseInterceptor =
  AxiosInterceptorManager<AxiosResponse>['use'];

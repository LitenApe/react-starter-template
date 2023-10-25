import { HTTPResponse } from './http-response.service';

export type HTTPRequest = Request;

export type RequestInterceptor = (
  url: string,
  config: RequestInit,
) => Promise<[string, RequestInit]> | [string, RequestInit];

export type ResponseInterceptor = (
  res: HTTPResponse,
) => Promise<HTTPResponse> | HTTPResponse;

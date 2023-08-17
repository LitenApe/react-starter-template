export type HTTPRequest = Request;
export interface HTTPRespone extends Response {
  data: unknown;
  request: RequestInit;
}

export type RequestInterceptor = (
  url: string,
  config: RequestInit,
) => Promise<[string, RequestInit]> | [string, RequestInit];

export type ResponseInterceptor = (
  res: HTTPRespone,
) => Promise<HTTPRespone> | HTTPRespone;

export type HTTPRequest = Request;
export interface HTTPRespone extends Response {
  data: unknown;
}

export type RequestInterceptor = (
  url: string,
  config: RequestInit,
) => Promise<[string, RequestInit]> | [string, RequestInit];
export type ResponseInterceptor = (
  res: HTTPRespone,
  req: RequestInit,
) => Promise<[HTTPRespone, RequestInit]> | [HTTPRespone, RequestInit];

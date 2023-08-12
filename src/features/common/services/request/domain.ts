export type HTTPRequest = Request;
export interface HTTPRespone extends Response {
  data: unknown;
}

export type RequestInterceptor = (
  req: HTTPRequest,
) => Promise<HTTPRequest> | HTTPRequest;
export type ResponseInterceptor = (
  res: HTTPRespone,
) => Promise<HTTPRespone> | HTTPRespone;

import { HTTPRespone } from './domain';

function transformBody(body: string) {
  try {
    return JSON.parse(body) as unknown;
  } catch {
    return body;
  }
}

export async function transformResponse(
  res: Response,
  request: RequestInit,
): Promise<HTTPRespone> {
  const data = await res.text();
  const response = Object.assign(res, { data: transformBody(data) });
  return Object.assign(response, { request });
}

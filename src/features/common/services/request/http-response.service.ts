function transformBody(body: string) {
  try {
    return JSON.parse(body) as unknown;
  } catch {
    return body;
  }
}

export class HTTPRespone extends Response {
  data: unknown;
  request: Request;

  constructor(body: string, req: Request, res: Response) {
    super(body, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });

    this.data = transformBody(body);
    this.request = req;
  }

  static factory = async (req: Request, res: Response) => {
    const body = await res.text();
    return new HTTPRespone(body, req, res);
  };
}

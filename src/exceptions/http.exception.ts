import type { HttpStatusCode } from '../types/http.type.js';

export class HttpException extends Error {
  constructor(
    message: string,
    public statusCode: HttpStatusCode,
    public details?: unknown
  ) {
    super(message);
  }
}

import { HttpStatusCode } from '../types/http.type.js';
import { HttpException } from './http.exception.js';

export class ValidationException extends HttpException {
  constructor(details: unknown) {
    super('invalid input data provided', HttpStatusCode.BAD_REQUEST, details);
  }
}

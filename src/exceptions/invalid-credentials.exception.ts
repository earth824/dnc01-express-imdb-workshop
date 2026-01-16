import { HttpStatusCode } from '../types/http.type.js';
import { HttpException } from './http.exception.js';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('invalid credentials', HttpStatusCode.UNAUTHORIZED);
  }
}

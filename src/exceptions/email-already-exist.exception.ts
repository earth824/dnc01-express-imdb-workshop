import { HttpStatusCode } from '../types/http.type.js';
import { HttpException } from './http.exception.js';

export class EmailAlreadyExistException extends HttpException {
  constructor() {
    super('email already in use', HttpStatusCode.CONFLICT);
  }
}

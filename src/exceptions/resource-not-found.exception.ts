import { HttpStatusCode } from '../types/http.type.js';
import { HttpException } from './http.exception.js';

export class ResourceNotFoundException extends HttpException {
  constructor() {
    super(
      'the requested resource could not be found',
      HttpStatusCode.NOT_FOUND
    );
  }
}

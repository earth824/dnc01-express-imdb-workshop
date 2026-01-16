import { ResourceNotFoundException } from '../exceptions/resource-not-found.exception.js';

export const notFound = (): void => {
  throw new ResourceNotFoundException();
};

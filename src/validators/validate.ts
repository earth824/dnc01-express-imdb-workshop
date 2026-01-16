import { z, type ZodType } from 'zod';
import { ValidationException } from '../exceptions/validation.exception.js';

export const validate = <T extends ZodType>(
  schema: T,
  input: unknown
): z.infer<typeof schema> => {
  const { success, data, error } = schema.safeParse(input);
  if (!success) {
    throw new ValidationException(z.flattenError(error));
  }
  return data;
};

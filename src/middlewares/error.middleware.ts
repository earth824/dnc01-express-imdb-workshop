import type { NextFunction, Request, Response } from 'express';
import { HttpStatusCode, type ErrorResponse } from '../types/http.type.js';
import { HttpException } from '../exceptions/http.exception.js';

export const error = (
  err: unknown,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
): void => {
  if (err instanceof HttpException) {
    res
      .status(err.statusCode)
      .json({ message: err.message, details: err.details });
    return;
  }

  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: err instanceof Error ? err.message : 'unexpected error occurred'
  });
};

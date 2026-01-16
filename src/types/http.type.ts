export const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
} as const;

export type HttpStatusCode =
  (typeof HttpStatusCode)[keyof typeof HttpStatusCode];

export type ErrorResponse = {
  message: string;
  details?: unknown;
};

export type MessageResponse = {
  message: string;
};

export type DataResponse<T> = {
  data: T;
};

export type RegisterSuccessResponse = MessageResponse;
export type LoginSuccessResponse = DataResponse<{ access_token: string }>;

import type { JwtPayload } from 'jsonwebtoken';

export const roles = ['admin', 'user'] as const;

export type Role = (typeof roles)[number];

export type UserPayload = {
  sub: string;
  role: Role;
};

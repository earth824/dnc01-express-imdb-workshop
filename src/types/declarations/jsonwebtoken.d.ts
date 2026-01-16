import 'jsonwebtoken';
import type { Role, UserPayload } from '../user.type.ts';

declare module 'jsonwebtoken' {
  interface JwtPayload extends UserPayload {}
}

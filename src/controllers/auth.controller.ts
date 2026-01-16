import type { Request, Response } from 'express';
import {
  validateLogin,
  validateRegister
} from '../validators/auth.validator.js';
import bcrypt from 'bcrypt';
import { env } from '../config/env.config.js';
import { prisma } from '../db/prisma.js';
import { PrismaClientKnownRequestError } from '../db/generated/prisma/internal/prismaNamespace.js';
import { EmailAlreadyExistException } from '../exceptions/email-already-exist.exception.js';
import {
  HttpStatusCode,
  type LoginSuccessResponse,
  type RegisterSuccessResponse
} from '../types/http.type.js';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception.js';
import jwt from 'jsonwebtoken';
import type { UserPayload } from '../types/user.type.js';

const register = async (
  req: Request,
  res: Response<RegisterSuccessResponse>
): Promise<void> => {
  const data = validateRegister(req.body);

  data.password = await bcrypt.hash(data.password, env.SALT_ROUND);

  try {
    await prisma.user.create({ data });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new EmailAlreadyExistException();
    }
    throw err;
  }

  res
    .status(HttpStatusCode.CREATED)
    .json({ message: 'registered successfully' });
};

const login = async (
  req: Request,
  res: Response<LoginSuccessResponse>
): Promise<void> => {
  const { email, password } = validateLogin(req.body);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new InvalidCredentialsException();
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new InvalidCredentialsException();
  }

  const payload: UserPayload = { sub: String(user.id), role: user.role };
  const accessToken = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
  res.status(HttpStatusCode.OK).json({ data: { access_token: accessToken } });
};

export const authController = { register, login };

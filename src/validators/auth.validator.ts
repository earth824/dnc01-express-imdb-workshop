import z from 'zod';
import { roles } from '../types/user.type.js';
import { validate } from './validate.js';

const registerSchema = z
  .object({
    email: z.email('invalid email address'),
    password: z
      .string('password is required and must be a string')
      .regex(
        /^[A-Za-z0-9]{6,}$/,
        'password must have at least 6 characters and contain only letters and numbers'
      ),
    confirmPassword: z
      .string('confirm password is required and must be a string')
      .min(1, 'confirm password cannot be empty'),
    role: z
      .enum(roles, 'role must be one of the following value: admin, user')
      .optional()
      .default('user')
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    error: 'password and confirm password did not match'
  })
  .transform(({ confirmPassword, ...excludeConfirm }) => excludeConfirm);

export const loginSchema = z.object({
  email: z.email('invalid email address'),
  password: z
    .string('password is required and must be a string')
    .min(1, 'password cannot be empty')
});

export const validateRegister = (input: unknown) =>
  validate(registerSchema, input);
export const validateLogin = (input: unknown) => validate(loginSchema, input);

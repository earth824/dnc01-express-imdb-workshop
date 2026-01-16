import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().min(0).max(65535),
  DATABASE_URL: z.url(),
  SALT_ROUND: z.coerce.number().int().min(10),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.coerce.number().positive()
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.log('env validation error');
  console.log(z.prettifyError(error));
  throw error;
}

export const env = data;

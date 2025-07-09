import { z } from 'zod/v4';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  DATABASE_URL: z.string().startsWith('postgresql://'),
});

export const env = envSchema.parse(process.env);

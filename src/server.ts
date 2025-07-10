import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { roomRoutes } from './routes/rooms.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: env.FRONTEND_URL,
});

app.setSerializerCompiler(serializerCompiler);

app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return 'OK';
});

app.register(roomRoutes);

app.listen({
  port: env.PORT,
});

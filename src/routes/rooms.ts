import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import {
  createRoom,
  createRoomQuestion,
  getRooms,
  getRoomsQuestions,
} from '../controllers/rooms.ts';
import {
  CreateRoomBodySchema,
  CreateRoomQuestionBodySchema,
  CreateRoomQuestionParamsSchema,
  GetRoomQuestionsParamsSchema,
} from '../schemas/rooms.ts';

export const roomRoutes: FastifyPluginCallbackZod = (app) => {
  // GET
  app.get('/rooms', getRooms);

  app.get(
    '/rooms/:room_id/questions',
    {
      schema: {
        params: GetRoomQuestionsParamsSchema,
      },
    },
    getRoomsQuestions
  );

  // POST

  app.post(
    '/rooms',
    {
      schema: {
        body: CreateRoomBodySchema,
      },
    },
    createRoom
  );

  app.post(
    '/rooms/:room_id/questions',
    {
      schema: {
        body: CreateRoomQuestionBodySchema,
        params: CreateRoomQuestionParamsSchema,
      },
    },
    createRoomQuestion
  );
};

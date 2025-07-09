import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../db/connection.ts';
import { schema } from '../db/schema/index.ts';

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async () => {
    const { rooms: roomsTable } = schema;

    const results = await db
      .select({
        id: roomsTable.id,
        name: roomsTable.name,
      })
      .from(roomsTable)
      .orderBy(roomsTable.created_at);

    return results;
  });
};

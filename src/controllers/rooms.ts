import { count, desc, eq } from 'drizzle-orm';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ReplyDefault } from 'fastify/types/utils.js';
import { success } from 'zod/v4';
import { db } from '../db/connection.ts';
import { schema } from '../db/schema/index.ts';
import type {
  CreateRoomBody,
  CreateRoomQuestionBody,
  CreateRoomQuestionParams,
  GetRoomQuestionsParams,
} from '../schemas/rooms.ts';

export const getRooms = async () => {
  const { rooms: roomsTable, questions: questionsTable } = schema;

  const results = await db
    .select({
      id: roomsTable.id,
      name: roomsTable.name,
      questions_count: count(questionsTable.id),
      crated_at: roomsTable.created_at,
    })
    .from(roomsTable)
    .leftJoin(questionsTable, eq(questionsTable.room_id, roomsTable.id))
    .groupBy(roomsTable.id, roomsTable.name)
    .orderBy(roomsTable.created_at);

  return {
    success: true,
    data: results,
  };
};

export const getRoomsQuestions = async (
  request: FastifyRequest<{ Params: GetRoomQuestionsParams }>,
  reply: FastifyReply
) => {
  const { questions: questionsTable } = schema;
  const { room_id } = request.params;

  const results = await db
    .select({
      id: questionsTable.id,
      question: questionsTable.question,
      answer: questionsTable.answer,
      created_at: questionsTable.created_at,
    })
    .from(questionsTable)
    .where(eq(questionsTable.room_id, room_id))
    .orderBy(desc(questionsTable.created_at));

  return reply.status(200).send({
    success: true,
    data: results,
  });
};

export async function createRoom(
  request: FastifyRequest<{ Body: CreateRoomBody }>,
  reply: FastifyReply
) {
  const { name, description } = request.body;

  const result = await db
    .insert(schema.rooms)
    .values({
      name,
      description,
    })
    .returning();

  const insertedRoom = result[0];

  if (!insertedRoom) {
    throw new Error('Failed to create new room');
  }

  return reply.status(201).send({
    success: true,
    message: 'Room created',
    data: {
      room_id: insertedRoom.id,
    },
  });
}

export async function createRoomQuestion(
  request: FastifyRequest<{
    Body: CreateRoomQuestionBody;
    Params: CreateRoomQuestionParams;
  }>,
  reply: FastifyReply
) {
  const { question } = request.body;
  const { room_id } = request.params;

  const result = await db
    .insert(schema.questions)
    .values({
      question,
      room_id,
    })
    .returning();

  const insertedQuestion = result[0];

  if (!insertedQuestion) {
    throw new Error('Failed to create new question');
  }

  return reply.status(201).send({
    success: true,
    message: 'Question created',
    data: {
      room_id: insertedQuestion.id,
    },
  });
}

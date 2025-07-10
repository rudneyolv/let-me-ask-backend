import { z } from 'zod/v4';

// ------------------ Get Room------------------
export const GetRoomQuestionsParamsSchema = z.object({
  room_id: z.string(),
});

export type GetRoomQuestionsParams = z.infer<
  typeof GetRoomQuestionsParamsSchema
>;

// ------------------ Create Room------------------
export const CreateRoomBodySchema = z.object({
  name: z.string().min(1, 'The room name is required'),
  description: z.string().optional(),
});

export type CreateRoomBody = z.infer<typeof CreateRoomBodySchema>;

// ------------------ Create Room Question------------------
export const CreateRoomQuestionBodySchema = z.object({
  question: z.string().min(1, 'Question is required'),
});

export type CreateRoomQuestionBody = z.infer<
  typeof CreateRoomQuestionBodySchema
>;

export const CreateRoomQuestionParamsSchema = z.object({
  room_id: z.string(),
});

export type CreateRoomQuestionParams = z.infer<
  typeof CreateRoomQuestionParamsSchema
>;

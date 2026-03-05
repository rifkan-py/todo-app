import { z } from 'zod';

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string({
      message: 'Title is required',
    }),
    description: z.string().optional(),
    done: z.boolean().optional(),
  }),
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    done: z.boolean().optional(),
  }),
});

export const getTodoSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});


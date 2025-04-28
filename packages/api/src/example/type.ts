import { z } from 'zod';

export type Example = z.infer<typeof Example>;
export const Example = z.object({
  id: z.string(),
  name: z.string(),
});

export const GetExampleListResponse = z.object({
  data: z.array(Example),
  total: z.number(),
});

export const GetExampleByIdResponse = Example;

export type CreateExampleBody = {
  name: string;
};

export type UpdateExampleBody = {
  name: string;
};

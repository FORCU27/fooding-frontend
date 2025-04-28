import { z } from 'zod';

import { ApiResponse } from '../shared';

export type Example = z.infer<typeof Example>;
export const Example = z.object({
  id: z.string(),
  name: z.string(),
});

export const GetExampleListResponse = ApiResponse(
  z.object({
    data: z.array(Example),
    total: z.number(),
  }),
);

export const GetExampleByIdResponse = ApiResponse(Example);

export type CreateExampleBody = {
  name: string;
};

export type UpdateExampleBody = {
  name: string;
};

import z from 'zod';

import { api } from './shared';

const ENDPOINT = '/example';

type Example = z.infer<typeof Example>;
const Example = z.object({
  id: z.string(),
  name: z.string(),
});

const GetExampleListResponse = z.object({
  data: z.array(Example),
  total: z.number(),
});

const GetExampleByIdResponse = Example;

type CreateExampleBody = {
  name: string;
};

type UpdateExampleBody = {
  name: string;
};

export const exampleApi = {
  getExampleList: async () => {
    return GetExampleListResponse.parse(api.get(ENDPOINT));
  },
  getExampleById: async (id: string) => {
    return GetExampleByIdResponse.parse(api.get(`${ENDPOINT}/${id}`));
  },
  createExample: async (body: CreateExampleBody) => {
    return api.post(ENDPOINT, body);
  },
  updateExample: async ({ id, body }: { id: string; body: UpdateExampleBody }) => {
    return api.put(`${ENDPOINT}/${id}`, body);
  },
  deleteExample: async (id: string) => {
    return api.delete(`${ENDPOINT}/${id}`);
  },
};

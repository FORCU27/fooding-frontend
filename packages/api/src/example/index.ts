export * from './type';

import { api } from '../shared';
import {
  CreateExampleBody,
  GetExampleByIdResponse,
  GetExampleListResponse,
  UpdateExampleBody,
} from './type';

export const ENDPOINT = 'https://api-stage.fooding.im'; // TODO 임시로 stage로 변경한 url 수정 필요

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

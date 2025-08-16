export * from './type';

import { PutStoreBody, GetStoreApiResponse, GetStoreResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/ceo/stores';

export const storeApi = {
  getStore: async (id: number): Promise<GetStoreResponse> => {
    const response = await api.get(`${ENDPOINT}/${id}`);

    // 빈 객체 체크
    if (!response || Object.keys(response).length === 0) {
      throw new Error('Empty response from server');
    }

    const parsed = GetStoreApiResponse.parse(response);
    return parsed.data;
  },
  putStore: async ({ id, body }: { id: number; body: PutStoreBody }) => {
    const response = await api.put(`${ENDPOINT}/${id}`, body);
    return response;
  },
};

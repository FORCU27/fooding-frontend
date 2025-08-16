export * from './type';

import { PutStoreBody, GetStoreV2ApiResponse, GetStoreResponseV2 } from './type';
import { api } from '../../shared';

const ENDPOINT = '/ceo/stores';

export const storeApiV2 = {
  getStoreV2: async (id: number): Promise<GetStoreResponseV2> => {
    const response = await api.get(`${ENDPOINT}/${id}`);

    // 빈 객체 체크
    if (!response || Object.keys(response).length === 0) {
      throw new Error('Empty response from server');
    }

    const parsed = GetStoreV2ApiResponse.parse(response);
    return parsed.data;
  },
  putStore: async ({ id, body }: { id: number; body: PutStoreBody }) => {
    const response = await api.put(`${ENDPOINT}/${id}`, body);
    return response;
  },
};

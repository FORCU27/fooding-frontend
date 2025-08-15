export * from './type';

import { PutStoreBody, GetStoreApiResponse, GetStoreResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/ceo/stores';

export const storeApi = {
  getStore: async (id: number): Promise<GetStoreResponse> => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    console.log('Raw API response:', response);
    try {
      const parsed = GetStoreApiResponse.parse(response);
      return parsed.data;
    } catch (error) {
      console.error('Zod parsing error:', error);
      console.error('Response that failed parsing:', response);
      throw error;
    }
  },
  putStore: async ({ id, body }: { id: number; body: PutStoreBody }) => {
    await api.put(`${ENDPOINT}/${id}`, body);
  },
};

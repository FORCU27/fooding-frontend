export * from './type';

import { PutStoreBody, GetStoreApiResponse, GetStoreResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/ceo/stores';

export const storeApi = {
  getStore: async (id: number): Promise<GetStoreResponse> => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    console.log('Raw API response:', response);

    // 빈 객체 체크
    if (!response || Object.keys(response).length === 0) {
      console.error('Empty response received from API');
      throw new Error('Empty response from server');
    }

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
    const response = await api.put(`${ENDPOINT}/${id}`, body);
    console.log('PUT response:', response);
    return response;
  },
};

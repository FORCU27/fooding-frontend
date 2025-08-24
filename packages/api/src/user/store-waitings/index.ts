export * from './type';
import { GetWaitingDetailResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/store-waitings';

export const storeWaitingApi = {
  getWaitingById: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetWaitingDetailResponse.parse(response);
  },
};

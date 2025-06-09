export * from './type';
export * from './mock';

import { GetStoreByIdResponse, GetStoreListParams, GetStoreListResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/stores';

export const storeApi = {
  getStoreList: async (params: GetStoreListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetStoreListResponse.parse(response);
  },
  getStoreById: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetStoreByIdResponse.parse(response);
  },
};

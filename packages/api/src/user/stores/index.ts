export * from './type';

import { GetStoreListParams, GetStoreListReponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/stores';

export const storeApi = {
  getStoreList: async (params: GetStoreListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetStoreListReponse.parse(response);
  },
  getStoreInfoById: async (id: number) => {
    return await api.get(`${ENDPOINT}/${id}`);
  },
};

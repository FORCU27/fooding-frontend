export * from './type';

import { GetStoresResponse, GetStoreServiceListResponse, GetStoresParams } from './type';
import { api } from '../../shared';

export const storeApi = {
  getStores: async (params: GetStoresParams) => {
    const response = await api.get(`/app/stores`, { params });
    return GetStoresResponse.parse(response);
  },
  getStoreServiceList: async (params: { id: number }) => {
    const response = await api.get(`/app/store-service/${params.id}`);
    return GetStoreServiceListResponse.parse(response);
  },
};

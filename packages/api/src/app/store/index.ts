export * from './type';

import { GetStoresResponse, GetStoreServiceListResponse } from './type';
import { api } from '../../shared';

export const storeApi = {
  getStores: async (params: { searchString: string; pageNum: number; pageSize: number }) => {
    const response = await api.get(`/app/stores`, { params });
    return GetStoresResponse.parse(response);
  },
  getStoreServiceList: async (params: { id: number }) => {
    const response = await api.get(`/app/store-service/${params.id}`);
    return GetStoreServiceListResponse.parse(response);
  },
};

export * from './type';

import { GetStoresResponse } from './type';
import { api } from '../../shared';

export const storeApi = {
  getStores: async (params: { searchString: string; pageNum: number; pageSize: number }) => {
    const response = await api.get(`/app/stores`, { params });
    return GetStoresResponse.parse(response);
  },
};

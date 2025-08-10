import { CreateStoreBody, GetStoreResponse, GetStoreListResponse } from './type';
import { api } from '../../shared';

export * from './type';
export * from './mock';

export const storeApi = {
  getStores: async () => {
    const response = await api.get(`/ceo/stores`);
    return GetStoreListResponse.parse(response);
  },
  createStore: async (body: CreateStoreBody) => {
    await api.post(`/ceo/stores`, body);
  },
  getStore: async (id: number) => {
    const response = await api.get(`/ceo/store/${id}`);
    return GetStoreResponse.parse(response);
  },
};

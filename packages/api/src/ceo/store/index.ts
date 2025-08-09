import { CreateStoreBody } from './type';
import { api } from '../../shared';

export * from './type';

export const storeApi = {
  getStores: async () => {
    const response = await api.get(`/ceo/stores`);
    return;
  },
  createStore: async (body: CreateStoreBody) => {
    await api.post(`/ceo/stores`, body);
  },
  getStore: async (id: number) => {
    const response = await api.get(`/ceo/store/${id}`);
    return;
  },
};

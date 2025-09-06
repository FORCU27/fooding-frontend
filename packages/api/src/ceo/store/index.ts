import { AxiosRequestConfig } from 'axios';

import { CreateStoreBody, GetStoreResponse, GetStoreListResponse } from './type';
import { api } from '../../shared';

export * from './type';
export * from './mock';

export const storeApi = {
  getStores: async (config?: AxiosRequestConfig) => {
    const response = await api.get(`/ceo/stores`, config);
    return GetStoreListResponse.parse(response);
  },
  createStore: async (body: CreateStoreBody) => {
    await api.post(`/ceo/stores`, body);
  },
  getStore: async (id: number, config?: AxiosRequestConfig) => {
    const response = await api.get(`/ceo/stores/${id}`, config);
    return GetStoreResponse.parse(response);
  },
};

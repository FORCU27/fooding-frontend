import { AxiosRequestConfig } from 'axios';

import {
  CreateStoreBody,
  GetStoreResponse,
  GetStoreListResponse,
  GetStoreOperatingHourResponse,
  StoreOperatingHourBody,
  UpdateStoreBody,
} from './type';
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
  updateStore: async ({ id, body }: { id: number; body: UpdateStoreBody }) => {
    await api.put(`/ceo/stores/${id}`, body);
  },
  deleteStore: async (id: number) => {
    await api.delete(`/ceo/stores/${id}`);
  },
  getStore: async (id: number, config?: AxiosRequestConfig) => {
    const response = await api.get(`/ceo/stores/${id}`, config);
    return GetStoreResponse.parse(response);
  },
  getStoreOperatingHour: async (id: number) => {
    const response = await api.get(`/ceo/stores/${id}/operating-hour`);
    return GetStoreOperatingHourResponse.parse(response);
  },
  createStoreOperatingHour: async (id: number, body: StoreOperatingHourBody) => {
    await api.post(`/ceo/stores/${id}/operating-hour`, body);
  },
};

import { AxiosRequestConfig } from 'axios';

import {
  CreateStoreBody,
  GetStoreResponse,
  GetStoreListResponse,
  GetStoreOperatingHourResponse,
  StoreOperatingHourBody,
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

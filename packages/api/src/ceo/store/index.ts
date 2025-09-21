import { AxiosRequestConfig } from 'axios';

import {
  CreateStoreBody,
  GetStoreResponse,
  GetStoreListResponse,
  GetStoreOperatingHourResponse,
  StoreOperatingHourBody,
  GetStorePointShopListResponse,
  GetStorePointShopResponse,
  CreateStorePointShopResponse,
  GetStorePointShopStatusResponse,
  PointShopQuery,
  CreateStorePointShopItemBody,
} from './type';
import { api } from '../../shared';

export * from './type';
export * from './mock';

const ENDPOINT = '/ceo/stores';

export const storeApi = {
  getStores: async (config?: AxiosRequestConfig) => {
    const response = await api.get(ENDPOINT, config);
    return GetStoreListResponse.parse(response);
  },
  createStore: async (body: CreateStoreBody) => {
    await api.post(ENDPOINT, body);
  },
  getStore: async (id: number, config?: AxiosRequestConfig) => {
    const response = await api.get(`${ENDPOINT}/${id}`, config);
    return GetStoreResponse.parse(response);
  },
  getStoreOperatingHour: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}/operating-hour`);
    return GetStoreOperatingHourResponse.parse(response);
  },
  createStoreOperatingHour: async (id: number, body: StoreOperatingHourBody) => {
    await api.post(`${ENDPOINT}/${id}/operating-hour`, body);
  },
  getStorePointShopList: async (storeId: number, query: PointShopQuery) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/point-shop`, {
      params: query,
    });
    return GetStorePointShopListResponse.parse(response);
  },
  getStorePointShopItemById: async (storeId: number, id: number, query: PointShopQuery) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/point-shop/${id}`, {
      params: query,
    });
    return GetStorePointShopResponse.parse(response);
  },
  createStorePointShopItem: async (storeId: number, body: CreateStorePointShopItemBody) => {
    const response = await api.post(`${ENDPOINT}/${storeId}/point-shop`, body);
    return CreateStorePointShopResponse.parse(response);
  },
  updateStorePointShopItem: async (
    storeId: number,
    id: number,
    body: CreateStorePointShopItemBody,
  ) => {
    const response = await api.put(`${ENDPOINT}/${storeId}/point-shop/${id}`, body);
    return GetStorePointShopStatusResponse.parse(response);
  },
  updateStorePointShopItemActive: async (storeId: number, id: number) => {
    const response = await api.put(`${ENDPOINT}/${storeId}/point-shop/${id}/active`);
    return GetStorePointShopStatusResponse.parse(response);
  },
  updateStorePointShopItemInactive: async (storeId: number, id: number) => {
    const response = await api.put(`${ENDPOINT}/${storeId}/point-shop/${id}/inactive`);
    return GetStorePointShopStatusResponse.parse(response);
  },
};

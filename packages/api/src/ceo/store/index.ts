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
  UpdateStoreBody,
  GetStorePointShopNullResponse,
  GetStoreStatisticsResponse,
  GetStoreStatisticsParams,
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
  getStoreOperatingHour: async (storeId: number) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/operating-hour`);
    return GetStoreOperatingHourResponse.parse(response);
  },
  createStoreOperatingHour: async (storeId: number, body: StoreOperatingHourBody) => {
    await api.post(`${ENDPOINT}/${storeId}/operating-hour`, body);
  },
  updateStoreOperatingHour: async (storeId: number, id: number, body: StoreOperatingHourBody) => {
    await api.put(`${ENDPOINT}/${storeId}/operating-hour/${id}`, body);
  },
  deleteStoreOperatingHour: async (storeId: number, id: number) => {
    await api.delete(`${ENDPOINT}/${storeId}/operating-hour/${id}`);
  },
  getStorePointShopList: async (storeId: string, query: PointShopQuery) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/point-shop`, {
      params: query,
    });
    return GetStorePointShopListResponse.parse(response);
  },
  getStorePointShopItemById: async (storeId: string, id: string) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/point-shop/${id}`);
    return GetStorePointShopResponse.parse(response);
  },
  createStorePointShopItem: async (storeId: number, body: CreateStorePointShopItemBody) => {
    const response = await api.post(`${ENDPOINT}/${storeId}/point-shop`, body);
    return CreateStorePointShopResponse.parse(response);
  },
  updateStorePointShopItem: async (
    storeId: string,
    id: string,
    body: CreateStorePointShopItemBody,
  ) => {
    const response = await api.put(`${ENDPOINT}/${storeId}/point-shop/${id}`, body);
    return GetStorePointShopNullResponse.parse(response);
  },
  updateStorePointShopItemActive: async (storeId: number, id: number) => {
    const response = await api.put(`${ENDPOINT}/${storeId}/point-shop/${id}/active`);
    return GetStorePointShopStatusResponse.parse(response);
  },
  updateStorePointShopItemInactive: async (storeId: number, id: number) => {
    const response = await api.put(`${ENDPOINT}/${storeId}/point-shop/${id}/inactive`);
    return GetStorePointShopStatusResponse.parse(response);
  },
  updateStore: async ({ id, body }: { id: number; body: UpdateStoreBody }) => {
    await api.put(`/ceo/stores/${id}`, body);
  },
  deleteStore: async (id: number) => {
    await api.delete(`/ceo/stores/${id}`);
  },
  getStatistics: async ({ storeId, date }: GetStoreStatisticsParams) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/statistics`, {
      params: { date },
    });
    return GetStoreStatisticsResponse.parse(response);
  },
};

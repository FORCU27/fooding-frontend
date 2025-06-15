export * from './type';

import {
  GetStoresResponse,
  GetStoreServiceListResponse,
  GetStoresParams,
  CreateStoreWaitingRequest,
  GetStoresWaitingResponse,
  PostStoreWaitingRequest,
  GetStoreWaitingOverviewResponse,
} from './type';
import { api } from '../../shared';

export const storeApi = {
  getStores: async () => {
    const response = await api.get(`/app/stores`);
    return GetStoresResponse.parse(response);
  },
  getStoreServiceList: async (params: { id: number }) => {
    const response = await api.get(`/app/store-service/${params.id}`);
    return GetStoreServiceListResponse.parse(response);
  },

  getStoreWaiting: async (params: { id: number; status: string }) => {
    const response = await api.get(`/app/waitings/${params.id}/requests`, { params });
    return GetStoresWaitingResponse.parse(response);
  },

  getStoreWaitingOverview: async (params: { id: number }) => {
    const response = await api.get(`/app/waitings/${params.id}/overview`);
    return GetStoreWaitingOverviewResponse.parse(response);
  },

  createStoreWaiting: async (params: CreateStoreWaitingRequest, storeId: number) => {
    const response = await api.post(`/app/waitings/${storeId}/requests`, params.body);
    return PostStoreWaitingRequest.parse(response);
  },
};

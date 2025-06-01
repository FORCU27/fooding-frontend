export * from './type';

import {
  GetStoresResponse,
  GetStoreServiceListResponse,
  GetWaitingDetailResponse,
  CreateStoreWaitingRequest,
} from './type';
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

  getStoreWaiting: async (params: { id: number; status: string }) => {
    const response = await api.get(`/app/waitings/${params.id}/requests`, { params });
    return GetWaitingDetailResponse.parse(response);
  },

  createStoreWaiting: async (params: CreateStoreWaitingRequest, storeId: number) => {
    const response = await api.post(`/app/waitings/${storeId}/requests`, params);
    return CreateStoreWaitingRequest.parse(response);
  },
};

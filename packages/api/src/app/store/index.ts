export * from './type';

import {
  GetStoresResponse,
  GetStoreServiceListResponse,
  CreateStoreWaitingRequest,
  GetStoresWaitingResponse,
  PostStoreWaitingResponse,
  GetStoreWaitingOverviewResponse,
  GetUserWaitingAvailableResponse,
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
    const response = await api.get(`/app/waitings/stores/${params.id}/requests/overview`);
    return GetStoreWaitingOverviewResponse.parse(response);
  },

  createStoreWaiting: async (params: CreateStoreWaitingRequest, storeId: number) => {
    const response = await api.post(`/app/waitings/stores/${storeId}/requests`, params.body);
    return PostStoreWaitingResponse.parse(response);
  },

  getUserWaitingAvailable: async (storeId: number) => {
    const response = await api.get(`/user/stores/${storeId}/waitings/available`);
    return GetUserWaitingAvailableResponse.parse(response);
  },

  // 웨이팅 목록 조회
  getWaitingList: async (params: {
    storeId: number;
    pageNum?: number;
    pageSize?: number;
    status?: string;
  }) => {
    const { storeId, pageNum = 1, pageSize = 20, status = 'WAITING' } = params;
    const response = await api.get(`/app/waitings/stores/${storeId}/requests`, {
      params: { pageNum, pageSize, status },
    });
    return GetStoresWaitingResponse.parse(response);
  },
};

export * from './type';

import {
  CreateStoreServiceRequest,
  RetrieveStoreServiceRequest,
  GetStoreServiceListResponse,
  GetStoreServiceDetailResponse,
} from './type';
import { api } from '../../shared';

export const storeServiceApi = {
  getStoreServiceList: async (params: RetrieveStoreServiceRequest) => {
    const response = await api.get('/admin/service', { params });
    return GetStoreServiceListResponse.parse(response);
  },

  getStoreServiceDetail: async (id: number) => {
    const response = await api.get(`/admin/service/${id}`);
    return GetStoreServiceDetailResponse.parse(response);
  },

  createStoreService: async (data: CreateStoreServiceRequest) => 
    api.post('/admin/service', data),

  activateStoreService: async (id: number) =>
    api.post(`/admin/service/active/${id}`),

  inactivateStoreService: async (id: number) =>
    api.post(`/admin/service/inactive/${id}`),

  deleteStoreService: async ({ id, deletedBy }: { id: number; deletedBy: number }) =>
    api.delete(`/admin/service/${id}`, { params: { deletedBy } }),
};
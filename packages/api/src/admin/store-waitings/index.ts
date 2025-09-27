export * from './type';

import {
  AdminStoreWaitingCreateRequest,
  AdminStoreWaitingUpdateRequest,
  GetAdminStoreWaitingListResponse,
  GetAdminStoreWaitingResponse,
} from './type';
import { api } from '../../shared';

const BASE = '/admin/waitings/requests';

export const adminStoreWaitingsApi = {
  list: async (
    page: number = 0,
    size: number = 20,
    filters?: { storeId?: number; status?: string }
  ) => {
    const params = new URLSearchParams({ pageNum: String(page), pageSize: String(size) });
    if (filters?.storeId != null) params.set('storeId', String(filters.storeId));
    if (filters?.status) params.set('status', filters.status);
    const response = await api.get(`${BASE}?${params.toString()}`);
    return GetAdminStoreWaitingListResponse.parse(response);
  },

  get: async (id: number) => {
    const response = await api.get(`${BASE}/${id}`);
    return GetAdminStoreWaitingResponse.parse(response);
  },

  create: async (body: AdminStoreWaitingCreateRequest) => {
    return api.post(`${BASE}`, body);
  },

  update: async (id: number, body: AdminStoreWaitingUpdateRequest) => {
    return api.put(`${BASE}/${id}`, body);
  },

  delete: async (id: number) => {
    return api.delete(`${BASE}/${id}`);
  },
};
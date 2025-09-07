export * from './type';

import { api } from '../../shared';
import {
  AdminWaitingCreateRequest,
  AdminWaitingUpdateRequest,
  GetAdminWaitingListResponse,
  GetAdminWaitingResponse,
} from './type';

const BASE = '/admin/waitings';

export const adminWaitingsApi = {
  list: async (
    page: number = 0,
    size: number = 20,
    filters?: { storeId?: number; status?: string }
  ) => {
    const params = new URLSearchParams({ pageNum: String(page), pageSize: String(size) });
    if (filters?.storeId != null) params.set('storeId', String(filters.storeId));
    if (filters?.status) params.set('status', filters.status);
    const response = await api.get(`${BASE}?${params.toString()}`);
    return GetAdminWaitingListResponse.parse(response);
  },

  get: async (id: number) => {
    const response = await api.get(`${BASE}/${id}`);
    return GetAdminWaitingResponse.parse(response);
  },

  create: async (body: AdminWaitingCreateRequest) => {
    return api.post(`${BASE}`, body);
  },

  update: async (id: number, body: AdminWaitingUpdateRequest) => {
    return api.put(`${BASE}/${id}`, body);
  },

  delete: async (id: number) => {
    return api.delete(`${BASE}/${id}`);
  },
};


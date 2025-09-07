export * from './type';

import { api } from '../../shared';
import {
  AdminWaitingSettingCreateRequest,
  AdminWaitingSettingUpdateRequest,
  GetAdminWaitingSettingListResponse,
  GetAdminWaitingSettingResponse,
} from './type';

const BASE = '/admin/waitings/settings';

export const adminWaitingSettingsApi = {
  list: async (
    page: number = 0,
    size: number = 20,
    filters?: { waitingId?: number; isActive?: boolean }
  ) => {
    const params = new URLSearchParams({ pageNum: String(page), pageSize: String(size) });
    if (filters?.waitingId != null) params.set('waitingId', String(filters.waitingId));
    if (filters?.isActive != null) params.set('isActive', String(filters.isActive));
    const response = await api.get(`${BASE}?${params.toString()}`);
    return GetAdminWaitingSettingListResponse.parse(response);
  },

  get: async (id: number) => {
    const response = await api.get(`${BASE}/${id}`);
    return GetAdminWaitingSettingResponse.parse(response);
  },

  create: async (body: AdminWaitingSettingCreateRequest) => {
    return api.post(`${BASE}`, body);
  },

  update: async (id: number, body: AdminWaitingSettingUpdateRequest) => {
    return api.put(`${BASE}/${id}`, body);
  },

  delete: async (id: number) => {
    return api.delete(`${BASE}/${id}`);
  },
};


export * from './type';

import {
  AdminWaitingSettingCreateRequest,
  AdminWaitingSettingUpdateRequest,
  GetAdminWaitingSettingListResponse,
  GetAdminWaitingSettingResponse,
} from './type';
import { api } from '../../shared';

const BASE = '/admin/waitings/settings';

export const adminWaitingSettingsApi = {
  list: async (
    page: number = 0,
    size: number = 20,
    filters?: { storeServiceId?: number; isActive?: boolean }
  ) => {
    const params = new URLSearchParams({ pageNum: String(page), pageSize: String(size) });
    if (filters?.storeServiceId != null) params.set('storeServiceId', String(filters.storeServiceId));
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

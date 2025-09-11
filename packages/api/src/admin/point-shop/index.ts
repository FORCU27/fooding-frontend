export * from './type';

import {
  AdminCreatePointShopRequest,
  AdminUpdatePointShopRequest,
  GetAdminPointShopListResponse,
  GetAdminPointShopResponse,
} from './type';
import { api } from '../../shared';

const BASE = '/admin/point-shop';

export const adminPointShopApi = {
  list: async (
    storeId: number,
    page: number = 0,
    size: number = 10,
    isActive: boolean = true,
    searchString?: string,
  ) => {
    const params = new URLSearchParams({
      pageNum: String(page),
      pageSize: String(size),
      storeId: String(storeId),
      isActive: String(isActive),
    });
    if (searchString && searchString.trim()) params.set('searchString', searchString);
    const response = await api.get(`${BASE}?${params.toString()}`);
    return GetAdminPointShopListResponse.parse(response);
  },

  retrieve: async (id: number) => {
    const response = await api.get(`${BASE}/${id}`);
    return GetAdminPointShopResponse.parse(response);
  },

  create: async (body: AdminCreatePointShopRequest) => {
    return api.post(`${BASE}`, body);
  },

  update: async (id: number, body: AdminUpdatePointShopRequest) => {
    return api.put(`${BASE}/${id}`, body);
  },

  delete: async (id: number) => {
    return api.delete(`${BASE}/${id}`);
  },

  activate: async (id: number) => {
    return api.put(`${BASE}/${id}/active`);
  },

  inactivate: async (id: number) => {
    return api.put(`${BASE}/${id}/inactive`);
  },
};

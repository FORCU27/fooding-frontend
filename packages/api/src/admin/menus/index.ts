export * from './type';

import { api } from '../../shared';
import {
  AdminMenuCreateRequest,
  AdminMenuUpdateRequest,
  AdminMenuResponseSchema,
  GetMenuListResponse,
} from './type';

const ENDPOINT = '/admin/menus';

export const menuApi = {
  getMenuList: async (
    page: number = 0,
    size: number = 10,
    filters?: { storeId?: number; searchString?: string },
  ) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
      pageSize: size.toString(),
    });
    if (filters?.storeId != null) params.set('storeId', String(filters.storeId));
    if (filters?.searchString) params.set('searchString', filters.searchString);
    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetMenuListResponse.parse(response);
  },

  getMenu: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return AdminMenuResponseSchema.parse(response);
  },

  createMenu: async (body: AdminMenuCreateRequest) => api.post(ENDPOINT, body),

  updateMenu: async (id: number, body: AdminMenuUpdateRequest) => api.put(`${ENDPOINT}/${id}`, body),

  deleteMenu: async (id: number) => api.delete(`${ENDPOINT}/${id}`),
};

export * from './type';

import { api } from '../../shared';
import {
  GetMenuCategoryListResponse,
  GetMenuCategoryResponse,
  AdminMenuCategoryCreateRequest,
  AdminMenuCategoryUpdateRequest,
} from './type';

const ENDPOINT = '/admin/menu-categories';

export const menuCategoryApi = {
  getCategoryList: async (
    page: number = 0,
    size: number = 10,
    filters?: { storeId?: number; searchString?: string },
  ) => {
    const params = new URLSearchParams({
      pageNum: (page).toString(),
      pageSize: size.toString(),
    });
    if (filters?.storeId != null) params.set('storeId', String(filters.storeId));
    if (filters?.searchString) params.set('searchString', filters.searchString);
    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetMenuCategoryListResponse.parse(response);
  },

  getCategory: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetMenuCategoryResponse.parse(response);
  },

  createCategory: async (body: AdminMenuCategoryCreateRequest) => api.post(ENDPOINT, body),

  updateCategory: async (id: number, body: AdminMenuCategoryUpdateRequest) =>
    api.put(`${ENDPOINT}/${id}`, body),

  deleteCategory: async (id: number) => api.delete(`${ENDPOINT}/${id}`),
};


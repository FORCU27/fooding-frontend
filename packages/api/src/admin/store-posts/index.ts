export * from './type';

import { api } from '../../shared';
import {
  AdminStorePostCreateRequest,
  AdminStorePostUpdateRequest,
  GetAdminStorePostListResponse,
  GetAdminStorePostResponse,
} from './type';

const BASE = '/admin/store-posts';

export const adminStorePostApi = {
  getList: async (
    storeId: number,
    page: number = 0,
    size: number = 10,
    searchString?: string,
  ) => {
    const params = new URLSearchParams({
      pageNum: (page).toString(),
      pageSize: size.toString(),
      storeId: String(storeId),
    });
    if (searchString && searchString.trim()) params.set('searchString', searchString);
    const response = await api.get(`${BASE}?${params.toString()}`);
    return GetAdminStorePostListResponse.parse(response);
  },

  getDetail: async (_storeId: number, id: number) => {
    const response = await api.get(`${BASE}/${id}`);
    return GetAdminStorePostResponse.parse(response);
  },

  create: async (storeId: number, body: Omit<AdminStorePostCreateRequest, 'storeId'>) => {
    const payload: AdminStorePostCreateRequest = { ...body, storeId } as AdminStorePostCreateRequest;
    return api.post(`${BASE}`, payload);
  },

  update: async (storeId: number, id: number, body: Omit<AdminStorePostUpdateRequest, 'storeId'>) => {
    const payload: AdminStorePostUpdateRequest = { ...body, storeId } as AdminStorePostUpdateRequest;
    return api.put(`${BASE}/${id}`, payload);
  },

  delete: async (_storeId: number, id: number) => {
    return api.delete(`${BASE}/${id}`);
  },
};

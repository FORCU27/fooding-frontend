export * from './type';

import {
  AdminStoreImageCreateRequest,
  AdminStoreImageUpdateRequest,
  GetAdminStoreImageListResponse,
  GetAdminStoreImageResponse,
  AdminStoreImageMainRequest,
} from './type';
import { api } from '../../shared';

const BASE = '/admin/stores';

export const adminStoreImageApi = {
  getList: async (storeId: number, page: number = 0, size: number = 10, searchTag?: string) => {
    const params = new URLSearchParams({
      pageNum: page.toString(),
      pageSize: size.toString(),
    });
    if (searchTag && searchTag.trim()) params.set('searchTag', searchTag);
    const response = await api.get(`${BASE}/${storeId}/images?${params.toString()}`);
    return GetAdminStoreImageListResponse.parse(response);
  },

  getDetail: async (storeId: number, id: number) => {
    const response = await api.get(`${BASE}/images/${id}`);
    return GetAdminStoreImageResponse.parse(response);
  },

  create: async (storeId: number, body: AdminStoreImageCreateRequest) => {
    return api.post(`${BASE}/images`, body);
  },

  update: async (storeId: number, id: number, body: AdminStoreImageUpdateRequest) => {
    return api.put(`${BASE}/images/${id}`, body);
  },

  delete: async (storeId: number, id: number) => {
    return api.delete(`${BASE}/images/${id}`);
  },

  updateMain: async (id: number, body: AdminStoreImageMainRequest) => {
    return api.put(`${BASE}/images/${id}/main`, body);
  },
};

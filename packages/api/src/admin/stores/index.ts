export * from './type';

import {
  AdminCreateStoreRequest,
  AdminUpdateStoreRequest,
  SortDirection,
  StoreSortType,
  AdminStoreResponseSchema,
  GetStoreListResponse,
  GetStoreResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/stores';

export const storeApi = {
  getStoreList: async (args?: {
    page?: number;
    size?: number;
    sortType?: StoreSortType;
    sortDirection?: SortDirection;
    searchString?: string;
    regionIds?: string[];
    category?: string;
    statuses?: string[];
    includeDeleted?: boolean;
  }) => {
    const {
      page = 0,
      size = 10,
      sortType = 'RECENT',
      sortDirection = 'DESCENDING',
      searchString,
      regionIds,
      category,
      statuses,
      includeDeleted,
    } = args || {};

    const params = new URLSearchParams({
      pageNum: page.toString(),
      pageSize: size.toString(),
      sortType,
      sortDirection,
    });
    if (searchString && searchString.trim().length > 0) {
      params.set('searchString', searchString);
    }
    if (regionIds && regionIds.length > 0) {
      regionIds.forEach((id) => params.append('regionIds', id));
    }
    if (category && category.trim().length > 0) {
      params.set('category', category);
    }
    if (statuses && statuses.length > 0) {
      statuses.forEach((s) => params.append('statuses', s));
    }
    if (typeof includeDeleted === 'boolean') {
      params.set('includeDeleted', String(includeDeleted));
    }
    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetStoreListResponse.parse(response);
  },

  getStore: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetStoreResponse.parse(response);
  },

  getStoreById: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return AdminStoreResponseSchema.parse(response);
  },

  createStore: async (body: AdminCreateStoreRequest) => {
    return api.post(ENDPOINT, body);
  },

  updateStore: async ({ id, body }: { id: number; body: AdminUpdateStoreRequest }) => {
    return api.put(`${ENDPOINT}/${id}`, body);
  },

  deleteStore: async (id: number) => {
    return api.delete(`${ENDPOINT}/${id}`);
  },

  // 상태 변경 API 함수들
  approveStore: async (id: number) => {
    return api.put(`${ENDPOINT}/${id}/approve`);
  },

  rejectStore: async (id: number) => {
    return api.put(`${ENDPOINT}/${id}/reject`);
  },

  suspendStore: async (id: number) => {
    return api.put(`${ENDPOINT}/${id}/suspend`);
  },

  closeStore: async (id: number) => {
    return api.put(`${ENDPOINT}/${id}/close`);
  },

  setPendingStore: async (id: number) => {
    return api.put(`${ENDPOINT}/${id}/pending`);
  },
};

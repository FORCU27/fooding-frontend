export * from './type';

import {
  AdminCreateStoreRequest,
  AdminUpdateStoreRequest,
  SortDirection,
  StoreSortType,
  AdminStoreResponseSchema,
  GetStoreListResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/stores';

export const storeApi = {
  getStoreList: async (
    page: number = 0,
    size: number = 10,
    sortType: StoreSortType = 'RECENT',
    sortDirection: SortDirection = 'DESCENDING',
  ) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
      pageSize: size.toString(),
      sortType,
      sortDirection,
    });
    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetStoreListResponse.parse(response);
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
};

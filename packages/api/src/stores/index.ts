export * from './type';

import { api } from '../shared';
import {
  AdminCreateStoreRequest,
  AdminUpdateStoreRequest,
  SortDirection,
  StoreSortType,
  AdminStoreResponseSchema,
  PageResponseSchema,
} from './type';

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
    console.log('response', response);
    const result = PageResponseSchema.parse(response);
    console.log('result', result);
    return result;
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

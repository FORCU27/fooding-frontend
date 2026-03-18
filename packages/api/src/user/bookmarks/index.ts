export * from './mock';
export * from './type';

import {
  GetBookmarkStoreListResponse,
  CreateBookmarkResponse,
  DeleteBookmarkResponse,
  GetBookmarkStoreListParams,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/bookmarks';

export const bookmarkApi = {
  getBookmarkedStoreList: async (params?: GetBookmarkStoreListParams) => {
    const response = await api.get(`${ENDPOINT}`, { params });
    return GetBookmarkStoreListResponse.parse(response);
  },
  createBookmarkStore: async (storeId: number) => {
    const response = await api.post(`${ENDPOINT}`, { storeId });
    return CreateBookmarkResponse.parse(response);
  },
  deleteBookmarkStore: async (storeId: number) => {
    const response = await api.delete(`${ENDPOINT}/${storeId}`);
    return DeleteBookmarkResponse.parse(response);
  },
};

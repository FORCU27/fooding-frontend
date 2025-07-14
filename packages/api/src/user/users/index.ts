export * from './mock';
export * from './type';

import {
  CreateBookmarkResponse,
  DeleteBookmarkResponse,
  GetBookmarkStoreListParams,
  GetBookmarkStoreListResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/user';

export const userApi = {
  getBookmarkedStoreList: async (params?: GetBookmarkStoreListParams) => {
    const response = await api.get(`${ENDPOINT}/bookmarks`, { params });
    return GetBookmarkStoreListResponse.parse(response);
  },
  createBookmarkStore: async (storeId: number) => {
    const response = await api.post(
      `${ENDPOINT}/bookmarks`,
      { storeId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return CreateBookmarkResponse.parse(response);
  },
  deleteBookmarkStore: async (storeId: number) => {
    const response = await api.delete(`${ENDPOINT}/bookmarks/${storeId}`);
    return DeleteBookmarkResponse.parse(response);
  },
};

import { GetStoreBookmarkParams, GetStoreBookmarkResponse } from './type';
import { api } from '../../shared';
export * from './type';

const ENDPOINT = '/ceo/stores';

export const bookmarkApi = {
  get: async (storeId: number, params: GetStoreBookmarkParams) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/bookmarks`, { params });
    return GetStoreBookmarkResponse.parse(response);
  },
  delete: async (storeId: number, bookmarkId: number) => {
    await api.delete(`${ENDPOINT}/${storeId}/bookmarks/${bookmarkId}`);
  },
  putStarred: async (storeId: number, bookmarkId: number, body: { isStarred: boolean }) => {
    await api.put(`${ENDPOINT}/${storeId}/bookmarks/${bookmarkId}/starred`, body);
  },
};

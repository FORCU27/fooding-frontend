import { GetStoreBookmarkParams, GetStoreBookmarkResponse } from './type';
import { api } from '../../shared';
export * from './type';

const ENDPOINT = '/ceo/stores';

export const bookmarkApi = {
  getBookmarks: async (storeId: number, params: GetStoreBookmarkParams) => {
    const response = await api.get(`${ENDPOINT}/${storeId}/bookmarks`, { params });
    return GetStoreBookmarkResponse.parse(response);
  },
};

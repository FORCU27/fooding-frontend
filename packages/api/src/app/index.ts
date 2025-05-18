export * from './type';

import { api } from '../shared';
import { GetUserResponse, GetStoresResponse } from './type';

export const appApi = {
  getUser: async () => {
    return GetUserResponse.parse(api.get(`/app/users`));
  },
  getStores: async ({
    searchString,
    pageNum,
    pageSize,
  }: {
    searchString: string;
    pageNum: number;
    pageSize: number;
  }) => {
    const response = await api.get(`/app/stores`, {
      params: {
        searchString,
        pageNum,
        pageSize,
      },
    });
    return GetStoresResponse.parse(response);
  },
};

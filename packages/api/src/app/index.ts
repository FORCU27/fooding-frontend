export * from './type';

import { api } from '../shared';
import { GetUserResponse, GetStoresResponse } from './type';
import { ENDPOINT } from '../example';

export const appApi = {
  getUser: async () => {
    return GetUserResponse.parse(api.get(`${ENDPOINT}/app/users`));
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
    const response = await api.get(`${ENDPOINT}/app/stores`, {
      params: {
        searchString,
        pageNum,
        pageSize,
      },
    });
    return GetStoresResponse.parse(response);
  },
};

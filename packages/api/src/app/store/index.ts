export * from './type';

import { GetStoresResponse } from './type';
import { ENDPOINT } from '../../example';
import { api } from '../../shared';

export const storeApi = {
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

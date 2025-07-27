export * from './type';
export * from './mock';

import { GetStorePostByIdResponse, GetStorePostListParams, GetStorePostListResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/store-posts';

export const storePostApi = {
  getStorePostList: async (params: GetStorePostListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetStorePostListResponse.parse(response);
  },
  getStorePostById: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetStorePostByIdResponse.parse(response);
  },
};

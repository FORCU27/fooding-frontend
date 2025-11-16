import {
  CreateStorePostParams,
  GetStorePostsParams,
  GetStorePostsResponse,
  PutStorePostParams,
} from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/store-posts';

export const storePostApi = {
  getStorePosts: async (params: GetStorePostsParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetStorePostsResponse.parse(response);
  },
  getStorePostById: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetStorePostsResponse.parse(response);
  },
  createStorePost: async (body: CreateStorePostParams) => {
    await api.post(ENDPOINT, body);
  },
  deleteStorePost: async (storePostId: number) => {
    await api.delete(`${ENDPOINT}/${storePostId}`);
  },
  editStorePost: async (storePostId: number, body: PutStorePostParams) => {
    await api.put(`${ENDPOINT}/${storePostId}`, body);
  },
  activateStorePost: async (storePostId: number, isActive: boolean) => {
    await api.put(`${ENDPOINT}/${storePostId}/${isActive}`);
  },
};

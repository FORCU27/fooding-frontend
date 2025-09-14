export * from './type';

import {
  AdminCreatePostRequest,
  AdminUpdatePostRequest,
  PostType,
  GetPostListResponse,
  GetPostResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/posts';

export const postApi = {
  list: async (type?: PostType) => {
    const params = new URLSearchParams();
    if (type) {
      params.set('type', type);
    }
    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetPostListResponse.parse(response);
  },

  retrieve: async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetPostResponse.parse(response);
  },

  create: async (body: AdminCreatePostRequest) => {
    const response = await api.post(ENDPOINT, body);
    return response;
  },

  update: async (id: number, body: AdminUpdatePostRequest) => {
    const response = await api.put(`${ENDPOINT}/${id}`, body);
    return response;
  },

  delete: async (id: number) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response;
  },
};

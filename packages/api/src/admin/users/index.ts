export * from './type';

import {
  AdminCreateUserRequest,
  AdminUpdateUserRequest,
  GetUserListParams,
  GetUserListResponse,
} from './type';
import { api } from '../../shared';

export const userApi = {
  getUserList: (params: GetUserListParams) => {
    const response = api.get('/admin/users', { params });
    return GetUserListResponse.parse(response);
  },

  createUser: async (data: AdminCreateUserRequest) => api.post('/admin/users', data),

  updateUser: ({ id, body }: { id: number; body: AdminUpdateUserRequest }) =>
    api.put(`/admin/users/${id}`, body),

  deleteUser: (id: number) => api.delete(`/admin/users/${id}`),
};

export * from './type';

import {
  AdminCreateUserRequest,
  AdminUpdateUserRequest,
  GetUserListParams,
  GetUserListResponse,
} from './type';
import { api } from '../../shared';

export const userApi = {
  getUserList: async (params: GetUserListParams) => {
    const queryParams = new URLSearchParams();
    queryParams.set('pageNum', params.page.toString());
    queryParams.set('pageSize', params.size.toString());
    if (params.role) queryParams.set('role', params.role);
    if (params.searchString) queryParams.set('searchString', params.searchString);
    
    const response = await api.get(`/admin/users?${queryParams.toString()}`);
    return GetUserListResponse.parse(response);
  },

  createUser: async (data: AdminCreateUserRequest) => api.post('/admin/users', data),

  updateUser: ({ id, body }: { id: number; body: AdminUpdateUserRequest }) =>
    api.put(`/admin/users/${id}`, body),

  deleteUser: (id: number) => api.delete(`/admin/users/${id}`),
};

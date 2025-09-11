export * from './type';

import {
  AdminCreateUserRequest,
  AdminUpdateUserRequest,
  AdminUserResponseSchema,
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

  getUser: async (id: number) => {
    type ApiResp<T> = { status: string | null; data: T };
    const response = await api.get<ApiResp<unknown>>(`/admin/users/${id}`);
    // API 응답이 { status: "OK", data: {...} } 형태이므로 data 부분만 파싱
    return { data: AdminUserResponseSchema.parse(response.data) };
  },

  createUser: async (data: AdminCreateUserRequest) => api.post('/admin/users', data),

  updateUser: ({ id, body }: { id: number; body: AdminUpdateUserRequest }) =>
    api.put(`/admin/users/${id}`, body),

  deleteUser: (id: number) => api.delete(`/admin/users/${id}`),
};

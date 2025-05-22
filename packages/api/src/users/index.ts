import { api } from '../shared';
import { PageResponseSchema, AdminCreateUserRequest, AdminUpdateUserRequest } from './type';

export * from './type';

export const userApi = {
  getUserList: async (page: number = 0, size: number = 10) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
      pageSize: size.toString(),
    });

    const response = await api.get(`/admin/users?${params.toString()}`);
    console.log('response', response);
    const result = PageResponseSchema.parse(response);
    console.log('result', result);
    return result;
  },

  createUser: async (data: AdminCreateUserRequest) =>
    api.post<number>('/admin/users', data),

  updateUser: async ({ id, body }: { id: number; body: AdminUpdateUserRequest }) =>
    api.put(`/admin/users/${id}`, body),

  deleteUser: async (id: number) =>
    api.delete(`/admin/users/${id}`),
}; 
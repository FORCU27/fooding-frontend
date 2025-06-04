import { z } from 'zod';

import { api, createPageResponseSchema } from './shared';

const AdminUserResponse = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImage: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface AdminUpdateUserRequest {
  nickname: string;
  profileImage?: string;
}

type GetUserListParams = {
  page: number;
};

export const userApi = {
  getUserList: (params: GetUserListParams) => {
    const response = api.get('/admin/users', { params });
    return createPageResponseSchema(AdminUserResponse).parse(response);
  },
  updateUser: ({ id, body }: { id: number; body: AdminUpdateUserRequest }) =>
    api.put(`/admin/users/${id}`, body),

  deleteUser: (id: number) => api.delete(`/admin/users/${id}`),
};

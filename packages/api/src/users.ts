import { api } from './api';
import { PageResponse } from './types';

export interface AdminUserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUpdateUserRequest {
  nickname: string;
  profileImage?: string;
}

export const userApi = {
  getUserList: (page: number) =>
    api.get<PageResponse<AdminUserResponse>>(`/admin/users?page=${page}`),
  
  updateUser: ({ id, body }: { id: number; body: AdminUpdateUserRequest }) =>
    api.put(`/admin/users/${id}`, body),
  
  deleteUser: (id: number) =>
    api.delete(`/admin/users/${id}`),
}; 
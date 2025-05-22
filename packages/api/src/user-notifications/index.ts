import { api } from '../shared';
import { PageResponseSchema, CreateUserNotificationRequest } from './type';

export * from './type';

export const userNotificationApi = {
  getUserNotificationList: async (page: number = 0, size: number = 10) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
      pageSize: size.toString(),
    });

    const response = await api.get(`/admin/user-notifications?${params.toString()}`);
    return PageResponseSchema.parse(response);
  },

  createUserNotification: async (data: CreateUserNotificationRequest) =>
    api.post<number>('/admin/user-notifications', data),

  deleteUserNotification: async (id: number) =>
    api.delete(`/admin/user-notifications/${id}`),

  markAsRead: async (id: number) =>
    api.put(`/admin/user-notifications/${id}/read`),
}; 
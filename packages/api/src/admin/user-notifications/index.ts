import { CreateUserNotificationRequest, GetUserNotificationListResponse } from './type';
import { api } from '../../shared';

export * from './type';

export const userNotificationApi = {
  getUserNotificationList: async (page: number = 1, size: number = 10) => {
    const params = new URLSearchParams({
      pageNum: page.toString(),
      pageSize: size.toString(),
    });

    const response = await api.get(`/admin/user-notifications?${params.toString()}`);
    return GetUserNotificationListResponse.parse(response);
  },

  createUserNotification: async (data: CreateUserNotificationRequest) => {
    return api.post('/admin/user-notifications', data);
  },

  deleteUserNotification: async (id: number) => api.delete(`/admin/user-notifications/${id}`),

  markAsRead: async (id: number) => api.put(`/admin/user-notifications/${id}/read`),
};

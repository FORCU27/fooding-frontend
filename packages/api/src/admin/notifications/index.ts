import { GetNotificationListResponse } from './type';
import { api } from '../../shared';

export * from './type';

export const notificationApi = {
  getNotificationList: async (page: number = 0, size: number = 10) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
      pageSize: size.toString(),
    });

    const response = await api.get(`/admin/notifications?${params.toString()}`);
    return GetNotificationListResponse.parse(response);
  },

  deleteNotification: async (id: number) => api.delete(`/admin/notifications/${id}`),
};

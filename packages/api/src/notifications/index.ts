import { api } from '../shared';
import { PageResponseSchema } from './type';

export * from './type';

export const notificationApi = {
  getNotificationList: async (page: number = 0, size: number = 10) => {
    const params = new URLSearchParams({
      pageNum: (page + 1).toString(),
      pageSize: size.toString(),
    });

    const response = await api.get(`/admin/notifications?${params.toString()}`);
    return PageResponseSchema.parse(response);
  },

  deleteNotification: async (id: number) =>
    api.delete(`/admin/notifications/${id}`),
}; 
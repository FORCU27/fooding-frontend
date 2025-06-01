export * from './type';
export * from './mock';

import { GetNotificationListParams, GetNotificationListResponse } from './type';
import { api } from '../../shared';

const ENDPOINT = '/user/notifications';

export const notificationApi = {
  getNotificationList: async (params: GetNotificationListParams) => {
    const response = await api.get(ENDPOINT, { params });
    return GetNotificationListResponse.parse(response);
  },
  markAsRead: async () => {
    return await api.post(`${ENDPOINT}/read`);
  },
};

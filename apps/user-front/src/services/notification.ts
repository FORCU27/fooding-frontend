import { notificationApi } from '@repo/api/user/notifications';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useNotifications = () => {
  return useSuspenseQuery({
    queryKey: ['notifications'],
    queryFn: notificationApi.getNotificationList,
    select: (response) => response.data,
  });
};

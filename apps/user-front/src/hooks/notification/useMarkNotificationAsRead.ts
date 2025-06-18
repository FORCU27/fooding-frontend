import { notificationApi } from '@repo/api/user';
import { useMutation } from '@tanstack/react-query';

export const useMarkNotificationsAsRead = () => {
  return useMutation({
    mutationFn: notificationApi.markAsRead,
  });
};

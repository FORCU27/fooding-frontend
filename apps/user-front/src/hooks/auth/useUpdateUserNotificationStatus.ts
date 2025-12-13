import { authApi } from '@repo/api/auth';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateUserNotificationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateNotificationStatus,
    mutationKey: [queryKeys.user.me, 'update'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.me] });
    },
  });
};

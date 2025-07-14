import { authApi } from '@repo/api/auth';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateInfo,
    mutationKey: [queryKeys.me.user, 'update'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.me.user] });
    },
  });
};

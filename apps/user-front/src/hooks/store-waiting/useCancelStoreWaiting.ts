import { queryKeys } from '@repo/api/configs/query-keys';
import { storeWaitingApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelStoreWaiting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.user.storeWaiting, 'cancel'],
    mutationFn: (id: number) => storeWaitingApi.cancelWaiting(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.storeWaiting] });
    },
  });
};

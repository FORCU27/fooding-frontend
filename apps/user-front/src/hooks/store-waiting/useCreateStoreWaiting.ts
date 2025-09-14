import { queryKeys } from '@repo/api/configs/query-keys';
import { storeWaitingApi, StoreWaitingBody } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateStoreWaiting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.user.storeWaiting, 'create'],
    mutationFn: (body: StoreWaitingBody) => storeWaitingApi.createWaiting(body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.storeWaiting] });
    },
  });
};

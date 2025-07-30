import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateStoreReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeApi.createStoreReview,
    mutationKey: [queryKeys.user.store.review, 'create'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.review] });
    },
  });
};

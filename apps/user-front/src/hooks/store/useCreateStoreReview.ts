import { queryKeys } from '@repo/api/configs/query-keys';
import { CreateStoreReviewBody, storeApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateStoreReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateStoreReviewBody) => storeApi.createStoreReview(body),
    mutationKey: [queryKeys.user.store.review, 'create'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.review] });
    },
  });
};

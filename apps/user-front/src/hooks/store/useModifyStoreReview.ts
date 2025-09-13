import { queryKeys } from '@repo/api/configs/query-keys';
import { ModifyStoreReviewBody, storeApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useModifyStoreReview = (reviewId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ModifyStoreReviewBody) => storeApi.modifyStoreReview(reviewId, body),
    mutationKey: [queryKeys.user.store.review, reviewId, 'update'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.review, reviewId] });
    },
  });
};

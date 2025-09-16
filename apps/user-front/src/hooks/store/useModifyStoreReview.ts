import { queryKeys } from '@repo/api/configs/query-keys';
import { storeApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useModifyStoreReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeApi.modifyStoreReview,
    onSuccess: (_, { reviewId }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.store.review, reviewId] });
    },
  });
};

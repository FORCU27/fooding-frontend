import { queryKeys } from '@repo/api/configs/query-keys';
import { CreateReportBody, storeApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateReport = (reviewId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateReportBody) => storeApi.createStoreReviewReport(reviewId, body),
    mutationKey: [queryKeys.user.report, 'create'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user.report] });
    },
  });
};

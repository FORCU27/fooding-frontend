import { queryKeys } from '@repo/api/configs/query-keys';
import { couponApi } from '@repo/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApplyCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponApi.applyCoupon,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.user.coupon.infiniteList],
      });
    },
  });
};

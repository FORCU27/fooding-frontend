import { couponApiV2, type GetCouponUsageParams } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useGetCouponUsages = (couponId: number, params: GetCouponUsageParams) => {
  const isClient = typeof window !== 'undefined';

  return useQuery({
    queryKey: [queryKeys.ceo.coupon.usages, couponId, params],
    queryFn: async () => {
      const result = await couponApiV2.getCouponUsages(couponId, params);
      return result;
    },
    staleTime: 0, // CEO 앱은 실시간 데이터가 중요
    enabled: isClient && !!couponId,
  });
};

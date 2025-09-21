import { useRouter } from 'next/navigation';

import { couponApiV2, CreateCouponBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: CreateCouponBody) => couponApiV2.createCoupon(body),
    mutationKey: [queryKeys.ceo.coupon.create],

    onSuccess: () => {
      // 쿠폰 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.coupon.list],
      });

      alert('쿠폰이 생성되었습니다.');

      // 쿠폰 목록 페이지로 이동
      router.push('/reward/coupon');
    },

    onError: (error: unknown) => {
      console.error('쿠폰 생성 실패:', error);

      // 에러 메시지 파싱
      let message = '쿠폰 생성에 실패했습니다.';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      alert(message);
    },
  });
};

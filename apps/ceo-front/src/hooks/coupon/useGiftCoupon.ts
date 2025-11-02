import { useRouter } from 'next/navigation';

import { couponApiV2, GiftCouponBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useGiftCoupon = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: GiftCouponBody) => couponApiV2.giftCoupon(body),
    mutationKey: [queryKeys.ceo.coupon.gift],

    onSuccess: () => {
      // 쿠폰 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.coupon.list],
      });

      alert('쿠폰이 선물되었습니다.');

      // 쿠폰 목록 페이지로 이동
      router.push('/my/reward/coupon');
    },

    onError: (error: unknown) => {
      console.error('쿠폰 선물 실패:', error);

      // 에러 메시지 파싱
      let message = '쿠폰 선물에 실패했습니다.';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      alert(message);
    },
  });
};

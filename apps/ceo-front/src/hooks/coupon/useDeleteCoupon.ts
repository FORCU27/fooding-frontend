import { couponApiV2 } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => couponApiV2.deleteCoupon(id),
    mutationKey: [queryKeys.ceo.coupon.delete],

    onSuccess: () => {
      // 쿠폰 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.coupon.list],
      });

      alert('쿠폰이 삭제되었습니다.');
    },

    onError: (error: unknown) => {
      console.error('쿠폰 삭제 실패:', error);

      // 에러 메시지 파싱
      let message = '쿠폰 삭제에 실패했습니다.';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      alert(message);
    },
  });
};

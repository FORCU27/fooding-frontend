'use client';

import { useParams, useRouter } from 'next/navigation';

import { couponApiV2, UpdateCouponBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import type { SelectedRangeItem } from '@repo/design-system/components/ceo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CouponForm, type CouponFormData } from '@/components/coupon/CouponForm';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const CouponEditPage = () => {
  const params = useParams();
  const router = useRouter();
  const couponId = params.id as string;

  const queryClient = useQueryClient();
  const { selectedStoreId, isInitialized } = useSelectedStoreId();

  // 쿠폰 데이터 조회
  const { data: couponData, isLoading: isLoadingCoupon, error } = useQuery({
    queryKey: [queryKeys.ceo.coupon.detail, couponId],
    queryFn: () => couponApiV2.getCoupon(Number(couponId)),
    enabled: !!couponId,
  });

  console.log('Coupon loading state:', {
    isLoadingCoupon,
    couponData,
    couponId,
    error
  });

  // 초기 데이터를 직접 계산
  const initialFormData = couponData ? {
    couponName: couponData.name,
    benefitType: couponData.benefitType === 'DISCOUNT' ? 'discount' : 'gift',
    discountType: couponData.discountType === 'PERCENT' ? 'percentage' : 'fixed',
    discountPercentage: couponData.discountType === 'PERCENT' ? String(couponData.discountValue || '') : '',
    discountAmount: couponData.discountType === 'FIXED' ? String(couponData.discountValue || '') : '',
    giftItem: couponData.giftItem || '',
    giftType: couponData.minOrderAmount ? 'threshold' : 'free',
    minOrderAmount: String(couponData.minOrderAmount || ''),
    couponUsageType: couponData.provideType === 'REGULAR_CUSTOMER' ? 'regular' : 'all',
    issueType: couponData.totalQuantity ? 'limited' : 'unlimited',
    issueCount: couponData.totalQuantity ? String(couponData.totalQuantity) : '',
    startDate: couponData.issueStartOn,
    endDate: couponData.issueEndOn,
    usageConditions: couponData.conditions || '',
  } : undefined;

  const initialDateRange = couponData ? {
    startDate: new Date(couponData.issueStartOn),
    endDate: new Date(couponData.issueEndOn),
  } : null;

  // 쿠폰 수정 mutation
  const updateCoupon = useMutation({
    mutationFn: (body: UpdateCouponBody) => couponApiV2.updateCoupon(Number(couponId), body),
    mutationKey: [queryKeys.ceo.coupon.update],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.coupon.list],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.coupon.detail, couponId],
      });
      alert('쿠폰이 수정되었습니다.');
      router.push('/reward/coupon');
    },
    onError: (error: unknown) => {
      console.error('쿠폰 수정 실패:', error);
      let message = '쿠폰 수정에 실패했습니다.';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      alert(message);
    },
  });


  const handleSubmit = async (
    formData: CouponFormData,
    selectedDateRange: SelectedRangeItem | null,
  ) => {
    if (!selectedDateRange) {
      alert('사용 기간을 선택해주세요.');
      return;
    }

    if (!couponData) {
      alert('쿠폰 데이터를 불러올 수 없습니다.');
      return;
    }

    const apiData: UpdateCouponBody = {
      storeId: selectedStoreId || 0,
      benefitType: formData.benefitType === 'discount' ? 'DISCOUNT' : 'GIFT',
      type: couponData.type === 'FIRST_COME_FIRST_SERVED' ? 'FIRST_COME_FIRST_SERVED' : 'GENERAL',
      discountType:
        formData.benefitType === 'discount'
          ? formData.discountType === 'percentage'
            ? 'PERCENT'
            : 'FIXED'
          : 'FIXED', // 필수값이므로 기본값 설정
      provideType: formData.couponUsageType === 'regular' ? 'REGULAR_CUSTOMER' : 'ALL',
      name: formData.couponName,
      conditions: formData.usageConditions || '',
      totalQuantity:
        formData.issueType === 'limited' && formData.issueCount
          ? parseInt(formData.issueCount)
          : undefined,
      discountValue:
        formData.benefitType === 'discount'
          ? formData.discountType === 'percentage'
            ? parseInt(formData.discountPercentage || '0')
            : parseInt(formData.discountAmount || '0')
          : undefined,
      giftItem: formData.benefitType === 'gift' ? formData.giftItem : undefined,
      minOrderAmount: formData.minOrderAmount ? parseInt(formData.minOrderAmount) : undefined,
      issueStartOn: (selectedDateRange?.startDate 
        ? selectedDateRange.startDate.toISOString().split('T')[0] 
        : couponData.issueStartOn) as string,
      issueEndOn: selectedDateRange ? selectedDateRange.endDate.toISOString().split('T')[0] : undefined,
      expiredOn: selectedDateRange ? selectedDateRange.endDate.toISOString().split('T')[0] : undefined,
      status: 'ACTIVE',
    };

    try {
      await updateCoupon.mutateAsync(apiData);
    } catch (error) {
      console.error('쿠폰 수정 실패:', error);
    }
  };

  if (isLoadingCoupon || !couponData) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-600'>쿠폰 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (!selectedStoreId && isInitialized) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-600'>스토어를 선택해주세요.</div>
      </div>
    );
  }

  return (
    <CouponForm
      title='쿠폰 수정'
      initialData={initialFormData}
      initialDateRange={initialDateRange}
      onSubmit={handleSubmit}
      onCancel={() => router.push('/reward/coupon')}
      submitText='수정하기'
      isSubmitting={updateCoupon.isPending}
    />
  );
};

export default CouponEditPage;

'use client';

import { CreateCouponBody } from '@repo/api/ceo';
import type { SelectedRangeItem } from '@repo/design-system/components/ceo';

import { CouponForm, type CouponFormData } from '@/components/coupon/CouponForm';
import { useCreateCoupon } from '@/hooks/coupon/useCreateCoupon';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const CouponPage = () => {
  const createCoupon = useCreateCoupon();
  const { selectedStoreId, isLoading: isLoadingStoreId, isInitialized } = useSelectedStoreId();

  const handleSubmit = async (
    formData: CouponFormData,
    selectedDateRange: SelectedRangeItem | null,
  ) => {
    if (!selectedDateRange) {
      alert('사용 기간을 선택해주세요.');
      return;
    }

    // API 요청 데이터 변환
    const apiData: CreateCouponBody = {
      storeId: selectedStoreId || 0,
      benefitType: formData.benefitType === 'discount' ? 'DISCOUNT' : 'GIFT',
      type: 'FIRST_COME_FIRST_SERVED',
      discountType:
        formData.benefitType === 'discount'
          ? formData.discountType === 'percentage'
            ? 'PERCENT'
            : 'FIXED'
          : 'FIXED', // 필수값이므로 기본값 설정
      provideType: formData.couponUsageType === 'regular' ? 'REGULAR_CUSTOMER' : 'ALL',
      name: formData.couponName || '',
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
      issueStartOn: selectedDateRange
        ? selectedDateRange.startDate.toISOString().split('T')[0]
        : undefined,
      issueEndOn: selectedDateRange
        ? selectedDateRange.endDate.toISOString().split('T')[0]
        : undefined,
      expiredOn: selectedDateRange
        ? selectedDateRange.endDate.toISOString().split('T')[0]
        : undefined,
      status: 'ACTIVE',
    };

    await createCoupon.mutateAsync(apiData);
  };

  if (isLoadingStoreId || !isInitialized) {
    return (
      <div className='space-y-4'>
        <div className='headline-2'>쿠폰 생성</div>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='mb-4'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              </div>
              <div className='text-gray-600'>스토어 정보를 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CouponForm
      title='쿠폰 생성'
      onSubmit={handleSubmit}
      submitText='생성하기'
      isSubmitting={createCoupon.isPending}
    />
  );
};

export default CouponPage;

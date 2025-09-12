'use client';

import { CreateCouponBody } from '@repo/api/ceo';
import type { SelectedRangeItem } from '@repo/design-system/components/ceo';

import { CouponForm, type CouponFormData } from '@/components/coupon/CouponForm';
import { useCreateCoupon } from '@/hooks/coupon/useCreateCoupon';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const CouponPage = () => {
  const createCoupon = useCreateCoupon();
  const { selectedStoreId, isLoading: isLoadingStoreId, isInitialized } = useSelectedStoreId();

  const handleSubmit = async (formData: CouponFormData, selectedDateRange: SelectedRangeItem | null) => {
    if (!selectedDateRange) {
      alert('사용 기간을 선택해주세요.');
      return;
    }

    // API 요청 데이터 변환
    const apiData: CreateCouponBody = {
      storeId: selectedStoreId || 0,
      benefitType: formData.benefitType === 'discount' ? 'DISCOUNT' : 'GIFT',
      type: 'FIRST_COME_FIRST_SERVED',
      discountType: formData.benefitType === 'discount' 
        ? (formData.discountPercentage ? 'PERCENTAGE' : 'FIXED')
        : undefined,
      provideType: formData.couponUsageType === 'regular' ? 'REGULAR' : 'ALL',
      name: formData.couponName,
      conditions: formData.usageConditions || '',
      totalQuantity: formData.issueType === 'limited' && formData.issueCount 
        ? parseInt(formData.issueCount) 
        : undefined,
      discountValue: formData.benefitType === 'discount'
        ? (formData.discountPercentage 
          ? parseInt(formData.discountPercentage)
          : parseInt(formData.discountAmount || '0'))
        : undefined,
      giftItem: formData.benefitType === 'gift' ? formData.giftItem : undefined,
      minOrderAmount: formData.minOrderAmount ? parseInt(formData.minOrderAmount) : undefined,
      issueStartOn: selectedDateRange.startDate.toISOString().split('T')[0] || '',
      issueEndOn: selectedDateRange.endDate.toISOString().split('T')[0] || '',
      expiredOn: selectedDateRange.endDate.toISOString().split('T')[0] || '',
      status: 'ACTIVE',
    };

    console.log('API 요청 데이터:', apiData);

    try {
      await createCoupon.mutateAsync(apiData);
    } catch (error) {
      console.error('쿠폰 생성 실패:', error);
    }
  };

  if (isLoadingStoreId || !isInitialized) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-600'>스토어 정보를 불러오는 중...</div>
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
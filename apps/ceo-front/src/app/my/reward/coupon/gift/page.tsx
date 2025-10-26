'use client';

import { useState } from 'react';

import { GiftCouponBody, UserResponse } from '@repo/api/ceo';
import { Card } from '@repo/design-system/components/ceo';
import type { SelectedRangeItem } from '@repo/design-system/components/ceo';

import { CouponForm, type CouponFormData } from '@/components/coupon/CouponForm';
import { UserSearchInput } from '@/components/coupon/UserSearchInput';
import { useGiftCoupon } from '@/hooks/coupon/useGiftCoupon';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const GiftCouponPage = () => {
  const giftCoupon = useGiftCoupon();
  const { selectedStoreId, isLoading: isLoadingStoreId, isInitialized } = useSelectedStoreId();
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  const handleSubmit = async (
    formData: CouponFormData,
    selectedDateRange: SelectedRangeItem | null,
  ) => {
    if (!selectedUser) {
      alert('선물받을 고객을 선택해주세요.');
      return;
    }

    if (!selectedDateRange) {
      alert('사용 기간을 선택해주세요.');
      return;
    }

    if (!selectedStoreId) {
      alert('스토어를 선택해주세요.');
      return;
    }

    // API 요청 데이터 변환
    const apiData: GiftCouponBody = {
      userId: selectedUser.id,
      storeId: selectedStoreId,
      benefitType: formData.benefitType === 'discount' ? 'DISCOUNT' : 'GIFT',
      discountType:
        formData.benefitType === 'discount'
          ? formData.discountType === 'percentage'
            ? 'PERCENT'
            : 'FIXED'
          : 'FIXED',
      name: formData.couponName,
      conditions: formData.usageConditions || undefined,
      discountValue:
        formData.benefitType === 'discount'
          ? formData.discountType === 'percentage'
            ? parseInt(formData.discountPercentage || '0')
            : parseInt(formData.discountAmount || '0')
          : undefined,
      expiredOn: selectedDateRange.endDate.toISOString().split('T')[0],
    };

    await giftCoupon.mutateAsync(apiData);
  };

  if (isLoadingStoreId || !isInitialized) {
    return (
      <div className='space-y-4'>
        <div className='headline-2'>쿠폰 선물</div>
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
    <div className='p-grid-margin space-y-6'>
      <div className='headline-2'>쿠폰 선물</div>

      {/* 고객 검색 섹션 */}
      <Card>
        <div className='p-6'>
          <h3 className='text-lg font-semibold mb-4'>대상 고객 *</h3>
          <UserSearchInput selectedUser={selectedUser} onSelectUser={setSelectedUser} />
        </div>
      </Card>

      {/* 쿠폰 폼 */}
      <CouponForm
        mode='gift'
        title=''
        onSubmit={handleSubmit}
        submitText='선물하기'
        isSubmitting={giftCoupon.isPending}
      />
    </div>
  );
};

export default GiftCouponPage;

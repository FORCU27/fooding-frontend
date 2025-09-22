'use client';

import { useParams, useRouter } from 'next/navigation';

import { couponApiV2 } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { Button, Card, Coupon } from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

const CouponDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const couponId = Number(params.id);

  const { data: coupon, isLoading } = useQuery({
    queryKey: [queryKeys.ceo.coupon.detail, couponId],
    queryFn: () => couponApiV2.getCoupon(couponId),
    enabled: !!couponId,
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-600'>쿠폰 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-600'>쿠폰을 찾을 수 없습니다.</div>
      </div>
    );
  }

  const formatDate = (date: string | null | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ko-KR');
  };

  const formatDiscountValue = () => {
    if (coupon.benefitType === 'GIFT') {
      return coupon.giftItem || '-';
    }
    if (!coupon.discountValue) return '-';
    return coupon.discountType === 'PERCENT'
      ? `${coupon.discountValue}% 할인`
      : `${coupon.discountValue.toLocaleString()}원 할인`;
  };

  const getCouponStatuses = () => {
    const statuses = [];
    if (coupon.provideType === 'REGULAR_CUSTOMER') {
      statuses.push('단골 전용' as const);
    }
    if (coupon.status === 'ACTIVE') {
      statuses.push('발급중' as const);
    }
    return statuses;
  };

  const formatPeriod = () => {
    const start = coupon.issueStartOn
      ? new Date(coupon.issueStartOn).toLocaleDateString('ko-KR')
      : '';
    const end = coupon.issueEndOn ? new Date(coupon.issueEndOn).toLocaleDateString('ko-KR') : '';
    return `${start} ~ ${end}`;
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center mb-6'>
        <div className='headline-2'>쿠폰 상세</div>
        <div className='flex gap-2'>
          <Button onClick={() => router.push(`/my/reward/coupon/edit/${couponId}`)}>수정</Button>
          <Button variant='primary' onClick={() => router.push('/my/reward/coupon')}>
            목록으로
          </Button>
        </div>
      </div>

      {/* Coupon 컴포넌트 */}
      <Coupon
        title={coupon.name}
        period={formatPeriod()}
        statuses={getCouponStatuses()}
        receivedCount={coupon.issuedQuantity || 0}
        purchaseCount={0} // API에 없는 필드
        usedCount={0} // API에 없는 필드
        canceledCount={
          coupon.totalQuantity
            ? Math.max(0, coupon.totalQuantity - (coupon.issuedQuantity || 0))
            : 0
        }
        details={coupon.conditions}
        isActive={coupon.status === 'ACTIVE'}
      />

      <Card className='p-6'>
        <div className='space-y-6'>
          {/* 기본 정보 */}
          <div>
            <h3 className='headline-3 mb-4'>기본 정보</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <div className='text-gray-600 mb-1'>쿠폰명</div>
                <div className='font-medium'>{coupon.name}</div>
              </div>
              <div>
                <div className='text-gray-600 mb-1'>상태</div>
                <div className='flex items-center gap-2'>
                  <span
                    className={`font-medium ${
                      coupon.status === 'ACTIVE'
                        ? 'text-green-600'
                        : coupon.status === 'INACTIVE'
                          ? 'text-gray-600'
                          : 'text-red-600'
                    }`}
                  >
                    {coupon.status === 'ACTIVE'
                      ? '발급중'
                      : coupon.status === 'INACTIVE'
                        ? '발급중단'
                        : '만료'}
                  </span>
                </div>
              </div>
              <div>
                <div className='text-gray-600 mb-1'>혜택 종류</div>
                <div className='font-medium'>
                  {coupon.benefitType === 'DISCOUNT' ? '할인' : '선물'}
                </div>
              </div>
              <div>
                <div className='text-gray-600 mb-1'>혜택 내용</div>
                <div className='font-medium'>{formatDiscountValue()}</div>
              </div>
            </div>
          </div>

          {/* 발급 정보 */}
          <div>
            <h3 className='headline-3 mb-4'>발급 정보</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <div className='text-gray-600 mb-1'>발급 방식</div>
                <div className='font-medium'>{coupon.type === 'GENERAL' ? '일반' : '선착순'}</div>
              </div>
              <div>
                <div className='text-gray-600 mb-1'>발급 대상</div>
                <div className='font-medium'>
                  {coupon.provideType === 'ALL' ? '전체 고객' : '단골 고객'}
                </div>
              </div>
              <div>
                <div className='text-gray-600 mb-1'>총 발급 수량</div>
                <div className='font-medium'>{coupon.totalQuantity || '무제한'}</div>
              </div>
              <div>
                <div className='text-gray-600 mb-1'>발급된 수량</div>
                <div className='font-medium'>{coupon.issuedQuantity || 0}</div>
              </div>
            </div>
          </div>

          {/* 기간 정보 */}
          <div>
            <h3 className='headline-3 mb-4'>기간 정보</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <div className='text-gray-600 mb-1'>발급 시작일</div>
                <div className='font-medium'>{formatDate(coupon.issueStartOn)}</div>
              </div>
              <div>
                <div className='text-gray-600 mb-1'>발급 종료일</div>
                <div className='font-medium'>{formatDate(coupon.issueEndOn)}</div>
              </div>
              <div>
                <div className='text-gray-600 mb-1'>유효 기간</div>
                <div className='font-medium'>{formatDate(coupon.expiredOn)}</div>
              </div>
              <div>
                <div className='text-gray-600 mb-1'>최소 주문 금액</div>
                <div className='font-medium'>
                  {coupon.minOrderAmount
                    ? `${coupon.minOrderAmount.toLocaleString()}원`
                    : '제한 없음'}
                </div>
              </div>
            </div>
          </div>

          {/* 조건 */}
          {coupon.conditions && (
            <div>
              <h3 className='headline-3 mb-4'>사용 조건</h3>
              <div className='p-4 bg-gray-50 rounded'>
                <p className='text-gray-700'>{coupon.conditions}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CouponDetailPage;

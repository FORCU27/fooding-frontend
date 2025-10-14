'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { couponApiV2, type CouponUsageSchema } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import {
  Card,
  Coupon,
  DataTable,
  Pagination,
  SortToggle,
  type CouponStatus,
} from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { useGetCouponUsages } from '@/hooks/coupon/useGetCouponUsages';

const CouponDetailPage = () => {
  const params = useParams();
  const couponId = Number(params.id);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sortOrder, setSortOrder] = useState<'RECENT' | 'OLD'>('RECENT');

  const { data: coupon, isLoading } = useQuery({
    queryKey: [queryKeys.ceo.coupon.detail, couponId],
    queryFn: () => couponApiV2.getCoupon(couponId),
    enabled: !!couponId,
  });

  const {
    data: usageData,
    isLoading: isLoadingUsages,
    error: usageError,
  } = useGetCouponUsages(couponId, {
    pageNum: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortType: sortOrder,
  });

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='headline-2'>쿠폰 상세</div>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='mb-4'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              </div>
              <div className='text-gray-600'>쿠폰 정보를 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className='space-y-4'>
        <div className='headline-2'>쿠폰 상세</div>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='text-gray-600'>쿠폰을 찾을 수 없습니다.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getCouponStatuses = (): CouponStatus[] => {
    const statuses: CouponStatus[] = [];
    if (coupon.provideType === 'REGULAR_CUSTOMER') {
      statuses.push('단골 전용');
    }
    if (coupon.status === 'ACTIVE') {
      statuses.push('발급중');
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

  const formatDateTime = (date: string | null | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 쿠폰 사용내역 테이블 컬럼 정의
  const columns: ColumnDef<CouponUsageSchema>[] = [
    {
      accessorKey: 'nickname',
      header: '닉네임',
      cell: ({ row }) => {
        const usage = row.original;
        return (
          <div className='flex items-center gap-2'>
            {usage.profileImage && (
              <img
                src={usage.profileImage}
                alt={usage.nickname}
                className='w-8 h-8 rounded-full object-cover'
              />
            )}
            <span>{usage.nickname}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: '받은 일시',
      cell: ({ row }) => formatDateTime(row.original.createdAt),
    },
    {
      accessorKey: 'usedAt',
      header: '사용 일시',
      cell: ({ row }) => {
        const usage = row.original;
        if (usage.status === 'USED' && usage.usedAt) {
          return formatDateTime(usage.usedAt);
        }
        return (
          <span className='text-gray-400'>{usage.status === 'EXPIRED' ? '만료됨' : '미사용'}</span>
        );
      },
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center mb-6'>
        <div className='headline-2 m-8'>쿠폰 상세</div>
        <div className='flex gap-2'>
          {/* <Button onClick={() => router.push(`/my/reward/coupon/edit/${couponId}`)}>수정</Button>
          <Button variant='primary' onClick={() => router.push('/my/reward/coupon')}>
            목록으로
          </Button> */}
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
      <h3 className='headline-2 m-8'>쿠폰 사용내역</h3>
      {/* 쿠폰 사용내역 */}
      <Card className='p-6'>
        <div className='flex justify-between items-center mb-4'>
          <SortToggle
            value={sortOrder}
            onSortChange={(value) => {
              setSortOrder(value);
              // 정렬 변경시 첫 페이지로 이동
              setPagination({ ...pagination, pageIndex: 0 });
            }}
          />
        </div>

        {isLoadingUsages ? (
          <div className='flex items-center justify-center py-8'>
            <div className='text-gray-600'>사용내역을 불러오는 중...</div>
          </div>
        ) : usageError ? (
          <div className='flex items-center justify-center py-8'>
            <div className='text-red-600'>사용내역을 불러오는데 실패했습니다.</div>
          </div>
        ) : (
          <>
            <div className='bg-white rounded-lg shadow overflow-hidden'>
              <DataTable
                columns={columns}
                data={usageData?.list || []}
                emptyRenderer='아직 쿠폰을 사용한 고객이 없습니다.'
                options={{
                  state: {
                    pagination,
                  },
                  onPaginationChange: setPagination,
                  pageCount: usageData?.pageInfo.totalPages || 0,
                  manualPagination: true,
                }}
              />
            </div>

            {usageData && usageData.pageInfo.totalPages > 1 && (
              <div className='flex justify-center mt-4'>
                <Pagination
                  page={pagination.pageIndex + 1}
                  total={usageData.pageInfo.totalPages}
                  onChange={(page: number) => setPagination({ ...pagination, pageIndex: page - 1 })}
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default CouponDetailPage;

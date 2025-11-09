'use client';

import { useState } from 'react';

import type { CeoStoreNotificationResponse } from '@repo/api/ceo';
import { DataTable, Pagination, SortToggle } from '@repo/design-system/components/ceo';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { useGetStoreNotifications } from '@/hooks/notifications/useGetStoreNotifications';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

// 하드코딩된 샘플 데이터
const SAMPLE_NOTIFICATIONS: CeoStoreNotificationResponse[] = [
  {
    id: 1,
    title: '예약',
    content: '푸딩 동영상 리뷰 이벤트 당첨자 안내',
    category: '예약',
    linkUrl: 'https://ceo.fooding.com/reservations/1234',
    createdAt: '2025-02-01T23:12:02',
  },
  {
    id: 2,
    title: '예약',
    content: '홍길동님이 예약하셨습니다',
    category: '예약',
    createdAt: '2025-02-01T23:12:02',
  },
  {
    id: 3,
    title: '예약',
    content: '푸딩 동영상 리뷰 이벤트 당첨자 안내',
    category: '예약',
    createdAt: '2025-02-01T23:12:02',
  },
  {
    id: 4,
    title: '리뷰',
    content: '홍길동님이 예약하셨습니다',
    category: '리뷰',
    createdAt: '2025-02-01T23:12:02',
  },
  {
    id: 5,
    title: '예약',
    content: '푸딩 동영상 리뷰 이벤트 당첨자 안내',
    category: '예약',
    createdAt: '2025-02-01T23:12:02',
  },
  {
    id: 6,
    title: '리뷰',
    content: '홍길동님이 예약하셨습니다',
    category: '리뷰',
    createdAt: '2025-02-01T23:12:02',
  },
];

const NotificationsPage = () => {
  const { selectedStoreId, isLoading: isLoadingStoreId, isInitialized } = useSelectedStoreId();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sortOrder, setSortOrder] = useState<'RECENT' | 'OLD'>('OLD');

  const { data: notificationsResponse, isLoading } = useGetStoreNotifications({
    storeId: selectedStoreId,
    pageNum: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortType: sortOrder,
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryIcon = (category: string) => {
    // 카테고리별 아이콘 매핑 (영문 대문자)
    switch (category) {
      case 'RESERVATION':
        return '📅';
      case 'REVIEW':
        return '⭐';
      case 'INQUIRY':
        return '💬';
      default:
        return '📢';
    }
  };

  // DataTable 컬럼 정의
  const columns: ColumnDef<CeoStoreNotificationResponse>[] = [
    {
      accessorKey: 'category',
      header: '내용',
      cell: ({ row }) => {
        const notification = row.original;
        return (
          <div className='flex gap-4 py-2 items-center'>
            <div className='flex-shrink-0'>
              <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl'>
                {getCategoryIcon(notification.category)}
              </div>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-body-2 text-gray-600'>{notification.content}</p>
              {/* {notification.linkUrl && (
                <a
                  href={notification.linkUrl}
                  className='text-body-2 text-blue-600 hover:underline mt-1 inline-block'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  자세히 보기 →
                </a>
              )} */}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: '일시',
      cell: ({ row }) => (
        <div className='text-right'>
          <div className='text-sm text-gray-900'>{formatDate(row.original.createdAt)}</div>
          <div className='text-sm text-gray-500'>{formatTime(row.original.createdAt)}</div>
        </div>
      ),
    },
  ];

  if (!isInitialized || isLoadingStoreId || isLoading) {
    return (
      <div className='space-y-4'>
        <div className='headline-2'>알림</div>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='mb-4'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              </div>
              <div className='text-gray-600'>알림을 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedStoreId) {
    return (
      <div className='space-y-4'>
        <div className='headline-2'>알림</div>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='text-gray-600'>스토어를 선택해주세요.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // API 데이터 사용
  const notificationList = notificationsResponse?.data?.list ?? [];
  const totalPages = notificationsResponse?.data?.pageInfo?.totalPages ?? 1;

  return (
    <div className='space-y-5'>
      <div className='flex justify-between items-center mb-6'>
        <div className='headline-2 ml-8'>알림</div>
      </div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='flex justify-end p-4'>
          <SortToggle
            value={sortOrder}
            onSortChange={(value) => {
              if (value === 'RECENT' || value === 'OLD') {
                setSortOrder(value);
                setPagination({ ...pagination, pageIndex: 0 });
              }
            }}
          />
        </div>
        <DataTable
          columns={columns}
          data={notificationList}
          emptyRenderer='알림이 없습니다.'
          options={{
            state: {
              pagination,
            },
            onPaginationChange: setPagination,
            pageCount: totalPages,
            manualPagination: true,
          }}
        />
      </div>

      {totalPages > 1 && (
        <div className='flex justify-center mt-4'>
          <Pagination
            page={pagination.pageIndex + 1}
            total={totalPages}
            onChange={(page: number) => setPagination({ ...pagination, pageIndex: page - 1 })}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;

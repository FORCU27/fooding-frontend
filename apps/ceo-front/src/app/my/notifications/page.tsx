'use client';

import { useState } from 'react';

import { Card, Pagination, SortToggle } from '@repo/design-system/components/ceo';
import type { PaginationState } from '@tanstack/react-table';

import { useGetStoreNotifications } from '@/hooks/notifications/useGetStoreNotifications';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const NotificationsPage = () => {
  const { selectedStoreId, isLoading: isLoadingStoreId } = useSelectedStoreId();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sortOrder, setSortOrder] = useState<'RECENT' | 'OLD'>('OLD');

  const { data: notificationsResponse, isLoading } = useGetStoreNotifications({
    storeId: selectedStoreId,
    pageNum: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryIcon = (category: string) => {
    // 카테고리별 아이콘 매핑
    switch (category) {
      case '예약':
        return '📅';
      case '리뷰':
        return '⭐';
      case '문의':
        return '💬';
      default:
        return '📢';
    }
  };

  if (isLoadingStoreId || isLoading) {
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

  const notificationList = notificationsResponse?.data?.list ?? [];
  const pageInfo = notificationsResponse?.data?.pageInfo;

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='headline-2'>알림</h1>
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

      {/* 알림 목록 */}
      <div className='space-y-4'>
        {notificationList.length === 0 ? (
          <Card className='p-6'>
            <div className='text-center text-gray-500'>알림이 없습니다.</div>
          </Card>
        ) : (
          notificationList.map((notification) => (
            <Card key={notification.id} className='p-6 hover:shadow-lg transition-shadow'>
              <div className='flex gap-4'>
                {/* 카테고리 아이콘 */}
                <div className='flex-shrink-0'>
                  <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl'>
                    {getCategoryIcon(notification.category)}
                  </div>
                </div>

                {/* 알림 내용 */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-4 mb-2'>
                    <h3 className='text-base font-semibold text-gray-900'>
                      {notification.title}
                    </h3>
                    <span className='text-sm text-gray-500 whitespace-nowrap'>
                      {formatDateTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600 mb-2'>{notification.content}</p>
                  {notification.linkUrl && (
                    <a
                      href={notification.linkUrl}
                      className='text-sm text-blue-600 hover:underline'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      자세히 보기 →
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {pageInfo && pageInfo.totalPages > 1 && (
        <div className='flex justify-center mt-6'>
          <Pagination
            page={pagination.pageIndex + 1}
            total={pageInfo.totalPages}
            onChange={(page: number) => setPagination({ ...pagination, pageIndex: page - 1 })}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;

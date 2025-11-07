'use client';

import { useState } from 'react';

import type { CeoRewardHistoryResponse } from '@repo/api/ceo';
import { DataTable, Pagination, SortToggle } from '@repo/design-system/components/ceo';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { useStoreRewardHistory } from '@/hooks/reward/useStoreRewardHistory';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const PointListPage = () => {
  const { selectedStoreId, isLoading: isLoadingStoreId } = useSelectedStoreId();
  const [sortOrder, setSortOrder] = useState<'RECENT' | 'OLD'>('RECENT');

  const { data: rewardHistoryResponse, isLoading: isLoadingHistory } = useStoreRewardHistory(
    selectedStoreId || 0,
    sortOrder,
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // 전화번호 마스킹 처리 (010 **** 0000)
  const formatPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.length !== 11) return phoneNumber;
    return `${phoneNumber.slice(0, 3)} **** ${phoneNumber.slice(7)}`;
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 시간 포맷팅
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const columns: ColumnDef<CeoRewardHistoryResponse>[] = [
    {
      header: () => <div className='text-left text-body-2'>번호</div>,
      accessorKey: 'phoneNumber',
      size: 300,
      cell: ({ row }) => (
        <span className='text-body-2 text-gray-900'>
          {formatPhoneNumber(row.original.phoneNumber)}
        </span>
      ),
    },
    {
      header: () => <div className='text-left text-body-2'>포인트</div>,
      accessorKey: 'target',
      size: 100,
      cell: ({ row }) => (
        <span className='text-body-2 font-medium text-gray-900'>{row.original.target} P</span>
      ),
    },
    // {
    //   header: '리워드 타입',
    //   accessorKey: 'rewardType',
    //   cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.rewardType}</span>,
    // },
    {
      header: () => <div className='text-left text-body-2'>채널</div>,
      accessorKey: 'channel',
      size: 80,
      cell: ({ row }) => <span className='text-body-2 text-gray-900'>{row.original.channel}</span>,
    },
    {
      header: () => <div className='text-left text-body-2'>종류</div>,
      accessorKey: 'category',
      size: 80,
      cell: ({ row }) => <span className='text-body-2 text-gray-900'>{row.original.category}</span>,
    },
    // {
    //   header: '작업',
    //   accessorKey: 'operation',
    //   cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.operation}</span>,
    // },
    {
      header: () => <div className='text-left text-body-2'>적립시간</div>,
      accessorKey: 'createdAt',
      size: 120,
      cell: ({ row }) => (
        <div className='text-right'>
          <div className='text-sm text-gray-900 text-body-2'>
            {formatDate(row.original.createdAt)}
          </div>
          <div className='text-sm text-gray-500 text-body-2'>
            {formatTime(row.original.createdAt)}
          </div>
        </div>
      ),
    },
  ];

  if (isLoadingStoreId || isLoadingHistory) {
    return (
      <div className='space-y-4'>
        <div className='headline-2 ml-8'>적립</div>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='mb-4'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              </div>
              <div className='text-gray-600'>리워드 내역을 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const rewardList = rewardHistoryResponse?.data ?? [];

  return (
    <div className='space-y-5'>
      <div className='flex justify-between items-center mb-6'>
        <div className='headline-2 ml-8'>적립</div>
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
          data={rewardList}
          emptyRenderer='적립 내역이 없습니다.'
          options={{
            manualPagination: true,
            state: {
              pagination,
            },
            onPaginationChange: setPagination,
            pageCount: Math.ceil(rewardList.length / pagination.pageSize),
          }}
        />
      </div>

      {rewardList.length > 0 && (
        <div className='flex justify-center mt-4'>
          <Pagination
            page={pagination.pageIndex + 1}
            total={Math.ceil(rewardList.length / pagination.pageSize)}
            onChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))}
          />
        </div>
      )}
    </div>
  );
};

export default PointListPage;

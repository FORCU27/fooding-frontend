'use client';

import { useState } from 'react';

import { DataTable, Pagination, SortToggle } from '@repo/design-system/components/ceo';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

interface PointEarning {
  id: number;
  phoneNumber: string;
  point: number;
  channel: string;
  type: string;
  earnedAt: string;
}

// 하드코딩된 샘플 데이터
const SAMPLE_POINT_EARNINGS: PointEarning[] = [
  {
    id: 1,
    phoneNumber: '01012340000',
    point: 9999,
    channel: '온라인',
    type: '방문',
    earnedAt: '2025-02-01T23:12:02',
  },
  {
    id: 2,
    phoneNumber: '01056781234',
    point: 9999,
    channel: '온라인',
    type: '방문',
    earnedAt: '2025-02-01T23:12:02',
  },
  {
    id: 3,
    phoneNumber: '01098765432',
    point: 9999,
    channel: '온라인',
    type: '방문',
    earnedAt: '2025-02-01T23:12:02',
  },
  {
    id: 4,
    phoneNumber: '01011112222',
    point: 9999,
    channel: '온라인',
    type: '방문',
    earnedAt: '2025-02-01T23:12:02',
  },
  {
    id: 5,
    phoneNumber: '01033334444',
    point: 9999,
    channel: '온라인',
    type: '방문',
    earnedAt: '2025-02-01T23:12:02',
  },
  {
    id: 6,
    phoneNumber: '01055556666',
    point: 9999,
    channel: '온라인',
    type: '방문',
    earnedAt: '2025-02-01T23:12:02',
  },
];

const PointListPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sortOrder, setSortOrder] = useState<'RECENT' | 'OLD'>('RECENT');

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

  const columns: ColumnDef<PointEarning>[] = [
    {
      header: '번호',
      accessorKey: 'phoneNumber',
      cell: ({ row }) => (
        <span className='text-sm text-gray-900'>
          {formatPhoneNumber(row.original.phoneNumber)}
        </span>
      ),
    },
    {
      header: '포인트',
      accessorKey: 'point',
      cell: ({ row }) => (
        <span className='text-sm font-medium text-gray-900'>
          {row.original.point.toLocaleString()} P
        </span>
      ),
    },
    {
      header: '채널',
      accessorKey: 'channel',
      cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.channel}</span>,
    },
    {
      header: '종류',
      accessorKey: 'type',
      cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.type}</span>,
    },
    {
      header: '적립시간',
      accessorKey: 'earnedAt',
      cell: ({ row }) => (
        <div className='text-right'>
          <div className='text-sm text-gray-900'>{formatDate(row.original.earnedAt)}</div>
          <div className='text-sm text-gray-500'>{formatTime(row.original.earnedAt)}</div>
        </div>
      ),
    },
  ];

  // 정렬 적용된 데이터
  const sortedData = [...SAMPLE_POINT_EARNINGS].sort((a, b) => {
    if (sortOrder === 'RECENT') {
      return new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime();
    }
    return new Date(a.earnedAt).getTime() - new Date(b.earnedAt).getTime();
  });

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
          data={sortedData}
          emptyRenderer='적립 내역이 없습니다.'
          options={{
            manualPagination: true,
            state: {
              pagination,
            },
            onPaginationChange: setPagination,
            pageCount: Math.ceil(sortedData.length / pagination.pageSize),
          }}
        />
      </div>

      {sortedData.length > 0 && (
        <div className='flex justify-center mt-4'>
          <Pagination
            page={pagination.pageIndex + 1}
            total={Math.ceil(sortedData.length / pagination.pageSize)}
            onChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))}
          />
        </div>
      )}
    </div>
  );
};

export default PointListPage;

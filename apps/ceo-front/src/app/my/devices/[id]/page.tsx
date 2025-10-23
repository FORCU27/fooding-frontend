'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Button, Card, DataTable, Pagination } from '@repo/design-system/components/ceo';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { useGetDevice } from '@/hooks/devices/useGetDevice';

// 변경이력 타입 (API가 없으므로 임시)
type ChangeHistory = {
  id: number;
  type: string;
  changedAt: string;
};

const DeviceDetailPage = () => {
  const params = useParams();
  const deviceId = Number(params.id);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [filterType, setFilterType] = useState<'ALL' | 'OLDEST' | 'NEWEST'>('ALL');

  const { data: device, isLoading } = useGetDevice(deviceId);

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

  const getPlatformIcon = (platform: 'IOS' | 'ANDROID') => {
    if (platform === 'IOS') {
      return '🍎'; // Apple icon placeholder
    }
    return '🤖'; // Android icon placeholder
  };

  const handleDisconnect = () => {
    alert('연결해제 기능은 준비중입니다.');
  };

  const handleServiceChange = () => {
    alert('서비스변경 기능은 준비중입니다.');
  };

  // 변경이력 컬럼 정의 (API 없으므로 임시)
  const columns: ColumnDef<ChangeHistory>[] = [
    {
      accessorKey: 'type',
      header: '종류',
      cell: ({ row }) => <span className='text-gray-900'>{row.original.type}</span>,
    },
    {
      accessorKey: 'changedAt',
      header: '변경 일자',
      cell: ({ row }) => (
        <span className='text-gray-500'>{formatDateTime(row.original.changedAt)}</span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='headline-2'>기기상세</div>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='mb-4'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              </div>
              <div className='text-gray-600'>기기 정보를 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!device) {
    return (
      <div className='space-y-4'>
        <div className='headline-2'>기기상세</div>
        <div className='bg-white rounded-lg shadow p-6'>
          <div className='text-center text-gray-500'>기기를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  // API가 없으므로 빈 배열 (실제로는 API로 받아와야 함)
  const changeHistoryData: ChangeHistory[] = [];

  return (
    <div className='space-y-6'>
      <h1 className='headline-2'>기기상세</h1>

      {/* 기기 정보 카드 */}
      <Card className='p-6'>
        <div className='flex justify-between items-start'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <h3 className='text-lg font-semibold text-gray-900'>{device.name}</h3>
            </div>
            <p className='text-sm text-gray-500 mb-4'>Device-{device.id}</p>

            <div className='space-y-2'>
              <div className='flex gap-4'>
                <span className='text-sm text-gray-500 min-w-[120px]'>마지막 접속 일자</span>
                <span className='text-sm text-gray-900'>
                  {formatDateTime(device.lastConnectedAt)}
                </span>
              </div>
              <div className='flex gap-4'>
                <span className='text-sm text-gray-500 min-w-[120px]'>설치 일자</span>
                <span className='text-sm text-gray-900'>{formatDateTime(device.installedAt)}</span>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-end gap-4'>
            <div className='flex items-center gap-2'>
              <span className='text-2xl'>{getPlatformIcon(device.platform)}</span>
              <div className='text-right'>
                <p className='text-sm font-medium text-gray-900'>{device.name}</p>
                <p className='text-xs text-gray-500'>
                  ({device.platform.toLowerCase()} {device.osVersion})
                </p>
              </div>
            </div>

            <div className='flex gap-2'>
              <Button variant='outlined' onClick={handleDisconnect}>
                연결해제
              </Button>
              <Button onClick={handleServiceChange}>서비스변경</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* 변경이력 섹션 */}
      <div className='space-y-4'>
        <h2 className='headline-2'>변경이력</h2>

        <Card className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex gap-2'>
              <Button
                variant={filterType === 'ALL' ? 'primary' : 'outlined'}
                onClick={() => setFilterType('ALL')}
              >
                전체
              </Button>
              <Button
                variant={filterType === 'OLDEST' ? 'primary' : 'outlined'}
                onClick={() => setFilterType('OLDEST')}
              >
                오래된순
              </Button>
              <Button
                variant={filterType === 'NEWEST' ? 'primary' : 'outlined'}
                onClick={() => setFilterType('NEWEST')}
              >
                최신순
              </Button>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow overflow-hidden'>
            <DataTable
              columns={columns}
              data={changeHistoryData}
              emptyRenderer='변경 이력이 없습니다.'
              options={{
                state: {
                  pagination,
                },
                onPaginationChange: setPagination,
                pageCount: 0,
                manualPagination: true,
              }}
            />
          </div>

          {changeHistoryData.length > 0 && (
            <div className='flex justify-center mt-4'>
              <Pagination
                page={pagination.pageIndex + 1}
                total={1}
                onChange={(page: number) => setPagination({ ...pagination, pageIndex: page - 1 })}
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DeviceDetailPage;

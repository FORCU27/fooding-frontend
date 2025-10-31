'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button, Card, DataTable, Pagination } from '@repo/design-system/components/ceo';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { AndroidIcon } from '@/components/icons/AndroidIcon';
import { IOSIcon } from '@/components/icons/IOSIcon';
import { useDeviceLogs } from '@/hooks/device/useDeviceLogs';
import { useGetDevice } from '@/hooks/devices/useGetDevice';

type DeviceLog = {
  logId: number;
  deviceId: number;
  date: string;
  time: string;
  operation: string;
};

const DeviceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const deviceId = Number(params.id);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: device, isLoading: isLoadingDevice } = useGetDevice(deviceId);
  const { data: logsResponse, isLoading: isLoadingLogs } = useDeviceLogs({
    deviceId,
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

  const getPlatformIcon = (platform: 'IOS' | 'ANDROID') => {
    if (platform === 'IOS') {
      return <IOSIcon size={40} />;
    }
    return <AndroidIcon size={40} />;
  };

  const columns: ColumnDef<DeviceLog>[] = [
    {
      header: '로그 ID',
      accessorKey: 'logId',
      cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.logId}</span>,
    },
    {
      header: '날짜',
      accessorKey: 'date',
      cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.date}</span>,
    },
    {
      header: '시간',
      accessorKey: 'time',
      cell: ({ row }) => <span className='text-sm text-gray-500'>{row.original.time}</span>,
    },
    {
      header: '작업',
      accessorKey: 'operation',
      cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.operation}</span>,
    },
  ];

  if (isLoadingDevice) {
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
        <div className='headline-2'>기기 상세</div>
        <Card className='p-6'>
          <div className='text-center text-gray-500'>기기 정보를 찾을 수 없습니다.</div>
        </Card>
      </div>
    );
  }

  const logList = logsResponse?.data?.list ?? [];
  const pageInfo = logsResponse?.data?.pageInfo;

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='headline-2'>기기 상세</h1>
        <Button variant='outlined' onClick={() => router.back()}>
          목록으로
        </Button>
      </div>

      {/* 기기 정보 카드 */}
      <Card className='p-6'>
        <div className='flex justify-between items-start'>
          <div className='flex-1'>
            <div className='flex items-center gap-3 mb-4'>
              {getPlatformIcon(device.platform)}
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>{device.name}</h2>
                <p className='text-sm text-gray-500'>Device-{device.id}</p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mt-6'>
              <div>
                <p className='text-sm text-gray-500 mb-1'>플랫폼</p>
                <p className='text-base font-medium text-gray-900'>{device.platform}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500 mb-1'>OS 버전</p>
                <p className='text-base font-medium text-gray-900'>{device.osVersion}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500 mb-1'>패키지명</p>
                <p className='text-base font-medium text-gray-900'>{device.packageName}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500 mb-1'>설치 일자</p>
                <p className='text-base font-medium text-gray-900'>
                  {formatDateTime(device.installedAt)}
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-500 mb-1'>마지막 접속</p>
                <p className='text-base font-medium text-gray-900'>
                  {formatDateTime(device.lastConnectedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 로그 테이블 */}
      <Card className='p-6'>
        <h3 className='text-lg font-semibold mb-4'>기기 로그</h3>

        {isLoadingLogs ? (
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='mb-4'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              </div>
              <div className='text-gray-600'>로그를 불러오는 중...</div>
            </div>
          </div>
        ) : logList.length === 0 ? (
          <div className='text-center text-gray-500 py-8'>로그가 없습니다.</div>
        ) : (
          <>
            <DataTable columns={columns} data={logList} />

            {pageInfo && pageInfo.totalPages > 1 && (
              <div className='flex justify-center mt-6'>
                <Pagination
                  page={pagination.pageIndex + 1}
                  total={pageInfo.totalPages}
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

export default DeviceDetailPage;

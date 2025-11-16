'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Button, Card, DataTable, Pagination } from '@repo/design-system/components/ceo';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import type { CeoDeviceResponseSchema } from '@repo/api/ceo';
import { z } from 'zod/v4';

import { AndroidIcon } from '@/components/icons/AndroidIcon';
import { IOSIcon } from '@/components/icons/IOSIcon';
import { useDeviceLogs } from '@/hooks/device/useDeviceLogs';
import { useGetDevices } from '@/hooks/devices/useGetDevices';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

type DeviceLog = {
  logId: number;
  deviceId: number;
  date: string;
  time: string;
  operation: string;
};

type Device = z.infer<typeof CeoDeviceResponseSchema>;

const DeviceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const deviceId = Number(params.id);
  const { selectedStoreId, isLoading: isLoadingStoreId } = useSelectedStoreId();

  const [device, setDevice] = useState<Device | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch device list as fallback
  const { data: deviceResponse, isLoading: isLoadingDevices } = useGetDevices({
    storeId: selectedStoreId,
    pageNum: 1,
    pageSize: 100, // Fetch enough to find our device
  });

  const { data: logsResponse, isLoading: isLoadingLogs } = useDeviceLogs({
    deviceId,
    pageNum: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  // Fetch device from API
  useEffect(() => {
    if (deviceResponse?.data?.list) {
      const foundDevice = deviceResponse.data.list.find((d) => d.id === deviceId);
      if (foundDevice) {
        setDevice(foundDevice);
      }
    }
  }, [deviceId, deviceResponse]);

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
      return <IOSIcon size={30} />;
    }
    return <AndroidIcon size={30} />;
  };

  const columns: ColumnDef<DeviceLog>[] = [
    // {
    //   header: '로그 ID',
    //   accessorKey: 'logId',
    //   cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.logId}</span>,
    // },
    {
      header: '종류',
      accessorKey: 'operation',
      cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.operation}</span>,
    },
    {
      header: '변경일자',
      accessorKey: 'time',
      cell: ({ row }) => (
        <div>
          <span className='text-sm text-gray-900'>{row.original.date}</span>
          <span className='text-sm text-gray-500'>{row.original.time}</span>
        </div>
      ),
    },
  ];

  const logList = logsResponse?.data?.list ?? [];
  const pageInfo = logsResponse?.data?.pageInfo;
  const isLoading = isLoadingStoreId || isLoadingDevices || isLoadingLogs;

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='headline-2'>기기 변경 이력</h1>
        <Button variant='outlined' onClick={() => router.back()}>
          목록으로
        </Button>
      </div>

      {/* 기기 정보 */}
      {isLoading && !device ? (
        <Card className='p-6'>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='mb-4'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              </div>
              <div className='text-gray-600'>기기 정보를 불러오는 중...</div>
            </div>
          </div>
        </Card>
      ) : device ? (
        <Card className='p-6'>
          <div className='flex justify-between items-start'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <h3 className='text-lg font-semibold text-gray-900'>{device.name}</h3>
              </div>
              <p className='text-sm text-gray-500 mb-4'>Device-{device.id}</p>

              <div className='space-y-1'>
                <div className='flex gap-4'>
                  <span className='text-sm text-gray-500 min-w-[100px]'>마지막 접속 일자</span>
                  <span className='text-sm text-gray-900'>
                    {formatDateTime(device.lastConnectedAt)}
                  </span>
                </div>
                <div className='flex gap-4'>
                  <span className='text-sm text-gray-500 min-w-[100px]'>설치 일자</span>
                  <span className='text-sm text-gray-900'>
                    {formatDateTime(device.installedAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-end gap-2'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl'>{getPlatformIcon(device.platform)}</span>
                <div className='text-right'>
                  <p className='text-sm font-medium text-gray-900'>{device.name}</p>
                  <p className='text-xs text-gray-500'>
                    ({device.platform.toLowerCase()} {device.osVersion})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className='p-6'>
          <div className='text-center text-gray-500 py-8'>기기 정보를 찾을 수 없습니다.</div>
        </Card>
      )}

      {/* 로그 테이블 */}
      <Card className='p-6'>
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

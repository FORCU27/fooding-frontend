'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Card, Pagination, SortToggle } from '@repo/design-system/components/ceo';
import type { PaginationState } from '@tanstack/react-table';

import { useGetDevices } from '@/hooks/devices/useGetDevices';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const DevicesPage = () => {
  const router = useRouter();
  const { selectedStoreId, isLoading: isLoadingStoreId } = useSelectedStoreId();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sortOrder, setSortOrder] = useState<'RECENT' | 'OLD'>('RECENT');

  const { data: deviceResponse, isLoading } = useGetDevices({
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

  const getPlatformIcon = (platform: 'IOS' | 'ANDROID') => {
    if (platform === 'IOS') {
      return '🍎'; // Apple icon placeholder
    }
    return '🤖'; // Android icon placeholder
  };

  const handleCardClick = (deviceId: number) => {
    router.push(`/my/devices/${deviceId}`);
  };

  if (isLoadingStoreId || isLoading) {
    return (
      <div className='space-y-4'>
        <div className='headline-2'>기기관리</div>
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

  const deviceList = deviceResponse?.data?.list ?? [];
  const pageInfo = deviceResponse?.data?.pageInfo;

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='headline-2'>기기관리</h1>
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

      <div className='space-y-4'>
        {deviceList.length === 0 ? (
          <Card className='p-6'>
            <div className='text-center text-gray-500'>등록된 기기가 없습니다.</div>
          </Card>
        ) : (
          deviceList.map((device) => (
            <div
              key={device.id}
              className='cursor-pointer'
              onClick={() => handleCardClick(device.id)}
            >
              <Card className='p-6 hover:shadow-lg transition-shadow'>
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
            </div>
          ))
        )}
      </div>

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

export default DevicesPage;

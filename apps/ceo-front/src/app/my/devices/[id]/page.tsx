'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  Button,
  Card,
  DataTable,
  Pagination,
  Dialog,
  RadioButton,
} from '@repo/design-system/components/ceo';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import type { CeoDeviceResponseSchema, ServiceType } from '@repo/api/ceo';
import { deviceApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod/v4';

import { AndroidIcon } from '@/components/icons/AndroidIcon';
import { IOSIcon } from '@/components/icons/IOSIcon';
import { useDeviceLogs } from '@/hooks/device/useDeviceLogs';
import { useGetDevices } from '@/hooks/devices/useGetDevices';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';
import { formatDotDate, formatTime } from '@/utils/date';

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
  const queryClient = useQueryClient();
  const deviceId = Number(params.id);
  const { selectedStoreId, isLoading: isLoadingStoreId } = useSelectedStoreId();

  const [device, setDevice] = useState<Device | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>('REWARD_MANAGEMENT');
  const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false);

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

  // Mutation for changing device service
  const changeServiceMutation = useMutation({
    mutationFn: (serviceType: ServiceType) =>
      deviceApi.changeDeviceService({
        deviceId,
        storeId: selectedStoreId!,
        serviceType,
      }),
    onSuccess: () => {
      setIsServiceDialogOpen(false);
      // Refresh device logs to show the new change
      queryClient.invalidateQueries({ queryKey: [queryKeys.ceo.device.logs, deviceId] });
    },
  });

  // Mutation for disconnecting device
  const disconnectMutation = useMutation({
    mutationFn: () => deviceApi.disconnectDevice({ deviceId }),
    onSuccess: () => {
      setIsDisconnectDialogOpen(false);
      // Refresh device logs to show the disconnect action
      queryClient.invalidateQueries({ queryKey: [queryKeys.ceo.device.logs, deviceId] });
    },
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

  const handleServiceChange = () => {
    changeServiceMutation.mutate(selectedServiceType);
  };

  const handleDisconnect = () => {
    disconnectMutation.mutate();
  };

  const serviceTypeLabels: Record<ServiceType, string> = {
    REWARD_MANAGEMENT: '리워드 관리',
    REWARD_RECEIPT: '리워드 영수증',
    WAITING_MANAGEMENT: '웨이팅 관리',
    WAITING_RECEIPT: '웨이팅 영수증',
  };

  const columns: ColumnDef<DeviceLog>[] = [
    // {
    //   header: '로그 ID',
    //   accessorKey: 'logId',
    //   cell: ({ row }) => <span className='text-sm text-gray-900'>{row.original.logId}</span>,
    // },
    {
      header: () => <div className='text-left'>종류</div>,
      accessorKey: 'operation',
      cell: ({ row }) => <span className='body-2 text-black'>{row.original.operation}</span>,
    },
    {
      header: () => <div className='text-right'>변경일자</div>,
      accessorKey: 'time',
      cell: ({ row }) => (
        <div className='space-y-1 text-right'>
          <div className='body-2 text-black'>{row.original.date}</div>
          <div className='body-2 text-gray-5'>{row.original.time}</div>
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
          <div>
            <div>
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-2'>
                    <h3 className='text-lg font-semibold text-gray-900'>{device.name}</h3>
                  </div>
                  <p className='text-sm text-gray-500 mb-4'>Device-{device.id}</p>
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

              <div className='flex mt-[105px] justify-between'>
                <div className=''>
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
                <div className='flex flex-row gap-[12px]'>
                  <Button variant='primaryPink' onClick={() => setIsDisconnectDialogOpen(true)}>
                    연결해제
                  </Button>
                  <Button onClick={() => setIsServiceDialogOpen(true)}>서비스 변경</Button>
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

      {/* 서비스 변경 다이얼로그 */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>서비스 변경</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <div className='space-y-4'>
              <p className='text-sm text-gray-600 mb-4'>변경할 서비스를 선택해주세요</p>
              {(Object.keys(serviceTypeLabels) as ServiceType[]).map((type) => (
                <RadioButton
                  key={type}
                  label={serviceTypeLabels[type]}
                  value={type}
                  checked={selectedServiceType === type}
                  onChange={(value) => setSelectedServiceType(value as ServiceType)}
                  name='serviceType'
                />
              ))}
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant='outlined' className='flex-1'>
                취소
              </Button>
            </Dialog.Close>
            <Button
              onClick={handleServiceChange}
              disabled={changeServiceMutation.isPending}
              className='flex-1'
            >
              {changeServiceMutation.isPending ? '변경 중...' : '확인'}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      {/* 연결해제 확인 다이얼로그 */}
      <Dialog open={isDisconnectDialogOpen} onOpenChange={setIsDisconnectDialogOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>연결해제</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <p className='text-center text-gray-600'>정말로 이 기기의 연결을 해제하시겠습니까?</p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant='outlined' className='flex-1'>
                취소
              </Button>
            </Dialog.Close>
            <Button
              variant='primaryPink'
              onClick={handleDisconnect}
              disabled={disconnectMutation.isPending}
              className='flex-1'
            >
              {disconnectMutation.isPending ? '해제 중...' : '확인'}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default DeviceDetailPage;

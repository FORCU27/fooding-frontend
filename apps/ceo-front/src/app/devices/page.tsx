'use client';

import { deviceApi } from '@repo/api/ceo';
import queryKeys from '@repo/api/constants/query-keys';
import { useQuery } from '@tanstack/react-query';

const DevicesPage = () => {
  const { data: ceoDeviceResponse, isLoading } = useQuery({
    queryKey: [queryKeys.ceo.devices],
    queryFn: () => deviceApi.getCeoDeviceList(0, 10, 1), //FIXME: storeId 추후 수정
  });

  if (isLoading) {
    return <div className='p-4'>로딩 중...</div>;
  }

  const deviceList = ceoDeviceResponse?.data?.list ?? [];

  return (
    <div className='flex flex-col h-full w-full p-3 bg-white'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>기기관리</h1>
      <div className='flex flex-col justify-center items-start w-full gap-5'>
        <div className='flex flex-col border w-full p-3 gap-5'>
          {deviceList.map((device) => (
            <div key={device.id} className='flex flex-col border w-full p-3 gap-5'>
              <div>
                <p>{device.name}</p>
                <p>
                  {device.platform} (OS {device.osVersion})
                </p>
              </div>
              <div className='flex justify-between items-center'>
                {/* TODO: package name을 서비스로 표시 */}
                <div>{device.packageName}</div>
                <div className='text-right'>
                  <p>설치 일자 {device.installedAt}</p>
                  <p>마지막 접속 일자 {device.lastConnectedAt}</p>
                </div>
              </div>
            </div>
          ))}
          {deviceList.length === 0 && <p className='text-gray-500'>등록된 기기가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default DevicesPage;

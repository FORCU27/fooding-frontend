'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { storeApi, userApi } from '@repo/api/app';
import { ArrowLeftIcon } from '@repo/design-system/icons';
import { useQuery } from '@tanstack/react-query';

import { StoreServiceType, STORE_SERVICE_PATHS } from './types';
import { useStore } from '@/components/Provider/StoreClientProvider';
import { getSelectedService, setSelectedService } from '@/services/locale';

export default function StoreSelectPage() {
  const router = useRouter();
  const { storeId } = useStore();

  const { data: user } = useQuery({ queryKey: ['user'], queryFn: userApi.getUser });
  const { data: storeServiceList } = useQuery({
    queryKey: ['storeServiceList'],
    queryFn: () => storeApi.getStoreServiceList({ id: Number(3) }),
  });

  const [selectedService, setSelectedServiceState] = useState<StoreServiceType>(
    StoreServiceType.WAITING,
  );
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);

  useEffect(() => {
    const loadSavedService = async () => {
      const savedService = await getSelectedService();
      if (savedService) {
        setSelectedServiceState(savedService);
      }
    };
    loadSavedService();
  }, []);

  const handleSelectService = async (service: StoreServiceType) => {
    if (selectedService === service) {
      // 이미 선택된 서비스를 더블클릭한 경우
      await setSelectedService(service);
      router.push(STORE_SERVICE_PATHS[service]);
    } else {
      // 새로운 서비스 선택
      setSelectedServiceState(service);
      await setSelectedService(service);
    }
  };

  const handleTouch = (service: StoreServiceType) => {
    const currentTime = new Date().getTime();
    const touchDiff = currentTime - lastTouchTime;

    if (touchDiff < 300 && touchDiff > 0) {
      handleSelectService(service);
    }
    setLastTouchTime(currentTime);
  };

  return (
    <div className='flex h-screen flex-col'>
      <div className='flex-1  flex flex-col items-center justify-center'>
        <button className='absolute top-[50px] left-[80px] w-[60px] h-[60px]'>
          <ArrowLeftIcon />
        </button>
        <div className='headline-3-2'>서비스 선택</div>
        <div className='body-1 text-gray-5'>원하시는 서비스를 선택해주세요</div>
      </div>
      <div className='flex-[4] flex flex-col items-center justify-center'>
        <div className='flex gap-[34px]'>
          {storeServiceList?.data?.map((service) => (
            <div
              key={service.id}
              className='relative shadow bg-gray-1 rounded-[40px] px-[44px] pt-[56px] pb-[80px] flex flex-col items-center justify-center gap-[25px] touch-none select-none'
              onDoubleClick={() => handleSelectService(service.type as StoreServiceType)}
              onTouchStart={() => handleTouch(service.type as StoreServiceType)}
            >
              {selectedService === service.type && (
                <div className='absolute inset-0 w-full h-full bg-black rounded-[40px] opacity-50 z-50'></div>
              )}
              <div className='w-[325px] h-[275px] bg-blue-400'></div>
              <div className='headline-5 text-gray-5'>{service.type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { storeApi, userApi } from '@repo/api/app';
import { useQuery } from '@tanstack/react-query';

export default function StoreSelectPage() {
  const router = useRouter();
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: userApi.getUser });
  const {
    data: storeServiceList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['storeServiceList'],
    queryFn: () => storeApi.getStoreServiceList({ id: 1 }),
  });

  useEffect(() => {
    console.log('storeServiceList:', storeServiceList);
  }, [storeServiceList]);

  useEffect(() => {
    if (isLoading) {
      console.log('로딩 중...');
    } else if (error) {
      console.error('에러 발생:', error);
    } else if (storeServiceList) {
      console.log('storeServiceList:', storeServiceList);
    }
  }, [isLoading, error, storeServiceList]);

  const [selectedService, setSelectedService] = useState<string>('');
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);

  useEffect(() => {
    const savedService = localStorage.getItem('selectedService');
    if (savedService) {
      setSelectedService(savedService);
    }
  }, []);

  const handleSelectService = (service: string) => {
    if (selectedService === service) {
      // 이미 선택된 서비스를 더블클릭한 경우

      switch (service) {
        case 'WAITING':
          router.push(`/store/waiting`);
          break;
        case 'REWARD':
          router.push(`/store/reward`);
          break;
        case 'PAYMENT':
          router.push(`/store/payment`);
          break;
        default:
          router.push(`/store/${service}`);
          break;
      }
    } else {
      // 새로운 서비스 선택
      setSelectedService(service);
      localStorage.setItem('selectedService', service);
    }
  };

  const handleTouch = (service: string) => {
    const currentTime = new Date().getTime();
    const touchDiff = currentTime - lastTouchTime;

    if (touchDiff < 300 && touchDiff > 0) {
      handleSelectService(service);
    }
    setLastTouchTime(currentTime);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className='flex h-screen flex-col'>
      <div className='flex-1  flex flex-col items-center justify-center'>
        <button className='absolute top-[50px] left-[80px] w-[60px] h-[60px]'>
          <svg
            width='60'
            height='60'
            viewBox='0 0 60 60'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M47.5 30H12.5M12.5 30L30 47.5M12.5 30L30 12.5'
              stroke='var(--color-gray-5)'
              strokeWidth='5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
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
              onDoubleClick={() => handleSelectService(service.type)}
              onTouchStart={() => handleTouch(service.type)}
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

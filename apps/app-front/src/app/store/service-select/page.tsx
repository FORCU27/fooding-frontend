'use client';

import { useEffect, useState } from 'react';

import { appApi } from '@repo/api/app';
import { useQuery } from '@tanstack/react-query';

export default function StoreSelectPage() {
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: appApi.getUser });
  const { data: storeServiceList } = useQuery({
    queryKey: ['storeServiceList'],
    queryFn: () => appApi.getAppStoreServiceList(1),
  });

  const [selectedService, setSelectedService] = useState<string>('');
  const [lastTouchTime, setLastTouchTime] = useState<number>(0);

  useEffect(() => {
    const savedService = localStorage.getItem('selectedService');
    if (savedService) {
      setSelectedService(savedService);
    }
  }, []);

  const handleSelectService = (service: string) => {
    setSelectedService(service);
    localStorage.setItem('selectedService', service);
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
        <div className='flex gap-[36px]'>
          <div
            className='relative shadow bg-gray-1 rounded-[40px] p-[36px] flex flex-col items-center justify-center gap-[25px] touch-none select-none'
            onDoubleClick={() => handleSelectService('waiting')}
            onTouchStart={() => handleTouch('waiting')}
          >
            {selectedService === 'waiting' && (
              <div className='absolute w-full h-full bg-black rounded-[40px] opacity-50 z-50'></div>
            )}
            <div className='w-[325px] h-[275px] bg-blue-400'></div>
            <div className='headline-5 text-gray-5'>웨이팅 관리</div>
          </div>
          <div
            className='relative bg-gray-1 shadow rounded-[40px] p-[36px] flex flex-col items-center justify-center gap-[25px] touch-none select-none'
            onDoubleClick={() => handleSelectService('reward')}
            onTouchStart={() => handleTouch('reward')}
          >
            {selectedService === 'reward' && (
              <div className='absolute w-full h-full bg-black rounded-[40px] opacity-50 z-50'></div>
            )}
            <div className='w-[325px] h-[275px] bg-red-400'></div>
            <div className='headline-5 text-gray-5'>리워드 관리</div>
          </div>
        </div>
      </div>
    </div>
  );
}

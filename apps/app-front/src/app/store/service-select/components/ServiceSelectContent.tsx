'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import { ArrowLeftIcon } from '@repo/design-system/icons';

import { StoreServiceType, STORE_SERVICE_PATHS } from '../types';
import { getSelectedService, setSelectedService } from '@/services/locale';

// types.ts에서 정의된 StoreServiceItem과 호환
interface ServiceItem {
  id: number;
  storeId: number;
  storeName: string;
  type: string;
  activation: boolean;
  createdAt: string;
  endedAt: string | null;
}

interface ServiceSelectContentProps {
  storeServiceList: ServiceItem[];
}

export default function ServiceSelectContent({ storeServiceList }: ServiceSelectContentProps) {
  const router = useRouter();

  const [selectedService, setSelectedServiceState] = useState<StoreServiceType>(
    StoreServiceType.WAITING,
  );

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
      // 이미 선택된 서비스를 클릭한 경우 → 페이지 이동
      await setSelectedService(service);
      router.push(STORE_SERVICE_PATHS[service]);
    } else {
      // 새로운 서비스 선택
      setSelectedServiceState(service);
      await setSelectedService(service);
    }
  };

  const uniqueServiceList = useMemo(() => {
    if (!storeServiceList) return [];
    const uniqueMap = new Map<string, ServiceItem>();
    storeServiceList.forEach((item) => {
      if (!uniqueMap.has(item.type)) {
        uniqueMap.set(item.type, item);
      }
    });
    return Array.from(uniqueMap.values());
  }, [storeServiceList]);

  const gridColsClass =
    uniqueServiceList.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';

  return (
    <div className='flex min-h-screen flex-col px-[80px] select-none'>
      <div className='relative flex items-center justify-center text-center h-[160px]'>
        <button
          type='button'
          className='absolute left-0 top-1/2 -translate-y-1/2 w-[52px] h-[52px] md:w-[60px] md:h-[60px] cursor-pointer'
          onClick={() => router.back()}
        >
          <ArrowLeftIcon />
        </button>
        <div className='flex flex-col items-center gap-1'>
          <div className='headline-4'>서비스 선택</div>
          <div className='body-2 text-gray-5'>원하시는 서비스를 선택해주세요</div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center pb-6 flex-1'>
        <div
          className={`w-full flex ${gridColsClass} gap-[37px] item-center justify-center place-items-center`}
        >
          {uniqueServiceList.map((service) => {
            const isSelected = selectedService === service.type;
            return (
              <div
                key={service.id}
                className={`w-full max-w-[412px] rounded-[32px] md:rounded-[40px] ${
                  isSelected ? 'p-[6px] bg-gradient-to-r from-[#E8D400] to-[#00D218]' : ''
                }`}
              >
                <div
                  className={`relative shadow bg-gray-1 rounded-[28px] md:rounded-[36px] px-8 md:px-[44px] pt-12 md:pt-[56px] pb-14 md:pb-[80px] flex flex-col items-center justify-center gap-6 cursor-pointer ${
                    isSelected ? 'bg-white' : ''
                  }`}
                  onClick={() => handleSelectService(service.type as StoreServiceType)}
                >
                  <div className='w-full h-[220px] md:h-[275px] relative'>
                    <Image
                      src={`/images/select-servics/${getServiceImageName(service.type)}.png`}
                      alt={`${getServiceLabel(service.type)} 서비스 이미지`}
                      fill
                      className='object-contain rounded-[20px]'
                      sizes='325px'
                      priority
                    />
                  </div>
                  <div className='headline-5 text-gray-5'>{getServiceLabel(service.type)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const getServiceImageName = (serviceType: string) => {
  switch (serviceType) {
    case StoreServiceType.WAITING:
      return 'wating';
    case StoreServiceType.REWARD:
      return 'reword';
    case StoreServiceType.PAYMENT:
      return 'wating';
    default:
      return 'wating';
  }
};

const getServiceLabel = (serviceType: string) => {
  switch (serviceType) {
    case StoreServiceType.WAITING:
      return '웨이팅 관리';
    case StoreServiceType.REWARD:
      return '리워드 관리';
    case StoreServiceType.PAYMENT:
      return '결제 관리';
    default:
      return serviceType;
  }
};

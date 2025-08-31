'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Button, Skeleton } from '@repo/design-system/components/b2c';
import {
  ChevronUpIcon,
  ClockIcon,
  FoodingIcon,
  MarkPinIcon,
  PhoneIcon,
} from '@repo/design-system/icons';
import { ActivityComponentType } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';

import { StoreInfoMap } from '../waiting-detail/components/StoreInfoMap';
import { LoadingToggle } from '@/components/Devtool/LoadingToggle';
import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useGetPlanList } from '@/hooks/plan/useGetPlanList';
import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { formatDotDateTime } from '@/utils/date';

export const PlanDetailScreen: ActivityComponentType<'PlanDetailScreen'> = ({ params }) => {
  return (
    <Screen header={<Header title='예약 상세정보' left={<Header.Back />} />}>
      <DefaultErrorBoundary>
        <LoadingToggle fallback={<PlanDetailLoadingFallback />}>
          <Suspense clientOnly fallback={<PlanDetailLoadingFallback />}>
            <PlanDetail planId={params.planId} />
          </Suspense>
        </LoadingToggle>
      </DefaultErrorBoundary>
    </Screen>
  );
};

type StoreDetailProps = {
  planId: number;
};

const PlanDetail = ({ planId }: StoreDetailProps) => {
  const { data: plans } = useGetPlanList();
  const plan = plans.list[0];
  const { data: storeInfo } = useGetStoreDetail(planId); //TODO: 예약상세 API -> 수정
  const [isAlertAccordionOpen, setIsAlertAccordionOpen] = useState(false);
  const [isParkingAccordionOpen, setIsParkingAccordionOpen] = useState(false);
  const onParkingAccordionClick = () => {
    setIsParkingAccordionOpen((prev) => !prev);
  };

  const onAlertAccordionClick = () => {
    setIsAlertAccordionOpen((prev) => !prev);
  };

  const getKakaoMapDirectionUrl = (latitude: number, longitude: number, name?: string) => {
    const encodedName = encodeURIComponent(name ?? '목적지');
    return `https://map.kakao.com/link/to/${encodedName},${latitude},${longitude}`;
  };

  return (
    <div className='flex flex-col bg-gray-1'>
      <div className='flex flex-col p-5 bg-white/80'>
        <div className='flex border border-gray-2 items-center w-full h-[100px] p-5 rounded-xl gap-4 '>
          {storeInfo.images.length !== 0 ? (
            <div className='relative w-[60px] h-[60px] rounded-lg overflow-hidden'>
              <Image
                fill
                style={{ objectFit: 'cover' }}
                src={`/${storeInfo.images[0]}`}
                alt='리뷰 이미지'
              />
            </div>
          ) : (
            <div className='bg-gray-1 flex justify-center items-center w-[60px] h-[60px] rounded-lg'>
              <FoodingIcon width={40} height={55} color='rgba(17, 17, 17, 0.1)' />
            </div>
          )}
          <div className='flex flex-col gap-2'>
            <div className='flex bg-gray-1 text-gray-5 body-7 h-5 p-2 justify-center items-center rounded-md'>
              방문예정
            </div>
            <div className='flex subtitle-4'>{storeInfo.name}</div>
          </div>
        </div>
        <div className='flex flex-col my-6 gap-6'>
          <p className='subtitle-3'>예약정보</p>
          <p className='body-5 text-gray-5'>
            <span>{plan?.reservationTime && formatDotDateTime(plan.reservationTime)}</span>
            <span> {plan?.adultCount}명</span>
          </p>
        </div>
      </div>

      <div className='flex flex-col p-5 bg-white/80 mt-[10px]'>
        <div className='flex justify-between'>
          <div className='flex gap-4 items-center'>
            <AlertCircleIcon />
            <p className='subtitle-3'>유의사항</p>
          </div>
          <button type='button' onClick={onAlertAccordionClick}>
            <ChevronUpIcon
              className={`text-gray-5 transform transition-transform duration-200 ease-out ${isAlertAccordionOpen ? 'rotate-180 duration-200' : ''}`}
            />
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isAlertAccordionOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <p className='subtitle-4'>매장 유의사항</p>
          <div className='flex flex-col bg-gray-1 rounded-xl p-4 mt-5 body-5'>
            <p>알림 후 입장이 늦어질 경우 취소될 수 있어요</p>
            <p>알림 후 입장이 늦어질 경우 취소될 수 있어요</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col p-5 mt-[10px] bg-white/80'>
        <div className='flex gap-4 subtitle-3 items-center'>
          <MarkPinIcon size={24} />
          <p>매장위치</p>
        </div>
        <div className='flex flex-col p-3  gap-4'>
          <div className='w-full h-[300px]'>
            <StoreInfoMap
              lat={storeInfo.latitude}
              lng={storeInfo.longitude}
              className='rounded-2xl'
            />
          </div>
          <div className='flex body-6 items-center gap-2'>
            <MarkPinIcon size={18} />
            {storeInfo.address}
          </div>
          <div className='flex body-6 items-center gap-2'>
            <TramIcon />
            {storeInfo.direction}
          </div>
        </div>
        <Button
          variant='gray'
          size='large'
          onClick={() => {
            const url = getKakaoMapDirectionUrl(
              storeInfo.latitude,
              storeInfo.longitude,
              storeInfo.name,
            );
            window.open(url, '_blank');
          }}
        >
          <CompassIcon />
          <span className='ml-1'>길찾기</span>
        </Button>
        <div className='flex justify-between mt-9 items-center'>
          <div className='flex gap-4 items-center'>
            <CarIcon />
            <p className='subtitle-3'>주차 및 발렛 안내</p>
          </div>
          <button type='button' onClick={onParkingAccordionClick}>
            <ChevronUpIcon
              className={`text-gray-5 transform transition-transform duration-200 ease-out ${isParkingAccordionOpen ? 'rotate-180 duration-200' : ''}`}
            />
          </button>
        </div>
        {/* FIXME: 추후수정 */}
        {/* <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isParkingAccordionOpen ? 'max-h-40 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className='flex flex-col bg-gray-1 rounded-xl p-4 body-5'>
            <p>{storeInfo.isParkingAvailable ? '주차가능' : '주차불가'}</p>
          </div>
        </div> */}
      </div>
      <div className='flex flex-col p-5 mt-[10px] bg-white/80'>
        <div className='flex gap-4 items-center'>
          <AlertCircleIcon />
          <p className='subtitle-3'>상세정보</p>
        </div>

        <div className='flex flex-col gap-4 my-5'>
          <div className='flex flex-col gap-2'>
            <p className='subtitle-4'>전화번호</p>
            <div className='flex gap-2 items-center'>
              <PhoneIcon size={18} />
              <p className='body-6'>{storeInfo.contactNumber}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='subtitle-4'>매장소개</p>
            <p className='body-6'>{storeInfo.description}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='subtitle-4'>영업시간</p>
            <div className='flex gap-2 items-center'>
              <ClockIcon size={18} />
              <p className='body-6'>매일 10:40 - 21:50</p>
            </div>
          </div>
        </div>
        <Button variant='outlined' size='large' className='my-5'>
          예약취소
        </Button>
      </div>
    </div>
  );
};

const PlanDetailLoadingFallback = () => {
  return (
    <div className='flex flex-col'>
      <Skeleton shape='square' height={280} />
    </div>
  );
};

const AlertCircleIcon = () => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
        stroke='#111111'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const CompassIcon = () => {
  return (
    <svg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9.5 16.5C13.6421 16.5 17 13.1421 17 9C17 4.85786 13.6421 1.5 9.5 1.5C5.35786 1.5 2 4.85786 2 9C2 13.1421 5.35786 16.5 9.5 16.5Z'
        stroke='#111111'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.5416 6.19947C11.908 6.07734 12.0912 6.01627 12.213 6.05971C12.319 6.09752 12.4025 6.18095 12.4403 6.28697C12.4837 6.4088 12.4227 6.59201 12.3005 6.95842L11.1849 10.3054C11.1501 10.4097 11.1327 10.4619 11.1031 10.5053C11.0768 10.5436 11.0436 10.5768 11.0053 10.6031C10.9619 10.6327 10.9097 10.6501 10.8054 10.6849L7.45842 11.8005C7.09201 11.9227 6.9088 11.9837 6.78697 11.9403C6.68095 11.9025 6.59752 11.819 6.55971 11.713C6.51627 11.5912 6.57734 11.408 6.69947 11.0416L7.81513 7.69461C7.84992 7.59025 7.86731 7.53807 7.89695 7.49474C7.9232 7.45636 7.95636 7.4232 7.99474 7.39695C8.03807 7.36731 8.09025 7.34992 8.19461 7.31513L11.5416 6.19947Z'
        stroke='#111111'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const CarIcon = () => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5 13H8M2 9L4 10L5.27064 6.18807C5.53292 5.40125 5.66405 5.00784 5.90729 4.71698C6.12208 4.46013 6.39792 4.26132 6.70951 4.13878C7.06236 4 7.47705 4 8.30643 4H15.6936C16.523 4 16.9376 4 17.2905 4.13878C17.6021 4.26132 17.8779 4.46013 18.0927 4.71698C18.3359 5.00784 18.4671 5.40125 18.7294 6.18807L20 10L22 9M16 13H19M6.8 10H17.2C18.8802 10 19.7202 10 20.362 10.327C20.9265 10.6146 21.3854 11.0735 21.673 11.638C22 12.2798 22 13.1198 22 14.8V17.5C22 17.9647 22 18.197 21.9616 18.3902C21.8038 19.1836 21.1836 19.8038 20.3902 19.9616C20.197 20 19.9647 20 19.5 20H19C17.8954 20 17 19.1046 17 18C17 17.7239 16.7761 17.5 16.5 17.5H7.5C7.22386 17.5 7 17.7239 7 18C7 19.1046 6.10457 20 5 20H4.5C4.03534 20 3.80302 20 3.60982 19.9616C2.81644 19.8038 2.19624 19.1836 2.03843 18.3902C2 18.197 2 17.9647 2 17.5V14.8C2 13.1198 2 12.2798 2.32698 11.638C2.6146 11.0735 3.07354 10.6146 3.63803 10.327C4.27976 10 5.11984 10 6.8 10Z'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const TramIcon = () => {
  return (
    <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13.875 2.25L13.1351 1.88006C12.8516 1.73832 12.7099 1.66745 12.5613 1.61747C12.4294 1.57308 12.2937 1.54103 12.1558 1.52173C12.0006 1.5 11.8421 1.5 11.5252 1.5H6.47484C6.15789 1.5 5.99942 1.5 5.8442 1.52173C5.70635 1.54103 5.57059 1.57308 5.43866 1.61747C5.29011 1.66745 5.14836 1.73832 4.86488 1.88006L4.125 2.25M8.25 4.5L6.75 1.5M9.74999 4.5L11.25 1.5M3 9.75H15M12.75 15L13.5 16.5M5.25 15L4.50012 16.5M6.375 12.375H6.3825M11.625 12.375H11.6325M6.6 15H11.4C12.6601 15 13.2902 15 13.7715 14.7548C14.1948 14.539 14.539 14.1948 14.7548 13.7715C15 13.2902 15 12.6601 15 11.4V8.1C15 6.83988 15 6.20982 14.7548 5.72852C14.539 5.30516 14.1948 4.96095 13.7715 4.74524C13.2902 4.5 12.6601 4.5 11.4 4.5H6.6C5.33988 4.5 4.70982 4.5 4.22852 4.74524C3.80516 4.96095 3.46095 5.30516 3.24524 5.72852C3 6.20982 3 6.83988 3 8.1V11.4C3 12.6601 3 13.2902 3.24524 13.7715C3.46095 14.1948 3.80516 14.539 4.22852 14.7548C4.70982 15 5.33988 15 6.6 15ZM6.75 12.375C6.75 12.5821 6.58211 12.75 6.375 12.75C6.16789 12.75 6 12.5821 6 12.375C6 12.1679 6.16789 12 6.375 12C6.58211 12 6.75 12.1679 6.75 12.375ZM12 12.375C12 12.5821 11.8321 12.75 11.625 12.75C11.4179 12.75 11.25 12.5821 11.25 12.375C11.25 12.1679 11.4179 12 11.625 12C11.8321 12 12 12.1679 12 12.375Z'
        stroke='#111111'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

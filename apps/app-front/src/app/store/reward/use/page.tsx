'use client';

import { useSearchParams } from 'next/navigation';

import { rewardApi } from '@repo/api/app';
import { ArrowLeftIcon } from '@repo/design-system/icons';
import { useQuery } from '@tanstack/react-query';

import CouponList from './components/CouponList';
import CouponSubTab from './components/CouponSubTab';
import MainTab from './components/MainTab';
import RewardHistory from './components/RewardHistory';

export default function RewardUsePage() {
  const searchParams = useSearchParams();
  const mainTab = searchParams.get('tab') ?? 'coupon'; // 'coupon' | 'history'
  const subTab = searchParams.get('sub') ?? 'available'; // 'available' | 'used'

  const commonParams = {
    searchString: '',
    pageNum: 0,
    pageSize: 20,
    storeId: 1,
    phoneNumber: '01012345678', // TODO 실제 정보 연동
  };

  const {
    data: couponData,
    isLoading: isCouponLoading,
    isError: isCouponError,
  } = useQuery({
    queryKey: ['getCoupons', subTab],
    queryFn: () =>
      rewardApi.getCoupons({
        ...commonParams,
        used: subTab === 'used',
      }),
    enabled: mainTab === 'coupon',
  });

  const {
    data: rewardLogData,
    isLoading: isLogLoading,
    isError: isLogError,
  } = useQuery({
    queryKey: ['getLog'],
    queryFn: () => rewardApi.getLog(commonParams),
    enabled: mainTab === 'history',
  });

  return (
    <div>
      <header className='relative w-full bg-primary-pink flex py-[38px]'>
        <button className='absolute top-[30px] left-[80px]'>
          <ArrowLeftIcon color='white' />
        </button>
        {/* TODO 실제 유저 이름 출력 */}
        <h1 className='text-white headline-5 text-center flex-1'>홍길동님의 리워드</h1>
      </header>

      <MainTab activeTab={mainTab} />
      {mainTab === 'coupon' && (
        <main className='flex flex-col gap-[30px] pt-[30px] px-[70px]'>
          <CouponSubTab activeSubTab={subTab} />
          <CouponList
            list={couponData?.data.list ?? []}
            isLoading={isCouponLoading}
            isError={isCouponError}
          />
        </main>
      )}
      {mainTab === 'history' && (
        <RewardHistory
          rewards={rewardLogData?.data.content ?? []}
          isLoading={isLogLoading}
          isError={isLogError}
        />
      )}
    </div>
  );
}

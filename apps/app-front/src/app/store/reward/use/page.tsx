'use client';

import { useSearchParams } from 'next/navigation';

import { rewardApi, userApi } from '@repo/api/app';
import { queryKeys } from '@repo/api/configs/query-keys';
import { ArrowLeftIcon } from '@repo/design-system/icons';
import { useQuery } from '@tanstack/react-query';

import CouponList from './components/CouponList';
import CouponSubTab from './components/CouponSubTab';
import MainTab from './components/MainTab';
import RewardHistory from './components/RewardHistory';
import { useStore } from '@/components/Provider/StoreClientProvider';

export default function RewardUsePage() {
  const searchParams = useSearchParams();
  const mainTab = searchParams.get('tab') ?? 'coupon'; // 'coupon' | 'history'
  const subTab = searchParams.get('sub') ?? 'available'; // 'available' | 'used'

  const { storeId } = useStore();

  const { data: user } = useQuery({
    queryKey: [queryKeys.me.user],
    queryFn: userApi.getUser,
  });
  const phoneNumber = user?.data.phoneNumber;

  const commonParams = {
    searchString: '',
    pageNum: 1,
    pageSize: 20,
    storeId: Number(storeId),
    phoneNumber: String(phoneNumber),
  };

  const {
    data: couponData,
    isLoading: isCouponLoading,
    isError: isCouponError,
  } = useQuery({
    queryKey: [queryKeys.app.reward.coupons, subTab],
    queryFn: () =>
      rewardApi.getCoupons({
        ...commonParams,
        used: subTab === 'used',
      }),
    enabled: !!storeId && !!phoneNumber && mainTab === 'coupon',
  });

  const {
    data: rewardLogData,
    isLoading: isLogLoading,
    isError: isLogError,
  } = useQuery({
    queryKey: [queryKeys.app.reward.coupons],
    queryFn: () => rewardApi.getLog(commonParams),
    enabled: !!storeId && mainTab === 'history',
  });

  return (
    <div>
      <header className='relative w-full bg-primary-pink flex py-[38px]'>
        <button className='absolute top-[30px] left-[80px]'>
          <ArrowLeftIcon color='white' />
        </button>
        <h1 className='text-white headline-5 text-center flex-1'>
          {user?.data.nickname}님의 리워드
        </h1>
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

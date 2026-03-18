'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { rewardApi, userApi, UserCouponsResponse, UserRewardLogsResponse } from '@repo/api/app';
import { queryKeys } from '@repo/api/configs/query-keys';
import { ArrowLeftIcon } from '@repo/design-system/icons';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

import { REWARD_MAIN_TABS, REWARD_SUB_TABS } from '../types';
import CouponList from './components/CouponList';
import CouponSubTab from './components/CouponSubTab';
import CouponUseModal from './components/CouponUseModal';
import MainTab from './components/MainTab';
import RewardHistory from './components/RewardHistory';
import { useStore } from '@/components/Provider/StoreClientProvider';

const MainTabSearchParam = z.enum(REWARD_MAIN_TABS).catch('coupon');
const SubTabSearchParam = z.enum(REWARD_SUB_TABS).catch('available');

export default function RewardUsePage() {
  const router = useRouter();
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const mainTab = MainTabSearchParam.parse(searchParams.get('tab'));
  const subTab = SubTabSearchParam.parse(searchParams.get('sub'));

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
    data: coupons,
    isLoading: isCouponLoading,
    refetch: refetchCoupons,
  } = useQuery<UserCouponsResponse>({
    queryKey: [queryKeys.app.reward.coupons, subTab],
    queryFn: () =>
      rewardApi.getCoupons({
        ...commonParams,
        used: subTab === 'used',
      }),
    enabled: !!storeId && !!phoneNumber && mainTab === 'coupon',
  });

  const { data: rewardLogData, isLoading: isLogLoading } = useQuery<UserRewardLogsResponse>({
    queryKey: [queryKeys.app.reward.coupons],
    queryFn: () => rewardApi.getLog(commonParams),
    enabled: !!storeId && !!phoneNumber && mainTab === 'history',
    refetchInterval: 10000,
  });

  const handleClickCoupon = async () => {
    try {
      await rewardApi.postCoupon(Number(selectedCouponId));
      alert('쿠폰이 사용되었습니다.');
      await refetchCoupons();
      setSelectedCouponId(null);
    } catch (error) {
      console.error('쿠폰 사용 중 오류 발생:', error);
      alert('쿠폰 사용에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <header className='relative w-full bg-primary-pink flex py-[38px]'>
        <button className='absolute top-[30px] left-[80px] cursor-pointer' onClick={() => router.back()}>
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
            list={coupons?.data.list ?? []}
            isLoading={isCouponLoading}
            setSelectedCouponId={(id: number) => setSelectedCouponId(id)}
          />
        </main>
      )}
      {mainTab === 'history' && (
        <RewardHistory rewards={rewardLogData?.data.content ?? []} isLoading={isLogLoading} />
      )}
      <CouponUseModal
        open={selectedCouponId !== null}
        onClose={() => setSelectedCouponId(null)}
        onConfirm={handleClickCoupon}
      />
    </div>
  );
}

'use client';

import { useSearchParams } from 'next/navigation';

import { ArrowLeftIcon } from '@repo/design-system/icons';

import CouponList from './components/CouponList';
import CouponSubTab from './components/CouponSubTab';
import MainTab from './components/MainTab';
import RewardHistory from './components/RewardHistory';

export default function RewardUsePage() {
  const searchParams = useSearchParams();
  const mainTab = searchParams.get('tab') ?? 'coupon'; // 'coupon' | 'history'
  const subTab = searchParams.get('sub') ?? 'available'; // 'available' | 'used'

  return (
    <div>
      <header className='relative w-full bg-primary-pink flex py-[38px]'>
        <button className='absolute top-[30px] left-[80px]'>
          <ArrowLeftIcon color='white' />
        </button>
        <h1 className='text-white headline-5 text-center flex-1'>홍길동님의 리워드</h1>
      </header>

      <MainTab activeTab={mainTab} />
      {mainTab === 'coupon' && (
        <main className='flex flex-col gap-[30px] pt-[30px] px-[70px]'>
          <CouponSubTab activeSubTab={subTab} />
          <CouponList subTab={subTab} />
        </main>
      )}
      {mainTab === 'history' && <RewardHistory />}
    </div>
  );
}

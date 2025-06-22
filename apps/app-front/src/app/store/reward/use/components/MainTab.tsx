'use client';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { MainTabType } from '../page';

interface MainTabProps {
  activeTab: MainTabType;
}

const MainTab = ({ activeTab }: MainTabProps) => {
  const router = useRouter();

  const handleChange = (tab: 'coupon' | 'history') => {
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  return (
    <div className='flex justify-center'>
      <button
        onClick={() => handleChange('coupon')}
        className={clsx(
          'w-1/2 pt-[24px] pb-[20px] text-center subtitle-3',
          activeTab === 'coupon' ? 'text-white bg-primary-pink' : 'text-primary-pink',
        )}
      >
        쿠폰함
      </button>
      <button
        onClick={() => handleChange('history')}
        className={clsx(
          'w-1/2 pt-[24px] pb-[20px] text-center subtitle-3',
          activeTab === 'history' ? 'text-white bg-primary-pink' : 'text-primary-pink',
        )}
      >
        적립내역
      </button>
    </div>
  );
};

export default MainTab;

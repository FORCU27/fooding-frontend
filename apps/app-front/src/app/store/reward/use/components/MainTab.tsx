'use client';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { RewardMainTabType, REWARD_MAIN_TABS } from '../../types';

interface MainTabProps {
  activeTab: RewardMainTabType;
}

const REWARD_MAIN_TAB_LABELS: Record<RewardMainTabType, string> = {
  coupon: '쿠폰함',
  history: '적립내역',
};

const MainTab = ({ activeTab }: MainTabProps) => {
  const router = useRouter();

  const handleChange = (tab: RewardMainTabType) => {
    router.replace(`?tab=${tab}`, { scroll: false });
  };

  return (
    <div className='flex justify-center'>
      {REWARD_MAIN_TABS.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleChange(tab)}
          className={clsx(
            'w-1/2 pt-[24px] pb-[20px] text-center subtitle-3',
            activeTab === tab ? 'text-white bg-primary-pink' : 'text-primary-pink',
          )}
        >
          {REWARD_MAIN_TAB_LABELS[tab]}
        </button>
      ))}
    </div>
  );
};

export default MainTab;

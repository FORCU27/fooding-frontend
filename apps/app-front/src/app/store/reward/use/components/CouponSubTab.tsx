import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { RewardSubTabType, REWARD_SUB_TABS } from '../../types';

interface SubTabProps {
  activeSubTab: RewardSubTabType;
}

const REWARD_SUB_TAB_LABELS: Record<RewardSubTabType, string> = {
  available: '사용가능',
  used: '사용완료',
};

const CouponSubTab = ({ activeSubTab }: SubTabProps) => {
  const router = useRouter();

  const handleChange = (tab: RewardSubTabType) => {
    router.replace(`?tab=coupon&sub=${tab}`, { scroll: false });
  };

  return (
    <div className='flex gap-[12px]'>
      {REWARD_SUB_TABS.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleChange(tab)}
          className={clsx(
            'body-1 py-[14px] px-[32px] rounded-full',
            activeSubTab === tab ? 'text-black bg-gray-1' : 'text-gray-4',
          )}
        >
          {REWARD_SUB_TAB_LABELS[tab]}
        </button>
      ))}
    </div>
  );
};

export default CouponSubTab;

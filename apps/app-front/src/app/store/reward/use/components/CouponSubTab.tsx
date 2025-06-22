import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { RewardSubTabType } from '../../types';

interface SubTabProps {
  activeSubTab: RewardSubTabType;
}

const CouponSubTab = ({ activeSubTab }: SubTabProps) => {
  const router = useRouter();

  const handleChange = (sub: 'available' | 'used') => {
    router.replace(`?tab=coupon&sub=${sub}`, { scroll: false });
  };

  return (
    <div className='flex gap-[12px]'>
      <button
        onClick={() => handleChange('available')}
        className={clsx(
          'body-1 py-[14px] px-[32px] rounded-full',
          activeSubTab === 'available' ? 'text-black bg-gray-1' : 'text-gray-4',
        )}
      >
        사용가능
      </button>
      <button
        onClick={() => handleChange('used')}
        className={clsx(
          'body-1 py-[14px] px-[32px] rounded-full',
          activeSubTab === 'used' ? 'text-black bg-gray-1' : 'text-gray-4',
        )}
      >
        사용완료
      </button>
    </div>
  );
};

export default CouponSubTab;

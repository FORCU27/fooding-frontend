import { RewardLogItem } from './RewardLogItem';
import { formatYearMonth } from '@/utils/date';

type RewardMonthGroupProps = {
  ym: string;
  rewards: Array<{
    id: number;
    storeName: string;
    createdAt: string;
    status: 'USED' | 'EARNED' | 'CANCELED';
    type: 'EVENT' | 'VISIT';
    signedPoint: number;
    total: number;
  }>;
};

export const RewardMonthGroup = ({ rewards }: RewardMonthGroupProps) => {
  return (
    <div className='flex flex-col gap-3 mb-5'>
      <h3 className='body-5'>{rewards[0] && formatYearMonth(rewards[0].createdAt)}</h3>
      <hr className='text-gray-3' />
      {rewards.map((reward) => (
        <RewardLogItem key={reward.id} reward={reward} />
      ))}
    </div>
  );
};

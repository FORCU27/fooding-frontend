import { formatMonthDayTime } from '@/utils/date';

type RewardItemProps = {
  reward: {
    id: number;
    storeName: string;
    createdAt: string;
    status: 'USED' | 'EARNED' | 'CANCELED';
    type: 'EVENT' | 'VISIT';
    signedPoint: number;
    total: number;
  };
};

export const RewardLogItem = ({ reward }: RewardItemProps) => {
  return (
    <div key={reward.id} className='flex justify-between mb-5'>
      <div className='flex flex-col gap-1'>
        <div className='subtitle-5'>{reward.storeName}</div>
        <div className='text-gray-5 body-8'>
          {formatMonthDayTime(reward.createdAt)} •{' '}
          {reward.status === 'USED' ? '사용' : reward.type === 'VISIT' ? '현장적립' : '이벤트'}
        </div>
      </div>
      <div className='flex flex-col gap-1 justify-between'>
        <p
          className={`subtitle-5 ${
            reward.status === 'USED' ? 'text-primary-pink' : 'text-fooding-green'
          }`}
        >
          {reward.signedPoint > 0 ? `+${reward.signedPoint}` : reward.signedPoint} 포인트
        </p>
        <p className='body-8 text-gray-5 text-right'>{reward.total} 포인트</p>
      </div>
    </div>
  );
};

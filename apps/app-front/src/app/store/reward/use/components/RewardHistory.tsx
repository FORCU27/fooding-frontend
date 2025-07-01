import { RewardLog } from '@repo/api/app';

import EmptyList from './EmptyList';
import { formatDate } from '@/app/utils/datetime';

interface RewardHistoryProps {
  rewards?: RewardLog[];
  isLoading: boolean;
}

const CHANNEL_LABELS: Record<RewardLog['channel'], string> = {
  STORE: '매장',
  EVENT_PLATFORM: '이벤트',
};

const getChannelLabel = (channel: RewardLog['channel']) => CHANNEL_LABELS[channel] ?? '-';

const TYPE_LABELS: Record<RewardLog['type'], string> = {
  EVENT: '이벤트',
  VISIT: '방문',
};

const getTypeLabel = (type: RewardLog['type']) => TYPE_LABELS[type] ?? '-';

const RewardHistory = ({ rewards, isLoading }: RewardHistoryProps) => {
  if (isLoading) return <div>로딩 중...</div>;
  if (rewards?.length === 0)
    return <EmptyList message='적립내역이 비었어요!' className='h-[600px]' />;
  return (
    <div className='pt-[60px] px-[70px]'>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-1 text-gray-700 body-4-2 text-left'>
            <th className='py-[16px] pl-[40px] w-[25%]'>적립시간</th>
            <th className='py-[16px] w-[15%]'>채널</th>
            <th className='py-[16px] w-[15%]'>종류</th>
            <th className='py-[16px] w-[25%]'>휴대폰번호</th>
            <th className='py-[16px] w-[10%]'>적립금</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          {rewards?.map((reward) => (
            <tr key={reward.id} className='border-b-1 border-gray-3 body-3'>
              <td className='py-[28px] pl-[40px]'>{formatDate(reward?.createdAt)}</td>
              <td className='py-[28px]'>{getChannelLabel(reward.channel)}</td>
              <td className='py-[28px]'>{getTypeLabel(reward.type)}</td>
              <td className='py-[28px]'>{reward.phoneNumber}</td>
              <td className='py-[28px]'>{reward.point}P</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardHistory;

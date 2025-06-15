import { RewardLog } from '@repo/api/app';

import { formatDate } from '@/app/utils/datetime';

interface RewardHistory {
  rewards?: RewardLog[];
  isLoading: boolean;
  isError: boolean;
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

const RewardHistory = ({ rewards, isLoading, isError }: RewardHistory) => {
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>적립 내역을 불러오지 못했습니다.</div>;
  if (rewards?.length === 0) return <div>적립내역이 존재하지 않습니다.</div>;
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
              <td className='py-[28px] pl-[40px]'>{formatDate('')}</td>
              {/* TODO 날짜 매핑 */}
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

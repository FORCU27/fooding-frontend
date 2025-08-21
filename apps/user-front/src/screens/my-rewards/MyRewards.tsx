import { mockUserRewardLogResponse } from '@repo/api/user';
import { Button } from '@repo/design-system/components/b2c';
import { GiftIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { formatMonthDayTime, formatYearMonth } from '@/utils/date';

export const MyRewardListScreen: ActivityComponentType<'MyRewardListScreen'> = () => {
  const { data: rewards } = mockUserRewardLogResponse;
  const flow = useFlow();

  const handleStoreRewardClick = (storeId: number) => {
    flow.push('StoreDetailScreen', { storeId });
  };
  const sortedRewards = [...rewards.list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const recentRewards = sortedRewards.filter((r) => !r.used).slice(0, 4);

  const groupedRewards = sortedRewards.reduce<Record<string, typeof sortedRewards>>(
    (acc, reward) => {
      const ym = `${new Date(reward.createdAt).getFullYear()}-${String(new Date(reward.createdAt).getMonth() + 1).padStart(2, '0')}`;
      (acc[ym] ||= []).push(reward);
      return acc;
    },
    {},
  );

  return (
    <Screen header={<Header left={<Header.Back />} title='리워드 목록' />}>
      <div className='flex flex-col gap-3 bg-gray-1 p-5'>
        {recentRewards.map((reward) => (
          <div key={reward.id} className='flex p-5 bg-white rounded-xl justify-between'>
            <div
              className='flex justify-center items-center'
              onClick={() => flow.push('MyRewardDetailScreen', { rewardId: 7 })}
            >
              {/* TODO: 추후 수정 */}
              <div className='flex justify-between items-center w-10 h-10'>
                <GiftIcon className='text-gray-5' />
              </div>
              <div>
                <p className='subtitle-4'>{reward.storeName}</p>
                <p className='subtitle-6 text-gray-5'>{reward.point} 포인트</p>
              </div>
            </div>
            <Button
              type='button'
              variant='outlined'
              size='small'
              onClick={() => handleStoreRewardClick(reward.storeId)}
            >
              사용하기
            </Button>
          </div>
        ))}

        <div className='flex gap-2 mt-3 justify-end'>
          <select className='flex border border-none text-gray-5 body-5 p-1'>
            <option>전체</option>
          </select>
          <select className='border border-none text-gray-5 body-5 p-0 flex justify-center'>
            <option>1개월</option>
          </select>
        </div>
      </div>

      <div className='bg-white p-5'>
        {Object.entries(groupedRewards).map(([ym, items]) => (
          <div key={ym} className='flex flex-col gap-3 mb-5'>
            <h3 className='body-5'>{items[0] && formatYearMonth(items[0].createdAt)}</h3>
            <hr className='text-gray-3' />
            {items.map((reward) => (
              <div key={reward.id} className='flex justify-between mb-5'>
                <div className='flex flex-col'>
                  <div className='subtitle-5'>{reward.storeName}</div>
                  <div className='text-gray-5 body-8'>
                    {formatMonthDayTime(reward.createdAt)} •{' '}
                    {reward.used ? '사용' : reward.type === 'VISIT' ? '현장적립' : '이벤트'}
                  </div>
                </div>
                <div>
                  <p
                    className={`subtitle-5 ${reward.used ? 'text-primary-pink' : 'text-fooding-green'}`}
                  >
                    {reward.used ? `-${reward.point}` : reward.point} 포인트
                  </p>
                  <p className='body-8 text-gray-5 text-right'>{reward.avaliablePoint} 포인트</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Screen>
  );
};

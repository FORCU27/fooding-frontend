import { mockUserRewardDetailResponse, mockUserRewardLogResponse } from '@repo/api/user';
import { Button } from '@repo/design-system/components/b2c';
import { GiftIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { formatYearMonth, formatMonthDayTime } from '@/utils/date';

export const MyRewardDetailScreen: ActivityComponentType<'MyRewardDetailScreen'> = ({ params }) => {
  const flow = useFlow();
  const { data: reward } = mockUserRewardDetailResponse;
  const { data: rewardLog } = mockUserRewardLogResponse;
  console.log(params.rewardId); //TODO: 추후 제거

  const handleStoreRewardClick = (storeId: number) => {
    flow.push('StoreDetailScreen', { storeId });
  };

  const groupedRewards = rewardLog.list
    .filter((r) => r.storeName === reward.storeName)
    .reduce<Record<string, typeof rewardLog.list>>((acc, r) => {
      const ym = `${new Date(r.createdAt).getFullYear()}-${String(new Date(r.createdAt).getMonth() + 1).padStart(2, '0')}`;
      (acc[ym] ||= []).push(r);
      return acc;
    }, {});

  return (
    <Screen header={<Header left={<Header.Back />} title='리워드' />} className='p-5'>
      <div className='flex p-5 rounded-xl justify-between bg-gray-1'>
        <div className='flex justify-center items-center gap-2'>
          <div className='flex w-10 h-10 justify-center items-center'>
            <GiftIcon className='text-gray-4' />
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

      <div className='flex gap-2 mt-3 justify-end'>
        <select className='border-none text-gray-5 body-5 p-1 text-right'>
          <option>전체</option>
        </select>
        <select className='border-none text-gray-5 body-5 p-1 text-right'>
          <option>1개월</option>
        </select>
      </div>

      <div className='mt-5 flex flex-col gap-5'>
        {Object.entries(groupedRewards).map(([ym, items]) => (
          <div key={ym} className='flex flex-col gap-3'>
            <h3 className='body-5'>{items[0] && formatYearMonth(items[0].createdAt)}</h3>
            <hr className='text-gray-3' />
            {items.map((r) => (
              <div key={r.id} className='flex justify-between mb-5'>
                <div className='flex flex-col'>
                  <div className='subtitle-4'>{r.storeName}</div>
                  <div className='text-gray-5 body-8'>
                    {formatMonthDayTime(r.createdAt)} •{' '}
                    {r.used ? '사용' : r.type === 'VISIT' ? '현장적립' : '이벤트'}
                  </div>
                </div>
                <div>
                  <p
                    className={`subtitle-5 ${r.used ? 'text-primary-pink' : 'text-fooding-green'}`}
                  >
                    {r.used ? `-${r.point}` : r.point} 포인트
                  </p>
                  <p className='body-8 text-gray-5 text-right'>{r.avaliablePoint} 포인트</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Screen>
  );
};

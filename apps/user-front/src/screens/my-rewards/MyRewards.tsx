/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import { Button } from '@repo/design-system/components/b2c';
import { ChevronDownIcon, ChevronUpIcon, GiftIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { RewardMonthGroup } from './components/RewardMonthGroup';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useGetRewardPersonalLog } from '@/hooks/reward/useGetRewardPersonalLog';
import { useGetStoreRewardList } from '@/hooks/store/useGetStoreRewardList';

export const MyRewardListScreen: ActivityComponentType<'MyRewardListScreen'> = () => {
  const flow = useFlow();
  const [isOpen, setIsOpen] = useState(false);

  const { data: logs } = useGetRewardPersonalLog();

  const storeIds = Array.from(new Set(logs?.list.map((r) => r.storeId)));
  const storePoints: Record<number, number> = {};
  storeIds.forEach((id) => {
    const pointData = useGetStoreRewardList(id);
    storePoints[id] = pointData?.data?.point ?? 0;
  });

  const sortedRewards = [...(logs?.list ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const rewardWithTotal = sortedRewards.map((reward) => {
    const initialPoint = storePoints[reward.storeId] ?? 0;
    const runningTotal = initialPoint;

    const signedPoint = reward.status === 'USED' ? -reward.point : reward.point;
    const total = runningTotal;

    storePoints[reward.storeId] =
      reward.status === 'USED' ? runningTotal + reward.point : runningTotal - reward.point;

    return { ...reward, signedPoint, total };
  });

  const groupedRewards = rewardWithTotal.reduce<Record<string, typeof rewardWithTotal>>(
    (acc, reward) => {
      const ym = `${new Date(reward.createdAt).getFullYear()}-${String(
        new Date(reward.createdAt).getMonth() + 1,
      ).padStart(2, '0')}`;
      (acc[ym] ||= []).push(reward);
      return acc;
    },
    {},
  );

  const sortedGroupedKeys = Object.keys(groupedRewards).sort((a, b) => (a < b ? 1 : -1));

  const handleStoreRewardClick = (storeId: number) => {
    flow.push('StoreDetailScreen', { storeId });
  };

  const visibleRewards =
    sortedRewards.length > 4 && !isOpen ? sortedRewards.slice(0, 4) : sortedRewards;

  return (
    <Screen header={<Header left={<Header.Back />} title='리워드 목록' />}>
      <div className='flex flex-col gap-3 bg-gray-1 p-5'>
        {visibleRewards.map((reward) => (
          <div key={reward.id} className='flex p-5 bg-white rounded-xl justify-between'>
            <div
              className='flex justify-center items-center cursor-pointer'
              onClick={() => flow.push('MyRewardDetailScreen', { storeId: reward.storeId })}
            >
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

        {sortedRewards.length > 4 && (
          <Button variant='outlined' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <>
                <p>접기</p>
                <ChevronUpIcon />
              </>
            ) : (
              <>
                <p>더보기</p>
                <ChevronDownIcon className='text-gray-5' />
              </>
            )}
          </Button>
        )}

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
        {sortedGroupedKeys.map((ym) => (
          <RewardMonthGroup key={ym} ym={ym} rewards={groupedRewards[ym] ?? []} />
        ))}
      </div>
    </Screen>
  );
};

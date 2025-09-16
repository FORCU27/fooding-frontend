import { useState } from 'react';

import { BottomSheet, Button } from '@repo/design-system/components/b2c';
import { ChevronDownIcon, ChevronUpIcon, GiftIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { RewardMonthGroup } from './components/RewardMonthGroup';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useGetRewardPersonalLog } from '@/hooks/reward/useGetRewardPersonalLog';
import { useGetStoreRewardLists } from '@/hooks/store/useGetStoreRewardLists';

const MAX_VISIBLE_REWARDS = 4;

// TODO: 필터 기능 추가
const FILTER_OPTIONS = ['전체', '적립', '사용'] as const;
const DATE_OPTIONS = ['1개월', '3개월', '6개월', '1년'] as const;

export const MyRewardListScreen: ActivityComponentType<'MyRewardListScreen'> = () => {
  const flow = useFlow();
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] = useState('전체');
  const [date, setDate] = useState('1개월');

  const { data: logs } = useGetRewardPersonalLog();

  const storeIds = Array.from(new Set(logs.list.map((r) => r.storeId)));

  // TODO: 나의 리워드 목록 조회 API로 변경
  const storeRewardListQueries = useGetStoreRewardLists(storeIds);

  const storePoints: Record<number, number> = {};

  storeRewardListQueries.forEach(({ data }) => {
    const id = data.storeId;

    storePoints[id] = data.point;
  });

  const sortedRewards = [...logs.list].sort(
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
    sortedRewards.length > MAX_VISIBLE_REWARDS && !isOpen
      ? sortedRewards.slice(0, MAX_VISIBLE_REWARDS)
      : sortedRewards;

  return (
    <Screen header={<Header left={<Header.Back />} title='리워드 목록' />}>
      <div className='flex flex-col gap-3 bg-gray-1 p-5'>
        {visibleRewards.length === 0 && (
          <p className='text-gray-4 text-center py-12'>사용 가능한 리워드가 없어요.</p>
        )}
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
        {sortedRewards.length > MAX_VISIBLE_REWARDS && (
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
          <BottomSheet>
            <BottomSheet.Trigger className='text-gray-5 body-5 p-1 flex items-center gap-1'>
              {filter}
              <ChevronDownIcon className='size-4' />
            </BottomSheet.Trigger>
            <BottomSheet.Content>
              <BottomSheet.Header>
                <BottomSheet.Title className='font-bold text-[24px]'>필터 선택</BottomSheet.Title>
              </BottomSheet.Header>
              <BottomSheet.Body>
                <BottomSheet.SelectGroup value={filter} onChange={setFilter}>
                  {FILTER_OPTIONS.map((option) => (
                    <BottomSheet.SelectItem key={option} value={option}>
                      {option}
                    </BottomSheet.SelectItem>
                  ))}
                </BottomSheet.SelectGroup>
              </BottomSheet.Body>
            </BottomSheet.Content>
          </BottomSheet>
          <BottomSheet>
            <BottomSheet.Trigger className='text-gray-5 flex items-center gap-1 body-5 p-1'>
              {date}
              <ChevronDownIcon className='size-4' />
            </BottomSheet.Trigger>
            <BottomSheet.Content>
              <BottomSheet.Header>
                <BottomSheet.Title className='font-bold text-[24px]'>날짜 선택</BottomSheet.Title>
              </BottomSheet.Header>
              <BottomSheet.Body>
                <BottomSheet.SelectGroup value={date} onChange={setDate}>
                  {DATE_OPTIONS.map((option) => (
                    <BottomSheet.SelectItem key={option} value={option}>
                      {option}
                    </BottomSheet.SelectItem>
                  ))}
                </BottomSheet.SelectGroup>
              </BottomSheet.Body>
            </BottomSheet.Content>
          </BottomSheet>
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

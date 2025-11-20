import { useState } from 'react';

import { BottomSheet, Button } from '@repo/design-system/components/b2c';
import { ChevronDownIcon, GiftIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { RewardMonthGroup } from '../my-rewards/components/RewardMonthGroup';
import { Header } from '@/components/Layout/Header';
import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { Screen } from '@/components/Layout/Screen';
import { useGetRewardLog } from '@/hooks/reward/useGetRewardLog';
import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { useGetStoreRewardList } from '@/hooks/store/useGetStoreRewardList';

// TODO: 필터 기능 추가
const FILTER_OPTIONS = ['전체', '적립', '사용'] as const;
const DATE_OPTIONS = ['1개월', '3개월', '6개월', '1년'] as const;

export const MyRewardDetailScreen: ActivityComponentType<'MyRewardDetailScreen'> = ({ params }) => {
  const flow = useFlow();

  const {
    data: rewardLog,
    isPending: logPending,
    isFetching: logFetching,
  } = useGetRewardLog({ storeId: params.storeId });
  // TODO: 나의 리워드 상세 조회 API로 변경
  const {
    data: point,
    isPending: pointPending,
    isFetching: pointFetching,
  } = useGetStoreRewardList(params.storeId);
  const {
    data: store,
    isPending: storePending,
    isFetching: storeFetching,
  } = useGetStoreDetail(params.storeId);

  const [filter, setFilter] = useState('전체');
  const [date, setDate] = useState('1개월');

  const handleStoreRewardClick = (storeId: number) => {
    flow.push('StoreDetailScreen', { storeId });
  };

  const sortedRewardsDesc = [...rewardLog.list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  let runningTotal = point.point;
  const rewardWithTotal = sortedRewardsDesc.map((reward) => {
    const signedPoint = reward.status === 'USED' ? -reward.point : reward.point;
    const total = runningTotal;

    runningTotal =
      reward.status === 'USED' ? runningTotal + reward.point : runningTotal - reward.point;
    return { ...reward, signedPoint, total };
  });

  const groupedRewards = rewardWithTotal.reduce<Record<string, typeof rewardWithTotal>>(
    (acc, r) => {
      const ym = `${new Date(r.createdAt).getFullYear()}-${String(
        new Date(r.createdAt).getMonth() + 1,
      ).padStart(2, '0')}`;
      (acc[ym] ||= []).push(r);
      return acc;
    },
    {},
  );

  const sortedGroupedKeys = Object.keys(groupedRewards).sort((a, b) => (a < b ? 1 : -1));

  const isLoading =
    logPending || logFetching || pointPending || pointFetching || storePending || storeFetching;

  if (isLoading) return <LoadingScreen />;

  return (
    <Screen header={<Header left={<Header.Back />} title='리워드' />} className='p-5'>
      <div className='flex p-5 rounded-xl justify-between bg-gray-1'>
        <div className='flex justify-center items-center gap-2'>
          <div className='flex w-10 h-10 justify-center items-center'>
            <GiftIcon className='text-gray-4' />
          </div>
          <div>
            <p className='subtitle-4'>{store.name}</p>
            <p className='subtitle-6 text-gray-5'>{point.point} 포인트</p>
          </div>
        </div>
        <Button
          type='button'
          variant='outlined'
          size='small'
          onClick={() => handleStoreRewardClick(store?.id)}
        >
          사용하기
        </Button>
      </div>

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

      <div className='mt-5 flex flex-col gap-5'>
        <div className='mt-5 flex flex-col gap-5'>
          {sortedGroupedKeys.map((ym) => (
            <RewardMonthGroup key={ym} ym={ym} rewards={groupedRewards[ym] ?? []} />
          ))}
        </div>
      </div>
    </Screen>
  );
};

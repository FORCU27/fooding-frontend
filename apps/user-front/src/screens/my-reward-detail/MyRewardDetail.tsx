import { Button } from '@repo/design-system/components/b2c';
import { GiftIcon } from '@repo/design-system/icons';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import { RewardMonthGroup } from '../my-rewards/components/RewardMonthGroup';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useGetRewardLog } from '@/hooks/reward/useGetRewardLog';
import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { useGetStoreRewardList } from '@/hooks/store/useGetStoreRewardList';

export const MyRewardDetailScreen: ActivityComponentType<'MyRewardDetailScreen'> = ({ params }) => {
  const flow = useFlow();
  const { data: rewardLog } = useGetRewardLog({ storeId: params.storeId });
  const { data: point } = useGetStoreRewardList(params.storeId);
  const { data: store } = useGetStoreDetail(params.storeId);

  const handleStoreRewardClick = (storeId: number) => {
    flow.push('StoreDetailScreen', { storeId });
  };

  const sortedRewardsDesc = [...(rewardLog?.list || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  let runningTotal = point?.point ?? 0;
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

  return (
    <Screen header={<Header left={<Header.Back />} title='리워드' />} className='p-5'>
      <div className='flex p-5 rounded-xl justify-between bg-gray-1'>
        <div className='flex justify-center items-center gap-2'>
          <div className='flex w-10 h-10 justify-center items-center'>
            <GiftIcon className='text-gray-4' />
          </div>
          <div>
            <p className='subtitle-4'>{store?.name || 'Loading...'}</p>
            <p className='subtitle-6 text-gray-5'>{point?.point ?? 0} 포인트</p>
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
        <select className='border-none text-gray-5 body-5 p-1 text-right'>
          <option>전체</option>
        </select>
        <select className='border-none text-gray-5 body-5 p-1 text-right'>
          <option>1개월</option>
        </select>
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

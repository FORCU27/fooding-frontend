import { EmptyState } from '@repo/design-system/components/b2c';

import { PlanCompletedCard } from './PlanCompletedCard';
import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { useGetPlanList } from '@/hooks/plan/useGetPlanList';
import { isReviewWithin20Days } from '@/utils/date';

export const PlanCompletedList = () => {
  const { data: plans, isPending, isFetching } = useGetPlanList({ visitStatus: 'COMPLETED' });

  if (isPending || isFetching) return <LoadingScreen />;

  return (
    <div className='flex flex-col gap-5 px-grid-margin py-grid-margin'>
      <p className='text-gray-5 body-6'>총 {plans.pageInfo.totalCount}건</p>
      {plans.list.length === 0 && (
        <EmptyState className='flex-1 mt-25' title='방문한 식당이 없습니다.' />
      )}
      {plans.list.map((plan) => (
        <PlanCompletedCard
          key={plan.id}
          plan={plan}
          showEditButton={
            plan.reservationTime !== null && isReviewWithin20Days(plan.reservationTime)
          }
        />
      ))}
    </div>
  );
};

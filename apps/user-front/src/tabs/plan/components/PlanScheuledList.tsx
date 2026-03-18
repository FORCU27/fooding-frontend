import { EmptyState } from '@repo/design-system/components/b2c';

import { PlanCard } from './PlanCard';
import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { useGetPlanList } from '@/hooks/plan/useGetPlanList';

export const PlanScheuledList = () => {
  const { data: plans, isPending, isFetching } = useGetPlanList({ visitStatus: 'SCHEDULED' });

  if (isPending || isFetching) return <LoadingScreen />;

  return (
    <div className='flex flex-col gap-5 px-grid-margin py-grid-margin'>
      <p className='text-gray-5 body-6'>총 {plans.pageInfo.totalCount}건</p>
      {plans.list.length === 0 && (
        <EmptyState className='flex-1 mt-25' title='방문예정인 식당이 없습니다.' />
      )}
      {plans.list.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

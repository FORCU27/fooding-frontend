import { EmptyState } from '@repo/design-system/components/b2c';

import { PlanCanceledCard } from './PlanCanceledCard';
import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { useGetPlanList } from '@/hooks/plan/useGetPlanList';

export const PlanCanceledList = () => {
  const {
    data: plans,
    isPending,
    isFetching,
  } = useGetPlanList({
    visitStatus: 'NOT_VISITED',
  });

  if (isPending || isFetching) return <LoadingScreen />;

  return (
    <div className='flex flex-col gap-5 px-grid-margin py-grid-margin'>
      <p className='text-gray-5 body-6'>총 {plans.pageInfo.totalCount}건</p>
      {plans.list.length === 0 && (
        <EmptyState className='flex-1 mt-25' title='방문취소한 식당이 없습니다.' />
      )}
      {plans.list.map((plan) => (
        <PlanCanceledCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

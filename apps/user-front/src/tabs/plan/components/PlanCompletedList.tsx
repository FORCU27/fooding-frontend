import { PlanCompletedCard } from './PlanCompletedCard';
import { useGetPlanList } from '@/hooks/plan/useGetPlanList';
import { isReviewWithin20Days } from '@/utils/date';

export const PlanCompletedList = () => {
  const { data: plans } = useGetPlanList({ visitStatus: 'COMPLETED' });

  return (
    <div className='flex flex-col gap-5 px-grid-margin py-grid-margin'>
      <p className='text-gray-5 body-6'>총 {plans.list.length}건</p>
      {plans.list.map((plan) => (
        <PlanCompletedCard
          key={plan.id}
          plan={plan}
          showEditButton={isReviewWithin20Days(plan.createdAt)}
        />
      ))}
    </div>
  );
};

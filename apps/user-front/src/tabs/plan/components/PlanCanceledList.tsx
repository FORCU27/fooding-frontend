import { PlanCanceledCard } from './PlanCanceledCard';
import { useGetPlanList } from '@/hooks/plan/useGetPlanList';

export const PlanCanceledList = () => {
  const { data: plans } = useGetPlanList({
    visitStatus: 'NOT_VISITED',
  });

  return (
    <div className='flex flex-col gap-5 px-grid-margin py-grid-margin'>
      <p className='text-gray-5 body-6'>총 {plans.list.length}건</p>
      {plans.list.map((plan) => (
        <PlanCanceledCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

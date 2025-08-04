import { PlanCard } from './PlanCard';
import { useGetPlanList } from '@/hooks/plan/useGetPlanList';

export const PlanScheuledList = () => {
  const { data: plans } = useGetPlanList({ visitStatus: 'SCHEDULED' });

  return (
    <div className='flex flex-col gap-5 px-grid-margin py-grid-margin'>
      <p className='text-gray-5 body-6'>총 {plans.list.length}건</p>
      {plans.list.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

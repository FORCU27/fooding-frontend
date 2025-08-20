import Image from 'next/image';

import { Plan } from '@repo/api/user';
import { Button } from '@repo/design-system/components/b2c';
import { CloseIcon, FoodingIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { formatDotDate } from '@/utils/date';

interface PlanCardProps {
  plan: Plan;
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  const flow = useFlow();
  const { data: storeInfo } = useGetStoreDetail(plan.storeId);

  const handlePlanCardClick = (isWaiting: boolean, planId: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isWaiting
      ? flow.push('WaitingDetailScreen', { waitingId: planId })
      : flow.push('PlanDetailScreen', { planId });
  };
  return (
    <div
      className='flex flex-col bg-white/80 rounded-xl p-4 gap-3'
      onClick={() => handlePlanCardClick(plan.visitStatus === 'SCHEDULED', plan.id)}
    >
      <div className='flex justify-between'>
        <p className='body-4'>
          {plan.reservationType === 'ONSITE_WAITING' ? '온라인 웨이팅' : '현장 웨이팅'}
        </p>
        <CloseIcon className='text-gray-5' />
      </div>
      <div className='flex'>
        {storeInfo.images[0]?.imageUrl ? (
          <div className='relative w-[80px] h-[80px] rounded-2xl overflow-hidden'>
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={storeInfo.images[0]?.imageUrl}
              alt='리뷰 이미지'
            />
          </div>
        ) : (
          <div className='bg-gray-1 flex justify-center items-center w-[80px] h-[80px] rounded-2xl'>
            <FoodingIcon width={40} height={60} color='rgba(17, 17, 17, 0.1)' />
          </div>
        )}
        <div className='flex flex-col pl-3'>
          <span className='subtitle-5'>{storeInfo.name}</span>
          {plan.reservationType !== 'RESERVATION' ? (
            <span className='text-gray-5 body-8'>
              웨이팅 번호 {plan.originId} • 매장 식사 {plan.adultCount} 명
            </span>
          ) : (
            <span className='text-gray-5 body-8'>
              {formatDotDate(plan.createdAt)} • {plan.adultCount} 명
            </span>
          )}
        </div>
      </div>
      <div>
        <Button size='large' variant='outlined'>
          {plan.reservationType !== 'RESERVATION' ? '웨이팅 취소' : '예약 취소'}
        </Button>
      </div>
    </div>
  );
};

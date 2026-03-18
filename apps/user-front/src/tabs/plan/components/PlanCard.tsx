import Image from 'next/image';

import { Plan } from '@repo/api/user';
import { Button, toast } from '@repo/design-system/components/b2c';
import { CloseIcon, FoodingIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { useCancelStoreWaiting } from '@/hooks/store-waiting/useCancelStoreWaiting';
import { useGetStoreWaitingDetail } from '@/hooks/store-waiting/useGetStoreWaitingDetail';
import { isNonEmptyArray } from '@/utils/array';
import { formatDotDate } from '@/utils/date';

interface PlanCardProps {
  plan: Plan;
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  const flow = useFlow();

  const { data: storeInfo } = useGetStoreDetail(plan.storeId);
  const { data: waitingInfo } = useGetStoreWaitingDetail(plan.originId);
  const cancelStoreWaiting = useCancelStoreWaiting();

  const handlePlanCardClick = (isWaiting: boolean, planId: string) => {
    if (isWaiting) {
      flow.push('PlanDetailScreen', { planId });
    } else {
      flow.push('WaitingDetailScreen', { waitingId: planId });
    }
  };

  const handleCancelPlanClick = (id: number) => {
    if (cancelStoreWaiting.isPending) return;

    cancelStoreWaiting.mutate(id, {
      onSuccess: () => {
        toast.success('취소 되었습니다.');
      },
      onError: () => {
        toast.error('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
  };

  return (
    <div
      className='flex flex-col bg-white/80 rounded-xl p-4 gap-3'
      onClick={() => handlePlanCardClick(plan.reservationType === 'RESERVATION', plan.id)}
    >
      <div className='flex justify-between'>
        <p className='body-4'>
          {plan.reservationType === 'ONSITE_WAITING' ? '현장 웨이팅' : '온라인 웨이팅'}
        </p>
        <CloseIcon className='text-gray-5' />
      </div>
      <div className='flex'>
        {storeInfo.images && isNonEmptyArray(storeInfo.images) ? (
          <div className='relative w-[80px] h-[80px] rounded-2xl overflow-hidden'>
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={storeInfo.images[0].imageUrl.toString()}
              alt='가게 이미지'
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
              웨이팅 번호 {waitingInfo.callNumber}번 • 매장 식사{' '}
              {plan.adultCount + plan.infantCount} 명
            </span>
          ) : (
            <span className='text-gray-5 body-8'>
              {plan.createdAt !== null && formatDotDate(plan.createdAt)} •{' '}
              {plan.adultCount + plan.infantCount} 명
            </span>
          )}
        </div>
      </div>
      <div>
        <Button
          size='large'
          variant='outlined'
          isLoading={cancelStoreWaiting.isPending}
          onClick={() => {
            if (plan.reservationType !== 'RESERVATION') handleCancelPlanClick(plan.originId);
          }}
        >
          {plan.reservationType !== 'RESERVATION' ? '웨이팅 취소' : '예약 취소'}
        </Button>
      </div>
    </div>
  );
};

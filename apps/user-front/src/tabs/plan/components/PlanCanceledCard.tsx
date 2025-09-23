import Image from 'next/image';

import { Plan } from '@repo/api/user';
import { CloseIcon, FoodingIcon } from '@repo/design-system/icons';

import { reservationTypeLabel } from '../utils';
import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { useGetStoreWaitingDetail } from '@/hooks/store-waiting/useGetStoreWaitingDetail';
import { isNonEmptyArray } from '@/utils/array';
import { formatDotDate } from '@/utils/date';

interface PlanCanceledCardProps {
  plan: Plan;
}

export const PlanCanceledCard = ({ plan }: PlanCanceledCardProps) => {
  const { data: storeInfo } = useGetStoreDetail(plan.storeId);
  const { data: waitingInfo } = useGetStoreWaitingDetail(plan.originId);

  return (
    <div className='flex flex-col bg-white/80 rounded-xl p-4 gap-3'>
      <div className='flex justify-between'>
        <p className='body-4'>{reservationTypeLabel[plan.reservationType]}</p>
        <CloseIcon className='text-gray-5' />
      </div>
      <div className='flex'>
        {storeInfo.images && isNonEmptyArray(storeInfo.images) ? (
          <div className='relative w-[80px] h-[80px] rounded-2xl overflow-hidden'>
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={storeInfo.images[0].imageUrl}
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
            <p className='text-gray-5 body-8'>
              <span className='line-through decoration-gray-5'>
                웨이팅 번호 {waitingInfo.callNumber}번
              </span>{' '}
              •{' '}
              <span className='line-through decoration-gray-5'>매장 식사 {plan.adultCount}명</span>
            </p>
          ) : (
            <p className='text-gray-5 body-8'>
              <span className='line-through decoration-gray-5'>
                {plan.createdAt !== null && formatDotDate(plan.createdAt)}
              </span>{' '}
              • <span className='line-through decoration-gray-5'>{plan.adultCount} 명</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

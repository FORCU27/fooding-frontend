import Image from 'next/image';

import { PlanCompleted } from '@repo/api/user';
import { CloseIcon, FoodingIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { StarRating } from '@/components/Store/StarRating';
import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { formatDotDate } from '@/utils/date';

interface PlanCompletedCardProps {
  plan: PlanCompleted;
  showEditButton: boolean;
}

export const PlanCompletedCard = ({ plan, showEditButton }: PlanCompletedCardProps) => {
  const flow = useFlow();
  const { data: storeInfo } = useGetStoreDetail(plan.storeId);

  const handleReviewCardClick = () => {
    flow.push('ReviewCreateScreen', {
      planId: plan.id,
    });
  };

  return (
    <div className='flex flex-col bg-white/80 rounded-xl p-4 gap-3'>
      <div className='flex justify-between'>
        <p className='body-4'>
          {plan.reservationType !== 'RESERVATION'
            ? plan.reservationType === 'ONLINE_WAITING'
              ? '온라인 웨이팅'
              : '현장 웨이팅'
            : '예약'}
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
              웨이팅 번호 {plan.originId}번 • 매장 식사 {plan.adultCount} 명
            </span>
          ) : (
            <span className='text-gray-5 body-8'>
              {plan.createdAt !== null && formatDotDate(plan.createdAt)} • {plan.adultCount} 명
            </span>
          )}
        </div>
      </div>
      <hr className='w-full text-gray-2' />
      <div className='flex'>
        {plan.reviewRate ? (
          <div className='flex w-full justify-center items-center gap-4'>
            <div className='body-4'>{plan.reviewRate}</div>
            <StarRating score={plan.reviewRate} starSize={24} />
          </div>
        ) : (
          <div className='flex w-full flex-col justify-center items-center gap-3'>
            {showEditButton ? (
              <div onClick={handleReviewCardClick}>
                <p className='body-4 text-center'>리뷰를 남겨주세요!</p>
                <StarRating score={0} starSize={24} />
              </div>
            ) : (
              <p className='body-4 text-gray-4 p-2'>리뷰 작성기간이 만료되었어요</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

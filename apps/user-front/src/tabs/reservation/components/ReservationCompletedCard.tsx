import Image from 'next/image';

import { ReservationCompleted } from '@repo/api/user';
import { CloseIcon, FoodingIcon, StarIcon } from '@repo/design-system/icons';

import { formatDotDate } from '@/utils/date';

interface ReservationCompletedCardProps {
  reservation: ReservationCompleted;
}

export const ReservationCompletedCard = ({ reservation }: ReservationCompletedCardProps) => {
  const isReviewWithin20Days = (createdAt: string): boolean => {
    const createdDate = new Date(createdAt);
    const today = new Date();

    const diffTime = today.getTime() - createdDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 20;
  };

  const showEditButton = isReviewWithin20Days(reservation.createdAt);

  return (
    <div className='flex flex-col bg-white/80 rounded-xl p-4 gap-3'>
      <div className='flex justify-between'>
        <p className='body-4'>
          {reservation.isWaiting
            ? reservation.waitingType === 'ONLINE'
              ? '온라인 웨이팅'
              : '현장 웨이팅'
            : '예약'}
        </p>
        <CloseIcon className='text-gray-5' />
      </div>
      <div className='flex'>
        {reservation.mainImgUrl ? (
          <div className='relative w-[80px] h-[80px] rounded-2xl overflow-hidden'>
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={reservation.mainImgUrl}
              alt='리뷰 이미지'
            />
          </div>
        ) : (
          <div className='bg-gray-1 flex justify-center items-center w-[80px] h-[80px] rounded-2xl'>
            <FoodingIcon width={40} height={60} color='rgba(17, 17, 17, 0.1)' />
          </div>
        )}
        <div className='flex flex-col pl-3'>
          <span className='subtitle-5'>{reservation.name}</span>
          {reservation.isWaiting ? (
            <span className='text-gray-5 body-8'>
              웨이팅 번호 {reservation.waitingNumber} • 매장 식사 {reservation.adultCount} 명
            </span>
          ) : (
            <span className='text-gray-5 body-8'>
              {formatDotDate(reservation.createdAt)} • {reservation.adultCount} 명
            </span>
          )}
        </div>
      </div>
      <hr className='w-full text-gray-2' />
      <div className='flex'>
        {reservation.reviewRate ? (
          <div className='flex w-full justify-center items-center gap-4'>
            <div className='body-4'>{reservation.reviewRate}</div>
            <div className='flex gap-1'>
              <StarIcon className=' stroke-fooding-yellow fill-fooding-yellow' />
              <StarIcon className=' stroke-fooding-yellow fill-fooding-yellow' />
              <StarIcon className='stroke-gray-3 fill-gray-3' />
              <StarIcon className='stroke-gray-3 fill-gray-3' />
              <StarIcon className='stroke-gray-3 fill-gray-3' />
            </div>
          </div>
        ) : (
          <div className='flex w-full flex-col justify-center items-center gap-3'>
            {showEditButton ? (
              <>
                <p className='body-4 text-center'>리뷰를 남겨주세요!</p>
                <div className='flex gap-1'>
                  <StarIcon className='stroke-gray-3 fill-gray-3' />
                  <StarIcon className='stroke-gray-3 fill-gray-3' />
                  <StarIcon className='stroke-gray-3 fill-gray-3' />
                  <StarIcon className='stroke-gray-3 fill-gray-3' />
                  <StarIcon className='stroke-gray-3 fill-gray-3' />
                </div>
              </>
            ) : (
              <p className='body-4 text-gray-4 p-2'>리뷰 작성기간이 만료되었어요</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

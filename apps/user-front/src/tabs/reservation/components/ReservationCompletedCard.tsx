import Image from 'next/image';

import { ReservationCompleted, WAITING_TYPES } from '@repo/api/user';
import { CloseIcon, FoodingIcon } from '@repo/design-system/icons';

import { StarRating } from '@/components/Store/StarRating';
import { formatDotDate } from '@/utils/date';

const WATING_TYPE_LABELS: Record<(typeof WAITING_TYPES)[number], string> = {
  IN_PERSON: '현장 웨이팅',
  ONLINE: '온라인 웨이팅',
};

interface ReservationCompletedCardProps {
  reservation: ReservationCompleted;
  showEditButton: boolean;
}

export const ReservationCompletedCard = ({
  reservation,
  showEditButton,
}: ReservationCompletedCardProps) => {
  return (
    <div className='flex flex-col bg-white/80 rounded-xl p-4 gap-3'>
      <div className='flex justify-between'>
        <p className='body-4'>
          {reservation.isWaiting && reservation.waitingType
            ? WATING_TYPE_LABELS[reservation.waitingType]
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
            <StarRating score={reservation.reviewRate} starSize={24} />
          </div>
        ) : (
          <div className='flex w-full flex-col justify-center items-center gap-3'>
            {showEditButton ? (
              <>
                <p className='body-4 text-center'>리뷰를 남겨주세요!</p>
                <StarRating score={0} starSize={24} />
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

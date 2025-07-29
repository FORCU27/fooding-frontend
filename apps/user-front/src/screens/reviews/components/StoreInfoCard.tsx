import Image from 'next/image';

import { Reservation } from '@repo/api/user';
import { FoodingIcon } from '@repo/design-system/icons';

import { formatDotDate } from '@/utils/date';

interface ReviewStoreInfoCardProps {
  reservationInfo: Reservation;
}

export const ReviewStoreInfoCard = ({ reservationInfo }: ReviewStoreInfoCardProps) => {
  return (
    <div className='flex bg-gray-1 items-center w-full h-[100px] p-5 rounded-xl'>
      {reservationInfo.mainImgUrl ? (
        <div className='relative w-[60px] h-[60px] rounded-lg overflow-hidden'>
          <Image
            fill
            style={{ objectFit: 'cover' }}
            src={reservationInfo.mainImgUrl}
            alt='리뷰 이미지'
          />
        </div>
      ) : (
        <div className='bg-gray-1 flex justify-center items-center w-[60px] h-[60px] rounded-lg'>
          <FoodingIcon width={40} height={55} color='rgba(17, 17, 17, 0.1)' />
        </div>
      )}
      <div className='flex flex-col p-4 gap-1'>
        <p className='subtitle-4'>{reservationInfo.name}</p>
        <div className='flex justify-around body-8 text-gray-5'>
          <span>{formatDotDate(reservationInfo.createdAt)}</span>
          <span>•</span>
          <span>{reservationInfo.adultCount}명</span>
        </div>
      </div>
    </div>
  );
};

import Image from 'next/image';

import { Reservation } from '@repo/api/user';
import { Button } from '@repo/design-system/components/b2c';
import { CloseIcon, FoodingIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { formatDotDate } from '@/utils/date';

interface ReservationCardProps {
  reservation: Reservation;
}

export const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const flow = useFlow();

  const handleReservationCardClick = (isWaiting: boolean, reservationId: number) => {
    if (isWaiting === reservation.isWaiting)
      return flow.push('WaitingDetailScreen', { waitingId: reservationId });
    return;
  };
  return (
    <div
      className='flex flex-col bg-white/80 rounded-xl p-4 gap-3'
      onClick={() => handleReservationCardClick(reservation.isWaiting, reservation.id)}
    >
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
      <div>
        <Button size='large' variant='outlined'>
          {reservation.isWaiting ? '웨이팅 취소' : '예약 취소'}
        </Button>
      </div>
    </div>
  );
};

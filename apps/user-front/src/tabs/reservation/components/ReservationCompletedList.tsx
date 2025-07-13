import { mockReservationCompletedListResponse } from '@repo/api/user';

import { ReservationCompletedCard } from './ReservationCompletedCard';

export const ReservationCompletedList = () => {
  //TODO: mock데이터 삭제

  const { data } = mockReservationCompletedListResponse;
  const reservations = data.list;

  return (
    <div className='flex flex-col gap-5 px-grid-margin py-grid-margin'>
      <p className='text-gray-5 body-6'>총 {reservations.length}건</p>
      {reservations.map((reservation) => (
        <ReservationCompletedCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};

import { mockReservationListResponse } from '@repo/api/user';

import { ReservationCard } from './ReservationCard';

export const ReservationScheuledList = () => {
  //TODO: mock데이터 삭제
  const { data } = mockReservationListResponse;
  const reservations = data.list;

  return (
    <div className='flex flex-col gap-5 px-grid-margin py-grid-margin'>
      <p className='text-gray-5 body-6'>총 {reservations.length}건</p>
      {reservations.map((reservation) => (
        <ReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
};

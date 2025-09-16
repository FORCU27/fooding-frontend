import { Plan } from '@repo/api/user';

export const reservationTypeLabel: Record<Plan['reservationType'], string> = {
  RESERVATION: '예약',
  ONLINE_WAITING: '온라인 웨이팅',
  ONSITE_WAITING: '현장 웨이팅',
};

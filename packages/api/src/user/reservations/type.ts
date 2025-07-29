import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const WAITING_TYPES = ['IN_PERSON', 'ONLINE'] as const;
export const waitingType = z.enum(WAITING_TYPES);

//TODO: 임의설정 type 수정필요

export type Reservation = z.infer<typeof Reservation>;
export const Reservation = z.object({
  id: z.number(),
  storeId: z.number(),
  name: z.string(),
  isWaiting: z.boolean(),
  waitingType: z.enum(WAITING_TYPES).optional(),
  waitingNumber: z.number().optional(),
  adultCount: z.number(),
  mainImgUrl: z.string().optional(),
  reservationDate: z.iso.datetime({ local: true }).optional(),
  createdAt: z.iso.datetime({ local: true }),
});

export type Waiting = z.infer<typeof Waiting>;
export const Waiting = z.object({
  id: z.number(),
  storeId: z.number(),
  user: z.object({
    id: z.number(),
    storeId: z.number(),
    name: z.string(),
    phoneNumber: z.string(),
    count: z.number(),
  }),
  callNumber: z.number(),
  channel: z.enum(WAITING_TYPES).optional(),
  waitingNumber: z.number().optional(),
  infantChairCount: z.number(),
  infantCount: z.number(),
  adultCount: z.number(),
  memo: z.string(),
  createdAt: z.iso.datetime({ local: true }),
});

export type ReservationCompleted = z.infer<typeof ReservationCompleted>;
export const ReservationCompleted = Reservation.extend({
  reviewRate: z.number().nullish(),
});

export type GetReservationListResponse = z.infer<typeof GetReservationListResponse>;
export const GetReservationListResponse = PageResponse(Reservation);

export type GetReservationCompletedListResponse = z.infer<
  typeof GetReservationCompletedListResponse
>;
export const GetReservationCompletedListResponse = PageResponse(ReservationCompleted);

export type GetReservationByIdResponse = z.infer<typeof GetReservationByIdResponse>;
export const GetReservationByIdResponse = ApiResponse(Reservation);

export type GetWaitingDetailResponse = z.infer<typeof GetWaitingDetailResponse>;
export const GetWaitingDetailResponse = ApiResponse(Waiting);

export type GetReservationDetailResponse = z.infer<typeof GetReservationDetailResponse>;
export const GetReservationDetailResponse = ApiResponse(Reservation);

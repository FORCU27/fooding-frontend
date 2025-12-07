import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export const WAITING_CHANNEL_VALUES = ['IN_PERSON', 'ONLINE'] as const;
export const waitingChannel = z.enum(WAITING_CHANNEL_VALUES);
export type WAITING_CHANNEL = (typeof WAITING_CHANNEL_VALUES)[number];

export type Waiting = z.infer<typeof Waiting>;
export const Waiting = z.object({
  userId: z.number(),
  waitingUserId: z.number().nullable(),
  storeId: z.number(),
  channel: waitingChannel,
  infantChairCount: z.number(),
  infantCount: z.number(),
  adultCount: z.number(),
  callNumber: z.number(),
  memo: z.string().nullable().default(''),
  registeredAt: z.iso.datetime({ local: true }),
});

export type StoreWaitingBody = {
  storeId: number;
  termsAgreed: boolean;
  privacyPolicyAgreed: boolean;
  thirdPartyAgreed: boolean;
  infantChairCount: number;
  infantCount: number;
  adultCount: number;
};

export type GetWaitingDetailResponse = z.infer<typeof GetWaitingDetailResponse>;
export const GetWaitingDetailResponse = ApiResponse(Waiting);

export type GetCreateWaitingReseponse = z.infer<typeof GetCreateWaitingReseponse>;
export const GetCreateWaitingReseponse = z.object({
  status: z.string(),
  data: z.object({
    storeWaitingId: z.number(),
    planId: z.string(),
  }),
});

export type GetCancelWaitingResponse = z.infer<typeof GetCancelWaitingResponse>;
export const GetCancelWaitingResponse = z.object({
  status: z.string(),
  data: z.object({}),
});

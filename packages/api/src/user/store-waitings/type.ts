import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export const WAITING_CHANNEL_VALUES = ['IN_PERSON', 'ONLINE'] as const;
export const waitingChannel = z.enum(WAITING_CHANNEL_VALUES);
export type WAITING_CHANNEL = (typeof WAITING_CHANNEL_VALUES)[number];

export type Waiting = z.infer<typeof Waiting>;
export const Waiting = z.object({
  userId: z.number(),
  waitingUserId: z.number(),
  storeId: z.number(),
  channel: waitingChannel,
  infantChairCount: z.number(),
  infantCount: z.number(),
  adultCount: z.number(),
  memo: z.string(),
});

export type GetWaitingDetailResponse = z.infer<typeof GetWaitingDetailResponse>;
export const GetWaitingDetailResponse = ApiResponse(Waiting);

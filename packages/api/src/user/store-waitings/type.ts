import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export const WAITING_CHENNEL_VALUES = ['IN_PERSON', 'ONLINE'] as const;
export const waitingChennel = z.enum(WAITING_CHENNEL_VALUES);
export type WAITING_CHENNEL = (typeof WAITING_CHENNEL_VALUES)[number];

export type Waiting = z.infer<typeof Waiting>;
export const Waiting = z.object({
  userId: z.number(),
  waitingUserId: z.number(),
  storeId: z.number(),
  channel: waitingChennel,
  infantChairCount: z.number(),
  infantCount: z.number(),
  adultCount: z.number(),
  memo: z.string(),
});

export type GetWaitingDetailResponse = z.infer<typeof GetWaitingDetailResponse>;
export const GetWaitingDetailResponse = ApiResponse(Waiting);

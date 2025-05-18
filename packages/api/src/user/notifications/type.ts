import z from 'zod';

import { ApiResponse } from '../../shared';

export type Notification = z.infer<typeof Notification>;
export const Notification = z.object({
  id: z.number(),
  type: z.union([z.literal('event'), z.literal('notice')]),
  title: z.string(),
  content: z.string(),
  sentAt: z.string(),
  read: z.boolean(),
});

export type GetNotificationListResponse = z.infer<typeof GetNotificationListResponse>;
export const GetNotificationListResponse = ApiResponse(z.array(Notification));

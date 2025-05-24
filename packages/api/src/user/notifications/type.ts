import z from 'zod';

import { createPageResponseSchema } from '../../shared';

export const notificationTypes = ['EVENT', 'NOTICE', 'SERVICE'] as const;
export const NotificationType = z.enum(notificationTypes);
export type NotificationType = z.infer<typeof NotificationType>;

export type Notification = z.infer<typeof Notification>;
export const Notification = z.object({
  id: z.number(),
  type: NotificationType,
  title: z.string(),
  content: z.string(),
  sentAt: z.string(),
  read: z.boolean(),
});

export type GetNotificationListParams = {
  page: number;
  size: number;
  sortType: string;
  sortDirection: string;
};

export type GetNotificationListResponse = z.infer<typeof GetNotificationListResponse>;
export const GetNotificationListResponse = createPageResponseSchema(Notification);

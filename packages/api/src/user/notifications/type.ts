import z from 'zod';

import { PageResponse } from '../../shared';

export const notificationCategories = ['EVENT', 'NOTICE', 'SERVICE'] as const;
export const NotificationCategory = z.enum(notificationCategories);
export type NotificationCategory = z.infer<typeof NotificationCategory>;

export type Notification = z.infer<typeof Notification>;
export const Notification = z.object({
  id: z.number(),
  category: NotificationCategory,
  title: z.string(),
  content: z.string(),
  sentAt: z.string(),
  read: z.boolean(),
});

export type GetNotificationListParams = {
  page: number;
  size: number;
  sortType: 'RECENT';
  sortDirection: 'DESCENDING';
};

export type GetNotificationListResponse = z.infer<typeof GetNotificationListResponse>;
export const GetNotificationListResponse = PageResponse(Notification);

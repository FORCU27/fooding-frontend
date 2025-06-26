import { z } from 'zod/v4';

import { PageResponse, SortDirection, SortType } from '../../shared';

export const NOTIFICATION_CATEGORIES = ['EVENT', 'NOTICE', 'SERVICE'] as const;
export const NotificationCategory = z.enum(NOTIFICATION_CATEGORIES);

export type Notification = z.infer<typeof Notification>;
export const Notification = z.object({
  id: z.number(),
  category: z.enum(NOTIFICATION_CATEGORIES),
  title: z.string(),
  content: z.string(),
  sentAt: z.string(),
  read: z.boolean(),
});

export type GetNotificationListParams = {
  page: number;
  size: number;
  sortType: SortType;
  sortDirection: SortDirection;
};

export type GetNotificationListResponse = z.infer<typeof GetNotificationListResponse>;
export const GetNotificationListResponse = PageResponse(Notification);

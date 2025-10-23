import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const CeoStoreNotificationResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  linkUrl: z.string().optional(),
  createdAt: z.string(),
});

export type CeoStoreNotificationResponse = z.infer<typeof CeoStoreNotificationResponseSchema>;

export const GetStoreNotificationsResponse = PageResponse(CeoStoreNotificationResponseSchema);

export type GetStoreNotificationsParams = {
  storeId: number;
  pageNum?: number;
  pageSize?: number;
  sortType?: 'RECENT' | 'OLD';
};

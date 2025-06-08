import { z } from 'zod';

import { PageResponse } from '../../shared';

export const NotificationChannel = {
  MAIL: 'MAIL',
  SMS: 'SMS',
  PUSH: 'PUSH',
} as const;

export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];

export const NotificationStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus];

export type NotificationResponse = z.infer<typeof NotificationResponseSchema>;
export const NotificationResponseSchema = z.object({
  id: z.number(),
  source: z.string(),
  destinations: z.array(z.string()),
  title: z.string(),
  content: z.string(),
  channel: z.string(),
  status: z.string(),
  sentAt: z.string(),
  readAt: z.string().nullable(),
  scheduledAt: z.string().nullable(),
});

export const GetNotificationListResponse = PageResponse(NotificationResponseSchema);

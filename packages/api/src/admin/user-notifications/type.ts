import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const UserNotificationType = {
  NOTIFICATION: 'NOTICE',
  EVENT: 'EVENT',
  SERVICE: 'SERVICE',
} as const;

export type UserNotificationType = (typeof UserNotificationType)[keyof typeof UserNotificationType];

export const UserNotificationResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string().nullable(),
  sentAt: z.string(),
  read: z.boolean(),
});

export const CreateUserNotificationRequestSchema = z.object({
  userId: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
});

export type GetUserNotificationListResponse = z.infer<typeof GetUserNotificationListResponse>;
export const GetUserNotificationListResponse = PageResponse(UserNotificationResponseSchema);

export type UserNotificationResponse = z.infer<typeof UserNotificationResponseSchema>;
export type CreateUserNotificationRequest = z.infer<typeof CreateUserNotificationRequestSchema>;

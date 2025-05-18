import { z } from 'zod';

import { createPageResponseSchema } from '../shared';

export const UserNotificationType = {
  NOTIFICATION: 'NOTIFICATION',
  EVENT: 'EVENT',
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

export const PageResponseSchema = createPageResponseSchema(UserNotificationResponseSchema);

export type UserNotificationResponse = z.infer<typeof UserNotificationResponseSchema>;
export type CreateUserNotificationRequest = z.infer<typeof CreateUserNotificationRequestSchema>; 
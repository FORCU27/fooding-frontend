import { z } from 'zod';

import { createPageResponseSchema } from '../shared';

export const UserNotificationType = {
  STORE: 'STORE',
  SYSTEM: 'SYSTEM',
  MARKETING: 'MARKETING',
} as const;

export type UserNotificationType = (typeof UserNotificationType)[keyof typeof UserNotificationType];

export const UserNotificationResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  content: z.string(),
  sentAt: z.string(),
  read: z.boolean(),
});

export const CreateUserNotificationRequestSchema = z.object({
  userId: z.number(),
  title: z.string(),
  content: z.string(),
});

export const PageResponseSchema = createPageResponseSchema(UserNotificationResponseSchema);

export type UserNotificationResponse = z.infer<typeof UserNotificationResponseSchema>;
export type CreateUserNotificationRequest = z.infer<typeof CreateUserNotificationRequestSchema>; 
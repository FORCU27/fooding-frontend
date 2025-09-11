import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const NOTIFICATION_TEMPLATE_TYPE = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  PUSH: 'PUSH',
  IN_APP: 'IN_APP',
} as const;

export type NotificationTemplateType = (typeof NOTIFICATION_TEMPLATE_TYPE)[keyof typeof NOTIFICATION_TEMPLATE_TYPE];

export type AdminNotificationTemplateResponse = z.infer<typeof AdminNotificationTemplateResponseSchema>;
export const AdminNotificationTemplateResponseSchema = z.object({
  id: z.string(),
  subject: z.string(),
  content: z.string(),
  type: z.string(),
//   type: z.enum(Object.values(NOTIFICATION_TEMPLATE_TYPE)),
//   isActive: z.boolean(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
});

export const AdminCreateNotificationTemplateRequestSchema = z.object({
  subject: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  type: z.string(),
//   type: z.enum(Object.values(NOTIFICATION_TEMPLATE_TYPE)),
//   isActive: z.boolean(),
});

export const AdminUpdateNotificationTemplateRequestSchema = z.object({
  subject: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  type: z.string(),
//   type: z.enum(Object.values(NOTIFICATION_TEMPLATE_TYPE)),
//   isActive: z.boolean(),
});

export type GetNotificationTemplateListResponse = z.infer<typeof GetNotificationTemplateListResponse>;
export const GetNotificationTemplateListResponse = PageResponse(AdminNotificationTemplateResponseSchema);

export type GetNotificationTemplateResponse = z.infer<typeof GetNotificationTemplateResponse>;
export const GetNotificationTemplateResponse = z.object({
  status: z.string(),
  data: AdminNotificationTemplateResponseSchema,
});

export type AdminCreateNotificationTemplateRequest = z.infer<typeof AdminCreateNotificationTemplateRequestSchema>;
export type AdminUpdateNotificationTemplateRequest = z.infer<typeof AdminUpdateNotificationTemplateRequestSchema>;

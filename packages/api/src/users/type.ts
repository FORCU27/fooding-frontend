import { z } from 'zod';

import { createPageResponseSchema } from '../shared';

export const AdminUserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  gender: z.string(),
  provider: z.string(),
  createdAt: z.string(),
  lastLoggedInAt: z.string().nullable(),
});

export const AdminCreateUserRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
  nickname: z.string(),
  phoneNumber: z.string().optional(),
  gender: z.string(),
  role: z.string(),
});

export const AdminUpdateUserRequestSchema = z.object({
  nickname: z.string(),
  phoneNumber: z.string().optional(),
  gender: z.string(),
});

export const PageResponseSchema = createPageResponseSchema(AdminUserResponseSchema);

export type AdminUserResponse = z.infer<typeof AdminUserResponseSchema>;
export type AdminCreateUserRequest = z.infer<typeof AdminCreateUserRequestSchema>;
export type AdminUpdateUserRequest = z.infer<typeof AdminUpdateUserRequestSchema>;

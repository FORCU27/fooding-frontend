import { z } from 'zod/v4';
import { ApiResponse, PageResponse } from '../../shared';

export const AdminStoreWaitingSchema = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  storeId: z.number(),
  status: z.string(),
  channel: z.string(),
  infantChairCount: z.number(),
  infantCount: z.number(),
  adultCount: z.number(),
  memo: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AdminStoreWaitingResponse = z.infer<typeof AdminStoreWaitingSchema>;

export const GetAdminStoreWaitingResponse = ApiResponse(AdminStoreWaitingSchema);

export const GetAdminStoreWaitingListResponse = PageResponse(AdminStoreWaitingSchema);

export const AdminStoreWaitingCreateRequestSchema = z.object({
  userId: z.number().optional(),
  storeId: z.number(),
  status: z.string(),
  channel: z.string(),
  infantChairCount: z.number(),
  infantCount: z.number(),
  adultCount: z.number(),
  memo: z.string().optional(),
});

export type AdminStoreWaitingCreateRequest = z.infer<typeof AdminStoreWaitingCreateRequestSchema>;

export const AdminStoreWaitingUpdateRequestSchema = z.object({
  userId: z.number().optional(),
  storeId: z.number().optional(),
  status: z.string().optional(),
  channel: z.string().optional(),
  infantChairCount: z.number().optional(),
  infantCount: z.number().optional(),
  adultCount: z.number().optional(),
  memo: z.string().optional(),
});

export type AdminStoreWaitingUpdateRequest = z.infer<typeof AdminStoreWaitingUpdateRequestSchema>;
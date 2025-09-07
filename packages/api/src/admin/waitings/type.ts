import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const AdminWaitingResponseSchema = z.object({
  id: z.number(),
  storeId: z.number(),
  status: z.string(),
});

export type AdminWaitingResponse = z.infer<typeof AdminWaitingResponseSchema>;

export const GetAdminWaitingListResponse = PageResponse(AdminWaitingResponseSchema);
export const GetAdminWaitingResponse = ApiResponse(AdminWaitingResponseSchema);

export const AdminWaitingStatus = z.enum([
  'WAITING_OPEN',
  'IMMEDIATE_ENTRY',
  'PAUSED',
  'WAITING_CLOSE',
]);
export type AdminWaitingStatus = z.infer<typeof AdminWaitingStatus>;

export type AdminWaitingCreateRequest = {
  storeId: number;
  status: AdminWaitingStatus;
};

export type AdminWaitingUpdateRequest = {
  storeId: number;
  status: AdminWaitingStatus;
};

import { z } from 'zod/v4';
import { ApiResponse, PageResponse } from '../../shared';

export const AdminWaitingSettingResponseSchema = z.object({
  id: z.number(),
  waitingId: z.number(),
  label: z.string(),
  minimumCapacity: z.number().nullable(),
  maximumCapacity: z.number(),
  estimatedWaitingTimeMinutes: z.number().nullable(),
  isActive: z.boolean().nullable(),
  entryTimeLimitMinutes: z.number().nullable(),
});

export type AdminWaitingSettingResponse = z.infer<typeof AdminWaitingSettingResponseSchema>;

export const GetAdminWaitingSettingListResponse = PageResponse(AdminWaitingSettingResponseSchema);
export const GetAdminWaitingSettingResponse = ApiResponse(AdminWaitingSettingResponseSchema);

export type AdminWaitingSettingCreateRequest = {
  waitingId: number;
  label: string;
  minimumCapacity?: number;
  maximumCapacity: number;
  estimatedWaitingTimeMinutes?: number;
  isActive: boolean;
  entryTimeLimitMinutes?: number;
};

export type AdminWaitingSettingUpdateRequest = {
  waitingId: number;
  label: string;
  minimumCapacity: number;
  maximumCapacity: number;
  estimatedWaitingTimeMinutes: number;
  isActive: boolean;
  entryTimeLimitMinutes: number;
};


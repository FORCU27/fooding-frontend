import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export const DevicePlatform = z.enum(['IOS', 'ANDROID']);
export type DevicePlatform = z.infer<typeof DevicePlatform>;

export const ServiceType = z.enum([
  'REWARD_MANAGEMENT',
  'REWARD_RECEIPT',
  'WAITING_MANAGEMENT',
  'WAITING_RECEIPT',
]);
export type ServiceType = z.infer<typeof ServiceType>;

export const CeoDeviceResponseSchema = z.object({
  id: z.number(),
  platform: DevicePlatform,
  name: z.string(),
  packageName: z.string(),
  osVersion: z.string(),
  installedAt: z.string(),
  lastConnectedAt: z.string(),
});

export const CeoDeviceConnnectRequestSchema = z.object({
  name: z.string(),
  platform: z.string(),
  osVersion: z.string(),
  appVersion: z.string(),
  packageName: z.string(),
  deviceId: z.number(),
  userId: z.number(),
});

export const GetCeoDeviceListResponse = PageResponse(CeoDeviceResponseSchema);

// Device Logs
export const DeviceLogSchema = z.object({
  logId: z.number(),
  deviceId: z.number(),
  date: z.string(),
  time: z.string(),
  operation: z.string(),
});

export type DeviceLogSchema = z.infer<typeof DeviceLogSchema>;

export const GetDeviceLogsResponse = PageResponse(DeviceLogSchema);

export type GetDeviceLogsParams = {
  deviceId: number;
  pageNum?: number;
  pageSize?: number;
  searchString?: string;
  serviceType?: string;
  sortType?: 'RECENT' | 'OLD';
};

export type ChangeDeviceServiceParams = {
  deviceId: number;
  storeId: number;
  serviceType: ServiceType;
};

export const ChangeDeviceServiceResponse = z.object({
  status: z.string(),
  data: z.null(),
});

export type DisconnectDeviceParams = {
  deviceId: number;
};

export const DisconnectDeviceResponse = z.object({
  status: z.string(),
  data: z.null(),
});

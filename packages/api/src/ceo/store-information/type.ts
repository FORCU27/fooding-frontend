import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

// 부가정보 응답 타입
export const StoreInformation = z.object({
  id: z.number(),
  links: z.array(
    z.object({
      type: z.string(),
      url: z.string(),
    })
  ),
  facilities: z.array(z.string()),
  paymentMethods: z.array(z.string()),
  parkingAvailable: z.boolean(),
  parkingType: z.string().nullable(),
  parkingChargeType: z.string().nullable(),
  parkingBasicTimeMinutes: z.number().nullable(),
  parkingBasicFee: z.number().nullable(),
  parkingExtraMinutes: z.number().nullable(),
  parkingExtraFee: z.number().nullable(),
  parkingMaxDailyFee: z.number().nullable(),
});

export type StoreInformation = z.infer<typeof StoreInformation>;

// GET 응답 타입
export const GetStoreInformationResponse = ApiResponse(StoreInformation);
export type GetStoreInformationResponse = z.infer<typeof GetStoreInformationResponse>;

// DELETE 응답 타입
export const DeleteStoreInformationResponse = ApiResponse(z.null());
export type DeleteStoreInformationResponse = z.infer<typeof DeleteStoreInformationResponse>;

// PUT/POST 요청 바디 타입
export const StoreInformationBody = z.object({
  links: z.array(
    z.object({
      type: z.string(),
      url: z.string(),
    })
  ).optional(),
  facilities: z.array(z.string()).optional(),
  paymentMethods: z.array(z.string()).optional(),
  parkingAvailable: z.boolean().optional(),
  parkingType: z.string().nullable().optional(),
  parkingChargeType: z.string().nullable().optional(),
  parkingBasicTimeMinutes: z.number().nullable().optional(),
  parkingBasicFee: z.number().nullable().optional(),
  parkingExtraMinutes: z.number().nullable().optional(),
  parkingExtraFee: z.number().nullable().optional(),
  parkingMaxDailyFee: z.number().nullable().optional(),
});

export type StoreInformationBody = z.infer<typeof StoreInformationBody>;
import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const RESERVATION_TYPE_VALUES = ['RESERVATION', 'ONSITE_WAITING', 'ONLINE_WAITING'] as const;
export const reservationTypes = z.enum(RESERVATION_TYPE_VALUES);
export type RESERVATION_TYPE = (typeof RESERVATION_TYPE_VALUES)[number];

export const VISIT_STATUS_VALUES = ['SCHEDULED', 'COMPLETED', 'NOT_VISITED'] as const;
export const visitStatus = z.enum(VISIT_STATUS_VALUES);
export type VISIT_STATUS = (typeof VISIT_STATUS_VALUES)[number];

export type GetPlanListParams = {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  visitStatus?: VISIT_STATUS;
};

export type Plan = z.infer<typeof Plan>;
export const Plan = z.object({
  id: z.string(),
  reservationType: reservationTypes,
  originId: z.number(),
  storeId: z.number(),
  visitStatus: visitStatus,
  reservationTime: z.iso.datetime({ local: true }),
  createdAt: z.iso.datetime({ local: true }).nullable(),
  infantChairCount: z.number(),
  infantCount: z.number(),
  adultCount: z.number(),
});

export type PlanCompleted = z.infer<typeof PlanCompleted>;
export const PlanCompleted = Plan.extend({
  reviewRate: z.number().nullish(),
});

export type GetPlanListResponse = z.infer<typeof GetPlanListResponse>;
export const GetPlanListResponse = PageResponse(Plan);

export type GetPlanCompletedListResponse = z.infer<typeof GetPlanCompletedListResponse>;
export const GetPlanCompletedListResponse = PageResponse(PlanCompleted);

export type GetPlanByIdResponse = z.infer<typeof GetPlanByIdResponse>;
export const GetPlanByIdResponse = ApiResponse(Plan);

export type GetPlanDetailResponse = z.infer<typeof GetPlanDetailResponse>;
export const GetPlanDetailResponse = ApiResponse(Plan);

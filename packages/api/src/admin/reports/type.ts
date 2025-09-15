import { z } from 'zod/v4';

import { ApiResponse, PageResponse } from '../../shared';

export const ReportTargetType = z.enum(['REVIEW', 'POST']);
export type ReportTargetType = z.infer<typeof ReportTargetType>;

export const ReportStatus = z.enum(['REPORTED', 'PROCESS', 'SUCCESS', 'DENY']);
export type ReportStatus = z.infer<typeof ReportStatus>;

export const AdminReportResponseSchema = z.object({
  id: z.number(),
  referenceId: z.number(),
  targetType: ReportTargetType,
  description: z.string(),
  memo: z.string().nullable().optional(),
  reporterId: z.number(),
  reporterName: z.string().nullable().optional(),
  status: ReportStatus,
  chargerId: z.number().nullable().optional(),
  chargerName: z.string().nullable().optional(),
});
export type AdminReportResponse = z.infer<typeof AdminReportResponseSchema>;

export const GetReportListResponse = PageResponse(AdminReportResponseSchema);
export type GetReportListResponse = z.infer<typeof GetReportListResponse>;

export const GetReportResponse = ApiResponse(AdminReportResponseSchema);
export type GetReportResponse = z.infer<typeof GetReportResponse>;

export const AdminCreateReportRequestSchema = z.object({
  referenceId: z.number(),
  targetType: ReportTargetType,
  description: z.string(),
  memo: z.string().optional(),
  reporterId: z.number(),
});
export type AdminCreateReportRequest = z.infer<typeof AdminCreateReportRequestSchema>;

export const AdminUpdateReportRequestSchema = z.object({
  memo: z.string().optional(),
  status: ReportStatus.optional(),
  chargerId: z.number().optional(),
});
export type AdminUpdateReportRequest = z.infer<typeof AdminUpdateReportRequestSchema>;

export type GetReportListParams = {
  pageNum?: number;
  pageSize?: number;
  referenceId?: number;
  targetType?: ReportTargetType;
  reporterId?: number;
  status?: ReportStatus;
  chargerId?: number;
  searchString?: string;
};


import z from 'zod/v4';

export const TargetType = z.enum(['REVIEW', 'POST']);
export type TargetType = z.infer<typeof TargetType>;

export type Report = z.infer<typeof Report>;
export const Report = z.object({
  id: z.number(),
  referenceId: z.number(),
  reporterId: z.number(),
  description: z.string(),
  targetType: TargetType,
});

export type CreateReportBody = {
  referenceId: number;
  reporterId: number;
  description: string;
  targetType: TargetType;
};

export type GetUserReportResponse = z.infer<typeof GetUserReportResponse>;
export const GetUserReportResponse = z.object({
  status: z.string(),
  data: null,
});

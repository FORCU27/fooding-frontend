import { z } from 'zod/v4';

export const LinkType = {
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL',
} as const;

export type LinkType = (typeof LinkType)[keyof typeof LinkType];

export type AdminBannerResponse = z.infer<typeof AdminBannerResponseSchema>;
export const AdminBannerResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  active: z.boolean(),
  priority: z.number(),
  link: z.string().nullable().optional(),
  linkType: z.enum(['INTERNAL', 'EXTERNAL']),
  imageUrl: z.string().nullable().optional(),
  service: z.string().nullable().optional(),
  placement: z.string().nullable().optional(),
  parameters: z.record(z.string(), z.any()).nullable().optional(),
});

export const AdminBannerCreateRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  active: z.boolean(),
  priority: z.number(),
  link: z.string().optional(),
  linkType: z.enum(['INTERNAL', 'EXTERNAL']),
  imageId: z.string().optional(),
  service: z.string().optional(),
  placement: z.string().optional(),
  parameters: z.record(z.string(), z.any()).optional(),
});

export const AdminBannerUpdateRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  active: z.boolean(),
  priority: z.number(),
  link: z.string().optional(),
  linkType: z.enum(['INTERNAL', 'EXTERNAL']),
  imageId: z.string().optional(),
  service: z.string().optional(),
  placement: z.string().optional(),
  parameters: z.record(z.string(), z.any()).optional(),
});

export const AdminBannerPageRequestSchema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
  name: z.string().optional(),
  active: z.boolean().optional(),
  service: z.string().optional(),
  placement: z.string().optional(),
});

export type GetBannerListResponse = z.infer<typeof GetBannerListResponse>;
export const GetBannerListResponse = z.object({
  status: z.string().nullable(),
  data: z.object({
    list: z.array(AdminBannerResponseSchema),
    pageInfo: z.object({
      totalCount: z.number(),
      totalPages: z.number(),
      pageNum: z.number(),
      pageSize: z.number(),
    }),
  }),
});

export type GetBannerResponse = z.infer<typeof GetBannerResponse>;
export const GetBannerResponse = z.object({
  status: z.string().nullable(),
  data: AdminBannerResponseSchema,
});

export type AdminBannerCreateRequest = z.infer<typeof AdminBannerCreateRequestSchema>;
export type AdminBannerUpdateRequest = z.infer<typeof AdminBannerUpdateRequestSchema>;
export type AdminBannerPageRequest = z.infer<typeof AdminBannerPageRequestSchema>;

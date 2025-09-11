import { z } from 'zod/v4';

export const PostType = {
  NOTICE: 'NOTICE',
  EVENT: 'EVENT',
} as const;

export type PostType = (typeof PostType)[keyof typeof PostType];

export type AdminPostResponse = z.infer<typeof AdminPostResponseSchema>;
export const AdminPostResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  type: z.enum(['NOTICE', 'EVENT']),
  isVisibleOnHomepage: z.boolean(),
  isVisibleOnPos: z.boolean(),
  isVisibleOnCeo: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AdminCreatePostRequestSchema = z.object({
  title: z.string(),
  content: z.string(),
  type: z.enum(['NOTICE', 'EVENT']),
  isVisibleOnHomepage: z.boolean(),
  isVisibleOnPos: z.boolean(),
  isVisibleOnCeo: z.boolean(),
});

export const AdminUpdatePostRequestSchema = z.object({
  title: z.string(),
  content: z.string(),
  type: z.enum(['NOTICE', 'EVENT']),
  isVisibleOnHomepage: z.boolean(),
  isVisibleOnPos: z.boolean(),
  isVisibleOnCeo: z.boolean(),
});

export type GetPostListResponse = z.infer<typeof GetPostListResponse>;
export const GetPostListResponse = z.object({
  status: z.string().nullable(),
  data: z.array(AdminPostResponseSchema),
});

export type GetPostResponse = z.infer<typeof GetPostResponse>;
export const GetPostResponse = z.object({
  status: z.string().nullable(),
  data: AdminPostResponseSchema,
});

export type AdminCreatePostRequest = z.infer<typeof AdminCreatePostRequestSchema>;
export type AdminUpdatePostRequest = z.infer<typeof AdminUpdatePostRequestSchema>;
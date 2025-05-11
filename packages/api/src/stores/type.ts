import { z } from 'zod';

export const StoreSortType = {
  RECENT: 'RECENT',
} as const;

export type StoreSortType = typeof StoreSortType[keyof typeof StoreSortType];

export const SortDirection = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
} as const;

export type SortDirection = typeof SortDirection[keyof typeof SortDirection];

export const AdminStoreResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string().optional(),
  priceCategory: z.string(),
  eventDescription: z.string().optional(),
  contactNumber: z.string(),
  direction: z.string().optional(),
  information: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export const AdminCreateStoreRequestSchema = z.object({
  name: z.string(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string().optional(),
  priceCategory: z.string(),
  eventDescription: z.string().optional(),
  contactNumber: z.string(),
  direction: z.string().optional(),
  information: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export const AdminUpdateStoreRequestSchema = z.object({
  name: z.string(),
  city: z.string(),
  address: z.string(),
  category: z.string(),
  description: z.string().optional(),
  priceCategory: z.string(),
  eventDescription: z.string().optional(),
  contactNumber: z.string(),
  direction: z.string().optional(),
  information: z.string(),
  isParkingAvailable: z.boolean(),
  isNewOpen: z.boolean(),
  isTakeOut: z.boolean(),
});

export const PageInfoSchema = z.object({
  pageNum: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
});

export const PageResponseSchema = z.object({
  status: z.string(),
  data: z.object({
    list: z.array(AdminStoreResponseSchema),
    pageInfo: PageInfoSchema,
  }),
});

export type AdminStoreResponse = z.infer<typeof AdminStoreResponseSchema>;
export type AdminCreateStoreRequest = z.infer<typeof AdminCreateStoreRequestSchema>;
export type AdminUpdateStoreRequest = z.infer<typeof AdminUpdateStoreRequestSchema>;
export type PageResponse = z.infer<typeof PageResponseSchema>; 
import { z } from 'zod/v4';

import { PageResponse } from '../../shared';

export type GetStoreImagesParams = {
  searchString: string;
  pageNum: number;
  pageSize: number;
  searchTag: string;
};

export type CreateStoreImageParams = {
  imageId: string;
  sortOrder?: number;
  tag?: string;
};

export const StoreImages = z.object({
  id: z.number(),
  imageUrl: z.string(),
  sortOrder: z.number().nullable(),
  tags: z.string().nullable(),
});

export const GetStoreImagesResponse = PageResponse(StoreImages);
export type GetStoreImagesResponse = z.infer<typeof GetStoreImagesResponse>;

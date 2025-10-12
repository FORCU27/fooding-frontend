import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export type GetRecommendedKeywordsParams = {
  keyword: string;
};

export type GetRecommendedKeywordsResponse = z.infer<typeof GetRecommendedKeywordsResponse>;
export const GetRecommendedKeywordsResponse = ApiResponse(z.array(z.string()));

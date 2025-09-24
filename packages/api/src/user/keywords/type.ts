import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export type GetRecommendedKeywordsParams = {
  keyword: string;
};

export const GetRecommendedKeywordsResponse = ApiResponse(z.array(z.string()));

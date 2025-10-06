import { AxiosRequestConfig } from 'axios';

import {
  GetCeoPostListParams,
  GetCeoPostListResponseSchema,
} from './type';
import { api } from '../../shared';

export * from './type';

const ENDPOINT = '/ceo/posts';

export const ceoPostApi = {
  list: async (params?: GetCeoPostListParams, config?: AxiosRequestConfig) => {
    const mergedParams = {
      ...(config?.params as Record<string, unknown> | undefined),
      ...params,
    };

    const response = await api.get(ENDPOINT, {
      ...config,
      params: mergedParams,
    });

    return GetCeoPostListResponseSchema.parse(response);
  },
};
